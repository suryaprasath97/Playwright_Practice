import { Page, Locator, expect } from '@playwright/test'
import { EnvReader } from './EnvReader';

export class BaseMethod extends EnvReader {

    constructor(protected page: Page) {
        super()
    }

    async switchWindow(locator: Locator) {

        const [newpage] = await Promise.all([this.page.context().waitForEvent('page'),
        locator.click()
        ])

        return newpage;
    }

    async clickElement(locator: Locator) {
        await locator.isVisible();
        await locator.click();

    }

    async sentText(locator: Locator, value: string) {
        await locator.isVisible();
        await locator.isEnabled();
        await locator.fill(value);

    }

    async typetext(locator: Locator, value: string, timeout: number) {

        await locator.pressSequentially(value, { delay: timeout });
    }


    async launchURL(value: string,) {
        console.log("URL received:", value);
        console.log("URL type:", typeof value);

        await this.page.goto(value);
    }

    async refresh() {

        await this.page.reload();
    }

    async browserForward() {

        await this.page.goForward();
    }

    async browserBackward() {

        await this.page.goBack();

    }

    async Cleartext(locator: Locator) {

        await locator.clear();
    }

    async chcekthebox(locator: Locator) {
        await locator.isEnabled();
        await locator.check();
    }

    async UnChcekthebox(locator: Locator) {
        await locator.isEnabled();
        await locator.uncheck();
    }

    async close() {

        await this.page.close();
    }

    async selectByValue(locator: Locator, value1: string) {

        await locator.selectOption({ value: value1 });
    }

    async selectByIndex(locator: Locator, value1: number) {

        await locator.selectOption({ index: value1 });
    }

    async selecByText(locator: Locator, value1: string) {

        await locator.selectOption({ label: value1 });
    }



    async SimpleAndConfirmalertaccpet(Confirmalert: string) {
        this.page.on('dialog', async dialog => {
            if (Confirmalert == 'accept') {
                await dialog.accept();

            } else if (Confirmalert == 'dismiss') {

                await dialog.dismiss();
            }
        })
    }

    async promptalertaccpet(Confirmalert: string, msg: string) {

        this.page.on('dialog', async dialog => {
            console.log("Alert Message", dialog.message())
            if (Confirmalert == 'accept') {

                await dialog.accept(msg);

            } else if (Confirmalert == 'dismiss') {

                await dialog.dismiss();
            }
        })
    }

    async doubleClick(locator: Locator) {
        await locator.isEnabled();
        await locator.dblclick();
    }

    async rightClick(locator: Locator) {
        await locator.isEnabled();
        await locator.click({ button: 'right' })
    }

    async leftClick(locator: Locator) {
        await locator.isEnabled();
        await locator.click({ button: 'left' })
    }

    async middleClick(locator: Locator) {
        await locator.isEnabled();
        await locator.click({ button: 'middle' })
    }

    async mouseHover(locator: Locator) {
        await locator.isVisible();
        await locator.hover();
    }

    async locatorscreenshot(locator: Locator, imagestorepath: string) {
        await locator.isVisible();
        await locator.screenshot({ path: imagestorepath })
    }

    async fullPagescreenshot(imagestorepath: string) {

        await this.page.screenshot({ path: imagestorepath, fullPage: true })
    }

    async KeyboardActionLocator(locator: Locator, Action: string) {
        await locator.isVisible();
        await locator.press(Action)
    }

    async KeyboardActionPage(Action: string) {

        await this.page.keyboard.press(Action)

    }

    async allgetText(locator: Locator): Promise<string[]> {

        const gettext = await locator.allTextContents()

        return gettext;
    }

    async getText(locator: Locator): Promise<string> {

        const text = await locator.innerText();

        return text;
    }

    async draganddrop(webelemt1: string, webelemt2: string) {
        const source = this.page.locator(webelemt1)
        const target = this.page.locator(webelemt2)
        await source.dragTo(target);
    }

    async isElemntdisplaye(webelemnt: string) {

        const element = this.page.locator(webelemnt);
        await element.isVisible();

    }

    async isElemntenabled(webelemnt: string) {

        const element = this.page.locator(webelemnt);
        await element.isEnabled();

    }

    async isElemntchecked(webelemnt: string) {

        const element = this.page.locator(webelemnt);
        await element.isChecked();

    }

    async isElemnteditable(webelemnt: string) {

        const element = this.page.locator(webelemnt);
        await element.isEditable();

    }

    async WaitTimeout(time: number) {

        await this.page.waitForTimeout(time)
    }

    async WaitLoadstate() {

        await this.page.waitForLoadState('load');
    }

    async Waitdomcontentloaded() {

        await this.page.waitForLoadState('domcontentloaded');
    }

    async Waitnetworkidle() {

        await this.page.waitForLoadState('networkidle');
    }

    async verifyVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    async verifytext(locator: Locator, str: string) {
        // await locator.waitFor({state:'visible',timeout:10000})
        await expect(locator).toHaveText(str);
    }

    async verifyattributeValue(locator: Locator, str: string) {
        await expect(locator).toHaveAttribute('value', str);
    }

    async verifyTitle(Title: string) {
        await expect(this.page).toHaveTitle(Title);

    }

    async uploadImage(locator: Locator, filePath: string) {

        await locator.setInputFiles(filePath);

    }
    async uploadImage1(locator: Locator, filePath: string) {

        await locator.setInputFiles(filePath);

    }
    async uploadImage2(locator: Locator, filePath: string) {

        await locator.setInputFiles(filePath);

    }

    





}