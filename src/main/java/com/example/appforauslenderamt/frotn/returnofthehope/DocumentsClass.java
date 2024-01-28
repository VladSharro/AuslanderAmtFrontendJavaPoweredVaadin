package com.example.appforauslenderamt.frotn.returnofthehope;

import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.ListItem;
import com.vaadin.flow.component.html.UnorderedList;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;

@Route("documents")
public class DocumentsClass extends VerticalLayout {

    public DocumentsClass() {

        setAlignItems(FlexComponent.Alignment.CENTER); // Center all components horizontally in this layout

        H2 heading = new H2("DOCUMENTS WHICH NEEDED");

        UnorderedList documentList = new UnorderedList(
                new ListItem("Passport"),
                new ListItem("Insurance"),
                new ListItem("Photo"),
                new ListItem("Blocked account or Working contract"),
                new ListItem("Photo of signature")
        );

        add(heading, documentList);
    }
}
