package com.example.appforauslenderamt.frotn.returnofthehope;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;

public class JsonUtil {
    private static final String FILE_PATH = "path/to/your/jsonfile.json";
    private static final ObjectMapper mapper = new ObjectMapper();

    public static UserData readUserData() {
        try {
            return mapper.readValue(new File(FILE_PATH), UserData.class);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    public static void writeUserData(UserData userData) {
        try {
            mapper.writeValue(new File(FILE_PATH), userData);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
