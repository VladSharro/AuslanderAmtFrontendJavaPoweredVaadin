import fitz
import cv2
import pytesseract
from PIL import Image
import numpy as np
import re
from difflib import SequenceMatcher


# Path to the Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()


def extract_number_after_word(text, word):
    # Используем регулярное выражение для поиска числа после указанного слова
    pattern = re.compile(rf'{word}\D*(\d+)')
    match = pattern.search(text)
    if match:
        return int(match.group(1))
    else:
        return None

def extract_first_number_after_word(text, word):
    # Используем регулярное выражение для поиска первого числа после указанного слова
    pattern = re.compile(rf'{word}\D*(\d+)')
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

        for img_index, img_info in enumerate(image_list):
            xref = img_info[0]  # Get the index of the image
            base_image = doc.extract_image(xref)

            image_bytes = base_image["image"]

            # Convert image bytes to a numpy array
            image_np = np.frombuffer(image_bytes, dtype=np.uint8)
            image = cv2.imdecode(image_np, flags=cv2.IMREAD_COLOR)

            # Convert image to grayscale for better OCR results
            gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

            # Use pytesseract to perform OCR on the grayscale image
            extracted_text = pytesseract.image_to_string(Image.fromarray(gray_image, 'L'))


            target_word = "Arbeitszeit"


            #print(extracted_text)

            # Поиск строки с заданным словом "Arbeitsvergitung" в качестве заголовка пункта
            if "Arbeitsvergitung" in extracted_text:
                # Извлечение числа после слова "von"

                money = extract_number_after_word(extracted_text, "von")
                #if number is not None:
                    #print(f"Found on Page {page_num + 1}, Image {img_index + 1}: Arbeitsvergitung {number}")
                    #print('=' * 30)

                # Display the image
                #cv2.imshow(f"Page {page_num + 1}, Image {img_index + 1}", image)
                #cv2.waitKey(0)
                #cv2.destroyAllWindows()


            # Поиск строки с заданным словом "Arbeitszeit" в качестве заголовка пункта
            if "Arbeitszoit" in extracted_text:


                hours = extract_first_number_after_word(extracted_text, target_word)

                #if number is not None:
                    #print(f"Found on Page {page_num + 1}, Image {img_index + 1}: Arbeitszeit Number {number}")
                    #print('=' * 30)

                # Display the image
                #cv2.imshow(f"Page {page_num + 1}, Image {img_index + 1}", image)
                #cv2.waitKey(0)
                #cv2.destroyAllWindows()

    final_count = money * hours * 4

    #print(final_count)

    doc.close()

    return final_count
# Example usage
pdf_path = "C:\\Users\\vlads\\test\\Arbeitsvertrag_Muster_Photo.pdf"
moneys = convert_pdf_to_images(pdf_path)

print(moneys)
