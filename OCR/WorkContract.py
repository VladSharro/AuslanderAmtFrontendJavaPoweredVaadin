import os
import base64
import io
import fitz
import cv2
import pytesseract
from PIL import Image
import numpy as np
import re
import sys
import json

from datetime import datetime

pytesseract.pytesseract.tesseract_cmd = r'C:\Users\vlads\Tesseract2\tesseract.exe'


def convert_pdf_to_images(encoded_pdf):
    # Read the encoded PDF file
    with open(encoded_pdf, 'rb') as pdf_file:
        # Decode the base64-encoded PDF
        decoded_pdf = base64.b64decode(pdf_file.read())

    pdf_stream = io.BytesIO(decoded_pdf)

    doc = fitz.open(stream=pdf_stream)

    moneys = []
    numbers = []
    hours = 0
    money = 0
    week = 4
    # page = doc[0]

    i = 0

    pages = doc.page_count

    extracted_text = ""
    while i < pages:
        page = doc[i]
        pix = page.get_pixmap()
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        page_text = pytesseract.image_to_string(img)  # Извлечение текста с текущей страницы
        extracted_text += page_text + "\n"  # Добавление текста текущей страницы к общему тексту

        # extracted_text = page.get_text()
        lines = extracted_text.split('\n')

        # hours
        # money
        # print("this is page ", i)

        date_pattern = r'\b\d{1,2}[./\\,-]\d{1,2}[./\\,-]\d{2,4}\b'
        dates = re.findall(date_pattern, extracted_text)
        for j, line in enumerate(lines):
            # print(j, "   ", line)

            if "EUR" in line:

                pattern = r'(\b\d+([.,]\d+)?\b)[^\d]*EUR|EUR[^\d]*(\b\d+([.,]\d+)?\b)'
                pattern2 = r'(\b\d+,\d+\b(?!,-))?\s*EUR\s*(\b\d+,\d+\b(?!,-))?'

                matches = re.findall(pattern, line)
                matches2 = re.findall(pattern2, line)

                for match in matches2:
                    number = match[0] if match[0] else match[1]

                    if number:
                        moneys.append(number)

                for match in matches:
                    number = match[0] if match[0] else match[1]

                    if number:
                        moneys.append(number)

                money = max(moneys)

            if "Stunden" in line:
                pattern = r'(\b\d+,\d+\b|\b\d+\b)?\s*Stunde\s*(\b\d+,\d+\b|\b\d+\b)?'

                matches = re.findall(pattern, line)
                max_number = None

                for before, after in matches:
                    if before:
                        numbers.append(float(before.replace(',', '.')))
                    if after:
                        numbers.append(float(after.replace(',', '.')))
                    if numbers:
                        # print(numbers)
                        local_max = max(numbers)
                        hours = local_max
                        if max_number is None or local_max > max_number:
                            max_number = local_max
                            hours = max_number

            if "Stunder pro woche" in line:
                week = 1

            if "Mindestlohn" in line:
                money = 12

            # if date_pattern in line:

        # print(hours)

        i = i + 1

    # print(money)
    if isinstance(money, int):
        money = money
    else:
        money = float(money.replace(',', '.'))

    #print(money)
    #print(hours)
    #print(min(dates))

    date = min(dates)
    # print(date)

    final_count = money * hours * week

    # print(final_count)

    # extracted_text = page.get_text()

    # print(extracted_text)

    return final_count, date




if __name__ == "__main__":
    # Access the PDF file path from the command-line argument
    encoded_pdf_path = sys.argv[1]

    # Call the function and print the result
    moneys, date = convert_pdf_to_images(encoded_pdf_path)

    data = {
        "money": moneys,
        "date": date
    }

    json_data = json.dumps(data, ensure_ascii=False)
    print(json_data)
