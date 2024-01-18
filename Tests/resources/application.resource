*** Settings ***
Documentation     Resource file with variables for the application process
Library           SeleniumLibrary     run_on_failure=None

*** Variables ***
##### Generic
${START_BUTTON}                  xpath://span[contains(text(), "START APPLICATION")]
${FIRST_TIME_OPTION}             xpath://input[@id="mat-radio-2-input"]

${SAVE_BUTTON}                   xpath://span[contains(text(), "Save")]
${NEXT_BUTTON}                   xpath://span[contains(text(), "Next")]
${OVERRIDE_SWITCH}               xpath://label[text()=" Override "]
${DISMISS_BUTTON}                xpath://span[contains(text(), "dismiss")]

##### Basic
${NAME_LABEL}                    xpath://label[text()="First name"]
${LNAME_LABEL}                   xpath://label[text()="Last name"]
${NATIONALITY_LABEL}             xpath://label[text()="Nationality / nationalities"]
${MOBILE_LABEL}                  xpath://label[text()="mobile (optional)"]
${EMAIL_LABEL}                   xpath://label[text()="E-mail (optional)"]

${NAME_INPUT}                    xpath://input[@id="first_name_field"]
${LNAME_INPUT}                   xpath://input[@id="last_name_field"]
${NATIONALITY_INPUT}             xpath://input[@id="nationality_field"]
${MOBILE_INPUT}                  xpath://input[@id="mobile"]
${EMAIL_INPUT}                   xpath://input[@id="email_field"]

${BDATE_INPUT}                   xpath://input[@id="birth_date_field"]
${HEIGHT_INPUT}                  xpath://input[@id="height_field"]

##### Family
${CHILDREN_DROPDOWN}             xpath://select[@id="is_children_available"]
${OPTION_YES}                    xpath://option[@ng-reflect-value="Yes"]

${CHILD_NAME}                    xpath://input[@ng-reflect-name="child_first_name_0"]
${ADD_CHILD_BUTTON}              xpath://span[contains(text(), "Add Child")]