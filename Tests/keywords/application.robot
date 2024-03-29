*** Settings ***
Documentation     Keywords and base variables for application process testing
Library           SeleniumLibrary   run_on_failure=None
Resource          ../resources/common.resource
Resource          ../resources/application.resource

*** Variables ***
${APPL_TYPE_HEADER}             xpath://h2[contains(text(), "Application Type")]
${FIRST_TIME_OPTION}            xpath://input[@value="This is my first permit"]
${RENEWAL_OPTION}               xpath://input[@value="I want to extend my permit"]
${NONEU_OPTION}                 xpath://input[@value="No"]
${TYPE_SELECT_BUTTON}           xpath://span[contains(text(), "Continue")]

${PROGRESS_BAR}                 class:mat-horizontal-stepper-header-container

*** Keywords ***
Open Browser On Application
    Open Browser On Home Page
    Wait Until Element Is Visible        ${START_BUTTON}
    Click Element                        ${START_BUTTON}
    # Click Element                        ${FIRST_TIME_OPTION}
    # Click Element                        ${TYPE_SELECT_BUTTON}
    Select First Time Application

Select First Time Application
    Wait Until Element Is Visible        ${APPL_TYPE_HEADER}
    Click Element                        ${FIRST_TIME_OPTION}
    Click Element                        ${TYPE_SELECT_BUTTON}
    Wait Until Element Is Visible        ${PROGRESS_BAR}

Select Renewal Application
    Wait Until Element Is Visible        ${APPL_TYPE_HEADER}
    Click Element                        ${RENEWAL_OPTION}
    Click Element                        ${TYPE_SELECT_BUTTON}
    Wait Until Element Is Visible        ${PROGRESS_BAR}

Toggle Override
    Click Element                ${OVERRIDE_SWITCH}

Override And Go To Next Application Step
    Scroll Element Into View     ${SAVE_BUTTON}
    Execute Javascript           window.scrollBy(0, 100)
    Toggle Override
    Click Element                ${SAVE_BUTTON}
    Click Element                ${DISMISS_BUTTON}
    Click Element                ${NEXT_BUTTON}

Go To Next Application Step
    Scroll Element Into View     ${SAVE_BUTTON}
    Click Element                ${SAVE_BUTTON}
    Click Element                ${DISMISS_BUTTON}
    Click Element                ${NEXT_BUTTON}