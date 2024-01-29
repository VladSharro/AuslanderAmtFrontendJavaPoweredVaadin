package com.example.appforauslenderamt.frotn.returnofthehope;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.orderedlayout.FlexComponent.Alignment;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Consumer;

public class FamilyClass extends VerticalLayout {

    private List<VerticalLayout> childrenLayouts = new ArrayList<>();
    private VerticalLayout fatherFieldsLayout = new VerticalLayout();
    private VerticalLayout motherFieldsLayout = new VerticalLayout();

    private final Button exportToJsonButton = new Button("Next");




    public FamilyClass() {
        setAlignItems(Alignment.CENTER);

        // Дочерние макеты
        VerticalLayout childrenFieldsLayout = new VerticalLayout();
        childrenFieldsLayout.setVisible(false);

        Button addChildButton = new Button("Add child");
        addChildButton.addClickListener(e -> AddingFamilyField.addChildFields(childrenFieldsLayout, childrenLayouts));
        addChildButton.setVisible(false);

        ComboBox<String> haveChildren = new ComboBox<>("Do you have children?");
        haveChildren.setItems("Yes", "No");
        haveChildren.setPlaceholder("Select...");

        haveChildren.addValueChangeListener(event -> {
            boolean hasChildren = "Yes".equals(event.getValue());
            childrenFieldsLayout.setVisible(hasChildren);
            addChildButton.setVisible(hasChildren);
            if (hasChildren) {
                AddingFamilyField.addChildFields(childrenFieldsLayout, childrenLayouts);
            } else {
                childrenFieldsLayout.removeAll();
                childrenLayouts.clear();
            }
        });

        // Макеты для отца и матери

        fatherFieldsLayout.setVisible(false);
        motherFieldsLayout.setVisible(false);

        ComboBox<String> fatherData = new ComboBox<>("Is the father data applicable?");
        fatherData.setItems("Yes", "No");
        fatherData.setPlaceholder("Select...");

        fatherData.addValueChangeListener(event -> {
            boolean hasFather = "Yes".equals(event.getValue());
            fatherFieldsLayout.setVisible(hasFather);
            if (hasFather) {
                AddingFamilyField.addFatherField(fatherFieldsLayout);
            } else {
                fatherFieldsLayout.removeAll();
            }
        });

        ComboBox<String> motherData = new ComboBox<>("Is the mother data applicable?");
        motherData.setItems("Yes", "No");
        motherData.setPlaceholder("Select...");

        motherData.addValueChangeListener(event -> {
            boolean hasMother = "Yes".equals(event.getValue());
            motherFieldsLayout.setVisible(hasMother);
            if (hasMother) {
                AddingFamilyField.addMotherField(motherFieldsLayout);
            } else {
                motherFieldsLayout.removeAll();
            }
        });

        // Добавляем компоненты на макет
        add(haveChildren, childrenFieldsLayout, addChildButton, fatherData, fatherFieldsLayout, motherData, motherFieldsLayout);
    }

    private void updateParentFields(String value, VerticalLayout layout, Consumer<VerticalLayout> addMethod) {
        if ("Yes".equals(value)) {
            addMethod.accept(layout);
            layout.setVisible(true);
        } else {
            layout.removeAll();
            layout.setVisible(false);
        }
    }


}
