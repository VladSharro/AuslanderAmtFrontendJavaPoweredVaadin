package com.example.appforauslenderamt.frotn.returnofthehope;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;


public class OffencesClass extends VerticalLayout {

    private VerticalLayout ConvictViolatingFieldsLayout = new VerticalLayout();
    private VerticalLayout CriminalOffenceFieldsLayout = new VerticalLayout();

    private VerticalLayout DeportFromGerFieldsLayout = new VerticalLayout();
    private VerticalLayout RejectionGerFieldsLayout = new VerticalLayout();

    private VerticalLayout RejectionAnyTimeFieldsLayout = new VerticalLayout();

    public OffencesClass(){
        setAlignItems(FlexComponent.Alignment.CENTER);

        ConvictViolatingFieldsLayout.setVisible(false);
        CriminalOffenceFieldsLayout.setVisible(false);
        DeportFromGerFieldsLayout.setVisible(false);
        RejectionGerFieldsLayout.setVisible(false);
        RejectionAnyTimeFieldsLayout.setVisible(false);

        ComboBox<String> ConvictViolatingData = new ComboBox<>("Have you been convicted for violating the law?");
        ConvictViolatingData.setItems("Yes", "No");
        ConvictViolatingData.setPlaceholder("Select...");

        ConvictViolatingData.addValueChangeListener(event -> {
            boolean hasConvictViolating = "Yes".equals(event.getValue());
            ConvictViolatingFieldsLayout.setVisible(hasConvictViolating);
            if (hasConvictViolating) {
                AddingOffencesField.addViolatingField(ConvictViolatingFieldsLayout);
            } else {
                ConvictViolatingFieldsLayout.removeAll();
            }
        });

        ComboBox<String> CriminalOffence = new ComboBox<>("Are you under investigation for a suspected criminal offence?");
        CriminalOffence.setItems("Yes", "No");
        CriminalOffence.setPlaceholder("Select...");

        CriminalOffence.addValueChangeListener(event -> {
            boolean hasCriminalOffence = "Yes".equals(event.getValue());
            CriminalOffenceFieldsLayout.setVisible(hasCriminalOffence);
            if (hasCriminalOffence) {
                AddingOffencesField.addInvestigationField(CriminalOffenceFieldsLayout);
            } else {
                CriminalOffenceFieldsLayout.removeAll();
            }
        });

        ComboBox<String> DeportFromGerData = new ComboBox<>("Have you ever been expelled or deported from Germany or a signatory nation to the Schengen Convention?\n");
        DeportFromGerData.setItems("Yes", "No");
        DeportFromGerData.setPlaceholder("Select...");

        DeportFromGerData.addValueChangeListener(event -> {
            boolean hasDeportFromGer = "Yes".equals(event.getValue());
            DeportFromGerFieldsLayout.setVisible(hasDeportFromGer);
            if (hasDeportFromGer) {
                AddingOffencesField.addDeportationField(DeportFromGerFieldsLayout);
            } else {
                DeportFromGerFieldsLayout.removeAll();
            }
        });

        ComboBox<String> RejectionGerData = new ComboBox<>("Has any entry application you may have filed been rejected by Germany or a signatory nation to the Schengen Convention?");
        RejectionGerData.setItems("Yes", "No");
        RejectionGerData.setPlaceholder("Select...");

        RejectionGerData.addValueChangeListener(event -> {
            boolean hasRejectionGer = "Yes".equals(event.getValue());
            RejectionGerFieldsLayout.setVisible(hasRejectionGer);
            if (hasRejectionGer) {
                AddingOffencesField.addReasonOfRejectionField(RejectionGerFieldsLayout);
            } else {
                RejectionGerFieldsLayout.removeAll();
            }
        });

        ComboBox<String> RejectionAnyTimeData = new ComboBox<>("Has any application for a residence title / a residence authorization you may have filed been rejected by Germany or a signatory nation to the Schengen Convention?");
        RejectionAnyTimeData.setItems("Yes", "No");
        RejectionAnyTimeData.setPlaceholder("Select...");

        RejectionAnyTimeData.addValueChangeListener(event -> {
            boolean hasRejectionAnyTime = "Yes".equals(event.getValue());
            RejectionAnyTimeFieldsLayout.setVisible(hasRejectionAnyTime);
            if (hasRejectionAnyTime) {
                AddingOffencesField.addAnyRejectionField(RejectionAnyTimeFieldsLayout);
            } else {
                RejectionAnyTimeFieldsLayout.removeAll();
            }
        });

        // Добавляем компоненты на макет
        add(ConvictViolatingData, ConvictViolatingFieldsLayout, CriminalOffence, CriminalOffenceFieldsLayout,
                DeportFromGerData, DeportFromGerFieldsLayout, RejectionGerData, RejectionGerFieldsLayout, RejectionAnyTimeData, RejectionAnyTimeFieldsLayout);
    }
}
