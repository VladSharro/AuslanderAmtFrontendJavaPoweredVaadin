*** Settings ***
Documentation   Resource file with setup keywords and base variables
...             for ASPD23 RP application service
Library         SeleniumLibrary   run_on_failure=None

*** Variables ***
${BROSWER}            headlesschrome
${DOMAIN}             132.231.1.189
${HOME_URL}           http://${DOMAIN}/
${WIDTH}              1400
${HEIGHT}             900

${APPLICATION_URL}    http://${DOMAIN}/nonEuFirstTimeApp

*** Keywords ***
Open Browser On Home Page
    Open Browser                   ${HOME_URL}           ${BROSWER}
    Set Window Size                ${WIDTH}              ${HEIGHT}
    Set Selenium Implicit Wait     10

Open Browser On Application
    Open Browser                   ${APPLICATION_URL}    ${BROSWER}
    Set Window Size                ${WIDTH}              ${HEIGHT}
    Set Selenium Implicit Wait     10