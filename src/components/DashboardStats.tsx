import React, { useState } from 'react';
import { Student, SchoolConfig } from '../types';
import { Search, GraduationCap, Users, TrendingUp, Trophy, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface StatsProps {
  students: Student[];
  config: SchoolConfig;
  onSelectStudent: (student: Student) => void;
}

export default function DashboardStats({ students, config, onSelectStudent }: StatsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate statistics
  const totalStudents = students.length;
  const graduatedCount = students.filter(s => s.keterangan === 'LULUS').length;
  const graduationRate = totalStudents ? ((graduatedCount / totalStudents) * 100).toFixed(1) : '0.0';

  // Filter students based on search term (name only, to encourage individual NISN lookup for privacy)
  const filteredStudents = students.filter(s =>
    s.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper to mask NIS/NISN for public listing privacy
  const maskNIS = (nis: string) => {
    if (nis.length <= 2) return nis;
    return `${nis.substring(0, 2)}**`;
  };

  const maskNISN = (nisn: string) => {
    if (nisn.length <= 3) return nisn;
    return `${nisn.substring(0, 3)}*******`;
  };

  return (
    <div className="space-y-8" id="stats-dashboard">
      {/* Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="stats-cards-grid">
        {/* Stat 1: Total Students */}
        <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-900 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider block">Total Siswa</span>
            <span className="text-xl sm:text-2xl font-bold text-slate-900">{totalStudents}</span>
          </div>
        </div>

        {/* Stat 2: Graduated */}
        <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider block">Lulus</span>
            <span className="text-xl sm:text-2xl font-bold text-slate-900">{graduatedCount}</span>
          </div>
        </div>

        {/* Stat 3: Percentage */}
        <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl shadow-sm flex items-center gap-4 col-span-2 sm:col-span-1">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider block">Persentase</span>
            <span className="text-xl sm:text-2xl font-bold text-slate-900">{graduationRate}%</span>
          </div>
        </div>

        {/* Stat 4: Achievement */}
        <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl shadow-sm flex items-center gap-4 col-span-2 sm:col-span-1">
          <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider block">Predikat</span>
            <span className="text-md sm:text-base font-extrabold text-indigo-905 uppercase leading-none truncate">SANGAT BAIK</span>
          </div>
        </div>
      </div>

      {/* Public Graduates List */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm" id="public-directory">
        {/* Module Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-lg">Daftar Kelulusan Kelas VI</h3>
            <p className="text-xs text-slate-500">Mencari nama teman untuk melihat status kelulusan bersama</p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama teman..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 text-slate-800"
            />
          </div>
        </div>

        {/* Graduates Table */}
        <div className="overflow-x-auto">
          {filteredStudents.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-6 w-16 text-center">No</th>
                  <th className="py-3.5 px-6">Nama Siswa</th>
                  <th className="py-3.5 px-6">NIS (Masked)</th>
                  <th className="py-3.5 px-6">NISN (Masked)</th>
                  <th className="py-3.5 px-6 text-center w-36">Kelulusan</th>
                  <th className="py-3.5 px-6 text-right w-24">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((student, i) => (
                  <tr key={student.no} className="hover:bg-slate-50/50 transition duration-150">
                    <td className="py-4 px-6 text-center text-xs font-mono text-slate-400">
                      {student.no}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-800 uppercase tracking-wide text-xs sm:text-sm">
                        {student.nama}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-xs font-mono text-slate-500">
                      {maskNIS(student.nis)}
                    </td>
                    <td className="py-4 px-6 text-xs font-mono text-slate-500">
                      {maskNISN(student.nisn)}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex px-3 py-1 font-bold text-[10px] tracking-wider uppercase rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {student.keterangan}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => onSelectStudent(student)}
                        className="p-1 px-2.5 bg-blue-50 hover:bg-blue-950 text-blue-900 hover:text-white rounded-lg transition duration-200 text-xs font-bold flex items-center gap-1 inline-flex"
                        title="Verifikasi Resmi dengan NISN"
                      >
                        Pesan
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center text-slate-400 flex flex-col items-center justify-center gap-2">
              <GraduationCap className="w-12 h-12 text-slate-300 stroke-[1.5]" />
              <p className="text-sm">Tidak ada siswa bernama &ldquo;{searchTerm}&rdquo;</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
