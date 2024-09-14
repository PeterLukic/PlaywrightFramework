Feature: Ecommerce validations

  @Regresion
  Scenario: Pacing the Order
    Given Login to Ecommerce application with "peter.lukic@gmail.com" and "12345"
    When Add "ADIDAS ORIGINAL" to Cart
    Then Verify "ADIDAS ORIGINAL" is displayed in the Cart
    When Enter valid details and Place the  Order
    Then Verify order in present in the OrderHistory

  @Validation2
  Scenario: Error Validation 2
    Given Login to Ecommerce2 application with "<username>" and "<password>"
    Then I Verify Error message is displayed

    Examples:
      | username           | password    |
      | anshika1@gmail.com | Iamking@000 |
      | anshika1@gmail.com | lsasasg@000 |