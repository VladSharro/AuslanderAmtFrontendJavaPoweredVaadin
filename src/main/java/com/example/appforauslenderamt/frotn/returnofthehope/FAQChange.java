package com.example.appforauslenderamt.frotn.returnofthehope;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.router.Route;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Route("FAQChange")
public class FAQChange extends VerticalLayout {

    private final String dbUrl = "jdbc:sqlite:src/main/resources/QnADatabase.db";

    private Grid<FAQ> grid = new Grid<>(FAQ.class);
    private Binder<FAQ> binder = new Binder<>(FAQ.class);

    private TextField questionField = new TextField("Question");
    private TextField answerField = new TextField("Answer");

    public FAQChange() {
        setAlignItems(Alignment.CENTER); // Centers all components horizontally

        H1 title = new H1("Change FAQ");

        Button addButton = new Button("Add");
        Button updateButton = new Button("Reset");
        Button deleteButton = new Button("Delete");

        addButton.addClickListener(event -> {
            addFAQ(questionField.getValue(), answerField.getValue());
            refreshGrid();
            clearFields();
        });

        updateButton.addClickListener(event -> {
            FAQ selectedFAQ = grid.asSingleSelect().getValue();
            if (selectedFAQ != null) {
                updateFAQ(selectedFAQ.getId(), questionField.getValue(), answerField.getValue());
                refreshGrid();
                clearFields();
            }
        });

        deleteButton.addClickListener(event -> {
            FAQ selectedFAQ = grid.asSingleSelect().getValue();
            if (selectedFAQ != null) {
                deleteFAQ(selectedFAQ.getId());
                refreshGrid();
                clearFields();
            }
        });

        grid.setColumns("question", "answer");
        grid.asSingleSelect().addValueChangeListener(event -> {
            FAQ selectedFAQ = event.getValue();
            if (selectedFAQ != null) {
                binder.setBean(selectedFAQ);
                questionField.setValue(selectedFAQ.getQuestion());
                answerField.setValue(selectedFAQ.getAnswer());
            } else {
                clearFields();
            }
        });

        add(title, questionField, answerField, addButton, updateButton, deleteButton, grid);
        refreshGrid();
    }

    private void addFAQ(String question, String answer) {
        try (Connection conn = DriverManager.getConnection(dbUrl);
             PreparedStatement preparedStatement = conn.prepareStatement(
                     "INSERT INTO QnATable  (question, answer) VALUES (?, ?)")) {
            preparedStatement.setString(1, question);
            preparedStatement.setString(2, answer);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void updateFAQ(long id, String question, String answer) {
        try (Connection conn = DriverManager.getConnection(dbUrl);
             PreparedStatement preparedStatement = conn.prepareStatement(
                     "UPDATE QnATable SET question = ?, answer = ? WHERE id = ?")) {
            preparedStatement.setString(1, question);
            preparedStatement.setString(2, answer);
            preparedStatement.setLong(3, id);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void deleteFAQ(long id) {
        try (Connection conn = DriverManager.getConnection(dbUrl);
             PreparedStatement preparedStatement = conn.prepareStatement(
                     "DELETE FROM QnATable WHERE id = ?")) {
            preparedStatement.setLong(1, id);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void refreshGrid() {
        try (Connection conn = DriverManager.getConnection(dbUrl);
             Statement statement = conn.createStatement();
             ResultSet rs = statement.executeQuery("SELECT * FROM QnATable")) {
            List<FAQ> faqs = new ArrayList<>();
            while (rs.next()) {
                FAQ faq = new FAQ();
                faq.setId(rs.getLong("id"));
                faq.setQuestion(rs.getString("question"));
                faq.setAnswer(rs.getString("answer"));
                faqs.add(faq);
            }
            grid.setItems(faqs);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    private void clearFields() {
        questionField.clear();
        answerField.clear();
        grid.deselectAll();
    }
}

