import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('testUser@gmail.com');
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('testUser');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'Add Secret' }).click();
  await page.getByRole('textbox', { name: 'Secret Name' }).click();
  await page.getByRole('textbox', { name: 'Secret Name' }).fill('test');
  await page.getByRole('textbox', { name: 'Secret Value' }).click();
  await page.getByRole('textbox', { name: 'Secret Value' }).fill('this is a something top secret!');
  await page.getByRole('button', { name: 'Save Secret' }).click();
  await page.locator('div').filter({ hasText: /^••••••••••••$/ }).nth(1).click();
  await page.getByRole('button', { name: 'Reveal secret' }).click();
  await page.getByText('this is a something top').click();
});