// utils/fileValidation.js
export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'application/msword', // doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // docx
];

export const MAX_SIZE_MB = 10;
export const MAX_TEXT_LENGTH = 300;

export function validateFile(file) {
  if (!file) return 'לא נבחר קובץ';

  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return 'סוג קובץ לא נתמך. יש להעלות PDF, תמונה או מסמך Word בלבד';
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return `הקובץ גדול מדי (מקסימום ${MAX_SIZE_MB}MB)`;
  }

  if (file.size === 0) {
    return 'הקובץ ריק';
  }

  return null; // אין שגיאה
}

// יוצר שם קובץ ייחודי ובטוח לאחסון, ללא תלות בשם המקורי שהמשתמש סיפק
export function generateSafeFileName(originalName) {
  const extension = originalName.includes('.')
    ? originalName.split('.').pop().replace(/[^a-zA-Z0-9]/g, '').slice(0, 10)
    : '';
  const uniqueId =
    crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return extension ? `${uniqueId}.${extension}` : uniqueId;
}