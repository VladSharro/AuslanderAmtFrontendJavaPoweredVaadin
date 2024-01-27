package com.example.appforauslenderamt.frotn.returnofthehope;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;

@Route("MasterMenu")
public class MasterMenuClass extends VerticalLayout {

    public MasterMenuClass(){
        setAlignItems(Alignment.CENTER); // Centers all components horizontally

        Button faqButton = new Button("Go to FAQChange");
        faqButton.addClickListener(e -> {
            getUI().ifPresent(ui -> ui.navigate("FAQChange"));
        });

        // Добавляем кнопку на страницу
        add(faqButton);
    }
}
