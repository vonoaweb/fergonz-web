import { Compass } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import { ButtonLink } from '@/components/Button';

export default function NotFound() {
  return (
    <div className="py-10">
      <EmptyState
        icon={Compass}
        title="Esta página no existe"
        description="El enlace que seguiste no lleva a ningún sitio. Puede que el libro se haya movido de estante."
        action={<ButtonLink href="/">Volver a descubrir</ButtonLink>}
      />
    </div>
  );
}
