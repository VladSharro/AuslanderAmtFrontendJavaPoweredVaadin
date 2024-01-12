import os

import cv2
import pytesseract
import re
import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk
import base64
import fitz  # PyMuPDF
import numpy as np
from datetime import datetime
from passporteye import read_mrz, mrz

def extract_health(pdf_path):
    name = ""
    surname = ""
    krankenkasse = ""
    date = ""

    doc = fitz.open(pdf_path)
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

    return name, surname, krankenkasse, date, doc



# Access the image data from the environment variable
image_data = os.environ.get("IMAGE_DATA")

# Call the function and print the result
kassen, time = extract_health(image_data)
print(','.join([kassen, time]))