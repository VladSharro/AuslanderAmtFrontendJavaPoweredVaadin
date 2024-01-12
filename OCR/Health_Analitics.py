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

    return kassen, time


# Access the image data from the environment variable
image_data = os.environ.get("IMAGE_DATA")

# Call the function and print the result
kassen, time = extract_health(image_data)
print(','.join([kassen, time]))