import { getWeekDates } from "../interface";

export function calculateWeekDates(date: Date) : getWeekDates {  
  console.log(date)
  const startDate = new Date(date);
  startDate.setDate(date.getDate() - (date.getDay()) + 1);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  return { startDate, endDate };
}
  
