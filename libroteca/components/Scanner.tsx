'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Loader2, ScanLine } from 'lucide-react';
import {
  createBarcodeDetector,
  isBarcodeDetectorSupported,
  isCameraSupported,
} from '@/lib/barcode';
import { isValidIsbn, normalizeIsbn } from '@/lib/openlibrary';

type CameraState = 'idle' | 'starting' | 'running' | 'error';

interface Props {
  /** Se llama con un ISBN ya normalizado y validado. */
  onDetected: (isbn: string) => void;
  /** Silencia la cámara mientras se resuelve el ISBN anterior. */
  paused?: boolean;
}

export default function Scanner({ onDetected, paused = false }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const loopRef = useRef<number | null>(null);
  const lastHitRef = useRef<{ isbn: string; at: number } | null>(null);

  const [cameraState, setCameraState] = useState<CameraState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [manual, setManual] = useState('');
  const [manualError, setManualError] = useState<string | null>(null);

  const detectorAvailable = isBarcodeDetectorSupported();
  const cameraAvailable = isCameraSupported();

  const stopCamera = useCallback(() => {
    if (loopRef.current !== null) {
      window.clearInterval(loopRef.current);
      loopRef.current = null;
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraState('idle');
  }, []);

  // Un mismo código se lee muchas veces por segundo: sólo lo aceptamos una vez
  // cada 3 s para no disparar búsquedas repetidas.
  const handleHit = useCallback(
    (raw: string) => {
      const isbn = normalizeIsbn(raw);
      if (!isbn || !isValidIsbn(isbn)) return;

      const last = lastHitRef.current;
      if (last && last.isbn === isbn && Date.now() - last.at < 3000) return;

      lastHitRef.current = { isbn, at: Date.now() };
      onDetected(isbn);
    },
    [onDetected]
  );

  const startCamera = useCallback(async () => {
    setError(null);
    setCameraState('starting');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      });
      streamRef.current = stream;

      const video = videoRef.current;
      if (!video) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      video.srcObject = stream;
      await video.play();
      setCameraState('running');

      const detector = await createBarcodeDetector();
      if (!detector) {
        setError(
          'Tu navegador abre la cámara pero no sabe leer códigos de barras. Escribe el ISBN a mano.'
        );
        return;
      }

      loopRef.current = window.setInterval(async () => {
        const el = videoRef.current;
        if (!el || el.readyState < 2) return;
        try {
          const codes = await detector.detect(el);
          if (codes.length) handleHit(codes[0].rawValue);
        } catch {
          // Un frame ilegible no es un fallo: el siguiente intento lo resuelve.
        }
      }, 400);
    } catch (err) {
      setCameraState('error');
      const name = err instanceof DOMException ? err.name : '';
      setError(
        name === 'NotAllowedError'
          ? 'No diste permiso de cámara. Puedes escribir el ISBN a mano.'
          : name === 'NotFoundError'
            ? 'No se encontró ninguna cámara en este dispositivo.'
            : 'No se pudo abrir la cámara. Escribe el ISBN a mano.'
      );
    }
  }, [handleHit]);

  useEffect(() => stopCamera, [stopCamera]);

  // Mientras se resuelve un ISBN detenemos el bucle, no la cámara: reabrirla
  // pediría permiso otra vez en algunos navegadores.
  useEffect(() => {
    if (!paused || loopRef.current === null) return;
    window.clearInterval(loopRef.current);
    loopRef.current = null;
  }, [paused]);

  const submitManual = (event: React.FormEvent) => {
    event.preventDefault();
    const isbn = normalizeIsbn(manual);

    if (!isbn) {
      setManualError('Un ISBN tiene 10 o 13 dígitos.');
      return;
    }
    if (!isValidIsbn(isbn)) {
      setManualError('El dígito de control no cuadra. ¿Falta algún número?');
      return;
    }

    setManualError(null);
    setManual('');
    onDetected(isbn);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
        <video
          ref={videoRef}
          playsInline
          muted
          className={`h-full w-full object-cover ${
            cameraState === 'running' ? '' : 'invisible'
          }`}
        />

        {cameraState === 'running' && (
          <>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative h-28 w-4/5 overflow-hidden rounded-lg border-2 border-ember-400/70">
                <div className="absolute inset-x-0 h-0.5 animate-scan-line bg-ember-400 shadow-[0_0_12px_2px_rgba(244,184,96,0.7)]" />
              </div>
            </div>
            <p className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-xs text-paper-50/80">
              Apunta al código de barras de la contraportada
            </p>
            <button
              type="button"
              onClick={stopCamera}
              className="absolute right-3 top-3 rounded-full bg-black/50 p-2 text-paper-50 ring-1 ring-white/20 backdrop-blur transition hover:bg-black/70"
              aria-label="Apagar cámara"
            >
              <CameraOff size={16} />
            </button>
          </>
        )}

        {cameraState !== 'running' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <ScanLine size={34} className="text-paper-100/25" />
            <p className="max-w-xs text-sm text-paper-100/55">
              {cameraAvailable
                ? 'Escanea el código de barras y lo buscamos en Open Library.'
                : 'Este navegador no da acceso a la cámara. Usa el ISBN manual.'}
            </p>

            {cameraAvailable && (
              <button
                type="button"
                onClick={startCamera}
                disabled={cameraState === 'starting'}
                className="flex items-center gap-2 rounded-full bg-ember-500 px-5 py-2.5 text-sm font-medium text-ink-950 transition hover:bg-ember-400 disabled:opacity-60"
              >
                {cameraState === 'starting' ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Camera size={16} />
                )}
                {cameraState === 'starting' ? 'Abriendo…' : 'Abrir cámara'}
              </button>
            )}

            {!detectorAvailable && cameraAvailable && (
              <p className="text-xs text-paper-100/40">
                Lectura automática no disponible aquí — funciona en Chrome y Edge.
              </p>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="rounded-lg border border-amber-400/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
          {error}
        </p>
      )}

      <form onSubmit={submitManual} className="space-y-2">
        <label htmlFor="isbn" className="block text-xs font-medium text-paper-100/60">
          O escribe el ISBN
        </label>
        <div className="flex gap-2">
          <input
            id="isbn"
            value={manual}
            onChange={(event) => {
              setManual(event.target.value);
              setManualError(null);
            }}
            inputMode="numeric"
            autoComplete="off"
            placeholder="978-84-663-2452-6"
            className="flex-1 rounded-lg border border-white/10 bg-ink-900 px-3 py-2.5 text-sm text-paper-50 placeholder:text-paper-100/25 focus:border-ember-400/50 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-paper-50 transition hover:bg-white/15"
          >
            Buscar
          </button>
        </div>
        {manualError && <p className="text-xs text-rose-300">{manualError}</p>}
      </form>
    </div>
  );
}
