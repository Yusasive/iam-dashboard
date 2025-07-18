import React, { useEffect, useState } from "react";
import {
  XMarkIcon,
  KeyIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { User } from "../types/user";
import { StatusBadge } from "./StatusBadge";
import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";

interface UserDetailPanelProps {
  user: User | null;
  loading: boolean;
  error: string | null;
  resetPasswordLoading: boolean;
  resetPasswordMessage: string | null;
  onClose: () => void;
  onResetPassword: (userId: string) => void;
  onUpdateStatus: (
    userId: string,
    status: "active" | "disabled"
  ) => Promise<void>;
}

export const UserDetailPanel: React.FC<UserDetailPanelProps> = ({
  user,
  loading,
  error,
  resetPasswordLoading,
  resetPasswordMessage,
  onClose,
  onResetPassword,
  onUpdateStatus,
}) => {
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState<string | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (user) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [user, onClose]);

  const handleStatusToggle = async () => {
    if (!user) return;

    setStatusLoading(true);
    setStatusError(null);

    try {
      const newStatus = user.status === "active" ? "disabled" : "active";
      await onUpdateStatus(user.id, newStatus);
    } catch (err) {
      setStatusError(
        err instanceof Error ? err.message : "Failed to update status"
      );
    } finally {
      setStatusLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="fixed inset-y-0 right-0 max-w-lg w-full glass-panel z-50 animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-detail-title"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <UserIcon className="h-5 w-5 text-white" />
              </div>
              <h2
                id="user-detail-title"
                className="text-xl font-bold text-slate-900"
              >
                User Profile
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
              aria-label="Close panel"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <LoadingSpinner size="lg" />
              </div>
            ) : error ? (
              <div className="p-6">
                <ErrorMessage message={error} />
              </div>
            ) : (
              <div className="p-6 space-y-8">
                {/* User Avatar and Basic Info */}
                <div className="text-center">
                  <div className="mx-auto h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center mb-4 shadow-xl shadow-blue-500/25">
                    <span className="text-2xl font-bold text-white">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    {user.name}
                  </h3>
                  <p className="text-slate-600 font-semibold mb-3">
                    {user.role}
                  </p>
                  <StatusBadge status={user.status} className="text-sm" />
                </div>

                {/* Contact Information */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-6 border border-slate-200/50">
                  <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                    <EnvelopeIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Contact Information
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-white/60 rounded-xl border border-white/50">
                      <EnvelopeIcon className="h-5 w-5 text-slate-400 mr-3" />
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Email
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    {user.phone && (
                      <div className="flex items-center p-3 bg-white/60 rounded-xl border border-white/50">
                        <PhoneIcon className="h-5 w-5 text-slate-400 mr-3" />
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Phone
                          </p>
                          <p className="text-sm font-semibold text-slate-900">
                            {user.phone}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center p-3 bg-white/60 rounded-xl border border-white/50">
                      <BuildingOfficeIcon className="h-5 w-5 text-slate-400 mr-3" />
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Department
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                          {user.department}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Information */}
                <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-6 border border-slate-200/50">
                  <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                    <ClockIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Account Details
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 bg-white/60 rounded-xl border border-white/50">
                      <ClockIcon className="h-5 w-5 text-slate-400 mr-3" />
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Last Login
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                          {formatDate(user.lastLogin)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-white/60 rounded-xl border border-white/50">
                      <CalendarIcon className="h-5 w-5 text-slate-400 mr-3" />
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                          Account Created
                        </p>
                        <p className="text-sm font-semibold text-slate-900">
                          {formatDate(user.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-6">
                  <h4 className="text-lg font-bold text-slate-900 flex items-center">
                    <KeyIcon className="h-5 w-5 mr-2 text-blue-600" />
                    Quick Actions
                  </h4>

                  {/* Reset Password */}
                  <div className="space-y-3">
                    <button
                      onClick={() => onResetPassword(user.id)}
                      disabled={resetPasswordLoading}
                      className="btn-secondary w-full flex items-center justify-center"
                    >
                      {resetPasswordLoading ? (
                        <LoadingSpinner size="sm" className="mr-2" />
                      ) : (
                        <KeyIcon className="h-5 w-5 mr-2" />
                      )}
                      Reset Password
                    </button>
                    {resetPasswordMessage && (
                      <div
                        className={`p-3 rounded-xl text-sm font-semibold ${
                          resetPasswordMessage.startsWith("Error:")
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {resetPasswordMessage}
                      </div>
                    )}
                  </div>

                  {/* Toggle Status */}
                  <div className="space-y-3">
                    <button
                      onClick={handleStatusToggle}
                      disabled={statusLoading}
                      className={
                        user.status === "active"
                          ? "btn-danger w-full flex items-center justify-center"
                          : "btn-success w-full flex items-center justify-center"
                      }
                    >
                      {statusLoading ? (
                        <LoadingSpinner size="sm" className="mr-2" />
                      ) : (
                        <UserIcon className="h-5 w-5 mr-2" />
                      )}
                      {user.status === "active"
                        ? "Disable User"
                        : "Enable User"}
                    </button>
                    {statusError && (
                      <div className="p-3 rounded-xl text-sm font-semibold bg-red-50 text-red-700 border border-red-200">
                        {statusError}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
