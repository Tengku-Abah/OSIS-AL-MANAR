"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Calendar, Newspaper, Users, ArrowRight, Star } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { GlowingButton } from '../components/ui/GlowingButton';
import Link from 'next/link';

// Animation Variations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-deep-navy">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(17,34,64,0.5),_rgba(2,12,27,1))]" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-gold/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-holographic-teal/10 rounded-full blur-3xl"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6 inline-block">
              <span className="py-1 px-3 rounded-full border border-neon-gold/50 text-neon-gold text-sm tracking-widest uppercase font-bold bg-neon-gold/10 backdrop-blur-md">
                The Guiding Light
              </span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold font-heading text-white mb-6 leading-tight">
              OSIS <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-gold to-orange-400">AL-MANAR</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto mb-10">
              Memancarkan cahaya kepemimpinan, menuntun inovasi, dan membangun masa depan generasi emas.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/about">
                <GlowingButton variant="primary" className="w-full md:w-auto">
                  Jelajahi AL-Manar <ArrowRight className="w-4 h-4" />
                </GlowingButton>
              </Link>
              <Link href="/calendar">
                <GlowingButton variant="secondary" className="w-full md:w-auto">
                  Lihat Agenda <Calendar className="w-4 h-4" />
                </GlowingButton>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 text-sm flex flex-col items-center gap-2"
        >
          <span className="uppercase tracking-widest text-[10px]">Scroll Down</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-neon-gold to-transparent"></div>
        </motion.div>
      </section>

      {/* 2. NEWS TICKER (GUIDANCE POST) */}
      <div className="bg-navy-lighter border-y border-white/5 py-3 overflow-hidden flex items-center relative z-20">
        <div className="bg-neon-gold text-deep-navy font-bold px-4 py-1 ml-4 rounded text-xs uppercase tracking-wider z-10 shadow-lg">
          Breaking News
        </div>
        <div className="whitespace-nowrap overflow-hidden flex-1 group">
          <div className="animate-[marquee_20s_linear_infinite] inline-block pl-4 text-slate-300 text-sm">
            <span className="mx-4">🚀 Pendaftaran Calon Ketua OSIS Periode 2026/2027 telah dibuka!</span>
            <span className="mx-4 text-neon-gold">•</span>
            <span className="mx-4">🏆 Selamat kepada Tim Futsal atas Juara 1 Liga Pelajar!</span>
            <span className="mx-4 text-neon-gold">•</span>
            <span className="mx-4">📅 Rapat Pleno OSIS akan dilaksanakan Jumat, 20 Desember 2025.</span>
          </div>
        </div>
      </div>

      {/* 3. HIGHLIGHTS / PILLARS */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-4">Pilar Cahaya</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Divisi dan program kerja yang menjadi pondasi pergerakan OSIS AL-Manar.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard hoverEffect className="group">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/40 transition-colors">
                <Star className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Kepemimpinan & Karakter</h3>
              <p className="text-slate-400 mb-4">Membentuk pemimpin berintegritas dan berbudi pekerti luhur melalui LDK dan mentoring.</p>
              <Link href="/organization" className="text-blue-400 text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                The Beacons <ArrowRight className="w-3 h-3" />
              </Link>
            </GlassCard>

            <GlassCard hoverEffect className="group">
              <div className="w-12 h-12 rounded-full bg-neon-gold/20 flex items-center justify-center mb-6 group-hover:bg-neon-gold/40 transition-colors">
                <Rocket className="w-6 h-6 text-neon-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Inovasi & Kreativitas</h3>
              <p className="text-slate-400 mb-4">Wadah pengembangan bakat siswa di bidang seni, teknologi, dan kewirausahaan modern.</p>
              <Link href="/organization" className="text-neon-gold text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                The Innovators <ArrowRight className="w-3 h-3" />
              </Link>
            </GlassCard>

            <GlassCard hoverEffect className="group">
              <div className="w-12 h-12 rounded-full bg-holographic-teal/20 flex items-center justify-center mb-6 group-hover:bg-holographic-teal/40 transition-colors">
                <Users className="w-6 h-6 text-holographic-teal" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Aksi Sosial & Lingkungan</h3>
              <p className="text-slate-400 mb-4">Gerakan nyata untuk masyarakat dan kelestarian adiwiyata sekolah yang berkelanjutan.</p>
              <Link href="/organization" className="text-holographic-teal text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
                The Guardians <ArrowRight className="w-3 h-3" />
              </Link>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* 4. IMPACT / TESTIMONIALS */}
      <section className="py-20 bg-navy-light/30 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-white mb-6">
                Suara Siswa <span className="text-neon-gold">.</span>
              </h2>
              <p className="text-slate-300 mb-8 text-lg">
                "OSIS AL-Manar bukan sekadar panitia acara, tapi keluarga yang mengajarkan saya arti tanggung jawab dan kolaborasi."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-600"></div>
                <div>
                  <h4 className="text-white font-bold">Ahmad Fulan</h4>
                  <p className="text-slate-400 text-sm">Ketua Kelas X-1</p>
                </div>
              </div>
            </div>
            <div className="flex-1 w-full relative h-[300px]">
              {/* Decorative elements simulating a futuristic dashboard */}
              <div className="absolute inset-0 border border-neon-gold/20 rounded-2xl bg-deep-navy/50 backdrop-blur-sm p-8">
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                  <span className="text-xs font-mono text-neon-gold">SYSTEM STATUS: ONLINE</span>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 bg-white/10 rounded w-3/4 animate-pulse"></div>
                  <div className="h-2 bg-white/10 rounded w-full animate-pulse delay-100"></div>
                  <div className="h-2 bg-white/10 rounded w-5/6 animate-pulse delay-200"></div>
                </div>
                <div className="mt-8 text-center">
                  <Link href="/suggestion">
                    <GlowingButton variant="outline" className="text-sm">
                      Kirim Aspirasi (Anonim)
                    </GlowingButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}