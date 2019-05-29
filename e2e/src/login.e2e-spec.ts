import { LoginPage } from "./po/login.po";
import { browser } from "protractor";
import { User } from "src/app/models/user";

describe("Login tests", () => {
  let page: LoginPage;
  const mockUser: User = { login: "test", password: "test" };

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it("Login form should be invalid and button submit is disabled", () => {
    page.getLoginInputText().sendKeys("");
    page.getPasswordInputText().sendKeys("");

    let form = page.getForm().getAttribute("class");
    let button = page.getButtonSubmit().isEnabled();
    expect(button).toBeFalsy();
    //expect(form).toContain("ng-invalid");
  });

  it("Login form should be valid and button submit is enabled", () => {
    page.getLoginInputText().sendKeys("test");
    page.getPasswordInputText().sendKeys("test");

    let button = page.getButtonSubmit().isEnabled();
    expect(button).toBeTruthy;
  });

  it("should be header login", () => {
    let loginLink = page
      .getTableHeader()
      .get(1)
      .getText();
    expect(loginLink).toContain("Вход");
  });

  it("should be header signup", () => {
    let signupLink = page
      .getTableHeader()
      .get(2)
      .getText();
    expect(signupLink).toContain("Регистрация");
  });

  it("should not be header logout", () => {
    let logoutLink = page.getTableHeader().getText();
    expect(logoutLink).not.toContain("Выход");
  });

 
});
