*** Settings ***
Documentation   Resource file with setup keywords and base variables
...             for ASPD23 RP application service
Library         SeleniumLibrary   run_on_failure=None

*** Variables ***
${BROSWER}      Chrome
${DOMAIN}       132.231.1.189
${HOME_URL}     http://${DOMAIN}/
${WIDTH}        1400
${HEIGHT}       900

*** Keywords ***
Open Browser On Home Page
    Open Browser   ${HOME_URL}   ${BROSWER}
    Set Window Size   ${WIDTH}   ${HEIGHT}
    Set Selenium Implicit Wait   5