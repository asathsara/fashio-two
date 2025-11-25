export const formatDateTime = (value: string | Date) =>
  new Date(value).toLocaleString('en-LK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });


export const formatDate = (value: string) =>
  new Date(value).toLocaleDateString('en-LK', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });


//   Format time with leading zeros (HH:MM) 
export const formatTime = (hours: number, minutes: number): string => {
  const h = hours.toString().padStart(2, '0');
  const m = minutes.toString().padStart(2, '0');
  return `${h}:${m}`;
};

//  Format date and time 
//  Example: "Dec 25, 2025 at 05:30"
export const formatDisplayDateTime = (date: Date): string => {
  const dateStr = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const timeStr = formatTime(date.getHours(), date.getMinutes());
  return `${dateStr} at ${timeStr}`;
};


// Pad number with leading zero if single digit
export const padZero = (num: number): string => {
  return num.toString().padStart(2, '0');
};