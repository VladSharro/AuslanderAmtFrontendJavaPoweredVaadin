package com.example.appforauslenderamt.frotn.returnofthehope;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("startview")
public class StartView extends VerticalLayout {



    private boolean isExtension = false;

    public StartView() {

        setAlignItems(Alignment.CENTER); // Центрирует все компоненты по горизонтали

        H1 title = new H1("Residence Permit Application Portal");

        Button firstPermitButton = new Button("This is my first permit");
        firstPermitButton.addClickListener(e -> {
            isExtension = false;
            getUI().ifPresent(ui -> ui.navigate("application"));
        });

        Button extendPermitButton = new Button("I want to extend my permit");
        extendPermitButton.addClickListener(e -> {
            isExtension = true;
            getUI().ifPresent(ui -> ui.navigate("application"));
        });

        add(title, firstPermitButton, extendPermitButton);
    }

    public boolean isExtension() {
        return isExtension;
    }
}
