import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function cleanMetaData(meta: any) {
  const cleanObj: Record<string, any> = {};
  if (!meta) return {};
  Object.keys(meta).forEach(key => {
    const isSystem = key.startsWith('_');
    const isEmpty = meta[key] === "" || (Array.isArray(meta[key]) && meta[key].length === 0);
    if (!isSystem && !isEmpty) {
      cleanObj[key] = meta[key];
    }
  });
  return cleanObj;
}