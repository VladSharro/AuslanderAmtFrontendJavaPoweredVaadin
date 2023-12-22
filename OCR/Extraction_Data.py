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


def process_string(input_string):
    parts = input_string.split(' ', 0)


    if len(parts) > 1 and parts[1].isspace():
        return parts[0]
    else:
        return input_string





# Function to extract the name and surname in English from a passport image using Tesseract OCR
def extract_name_and_surname(image_path):
    img = cv2.imread(image_path)

    # Convert the image to grayscale
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    

    extracted_text = pytesseract.image_to_string(gray_img) #, config='--psm 6'

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


        print(lines[i])
        i = i + 1

    print(nationality)
    print(birth)

    mrz = read_mrz(image_path)

    print(mrz)

    mrz_data = mrz.to_dict()

    print(mrz_data)



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


    sex = mrz_data['sex']


    year_i = int(mrz_data['expiration_date'][:2])
    month_i = int(mrz_data['expiration_date'][2:4])
    day_i = int(mrz_data['expiration_date'][4:])


    formatted_date_i = datetime(year_i + current_century, month_i, day_i)
    formatted_string_i = formatted_date_i.strftime("%d/%m/%y")

    issue = formatted_string_i



    return name, surname, gray_img, nationality, birth, sex, issue, number


# Function to extract information from PDF (Wohnort)
def extract_info_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    page = doc[1]  # Assuming the information is on the second page

    # Convert the PDF page to an image
    pix = page.get_pixmap()
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

    extracted_text = pytesseract.image_to_string(img, config='--psm 6')

    # Split the extracted text into lines
    lines = extracted_text.split('\n')

    i = 0

    while i < len(lines):
        print(lines[i])
        i = i + 1


    def extract_last_word_or_digit(line):
        words_digits = re.findall(r'\b(\w+|\d+)\b', line)
        return words_digits[-1] if words_digits else "Not found"

    postleizeit = extract_last_word_or_digit(lines[1])
    wohnort = extract_last_word_or_digit(lines[2])
    strasse = extract_last_word_or_digit(lines[3])
    hausnummer = extract_last_word_or_digit(lines[4])

    if wohnort == "Pass":
        wohnort = "Passau"

    img_np = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)

    display_image(img_np)

    return postleizeit, wohnort, strasse, hausnummer, doc



def extract_immatrikulation(pdf_path):
    doc = fitz.open(pdf_path)
    page = doc[0]  # Assuming the information is on the first page

    extracted_text = page.get_text()

    lines = extracted_text.split('\n')

    for i, line in enumerate(lines):
        print(i, "   ", line)

    name = lines[6]
    date_birth = lines[10]
    city = lines[12]
    address = lines[16]

    return name, date_birth, city, address, doc


def extract_health(image_path):

    img = cv2.imread(image_path)

    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    extracted_text = pytesseract.image_to_string(gray_img)

    lines = extracted_text.split('\n')

    date_pattern = re.compile(r'\b\d{1,2}\.\d{1,2}\.\d{4}\b')

    max_similarity = 0
    time = ""

    kassen = ""

    i = 0

    possible_kasse = ["TK", "Techniker"]

    while i < len(lines):
        current_line = lines[i]
        print(current_line)

        if lines[i] == "Geschatszeichen":
            time = lines[i + 2]


        for kasse in possible_kasse:
            if kasse in current_line:
                kassen = kasse


        i += 1


    return kassen, time, gray_img



def geld(pdf_path):
    doc = fitz.open(pdf_path)
    page = doc[0]  # Assuming the information is on the first page

    # Extract text from the PDF page
    extracted_text = page.get_text()

    # Split the extracted text into lines
    lines = extracted_text.split('\n')

    for i, line in enumerate(lines):
        print(i, "   ", line)

    gold = lines[7]
    date = lines[0]


    return gold, date, doc

def open_file():
    file_path = filedialog.askopenfilename(filetypes=[("Image files", "*.jpg *.jpeg *.png *.pdf")])

    if file_path:
        # Create a popup window for selecting file type
        popup = tk.Toplevel()
        popup.title("Select File Type")

        # Function to handle the button click and call the corresponding function

    def take_data(file_type):
        popup.destroy()
        if file_type == "Passport":
            name_pass, surname, image, nationality, birth, sex, issue, number = extract_name_and_surname(file_path)
        elif file_type == "Wohnungbescheinigung":
            postleizeit, wohnort, strasse, hausnummer, doc = extract_info_from_pdf(file_path)
            # Close the PDF document when done
            doc.close()
        elif file_type == "Immutriculation":
            name_imm, date, city, address, doc = extract_immatrikulation(file_path)
            doc.close()
        elif file_type == "Kranken":
            kassen, time, image = extract_health(file_path)
        elif file_type == "Geld":
            gold, date, doc = geld(file_path)
            doc.close




open_file()