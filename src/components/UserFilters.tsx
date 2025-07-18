import React from "react";
import { UserFilters as UserFiltersType } from "../types/user";
import { SearchInput } from "./SearchInput";
import { FunnelIcon } from "@heroicons/react/24/outline";

interface UserFiltersProps {
  filters: UserFiltersType;
  onFiltersChange: (filters: Partial<UserFiltersType>) => void;
  className?: string;
}

export const UserFilters: React.FC<UserFiltersProps> = ({
  filters,
  onFiltersChange,
  className = "",
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-lg shadow-sm">
          <FunnelIcon className="h-4 w-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">
          Search & Filter
        </h3>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <SearchInput
            value={filters.search}
            onChange={(search) => onFiltersChange({ search })}
            placeholder="Search by name or email..."
            className="search-glow"
          />
        </div>
        <div className="lg:w-64">
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) =>
                onFiltersChange({
                  status: e.target.value as "all" | "active" | "disabled",
                })
              }
              className="input-field appearance-none pr-10 font-semibold"
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="active">Active Users</option>
              <option value="disabled">Disabled Users</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
