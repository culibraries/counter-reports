export interface Publication {
  title: string;
  publisher: string;
  platform: string;
  print_issn: string | null;
  online_issn: string | null;
  period: string | null;
  requests: number;
}
