export interface Publication {
  publisher_id: number;
  title: string;
  print_issn?: string;
  online_issn?: string;
  journal_doi?: string;
  proprietary_id?: string;
  is_active: number;
}
