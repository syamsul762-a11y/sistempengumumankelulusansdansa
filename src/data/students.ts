import { Student, SchoolConfig } from '../types';

export const students: Student[] = [
  {
    no: 1,
    nama: "ADITYA NAUFAL DARY ABIYYU",
    nis: "4719",
    nisn: "0147742054",
    keterangan: "LULUS",
    ucapan: "Mission Accomplished! Selamat statusnya sudah berubah jadi alumni."
  },
  {
    no: 2,
    nama: "AFIKA INAIRA AZZAHRA",
    nis: "4721",
    nisn: "0132745795",
    keterangan: "LULUS",
    ucapan: "Congrats! Layar HP-mu hari ini bikin senyum-senyum sendiri, kan?"
  },
  {
    no: 3,
    nama: "ALEXA QUEENFAYA AUFANDA",
    nis: "4723",
    nisn: "0136084421",
    keterangan: "LULUS",
    ucapan: "Fix, kamu lulus! Jangan lupa syukuran dan traktir teman-teman, ya!"
  },
  {
    no: 4,
    nama: "AQILLA YUSFI KHOTUNNISA",
    nis: "4725",
    nisn: "3136471598",
    keterangan: "LULUS",
    ucapan: "Resmi jadi alumni! Sukses terus di jalan yang kamu pilih, ya!"
  },
  {
    no: 5,
    nama: "AZKANIA MAURA YUSUFA",
    nis: "4729",
    nisn: "0125840733",
    keterangan: "LULUS",
    ucapan: "Pengumuman hari ini adalah bukti kalau kerja kerasmu tidak pernah sia-sia."
  },
  {
    no: 6,
    nama: "BAYEZID AL QARNI",
    nis: "4731",
    nisn: "0148953910",
    keterangan: "LULUS",
    ucapan: "Selamat atas kelulusannya! Jadikan ini awal dari petualangan hebatmu."
  },
  {
    no: 7,
    nama: "FAHMI FAROQ AL MAWAN",
    nis: "4733",
    nisn: "0133665897",
    keterangan: "LULUS",
    ucapan: "Kelulusan ini adalah gerbang awal. Teruslah tumbuh dan menginspirasi, ya."
  },
  {
    no: 8,
    nama: "GITA PUTRI DWI MAULIDAH",
    nis: "4735",
    nisn: "0142717456",
    keterangan: "LULUS",
    ucapan: "Keberhasilan hari ini adalah modal untuk kesuksesanmu di masa depan. Selamat!"
  },
  {
    no: 9,
    nama: "LOVEY SYAFA ARIFIN",
    nis: "4737",
    nisn: "0145287618",
    keterangan: "LULUS",
    ucapan: "Mission Accomplished! Selamat statusnya sudah berubah jadi alumni."
  },
  {
    no: 10,
    nama: "MELISA IMANIAR ANDRIYANI",
    nis: "4739",
    nisn: "0141012735",
    keterangan: "LULUS",
    ucapan: "Congrats! Layar HP-mu hari ini bikin senyum-senyum sendiri, kan?"
  },
  {
    no: 11,
    nama: "MOH. SYARIF AIDIL IBRAHIM AMRULLAH",
    nis: "4741",
    nisn: "0137426206",
    keterangan: "LULUS",
    ucapan: "Fix, kamu lulus! Jangan lupa syukuran dan traktir teman-teman, ya!"
  },
  {
    no: 12,
    nama: "MOHAMMAD GHANI ALFATIH",
    nis: "4743",
    nisn: "0135389673",
    keterangan: "LULUS",
    ucapan: "Resmi jadi alumni! Sukses terus di jalan yang kamu pilih, ya!"
  },
  {
    no: 13,
    nama: "MUH. ERVAN FADHIL RAMDHANI",
    nis: "4745",
    nisn: "0138150916",
    keterangan: "LULUS",
    ucapan: "Pengumuman hari ini adalah bukti kalau kerja kerasmu tidak pernah sia-sia."
  },
  {
    no: 14,
    nama: "MUHAMMAD ZAMMIL",
    nis: "4811",
    nisn: "3135498346",
    keterangan: "LULUS",
    ucapan: "Selamat atas kelulusannya! Jadikan ini awal dari petualangan hebatmu."
  },
  {
    no: 15,
    nama: "NUR LIFTA AURALIA PUTRI",
    nis: "4749",
    nisn: "3137660171",
    keterangan: "LULUS",
    ucapan: "Kelulusan ini adalah gerbang awal. Teruslah tumbuh dan menginspirasi, ya."
  },
  {
    no: 16,
    nama: "PUTRI KHADIJAH QOTTRUNNADA SALSABILA",
    nis: "4751",
    nisn: "0133756064",
    keterangan: "LULUS",
    ucapan: "Keberhasilan hari ini adalah modal untuk kesuksesanmu di masa depan. Selamat!"
  },
  {
    no: 17,
    nama: "RAISHA ALIKA YULISTIYONO",
    nis: "4753",
    nisn: "0131613036",
    keterangan: "LULUS",
    ucapan: "Mission Accomplished! Selamat statusnya sudah berubah jadi alumni."
  },
  {
    no: 18,
    nama: "REVINA ANINDYA THARA",
    nis: "4755",
    nisn: "0135786802",
    keterangan: "LULUS",
    ucapan: "Congrats! Layar HP-mu hari ini bikin senyum-senyum sendiri, kan?"
  },
  {
    no: 19,
    nama: "REZA FAFI AL FIRDAUS",
    nis: "4757",
    nisn: "0131596611",
    keterangan: "LULUS",
    ucapan: "Fix, kamu lulus! Jangan lupa syukuran dan traktir teman-teman, ya!"
  },
  {
    no: 20,
    nama: "SYA'IF ALI HASAN",
    nis: "4759",
    nisn: "0139624661",
    keterangan: "LULUS",
    ucapan: "Resmi jadi alumni! Sukses terus di jalan yang kamu pilih, ya!"
  },
  {
    no: 21,
    nama: "SYARAFANAH RAFIFA NADINE RAMADANIA",
    nis: "4761",
    nisn: "3133303379",
    keterangan: "LULUS",
    ucapan: "Pengumuman hari ini adalah bukti kalau kerja kerasmu tidak pernah sia-sia."
  },
  {
    no: 22,
    nama: "ZAHIRA KHALIZAH UMMI KULSUM",
    nis: "4763",
    nisn: "0134717244",
    keterangan: "LULUS",
    ucapan: "Selamat atas kelulusannya! Jadikan ini awal dari petualangan hebatmu."
  },
  {
    no: 23,
    nama: "ZAIDANNAUFAL GAVRA ARIBOWO",
    nis: "4765",
    nisn: "0137294208",
    keterangan: "LULUS",
    ucapan: "Kelulusan ini adalah gerbang awal. Teruslah tumbuh dan menginspirasi, ya."
  },
  {
    no: 24,
    nama: "ZAINATUR ROMADANIA",
    nis: "4767",
    nisn: "3131527001",
    keterangan: "LULUS",
    ucapan: "Keberhasilan hari ini adalah modal untuk kesuksesanmu di masa depan. Selamat!"
  },
  {
    no: 25,
    nama: "AFIFAH YUNITA RISKI",
    nis: "4720",
    nisn: "0138355345",
    keterangan: "LULUS",
    ucapan: "Mission Accomplished! Selamat statusnya sudah berubah jadi alumni."
  },
  {
    no: 26,
    nama: "AISHA LATIFA",
    nis: "4722",
    nisn: "0143816883",
    keterangan: "LULUS",
    ucapan: "Congrats! Layar HP-mu hari ini bikin senyum-senyum sendiri, kan?"
  },
  {
    no: 27,
    nama: "ALFARO ADIA SAYUTLI",
    nis: "4724",
    nisn: "0148670900",
    keterangan: "LULUS",
    ucapan: "Fix, kamu lulus! Jangan lupa syukuran dan traktir teman-teman, ya!"
  },
  {
    no: 28,
    nama: "ALIZA NIKITA MIRZA",
    nis: "4726",
    nisn: "0135809974",
    keterangan: "LULUS",
    ucapan: "Resmi jadi alumni! Sukses terus di jalan yang kamu pilih, ya!"
  },
  {
    no: 29,
    nama: "ANDIEN OKTAVIA AZ-ZAHWA",
    nis: "4728",
    nisn: "0139728280",
    keterangan: "LULUS",
    ucapan: "Pengumuman hari ini adalah bukti kalau kerja kerasmu tidak pernah sia-sia."
  },
  {
    no: 30,
    nama: "ANNISA AULIYA",
    nis: "4732",
    nisn: "3138843968",
    keterangan: "LULUS",
    ucapan: "Selamat atas kelulusannya! Jadikan ini awal dari petualangan hebatmu."
  },
  {
    no: 31,
    nama: "BAGAS ADITYA PRANATA",
    nis: "4734",
    nisn: "3136570472",
    keterangan: "LULUS",
    ucapan: "Kelulusan ini adalah gerbang awal. Teruslah tumbuh dan menginspirasi, ya."
  },
  {
    no: 32,
    nama: "BINTAN NAJMA WISESA ZAMANI",
    nis: "4736",
    nisn: "0142684753",
    keterangan: "LULUS",
    ucapan: "Keberhasilan hari ini adalah modal untuk kesuksesanmu di masa depan. Selamat!"
  },
  {
    no: 33,
    nama: "FEBRIYANO PUTRA AHMAD YASSIN EFENDI",
    nis: "4738",
    nisn: "3130816836",
    keterangan: "LULUS",
    ucapan: "Mission Accomplished! Selamat statusnya sudah berubah jadi alumni."
  },
  {
    no: 34,
    nama: "GHEISYA CANDRA KIRANA",
    nis: "4740",
    nisn: "0132044932",
    keterangan: "LULUS",
    ucapan: "Congrats! Layar HP-mu hari ini bikin senyum-senyum sendiri, kan?"
  },
  {
    no: 35,
    nama: "GHOZY HAIDAR ABIYU",
    nis: "4742",
    nisn: "3130609705",
    keterangan: "LULUS",
    ucapan: "Fix, kamu lulus! Jangan lupa syukuran dan traktir teman-teman, ya!"
  },
  {
    no: 36,
    nama: "JOSYKO WARI PANJALU",
    nis: "4744",
    nisn: "0137824327",
    keterangan: "LULUS",
    ucapan: "Resmi jadi alumni! Sukses terus di jalan yang kamu pilih, ya!"
  },
  {
    no: 37,
    nama: "LAUNA FAKHIRA ALIKA",
    nis: "4746",
    nisn: "0131005504",
    keterangan: "LULUS",
    ucapan: "Pengumuman hari ini adalah bukti kalau kerja kerasmu tidak pernah sia-sia."
  },
  {
    no: 38,
    nama: "MOCH. RICKY GHIFFARI AL FADHILI",
    nis: "4748",
    nisn: "0134962951",
    keterangan: "LULUS",
    ucapan: "Selamat atas kelulusannya! Jadikan ini awal dari petualangan hebatmu."
  },
  {
    no: 39,
    nama: "MUHAMMAD KEVIN ADITYA",
    nis: "4750",
    nisn: "0148524149",
    keterangan: "LULUS",
    ucapan: "Kelulusan ini adalah gerbang awal. Teruslah tumbuh dan menginspirasi, ya."
  },
  {
    no: 40,
    nama: "MUHAMMAD RAFADITYA RAMADHAN",
    nis: "4752",
    nisn: "3135711890",
    keterangan: "LULUS",
    ucapan: "Keberhasilan hari ini adalah modal untuk kesuksesanmu di masa depan. Selamat!"
  },
  {
    no: 41,
    nama: "NAJWA NUR IMAMA",
    nis: "4754",
    nisn: "0131713397",
    keterangan: "LULUS",
    ucapan: "Mission Accomplished! Selamat statusnya sudah berubah jadi alumni."
  },
  {
    no: 42,
    nama: "NAUROH QOTHRUNNADA NAFISA",
    nis: "4756",
    nisn: "3132304948",
    keterangan: "LULUS",
    ucapan: "Congrats! Layar HP-mu hari ini bikin senyum-senyum sendiri, kan?"
  },
  {
    no: 43,
    nama: "PUTRI AISYAH QOTTRUNNADA SALSABILA",
    nis: "4758",
    nisn: "0133662733",
    keterangan: "LULUS",
    ucapan: "Fix, kamu lulus! Jangan lupa syukuran dan traktir teman-teman, ya!"
  },
  {
    no: 44,
    nama: "QORIATUNNISAK",
    nis: "4760",
    nisn: "3148140677",
    keterangan: "LULUS",
    ucapan: "Resmi jadi alumni! Sukses terus di jalan yang kamu pilih, ya!"
  },
  {
    no: 45,
    nama: "RALF DAMAI MULYA JURIYANTO",
    nis: "4762",
    nisn: "3140063931",
    keterangan: "LULUS",
    ucapan: "Pengumuman hari ini adalah bukti kalau kerja kerasmu tidak pernah sia-sia."
  },
  {
    no: 46,
    nama: "REYVAN ARDIANSYAH PUTRA",
    nis: "4764",
    nisn: "0133653592",
    keterangan: "LULUS",
    ucapan: "Selamat atas kelulusannya! Jadikan ini awal dari petualangan hebatmu."
  },
  {
    no: 47,
    nama: "YULIA RAHMANI ANWAR LATU HERU",
    nis: "4766",
    nisn: "3141584581",
    keterangan: "LULUS",
    ucapan: "Kelulusan ini adalah gerbang awal. Teruslah tumbuh dan menginspirasi, ya."
  },
  {
    no: 48,
    nama: "ALUNA SYAHDU PERMATA RAMADHANI",
    nis: "5016",
    nisn: "0139482415",
    keterangan: "LULUS",
    ucapan: "Keberhasilan hari ini adalah modal untuk kesuksesanmu di masa depan. Selamat!"
  }
];

export const defaultSchoolConfig: SchoolConfig = {
  name: "SD NEGERI 1 ASEMBAGUS",
  type: "SD",
  address: "Jl. Raya Asembagus No. 102, Asembagus, Situbondo, Jawa Timur 68371",
  website: "www.sdn1asembagus.sch.id",
  email: "info@sdn1asembagus.sch.id",
  headmasterName: "Syamsul, S.Pd.", // Tailored to the user!
  headmasterNip: "19780514 200312 1 002",
  announcementDate: "02 Juni 2026 pukul 10.30 WIB",
  countdownTarget: "2026-06-02T10:30:00+07:00",
  academicYear: "2025/2026",
  skuNo: "421.2/084/SDN1-ASB/V/2026"
};
