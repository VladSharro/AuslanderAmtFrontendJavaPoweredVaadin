from robot.libraries.BuiltIn import BuiltIn
from re import split

class ApplicationLibrary(object):
    def birth_year_should_be_valid(self, bdate: str):
        year = split('-', bdate)[0]
        if int(year) > 2023:
            raise AssertionError ('Date of birth field accepts invalid values')