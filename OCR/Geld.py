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

# # Path to the Tesseract executable
#pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'



def geld(encoded_pdf_path):
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

    #eur_lines = [line for line in page.split('\n') if 'EUR' in line]

    # Извлечение чисел только из этих строк
    eur_numbers = []


    # Поиск максимального числа среди чисел, связанных с EUR
    max_eur_number = max(eur_numbers) if eur_numbers else None
    #print(max_eur_number)

    # Extract text from the PDF page
    extracted_text = page.get_text()

    # Split the extracted text into lines
    lines = extracted_text.split('\n')

    for i, line in enumerate(lines):
        #print(i, "   ", line)
        numbers = re.findall(r'\d+[\.,]?\d*', line)

        date_pattern = r'\b\d{1,2}[./\\,-]\d{1,2}[./\\,-]\d{2,4}\b'
        dates = re.findall(date_pattern, extracted_text)

        if "EUR" in line:
            for number in numbers:
                try:
                    converted_number = float(number.replace(',', ''))
                    eur_numbers.append(converted_number)
                except ValueError:
                    continue


    max_eur_number = max(eur_numbers)
    #print(max_eur_number)

    #print(dates)

    #gold = lines[7]
    #date = lines[0]

    date = dates[0]
    #print(date)

    return max_eur_number, date


if __name__ == "__main__":
    # Access the PDF file path from the command-line argument
    encoded_pdf_path = sys.argv[1]

    max_eur_number, date = geld(encoded_pdf_path)

    data = {
        "money": max_eur_number,
        "date": date
    }

    json_data = json.dumps(data, ensure_ascii=False)
    print(json_data)
