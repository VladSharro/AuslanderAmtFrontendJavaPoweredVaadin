### OCR Test Suite
###
### This is a runner module for OCR test cases
### for different modules
###
### Owner: Kirill Borisov

import unittest
from passport_tests import PassportOCRTest
from enrolment_tests import EnrolmentOCRTests

def suite():
    test_suite = unittest.TestSuite()
    passport_test = unittest.makeSuite(PassportOCRTest)
    enrolment_test = unittest.makeSuite(EnrolmentOCRTests)
    test_suite.addTest(passport_test)
    test_suite.addTest(enrolment_test)

    return test_suite

if __name__ == "__main__":
    ocr_suite = suite()
    runner = unittest.TextTestRunner()
    runner.run(ocr_suite)