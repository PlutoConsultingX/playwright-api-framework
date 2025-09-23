
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

test('Login HyphenX',{tag : '@ui'}, async ({ page }) => {

  await page.goto('https://qa.portal.hyphen.co.za/auth/realms/HyphenRealm/protocol/openid-connect/auth?client_id=BureauClientID&redirect_uri=https%3A%2F%2Fqa.portal.hyphen.co.za%2F&state=24ec59ec-c58e-499a-8a3f-07946dbf0209&response_mode=fragment&response_type=code&scope=openid&nonce=521a3a42-be6e-4e00-b243-22bdca99718d');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('venuser3');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Testin@123!!');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForTimeout(2000);
  //await expect(page).toHaveTitle(/HyphenX/);
//----------------Login ends here-----------------
await page.goto('https://qa.portal.hyphen.co.za/#/HyphenXPortal/home');
await page.getByRole('link', { name: 'Client Service Interface' }).click();
await page.locator('#accordionFive div').filter({ hasText: 'Onboarding nXFlow' }).locator('#subSection-link').click();
await page.getByRole('textbox', { name: 'Search' }).click();
await page.getByRole('textbox', { name: 'Search' }).fill('zan');
await page.getByRole('button', { name: 'Search' }).click();
await page.getByRole('cell', { name: 'Zanele Training Company' }).click();
await page.getByRole('button', { name: 'Add new workflow' }).click();
await page.getByRole('textbox', { name: 'Workflow name' }).click();
await page.getByRole('textbox', { name: 'Workflow name' }).fill('WF_Thato_Auto_Discovery');
await page.getByRole('textbox', { name: 'Workflow description' }).click();
await page.getByRole('textbox', { name: 'Workflow description' }).fill('Debit Collection flow');
await page.getByRole('button', { name: 'Submit' }).click();


//--------Drago and drop fucntion to be moved starts here----------------
    // Example in JavaScript
    const { test, expect } = require('@playwright/test');

    test('drag and drop function', async ({ page }) => {
      await page.goto('your_application_url_here');

      // Locate the draggable element and the drop target
      const draggableElement = page.locator('#draggable');
      const dropTarget = page.locator('#droppable');

      // Perform the drag and drop action
      await draggableElement.dragTo(dropTarget);

      // Add assertions to verify the successful drop, if needed
      await expect(dropTarget).toHaveText('Dropped!'); // Example assertion
    });
//-------------------------------------------------

await page.getByText('AVS').click();
await page.getByText('CDV').click();
await page.getByText('End').nth(1).click();
await page.getByText('AVS').click();


await page.getByText('DebiCheck Collection').click();
  
});

//Notes

//Run tests with specific tag : npx playwright test --grep "@ui"
//Run tests excluding specific tag : npx playwright test --grep-invert "@API"