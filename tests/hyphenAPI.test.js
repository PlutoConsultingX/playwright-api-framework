import { test, expect } from '@playwright/test';
import { APIClient } from '../utils/apiClient.js';
import { UserEndpoints } from '../endpoints/userEndpoints.js';
import { AuthService } from '../auth/authService.js';
/*
test.describe('User API Tests (with Auth & Refresh)', () => {
  let apiClient;

  test.beforeAll(async ({ baseURL }) => {
    const auth = new AuthService(baseURL);
    await auth.login(); // Initial login

    apiClient = new APIClient(baseURL);
    await apiClient.init();
  });

  test.afterAll(async () => {
    await apiClient.dispose();
  });

  test('GET user by ID with auto-refresh if needed',{tag : '@API'}, async () => {
    const response = await apiClient.get(UserEndpoints.getUser(1));
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
  });

  test('POST create user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    const response = await apiClient.post(UserEndpoints.createUser(), newUser);
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toMatchObject(newUser);
  });

  
});
*/
//-----------------------------------------------------------------------------------

/*
import { test, expect } from '@playwright/test';
import { APIClient } from '../utils/apiClient.js';
import { UserEndpoints } from '/endpoints/userEndpoints.js';

test.describe('User API Tests', () => {
  let apiClient;

  test.beforeAll(async ({ baseURL }) => {
    apiClient = new APIClient(baseURL);
    await apiClient.init();
  });

  test.afterAll(async () => {
    await apiClient.dispose();
  });

  test('GET user by ID', async () => {
    const response = await apiClient.get(UserEndpoints.getUser(1));
    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
  });

  test('POST create user', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
    };

    const response = await apiClient.post(UserEndpoints.createUser(), newUser);
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toMatchObject(newUser);
  });
});*/