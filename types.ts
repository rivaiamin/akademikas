
export interface Student {
  id: number;
  name: string;
  nim: string;
  type: string;
  amount: string;
  date: string;
  status: 'Lunas' | 'Belum Lunas' | 'Jatuh Tempo';
  color: string;
  img?: string;
}

export interface JournalEntry {
  date: string;
  ref: string;
  desc: string;
  source: 'Sistem' | 'Manual';
  amount: string;
  status: string;
}

export interface JournalRow {
  id: string;
  account: string;
  description: string;
  debit: number;
  credit: number;
}
