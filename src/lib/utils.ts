import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function createDateArray(startDate: Date, endDate: Date): Date[] {
  // Initialize an empty array to store the dates
  const dateArray: Date[] = [];

  // Loop through each day between the start and end dates
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    // Add the current date to the array
    dateArray.push(new Date(currentDate));
    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}
export function formatDate(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const dayOfWeek = date.toLocaleString('default', { weekday: 'short' });
  return `${day} ${month} - ${dayOfWeek}`;
}
export function checkFriday(date: Date): boolean {
  // Check if the day of the week is Friday (5)
  return date.getDay() === 5;
}
