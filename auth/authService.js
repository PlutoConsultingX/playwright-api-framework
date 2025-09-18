// auth/authService.js

import { request } from '@playwright/test';
import { AuthConfig } from '../config/authConfig.js';

export class AuthService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async login() {
    const context = await request.newContext({ baseURL: this.baseURL });

    const response = await context.post(AuthConfig.loginEndpoint, {
      data: {
        username: AuthConfig.username,
        password: AuthConfig.password,
      },
    });

    if (response.ok()) {
      const body = await response.json();
      AuthConfig.accessToken = body.access_token;
      AuthConfig.refreshToken = body.refresh_token;
      console.log('[Auth] Login successful, tokens stored.');
    } else {
      throw new Error(`[Auth] Login failed: ${response.status()}`);
    }

    await context.dispose();
  }

  async refreshToken() {
    console.log('[Auth] Attempting to refresh token...');
    const context = await request.newContext({ baseURL: this.baseURL });

    const response = await context.post(AuthConfig.refreshEndpoint, {
      data: {
        refresh_token: AuthConfig.refreshToken,
      },
    });

    if (response.ok()) {
      const body = await response.json();
      AuthConfig.accessToken = body.access_token;
      AuthConfig.refreshToken = body.refresh_token;
      console.log('[Auth] Token refreshed successfully.');
      return true;
    } else {
      console.error('[Auth] Refresh failed, re-login may be required.');
      return false;
    }
  }
}
