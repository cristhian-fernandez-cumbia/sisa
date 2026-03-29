import clsx from 'clsx';

interface DividerProps {
  label?: string;
  className?: string;
  dashed?: boolean;
}

export default function Divider({ label, className, dashed = false }: DividerProps) {
  if (label) {
    return (
      <div className={clsx('flex items-center gap-3', className)}>
        <div className={clsx('flex-1 border-t border-gray-100', dashed && 'border-dashed')} />
        <span className="text-xs text-gray-400 font-medium">{label}</span>
        <div className={clsx('flex-1 border-t border-gray-100', dashed && 'border-dashed')} />
      </div>
    );
  }
  return (
    <hr
      className={clsx(
        'border-0 border-t border-gray-100',
        dashed && 'border-dashed',
        className,
      )}
    />
  );
}