*** Settings ***
Documentation   Resource file with setup keywords and base variables
...             for ASPD23 RP application service
Library         SeleniumLibrary   run_on_failure=None

*** Variables ***
${BROWSER}            %{BROWSER}
${DOMAIN}             %{DOMAIN}
${HOME_URL}           http://${DOMAIN}/
${WIDTH}              1400
${HEIGHT}             1000

${APPLICATION_URL}    http://${DOMAIN}/nonEuFirstTimeApp

*** Keywords ***
Open Browser On Home Page
    Open Browser                   ${HOME_URL}           ${BROWSER}
    Set Window Size                ${WIDTH}              ${HEIGHT}
    Set Selenium Implicit Wait     10