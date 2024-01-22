import os
import json
import cv2
import pytesseract
import re
# from tkinter import filedialog
# from PIL import Image, ImageTk
import io
import base64
import fitz  # PyMuPDF
import numpy as np
from datetime import datetime
from passporteye import read_mrz, mrz
import sys


def find_index_of_phrase(lines, phrase):
    for i, line in enumerate(lines):
        if phrase in line:
            return i
    return -1

def extract_immatrikulation(encoded_pdf_path):
    # Read the encoded PDF file
    with open(encoded_pdf_path, 'rb') as pdf_file:
        # Decode the base64-encoded PDF
        decoded_pdf = base64.b64decode(pdf_file.read())

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

    name = ""
    surname = ""
    date_birth = ""
    city = ""
    address = ""
    semester_ends = ""

    for i, line in enumerate(lines):
        if lines[i] == "Herr" or lines[i] == "Frau":
            name, surname = lines[i + 1].split()

        if lines[i] == "geboren am":
            date_birth = lines[i + 1]

        if lines[i] == "geboren in":
            city = lines[i + 1]

        if lines[i] == "wohnhaft in":
            j = find_index_of_phrase(lines, "ist an der")
            address = lines[i + 1]
            i = i + 2
            while i < j:
                address = address + ", " + lines[i]
                i = i + 1

        if lines[i] == "Vorlesungsende":
            semester_ends = lines[i + 1]

    return name, surname, date_birth, city, address, semester_ends

if __name__ == "__main__":
    # Access the PDF file path from the command-line argument
    encoded_pdf_path = sys.argv[1]

    # Call the function and print the result
    name, surname, date_birth, city, address, semester_ends = extract_immatrikulation(encoded_pdf_path)

#     data = {
#         "name": name,
#         "surname": surname,
#         "date_birth": date_birth,
#         "city": city,
#         "address": address,
#         "semester_ends": semester_ends
#     }
#
#     json_data = json.dumps(data, ensure_ascii=False)
#     print(json_data)


    print(','.join([name, surname, date_birth, city, address, semester_ends]))