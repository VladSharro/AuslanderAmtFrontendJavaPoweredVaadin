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


def extract_health(image_path):

    img = cv2.imread(image_path)

    # Convert the image to grayscale
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Perform OCR using Tesseract
    extracted_text = pytesseract.image_to_string(gray_img)

    # Split the extracted text into lines
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

        #print(time)

    return kassen, time, gray_img



image_data = os.environ.get("IMAGE_DATA")

# Call the function and print the result
kassen, time = extract_health(image_data)