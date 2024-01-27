package com.example.appforauslenderamt.frotn.returnofthehope;

import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Route("FAQRead")
@PageTitle("FAQ | Read-Only")
public class FAQRead extends VerticalLayout {

    private Grid<FAQ> grid = new Grid<>(FAQ.class);

    public FAQRead() {
        setSizeFull();
        configureGrid();
        add(new H1("Frequently Asked Questions"), grid);
        updateList();
    }

    private void configureGrid() {
        grid.setSizeFull();
        grid.setColumns("question", "answer");
    }

    private void updateList() {
        List<FAQ> faqList = fetchFAQs();
        grid.setItems(faqList);
    }

    private List<FAQ> fetchFAQs() {
        List<FAQ> faqList = new ArrayList<>();
        String dbUrl = "jdbc:sqlite:src/main/resources/QnADatabase.db";
        try (Connection conn = DriverManager.getConnection(dbUrl);
             Statement statement = conn.createStatement();
             ResultSet rs = statement.executeQuery("SELECT * FROM QnATable")) {
            while (rs.next()) {
                FAQ faq = new FAQ();
                faq.setId(rs.getLong("id"));
                faq.setQuestion(rs.getString("Question"));
                faq.setAnswer(rs.getString("Answer"));
                faqList.add(faq);
            }
        } catch (SQLException e) {
            e.printStackTrace(); // В реальном приложении здесь следует добавить логирование
        }
        return faqList;
    }
}
