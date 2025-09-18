
// @ts-check


import { test, expect } from '@playwright/test';

test('Landing Page', async ({ page }) => {
  await page.goto('https://www.hyphen.co.za/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Hyphen Financial Services/);
});

test('Login Hyphen FACS', async ({ page }) => {
  await page.goto('https://w01.hyphen.co.za/');

  // Click the get started link.
  //await page.getByRole('link', { name: 'Get started' }).click();

  //await page.getByRole('link',{name:'//*[@id="navbarNav"]/ul/li[2]/a'} ).click();

  // Assert
  await expect(page).toHaveTitle(/Hyphen FACS/);//Welcome to Hyphen
  //await expect(page.getByRole('heading', { name: 'Hyphen FACS' })).toBeVisible();
});

test('Login Hyphen Current Portal', async ({ page }) => {
  await page.goto('https://hyphen.co.za/auth/login');

  // Assert
  await expect(page).toHaveTitle(/Welcome to Hyphen/);
  //await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Login HyphenX', async ({ page }) => {
  await page.goto('https://portal.hyphen.co.za/auth/realms/HyphenRealm/protocol/openid-connect/auth?client_id=BureauClientID&redirect_uri=https%3A%2F%2Fportal.hyphen.co.za%2F&state=3aa425cb-201d-4c44-83fe-1fbc7e4b7480&response_mode=fragment&response_type=code&scope=openid&nonce=dfb1c571-606d-4e2a-b8a1-dbc8a070131e');

  // Click the get started link.
  //await page.getByRole('link', { name: 'Get started' }).click();

  //await page.getByRole('link',{name:'//*[@id="navbarNav"]/ul/li[2]/a'} ).click();

  // Assert
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
