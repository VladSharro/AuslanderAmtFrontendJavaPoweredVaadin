import os

import cv2
import pytesseract
import re
import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk
import io
import base64
import fitz  # PyMuPDF
import numpy as np
from datetime import datetime
from passporteye import read_mrz, mrz

def geld(encoded_pdf):
    # Decode the base64-encoded PDF
    decoded_pdf = base64.b64decode(encoded_pdf)

    # Create a BytesIO object to simulate a file-like object from the decoded PDF
    pdf_stream = io.BytesIO(decoded_pdf)

    # Use PyMuPDF to extract text
    text = ""

    doc = fitz.open(stream=pdf_stream, filetype="pdf")
    page = doc[0]  # Assuming the information is on the first page

    # Extract text from the PDF page
    extracted_text = page.get_text()

    # Split the extracted text into lines
    lines = extracted_text.split('\n')

    gold = lines[7]
    date = lines[0]


    return gold, date

# Access the image data from the environment variable
image_data = os.environ.get("IMAGE_DATA")

# Call the function and print the result
gold, date = geld(image_data)
print(','.join([str(geld), date]))