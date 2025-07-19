import { expect } from "@playwright/test";

class DashboardPage {
  constructor(page) {
    this.page = page;
    this.addSecretButton = page.getByTestId("add-secret-btn");
    this.secretNameInput = page.getByTestId("secret-name-input");
    this.secretValueInput = page.getByTestId("secret-value-input");
    this.saveSecretButton = page.getByTestId("save-secret-btn");
    this.updateSecretButton = page.getByTestId("update-secret-btn");
    this.secretCard = (name) => page.getByTestId(`secret-card-${name}`);
  }

  async addSecret(name, value) {
    await this.addSecretButton.click();
    await this.secretNameInput.fill(name);
    await this.secretValueInput.fill(value);
    await this.saveSecretButton.click();
  }

  async verifySecretIsVisible(name) {
    await expect(this.secretCard(name)).toBeVisible();
  }

  async verifySecretValue(name, expectedValue) {
    const card = this.secretCard(name);
    await card.getByTestId("reveal-secret-btn").click();
    await expect(card.getByTestId("secret-value-revealed")).toContainText(
      expectedValue
    );
  }

  async updateSecret(oldName, newName, newValue) {
    const card = this.secretCard(oldName);
    await card.getByTestId("edit-secret-btn").click();

    if (newName) {
      await this.secretNameInput.fill(newName);
    }

    if (newValue) {
      await this.secretValueInput.fill(newValue);
    }

    await this.updateSecretButton.click();
  }

  async deleteSecret(name) {
    const card = this.secretCard(name);
    await card.getByTestId("delete-secret-btn").click();
    await this.page.getByRole("button", { name: "Delete" }).click();
  }

  async verifySecretNotVisible(name) {
    await expect(this.secretCard(name)).not.toBeVisible();
  }

  async logout() {
    await this.page.getByRole("button", { name: "Logout" }).click();
  }
}

export default DashboardPage;
