import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const scrollToSection = (sectionId: string) => {
  if (window.innerWidth < 1024) {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
    }, 100);
  }
}; 

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
