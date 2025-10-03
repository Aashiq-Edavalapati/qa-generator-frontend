import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// 🎯 CHANGED: Remapped progress to the full 5-step QA generation pipeline.
export const statusToProgress = (status) => {
  if (!status) return 0;
  if (status.startsWith('1/5')) return 20;
  if (status.startsWith('2/5')) return 40;
  if (status.startsWith('3/5')) return 60;
  if (status.startsWith('4/5')) return 80;
  if (status.startsWith('5/5') || status === 'SUCCESS') return 100;
  return 0;
};

// 🎯 CHANGED: Maps the backend status string to a visual step number.
export const statusToStep = (status) => {
  if (!status) return 0;
  if (status === 'PENDING') return 1;
  if (status.startsWith('1/5')) return 1;
  if (status.startsWith('2/5')) return 2;
  if (status.startsWith('3/5')) return 3;
  if (status.startsWith('4/5')) return 4;
  if (status.startsWith('5/5') || status === 'SUCCESS') return 5;
  return 0; // Default for FAILURE
}