package com.example.appforauslenderamt.frotn.returnofthehope;

import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Paragraph;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouteAlias;
import com.vaadin.flow.component.textfield.PasswordField;
import com.vaadin.flow.component.textfield.TextField;

@Route("MasterPage")
public class MasterPageClass extends VerticalLayout {

    public MasterPageClass() {
        setAlignItems(Alignment.CENTER); // Centers all components horizontally
        H1 title = new H1("Login to master page");

        TextField usernameField = new TextField("Username");
        PasswordField passwordField = new PasswordField("Password");
        Button loginButton = new Button("Login");

        loginButton.addClickListener(e -> {
            String username = usernameField.getValue();
            String password = passwordField.getValue();

            if (isValidLogin(username, password)) {
                getUI().ifPresent(ui -> ui.navigate("MasterMenu"));
            } else {
                Notification.show("Неправильный логин или пароль");
            }
        });

        add(title, usernameField, passwordField, loginButton);
    }

    private boolean isValidLogin(String username, String password) {
        return "admin".equals(username) && "admin".equals(password);

    }
}
