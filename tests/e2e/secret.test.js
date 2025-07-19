import { expect, test } from "@playwright/test";
import LoginPage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";

test.describe("Secret Management", () => {
  let loginPage;
  let dashboardPage;

  // test user
  const testUser = {
    email: "testUser@gmail.com",
    password: "testUser",
  };

  const getTestSecretData = () => {
    return {
      name: "test-secret-" + Date.now(), // Use Date.now() to make the name unique
      value: "this is a something top secret!",
    };
  };

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    await loginPage.navigate();
    await loginPage.login(testUser.email, testUser.password);
    await expect(page).toHaveURL("/dashboard");
  });

  test.afterEach(async ({ page }) => {
    await dashboardPage.logout();
    await expect(page).toHaveURL("/login");
  });

  test("create secret", async () => {
    const testSecret = getTestSecretData();
    await dashboardPage.addSecret(testSecret.name, testSecret.value);

    await dashboardPage.verifySecretIsVisible(testSecret.name);

    await dashboardPage.verifySecretValue(testSecret.name, testSecret.value);
  });

  test("update secret", async () => {
    const testSecret = getTestSecretData();

    await dashboardPage.addSecret(testSecret.name, testSecret.value);

    const updateSecret = getTestSecretData();
    await dashboardPage.updateSecret(
      testSecret.name,
      updateSecret.name,
      updateSecret.value
    );

    await dashboardPage.verifySecretIsVisible(updateSecret.name);
    await dashboardPage.verifySecretValue(
      updateSecret.name,
      updateSecret.value
    );
  });

  test("delete secret", async () => {
    const testSecret = getTestSecretData();

    await dashboardPage.addSecret(testSecret.name, testSecret.value);

    await dashboardPage.deleteSecret(testSecret.name);

    await dashboardPage.verifySecretNotVisible(testSecret.name);
  });
});
