import os



import fitz
import cv2
import pytesseract
from PIL import Image
import numpy as np
import re

from datetime import datetime






def convert_pdf_to_images(encoded_pdf):

    decoded_pdf = base64.b64decode(encoded_pdf)
    pdf_stream = io.BytesIO(decoded_pdf)






    doc = fitz.open(stream=pdf_stream, filetype="pdf")


    numbers = []
    hours = 0
    money = 0
    week = 4

    i = 0

    pages = doc.page_count

    while i < pages:
        page = doc[i]
        extracted_text = page.get_text()
        lines = extracted_text.split('\n')



        date_pattern = r'\b\d{1,2}[./-]\d{1,2}[./-]\d{2,4}\b'
        dates = re.findall(date_pattern, extracted_text)

        for j, line in enumerate(lines):


            if "EUR" in line:
                pattern = r'(\b\d+,\d+\b(?!,-))?\s*EUR\s*(\b\d+,\d+\b(?!,-))?'
                matches = re.findall(pattern, line)
                for before, after in matches:
                    if before:
                        money = before
                        #print(before)
                    elif after:
                        money = after
                        #print(after)


            if "Stunden" in line:
                pattern = r'(\b\d+,\d+\b|\b\d+\b)?\s*Stunde\s*(\b\d+,\d+\b|\b\d+\b)?'

                matches = re.findall(pattern, line)
                max_number = None

                for before, after in matches:
                    #numbers = []
                    if before:
                        numbers.append(float(before.replace(',', '.')))
                    if after:
                        numbers.append(float(after.replace(',', '.')))
                    if numbers:
                        #print(numbers)
                        local_max = max(numbers)
                        hours = local_max
                        if max_number is None or local_max > max_number:
                            max_number = local_max
                            hours = max_number

            if "Stunder pro woche" in line:
                week = 1


        i = i + 1

    money = float(money.replace(',', '.'))
    final_count = money * hours * week

    date = max(dates)

    




    final_count = money * hours * 4



    doc.close()

    return final_count, date




if __name__ == "__main__":
    image_data = os.environ.get("IMAGE_DATA")
    moneys, date = convert_pdf_to_images(pdf_path)
    print(','.join([moneys, date]))

