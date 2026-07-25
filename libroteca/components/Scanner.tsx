'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Loader2, ScanLine } from 'lucide-react';
import Button from './Button';
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

  // `navigator` no existe al prerenderizar, así que la detección de soporte
  // ocurre tras montar. `null` = todavía no lo sabemos.
  const [support, setSupport] = useState<{
    camera: boolean;
    detector: boolean;
  } | null>(null);

  useEffect(() => {
    setSupport({
      camera: isCameraSupported(),
      detector: isBarcodeDetectorSupported(),
    });
  }, []);

  const cameraAvailable = support?.camera ?? false;
  const detectorAvailable = support?.detector ?? false;

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
    <div className="space-y-5">
      <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line/60 bg-surface/70 shadow-card">
        <video
          ref={videoRef}
          playsInline
          muted
          className={`h-full w-full object-cover ${
            cameraState === 'running' ? '' : 'invisible'
          }`}
        />

        {cameraState === 'running' ? (
          <>
            {/* Marco de puntería con las cuatro esquinas recortadas. */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative h-32 w-4/5">
                {(
                  [
                    'left-0 top-0 border-l-2 border-t-2 rounded-tl-lg',
                    'right-0 top-0 border-r-2 border-t-2 rounded-tr-lg',
                    'left-0 bottom-0 border-l-2 border-b-2 rounded-bl-lg',
                    'right-0 bottom-0 border-r-2 border-b-2 rounded-br-lg',
                  ] as const
                ).map((corner) => (
                  <span
                    key={corner}
                    className={`absolute h-7 w-7 border-accent ${corner}`}
                  />
                ))}
                <span className="absolute inset-x-0 top-0 h-px animate-scan-line bg-accent shadow-[0_0_14px_3px_rgb(240_176_92/0.7)]" />
              </div>
            </div>

            <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-xs text-white/85 [text-shadow:0_1px_4px_rgb(0_0_0/0.8)]">
              Apunta al código de barras de la contraportada
            </p>

            <button
              type="button"
              onClick={stopCamera}
              aria-label="Apagar cámara"
              className="absolute right-3 top-3 rounded-pill border border-white/25 bg-black/50 p-2 text-white backdrop-blur transition hover:bg-black/70"
            >
              <CameraOff size={16} />
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line/60 bg-raised/60 text-accent">
              <ScanLine size={24} />
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {support && !support.camera
                ? 'Este navegador no da acceso a la cámara. Usa el ISBN manual.'
                : 'Escanea el código de barras y lo buscamos en Open Library.'}
            </p>

            {cameraAvailable && (
              <Button onClick={startCamera} disabled={cameraState === 'starting'}>
                {cameraState === 'starting' ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Camera size={16} />
                )}
                {cameraState === 'starting' ? 'Abriendo…' : 'Abrir cámara'}
              </Button>
            )}

            {!detectorAvailable && cameraAvailable && (
              <p className="text-2xs text-faint">
                Lectura automática no disponible aquí — funciona en Chrome y Edge.
              </p>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-2.5 text-xs leading-relaxed text-amber-700 dark:text-amber-200">
          {error}
        </p>
      )}

      <form onSubmit={submitManual}>
        <label htmlFor="isbn" className="eyebrow">
          O escribe el ISBN
        </label>
        <div className="mt-2 flex gap-2">
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
            className="field flex-1 font-mono tracking-wide"
          />
          <button
            type="submit"
            className="rounded-xl border border-line/70 bg-raised/70 px-5 text-sm font-medium text-ink transition hover:border-line hover:bg-raised"
          >
            Buscar
          </button>
        </div>
        {manualError && (
          <p className="mt-2 text-xs text-rose-600 dark:text-rose-300">{manualError}</p>
        )}
      </form>
    </div>
  );
}
