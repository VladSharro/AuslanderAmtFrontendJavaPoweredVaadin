import cv2
import pytesseract
import numpy as np
import sys
import os
import base64
import re
from io import BytesIO
from passporteye import read_mrz
from datetime import datetime

def process_string(input_string):
    parts = input_string.split(' ', 0)


    if len(parts) > 1 and parts[1].isspace():
        return parts[0]
    else:
        return input_string

# Function to extract the name and surname in English from a passport image using Tesseract OCR
def extract_name_and_surname(encoded_image):
    # Decode the Base64-encoded image data
    image_data = base64.b64decode(encoded_image)

    # Load the image using OpenCV
    numpy_array = np.frombuffer(image_data, np.uint8)
    img = cv2.imdecode(numpy_array, cv2.IMREAD_COLOR)

    # Convert the image to grayscale
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Use thresholding to improve OCR accuracy
    _, thresh_img = cv2.threshold(gray_img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    # Perform OCR using Tesseract
    extracted_text = pytesseract.image_to_string(thresh_img, config='--psm 6')

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


        #print(lines[i])
        i = i + 1

    #print(nationality)
    #print(birth)

    image_stream = BytesIO(image_data)
    mrz = read_mrz(image_stream)

    #print(mrz)

    mrz_data = mrz.to_dict()

    #print(mrz_data)

    name = process_string(mrz_data['names'])
    surname = mrz_data['surname']
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

    return name, surname, nationality, birth, sex


# Access the image data from the environment variable
image_data = os.environ.get("IMAGE_DATA")

# Call the function and print the result
name, surname, nationality, birth, sex = extract_name_and_surname(image_data)
print(','.join([name, surname, nationality, birth, sex]))