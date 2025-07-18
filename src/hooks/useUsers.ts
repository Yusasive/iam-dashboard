import { useState, useEffect, useCallback } from 'react';
import { User, UserFilters, PaginatedResponse } from '../types/user';
import { mockApi, MockApiError } from '../services/mockApi';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<UserFilters>({
    search: '',
    status: 'all' as const,
  });

  const fetchUsers = useCallback(async (page: number = 1, newFilters?: UserFilters) => {
    setLoading(true);
    setError(null);

    try {
      const filtersToUse = newFilters || filters;
      const response: PaginatedResponse<User> = await mockApi.getUsers(
        page,
        pagination.limit,
        filtersToUse
      );

      setUsers(response.data);
      setPagination({
        page: response.page,
        limit: response.limit,
        total: response.total,
        totalPages: response.totalPages,
      });
    } catch (err) {
      if (err instanceof MockApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.limit]);

  const updateFilters = useCallback((newFilters: Partial<UserFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    fetchUsers(1, updatedFilters);
  }, [filters, fetchUsers]);

  const goToPage = useCallback((page: number) => {
    fetchUsers(page);
  }, [fetchUsers]);

  const refreshUsers = useCallback(() => {
    fetchUsers(pagination.page);
  }, [fetchUsers, pagination.page]);

  const updateUserInList = useCallback((updatedUser: User) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    goToPage,
    refreshUsers,
    updateUserInList,
  };
};