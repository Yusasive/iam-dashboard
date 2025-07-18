import { UserTable } from "./components/UserTable";
import { UserFilters } from "./components/UserFilters";
import { UserDetailPanel } from "./components/UserDetailPanel";
import { Pagination } from "./components/Pagination";
import { ErrorMessage } from "./components/ErrorMessage";
import { useUsers } from "./hooks/useUsers";
import { useUserDetail } from "./hooks/useUserDetail";
import {
  UsersIcon,
  ShieldCheckIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

function App() {
  const {
    users,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    goToPage,
    refreshUsers,
    updateUserInList,
  } = useUsers();

  const {
    selectedUser,
    loading: userDetailLoading,
    error: userDetailError,
    resetPasswordLoading,
    resetPasswordMessage,
    fetchUserDetail,
    resetPassword,
    updateUserStatus,
    closeUserDetail,
  } = useUserDetail();

  const handleUserClick = (user: any) => {
    fetchUserDetail(user.id);
  };

  const handleUpdateStatus = async (
    userId: string,
    status: "active" | "disabled"
  ) => {
    const updatedUser = await updateUserStatus(userId, status);
    updateUserInList(updatedUser);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23e2e8f0%22%20fill-opacity%3D%220.3%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        <div className="relative z-10">
          <div className="floating-header">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/25">
                    <ShieldCheckIcon className="h-8 w-8 text-white icon-glow" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold gradient-text">
                      Identity & Access Management
                    </h1>
                    <p className="text-slate-600 mt-1 font-medium">
                      Secure user management dashboard
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm">
                    <UsersIcon className="h-5 w-5 text-slate-500" />
                    <span className="text-sm font-semibold text-slate-700">
                      {pagination.total} Users
                    </span>
                  </div>
                  <button className="p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm hover:bg-white/80 transition-all duration-200">
                    <CogIcon className="h-5 w-5 text-slate-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
              <div className="glass-card rounded-2xl p-6 card-hover">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25">
                      <UsersIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Active Users
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {users.filter((u) => u.status === "active").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 card-hover">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/25">
                      <UsersIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Disabled Users
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {users.filter((u) => u.status === "disabled").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 card-hover">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <ShieldCheckIcon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                      Total Users
                    </p>
                    <p className="text-2xl font-bold text-slate-900">
                      {pagination.total}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="glass-card rounded-2xl p-6 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <UserFilters filters={filters} onFiltersChange={updateFilters} />
            </div>

            {error ? (
              <div
                className="glass-card rounded-2xl p-8 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <ErrorMessage message={error} onRetry={refreshUsers} />
              </div>
            ) : (
              <>
                <div
                  className="glass-card rounded-2xl overflow-hidden animate-fade-in-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  <UserTable
                    users={users}
                    loading={loading}
                    onUserClick={handleUserClick}
                  />
                </div>

                {!loading && users.length > 0 && (
                  <div
                    className="flex justify-center animate-fade-in-up"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <div className="glass-card rounded-2xl p-4">
                      <Pagination
                        currentPage={pagination.page}
                        totalPages={pagination.totalPages}
                        onPageChange={goToPage}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <UserDetailPanel
            user={selectedUser}
            loading={userDetailLoading}
            error={userDetailError}
            resetPasswordLoading={resetPasswordLoading}
            resetPasswordMessage={resetPasswordMessage}
            onClose={closeUserDetail}
            onResetPassword={resetPassword}
            onUpdateStatus={handleUpdateStatus}
          />
        </div>
      </div>
    </>
  );
}

export default App;
