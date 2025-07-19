class LoginPage {
    constructor(page) {
      this.page = page;
      this.emailInput = page.getByRole('textbox', { name: 'Email' });
      this.passwordInput = page.getByRole('textbox', { name: 'Password' });
      this.submitButton = page.getByRole('button', { name: 'Login' });
      this.errorMessage = page.getByTestId('error-message');
    }
  
    async navigate() {
      await this.page.goto('/login');
    }
  
    async login(email, password) {
      await this.emailInput.fill(email);
      await this.passwordInput.fill(password);
      await this.submitButton.click();
    }
  }
  
export default LoginPage;

// test('test', async ({ page }) => {
//   await page.goto('http://localhost:3000/login');
//   await page.getByRole('textbox', { name: 'Email' }).click();
//   await page.getByRole('textbox', { name: 'Email' }).fill('testUser@gmail.com');
//   await page.getByRole('textbox', { name: 'Password' }).click();
//   await page.getByRole('textbox', { name: 'Password' }).fill('testUser');
//   await page.getByRole('button', { name: 'Login' }).click();
//   await page.getByRole('button', { name: 'Logout' }).click();
// })