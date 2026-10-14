# Petstore API Automation

Playwright API tests for the Swagger Petstore demo API. The tests use the API base URL configured in `.env` and share the pet ID/name defined there.
Use the a `.env.example` file in the project root. And rename it to .env 

## Requirements

- Node.js (Node 20 or newer recommended)
- npm

## Setup

From the project root, install the locked dependencies:

```sh
npm ci
```

## Run tests

Run the complete sequence:

```sh
npx playwright test
```

Run a specific project:

```sh
npx playwright test --project=api-001
npx playwright test --project=api-002
npx playwright test --project=api-003
```

*Projects are configured with dependencies*, so API-002 runs API-001 first, and API-003 runs API-001, API-002, then API-003. Use `--reporter=line` for compact console output:

```sh
npx playwright test --project=api-003 --reporter=line
```

To list discovered tests without sending API requests:

```sh
npx playwright test --list
```

## Test flow

| Test | Behavior |
| --- | --- |
| API-001 | Creates or updates the configured pet with status `sold` and checks the response. |
| API-002 | Queries `available`, `pending`, and `sold`; checks the response arrays and verifies the configured pet appears as `sold`. |
| API-003 | Confirms the configured pet exists, deletes it using `PETSTOREAPIKEY`, and checks the delete response. |

## Important notes

- These tests use the public Petstore demo by default. API-001 writes pet data and API-003 deletes it; API-002 reads shared demo data. Running the full sequence changes data on that service.
- The configured pet ID is fixed. If the same ID is used by other users or test runs, they may overwrite or delete one another's pet. Choose an ID/name appropriate for your test environment.
- API-003 requires `PETSTOREAPIKEY` to be set in `.env` or in the environment running Playwright. Missing values fail before the delete request is sent.
- Playwright output and test artifacts are written to `test-results/`, which is ignored by Git.

## Troubleshooting

- **`PET_ID must be a positive safe integer`**: Check that `.env` contains a numeric positive integer for `PET_ID`.
- **`PET_NAME must be set`**: Check that `PET_NAME` exists and is not blank.
- **API-003 says to set `PETSTOREAPIKEY`**: Add that variable to the root `.env`, or set it in the shell before running Playwright.
- **404 from the API**: Check `PETSTORE_API_BASE_URL`. It should include `/v2` for the default Petstore API. The Playwright config normalizes trailing slashes.
- **API-002 or API-003 cannot find the configured pet**: Run the relevant project with its dependencies enabled (the commands above do so), and check that the API service accepted API-001's create request.
