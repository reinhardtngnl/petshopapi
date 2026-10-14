import 'dotenv/config';
import { defineConfig } from '@playwright/test';

const apiBaseUrl = process.env.PETSTORE_API_BASE_URL || 'https://petstore.swagger.io/v2';

export default defineConfig({
  testDir: './api-test',
  use: {
    baseURL: `${apiBaseUrl.replace(/\/+$/, '')}/`,
  },
  projects: [
    {
      name: 'api-001',
      testMatch: 'API-001.spec.js',
    },
    {
      name: 'api-002',
      testMatch: 'API-002.spec.js',
      dependencies: ['api-001'],
    },
    {
      name: 'api-003',
      testMatch: 'API-003.spec.js',
      dependencies: ['api-002'],
    },
  ],
});
