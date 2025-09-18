// utils/apiClient.js

import { request } from '@playwright/test';
import { AuthConfig } from '../config/authConfig.js';

export class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.context = null;
  }

  async init() {
    this.context = await request.newContext({
      baseURL: this.baseURL,
    });
  }

  _authHeaders(extraHeaders = {}) {
    const token = AuthConfig.token;
    return token
      ? {
          ...extraHeaders,
          Authorization: `Bearer ${token}`,
        }
      : extraHeaders;
  }

  async get(endpoint, headers = {}) {
    return await this.context.get(endpoint, {
      headers: this._authHeaders(headers),
    });
  }

  async post(endpoint, data = {}, headers = {}) {
    return await this.context.post(endpoint, {
      data,
      headers: this._authHeaders(headers),
    });
  }

  async put(endpoint, data = {}, headers = {}) {
    return await this.context.put(endpoint, {
      data,
      headers: this._authHeaders(headers),
    });
  }

  async delete(endpoint, headers = {}) {
    return await this.context.delete(endpoint, {
      headers: this._authHeaders(headers),
    });
  }

  async dispose() {
    await this.context.dispose();
  }
}
