import os

import cv2
import pytesseract
import re
import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk
import fitz  # PyMuPDF
import numpy as np
from datetime import datetime
from passporteye import read_mrz, mrz

# Path to the Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'



def geld(pdf_path):
    doc = fitz.open(pdf_path)
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
                    # Замена запятых на точки для европейского формата чисел
                    converted_number = float(number.replace(',', ''))
                    eur_numbers.append(converted_number)
                except ValueError:
                    # Пропуск неверных форматов
                    continue


    max_eur_number = max(eur_numbers)
    #print(max_eur_number)

    #print(dates)

    #gold = lines[7]
    #date = lines[0]

    date = dates[0]
    #print(date)

    return max_eur_number, date, doc


if __name__ == "__main__":
    image_file_path = sys.argv[1]
    with open(image_file_path, 'r') as file:
        image_data = file.read()

    max_eur_number, date = geld(image_data)
    print(','.join([max_eur_number, date]))


# Access the image data from the environment variable
image_data = os.environ.get("IMAGE_DATA")

# Call the function and print the result
gold, date = geld(image_data)
print(','.join([str(geld), date]))