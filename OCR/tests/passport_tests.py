### Passport OCR module tests
###
### Owner: Kirill Borisov

import pytesseract
import unittest
import os
import sys
import base64

path = os.path.abspath("./OCR")
sys.path.append(path)
import PassportAnalitics

class PassportOCRTest(unittest.TestCase):
    def setUp(self) -> None:
        pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

        # Get absolute paths for test data
        paths = ["./OCR/tests/data/pass.jpg", "./OCR/tests/data/pass.png"]
        img_paths = []
        for p in paths:
            abspath = os.path.abspath(p)
            img_paths.append(abspath)
        
        # Get base64 encodings of test images
        self.encoded_imgs = []
        for img_path in img_paths:
            with open(img_path, "rb") as image_file:
                encoded_img = base64.b64encode(image_file.read())
                self.encoded_imgs.append(encoded_img)

        # Run OCR extraction over encoded images
        self.extracted_data = []
        for img in self.encoded_imgs:
            img_data = PassportAnalitics.extract_name_and_surname(img)
            self.extracted_data.append(img_data)
    
    ### Verify that images are processed
    def test_pass_image_processing(self):
        print("\nVerifying extracted dataset lengths...\n")
        for dataset in self.extracted_data:
            print("Verifying length of the dataset: ", dataset)
            self.assertGreater(len(dataset), 0, "Extracted data list is empty")
    
    ### Verify processed images contain correct data
    def test_pass_processed_values(self):
        print("\nVerifying if extracted values are correct...\n")
        
        # this can be expanded if new test data comes into play
        expected = ["INES", "GARCAO DE MAGALHAES", "Portugal", "07/04/74", "Female", "16/06/17"]
        
        for dataset in self.extracted_data:
            print("Verifying dataset: ", dataset)
            self.assertEqual(dataset, expected, "One of the datasets is different from the sample: " + str(dataset))

if __name__ == '__main__':
    unittest.main()