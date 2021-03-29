export interface Publication {
  title: string;
  publisher: string;
  platform: string;
  print_issn: string | null;
  online_issn: string | null;
  period: string | null;
  isbn: string | null;
  yop: string | null;
  status: string | null;
  doi: string | null;
  proprietary_id: string | null;
  title_type: string | null;
  uri: string | null;
  access_type: string | null;
  metric_type: string | null;
  period_total: number;
}
