from io import BytesIO

import cv2
import pytesseract
import re
import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk
import fitz  # PyMuPDF
import numpy as np
from datetime import datetime, timedelta
import mimetypes
import io

import base64
import sys

from dateutil.relativedelta import relativedelta
from passporteye import read_mrz, mrz

# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'



def process_string(input_string):
    parts = input_string.split(' ', 0)

    if len(parts) > 1 and parts[1].isspace():
        return parts[0]
    else:
        return input_string

def extract_name_and_surname(encoded_image):


    decoded_pdf = base64.b64decode(encoded_image)
    pdf_stream = io.BytesIO(decoded_pdf)

    doc = fitz.open(stream=pdf_stream)
    page = doc[0]
    pix = page.get_pixmap()
    img_data = pix.tobytes("png")
    img = Image.open(BytesIO(img_data))
    image = np.array(img)
    image = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)


    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    _, thresh = cv2.threshold(gray_img, 200, 255, cv2.THRESH_BINARY_INV)

    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)



    binary_img = cv2.adaptiveThreshold(
        thresh, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2
    )

        
    # Perform OCR using Tesseract
    extracted_text = pytesseract.image_to_string(thresh, config='--psm 6') #, config='--psm 6'

    # Split the extracted text into lines
    lines = extracted_text.split('\n')

    name = ""
    surname = ""
    nationality = ""
    birth = ""
    sex = ""

    i = 0

    while i < len(lines):
        if re.search(r'\bNationality\b', lines[i]):
            nationality = lines[i+1]

        if re.search(r'\bDate of birth\b', lines[i]):
            birth = lines[i+1]

        if re.search(r'\bM\b', lines[i]):
            sex = "Male"

        if re.search(r'\bF\b', lines[i]):
            sex = "Female"

        i = i + 1

    image_stream = BytesIO(image_data)
    mrz = read_mrz(image_stream)

    mrz_data = mrz.to_dict()

    name = re.split(r'\s{2,}', mrz_data['names'])[0]
    surname = re.split(r'\s{2,}', mrz_data['surname'])[0]
    nationality = mrz_data['nationality']

    year_b = int(mrz_data['date_of_birth'][:2])
    month_b = int(mrz_data['date_of_birth'][2:4])
    day_b = int(mrz_data['date_of_birth'][4:])

    current_century = datetime.now().year // 100 * 100
    formatted_date = datetime(year_b + current_century, month_b, day_b)
    formatted_string = formatted_date.strftime("%d/%m/%y")

    birth = formatted_string

    number = mrz_data['personal_number']

    number = number.replace("<", "")

    sex = mrz_data['sex']

    if sex == "F":
        sex = "Female"
    else:
        sex = "Male"

    year_i = int(mrz_data['expiration_date'][:2])
    month_i = int(mrz_data['expiration_date'][2:4])
    day_i = int(mrz_data['expiration_date'][4:])

    formatted_date_i = datetime(year_i + current_century, month_i, day_i)
    formatted_string_i = formatted_date_i.strftime("%d/%m/%y")

    issue = formatted_string_i

    issue_date = datetime.strptime(issue, "%d/%m/%y")

    start_date = None

    if nationality in ['ALB', 'DZA', 'AND', 'RUS', 'UKR']:
        start_date = (issue_date - relativedelta(years=10)).strftime("%d/%m/%y")

        #start_date = start_date.strftime("%d/%m/%y")
        #print(start_date)

    if nationality in ['PRT', 'IRN', 'TUN']:
        start_date = (issue_date - relativedelta(years=5)).strftime("%d/%m/%y")




    nationality = country_dict[mrz_data['nationality']]

    return name, surname, nationality, birth, sex, start_date


# Access the image data from the environment variable
if __name__ == "__main__":
    image_file_path = sys.argv[1]
    with open(image_file_path, 'r') as file:
        image_data = file.read()

    name, surname, nationality, birth, sex, start_date = extract_name_and_surname(image_data)
    print(','.join([name, surname, nationality, birth, sex, start_date]))