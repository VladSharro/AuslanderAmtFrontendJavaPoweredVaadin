*** Settings ***
Documentation   Resource file with setup keywords and base variables
...             for ASPD23 RP application service.
Library         SeleniumLibrary   run_on_failure=None

*** Variables ***
${BROSWER}      headlesschrome
${DOMAIN}       localhost:4200
${HOME_URL}     http://${DOMAIN}/
${GOOGLE_URL}   https://www.google.com/
${WIDTH}        1400
${HEIGHT}       900

*** Keywords ***
Open Browser On Home Page
    Open Browser   ${HOME_URL}   ${BROSWER}
    Set Window Size   ${WIDTH}   ${HEIGHT}
    Set Selenium Implicit Wait   5

Open Browser To Test
    # Open Browser   ${GOOGLE_URL}   ${BROSWER}
    # Set Window Size   ${WIDTH}   ${HEIGHT}
    # Set Selenium Implicit Wait   5
    Open No_Sandbox Chrome

Create No_Sandbox Webdriver
    ${chrome_options}    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Call Method    ${chrome_options}    add_argument    --headless
    Call Method    ${chrome_options}    add_argument    --no-sandbox
    ${options}    Call Method     ${chrome_options}    to_capabilities
    
    Create Webdriver    Chrome    chrome_options==${options}
    
    Go To   ${GOOGLE_URL}

Open No_Sandbox Chrome
    ${chrome_options}    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver
    Call Method    ${chrome_options}   add_argument    --no-sandbox
    ${options}    Call Method     ${chrome_options}    to_capabilities     

    Open Browser    ${GOOGLE_URL}    browser=chrome    desired_capabilities=${options}