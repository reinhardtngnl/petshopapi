# Petstore API Automation Test Report

**Report date:** 2026-10-14  
**Project:** Petstore API Automation  
**Framework:** Playwright Test 1.64.0  
**Target:** Swagger Petstore API (`/v2` by default)

## Executive summary

The project contains three API tests covering pet creation, status-based search, and deletion. The tests are configured as a dependency chain so that the pet is created before it is searched and deleted.

The latest recorded full dependency-chain run passed all three tests:

| Result | Count |
| --- | ---: |
| Passed | 3 |
| Failed | 0 |
| Duration | 5.7 seconds |

**Command:** `npx playwright test --project=api-003 --reporter=line`  
**Exit status:** 0

The latest Playwright `test-results/.last-run.json` also records `status: passed` and an empty `failedTests` list.

## Test coverage

| Test | Endpoint(s) | Coverage |
| --- | --- | --- |
| API-001 | `POST /pet` | Creates the configured pet with the shared ID and name, status `sold`; asserts HTTP 200 and checks returned ID, name, and status. |
| API-002 | `GET /pet/findByStatus?status=...` | Queries `available`, `pending`, and `sold`; checks HTTP 200, array responses, matching status values, and presence of the configured pet in `sold`. |
| API-003 | `GET /pet/{petId}`, `DELETE /pet/{petId}` | Confirms the configured pet exists and has the expected ID/name, sends the configured `api_key` header for deletion, and checks HTTP 200 and response code 200. |

## Execution order

Playwright projects are configured with dependencies:

```text
api-001 → api-002 → api-003
```

Selecting `api-002` runs API-001 first. Selecting `api-003` runs all three projects in order. This provides the prerequisite pet data for the later checks.

## Configuration

The tests load environment settings from `.env` using `dotenv/config`. The tracked `.env.example` provides the expected variable names:

- `PET_ID` — positive safe integer shared by all API tests.
- `PET_NAME` — shared pet name.
- `PETSTORE_API_BASE_URL` — API base URL; defaults to `https://petstore.swagger.io/v2` when unset.
- `PETSTOREAPIKEY` — sent by API-003 in the `api_key` request header.

The local `.env` is ignored by Git. Use an API key accepted by the target service; do not commit real credentials.

## How to reproduce

From the project root, install dependencies and run the complete flow:

```sh
npm ci
npx playwright test --project=api-003 --reporter=line
```

To list tests without issuing API requests:

```sh
npx playwright test --list
```

## Risks and limitations

- Tests use the public Petstore demo API by default. API-001 writes pet data and API-003 deletes it; the configured pet ID is fixed, so concurrent users or runs using that same ID may overwrite or delete each other's data.
- API-003 validates the delete response but does not perform a follow-up GET to verify that the pet is no longer available.
- The pass result records the behavior of the demo API at the time of the run; a public demo service may be unstable or shared with unrelated users.