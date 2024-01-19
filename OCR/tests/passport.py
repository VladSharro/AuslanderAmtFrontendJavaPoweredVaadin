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

        self.image_path = os.path.abspath("./OCR/tests/data/pass.png")
        print("Img path: ", self.image_path)
        with open(self.image_path, "rb") as image_file:
            self.encoded_string = base64.b64encode(image_file.read())

    def test_pass_image_processing(self):
        self.extracted_data = PassportAnalitics.extract_name_and_surname(self.encoded_string)
        print("List length: ", len(self.extracted_data))
        self.assertGreater(len(self.extracted_data), 0, "Extracted data list is empty")

if __name__ == '__main__':
    unittest.main()