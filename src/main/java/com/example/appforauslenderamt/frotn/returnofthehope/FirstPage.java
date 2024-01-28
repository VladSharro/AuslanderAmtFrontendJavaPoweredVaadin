package com.example.appforauslenderamt.frotn.returnofthehope;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("") // Empty string indicates the start page
public class FirstPage extends VerticalLayout {

    public FirstPage() {
        setAlignItems(Alignment.CENTER); // Centers all components horizontally

        // Horizontal layout for the top bar with the Master Page button
        HorizontalLayout topBarLayout = new HorizontalLayout();
        topBarLayout.setWidthFull();
        topBarLayout.setJustifyContentMode(JustifyContentMode.END);

        // Master Page button
        Button masterPageButton = new Button("Master Page");
        masterPageButton.addClickListener(e -> {
            masterPageButton.getUI().ifPresent(ui -> ui.navigate("MasterPage"));
        });

        topBarLayout.add(masterPageButton);

        // Page title
        H1 title = new H1("Residence Permit Application Portal");

        // Start Application button
        Button startApplication = new Button("Start Application");
        startApplication.addClickListener(e -> {
            startApplication.getUI().ifPresent(ui -> ui.navigate("startview"));
        });

        H1 FAQ = new H1("Frequently asked questions");

        Button FAQPageButton = new Button("Frequently asked questions");
        FAQPageButton.addClickListener(e -> {
            masterPageButton.getUI().ifPresent(ui -> ui.navigate("FAQRead"));
        });


        Button DocPageButton = new Button("Documents which needed");
        DocPageButton.addClickListener(e -> {
            masterPageButton.getUI().ifPresent(ui -> ui.navigate("documents"));
        });

        // Information paragraph
        Paragraph info = new Paragraph("You can apply for a student residence permit, both first-time and extension, through this service. We'll take you through the application step by step.");

        // Continue Application button
        Button continueApplication = new Button("Continue Application");
        continueApplication.addClickListener(e -> {
            // Logic for continuing an existing application
        });

        // Add components to the layout
        add(topBarLayout, title, info, startApplication, continueApplication, FAQ, FAQPageButton, DocPageButton);
    }
}
