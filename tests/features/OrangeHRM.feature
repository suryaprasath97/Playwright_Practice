Feature:Verify the OrageHRM Login page module


@OrangeHRMlogin
Scenario: Verify Login Function with Valig userName and Password

Given User Launch the URL
When User Enter the Valid UserName
And User Enter the Valid Password
And User Click the Loginbutton
Then Validate the title of the dashboard page "OrangeHRM"

