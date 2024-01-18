*** Settings ***
Documentation      Family info step tests
Library            SeleniumLibrary        run_on_failure=None
Resource           ../resources/common.resource
Resource           ../resources/application.resource
Resource           ../keywords/application.robot
Suite Setup        Run Keywords     Open Browser On Application
                    ...    AND      Override And Go To Next Application Step
Suite Teardown     Close Browser

*** Test Cases ***
Child Drop Down Functionality
    Click Element                    ${CHILDREN_DROPDOWN}
    Click Element                    ${OPTION_YES}
    Element Should Be Visible        ${CHILD_NAME}
    Element Should Be Visible        ${ADD_CHILD_BUTTON}

Add Multiple Children
    ${i}=        Set Variable       1
    FOR    ${i}    IN RANGE         1    10
        Scroll Element Into View         ${ADD_CHILD_BUTTON}
        Execute Javascript               window.scrollBy(0, 100)
        Click Element                    ${ADD_CHILD_BUTTON}
        Element Should Be Visible        xpath://input[@ng-reflect-name="child_first_name_${i}"]
    END