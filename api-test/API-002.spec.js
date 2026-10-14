import { expect, test } from '@playwright/test';
import { PET_ID, PET_NAME } from './pet-shared-data.js';

const PET_STATUSES = ['available', 'pending', 'sold'];

test('API-002: finds pets by each status', async ({ request }) => {
  const petsByStatus = {};

  for (const status of PET_STATUSES) {
    const response = await request.get('pet/findByStatus', {
      params: { status },
    });

    expect(response.status(), `status=${status} response`).toBe(200);

    const pets = await response.json();
    expect(Array.isArray(pets), `status=${status} response body`).toBe(true);
    expect(pets.every((pet) => pet.status === status), `status=${status} results`).toBe(true);
    petsByStatus[status] = pets;
  }

  expect(petsByStatus.sold).toEqual(expect.arrayContaining([
    expect.objectContaining({
      id: PET_ID,
      name: PET_NAME,
      status: 'sold',
    }),
  ]));
});