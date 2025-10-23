import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getUserProfile } from '../src/utils/api'; // adjust path

// Mock Axios
jest.mock('axios');

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('getUserProfile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetches user profile with token from AsyncStorage', async () => {
    // Arrange: mock token and API response
    AsyncStorage.getItem.mockResolvedValue('mocked-token');
    axios.get.mockResolvedValue({ data: { id: 1, name: 'Santosh' } });

    // Act
    const result = await getUserProfile();

    // Assert
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
    expect(axios.get).toHaveBeenCalledWith('/user/profile');
    expect(result).toEqual({ id: 1, name: 'Santosh' });
  });

  test('fetches user profile without token', async () => {
    AsyncStorage.getItem.mockResolvedValue(null);
    axios.get.mockResolvedValue({ data: { id: 2, name: 'Juan' } });

    const result = await getUserProfile();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith('token');
    expect(axios.get).toHaveBeenCalledWith('/user/profile');
    expect(result).toEqual({ id: 2, name: 'Juan' });
  });
});
