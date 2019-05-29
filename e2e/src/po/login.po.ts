import { browser, element, by, ElementFinder, promise, ElementArrayFinder } from 'protractor';

export class LoginPage{
    navigateTo():promise.Promise<any>{
        return browser.get('/#/login');
    }
    getForm():ElementFinder{
        return element(by.className('login__items'));
    }
    getLoginInputText():ElementFinder{
        return element(by.name('login'));
    }
    getPasswordInputText():ElementFinder{
        return element(by.name('pass'));
    }
    getButtonSubmit():ElementFinder{
        return element(by.buttonText('Войти'));
    }
    getTableHeader(): ElementArrayFinder {
        return element.all(by.tagName('a'));
    }
}