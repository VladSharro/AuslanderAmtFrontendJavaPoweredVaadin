package com.example.appforauslenderamt.frotn.returnofthehope;

import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.upload.SucceededEvent;
import com.vaadin.flow.component.upload.Upload;
import com.vaadin.flow.component.upload.receivers.FileBuffer;
import com.vaadin.flow.component.upload.receivers.MemoryBuffer;
import com.vaadin.flow.server.StreamResource;
import com.vaadin.flow.shared.Registration;

import java.io.InputStream;

public class PdfUpload extends Upload {

    private final String label;
    private final MemoryBuffer buffer;

    public PdfUpload(String label, MemoryBuffer buffer) {
        this.label = label;
        this.buffer = buffer;

        setReceiver(buffer);
        setAcceptedFileTypes("application/pdf");
        setMaxFiles(1);
    }

    @Override
    public Registration addSucceededListener(ComponentEventListener<SucceededEvent> listener) {
        return super.addSucceededListener(event -> {
            InputStream pdfInputStream = buffer.getInputStream();
            StreamResource streamResource = new StreamResource(label + ".pdf", () -> pdfInputStream);
            streamResource.setContentType("application/pdf");
            // Handle the PDF file as needed, e.g., save it or display it
            // You can use streamResource to display or download the PDF if required

            listener.onComponentEvent(event);
        });
    }
}
