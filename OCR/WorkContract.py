import os



import fitz
import cv2
import pytesseract
from PIL import Image
import numpy as np
import re
#from difflib import SequenceMatcher
from datetime import datetime



# Path to the Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

#def similar(a, b):
#    return SequenceMatcher(None, a, b).ratio()


def extract_date_after_word(text, word, lines_before=200):
    pattern = re.compile(r'\d{1,2}/\d{1,2}/\d{4}')

    lines = text.split('\n')
    for i in range(max(0, len(lines) - lines_before), len(lines)):
        match = pattern.search(lines[i])
        if match:
            return match.group(0)

    return None


def extract_number_after_word(text, word):
    pattern = re.compile(rf'{word}\D*(\d+)')
    match = pattern.search(text)
    if match:
        return int(match.group(1))
    else:
        return None

def extract_first_number_after_word(text, word):
    pattern = re.compile(rf'{word}\D*(\d+)', re.MULTILINE)
    match = pattern.search(text)
    if match:
        return int(match.group(1))
    else:
        return None


def convert_pdf_to_images(pdf_path):
    doc = fitz.open(pdf_path)

    for page_num in range(doc.page_count):
        page = doc[page_num]

        image_list = page.get_images(full=True)

        i = 0

        for img_index, img_info in enumerate(image_list):
            xref = img_info[0]
            base_image = doc.extract_image(xref)

            image_bytes = base_image["image"]

            image_np = np.frombuffer(image_bytes, dtype=np.uint8)
            image = cv2.imdecode(image_np, flags=cv2.IMREAD_COLOR)

            gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

            extracted_text = pytesseract.image_to_string(Image.fromarray(gray_image, 'L'))


            #target_word = "Arbeitszeit"


            #print(extracted_text)

            if "Arbeitsvergitung" in extracted_text:

                money = extract_number_after_word(extracted_text, "von")

                #print(money)
                #if number is not None:
                    #print(f"Found on Page {page_num + 1}, Image {img_index + 1}: Arbeitsvergitung {number}")
                    #print('=' * 30)

                #cv2.imshow(f"Page {page_num + 1}, Image {img_index + 1}", image)
                #cv2.waitKey(0)
                #cv2.destroyAllWindows()


            if "Arbeitszoit" in extracted_text:


                hours = extract_first_number_after_word(extracted_text, "Arbeitszoit")

                #print(hours)

                #if number is not None:
                    #print(f"Found on Page {page_num + 1}, Image {img_index + 1}: Arbeitszeit Number {number}")
                    #print('=' * 30)

                #cv2.imshow(f"Page {page_num + 1}, Image {img_index + 1}", image)
                #cv2.waitKey(0)
                #cv2.destroyAllWindows()

            if "Datum" in extracted_text:

                date = extract_date_after_word(extracted_text, "Datum")


                #print(date)

            #i = i + 1



    final_count = money * hours * 4

    #print(final_count)

    doc.close()

    return final_count, date


#pdf_path = "C:\\Users\\vlads\\test\\Arbeitsvertrag_Muster_Photo.pdf"



image_data = os.environ.get("IMAGE_DATA")


moneys, date = convert_pdf_to_images(pdf_path)

today = datetime.now().date()

target_date = datetime.strptime(date, "%d/%m/%Y").date()

if target_date > today:
    print("True")
else:
    print("False")





print(','.join([moneys, date]))

#print(moneys)
