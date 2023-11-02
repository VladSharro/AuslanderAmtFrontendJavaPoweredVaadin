package com.example.appforauslenderamt.service;

import com.example.appforauslenderamt.controller.dto.UserDataRequestDto;
import com.example.appforauslenderamt.exceptions.DataDoNotMatchWithPassportException;
import com.itextpdf.text.Document;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.pdf.PdfContentByte;
import com.itextpdf.text.pdf.PdfImportedPage;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.lowagie.text.DocumentException;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.fit.pdfdom.PDFDomTree;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Locale;

@Service
public class GenerateReportService {

    private String familyNamePassportValue;
    private String firstNamePassportValue;

    public void generatePdfFromHtml(UserDataRequestDto userDataRequestDto) throws IOException, DocumentException,
            InterruptedException {
        String html = parseThymeleafTemplate(userDataRequestDto);
        String outputFolder = "src/main/resources/user_form.pdf";
        OutputStream outputStream = new FileOutputStream(outputFolder);

        ITextRenderer renderer = new ITextRenderer();
        renderer.setDocumentFromString(html);
        renderer.layout();
        renderer.createPDF(outputStream);

        outputStream.close();
        mergePdf();
    }

    private String parseThymeleafTemplate(UserDataRequestDto userDataRequestDto) {
        checkWithPassport(userDataRequestDto.getPersonalData().getFamilyName(),
                userDataRequestDto.getPersonalData().getFirstName());

        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode(TemplateMode.HTML);

        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);

        Context context = new Context();
        context.setVariable("family_name", userDataRequestDto.getPersonalData().getFamilyName());
        context.setVariable("first_name", userDataRequestDto.getPersonalData().getFirstName());
        context.setVariable("date_of_birth", userDataRequestDto.getPersonalData().getDateOfBirth());
        context.setVariable("place_of_birth", userDataRequestDto.getPersonalData().getPlaceOfBirth());
        context.setVariable("nationalities", String.join(", ",
                userDataRequestDto.getPersonalData().getNationalities()));
        context.setVariable("height", userDataRequestDto.getHeight());
        context.setVariable("mobile_number", userDataRequestDto.getMobileNumber());
        context.setVariable("email", userDataRequestDto.getEmail());
        context.setVariable("passport_number", userDataRequestDto.getPassportNumber());
        context.setVariable("valid_from_till", String.format("%s / %s", userDataRequestDto.getValidFrom(),
                userDataRequestDto.getValidTill()));

        return templateEngine.process("form_template", context);
    }

    private void generateHTMLFromPDF(String filename) throws IOException {
        PDDocument pdf = PDDocument.load(new File(filename));
        PDFDomTree parser = new PDFDomTree();
        Writer output = new PrintWriter("src/main/resources/form_template.html", StandardCharsets.UTF_8);
        parser.writeText(pdf, output);
        output.close();
        if (pdf != null) {
            pdf.close();
        }
    }

    private void generatePDFFromHTML(String filename) throws IOException, com.itextpdf.text.DocumentException {
        Document document = new Document();
        PdfWriter writer = PdfWriter.getInstance(document,
                new FileOutputStream("src/main/resources/form_template.html"));
        document.open();
        XMLWorkerHelper.getInstance().parseXHtml(writer, document, new FileInputStream(filename));
        document.close();
    }

    public void getDataFromPassport(MultipartFile file) throws IOException, InterruptedException {
        byte[] imageBytes = file.getBytes();

        // Encode the image data in Base64
        String encodedImage = Base64.getEncoder().encodeToString(imageBytes);

        ProcessBuilder processBuilder = new ProcessBuilder("python3", "src/main/resources/passport_analys.py");
        processBuilder.environment().put("IMAGE_DATA", encodedImage);
        processBuilder.redirectErrorStream(true);

        Process process = processBuilder.start();
        process.waitFor();

        InputStream inputStream = process.getInputStream();
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        String line = reader.readLine();
        // Process line of the output here
        String[] familyNameAndFirstName = line.split(" ");

        familyNamePassportValue = familyNameAndFirstName[0];
        firstNamePassportValue = familyNameAndFirstName[1];

        process.waitFor(); // Wait for the process to finish

    }

    private void checkWithPassport(String familyName, String firstName) {
        if (!familyName.toLowerCase(Locale.ROOT).equals(familyNamePassportValue.toLowerCase(Locale.ROOT)) ||
                !firstName.toLowerCase(Locale.ROOT).equals(firstNamePassportValue.toLowerCase(Locale.ROOT))) {
            System.out.println(familyNamePassportValue);
            System.out.println(firstNamePassportValue);
            throw new DataDoNotMatchWithPassportException("Family name or first name doesn't match with passport data");
        }
    }

    private void mergePdf() {
        try {
            Document document = new Document();
            PdfWriter writer = PdfWriter.getInstance(document,
                    new FileOutputStream("src/main/resources/final_document.pdf"));
            document.open();
            PdfContentByte contentByte = writer.getDirectContent();

            // Add PDF file
            PdfReader pdfReader = new PdfReader("src/main/resources/user_form.pdf");
            int numPages = pdfReader.getNumberOfPages();
            for (int pageNum = 1; pageNum <= numPages; pageNum++) {
                PdfImportedPage page = writer.getImportedPage(pdfReader, pageNum);
                document.newPage();
                contentByte.addTemplate(page, 0, 0);
            }

            // Add JPG file
            Image jpgImage = Image.getInstance("src/main/resources/passport.jpg");
            document.newPage();
            jpgImage.setAbsolutePosition(0, 0);
            jpgImage.scaleToFit(PageSize.A4);
            contentByte.addImage(jpgImage);

            document.close();
            writer.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
