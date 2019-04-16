export interface MonthData {
  month: string;
  total: number;
}
export interface Result {
  title: string;
  publisher: string;
  platform: string;
  printISSN?: string;
  onlineISSN?: string;
  monthTotals: MonthData[];
  total: number;
}
