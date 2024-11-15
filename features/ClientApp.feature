Feature: Greeting

    Description - Ecommerce client app

    Scenario: Placing the order
        Given Login to ecommerce application with 'anshika@gmail.com' and 'Iamking@000'
        When Add item "Zara Coat 4" to Cart
        Then Verify "Zara Coat 4" is displayed in Cart
        When Enter valid details and place the order
        Then Verify order is present in OrderHistory