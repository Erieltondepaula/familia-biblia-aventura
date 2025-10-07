// Utility functions for date handling with local timezone

export const getLocalDateString = (): string => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getLocalDateForInput = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const dateFromInputString = (dateString: string): Date => {
  // dateString is in format "yyyy-mm-dd"
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const getTodayAtMidnight = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};
