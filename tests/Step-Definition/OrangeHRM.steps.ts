import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { OrangeHRMPage } from "../Pages/OrangeHRM_page";



setDefaultTimeout(40000)

let orange:OrangeHRMPage

Given('User Launch the URL', async function () {
  orange = new OrangeHRMPage(this.page)
  const url = orange.get("OrangeHRM_URL")
  await orange.launchURL(url)
});

When('User Enter the Valid UserName', async function () {
  const userName = orange.get("OrangeHRM_USERNAME")
  console.log(userName)
  await orange.enterUserName(userName)
  
});

When('User Enter the Valid Password', async function () {
  const Password = orange.get("OrangeHRM_PASSWORD")
  console.log(Password)
  await orange.enterPassword(Password)
});

When('User Click the Loginbutton', async function () {
  await orange.ClickSubmit()
});

Then('Validate the title of the dashboard page {string}', async function (Title) {
  await orange.OrangeHRMTitle(Title)
});
