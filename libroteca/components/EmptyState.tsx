import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({ icon: Icon, title, description, action }: Props) {
  return (
    <div className="rounded-2xl border border-dashed border-white/12 bg-ink-900/40 px-6 py-12 text-center">
      <Icon size={30} className="mx-auto text-paper-100/25" />
      <h3 className="mt-3 font-serif text-lg text-paper-50">{title}</h3>
      <p className="mx-auto mt-1.5 max-w-sm text-sm text-paper-100/50">{description}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
