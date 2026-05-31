import React, { useState, useEffect } from 'react';
import { WishEntry } from '../types';
import { MessageSquare, Send, User, Calendar, Heart, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SEED_WISHES: WishEntry[] = [
  {
    id: 'seed-1',
    name: 'Syamsul, S.Pd.',
    role: 'Guru',
    message: 'Selamat untuk seluruh siswa kelas VI atas kelulusannya 100%! Perjalanan kalian masih panjang. Tetap tekun, jujur, dan berbakti kepada orang tua di sekolah baru nanti.',
    timestamp: '30 Mei 2026, 14:20'
  },
  {
    id: 'seed-2',
    name: 'Bunda Alexa',
    role: 'Orang Tua',
    message: 'Alhamdulillah putri kami Alexa dan seluruh teman-temannya lulus dengan hasil membanggakan. Terima kasih yang tak terhingga kepada Bapak & Ibu guru hebat SDN Harapan Bangsa!',
    timestamp: '31 Mei 2026, 08:15'
  },
  {
    id: 'seed-3',
    name: 'Bayezid Al Qarni',
    role: 'Siswa',
    message: 'Terima kasih Bapak Ibu Guru! 6 tahun di SD tidak akan pernah terlupakan. Semoga kita semua suskes di SMP nanti dan tetap bersahabat!',
    timestamp: '31 Mei 2026, 09:30'
  }
];

export default function WishingWall() {
  const [wishes, setWishes] = useState<WishEntry[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [role, setRole] = useState<WishEntry['role']>('Siswa');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('school_wishes_v1');
    if (saved) {
      try {
        setWishes(JSON.parse(saved));
      } catch (e) {
        setWishes(SEED_WISHES);
      }
    } else {
      setWishes(SEED_WISHES);
      localStorage.setItem('school_wishes_v1', JSON.stringify(SEED_WISHES));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError('Mohon isi nama dan pesan harapan Anda.');
      return;
    }

    const newWish: WishEntry = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      role,
      message: message.trim(),
      timestamp: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('school_wishes_v1', JSON.stringify(updated));

    // Reset Form
    setName('');
    setMessage('');
    setError('');
  };

  const getRoleBadgeColor = (r: WishEntry['role']) => {
    switch (r) {
      case 'Guru': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Orang Tua': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Alumni': return 'bg-slate-100 text-slate-800 border-slate-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Wish Submission Form */}
      <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm self-start" id="wishing-form-container">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-50 text-blue-900 rounded-lg">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900">Kirim Ucapan</h3>
            <p className="text-xs text-slate-500">Beri selamat & doa untuk para lulusan</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-lg flex items-center gap-2 border border-red-200" id="form-error">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1" htmlFor="input-name">Nama Lengkap</label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-400" />
              <input
                id="input-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 block text-slate-800"
                maxLength={40}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1" id="label-role">Peran Anda</label>
            <div className="grid grid-cols-4 gap-1.5" id="role-select-grid">
              {(['Siswa', 'Orang Tua', 'Guru', 'Alumni'] as WishEntry['role'][]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`py-1.5 px-1 rounded-lg text-xs font-semibold border text-center transition ${
                    role === r
                      ? 'bg-blue-950 border-blue-950 text-white shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1" htmlFor="input-message">Pesan & Harapan</label>
            <textarea
              id="input-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis ucapan selamat, harapan masa depan, atau doa terbaikmu di sini..."
              rows={4}
              maxLength={250}
              className="w-full p-3 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-950 block text-slate-800 resize-none"
            />
            <div className="text-right text-[10px] text-slate-400 font-mono mt-1">
              {message.length}/250 karakter
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-950 text-white font-semibold py-2.5 rounded-xl hover:bg-blue-900 shadow-md transition"
            id="btn-submit-wish"
          >
            <Send className="w-4 h-4" />
            Kirim Ucapan Anda
          </button>
        </form>
      </div>

      {/* Wishes Feed List */}
      <div className="lg:col-span-2 space-y-4 max-h-[500px] overflow-y-auto pr-2" id="wishes-list-container">
        <AnimatePresence initial={false}>
          {wishes.map((w, index) => (
            <motion.div
              layout
              key={w.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-slate-150 rounded-2xl p-5 shadow-sm hover:shadow-md transition relative group"
            >
              <div className="flex justify-between items-start gap-4 mb-2.5">
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-950 transition-colors">{w.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getRoleBadgeColor(w.role)}`}>
                      {w.role}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      {w.timestamp}
                    </span>
                  </div>
                </div>
                <div className="p-1.5 bg-rose-50 text-rose-500 rounded-full">
                  <Heart className="w-3.5 h-3.5 fill-rose-50" />
                </div>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {w.message}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
