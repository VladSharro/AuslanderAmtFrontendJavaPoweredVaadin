package com.example.appforauslenderamt.frotn.returnofthehope;

import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;

public class previousStayAdding {



    public static void addPreviousStayFields(VerticalLayout layout) {



        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        VerticalLayout stayLayout = new VerticalLayout();
        stayLayout.setAlignItems(FlexComponent.Alignment.BASELINE);

        DatePicker fromDateField = new DatePicker("From (Date)");
        fromDateField.getElement().getStyle().set("margin", "auto");

        DatePicker toDateField = new DatePicker("To (Date)");
        toDateField.getElement().getStyle().set("margin", "auto");

        TextField whereField = new TextField("Address of stays in Germany");
        whereField.getElement().getStyle().set("margin", "auto");

        layout.add(fromDateField, toDateField, whereField);
    }

    public static void addResidenceAbroadFields(VerticalLayout layout) {
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        VerticalLayout stayLayout = new VerticalLayout();
        stayLayout.setAlignItems(FlexComponent.Alignment.BASELINE);

        TextField abroadField = new TextField("Place of residence abroad (postal code, place, street, country)");
        abroadField.getElement().getStyle().set("margin", "auto");

        layout.add(abroadField);
    }
}