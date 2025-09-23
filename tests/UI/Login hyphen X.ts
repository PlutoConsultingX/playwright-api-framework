import { test, expect } from '@playwright/test';

test('Login hyphen X',{tag : '@ui'}, async ({ page }) => {
  await page.goto('https://qa.portal.hyphen.co.za/auth/realms/HyphenRealm/protocol/openid-connect/auth?client_id=BureauClientID&redirect_uri=https%3A%2F%2Fqa.portal.hyphen.co.za%2F&state=24ec59ec-c58e-499a-8a3f-07946dbf0209&response_mode=fragment&response_type=code&scope=openid&nonce=521a3a42-be6e-4e00-b243-22bdca99718d');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('venuser3');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Testin@123!!');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveTitle(/HyphenX/);
  
 
});