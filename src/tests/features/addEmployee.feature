@add_employee
Feature: Add Employee functionality

  Background:
    Given User is logged in
    And User navigates to the PIM section
  
  @add_employee_success
  Scenario Outline: Successfully adding a new employee
    When User navigates to the Add Employee tab
    And User fills in the mandatory fields with "<firstName>", "<lastName>", "<idEmployee>"
    And User clicks the Save button
    Then A success message should appear
    And User navigates to the Employee List tab
    And User searches for the employee with ID "<idEmployee>"
    Then The employee should be listed

    Examples:
    | firstName | lastName | idEmployee |
    | John      | Doe      | E0006      |

  @add_employee_missing_fields
  Scenario: Attempting to add an employee with missing mandatory fields
    When User navigates to the Add Employee tab
    And User leaves the mandatory fields empty
    And User clicks the Save button
    Then A required message should appear for missing mandatory fields
