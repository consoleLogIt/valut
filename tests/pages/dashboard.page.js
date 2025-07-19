import { expect } from "@playwright/test";

class DashboardPage {
    constructor(page) {
        this.page = page;
        this.addSecretButton = page.getByRole('button', { name: 'Add Secret' });
        this.secretNameInput = page.getByRole('textbox', { name: 'Secret Name' });
        this.secretValueInput = page.getByRole('textbox', { name: 'Secret Value' });
        this.saveSecretButton = page.getByRole('button', { name: 'Save Secret' });
        this.updateSecretButton = page.getByRole('button', { name: 'Update Secret' });
        this.secretCard = (name) => page.locator('div').filter({ hasText: new RegExp(`^${name}$`, 'i') }).first();
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
        await card.click(); 
        await card.getByTestId('reveal-secret-btn').click();
        await this.page.waitForTimeout(500);
        await expect(card.getByTestId('secret-value-revealed')).toHaveText(expectedValue);

    }

    async updateSecret(oldName, newName, newValue) {
        const card = this.secretCard(oldName);
        await card.getByTestId('edit-secret-btn').click();
        
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
        await card.getByTestId('delete-secret-btn').click();
        await this.page.getByRole('button', { name: 'Delete' }).click();
    }

    async verifySecretNotVisible(name) {
        await expect(this.secretCard(name)).not.toBeVisible();
    }
}

export default DashboardPage;