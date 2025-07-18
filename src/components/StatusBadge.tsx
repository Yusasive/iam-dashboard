import React from "react";
import clsx from "clsx";

interface StatusBadgeProps {
  status: "active" | "disabled";
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = "",
}) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm",
        {
          "status-badge-active": status === "active",
          "status-badge-disabled": status === "disabled",
        },
        className
      )}
      aria-label={`User status: ${status}`}
    >
      <span
        className={clsx("w-2 h-2 rounded-full mr-2 shadow-sm", {
          "bg-emerald-500 shadow-emerald-500/50": status === "active",
          "bg-red-500 shadow-red-500/50": status === "disabled",
        })}
        aria-hidden="true"
      />
      {status === "active" ? "Active" : "Disabled"}
    </span>
  );
};
