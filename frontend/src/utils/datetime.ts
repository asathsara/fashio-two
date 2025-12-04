// Pad number with leading zero if single digit
export const padZero = (num: number): string => {
  return num.toString().padStart(2, '0');
};

// Format time with leading zeros (HH:MM) 
export const formatTime = (hours: number, minutes: number): string => {
  return `${padZero(hours)}:${padZero(minutes)}`;
};

export const formatDateTime = (value: string | Date) =>
  new Date(value).toLocaleString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

export const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

// Format date and time in user-friendly format
// Example: "Dec 25, 2025 at 05:30"
export const formatDisplayDateTime = (date: Date): string => {
  const dateStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const timeStr = formatTime(date.getHours(), date.getMinutes());
  return `${dateStr} at ${timeStr}`;
};

// Convert an ISO string into formatted "MMM dd, yyyy HH:mm"
export const formatISODateTime = (iso?: string | null): string | null => {
  if (!iso) return null;

  const date = new Date(iso);
  if (isNaN(date.getTime())) return null;

  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
