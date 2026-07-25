'use client';

import { useRef, useState } from 'react';
import { AlertTriangle, Download, RotateCcw, Upload } from 'lucide-react';
import Button from '@/components/Button';
import SectionHeader from '@/components/SectionHeader';
import ThemeToggle from '@/components/ThemeToggle';
import {
  backupFilename,
  parseBackup,
  serializeBackup,
} from '@/lib/backup';
import { useStore } from '@/lib/store';

type Feedback = { kind: 'ok' | 'error'; message: string } | null;

export default function SettingsPage() {
  const { state, dispatch } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [confirmingReset, setConfirmingReset] = useState(false);

  const counts = {
    libros: state.shelf.length,
    notas: state.notes.length,
    finales: state.endings.length,
    publicaciones: state.posts.length,
  };

  const exportData = () => {
    const blob = new Blob([serializeBackup(state)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    // Firefox exige que el enlace esté en el documento para poder pulsarlo.
    const link = document.createElement('a');
    link.href = url;
    link.download = backupFilename();
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Se libera con retraso: revocarlo en el mismo tick cancela la descarga.
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback({ kind: 'ok', message: 'Copia descargada.' });
  };

  const importData = async (file: File) => {
    setFeedback(null);
    const result = parseBackup(await file.text());

    if (!result.ok) {
      setFeedback({ kind: 'error', message: result.error });
      return;
    }

    dispatch({ type: 'importState', state: result.state });
    setFeedback({
      kind: 'ok',
      message: result.dropped
        ? `Copia restaurada. Se descartaron ${result.dropped} entradas ilegibles.`
        : 'Copia restaurada.',
    });
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <SectionHeader
        eyebrow="Ajustes"
        title="Tu cuenta y tus datos"
        description="Libroteca no tiene servidor: todo vive en este navegador. Descarga una copia si no quieres perderlo."
      />

      <section className="card space-y-4 p-5">
        <h2 className="font-display text-lg text-ink">Perfil</h2>

        <label className="block">
          <span className="eyebrow">Nombre con el que publicas</span>
          <input
            value={state.profile.name}
            onChange={(e) => dispatch({ type: 'setProfileName', name: e.target.value })}
            maxLength={24}
            className="field mt-2"
          />
        </label>

        <div className="flex items-center justify-between gap-4 border-t border-line/50 pt-4">
          <div>
            <p className="text-sm text-ink">Tema</p>
            <p className="mt-0.5 text-xs text-muted">
              Noche para leer de madrugada, papel para el resto.
            </p>
          </div>
          <ThemeToggle />
        </div>
      </section>

      <section className="card space-y-4 p-5">
        <div>
          <h2 className="font-display text-lg text-ink">Copia de seguridad</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {counts.libros} libros · {counts.notas} notas · {counts.finales} finales ·{' '}
            {counts.publicaciones} publicaciones
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button onClick={exportData}>
            <Download size={15} />
            Descargar copia
          </Button>

          <Button variant="ghost" onClick={() => fileRef.current?.click()}>
            <Upload size={15} />
            Restaurar copia
          </Button>

          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void importData(file);
              // Permite volver a elegir el mismo archivo después de un error.
              e.target.value = '';
            }}
          />
        </div>

        <p className="text-xs leading-relaxed text-faint">
          Restaurar reemplaza todo lo que tienes ahora. Descarga una copia antes si no
          estás seguro.
        </p>

        {feedback && (
          <p
            role="status"
            className={`rounded-xl border px-4 py-2.5 text-xs ${
              feedback.kind === 'ok'
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                : 'border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-300'
            }`}
          >
            {feedback.message}
          </p>
        )}
      </section>

      <section className="rounded-card border border-rose-500/25 bg-rose-500/[0.05] p-5">
        <h2 className="flex items-center gap-2 font-display text-lg text-ink">
          <AlertTriangle size={17} className="text-rose-500" />
          Empezar de cero
        </h2>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          Borra tu biblioteca, tus notas y tus finales, y vuelve al catálogo inicial.
        </p>

        {confirmingReset ? (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-sm text-ink">¿Seguro? Esto no se puede deshacer.</span>
            <button
              type="button"
              onClick={() => {
                dispatch({ type: 'reset' });
                setConfirmingReset(false);
                setFeedback({ kind: 'ok', message: 'Se restauró el estado inicial.' });
              }}
              className="rounded-pill bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:brightness-110"
            >
              Sí, borrar todo
            </button>
            <button
              type="button"
              onClick={() => setConfirmingReset(false)}
              className="text-sm text-muted transition hover:text-ink"
            >
              Cancelar
            </button>
          </div>
        ) : (
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => setConfirmingReset(true)}
          >
            <RotateCcw size={15} />
            Restablecer
          </Button>
        )}
      </section>
    </div>
  );
}
