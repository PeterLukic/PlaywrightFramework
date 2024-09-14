Feature: Ecommerce validations

  @Validation1
  Scenario: Error Validation 1
    Given Login to Ecommerce2 application with "peter.lukic@gmail.com" and "12345"
    Then I Verify Error message is displayed

  @Validation2
  Scenario: Error Validation 2
    Given Login to Ecommerce2 application with "<username>" and "<password>"
    Then I Verify Error message is displayed

    Examples:
      | username           | password    |
      | anshika1@gmail.com | Iamking@000 |
      | anshika1@gmail.com | lsasasg@000 |
