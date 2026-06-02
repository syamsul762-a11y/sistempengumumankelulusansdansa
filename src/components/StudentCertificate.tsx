import React, { useRef, useEffect, useState } from 'react';
import { Student, SchoolConfig } from '../types';
import { Award, Printer, Share2, ClipboardCheck, ArrowLeft, Heart, FileText, Sparkles, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SchoolLogo from './SchoolLogo';

interface CertificateProps {
  student: Student;
  config: SchoolConfig;
  onReset: () => void;
}

export default function StudentCertificate({ student, config, onReset }: CertificateProps) {
  const [activeTab, setActiveTab] = useState<'digital' | 'formal'>('digital');
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // High performance local canvas confetti particle system
  useEffect(() => {
    if (activeTab !== 'digital' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight || 600;
      }
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#8b5cf6', '#ef4444'];
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    // Initialize particles: shoot from bottom corners towards center
    for (let i = 0; i < 150; i++) {
      const isLeft = Math.random() > 0.5;
      particles.push({
        x: isLeft ? 0 : width,
        y: height - 50,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: (isLeft ? 1 : -1) * (Math.random() * 12 + 6),
        speedY: -(Math.random() * 15 + 10),
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      let activeCount = 0;
      particles.forEach((p) => {
        // Apply gravity and drag
        p.speedY += 0.3; // Gravity
        p.speedX *= 0.98; // Drag

        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y < height + 20 && p.x > -20 && p.x < width + 20) {
          activeCount++;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        // Draw different shapes
        if (p.size % 2 === 0) {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });

      if (activeCount > 0) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab, student]);

  const handlePrint = () => {
    // Switch to formal tab first for perfect print formatting
    setActiveTab('formal');
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleShare = () => {
    const text = `Selamat! ${student.nama} dinyatakan LULUS dari ${config.name} (${config.academicYear}) dengan NISN ${student.nisn}. Cek pengumuman lengkapnya di sini!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="w-full">
      {/* Action Bar (hidden during print) */}
      <div id="action-bar" className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 print:hidden">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition duration-200 text-sm font-medium self-start"
          id="btn-back-search"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Pencarian
        </button>

        <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto" id="toggle-card-tabs">
          <button
            onClick={() => setActiveTab('digital')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === 'digital'
                ? 'bg-white text-blue-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            id="tab-digital"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            Kartu Selebrasi
          </button>
          <button
            onClick={() => setActiveTab('formal')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
              activeTab === 'formal'
                ? 'bg-white text-blue-950 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            id="tab-formal"
          >
            <FileText className="w-4 h-4 text-emerald-600" />
            Surat Resmi SKL
          </button>
        </div>

        <div className="flex gap-2 w-full sm:w-auto justify-end flex-wrap sm:flex-nowrap" id="action-buttons">
          {student.linkSkl && (
            <a
              href={student.linkSkl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-amber-600 hover:bg-amber-500 rounded-lg hover:shadow-lg transition w-full sm:w-auto justify-center cursor-pointer"
              id="btn-download-drive"
            >
              <Download className="w-4 h-4" />
              Unduh File SKL (Drive)
            </a>
          )}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-200 bg-white rounded-lg hover:bg-slate-50 text-slate-700 transition w-1/2 sm:w-auto justify-center cursor-pointer"
            id="btn-share"
          >
            {copied ? (
              <>
                <ClipboardCheck className="w-4 h-4 text-emerald-600" />
                Disalin!
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-slate-500" />
                Bagikan
              </>
            )}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-950 rounded-lg hover:bg-blue-900 shadow-md hover:shadow-lg transition w-1/2 sm:w-auto justify-center cursor-pointer"
            id="btn-cetak"
          >
            <Printer className="w-4 h-4" />
            Cetak SKL
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: DIGITAL CELEBRATORY CARD */}
        {activeTab === 'digital' && (
          <motion.div
            key="digital-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl text-center print:hidden flex flex-col items-center"
            id="digital-card-container"
          >
            {/* Embedded Canvas Confetti */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* School Crest Symbol / Emblem */}
            <div className="relative mb-6 flex justify-center" id="crest-wrapper">
              <div className="absolute inset-x-0 -top-4 -bottom-4 bg-amber-500/10 rounded-full blur-md animate-pulse" />
              <div className="relative bg-slate-950 p-2.5 rounded-full border border-slate-800">
                <SchoolLogo size={80} logoUrl={config.logoUrl} />
              </div>
            </div>

            {/* Header school context */}
            <span className="text-amber-400 text-xs sm:text-sm font-bold tracking-widest uppercase mb-1 drop-shadow-sm font-mono block">
              PENGUMUMAN KELULUSAN RESMI • {config.academicYear}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-6">
              {config.name}
            </h2>

            {/* Graduation Banner */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-2xl px-6 py-4 mb-8 max-w-lg w-full flex flex-col items-center shadow-inner">
              <span className="text-xs uppercase font-semibold font-mono tracking-wider opacity-80">STATUS KELULUSAN</span>
              <span className="text-3xl sm:text-4xl font-extrabold tracking-widest block py-1 my-1 animate-bounce">
                {student.keterangan}
              </span>
              <span className="text-xs opacity-90 text-slate-300">
                LULUS 100% dengan kebanggaan
              </span>
            </div>

            {/* Student Info Panel */}
            <div className="max-w-xl w-full bg-slate-950/50 backdrop-blur-md border border-slate-800 rounded-2xl p-6 mb-8 text-left space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-slate-400 text-xs font-mono uppercase block">NAMA LENGKAP SISWA</span>
                <span className="text-lg sm:text-xl font-bold text-amber-100">{student.nama}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 text-xs font-mono uppercase block">NIS</span>
                  <span className="font-semibold text-slate-200">{student.nis}</span>
                </div>
                <div>
                  <span className="text-slate-400 text-xs font-mono uppercase block">NISN</span>
                  <span className="font-semibold text-slate-200">{student.nisn}</span>
                </div>
              </div>
            </div>

            {/* Personal celebratory message from principal */}
            <div className="max-w-xl w-full relative group mb-6">
              <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-lg transition group-hover:bg-blue-500/10" />
              <div className="relative border border-slate-800 bg-slate-950/30 p-5 rounded-2xl">
                <span className="absolute -top-3 left-6 px-3 py-0.5 bg-slate-800 border border-slate-700 rounded-full text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                  PESAN KHUSUS UNTUKMU
                </span>
                <p className="italic text-slate-200 text-sm sm:text-base leading-relaxed pt-2">
                  &ldquo;{student.ucapan}&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-slate-900 flex justify-between items-center text-[11px] text-slate-500 font-mono">
                  <span>{config.name}</span>
                  <span className="flex items-center gap-1">
                    Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> untuk Anak Bangsa
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Google Drive Download Alert Box */}
            {student.linkSkl && (
              <div className="max-w-xl w-full bg-gradient-to-r from-amber-600/10 to-amber-500/5 border border-amber-500/20 text-amber-200 rounded-2xl p-5 mb-2 text-center flex flex-col items-center gap-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-sm tracking-wide">Dokumen SKL PDF Asli Siap Diunduh</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                  Surat Keterangan Lulus (SKL) resmi untuk <strong>{student.nama}</strong> telah diunggah dan terverifikasi. Silakan unduh file PDF asli yang siap dicetak melaui Google Drive sekolah.
                </p>
                <a
                  href={student.linkSkl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  Unduh Dokumen SKL (Google Drive)
                </a>
              </div>
            )}
          </motion.div>
        )}

        {/* TAB 2: FORMAL OFFICIAL LETTER (SKL) */}
        {activeTab === 'formal' && (
          <motion.div
            key="formal-skl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-white text-black p-4 sm:p-12 border border-slate-300 rounded-2xl shadow-xl font-serif leading-relaxed text-slate-900 print:border-none print:shadow-none print:p-0"
            id="print-certificate-area"
          >
            {/* Screen-only Google Drive Download Alert Box (formal tab) */}
            {student.linkSkl && (
              <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-950 rounded-xl text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 print:hidden font-sans">
                <div className="flex gap-2">
                  <FileText className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold">Unduh Versi PDF Asli</h5>
                    <p className="text-emerald-700 text-[11px] mt-0.5">Surat Keterangan Lulus (SKL) versi cetak resmi dapat diunduh langsung dalam format PDF asli lewat Google Drive.</p>
                  </div>
                </div>
                <a
                  href={student.linkSkl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-center transition cursor-pointer shrink-0"
                >
                  Unduh PDF di Drive
                </a>
              </div>
            )}

            {/* FORMAL KOP SURAT (HERALDIC INDONESIAN LETTERHEAD) */}
            <div className="flex flex-col items-center text-center pb-4 border-b-4 border-double border-black relative" id="kop-surat">
              {/* School Logo */}
              <div className="absolute left-2 sm:left-4 top-2 hidden md:block w-16 h-16 opacity-90 print:block">
                <SchoolLogo size={64} logoUrl={config.logoUrl} />
              </div>

              <div className="md:px-20">
                <h5 className="text-[11px] sm:text-[13px] font-bold uppercase tracking-widest font-sans">PEMERINTAH KABUPATEN SITUBONDO</h5>
                <h5 className="text-[11px] sm:text-[13px] font-bold uppercase tracking-widest font-sans">DINAS PENDIDIKAN DAN KEBUDAYAAN</h5>
                <h3 className="text-md sm:text-lg font-extrabold uppercase font-sans tracking-wide mt-0.5">{config.name}</h3>
                <p className="text-[10px] sm:text-[12px] italic font-sans text-slate-600 mt-1">
                  Alamat: {config.address}
                </p>
                <div className="text-[9px] sm:text-[11px] font-mono text-slate-500">
                  Situs Web: <span className="underline">{config.website}</span> • Email: <span>{config.email}</span>
                </div>
              </div>
            </div>

            {/* LETTER TITLE */}
            <div className="text-center mt-6 mb-8" id="document-title">
              <h4 className="text-md sm:text-base font-extrabold tracking-wider uppercase underline">SURAT KETERANGAN LULUS</h4>
              <p className="text-xs sm:text-sm font-sans tracking-widest mt-0.5">Nomor: {config.skuNo}</p>
            </div>

            {/* PREAMBLE */}
            <div className="text-sm sm:text-base text-justify space-y-4 mb-6 px-1 indent-8" id="document-intro">
              <p>
                Yang bertanda tangan di bawah ini, Kepala Sekolah <strong>{config.name}</strong>, Kecamatan Asembagus, Kabupaten Situbondo, menerangkan dengan sesungguhnya bahwa siswa di bawah ini:
              </p>
            </div>

            {/* STUDENT DATA TABLE */}
            <div className="w-full my-6 bg-slate-50 border border-slate-200 rounded-lg p-4 sm:p-6 print:bg-white print:border-none" id="document-student-table">
              <table className="w-full text-sm sm:text-base border-collapse">
                <tbody>
                  <tr className="border-b border-slate-200/50 print:border-b-black/10">
                    <td className="py-2.5 font-bold w-1/3 sm:w-1/4">Nama Lengkap</td>
                    <td className="py-2.5 w-4">:</td>
                    <td className="py-2.5 font-extrabold uppercase tracking-wide text-slate-900">{student.nama}</td>
                  </tr>
                  <tr className="border-b border-slate-200/50 print:border-b-black/10">
                    <td className="py-2.5 font-bold">Nomor Induk Siswa (NIS)</td>
                    <td className="py-2.5">:</td>
                    <td className="py-2.5 font-mono">{student.nis}</td>
                  </tr>
                  <tr className="border-b border-slate-200/50 print:border-b-black/10">
                    <td className="py-2.5 font-bold">NISN</td>
                    <td className="py-2.5">:</td>
                    <td className="py-2.5 font-mono">{student.nisn}</td>
                  </tr>
                  <tr className="border-b border-slate-200/50 print:border-b-black/10">
                    <td className="py-2.5 font-bold">Satuan Pendidikan</td>
                    <td className="py-2.5">:</td>
                    <td className="py-2.5">{config.name}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-bold">Status Kelulusan</td>
                    <td className="py-2.5">:</td>
                    <td className="py-2.5 text-base sm:text-lg">
                      <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-extrabold rounded print:bg-transparent print:text-black print:p-0">
                        {student.keterangan}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* DECLARATION TEXT */}
            <div className="text-sm sm:text-base text-justify spacing-relaxed text-slate-800 px-1 indent-8" id="document-concluding">
              <p className="mb-4">
                Dinyatakan telah <strong>{student.keterangan}</strong> dari Satuan Pendidikan <strong>{config.name}</strong> tahun pelajaran <strong>{config.academicYear}</strong> berdasarkan kriteria kelulusan akademik yang ditetapkan oleh sekolah serta peraturan perundang-undangan yang berlaku.
              </p>
              <p>
                Surat keterangan ini diterbitkan secara mandiri dan sah untuk dapat dipergunakan sebagaimana mestinya, khususnya sebagai dokumen pengganti sementara Ijazah untuk keperluan pendaftaran jenjang pendidikan selanjutnya.
              </p>
            </div>

            {/* SIGNATURE SECTION */}
            <div className="flex justify-end mt-12 mb-4 pr-4 sm:pr-8" id="document-signatures">
              <div className="text-left text-sm sm:text-base w-64">
                <p>Situbondo, {config.announcementDate}</p>
                <p>Kepala Sekolah,</p>
                {/* Simulated signature stamp space */}
                <div className="h-20 flex items-center relative my-1">
                  <div className="absolute left-0 w-24 h-24 border-2 border-blue-600/30 text-blue-600/30 text-[9px] uppercase border-dashed rounded-full flex flex-col items-center justify-center -rotate-12 pointer-events-none select-none print:border-blue-600/10 print:text-blue-600/10">
                    <span className="text-[7px] text-center max-w-[80px] truncate">{config.name}</span>
                    <span className="font-sans font-bold">TERVALIDASI</span>
                    <span className="text-[7px]">Sistem Online</span>
                  </div>
                </div>
                <p className="font-extrabold underline uppercase font-sans">{config.headmasterName}</p>
                <p className="text-xs text-slate-500 font-sans">NIP. {config.headmasterNip}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
