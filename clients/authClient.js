import { logger } from '../utils/logger.js';
import { loadEnvironment } from '../utils/env.js';

const ENV = loadEnvironment(process.env.ENV || "qa");

export class AuthClient {
  constructor(request) {
    this.request = request;
  }

  async generateToken() {
    logger.info("Generating token using password grant...");

    const response = await this.request.post(ENV.AUTH_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      data: {
        grant_type: "password",
        client_id: "hyptransform",
        client_secret: "NRMxErHZgAATuY1I5OMjQM80i3YITcpt",
        username: "sysuser_transf_qa",
        password: "DvD%P!22[20hgg(492f",
        scope: "openid"
      }
    });


    if (!response.ok()) {
      logger.error("Token generation failed");
      throw new Error(await response.text());
    }

    const body = await response.json();
    logger.info("Token generated successfully.");

    return body.access_token;
  }
}
