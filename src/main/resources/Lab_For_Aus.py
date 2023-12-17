import cv2
import pytesseract
import re
import tkinter as tk
from tkinter import filedialog
from PIL import Image, ImageTk
import fitz  # PyMuPDF
import numpy as np

# Path to the Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'


# Function to extract the name and surname in English from a passport image using Tesseract OCR
def extract_name_and_surname(image_path):
    # Load the image using OpenCV
    img = cv2.imread(image_path)

    # Convert the image to grayscale
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Perform OCR using Tesseract
    extracted_text = pytesseract.image_to_string(gray_img, config='--psm 6')

    # Split the extracted text into lines
    lines = extracted_text.split('\n')

    name = ""
    surname = ""
    nationality = ""
    birth = ""

    i = 0

    while i < len(lines):
        if re.search(r'\bNationality\b', lines[i]):
            nationality = lines[i+1]

        if re.search(r'\bDate of birth\b', lines[i]):
            birth = lines[i+1]

        print(lines[i])
        i = i + 1

    print(nationality)
    print(birth)

    for line in lines:
        pattern = r'<([A-Z]+)<<([A-Z]+)<'
        matches = re.search(pattern, line)
        if matches:
            # Extract the name and surname
            name = matches.group(1)
            surname = matches.group(2)

            # Remove country codes if the first three letters match a pattern
            country_codes = ["IRN", "RUS", "USA"]  # Add more country codes as needed
            for code in country_codes:
                if name[:3] == code:
                    name = name[3:]
                if surname[:3] == code:
                    surname = surname[3:]

            break

    return name, surname, gray_img, nationality, birth


# Function to handle the "Open" button click event
def open_file():
    file_path = filedialog.askopenfilename(filetypes=[("Image files", "*.jpg *.jpeg *.png")])
    if file_path:
        name, surname, image , nationality, birth = extract_name_and_surname(file_path)

        # Display the image
        display_image(image)

        # Update the result label
        result_label.config(text=f'Name: {name}\nSurname: {surname}\nNationality: {nationality}\nDate of Birth: {birth}')


# Function to display the image in the Tkinter window
def display_image(img):
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = Image.fromarray(img)
    img = ImageTk.PhotoImage(img)

    # Update the panel with the new image
    panel.img = img
    panel.config(image=img)


# Create the main application window
app = tk.Tk()
app.title("Passport OCR")

# Create a button for opening files
open_button = tk.Button(app, text="Open File", command=open_file)
open_button.pack()

# Create a label to display the result
result_label = tk.Label(app, text="")
result_label.pack()

# Create a panel to display the image
panel = tk.Label(app)
panel.pack()

app.mainloop()