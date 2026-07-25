/**
 * Envoltorio sobre la Barcode Detection API, que no está en lib.dom y sólo
 * existe en algunos navegadores (Chrome/Edge/Android). Cuando falta, la app
 * cae a la introducción manual del ISBN.
 */

export interface DetectedBarcode {
  rawValue: string;
  format: string;
}

interface BarcodeDetectorLike {
  detect(source: CanvasImageSource): Promise<DetectedBarcode[]>;
}

interface BarcodeDetectorConstructor {
  new (options?: { formats?: string[] }): BarcodeDetectorLike;
  getSupportedFormats?: () => Promise<string[]>;
}

/** Los ISBN modernos se imprimen como EAN-13; el resto son residuales. */
const BOOK_FORMATS = ['ean_13', 'ean_8', 'upc_a'];

function getConstructor(): BarcodeDetectorConstructor | null {
  if (typeof window === 'undefined') return null;
  const ctor = (window as unknown as Record<string, unknown>).BarcodeDetector;
  return typeof ctor === 'function' ? (ctor as BarcodeDetectorConstructor) : null;
}

export function isBarcodeDetectorSupported(): boolean {
  return getConstructor() !== null;
}

export async function createBarcodeDetector(): Promise<BarcodeDetectorLike | null> {
  const Ctor = getConstructor();
  if (!Ctor) return null;

  try {
    // Filtrar por formatos soportados evita un throw en navegadores que
    // implementan la API con un subconjunto distinto.
    const supported = (await Ctor.getSupportedFormats?.()) ?? BOOK_FORMATS;
    const formats = BOOK_FORMATS.filter((f) => supported.includes(f));
    return new Ctor(formats.length ? { formats } : undefined);
  } catch {
    return null;
  }
}

export function isCameraSupported(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    typeof navigator.mediaDevices?.getUserMedia === 'function'
  );
}
