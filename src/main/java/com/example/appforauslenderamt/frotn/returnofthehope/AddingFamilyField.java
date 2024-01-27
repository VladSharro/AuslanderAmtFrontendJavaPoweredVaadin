package com.example.appforauslenderamt.frotn.returnofthehope;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.radiobutton.RadioButtonGroup;
import com.vaadin.flow.component.textfield.TextField;

import java.util.List;

public class AddingFamilyField {

    public static void addChildFields(VerticalLayout layout, List<VerticalLayout> childrenLayouts) {

        layout.setAlignItems(FlexComponent.Alignment.CENTER);

        // Создаем новый горизонтальный макет для группировки полей ребенка
        VerticalLayout childLayout = new VerticalLayout();
        childLayout.setAlignItems(FlexComponent.Alignment.BASELINE);

        TextField childFirstName = new TextField("Child's first name");
        childFirstName.getElement().getStyle().set("margin", "auto"); // Центрировать текстовое поле по горизонтали

        TextField childLastName = new TextField("Child's last name");
        childLastName.getElement().getStyle().set("margin", "auto"); // Центрировать текстовое поле по горизонтали

        DatePicker childDateOfBirth = new DatePicker("Child's date of birth");
        childDateOfBirth.getElement().getStyle().set("margin", "auto"); // Центрировать текстовое поле по горизонтали


        RadioButtonGroup<String> childGender = new RadioButtonGroup<>();
        childGender.setLabel("Child's gender");
        childGender.setItems("Male", "Female", "Other");
        childLayout.setAlignItems(FlexComponent.Alignment.CENTER);


        Button removeChildButton = new Button("Remove", e -> {
            layout.remove(childLayout);
            childrenLayouts.remove(childLayout);
        });



        childLayout.add(childFirstName, childLastName, childDateOfBirth, childGender, removeChildButton);
        layout.add(childLayout);

        childrenLayouts.add(childLayout); // Добавляем макет в список для управления
    }


    public static void addFatherField(VerticalLayout layout) {

        layout.setAlignItems(FlexComponent.Alignment.CENTER);


        // Создаем новый горизонтальный макет для группировки полей ребенка
        VerticalLayout fatherLayout = new VerticalLayout();
        fatherLayout.setAlignItems(FlexComponent.Alignment.BASELINE);

        TextField fatherFirstName = new TextField("Father`s first name");
        TextField fatherLastName = new TextField("Father`s last name");
        DatePicker fatherDateOfBirth = new DatePicker("Father's date of birth");
        DatePicker fatherNationality = new DatePicker("Father's nationality");


        //fatherLayout.add(fatherFirstName, fatherLastName, fatherDateOfBirth, fatherNationality);
        //fatherLayout.add(fatherLayout);

        //layout.add(fatherLayout); // Добавляем макет в список для управления
        layout.add(fatherFirstName, fatherLastName, fatherDateOfBirth, fatherNationality);

    }


    public static void addMotherField(VerticalLayout layout) {

        layout.setAlignItems(FlexComponent.Alignment.CENTER);

        // Создаем новый горизонтальный макет для группировки полей ребенка
        VerticalLayout motherLayout = new VerticalLayout();
        motherLayout.setAlignItems(FlexComponent.Alignment.BASELINE);

        TextField motherFirstName = new TextField("Mother`s first name");
        TextField motherLastName = new TextField("Mother`s last name");
        DatePicker motherDateOfBirth = new DatePicker("Mother's date of birth");
        DatePicker motherNationality = new DatePicker("Mother's nationality");



        //motherLayout.add(motherFirstName, motherLastName, motherDateOfBirth, motherNationality);
        //motherLayout.add(motherLayout);

        //layout.add(motherLayout); // Добавляем макет в список для управления
        layout.add(motherFirstName, motherLastName, motherDateOfBirth, motherNationality);

    }
}
