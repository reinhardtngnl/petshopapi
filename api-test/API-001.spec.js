import { expect, test } from '@playwright/test';
import { PET_ID, PET_NAME } from './pet-shared-data.js';

test('API-001: creates a new pet', async ({ request }) => {
  const pet = {
    id: PET_ID,
    category: {
      id: 0,
      name: 'string',
    },
    name: PET_NAME,
    photoUrls: ['string'],
    tags: [
      {
        id: 0,
        name: 'string',
      },
    ],
    status: 'sold',
  };

  const createResponse = await request.post('pet', {
    data: pet,
  });

  expect(createResponse.status()).toBe(200);

  const createdPet = await createResponse.json();
  expect(createdPet).toEqual(expect.objectContaining({
    id: PET_ID,
    name: pet.name,
    status: pet.status,
  }));
});