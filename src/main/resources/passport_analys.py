import cv2
import pytesseract
import numpy as np
import sys
import os
import base64
import re

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

    for line in lines:
        pattern = r'<([A-Z]+)<<([A-Z]+)<'
        matches = re.search(pattern, line)
        if matches:
            name = matches.group(1)
            surname = matches.group(2)
            break

    return name, surname

# Access the image data from the environment variable
image_data = os.environ.get("IMAGE_DATA")

# Call the function and print the result
name, surname = extract_name_and_surname(image_data)
print(name, surname)