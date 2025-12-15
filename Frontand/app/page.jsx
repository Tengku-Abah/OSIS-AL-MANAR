"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Rocket, Calendar, Users, ArrowRight, Star, Quote, ChevronRight, Trophy } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { SectionWrapper } from '../components/ui/SectionWrapper';
import Link from 'next/link';
import Image from 'next/image'; // Assuming using Next image later, or just divs for now

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <div className="min-h-screen overflow-hidden">

      {/* 1. OFFICIAL HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-3/4 h-full bg-navy-light/30 skew-x-12 translate-x-1/4" />
          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-neon-gold/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Official Portal
            </div>

            <div>
              <h1 className="text-4xl md:text-6xl font-bold font-heading text-white leading-tight mb-2">
                OSIS <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-gold to-orange-400">AL-MANAR</span>
              </h1>
              <p className="text-2xl md:text-3xl font-light text-slate-300">
                Mewujudkan Generasi <span className="font-semibold text-white">Cerdas, Kreatif,</span> dan <span className="font-semibold text-white">Amanah.</span>
              </p>
            </div>

            <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
              Wadah resmi aspirasi dan kreativitas siswa SMA Al-Manar. Kami berkomitmen membangun lingkungan sekolah yang inklusif, prestatif, dan berlandaskan nilai-nilai luhur.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/program" className="px-8 py-4 rounded-lg bg-neon-gold text-deep-navy font-bold hover:bg-yellow-400 transition-all shadow-[0_4px_14px_0_rgba(255,215,0,0.39)]">
                Lihat Program Kerja
              </Link>
              <Link href="/about" className="px-8 py-4 rounded-lg border border-white/10 text-white font-medium hover:bg-white/5 transition-all flex items-center gap-2">
                Tentang Kami <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="pt-8 flex items-center gap-8 border-t border-white/5">
              <div>
                <h4 className="text-2xl font-bold text-white">25+</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Program Aktif</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">50+</h4>
                <p className="text-xs text-slate-500 uppercase tracking-widest">Pengurus</p>
              </div>
            </div>
          </motion.div>

          {/* Right: Featured Visual / Chairman */}
          <motion.div
            style={{ y: heroY }}
            className="relative hidden lg:block"
          >
            {/* Decorative Frame */}
            <div className="relative z-10 p-2 bg-gradient-to-br from-white/10 to-transparent rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="bg-navy-light rounded-xl overflow-hidden aspect-[4/3] relative flex items-center justify-center group">
                {/* Placeholder for Hero Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 to-transparent z-10" />
                <Users className="w-32 h-32 text-slate-700 group-hover:scale-110 transition-transform duration-700" />

                {/* Floating Card */}
                <div className="absolute bottom-6 left-6 right-6 z-20">
                  <GlassCard className="p-4" hoverEffect>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-neon-gold/20 flex items-center justify-center">
                        <Trophy className="w-6 h-6 text-neon-gold" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold">Prestasi Terbaru</h4>
                        <p className="text-sm text-slate-400">Juara Umum LKS Tingkat Provinsi 2025</p>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </div>

            {/* Backing shape */}
            <div className="absolute -inset-4 bg-neon-gold/20 blur-3xl -z-10 rounded-full opacity-30" />
          </motion.div>

        </div>
      </section>

      {/* 2. SAMBUTAN KETUA (Chairman's Welcome) */}
      <section className="py-20 bg-navy-light/30 border-y border-white/5">
        <div className="container mx-auto px-6">
          <SectionWrapper>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/3 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-b from-slate-700 to-deep-navy border-4 border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
                  <Users className="w-1/2 h-1/2 text-slate-600" /> {/* Placeholder Image */}
                </div>
              </div>
              <div className="md:w-2/3">
                <Quote className="w-12 h-12 text-neon-gold mb-6 opacity-50" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Sambutan Ketua OSIS</h2>
                <div className="space-y-4 text-slate-300 text-lg leading-relaxed">
                  <p>
                    "Assalamu'alaikum Wr. Wb. Selamat datang di website resmi OSIS Al-Manar. Platform ini kami dedikasikan sebagai jendela informasi sekaligus jembatan komunikasi antara pengurus, siswa, dan sekolah."
                  </p>
                  <p>
                    "Di periode ini, kami fokus pada pengembangan karakter berbasis teknologi dan akhlak. Mari bersama-sama kita jadikan Al-Manar sebagai pusat keunggulan."
                  </p>
                </div>
                <div className="mt-8">
                  <h4 className="text-neon-gold font-bold text-xl font-heading">Mustafa Raja Ungguli</h4>
                  <p className="text-slate-500">Ketua OSIS Periode 2025/2026</p>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* 3. PROGRAM UNGGULAN (Core Pillars - Structured) */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-2">Program Unggulan</h2>
              <div className="w-20 h-1 bg-neon-gold rounded-full" />
            </div>
            <Link href="/program" className="text-slate-400 hover:text-white flex items-center gap-2 mt-4 md:mt-0 group">
              Lihat Semua Program <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Leadership Camp", desc: "Pelatihan kepemimpinan intensif untuk membentuk karakter tangguh.", icon: Star },
              { title: "Tech & Art Festival", desc: "Ajang kreativitas siswa dalam teknologi dan seni budaya.", icon: Rocket },
              { title: "Al-Manar Mengabdi", desc: "Kegiatan sosial kemasyarakatan rutin setiap semester.", icon: Users }
            ].map((item, idx) => (
              <SectionWrapper key={idx} delay={idx * 0.2}>
                <div className="group relative bg-navy-light/50 border border-white/5 hover:border-neon-gold/30 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="w-14 h-14 rounded-xl bg-deep-navy border border-white/10 flex items-center justify-center mb-6 group-hover:bg-neon-gold group-hover:text-deep-navy transition-colors duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 mb-6 line-clamp-2">{item.desc}</p>
                  <span className="text-sm font-bold text-neon-gold flex items-center gap-2">
                    Detail Kegiatan <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AGENDA / BERITA */}
      <section className="py-24 bg-gradient-to-b from-deep-navy to-navy-light/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Berita & Agenda Terbaru</h2>
            <p className="text-slate-400">Ikuti perkembangan kegiatan terbaru di lingkungan OSIS Al-Manar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-deep-navy border border-white/5 rounded-xl overflow-hidden hover:border-white/20 transition-colors">
                <div className="h-40 bg-slate-800 relative">
                  {/* Placeholder Image */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded text-xs font-bold text-white uppercase">
                    Kegiatan
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-neon-gold font-bold mb-2 flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> 15 Des 2025
                  </div>
                  <h4 className="text-white font-bold mb-3 hover:text-blue-400 transition-colors cursor-pointer">
                    Dokumentasi Kegiatan Classmeeting Semester Ganjil
                  </h4>
                  <p className="text-slate-500 text-sm mb-4">
                    Rangkuman keseruan perlombaan antar kelas yang telah dilaksanakan...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}