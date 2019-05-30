import { LoginPage } from "../page-objects/login.po";
import { User } from "src/app/models/user";
import "zone.js";
import "zone.js/dist/async-test.js";
import "zone.js/dist/proxy.js";
import "zone.js/dist/sync-test";
import "zone.js/dist/jasmine-patch";

describe("Login tests", () => {
  let page: LoginPage;
  const mockUser: User = { login: "test", password: "test" };

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it("Login form should be valid", () => {
    let formLogin = page.getLoginInputText();
    formLogin.sendKeys("test");
    let formPassword = page.getPasswordInputText();
    formPassword.sendKeys("test");

    expect(formLogin.getAttribute("class")).toContain("ng-valid");
    expect(formPassword.getAttribute("class")).toContain("ng-valid");
  });

  it("Login form should be invalid", () => {
    let formLogin = page.getLoginInputText();
    formLogin.sendKeys("");
    let formPassword = page.getPasswordInputText();
    formPassword.sendKeys("");

    expect(formLogin.getAttribute("class")).toContain("ng-invalid");
    expect(formPassword.getAttribute("class")).toContain("ng-invalid");
  });

  it("Login form should be invalid and button submit is disabled", () => {
    page.getLoginInputText().sendKeys("");
    page.getPasswordInputText().sendKeys("");

    let button = page.getButtonSubmit().isEnabled();
    expect(button).toBeFalsy();
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

  it("Login form should be valid and navigate to courses", (done: DoneFn) => {
    page.getLoginInputText().sendKeys("q");
    page.getPasswordInputText().sendKeys("q");
    page.clickSubmit();

    let course = page.getCourses().isDisplayed();
    expect(course).toBeTruthy();
    done();
  });

  it("Login form should not be valid and not navigate to courses", (done: DoneFn) => {
    page.getLoginInputText().sendKeys("");
    page.getPasswordInputText().sendKeys("");
    page.clickSubmit();
    let button = page.getButtonSubmit().isSelected();

    expect(button).toBeFalsy();
    done();
  });
});
