import { logger } from '../utils/logger.js';

export class UserClient {
  constructor(request, token) {
    this.request = request;
    this.token = token;
  }
/*
  async createUser(payload) {
    logger.info("Sending POST request to create user...");

    const response = await this.request.post("/users", {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      data: payload
    });

    return response;
  }
*/
  async validation(payload) {
    logger.info("Sending POST request to create transaction...");

    const response = await this.request.post("/transaction", {
      headers: {
        Authorization: `Bearer ${this.token}`
      },
      data: payload
    });

    return response;
  }
}
