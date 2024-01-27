package com.example.appforauslenderamt.frotn.returnofthehope;

import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.orderedlayout.FlexComponent;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;

public class AddingSupportField {

    public static void benefitsBook(VerticalLayout bookLayouts) {
        bookLayouts.setAlignItems(FlexComponent.Alignment.CENTER);

        // Создаем новый горизонтальный макет для группировки полей Code of Social Law
        VerticalLayout codeSocialLawLayout = new VerticalLayout();
        codeSocialLawLayout.setAlignItems(FlexComponent.Alignment.CENTER); // Центрирование элементов внутри этого макета

        ComboBox<String> codeSocialLaw = new ComboBox<>("Code of social law");
        codeSocialLaw.setItems("Social welfare benefits", "Basic support for employment seekers (Unemployment Benefit Scheme II)");
        codeSocialLaw.setPlaceholder("Select...");

        // Добавляем элементы в макет codeSocialLawLayout
        codeSocialLawLayout.add(codeSocialLaw);

        // Добавляем макет codeSocialLawLayout в bookLayouts
        bookLayouts.add(codeSocialLawLayout);
    }
}
