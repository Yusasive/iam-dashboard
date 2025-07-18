import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 ${className}`}
    >
      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-red-500/25">
        <ExclamationTriangleIcon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">
        Something went wrong
      </h3>
      <p className="text-slate-600 text-center mb-6 max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary"
          aria-label="Retry loading"
        >
          Try Again
        </button>
      )}
    </div>
  );
};
