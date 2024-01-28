package com.example.appforauslenderamt.frotn.returnofthehope;

import com.example.appforauslenderamt.service.OCRService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Route("application")
public class ApplicationView extends VerticalLayout {

    private Map<Tab, VerticalLayout> tabsToPages = new HashMap<>();

    // Делаем переменные содержимого вкладок членами класса
    private PassportClass passportContent;
    private FamilyClass familyContent;
    private ResidenceClass residenceContent;
    private SupportClass supportContent;
    private InsuranceClass insuranceContent;
    private OffencesClass offenceContent;
    private OtherDocuments photoContent;

    public ApplicationView(OCRService ocrService) throws IOException {
        setAlignItems(Alignment.CENTER);

        Tabs tabs = new Tabs();

        // Инициализация и добавление вкладок и их содержимого
        Tab passportTab = new Tab("Passport");
        passportContent = new PassportClass(ocrService, this);
        Tab familyTab = new Tab("Family");
        familyContent = new FamilyClass();
        Tab residenceTab = new Tab("Residence");
        residenceContent = new ResidenceClass();
        Tab supportTab = new Tab("Support");
        supportContent = new SupportClass(ocrService);
        Tab insuranceTab = new Tab("Insurance");
        insuranceContent = new InsuranceClass(ocrService);
        Tab offenceTab = new Tab("Offence");
        offenceContent = new OffencesClass();
        Tab photoTab = new Tab("Other Documents");
        photoContent = new OtherDocuments();

        tabs.add(passportTab, familyTab, residenceTab, supportTab, insuranceTab, offenceTab, photoTab);
        tabsToPages.put(passportTab, passportContent);
        tabsToPages.put(familyTab, familyContent);
        tabsToPages.put(residenceTab, residenceContent);
        tabsToPages.put(supportTab, supportContent);
        tabsToPages.put(insuranceTab, insuranceContent);
        tabsToPages.put(offenceTab, offenceContent);
        tabsToPages.put(photoTab, photoContent);

        tabsToPages.values().forEach(page -> page.setVisible(false));
        tabsToPages.get(passportTab).setVisible(true); // Показываем содержимое только для первой вкладки

        tabs.addSelectedChangeListener(event -> {
            tabsToPages.values().forEach(page -> page.setVisible(false));
            VerticalLayout selectedPage = tabsToPages.get(tabs.getSelectedTab());
            selectedPage.setVisible(true);

            // Сохраняем данные текущей вкладки и обновляем информацию в сессии
            saveCurrentTabData(tabs.getSelectedTab().getLabel());
            UI.getCurrent().getSession().setAttribute("selectedTab", tabs.getSelectedTab().getLabel());
        });

        HorizontalLayout tabsLayout = new HorizontalLayout(tabs);
        tabsLayout.setWidthFull(); // Устанавливаем полную ширину для растягивания макета
        tabsLayout.setJustifyContentMode(JustifyContentMode.CENTER); // Центрируем вкладки в макете

        add(tabsLayout);
        tabsToPages.values().forEach(this::add);

        passportContent = new PassportClass(ocrService, this);

    }

    public void saveCurrentTabData(String tabLabel) {
        UserData userData = readUserData();
        if (userData == null) {
            userData = new UserData();
        }

        switch (tabLabel) {
            case "Passport":
                userData.setPassportData(passportContent.getData());
                break;
            //case "Family":
                //userData.setFamilyData(familyContent.getData());
                //break;
            // Добавьте обработку для остальных вкладок...
            // И так далее для каждой вкладки
        }

        writeUserData(userData);
    }

    private UserData readUserData() {
        ObjectMapper objectMapper = new ObjectMapper();
        File file = new File("userdata.json");
        if (!file.exists()) {
            return new UserData();
        }
        try {
            return objectMapper.readValue(file, UserData.class);
        } catch (IOException e) {
            e.printStackTrace();
            return new UserData();
        }
    }


    private void writeUserData(UserData userData) {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            objectMapper.writeValue(new File("userdata.json"), userData);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
