*** Settings ***
Documentation     Resource file with variables for the application process
Library           SeleniumLibrary     run_on_failure=None

*** Variables ***
${NAME_LABEL}                    xpath://label[contains(text), "First name"]
${LNAME_LABEL}                   xpath://label[contains(text), "Last name"]
${NATIONALITY_LABEL}             xpath://label[contains(text), "Nationality / nationalities"]
${MOBILE_LABEL}                  xpath://label[contains(text), "mobile (optional)"]
${EMAIL_LABEL}                   xpath://label[contains(text), "E-mail (optional)"]

${NAME_INPUT}                    xpath://input[@id="first_name_field"]
${LNAME_INPUT}                   xpath://input[@id="last_name_field"]
${NATIONALITY_INPUT}             xpath://input[@id="nationality_field"]
${MOBILE_INPUT}                  xpath://input[@id="mobile"]
${EMAIL_INPUT}                   xpath://input[@id="email_field"]

${BDATE_INPUT}                   xpath://input[@id="birth_date_field"]
${HEIGHT_INPUT}                  xpath://input[@id="height_field"]