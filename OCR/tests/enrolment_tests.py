### Enrolment certificate OCR module tests
###
### Owner: Kirill Borisov

import unittest
import os
import sys
import base64
import re

path = os.path.abspath("./OCR")
sys.path.append(path)
import ImmatrikulationAnalitics

def create_encoded_file(filepath, encoded_filepath):
    with open(filepath, "rb") as file:
        encoded = base64.b64encode(file.read())
        with open(encoded_filepath, "wb") as encoded_file:
                encoded_file.write(encoded)

class EnrolmentOCRTests(unittest.TestCase):
    extracted_data = []

    def setUp(self) -> None:
        # Get absolute paths for test data
        paths = ["./OCR/tests/data/enrolment1.pdf", "./OCR/tests/data/enrolment2.pdf"]
        pdf_paths = []
        for p in paths:
            abspath = os.path.abspath(p)
            pdf_paths.append(abspath)

        # Create temp files with encoded pdf data
        self.encoded_pdf_paths = []
        for i in range(2):
            pdf_path = "./OCR/tests/data/enrolment" + str(i + 1) + ".pdf"
            encoded_path = "./OCR/tests/data/encoded" + str(i + 1) + ".txt"
            create_encoded_file(pdf_path, encoded_path)
            self.encoded_pdf_paths.append(encoded_path)
    
    # Verify that PDFs are processed
    def test_enrolment_processing(self):
        print("\nVerifying extracted dataset lengths...\n")
        for pdf in self.encoded_pdf_paths:
            pdf_data = ImmatrikulationAnalitics.extract_immatrikulation(pdf)
            self.__class__.extracted_data.append(pdf_data)
            os.remove(pdf)        # cleaning up the temp files needed to pass the encoded values

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