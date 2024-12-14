@login
Feature: User Authentication tests

  Background:
    Given User navigates to the OrangeHRM login page

  @successful_login
  Scenario: Login should be success
    And User enter the credentials as "Admin", "admin123"
    When User click on the login button
    Then Login should be success

    
  @unsuccessful_login
  Scenario: Login should not be success
    And User enter the credentials as "InvalidUsername", "InvalidPassword"
    When User click on the login button
    Then Login should be fail