import React, { useState, useEffect } from 'react';
import { Student, SchoolConfig } from './types';
import { students, defaultSchoolConfig } from './data/students';
import StudentCertificate from './components/StudentCertificate';
import SchoolLogo from './components/SchoolLogo';
import { 
  GraduationCap, 
  Search, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  HelpCircle, 
  Calendar,
  BookOpen,
  Layers,
  MapPin,
  Globe,
  Mail,
  X,
  FileCheck,
  Clock,
  Lock,
  Unlock,
  Hourglass,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Application State
  const [nisnQuery, setNisnQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [errorText, setErrorText] = useState('');
  const [config, setConfig] = useState<SchoolConfig>(() => {
    const saved = localStorage.getItem('school_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse school_config", e);
      }
    }
    return defaultSchoolConfig;
  });

  // Save school configuration to localStorage
  useEffect(() => {
    localStorage.setItem('school_config', JSON.stringify(config));
  }, [config]);

  // Admin Login & Settings State
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');

  // Settings editing state
  const [adminDateText, setAdminDateText] = useState(config.announcementDate);
  const [adminCountdownTarget, setAdminCountdownTarget] = useState(config.countdownTarget);
  const [adminSchoolName, setAdminSchoolName] = useState(config.name);
  const [adminSchoolAddress, setAdminSchoolAddress] = useState(config.address);
  const [adminPrincipalName, setAdminPrincipalName] = useState(config.headmasterName);
  const [adminPrincipalNip, setAdminPrincipalNip] = useState(config.headmasterNip);
  const [adminAcademicYear, setAdminAcademicYear] = useState(config.academicYear);
  const [adminSkuNo, setAdminSkuNo] = useState(config.skuNo);
  const [adminLogoUrl, setAdminLogoUrl] = useState(config.logoUrl || '');

  // Sync admin state with current school configuration
  useEffect(() => {
    setAdminDateText(config.announcementDate);
    setAdminCountdownTarget(config.countdownTarget);
    setAdminSchoolName(config.name);
    setAdminSchoolAddress(config.address);
    setAdminPrincipalName(config.headmasterName);
    setAdminPrincipalNip(config.headmasterNip);
    setAdminAcademicYear(config.academicYear);
    setAdminSkuNo(config.skuNo);
    setAdminLogoUrl(config.logoUrl || '');
  }, [config]);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isTimeUp: false
  });
  const [bypassCountdown, setBypassCountdown] = useState(false);

  // Sync real-time countdown against config.countdownTarget
  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetStr = config.countdownTarget || "2026-06-02T10:30:00+07:00";
      const target = new Date(targetStr).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0 || isNaN(target)) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isTimeUp: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isTimeUp: false });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [config.countdownTarget]);

  // Handle Admin Login credentials checking
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError('');
    if (adminUsername === 'admin' && adminPassword === 'sdn1asembagus6*') {
      setIsAdminAuthenticated(true);
      setAdminLoginError('');
    } else {
      setAdminLoginError('Username atau password admin salah!');
    }
  };

  // Helper for processing school logo file uploads to base64 encoding format
  const handleLogoFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Format file tidak didukung! Silakan unggah gambar sahaja.');
      return;
    }
    if (file.size > 1 * 1024 * 1024) {
      alert('Ukuran file terlalu besar! Silakan unggah gambar di bawah 1MB agar muat dalam penyimpanan web lokal.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        setAdminLogoUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle saving configurations back to school state
  const handleSaveAdminSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setConfig({
      ...config,
      name: adminSchoolName.toUpperCase(),
      address: adminSchoolAddress,
      headmasterName: adminPrincipalName,
      headmasterNip: adminPrincipalNip,
      announcementDate: adminDateText,
      countdownTarget: adminCountdownTarget,
      academicYear: adminAcademicYear,
      skuNo: adminSkuNo,
      logoUrl: adminLogoUrl,
    });
    setShowAdminModal(false);
  };

  // Log Out/Reset credentials form
  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminUsername('');
    setAdminPassword('');
  };

  // Handle Search Submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    const formattedQuery = nisnQuery.trim();

    // Verification Rules
    if (!formattedQuery) {
      setErrorText('Silakan masukkan nomor NISN terlebih dahulu.');
      return;
    }

    if (!/^\d+$/.test(formattedQuery)) {
      setErrorText('NISN hanya boleh berupa angka.');
      return;
    }

    if (formattedQuery.length !== 10) {
      setErrorText('NISN harus tepat berjumlah 10 digit angka.');
      return;
    }

    // Lookup Student Data
    const result = students.find((s) => s.nisn === formattedQuery);
    if (result) {
      setSelectedStudent(result);
      setErrorText('');
    } else {
      setErrorText('Mohon maaf, nomor NISN tidak terdaftar dalam database kelulusan sekolah ini.');
    }
  };

  // Safe input handler restricting characters to digits only and truncating to 10 chars
  const handleNisnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 10) {
      setNisnQuery(val);
    }
  };

  // Reset check box back to state query
  const handleResetQuery = () => {
    setSelectedStudent(null);
    setNisnQuery('');
    setErrorText('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans transition duration-150 print:bg-white text-slate-800">
      
      {/* 1. PORTAL BRANDING HEADER (hidden during print) */}
      <header className="bg-blue-950 text-white py-6 border-b border-blue-900 shadow-md relative print:hidden" id="portal-header">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Logo / Badge */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="bg-white/10 p-1.5 rounded-2xl flex items-center justify-center shadow-lg shrink-0 border border-white/10">
              <SchoolLogo size={52} logoUrl={config.logoUrl} />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-amber-400 font-mono block">Sistem Pengumuman Kelulusan Mandiri (SPKM)</span>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight font-sans text-white uppercase">{config.name}</h1>
            </div>
          </div>

          {/* Action Links & Admin Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setAdminLoginError('');
                setShowAdminModal(true);
              }}
              className="flex items-center gap-2 bg-blue-900 border border-blue-800 hover:bg-amber-600 hover:border-amber-400 hover:text-blue-950 px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 transition cursor-pointer"
              id="admin-settings-trigger"
            >
              <Settings className="w-4 h-4" />
              Akses Admin
            </button>
          </div>

        </div>
      </header>

      {/* 2. SUB HEADER ALIGNMENT STATS & INFO (hidden during print) */}
      <section className="bg-slate-900 text-slate-400 py-3 text-xs border-b border-slate-950 px-4 print:hidden" id="info-bar">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap gap-x-6 gap-y-1 justify-center">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              Rilis: <strong>{config.announcementDate}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              Tahun Ajaran: <strong>{config.academicYear}</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono opacity-80 text-[10px]">
            <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            PORTAL RESMI ONLINE
          </div>
        </div>
      </section>

      {/* 4. MAIN CONTENT CONTAINER */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 md:p-8" id="portal-main-area">
        
        {/* CORE PORTAL BINDERS USING ANIMATE PRESENCE */}
        <AnimatePresence mode="wait">
          
          <motion.div
            key="check-qualification"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {!selectedStudent ? (
              /* Entrance / Search panel */
              <div className="max-w-2xl mx-auto space-y-6" id="entrance-search-panel">
                
                {/* Informative Welcome banner */}
                <div className="bg-gradient-to-br from-blue-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl relative overflow-hidden shadow-lg">
                  {/* Background decorations */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

                  <div className="relative">
                    <span className="px-3 py-1 bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono font-bold text-[10px] tracking-widest rounded-full uppercase">
                      Sistem Pengumuman Kelulusan
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-3 mb-2">
                      Selamat Datang di Portal Kelulusan Siswa
                    </h2>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-lg">
                      Silakan memeriksa status kelulusan peserta didik dengan memasukkan 10 digit <strong>Nomor Induk Siswa Nasional (NISN)</strong> guna mengakses Surat Keterangan Lulus (SKL) digital.
                    </p>
                  </div>
                </div>

                {/* COUNTDOWN TIMER WIDGET (Prominent Bento Card layout) */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden" id="countdown-banner-widget">
                  {/* Glowing background elements */}
                  <div className="absolute top-0 left-12 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-4 right-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="relative text-center flex flex-col items-center">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/20 text-amber-400 mb-3">
                      {timeLeft.isTimeUp ? <Unlock className="w-6 h-6 animate-pulse text-emerald-400" /> : <Clock className="w-6 h-6 animate-pulse text-amber-400" />}
                    </div>
                    
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border mb-3 ${
                      timeLeft.isTimeUp 
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
                        : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                    }`}>
                      {timeLeft.isTimeUp ? 'AKSES TELAH DIBUKA' : 'HITUNG MUNDUR PERILISAN RESMI'}
                    </span>
                    
                    <h3 className="text-lg font-bold tracking-tight text-white mb-1">
                      {timeLeft.isTimeUp ? 'Pengumuman Kelulusan Telah Dirilis' : 'Waktu Hitung Mundur Rilis Kelulusan'}
                    </h3>
                    
                    <p className="text-slate-400 text-xs max-w-sm mx-auto mb-6">
                      {timeLeft.isTimeUp 
                        ? `Silakan masukkan nomor NISN di bawah ini untuk melihat lembar kelulusan.` 
                        : `Akses pencarian mandiri untuk Kelulusan TP ${config.academicYear} akan aktif dalam:`}
                    </p>

                    {/* Numeric Countdown Rows */}
                    <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-sm w-full mb-6" id="countdown-digits">
                      {/* Days */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 sm:p-3.5 text-center backdrop-blur-sm">
                        <div className="text-xl sm:text-3xl font-extrabold tracking-wide text-white font-mono">
                          {String(timeLeft.days).padStart(2, '0')}
                        </div>
                        <div className="text-[9px] font-bold text-slate-500 font-mono tracking-widest mt-1">HARI</div>
                      </div>
                      {/* Hours */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 sm:p-3.5 text-center backdrop-blur-sm">
                        <div className="text-xl sm:text-3xl font-extrabold tracking-wide text-white font-mono">
                          {String(timeLeft.hours).padStart(2, '0')}
                        </div>
                        <div className="text-[9px] font-bold text-slate-500 font-mono tracking-widest mt-1">JAM</div>
                      </div>
                      {/* Minutes */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 sm:p-3.5 text-center backdrop-blur-sm">
                        <div className="text-xl sm:text-3xl font-extrabold tracking-wide text-white font-mono">
                          {String(timeLeft.minutes).padStart(2, '0')}
                        </div>
                        <div className="text-[9px] font-bold text-slate-500 font-mono tracking-widest mt-1">MENIT</div>
                      </div>
                      {/* Seconds */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 sm:p-3.5 text-center backdrop-blur-sm border-amber-500/20 ring-1 ring-amber-500/5">
                        <div className="text-xl sm:text-3xl font-extrabold tracking-wide text-amber-400 font-mono">
                          {String(timeLeft.seconds).padStart(2, '0')}
                        </div>
                        <div className="text-[9px] font-bold text-amber-400 font-mono tracking-widest mt-1">DETIK</div>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 bg-white/5 px-3 py-2 rounded-xl border border-white/5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Jadwal Pengumuman: <strong className="text-slate-200">{config.announcementDate}</strong></span>
                    </div>
                  </div>
                </div>

                {/* Primary search form box (Locked state handled smoothly depending on timer) */}
                <div className={`bg-white border rounded-3xl p-6 sm:p-8 shadow-sm transition relative overflow-hidden ${
                  (!timeLeft.isTimeUp && !bypassCountdown) ? 'border-slate-200' : 'border-blue-900/10'
                }`} id="search-box-container">
                  
                  {/* Lock Watermark overlay for UI intuition */}
                  {!timeLeft.isTimeUp && !bypassCountdown && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02]">
                      <Lock className="w-64 h-64" />
                    </div>
                  )}

                  <form onSubmit={handleSearch} className="space-y-5 relative">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-widest" htmlFor="nisn-input-field">
                          Masukkan Nomor NISN Siswa
                        </label>
                        {!timeLeft.isTimeUp && !bypassCountdown && (
                          <span className="text-[10px] bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded-lg border border-red-100 flex items-center gap-1">
                            <Lock className="w-3 h-3" /> Terkunci
                          </span>
                        )}
                      </div>
                      
                      <div className="relative">
                        <input
                          id="nisn-input-field"
                          type="text"
                          value={nisnQuery}
                          onChange={handleNisnInputChange}
                          disabled={!timeLeft.isTimeUp && !bypassCountdown}
                          placeholder={(!timeLeft.isTimeUp && !bypassCountdown) ? "Pencarian dinonaktifkan sementara" : "Contoh: 0147742054 (10 Digit)"}
                          className={`w-full pl-4 pr-12 py-3.5 text-base font-medium border-2 rounded-2xl focus:outline-none focus:ring-4 tracking-wider font-mono shadow-inner text-slate-800 ${
                            (!timeLeft.isTimeUp && !bypassCountdown) 
                              ? 'bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed'
                              : 'bg-white border-slate-200 focus:ring-blue-100 focus:border-blue-950'
                          }`}
                          autoComplete="off"
                        />
                        <div className="absolute right-3.5 top-3 text-slate-400">
                          {(!timeLeft.isTimeUp && !bypassCountdown) ? <Lock className="w-6 h-6 text-slate-300" /> : <Search className="w-6 h-6" />}
                        </div>
                      </div>
                      
                      {/* Validation or Error Indicator */}
                      {errorText && (
                        <div className="p-3 bg-red-50 text-red-700 rounded-xl mt-3 text-xs font-medium flex items-center gap-2.5 border border-red-150" id="search-error">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{errorText}</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={!timeLeft.isTimeUp && !bypassCountdown}
                      className={`w-full font-bold py-3.5 rounded-2xl leading-none shadow-md transition flex items-center justify-center gap-2 ${
                        (!timeLeft.isTimeUp && !bypassCountdown)
                          ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                          : 'bg-blue-950 hover:bg-blue-900 text-white hover:shadow-lg active:scale-[0.99] cursor-pointer'
                      }`}
                      id="btn-trigger-search"
                    >
                      {(!timeLeft.isTimeUp && !bypassCountdown) && <Lock className="w-4 h-4" />}
                      Periksa Hasil Kelulusan
                    </button>
                  </form>

                  {/* Developer Empathy & User Testing Shortcut Help Panel */}
                  <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex gap-2 text-slate-500">
                      <HelpCircle className="w-5 h-5 shrink-0 text-blue-500" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Informasi Bantuan</h4>
                        <p className="text-[11px] leading-relaxed">
                          NISN dapat Anda lihat di Kartu NISN atau tanyakan langsung pada Wali Kelas kelas VI (<strong>Syamsul Arifin, S.Pd</strong>).
                        </p>
                      </div>
                    </div>

                    {/* Sample Test Selector tags */}
                    <div className="shrink-0 bg-slate-50 p-3 rounded-2xl border border-slate-200/50 w-full sm:w-auto" id="sample-shorcut-panel">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 font-mono">Contoh NISN Pengujian:</span>
                      <div className="flex gap-2">
                        <button
                          disabled={!timeLeft.isTimeUp && !bypassCountdown}
                          onClick={() => { setNisnQuery('0147742054'); setErrorText(''); }}
                          className={`px-2.5 py-1 font-mono font-semibold text-xs rounded-lg transition ${
                            (!timeLeft.isTimeUp && !bypassCountdown)
                              ? 'bg-slate-100 text-slate-300 border border-slate-150 cursor-not-allowed'
                              : 'bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800'
                          }`}
                        >
                          0147742054
                        </button>
                        <button
                          disabled={!timeLeft.isTimeUp && !bypassCountdown}
                          onClick={() => { setNisnQuery('0132745795'); setErrorText(''); }}
                          className={`px-2.5 py-1 font-mono font-semibold text-xs rounded-lg transition ${
                            (!timeLeft.isTimeUp && !bypassCountdown)
                              ? 'bg-slate-100 text-slate-300 border border-slate-150 cursor-not-allowed'
                              : 'bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800'
                          }`}
                        >
                          0132745795
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informational Guidance Disclaimer */}
                <div className="text-center text-xs text-slate-400 font-mono max-w-md mx-auto" id="disclaimer">
                  Sistem SPKM divalidasi dan dioperasikan secara penuh oleh operator Sekolah Dasar Negeri {config.academicYear}.
                </div>
              </div>
            ) : (
              /* Interactive Certificate of Graduation result output */
              <StudentCertificate
                student={selectedStudent}
                config={config}
                onReset={handleResetQuery}
              />
            )}
          </motion.div>

        </AnimatePresence>
      </main>

      {/* 5. FOOTER ARCHITECTURE (hidden during print) */}
      <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs py-8 text-center print:hidden" id="applet-footer">
        <div className="max-w-6xl mx-auto px-4 space-y-3">
          <div className="flex justify-center items-center gap-2 flex-wrap">
            <span className="font-bold text-slate-800">© 2026 {config.name}.</span>
            <span>Hak Cipta Dilindungi Undang-Undang.</span>
          </div>
          <div className="flex justify-center items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              Jakarta Selatan, ID
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 shrink-0" />
              {config.website}
            </span>
          </div>
        </div>
      </footer>

      {/* Admin system configuration login and settings modal panel */}
      <AnimatePresence>
        {showAdminModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" id="admin-modal-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl border border-slate-100"
              id="admin-modal-container"
            >
              {/* Header */}
              <div className="bg-blue-950 text-white p-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-amber-500 animate-spin-slow" />
                  <h3 className="font-extrabold text-sm sm:text-base tracking-wide">Konfigurasi Pengaturan Portal SPKM</h3>
                </div>
                <button
                  onClick={() => {
                    setShowAdminModal(false);
                    setAdminLoginError('');
                  }}
                  className="p-1 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition cursor-pointer"
                  id="btn-close-admin-modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              {!isAdminAuthenticated ? (
                /* STEP 1: LOGIN FORM */
                <form onSubmit={handleAdminLogin} className="p-6 space-y-4">
                  <div className="text-center mb-4">
                    <h4 className="font-bold text-slate-700 text-sm">Masuk sebagai Administrator</h4>
                    <p className="text-slate-500 text-xs mt-1 font-semibold">Gunakan username: <code className="text-amber-600 bg-amber-50 px-1 py-0.5 rounded">admin</code> dan password sekolah Anda.</p>
                  </div>

                  {adminLoginError && (
                    <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs font-semibold border border-red-100 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{adminLoginError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1" htmlFor="admin-username-input">Username</label>
                    <input
                      id="admin-username-input"
                      type="text"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm font-semibold text-slate-800"
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      placeholder="Masukkan username"
                      required
                      autoComplete="username"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1" htmlFor="admin-password-input">Password</label>
                    <input
                      id="admin-password-input"
                      type="password"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm font-semibold text-slate-800"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Masukkan password (*)"
                      required
                      autoComplete="current-password"
                    />
                  </div>

                  <div className="pt-4 flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAdminModal(false);
                        setAdminLoginError('');
                      }}
                      className="px-4 py-2 text-xs font-semibold border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition cursor-pointer"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold bg-blue-950 hover:bg-blue-900 text-white rounded-xl transition cursor-pointer flex items-center gap-1.5"
                    >
                      Masuk
                    </button>
                  </div>
                </form>
              ) : (
                /* STEP 2: SETTINGS CONTROL PANEL */
                <form onSubmit={handleSaveAdminSettings} className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
                  
                  {/* Quick Access bypass countdown widget */}
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 font-sans">
                    <div>
                      <h4 className="text-xs font-bold text-amber-900">Akses Bypass Hitung Mundur</h4>
                      <p className="text-[11px] text-amber-700">Aktifkan untuk membuka pemblokiran pencarian mandiri NISN seketika tanpa terikat timer.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={bypassCountdown} 
                        onChange={(e) => setBypassCountdown(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                    </label>
                  </div>

                  {/* Upload Logo Sekolah section */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 font-sans" id="admin-logo-upload-section">
                    <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
                      <Upload className="w-4 h-4 text-blue-950" />
                      <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider">Upload Logo Sekolah</h4>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* Preview Container */}
                      <div className="relative flex flex-col items-center justify-center border border-slate-200 bg-white p-2.5 rounded-xl shrink-0 w-24">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-mono">TAMPILAN</span>
                        <div className="w-16 h-16 rounded-lg bg-slate-50 flex items-center justify-center border border-dashed border-slate-300 overflow-hidden">
                          {adminLogoUrl ? (
                            <img src={adminLogoUrl} alt="Preview Logo" className="object-contain w-full h-full" referrerPolicy="no-referrer" />
                          ) : (
                            <SchoolLogo size={44} />
                          )}
                        </div>
                      </div>

                      {/* Input Action Panel */}
                      <div className="flex-1 w-full space-y-2">
                        <label 
                          className="w-full h-24 border-2 border-dashed border-slate-300 hover:border-blue-900/50 hover:bg-blue-50/20 rounded-xl flex flex-col items-center justify-center cursor-pointer transition p-2 text-center"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            const file = e.dataTransfer.files?.[0];
                            if (file) {
                              handleLogoFileChange(file);
                            }
                          }}
                        >
                          <div className="flex flex-col items-center justify-center">
                            <Upload className="w-5 h-5 text-slate-400 mb-1 animate-pulse" />
                            <span className="text-xs font-semibold text-slate-600">Klik atau seret gambar logo ke sini</span>
                            <span className="text-[9px] text-slate-400 mt-0.5">Format PNG, JPG, JPEG, WEBP atau SVG (Maks. 1MB)</span>
                          </div>
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleLogoFileChange(file);
                            }}
                          />
                        </label>

                        {adminLogoUrl && (
                          <button
                            type="button"
                            onClick={() => setAdminLogoUrl('')}
                            className="text-[10px] font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1 rounded-lg transition flex items-center gap-1 cursor-pointer"
                          >
                            <X className="w-3 h-3" /> Hapus Logo & Kembali ke Default
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1" htmlFor="admin-school-name">Nama Sekolah Dasar</label>
                    <input
                      id="admin-school-name"
                      type="text"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm font-semibold text-slate-800"
                      value={adminSchoolName}
                      onChange={(e) => setAdminSchoolName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1" htmlFor="admin-school-address">Alamat Sekolah</label>
                    <input
                      id="admin-school-address"
                      type="text"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm font-semibold text-slate-800"
                      value={adminSchoolAddress}
                      onChange={(e) => setAdminSchoolAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1" htmlFor="admin-sk-number">Format No. SKL</label>
                      <input
                        id="admin-sk-number"
                        type="text"
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm font-mono text-slate-800"
                        value={adminSkuNo}
                        onChange={(e) => setAdminSkuNo(e.target.value)}
                        required
                    />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1" htmlFor="admin-academic-year">Tahun Pelajaran</label>
                      <input
                        id="admin-academic-year"
                        type="text"
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm text-slate-800"
                        value={adminAcademicYear}
                        onChange={(e) => setAdminAcademicYear(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Interactive section for countdown settings */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3.5" id="admin-countdown-settings-section">
                    <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
                      <Clock className="w-4 h-4 text-blue-950" />
                      <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider">Pengaturan Waktu Hitung Mundur Rilis</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1" htmlFor="admin-countdown-picker">Pilih Tanggal & Jam (WIB)</label>
                        <input
                          id="admin-countdown-picker"
                          type="datetime-local"
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm font-semibold text-slate-800 cursor-pointer"
                          value={adminCountdownTarget ? adminCountdownTarget.substring(0, 16) : ''}
                          onChange={(e) => {
                            const val = e.target.value; // "YYYY-MM-DDTHH:MM"
                            if (val) {
                              setAdminCountdownTarget(val + ':00+07:00');
                            } else {
                              setAdminCountdownTarget('');
                            }
                          }}
                        />
                        <p className="text-[9px] text-slate-500 mt-0.5">Memudahkan pemilihan tanggal & jam lewat kalender.</p>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1" htmlFor="admin-countdown-target">Target Format ISO (WIB / Offset +07:00)</label>
                        <input
                          id="admin-countdown-target"
                          type="text"
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 text-xs font-mono text-slate-800 bg-white"
                          value={adminCountdownTarget}
                          onChange={(e) => setAdminCountdownTarget(e.target.value)}
                          placeholder="YYYY-MM-DDTHH:MM:SS+07:00"
                          required
                        />
                        <p className="text-[9px] text-slate-500 mt-0.5">Format data tersimpan: <code>YYYY-MM-DDTHH:MM:SS+07:00</code></p>
                      </div>
                    </div>

                    <div className="pt-1 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setAdminCountdownTarget('2026-06-02T10:30:00+07:00');
                          setAdminDateText('02 Juni 2026 pukul 10.30 WIB');
                        }}
                        className="px-2.5 py-1 text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-lg transition font-bold cursor-pointer"
                      >
                        ⚡ Pasang Waktu Rilis: 02 Juni 2026 (10.30 WIB)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1" htmlFor="admin-release-date">Tanggal Pengumuman (Teks Tampilan SKL)</label>
                      <input
                        id="admin-release-date"
                        type="text"
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm font-semibold text-slate-800"
                        value={adminDateText}
                        onChange={(e) => setAdminDateText(e.target.value)}
                        required
                      />
                    </div>
                    {/* Placeholder div to match spacing but not look cluttered */}
                    <div className="flex items-end text-slate-100 select-none pointer-events-none">.</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1" htmlFor="admin-principal-name">Nama Kepala Sekolah</label>
                      <input
                        id="admin-principal-name"
                        type="text"
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm font-semibold text-slate-800"
                        value={adminPrincipalName}
                        onChange={(e) => setAdminPrincipalName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1" htmlFor="admin-principal-nip">NIP Kepala Sekolah</label>
                      <input
                        id="admin-principal-nip"
                        type="text"
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 text-sm font-mono text-slate-800"
                        value={adminPrincipalNip}
                        onChange={(e) => setAdminPrincipalNip(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={handleAdminLogout}
                      className="px-3 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl transition cursor-pointer"
                    >
                      Keluar Admin
                    </button>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAdminModal(false)}
                        className="px-4 py-2 text-xs font-semibold border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition cursor-pointer"
                      >
                        Tutup
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-semibold bg-blue-900 hover:bg-blue-950 text-white rounded-xl transition cursor-pointer flex items-center gap-1.5"
                      >
                        <FileCheck className="w-4 h-4" />
                        Simpan Perubahan
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
