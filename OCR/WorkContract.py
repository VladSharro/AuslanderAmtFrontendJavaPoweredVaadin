import os



import fitz
import cv2
import pytesseract
from PIL import Image
import numpy as np
import re
#from difflib import SequenceMatcher
from datetime import datetime






def convert_pdf_to_images(pdf_path):
    




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
