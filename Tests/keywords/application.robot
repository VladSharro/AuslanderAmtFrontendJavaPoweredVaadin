*** Settings ***
Documentation     Keywords and base variables for application process testing
Library           SeleniumLibrary   run_on_failure=None
Resource          ../resources/application.resource

*** Variables ***
${APPL_TYPE_HEADER}             xpath://h2[contains(text(), "Application Type")]
${FIRST_TIME_OPTION}            xpath://input[@value="This is my first permit"]
${RENEWAL_OPTION}               xpath://input[@value="I want to extend my permit"]
${NONEU_OPTION}                 xpath://input[@value="No"]
${TYPE_SELECT_BUTTON}           xpath://span[contains(text(), "Continue")]

${PROGRESS_BAR}                 class:mat-horizontal-stepper-header-container

*** Keywords ***
Select First Time Application
    Wait Until Element Is Visible        ${APPL_TYPE_HEADER}
    Click Element                        ${FIRST_TIME_OPTION}
    ### DEPRECATED
    Select NonEU
    ###
    Click Element                        ${TYPE_SELECT_BUTTON}
    Wait Until Element Is Visible        ${PROGRESS_BAR}

Select Renewal Application
    Wait Until Element Is Visible        ${APPL_TYPE_HEADER}
    Click Element                        ${RENEWAL_OPTION}
    Click Element                        ${TYPE_SELECT_BUTTON}
    Wait Until Element Is Visible        ${PROGRESS_BAR}

Select NonEU
    Click Element                        ${NONEU_OPTION}