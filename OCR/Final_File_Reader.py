import PyPDF2
from pdfminer.high_level import extract_text, extract_pages
from pdfminer.layout import LTTextContainer, LTRect
import re


def extract_checkboxes_and_text(pdf_path):
    pdf_file = open(pdf_path, 'rb')
    pdf_reader = PyPDF2.PdfFileReader(pdf_file)

    checkboxes = []
    for page_num in range(pdf_reader.numPages):
        page = pdf_reader.getPage(page_num)
        annotations = page.get('/Annots')
        if annotations:
            for annot in annotations:
                annot_obj = annot.getObject()
                if annot_obj.get('/FT') == '/Btn' and annot_obj.get('/AS'):
                    checkbox_status = annot_obj.get('/AS')
                    checkboxes.append((page_num + 1, checkbox_status))


    text = extract_text(pdf_path)
    lines = text.split('\n')
    numbered_lines = [(i + 1, line) for i, line in enumerate(lines)]


    family_name = lines[19]
    first_name = lines[25]
    date_of_birth = lines[35]
    place_of_birth = lines[37]
    nationalities = lines[47]

    sex_male = checkboxes[0]
    sex_female = checkboxes[1]
    sex_diversity = checkboxes[2]
    marital_status_single = checkboxes[3]
    marital_status_married = checkboxes[4]




        pdf_file.close()
    return checkboxes, numbered_lines