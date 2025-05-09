/**
 * Contains all locators for the Login page
 */
export const NewCustomerLocators = {
    // Section Title
    NEW_CUSTOMER_TITLE: "//h2[normalize-space(text())='New Customer']",
  
    // Sub-header text
    REGISTER_ACCOUNT_SUBTITLE: "//strong[normalize-space(text())='Register Account']",
  
    // Description paragraph (if you need to assert the text)
    NEW_CUSTOMER_DESCRIPTION: "(//h2[text()='New Customer']/following-sibling::p)[2]",
  
    // Action Buttons
    CONTINUE_BUTTON: "//a[@class='btn btn-primary']",
  } as const;
  
  
  export const ReturningCustomerLocators = {
    // Section Title
    RETURNING_CUSTOMER_TITLE: "//h2[normalize-space(text())='Returning Customer']",
  
    // Sub-header text
    RETURNING_CUSTOMER_SUBTITLE: "//strong[normalize-space(text())='I am a returning customer']",
  
    // Input fields
    EMAIL_PLACEHOLDER: "input[placeholder='E-Mail Address']", // or "input[placeholder='E-Mail Address']" if you want to use placeholder
    PASSWORD_PLACEHOLDER: "input[placeholder='Password']", // or "input[placeholder='Password']" if you want to use placeholder
  
    // Links
    FORGOT_PASSWORD_LINK: "//input[@class='form-control']/following-sibling::a[1]",
  
    // Action Buttons
    LOGIN_BUTTON: "input[value='Login']", // or "button:has-text('Login')" if it were a button tag
  
    // Error Messages
    ERROR_MESSAGE: "div.alert.alert-danger.alert-dismissible",
  } as const;
  
  
  export const LoginPageTimeouts = {
    DEFAULT_TIMEOUT: 5000,
    NAVIGATION_TIMEOUT: 10000,
    ELEMENT_VISIBILITY_TIMEOUT: 3000,
  } as const; 