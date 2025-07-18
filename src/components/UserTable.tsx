import React from "react";
import { User } from "../types/user";
import { StatusBadge } from "./StatusBadge";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

interface UserTableProps {
  users: User[];
  loading: boolean;
  onUserClick: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  onUserClick,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4 p-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full loading-shimmer"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded loading-shimmer w-1/4"></div>
                <div className="h-3 bg-slate-200 rounded loading-shimmer w-1/3"></div>
              </div>
              <div className="h-6 bg-slate-200 rounded-full loading-shimmer w-16"></div>
              <div className="h-4 bg-slate-200 rounded loading-shimmer w-24"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full" role="table">
          <thead>
            <tr className="border-b border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-blue-50/30">
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                Role & Department
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                Last Login
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl">👥</span>
                    </div>
                    <p className="text-slate-500 font-medium">No users found</p>
                    <p className="text-slate-400 text-sm mt-1">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  onClick={() => onUserClick(user)}
                  className="table-row-hover group"
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${user.name}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onUserClick(user);
                    }
                  }}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-xl group-hover:shadow-blue-500/30 transition-all duration-300">
                          <span className="text-sm font-bold text-white">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                          {user.name}
                        </div>
                        <div className="text-sm text-slate-500 font-medium">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {user.role}
                      </div>
                      <div className="text-sm text-slate-500">
                        {user.department}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 font-medium">
                      {formatDate(user.lastLogin)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ChevronRightIcon className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors duration-200" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
