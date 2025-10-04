import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// 🎯 CHANGED: Maps the backend status string to a visual step number.
export const statusToStep = (status) => {
  if (!status) return 0;
  if (status === 'PENDING') return 1;
  if (status.startsWith('1/')) return 1;
  if (status.startsWith('2/')) return 2;
  if (status.startsWith('3/')) return 3;
  if (status.startsWith('4/5')) return 4;
  if (status.startsWith('5/5') || status === 'SUCCESS') return 5;
  return 0; // Default for FAILURE
}