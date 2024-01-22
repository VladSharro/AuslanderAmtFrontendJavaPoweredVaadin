### Job contract OCR module tests
###
### Owner: Kirill Borisov

import unittest
import os
import sys
import base64
import re

path = os.path.abspath("./OCR")
sys.path.append(path)
import WorkContract

class ContractOCRTest(unittest.TestCase):
    extracted_data = []

    def setUp(self) -> None:
        # Add test data paths here
        paths = ["./OCR/tests/data/contract.pdf", "./OCR/tests/data/contract2.pdf"]
        pdf_paths = []
        for p in paths:
            abspath = os.path.abspath(p)
            pdf_paths.append(abspath)
        
        # Encode test PDFs
        self.encoded_pdfs = []
        for pdf_path in pdf_paths:
            with open(pdf_path, "rb") as pdf_file:
                encoded_pdf = base64.b64encode(pdf_file.read())
                self.encoded_pdfs.append(encoded_pdf)
    
    def test_contract_processing(self):
        print("\nVerifying extracted dataset lengths...\n")
        # Run a module under test over PDFs
        for pdf in self.encoded_pdfs:
            pdf_data = WorkContract.convert_pdf_to_images(pdf)
            self.__class__.extracted_data.append(pdf_data)
        
        for dataset in self.__class__.extracted_data:
            print("Verifying length of the dataset: ", dataset)
            self.assertGreater(len(dataset), 0, "Extracted data list is empty")
    
    # Verify the format of contract end date
    def test_enrolment_date_format(self):
        print("\nVerifying format of date fields...\n")
        pattern = re.compile('\d{2}.\d{2}.\d{4}')
        for dataset in self.__class__.extracted_data:
            end_date = dataset[1]
            self.assertTrue(pattern.match(end_date), "Contract end date doesn't fit the format. Value under test " + end_date)

if __name__ == '__main__':
    unittest.main()