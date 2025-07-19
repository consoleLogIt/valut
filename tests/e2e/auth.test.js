import { expect, test } from "@playwright/test";
import LoginPage from "../pages/login.page";
import DashboardPage from "../pages/dashboard.page";

test.describe("Secret Management", () => {
  let loginPage;
  let dashboardPage;
  const testUser = {
    email: "testUser@gmail.com",
    password: "testUser",
  };
  const testSecret = {
    name: "test-secret-" + Date.now(),
    value: "this is a something top secret!",
  };

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);

    // Login before each test
    await loginPage.navigate();
    await loginPage.login(testUser.email, testUser.password);
    await expect(page).toHaveURL("/dashboard");
  });

  test("create secret", async () => {
    // Add a new secret
    await dashboardPage.addSecret(testSecret.name, testSecret.value);

    // Verify the secret is visible in the list
    await dashboardPage.verifySecretIsVisible(testSecret.name);

    // Verify the secret value can be revealed
    await dashboardPage.verifySecretValue(testSecret.name, testSecret.value);
  });

  // test("update secret", async () => {
  //   // Update the secret
  //   await dashboardPage.updateSecret(testSecret.name, "updated-secret", "updated-value");

  //   // Verify the secret is updated
  //   await dashboardPage.verifySecretIsVisible("updated-secret");

  //   // Verify the secret value can be revealed
  //   await dashboardPage.verifySecretValue("updated-secret", "updated-value");
  // });

  // test("delete secret", async () => {
  //   // Delete the secret
  //   await dashboardPage.deleteSecret("updated-secret");

  //   // Verify the secret is deleted
  //   await dashboardPage.verifySecretNotVisible("updated-secret");
  // });
});
