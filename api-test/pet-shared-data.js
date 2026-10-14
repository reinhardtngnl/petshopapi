const petId = Number(process.env.PET_ID);
const petName = process.env.PET_NAME?.trim();

if (!Number.isSafeInteger(petId) || petId <= 0) {
  throw new Error('PET_ID must be a positive safe integer in the .env file.');
}

if (!petName) {
  throw new Error('PET_NAME must be set in the .env file.');
}

export const PET_ID = petId;
export const PET_NAME = petName;