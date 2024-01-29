package com.example.appforauslenderamt.frotn.returnofthehope;

import com.example.appforauslenderamt.service.OCRService;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.router.Route;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Route("application")
public class ApplicationView extends VerticalLayout {

    private Map<Tab, VerticalLayout> tabsToPages = new HashMap<>();

    private final Button exportToFinalButton = new Button("Next");


    public ApplicationView(OCRService ocrService) throws IOException {
        setAlignItems(Alignment.CENTER);

        Tabs tabs = new Tabs();

        Tab passportTab = new Tab("Passport");
        PassportClass passportContent = new PassportClass(ocrService);

        Tab familyTab = new Tab("Family");
        FamilyClass familyContent = new FamilyClass();

        Tab recidenceTab = new Tab("Residence");
        ResidenceClass recidenceContent = new ResidenceClass(ocrService);

        Tab supportTab = new Tab("Support");
        SupportClass supportContent = new SupportClass(ocrService);

        Tab insuranceTab = new Tab("Insurance");
        InsuranceClass insuranceContent = new InsuranceClass(ocrService);

        Tab OffenceTab = new Tab("Offence");
        OffencesClass offenceContent = new OffencesClass();

        Tab PhotoTab = new Tab("Other Documents");
        OtherDocuments PhotoContent = new OtherDocuments();

        tabs.add(passportTab, familyTab, recidenceTab, supportTab, insuranceTab, OffenceTab, PhotoTab);

        tabsToPages.put(passportTab, passportContent);
        tabsToPages.put(familyTab, familyContent);
        tabsToPages.put(recidenceTab, recidenceContent);
        tabsToPages.put(supportTab, supportContent);
        tabsToPages.put(insuranceTab, insuranceContent);
        tabsToPages.put(OffenceTab, offenceContent);
        tabsToPages.put(PhotoTab, PhotoContent);

        tabs.setSelectedTab(passportTab);

        familyContent.setVisible(false);
        recidenceContent.setVisible(false);
        supportContent.setVisible(false);
        insuranceContent.setVisible(false);
        offenceContent.setVisible(false);
        PhotoContent.setVisible(false);

        tabs.addSelectedChangeListener(event -> {
            tabsToPages.values().forEach(page -> page.setVisible(false));
            VerticalLayout selectedPage = tabsToPages.get(tabs.getSelectedTab());
            selectedPage.setVisible(true);
        });

        tabs.setSelectedTab(passportTab);
        familyContent.setVisible(false);

        tabs.addSelectedChangeListener(event -> {
            tabsToPages.values().forEach(page -> page.setVisible(false));
            VerticalLayout selectedPage = tabsToPages.get(tabs.getSelectedTab());
            selectedPage.setVisible(true);


            UI.getCurrent().getSession().setAttribute("selectedTab", tabs.getSelectedTab().getLabel());
        });

        tabs.setSelectedTab(passportTab);
        familyContent.setVisible(false);


        HorizontalLayout tabsLayout = new HorizontalLayout(tabs);
        tabsLayout.setWidthFull();
        tabsLayout.setJustifyContentMode(JustifyContentMode.CENTER);

        Button GotoFinal = new Button("Go to Final");
        GotoFinal.addClickListener(e -> {
            boolean isExtension = false;
            getUI().ifPresent(ui -> ui.navigate("finale"));
        });
        add(tabsLayout, GotoFinal);
        tabsToPages.values().forEach(this::add);
    }
}
