*** Settings ***
Documentation      Info fillout tests
Library            SeleniumLibrary        run_on_failure=None
Library            ../resources/ApplicationLibrary.py
Resource           ../resources/common.resource
Resource           ../resources/application.resource
Resource           ../keywords/application.robot
Suite Setup        Open Browser On Application
Suite Teardown     Close Browser

*** Test Cases ***
Inputs Are Clickable
    Click Element                    ${NAME_LABEL}
    Element Should Be Focused        ${NAME_INPUT}
    Click Element                    ${LNAME_LABEL}
    Element Should Be Focused        ${LNAME_INPUT}
    Click Element                    ${NATIONALITY_LABEL}
    Element Should Be Focused        ${NATIONALITY_INPUT}
    Click Element                    ${MOBILE_LABEL}
    Element Should Be Focused        ${MOBILE_INPUT}
    Click Element                    ${EMAIL_LABEL}
    Element Should Be Focused        ${EMAIL_INPUT}

Date Of Birth Accepts Only Valid Values
    Input Text                       ${BDATE_INPUT}        99999999
    ${bdate_value}=                  Get Value             ${BDATE_INPUT}     # extracts as YYYY-MM-DD
    Birth Year Should Be Valid       ${bdate_value}

Phone Accepts Only Valid Values
    Input Text    ${MOBILE_INPUT}    ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
    Sleep    5
    ${phone_value}=                  Get Value             ${MOBILE_INPUT}
    Should Be Empty                  ${phone_value}

Height Accepts Only Valid Values
    Input Text    ${HEIGHT_INPUT}    ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz
    ${height_value}=                 Get Value             ${MOBILE_INPUT}
    Should Be Empty                  ${height_value}