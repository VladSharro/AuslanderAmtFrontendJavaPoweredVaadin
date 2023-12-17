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

    return name, surname, gray_img, nationality, birth, sex



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


    # Function to extract the last word or digit from a string
    def extract_last_word_or_digit(line):
        words_digits = re.findall(r'\b(\w+|\d+)\b', line)
        return words_digits[-1] if words_digits else "Not found"

    # Extract the last word or digit from each line
    postleizeit = extract_last_word_or_digit(lines[1])
    wohnort = extract_last_word_or_digit(lines[2])
    strasse = extract_last_word_or_digit(lines[3])
    hausnummer = extract_last_word_or_digit(lines[4])

    if wohnort == "Pass":
        wohnort = "Passau"

    # Convert Pillow image to NumPy array
    img_np = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)

    # Display the image
    display_image(img_np)

    return postleizeit, wohnort, strasse, hausnummer, doc




def extract_immatrikulation(pdf_path):
    doc = fitz.open(pdf_path)
    page = doc[0]  # Assuming the information is on the first page

    # Extract text from the PDF page
    extracted_text = page.get_text()

    # Split the extracted text into lines
    lines = extracted_text.split('\n')

    for i, line in enumerate(lines):
        print(i, "   ", line)

    name = lines[0]
    surname = lines[1]

    return name, surname, doc



def extract_health(image_path):

    img = cv2.imread(image_path)

    # Convert the image to grayscale
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Perform OCR using Tesseract
    extracted_text = pytesseract.image_to_string(gray_img)

    # Split the extracted text into lines
    lines = extracted_text.split('\n')


    kassen = ""


    i = 0

    possible_kasse = ["TK", "Techniker"]

    while i < len(lines):
        current_line = lines[i]
        print(current_line)

        for kasse in possible_kasse:
            if kasse in current_line:
                kassen = kasse


        i += 1

    return kassen, gray_img



# Function to handle the "Open" button click event
def open_file():
    file_path = filedialog.askopenfilename(filetypes=[("Image files", "*.jpg *.jpeg *.png *.pdf")])

    if file_path:
        # Create a popup window for selecting file type
        popup = tk.Toplevel()
        popup.title("Select File Type")

        # Function to handle the button click and call the corresponding function
        def handle_button_click(file_type):
            popup.destroy()
            if file_type == "Passport":
                name, surname, image, nationality, birth, sex = extract_name_and_surname(file_path)
                display_image(image)
                result_label.config(text=f'Name: {name}\nSurname: {surname}\nNationality: {nationality}\nDate of Birth: {birth}\nSex: {sex}')
            elif file_type == "Wohnungbescheinigung":
                postleizeit, wohnort, strasse, hausnummer, doc = extract_info_from_pdf(file_path)
                result_label.config(text=f'Postleizeit: {postleizeit}\nWohnort: {wohnort}\nStraße: {strasse}\nHausnummer: {hausnummer}')
                # Close the PDF document when done
                doc.close()            
            elif file_type == "Immutriculation":
                name, surname, doc = extract_immatrikulation(file_path)
                result_label.config(text=f'Name: {name}\nSurname: {surname}\n')
                doc.close()





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