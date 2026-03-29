import { ReactNode } from 'react';
import clsx from 'clsx';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={clsx('flex flex-col items-center justify-center text-center py-14 px-6', className)}>
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
          {icon}
        </div>
      )}
      <p className="text-base font-bold text-gray-700 mb-1">{title}</p>
      {description && <p className="text-sm text-gray-400 max-w-xs">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}