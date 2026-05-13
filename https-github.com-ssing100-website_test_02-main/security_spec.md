# Security Specification - Car Registry

## Data Invariants
1. A car record must have a non-empty make and model.
2. The year must be a realistic value (e.g., between 1886 and 2100).
3. The price must be a non-negative integer.
4. Timestamps (createdAt, updatedAt) must be server-generated.

## The "Dirty Dozen" Payloads (Denial Tests)
1. **Unauthenticated Write**: Attempt to create a car without being signed in.
2. **Invalid ID**: Attempt to use an ID with special characters (e.g., "car/123").
3. **Missing Required Field**: Attempt to create a car without 'make'.
4. **Negative Price**: Attempt to set price to -500.
5. **Future Year**: Attempt to set year to 3000.
6. **Past Year**: Attempt to set year to 1700.
7. **Client Timestamp**: Attempt to set 'createdAt' manually via client.
8. **Shadow Field**: Attempt to add a 'verified: true' field to a record.
9. **Update Immutable**: Attempt to change 'createdAt' after creation.
10. **Resource Exhaustion**: Attempt to send a 1MB string as the car model.
11. **Type Mismatch**: Attempt to send price as a string "10000".
12. **Unauthorized Delete**: Attempt to delete a car as a non-admin. (Assuming admin-restricted for management).

## Test Runner
A test suite will be created to verify these invariants using the Firebase Emulator suite patterns (conceptual for this environment).
