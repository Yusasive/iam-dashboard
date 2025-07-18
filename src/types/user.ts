export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'disabled';
  lastLogin: string;
  createdAt: string;
  department: string;
  phone?: string;
  avatar?: string;
}

export interface UserFilters {
  search: string;
  status: 'all' | 'active' | 'disabled';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}