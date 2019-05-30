import {
  browser,
  element,
  by,
  ElementFinder,
  promise,
  ElementArrayFinder
} from "protractor";

export class LoginPage {
  async navigateTo() {
    return await browser.get("/#/login");
  }
  async navigateToCourses() {
    return await browser.get("/#/courses");
  }
  async getUserInLocalStorage() {
    return await browser.executeScript(
      "return window.localStorage.getItem('user');"
    );
  }
  async clickSubmit() {
    return await element(by.buttonText("Войти")).click();
  }
  getForm(): ElementFinder {
    return element(by.className("login__items"));
  }
  getLoginInputText(): ElementFinder {
    return element(by.name("login"));
  }
  getPasswordInputText(): ElementFinder {
    return element(by.name("pass"));
  }
  getButtonSubmit(): ElementFinder {
    return element(by.buttonText("Войти"));
  }
  getTableHeader(): ElementArrayFinder {
    return element.all(by.tagName("a"));
  }

  getCourses(): ElementFinder {
    return element(by.className("courses__items"));
  }
}