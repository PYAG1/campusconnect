export function dateToMonthDay(dateString: string): {
  month: string;
  day: number;
} {
  const date = new Date(dateString);
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();

  return { month, day };
}
