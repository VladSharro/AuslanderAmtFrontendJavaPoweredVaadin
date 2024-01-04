*** Settings ***
Documentation      Home page tests
Resource           ../resources/common.resource
Suite Setup        Open Browser On Home Page
Suite Teardown     Close Browser

*** Test Cases ***
Title Exists
    ${TITLE} =   Get Title
    Should Not Be Empty   ${TITLE}