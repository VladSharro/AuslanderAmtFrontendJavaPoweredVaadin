package com.example.appforauslenderamt.frotn.returnofthehope;

import java.util.Map;

public class UserData {
    private Map<String, Object> passportData;
    private Map<String, Object> familyData;
    // Можно добавить другие свойства для других вкладок

    // Геттеры и сеттеры для каждого свойства
    public Map<String, Object> getPassportData() {
        return passportData;
    }

    public void setPassportData(Map<String, Object> passportData) {
        this.passportData = passportData;
    }

    public Map<String, Object> getFamilyData() {
        return familyData;
    }

    public void setFamilyData(Map<String, Object> familyData) {
        this.familyData = familyData;
    }

    // ... геттеры и сеттеры для других свойств, если они есть ...
}
