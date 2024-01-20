import os

import cv2
import pytesseract
import re
import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk
import io
import base64
import fitz  # PyMuPDF
import numpy as np
from datetime import datetime
from passporteye import read_mrz, mrz


def find_index_of_phrase(lines, phrase):
    for i, line in enumerate(lines):
        if phrase in line:
            return i
    return -1

def extract_immatrikulation(encoded_pdf):
    # Decode the base64-encoded PDF
    decoded_pdf = base64.b64decode(encoded_pdf)

    # Create a BytesIO object to simulate a file-like object from the decoded PDF
    pdf_stream = io.BytesIO(decoded_pdf)

    # Use PyMuPDF to extract text
    text = ""

    doc = fitz.open(stream=pdf_stream, filetype="pdf")
    page = doc[0]  # Assuming the information is on the first page

    # Extract text from the PDF page
    extracted_text = page.get_text()

    # Split the extracted text into lines
    lines = extracted_text.split('\n')

    for i, line in enumerate(lines):
        if lines[i] == "Herr" or lines[i] == "Frau":
            #print(lines[i])
            name, surname = lines[i + 1].split()
        print(i, "   ", line)

        if lines[i] == "geboren am":
            date_birth = lines[i + 1]

        if lines[i] == "geboren in":
            city = lines[i + 1]

        if lines[i] == "wohnhaft in":
            address = lines[i + 1]
        
        if lines[i] == "Vorlesungsende":
            semester_ends = lines[i + 1]

    return name, surname, date_birth, city, address, semester_ends

if __name__ == "__main__":
    # Access the image data from the environment variable
    image_data = os.environ.get("IMAGE_DATA")

    # Call the function and print the result
    name, date_birth, city, address, semester_ends = extract_immatrikulation(image_data)
    print(','.join([name, surname, date_birth, city, address, semester_ends]))