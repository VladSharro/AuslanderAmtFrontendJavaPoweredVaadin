package com.example.appforauslenderamt.controller;

import com.example.appforauslenderamt.controller.dto.UserDataRequestDto;
import com.example.appforauslenderamt.service.GenerateReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.script.ScriptException;
import java.io.IOException;

@RestController
@RequestMapping("/file")
public class FileController {

    private final GenerateReportService generateReportService;

    @Autowired
    public FileController(GenerateReportService generateReportService) {
        this.generateReportService = generateReportService;
    }

    @RequestMapping(method = RequestMethod.POST, consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void uploadFile(@RequestPart("file") MultipartFile file) throws IOException, ScriptException,
            InterruptedException {
        generateReportService.getDataFromPassport(file);
    }

    @PostMapping(value = "/generate-report")
    @ResponseStatus(HttpStatus.OK)
    public void generateReport(@RequestBody UserDataRequestDto userDataRequestDto) throws Exception {
        generateReportService.generatePdfFromHtml(userDataRequestDto);
    }

}
