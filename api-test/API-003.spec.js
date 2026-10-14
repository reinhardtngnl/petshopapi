import { expect, test } from '@playwright/test';
import { PET_ID, PET_NAME } from './pet-shared-data.js';

test('API-003: deletes the pet created by API-001', async ({ request }) => {
  const apiKey = process.env.PETSTOREAPIKEY;
  expect(apiKey, 'Set PETSTOREAPIKEY before running API-003').toBeTruthy();

  const petResponse = await request.get(`pet/${PET_ID}`);
  expect(petResponse.status()).toBe(200);
  expect(await petResponse.json()).toEqual(expect.objectContaining({
    id: PET_ID,
    name: PET_NAME,
  }));

  const deleteResponse = await request.delete(`pet/${PET_ID}`, {
    headers: {
      api_key: apiKey,
    },
  });

  expect(deleteResponse.status()).toBe(200);
  expect(await deleteResponse.json()).toEqual(expect.objectContaining({
    code: 200,
  }));
});