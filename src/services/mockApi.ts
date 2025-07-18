import { User, UserFilters, PaginatedResponse } from '../types/user';
import { mockUsers } from '../data/mockUsers';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate random errors (10% chance)
const shouldSimulateError = () => Math.random() < 0.1;

export class MockApiError extends Error {
  constructor(message: string, public status: number = 500) {
    super(message);
    this.name = 'MockApiError';
  }
}

export const mockApi = {
  async getUsers(
    page: number = 1,
    limit: number = 10,
    filters: UserFilters = { search: '', status: 'all' }
  ): Promise<PaginatedResponse<User>> {
    // Simulate network delay
    await delay(Math.random() * 300 + 300); // 300-600ms

    // Simulate random errors
    if (shouldSimulateError()) {
      throw new MockApiError('Failed to fetch users. Please try again.', 500);
    }

    // Filter users based on search and status
    let filteredUsers = mockUsers;

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(user =>
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }

    if (filters.status !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.status === filters.status);
    }

    // Paginate results
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      data: paginatedUsers,
      total: filteredUsers.length,
      page,
      limit,
      totalPages: Math.ceil(filteredUsers.length / limit),
    };
  },

  async getUserById(id: string): Promise<User> {
    await delay(Math.random() * 200 + 200); 

    if (shouldSimulateError()) {
      throw new MockApiError('Failed to fetch user details. Please try again.', 500);
    }

    const user = mockUsers.find(u => u.id === id);
    if (!user) {
      throw new MockApiError('User not found', 404);
    }

    return user;
  },

  async resetPassword(userId: string): Promise<{ success: boolean; message: string }> {
    await delay(Math.random() * 500 + 500);  

    if (shouldSimulateError()) {
      throw new MockApiError('Failed to reset password. Please try again.', 500);
    }

    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      throw new MockApiError('User not found', 404);
    }

    return {
      success: true,
      message: `Password reset email sent to ${user.email}`,
    };
  },

  async updateUserStatus(userId: string, status: 'active' | 'disabled'): Promise<User> {
    await delay(Math.random() * 300 + 200); 

    if (shouldSimulateError()) {
      throw new MockApiError('Failed to update user status. Please try again.', 500);
    }

    const userIndex = mockUsers.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      throw new MockApiError('User not found', 404);
    }

    mockUsers[userIndex] = { ...mockUsers[userIndex], status };
    return mockUsers[userIndex];
  },
};