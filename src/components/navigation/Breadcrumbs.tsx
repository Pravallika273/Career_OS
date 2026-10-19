import React from 'react';
import { RouteId } from '../../types/navigation';

export interface BreadcrumbItem {
  label: string;
  routeId?: RouteId;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigate?: (routeId: RouteId) => void;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigate,
  className = '',
}) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs text-[#667085] ${className}`}>
      <ol className="flex items-center space-x-1.5 truncate">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center space-x-1.5 truncate">
              {index > 0 && <span className="text-[#98A2B3] select-none">/</span>}
              {isLast ? (
                <span className="font-semibold text-[#101828] truncate" aria-current="page">
                  {item.label}
                </span>
              ) : item.routeId && onNavigate ? (
                <button
                  type="button"
                  onClick={() => onNavigate(item.routeId!)}
                  className="hover:text-[#101828] transition-colors truncate focus-visible:outline-none focus-visible:underline"
                >
                  {item.label}
                </button>
              ) : (
                <span className="truncate">{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
