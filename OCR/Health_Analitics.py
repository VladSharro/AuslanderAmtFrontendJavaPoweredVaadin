import os
import json
import cv2
import pytesseract
import re
import io
import base64
import fitz  # PyMuPDF
import numpy as np
from datetime import datetime
from passporteye import read_mrz, mrz
import sys

pytesseract.pytesseract.tesseract_cmd = r'C:\Users\vlads\Tesseract2\tesseract.exe'


def extract_health(encoded_pdf_path):
    # Read the encoded PDF file
    with open(encoded_pdf_path, 'rb') as pdf_file:
        # Decode the base64-encoded PDF
        decoded_pdf = base64.b64decode(pdf_file.read())

    pdf_stream = io.BytesIO(decoded_pdf)


    name = ""
    surname = ""
    krankenkasse = ""
    date = ""

    doc = fitz.open(stream=pdf_stream)
    page = doc[0]

    extracted_text = page.get_text()



    lines = extracted_text.split('\n')

    full_name = ""

    i = 0

    while i < len(lines):

        #print(i)

        #print(lines[i])

        #full_name = ""
        if lines[i] == "Herrn" or lines[i] == "Frauen":
            full_name = lines[i + 1]
            name_parts = full_name.split()
            name = name_parts[0]
            surname = ' '.join(name_parts[1:]) if len(name_parts) > 1 else ""

        if "Techniker Krankenkasse" in lines[i]:
            krankenkasse = "Techniker Krankenkasse"

        #if "gern bestätigen wir Ihnen" in lines[i]:
            #match = re.search(r'dem(.*?)bei', lines[i])

        if "gern bestätigen wir" in lines[i]:
            #print("Here")
            match = re.search(r'dem(.*?)bei', lines[i])
            date = match.group(1).strip()
            #print(date)

        i = i + 1

    return name, surname, krankenkasse, date

if __name__ == "__main__":
    # Access the PDF file path from the command-line argument
    encoded_pdf_path = sys.argv[1]

    # Call the function and print the result
    name, surname, krankenkasse, date = extract_health(encoded_pdf_path)
    print(','.join([name, surname, krankenkasse, date]))