import requests
import json
import unittest
import os

ENDPOINT_BASE_URL = "http://132.231.1.189:8080"

class ApiEndpointTests(unittest.TestCase):
    def test_passport_endpoint(self):
        endpoint = "/get_data_from_passport"
        h = {
            "accept": "application/hal+json"
        }
        url = ENDPOINT_BASE_URL + endpoint

        with open('OCR/tests/data/pass.jpg', 'rb') as file:
            f = { 'passport_image': ('pass.jpg', file, 'image/jpeg') }
            r = requests.post(url, headers=h, files=f)

        self.assertEqual (r.status_code, 200)
    
    def test_enrolment_endpoint(self):
        endpoint = "/get_data_from_certificate_of_enrollment"
        h = {
            "accept": "application/hal+json"
        }
        url = ENDPOINT_BASE_URL + endpoint
        print(os.getcwd())

        with open('OCR/tests/data/enrolment2.pdf', 'rb') as file:
            f = { 'certificate_of_enrollment_image': ('enrolment2.pdf', file, 'application/pdf') }
            r = requests.post(url, headers=h, files=f)
        
        self.assertEqual (r.status_code, 200)
    
    ### skipped until we get test data
    # def test_health_endpoint(self):
    #     endpoint = "/get_data_from_health_insurance_certificate"
    #     h = {
    #         "accept": "application/hal+json"
    #     }
    #     url = ENDPOINT_BASE_URL + endpoint

    #     with open('OCR/tests/data/health.pdf', 'rb') as file:
    #         f = { 'health_insurance_certificate': ('health.pdf', file, 'application/pdf') }
    #         r = requests.post(url, headers=h, files=f)
        
    #     response = json.loads(r.text)
    #     print(response)
    #     self.assertEqual (r.status_code, 200)

if __name__ == "__main__":
    unittest.main()