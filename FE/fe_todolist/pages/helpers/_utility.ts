import { getWeekDates } from "../interface";

export function calculateWeekDates(date: Date) : getWeekDates {  
  const startDate = new Date(date);
  startDate.setDate(date.getDate() - (date.getDay() || 7) + 1);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 5);

  return { startDate, endDate };
}
  
