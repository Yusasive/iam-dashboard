import { useState, useCallback } from 'react';
import { User } from '../types/user';
import { mockApi, MockApiError } from '../services/mockApi';

export const useUserDetail = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);
  const [resetPasswordMessage, setResetPasswordMessage] = useState<string | null>(null);

  const fetchUserDetail = useCallback(async (userId: string) => {
    setLoading(true);
    setError(null);
    setResetPasswordMessage(null);

    try {
      const user = await mockApi.getUserById(userId);
      setSelectedUser(user);
    } catch (err) {
      if (err instanceof MockApiError) {
        setError(err.message);
      } else {
        setError('Failed to fetch user details');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (userId: string) => {
    setResetPasswordLoading(true);
    setResetPasswordMessage(null);

    try {
      const result = await mockApi.resetPassword(userId);
      setResetPasswordMessage(result.message);
    } catch (err) {
      if (err instanceof MockApiError) {
        setResetPasswordMessage(`Error: ${err.message}`);
      } else {
        setResetPasswordMessage('Error: Failed to reset password');
      }
    } finally {
      setResetPasswordLoading(false);
    }
  }, []);

  const updateUserStatus = useCallback(async (userId: string, status: 'active' | 'disabled') => {
    try {
      const updatedUser = await mockApi.updateUserStatus(userId, status);
      setSelectedUser(updatedUser);
      return updatedUser;
    } catch (err) {
      if (err instanceof MockApiError) {
        throw new Error(err.message);
      } else {
        throw new Error('Failed to update user status');
      }
    }
  }, []);

  const closeUserDetail = useCallback(() => {
    setSelectedUser(null);
    setError(null);
    setResetPasswordMessage(null);
  }, []);

  return {
    selectedUser,
    loading,
    error,
    resetPasswordLoading,
    resetPasswordMessage,
    fetchUserDetail,
    resetPassword,
    updateUserStatus,
    closeUserDetail,
  };
};