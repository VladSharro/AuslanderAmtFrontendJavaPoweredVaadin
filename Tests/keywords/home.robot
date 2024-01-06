*** Settings ***
Library            SeleniumLibrary   run_on_failure=None
Resource           ../resources/common.resource

*** Variables ***
${HOME_BUTTON_LOC}            xpath: //span[contains(text(), "Home")]
${GUIDE_BUTTON_LOC}           xpath: //span[contains(text(), "Guide")]
${FAQ_BUTTON_LOC}             xpath: //span[contains(text(), "FAQ")]
${DOCUMENTS_BUTTON_LOC}       xpath: //span[contains(text(), "Documents")]
${CONTACT_BUTTON_LOC}         xpath: //span[contains(text(), "Contact")]

${START_BUTTON}               xpath: //span[contains(text(), "START APPLICATION")]

*** Keywords ***
Reset To Home
    Go To       ${HOME_URL}