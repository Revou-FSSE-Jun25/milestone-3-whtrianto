// Utilitas format dan konversi harga ke Rupiah (IDR)

/**
 * Mengambil nilai kurs USD→IDR dari environment variable publik Next.js.
 * Gunakan NEXT_PUBLIC_USD_TO_IDR untuk override; fallback ke nilai default.
 */
export function getUsdToIdrRate() {
  const raw = process.env.NEXT_PUBLIC_USD_TO_IDR;
  const parsed = raw ? Number(raw) : NaN;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 15500; // default konservatif
}

/**
 * Mengonversi nilai dalam USD ke IDR (angka) berdasarkan kurs.
 */
export function convertUsdToIdr(amountUsd, rate = getUsdToIdrRate()) {
  if (!Number.isFinite(amountUsd)) return 0;
  return amountUsd * rate;
}

/**
 * Memformat angka IDR menjadi string mata uang lokal Indonesia.
 */
export function formatIdr(amountIdr) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amountIdr);
}

/**
 * Helper langsung dari USD ke string IDR terformat.
 */
export function formatPriceIdrFromUsd(amountUsd, rate = getUsdToIdrRate()) {
  return formatIdr(convertUsdToIdr(amountUsd, rate));
}

// Konversi sebaliknya: dari IDR ke USD (untuk penyimpanan internal)
export function convertIdrToUsd(amountIdr, rate = getUsdToIdrRate()) {
  if (!Number.isFinite(amountIdr) || !Number.isFinite(rate) || rate <= 0) return 0;
  return amountIdr / rate;
}

// Mengubah input IDR yang mungkin mengandung titik/koma menjadi angka murni
export function parseIdrToNumber(input) {
  if (typeof input === 'number') return input;
  if (typeof input !== 'string') return 0;
  const onlyDigits = input.replace(/[^0-9]/g, '');
  return Number(onlyDigits || '0');
}


