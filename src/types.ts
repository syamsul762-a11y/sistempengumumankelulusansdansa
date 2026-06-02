export interface Student {
  no: number;
  nama: string;
  nis: string;
  nisn: string;
  keterangan: 'LULUS' | 'TIDAK LULUS';
  ucapan: string;
  linkSkl?: string;
}

export interface SchoolConfig {
  name: string;
  type: 'SD' | 'SMP' | 'SMA' | 'SMK';
  website: string;
  email: string;
  address: string;
  headmasterName: string;
  headmasterNip: string;
  announcementDate: string;
  countdownTarget: string; // ISO string target for countdown, e.g., 2026-06-02T08:00:00
  academicYear: string;
  skuNo: string; // SKU/SKL Nomor Surat format
  logoUrl?: string; // Base64 data URL or absolute URL of uploaded school logo
}

export interface WishEntry {
  id: string;
  name: string;
  role: 'Siswa' | 'Orang Tua' | 'Guru' | 'Alumni';
  message: string;
  timestamp: string;
}
