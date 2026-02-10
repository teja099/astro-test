"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Moon, Sun, MessageCircle, User, Compass, Zap, Search, Bell, MapPin, Calendar, Clock, Hash } from 'lucide-react';
import { calculateKundali, PlanetPosition } from '@/lib/vedic';
// import KundaliChart from '@/components/KundaliChart';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type UserData = {
    name: string;
    dob: string;
    time: string;
};

export default function Home() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const [kundali, setKundali] = useState<any>(null);

    // Form State
    const [tempName, setTempName] = useState('');
    const [tempDob, setTempDob] = useState('');
    const [tempTime, setTempTime] = useState('');

    useEffect(() => {
        const saved = localStorage.getItem('cosmic_user');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setUserData(parsed);
                updateKundali(parsed);
            } catch (e) {
                console.error("Failed to parse user data", e);
                localStorage.removeItem('cosmic_user');
            }
        }
        setIsLoaded(true);
    }, []);

    const updateKundali = (data: UserData) => {
        const fullDate = new Date(`${data.dob}T${data.time}:00Z`);
        const results = calculateKundali(fullDate, 28.6139, 77.2090, data.dob);
        setKundali(results);
    };

    const handleOnboarding = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser: UserData = {
            name: tempName,
            dob: tempDob,
            time: tempTime,
        };
        localStorage.setItem('cosmic_user', JSON.stringify(newUser));
        setUserData(newUser);
        updateKundali(newUser);
    };

    if (!isLoaded) return null;

    if (!userData) {
        return (
            <div className="min-h-screen bg-indigo-950 text-white flex flex-col items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md space-y-8"
                >
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-gold-400 rounded-2xl mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.5)] mb-6">
                            <Sparkles size={32} className="text-black" />
                        </div>
                        <h1 className="text-4xl font-serif font-bold tracking-tight text-gold-400">CosmicVibe</h1>
                        <p className="text-white/60 text-sm">Where your stars find their frequency.</p>
                    </div>

                    <form onSubmit={handleOnboarding} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-white/40 ml-2">Your Name</label>
                            <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl focus-within:border-gold-400/50 transition-colors">
                                <User size={18} className="text-white/30" />
                                <input
                                    required
                                    value={tempName}
                                    onChange={e => setTempName(e.target.value)}
                                    placeholder="e.g. Aryan"
                                    className="bg-transparent outline-none w-full placeholder:text-white/20"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-white/40 ml-2">Birth Date</label>
                                <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <Calendar size={18} className="text-white/30" />
                                    <input
                                        required
                                        type="date"
                                        value={tempDob}
                                        onChange={e => setTempDob(e.target.value)}
                                        className="bg-transparent outline-none w-full [color-scheme:dark]"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-white/40 ml-2">Birth Time</label>
                                <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                                    <Clock size={18} className="text-white/30" />
                                    <input
                                        required
                                        type="time"
                                        value={tempTime}
                                        onChange={e => setTempTime(e.target.value)}
                                        className="bg-transparent outline-none w-full [color-scheme:dark]"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 bg-gold-400 text-black font-black uppercase tracking-widest rounded-2xl shadow-[0_10px_30px_rgba(255,215,0,0.3)] hover:translate-y-[-2px] active:translate-y-[0] transition-all"
                        >
                            Align My Stars →
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    if (!kundali) return null;

    return (
        <div className="min-h-screen bg-indigo-950 text-white font-sans selection:bg-gold-400/30">
            <main className="max-w-md mx-auto px-6 pt-12 pb-32 flex flex-col gap-8">
                {/* Header */}
                <header className="flex justify-between items-center bg-white/5 backdrop-blur-md sticky top-4 z-40 p-4 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gold-400 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.4)]">
                            <Sparkles size={18} className="text-black" />
                        </div>
                        <div>
                            <h1 className="text-xl font-serif text-white font-bold leading-none">Hi, {userData.name}</h1>
                            <p className="text-[10px] text-white/40 font-black uppercase tracking-widest mt-1">Manifesting Today</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => { localStorage.clear(); window.location.reload(); }}
                            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-red-500/20"
                            title="Reset Profile"
                        >
                            <Zap size={18} className="text-white/60" />
                        </button>
                    </div>
                </header>

                {/* Daily Vibe Card */}
                <motion.section
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-6 rounded-[2rem] relative overflow-hidden flex flex-col gap-4 border-gold-400/20"
                >
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 blur-[80px] rounded-full" />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="px-2 py-1 rounded-md bg-gold-400 text-black text-[10px] font-black uppercase tracking-tighter">
                                {userData.name}'s Cosmic Day
                            </div>
                        </div>
                        <div className="text-xs text-white/40 font-mono italic">Synchronized</div>
                    </div>

                    <div>
                        <h2 className="text-4xl font-serif font-bold tracking-tight text-glow">High Frequency ✨</h2>
                        <p className="text-white/70 text-base leading-relaxed mt-3">
                            Your stars are aligned for a deep creative breakthrough. Focus on your {kundali.sanskritRashiNames[kundali.lagnRashi]} strengths today. Avoid the noise.
                        </p>
                    </div>
                </motion.section>

                {/* Life Path Card */}
                {kundali.lifePath && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass p-6 rounded-[2rem] border-white/5 flex flex-col gap-4 relative overflow-hidden bg-gradient-to-br from-white/5 to-transparent shadow-2xl"
                    >
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 blur-[50px] rounded-full" />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black uppercase text-gold-400 tracking-[0.2em] opacity-80">Life Path Code</span>
                            </div>
                            <div className="flex items-center gap-1 bg-gold-400/10 px-3 py-1 rounded-full border border-gold-400/20">
                                <Hash size={12} className="text-gold-400" />
                                <span className="text-xl font-serif font-bold text-gold-400 leading-none">{kundali.lifePath.number}</span>
                            </div>
                        </div>

                        <div className="mt-2">
                            <h3 className="text-2xl font-serif font-bold text-white tracking-tight">{kundali.lifePath.title}</h3>
                            <p className="text-sm text-white/60 font-sans italic mt-1 font-medium">Your core essence & purpose</p>
                        </div>

                        <p className="text-sm text-white/80 leading-relaxed font-sans mt-2 bg-white/5 p-4 rounded-2xl border border-white/5 shadow-inner">
                            "{kundali.lifePath.vibe}"
                        </p>
                    </motion.section>
                )}

                {/* Soul Star (Nakshatra) Card */}
                {/* ... existing code ... */}

                {/* Cosmic Wardrobe & Lifestyle */}
                {kundali.lifestyle && (
                    <motion.section
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 }}
                        className="glass p-6 rounded-[2rem] border-white/5 flex flex-col gap-6 relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase text-gold-400 tracking-[0.2em] opacity-80">Daily Aesthetic</span>
                            <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold text-white/40 uppercase">
                                Planet: {['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'][new Date().getDay()]}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-3">
                                <div className="space-y-1">
                                    <span className="text-[9px] text-white/30 font-black uppercase tracking-widest">Power Palette</span>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-4 h-4 rounded-full border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                                            style={{ backgroundColor: kundali.lifestyle.colorHex }}
                                        />
                                        <span className="text-sm font-bold text-white/90">{kundali.lifestyle.color}</span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] text-white/30 font-black uppercase tracking-widest">OOTD Vibe</span>
                                    <p className="text-sm font-bold text-gold-400">{kundali.lifestyle.aesthetic}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="space-y-1">
                                    <span className="text-[9px] text-white/30 font-black uppercase tracking-widest">Accessory</span>
                                    <p className="text-sm font-bold text-white/90">{kundali.lifestyle.accessory}</p>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] text-white/30 font-black uppercase tracking-widest">Micro-Ritual</span>
                                    <p className="text-sm font-bold text-white/90">{kundali.lifestyle.ritual}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center text-xl">
                                👗
                            </div>
                            <p className="text-xs text-white/60 leading-tight">
                                Wear your power color today to align with the <span className="text-gold-400 font-bold">{['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'][new Date().getDay()]}</span> frequency.
                            </p>
                        </div>
                    </motion.section>
                )}


                {/* Quick Rashi Stats */}
                <section className="grid grid-cols-2 gap-4">
                    <div className="p-5 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col gap-1 hover:bg-white/10 transition-colors">
                        <span className="text-[9px] text-white/30 font-black uppercase tracking-widest">Lagn (Rising)</span>
                        <div className="flex items-end gap-1">
                            <span className="text-xl font-serif text-gold-400 font-bold">{kundali.sanskritRashiNames[kundali.lagnRashi]}</span>
                            <span className="text-[10px] text-white/20 mb-1 italic font-medium">({kundali.rashiNames[kundali.lagnRashi]})</span>
                        </div>
                    </div>
                    <div className="p-5 rounded-[2.5rem] bg-white/5 border border-white/10 flex flex-col gap-1 hover:bg-white/10 transition-colors">
                        <span className="text-[9px] text-white/30 font-black uppercase tracking-widest">Rashi (Moon)</span>
                        <div className="flex items-end gap-1">
                            <span className="text-xl font-serif text-gold-400 font-bold">
                                {kundali.sanskritRashiNames[kundali.positions.find((p: any) => p.name === 'Moon')?.rashi || 0]}
                            </span>
                            <span className="text-[10px] text-white/20 mb-1 italic font-medium">
                                ({kundali.rashiNames[kundali.positions.find((p: any) => p.name === 'Moon')?.rashi || 0]})
                            </span>
                        </div>
                    </div>
                </section>

                {/* Daily Luck Meter */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="glass p-8 rounded-[2.5rem] border-white/5 flex flex-col gap-6 relative overflow-hidden bg-gradient-to-b from-white/5 to-transparent"
                >
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-black uppercase text-gold-400 tracking-[0.2em] opacity-80">Daily Luck Meter</span>
                            <h3 className="text-2xl font-serif font-bold text-white">Your Frequency</h3>
                        </div>
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                            <Zap size={24} className="text-gold-400" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            { label: 'Overall Vibe', score: 88, color: 'bg-gold-400' },
                            { label: 'Hustle (Career)', score: 72, color: 'bg-purple-500' },
                            { label: 'Social Battery', score: 94, color: 'bg-blue-400' },
                            { label: 'Focus Level', score: 65, color: 'bg-emerald-400' },
                        ].map((stat, i) => (
                            <div key={stat.label} className="space-y-2">
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                                    <span className="text-white/40">{stat.label}</span>
                                    <span className="text-white/80">{stat.score}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${stat.score}%` }}
                                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                        className={cn("h-full rounded-full shadow-[0_0_10px_rgba(255,215,0,0.3)]", stat.color)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-[11px] text-white/30 text-center italic mt-2">
                        Updated every 24 hours based on planetary transits.
                    </p>
                </motion.section>

            </main>
        </div>
    );
}


