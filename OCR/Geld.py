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

    # Extract text from the PDF page
    extracted_text = page.get_text()

    # Split the extracted text into lines
    lines = extracted_text.split('\n')

    for i, line in enumerate(lines):
        print(i, "   ", line)

    gold = lines[7]
    date = lines[0]


    return gold, date, doc


pdf_data = os.environ.get("PDF_Path")


gold, date, doc = geld(pdf_data)