*** Settings ***
Documentation      Home page tests
Resource           ../resources/common.resource
Resource           ../keywords/home.robot
Resource           ../keywords/application.robot
Suite Setup        Open Browser On Home Page
Suite Teardown     Close Browser

*** Test Cases ***
Header Is Clickable
    Skip                         Header is unclickable, issue created
    Click Element                ${HOME_BUTTON_LOC}
    Location Should Be           ${HOME_URL}
    Click Element                ${GUIDE_BUTTON_LOC}
    Location Should Contain      Guide
    Click Element                ${FAQ_BUTTON_LOC}
    Location Should Contain      FAQ
    Click Element                ${DOCUMENTS_BUTTON_LOC}
    Location Should Contain      Documents
    Click Element                ${CONTACT_BUTTON_LOC}
    Location Should Contain      Contact
    Reset To Home

First-Time Application Start
    Click Element                        ${START_BUTTON}
    Select First Time Application
    Location Should Contain              nonEuFirstTimeApp
    Reset To Home

Renewal Application Start
    Skip                                 Application extension not implemented yet
    Click Element                        ${START_BUTTON}
    Select Renewal Application
    Location Should Contain              nonEuExtension
    Reset To Home