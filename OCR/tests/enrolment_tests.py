### Enrolment certificate OCR module tests
###
### Owner: Kirill Borisov

import pytesseract
import unittest
import os
import sys
import base64
import re

path = os.path.abspath("./OCR")
sys.path.append(path)
import ImmatrikulationAnalitics

class EnrolmentOCRTests(unittest.TestCase):
    extracted_data = []

    def setUp(self) -> None:
        # Get absolute paths for test data
        paths = ["./OCR/tests/data/enrolment1.pdf", "./OCR/tests/data/enrolment2.pdf"]
        pdf_paths = []
        for p in paths:
            abspath = os.path.abspath(p)
            pdf_paths.append(abspath)
        
        # Get base64 encodings of test certificates
        self.encoded_pdfs = []
        for pdf_path in pdf_paths:
            with open(pdf_path, "rb") as pdf_file:
                encoded_pdf = base64.b64encode(pdf_file.read())
                self.encoded_pdfs.append(encoded_pdf)
    
    # Verify that PDFs are processed
    def test_enrolment_processing(self):
        print("\nVerifying extracted dataset lengths...\n")
        # Run module under test over encoded PDFs
        for pdf in self.encoded_pdfs:
            pdf_data = ImmatrikulationAnalitics.extract_immatrikulation(pdf)
            self.__class__.extracted_data.append(pdf_data)

        for dataset in self.__class__.extracted_data:
            print("Verifying length of the dataset: ", dataset)
            self.assertGreater(len(dataset), 0, "Extracted data list is empty")
    
    # Verify that the values match the expected ones from the data
    def test_enrolment_processed_values(self):
        print("\nVerifying if extracted values are correct...\n")

        expected = ('Kirill', 'Borisov', '18.09.1997', 'St Petersburg')
        for dataset in self.__class__.extracted_data:
            print("Verifying dataset: ", dataset)
            dataset_reduced = dataset[:4]
            self.assertEqual(dataset_reduced, expected, "One of the datasets is different from the sample: " + str(dataset_reduced))
    
    # Verify the format of dates
    def test_enrolment_date_format(self):
        print("\nVerifying format of date fields...\n")
        pattern = re.compile('\d{2}.\d{2}.\d{4}')
        for dataset in self.__class__.extracted_data:
            birthdate = dataset[2]
            semester_end = dataset[5]
            self.assertTrue(pattern.match(birthdate), "Date doesn't fit the format. Value under test " + birthdate)
            self.assertTrue(pattern.match(semester_end), "Date doesn't fit the format. Value under test: " + semester_end)

if __name__ == '__main__':
    unittest.main()