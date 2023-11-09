package com.example.appforauslenderamt.controller;

import com.example.appforauslenderamt.controller.dto.UserDataRequestDto;
import com.example.appforauslenderamt.service.GenerateReportService;
import com.lowagie.text.DocumentException;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.script.ScriptException;
import java.io.IOException;

@RestController
@RequestMapping
public class FileController {

    private final GenerateReportService generateReportService;

    @Autowired
    public FileController(GenerateReportService generateReportService) {
        this.generateReportService = generateReportService;
    }

    @ApiOperation(value = "Endpoint for generation user's application form for Auslenderamt",
            notes = "Takes user data and passport image, compares entered data with passport and if matches " +
                    "generate application form")
    @PostMapping(value = "/generate_application_form", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void uploadFile(@RequestPart("passport_image") MultipartFile passportImage,
                           @RequestPart("user_ata") UserDataRequestDto userData)
            throws IOException, ScriptException, InterruptedException, DocumentException {
        generateReportService.generatePdfFromHtml(userData, passportImage);
    }

}
