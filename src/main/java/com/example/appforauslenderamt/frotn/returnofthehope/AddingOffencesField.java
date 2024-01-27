package com.example.appforauslenderamt.frotn.returnofthehope;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;

public class AddingOffencesField {

    public static void addViolatingField(VerticalLayout layout) {
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        VerticalLayout violatingLayout = new VerticalLayout();
        violatingLayout.setAlignItems(FlexComponent.Alignment.BASELINE);

        ComboBox<String> OffencePlace = new ComboBox<>("Place Of Offence");
        OffencePlace.setItems("In Germany", "Abroad");
        OffencePlace.setPlaceholder("Select...");

        TextField ReasonViolance = new TextField("Reason of violance");
        TextField typeOfConviction = new TextField("Type of conviction, amount of fine or prison sentence");

        layout.add(OffencePlace, ReasonViolance, typeOfConviction);

    }

    public static void addInvestigationField(VerticalLayout layout) {
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        VerticalLayout invesigationLayout = new VerticalLayout();
        invesigationLayout.setAlignItems(FlexComponent.Alignment.BASELINE);

        ComboBox<String> InvestigationPlace = new ComboBox<>("Place Of Offence");
        InvestigationPlace.setItems("In Germany", "Abroad");
        InvestigationPlace.setPlaceholder("Select...");

        TextField investigationAuthority = new TextField("Reason of violance");

        layout.add(InvestigationPlace, investigationAuthority);
    }

    public static void addDeportationField(VerticalLayout layout) {
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        VerticalLayout DeportationLayout = new VerticalLayout();
        DeportationLayout.setAlignItems(FlexComponent.Alignment.BASELINE);

        TextField countryDeport = new TextField("From (country)");
        DatePicker dateOf = new DatePicker("On which date?");

        layout.add(countryDeport, dateOf);
    }

    public static void addReasonOfRejectionField(VerticalLayout layout) {
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        VerticalLayout ReasonOfRejectionLayout = new VerticalLayout();
        ReasonOfRejectionLayout.setAlignItems(FlexComponent.Alignment.BASELINE);

        TextField countryRejection = new TextField("From (country)");
        DatePicker dateOfRej = new DatePicker("On which date?");

        layout.add(countryRejection, dateOfRej);
    }

    public static void addAnyRejectionField(VerticalLayout layout) {
        layout.setAlignItems(FlexComponent.Alignment.CENTER);
        VerticalLayout AnyRejectionLayout = new VerticalLayout();
        AnyRejectionLayout.setAlignItems(FlexComponent.Alignment.BASELINE);

        TextField countryIsRejection = new TextField("From (country)");
        DatePicker dateIsRej = new DatePicker("On which date?");

        layout.add(countryIsRejection, dateIsRej);
    }
}
