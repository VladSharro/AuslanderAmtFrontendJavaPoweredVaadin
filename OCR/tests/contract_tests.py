### Job contract OCR module tests
###
### Owner: Kirill Borisov

import unittest
import os
import sys
import base64

path = os.path.abspath("./OCR")
sys.path.append(path)
import WorkContract

class ContractOCRTest(unittest.TestCase):
    def setUp(self) -> None:
        paths = ["./OCR/tests/data/contract2.pdf"]
        pdf_paths = []
        for p in paths:
            abspath = os.path.abspath(p)
            pdf_paths.append(abspath)
        
        self.encoded_pdfs = []
        for pdf_path in pdf_paths:
            with open(pdf_path, "rb") as pdf_file:
                encoded_pdf = base64.b64encode(pdf_file.read())
                self.encoded_pdfs.append(encoded_pdf)
        
        self.extracted_data = []
        for pdf in self.encoded_pdfs:
            pdf_data = WorkContract.convert_pdf_to_images(pdf)
            self.extracted_data.append(pdf_data)
    
    def test_contract_processing(self):
        print("\nVerifying extracted dataset lengths...\n")
        for dataset in self.extracted_data:
            print("Verifying length of the dataset: ", dataset)
            self.assertGreater(len(dataset), 0, "Extracted data list is empty")

if __name__ == '__main__':
    unittest.main()