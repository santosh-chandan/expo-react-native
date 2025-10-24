
// What This Test Covers
  // Ensures your function:
  // Retrieves token from AsyncStorage correctly
  // Makes API call to /user/profile
  // Returns expected data from Axios response
  // Works both with and without token present


// Import AsyncStorage — used for storing/retrieving data locally on device
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Axios — our HTTP client used in the API utility
import axios from 'axios';

// Import the actual function we're testing (from your app's utils/api.js)
import { getUserProfile } from '../src/utils/api'; // adjust path if needed


// -------------------------
// MOCK SETUP SECTION
// -------------------------

// Mock Axios so that no real network requests are made
// Jest replaces all axios functions (get, post, etc.) with mock versions.
// Stops real HTTP calls. Instead, axios.get becomes a Jest mock function you can control.
jest.mock('axios');

// Mock AsyncStorage so that we don't read/write to real device storage
// We define fake versions (jest.fn()) for getItem, setItem, removeItem.
// Fakes AsyncStorage methods so you can simulate tokens being present or missing.
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),   // Mock for AsyncStorage.getItem
  setItem: jest.fn(),   // Mock for AsyncStorage.setItem
  removeItem: jest.fn() // Mock for AsyncStorage.removeItem
}));


// -------------------------
// TEST SUITE SECTION
// -------------------------

// Group all related tests for getUserProfile inside a describe block
// Groups multiple test cases under a single “suite.”
describe('getUserProfile', () => {

  // After each test, clear all mocks to reset their usage data
  // (So one test’s mock calls don’t interfere with another’s)
  // Resets mocks so they don’t affect the next test.
  afterEach(() => {
    jest.clearAllMocks();
  });

  // -------------------------
  // TEST #1
  // -------------------------
  // Defines one specific test case — a small, isolated scenario to validate.
  test('fetches user profile with token from AsyncStorage', async () => {
    // Arrange
    // Mock AsyncStorage to simulate having a saved token
    // mockResolvedValue => Makes async functions (like getItem or axios.get) return specific data as if the real call succeeded.
    AsyncStorage.getItem.mockResolvedValue('mocked-token');

    // Mock Axios GET call to simulate a backend API response
    axios.get.mockResolvedValue({ data: { id: 1, name: 'Santosh' } });

    // Act
    // Call the function we're testing
    const result = await getUserProfile();

    // Assert
    // Verify that AsyncStorage was checked for the token
    // expect => Assertion — verifies actual behavior vs expected.
    // toHaveBeenCalledWith => Ensures functions were called with correct arguments.
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');

    // Verify that axios GET was called with the correct endpoint
    expect(axios.get).toHaveBeenCalledWith('/user/profile');

    // Verify that the result returned from our function is what we expect
    // Assertion — verifies actual behavior vs expected.
    // toEqual =>  Checks that output matches the expected object or value.
    expect(result).toEqual({ id: 1, name: 'Santosh' });
  });

  // -------------------------
  // TEST #2
  // -------------------------
  test('fetches user profile without token', async () => {
    // Arrange
    // Simulate missing token in AsyncStorage
    AsyncStorage.getItem.mockResolvedValue(null);

    // Mock Axios GET response
    axios.get.mockResolvedValue({ data: { id: 2, name: 'Juan' } });

    // Act
    // Call the function being tested
    const result = await getUserProfile();

    // Assert
    // Verify AsyncStorage was queried for 'token'
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');

    // Ensure axios GET was called with correct endpoint
    expect(axios.get).toHaveBeenCalledWith('/user/profile');

    // Confirm that the function returned the correct data
    expect(result).toEqual({ id: 2, name: 'Juan' });
  });
});
