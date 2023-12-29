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

def extract_health(image_path):
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

    date_pattern = re.compile(r'\b\d{1,2}\.\d{1,2}\.\d{4}\b')

    max_similarity = 0
    time = ""

    kassen = ""

    i = 0

    possible_kasse = ["TK", "Techniker"]

    while i < len(lines):
        current_line = lines[i]

        if lines[i] == "Geschatszeichen":
            time = lines[i + 2]


        for kasse in possible_kasse:
            if kasse in current_line:
                kassen = kasse


        i += 1

    return kassen, time


# Access the image data from the environment variable
image_data = os.environ.get("IMAGE_DATA")

# Call the function and print the result
kassen, time = extract_health(image_data)
print(','.join([kassen, time]))