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