'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, Lock, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import messages from '@/messages.json';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function Home() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const features = [
    {
      icon: <ShieldCheck size={18} />,
      title: 'Zero-trace privacy',
      desc: 'Senders are never identified. No IP logs, no accounts required — pure protected expression.',
    },
    {
      icon: <Mail size={18} />,
      title: 'Your personal link',
      desc: 'Share one unique URL. Anyone can leave you a message without revealing their identity.',
    },
    {
      icon: <Zap size={18} />,
      title: 'AI-powered insights',
      desc: 'Smart summaries surface patterns in your feedback so you learn more, effortlessly.',
    },
  ];

  const anim = (delay = 0) =>
    `transition-all duration-700 ${delay ? `delay-[${delay}ms]` : ''} ${
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
    }`;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div
        className="min-h-screen bg-[#faf8f4] text-stone-900 overflow-x-hidden"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >

        {/* Warm grid background */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(180,160,100,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(180,160,100,0.06) 1px, transparent 1px)',
            backgroundSize: '52px 52px',
          }}
        />
        {/* Ambient glows */}
        <div
          className="fixed top-0 right-0 w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] pointer-events-none z-0 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)' }}
        />
        <div
          className="fixed bottom-0 left-0 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] pointer-events-none z-0 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.06) 0%, transparent 70%)' }}
        />

        <main className="relative z-10">

          {/* ══════════════════════════════
              HERO SECTION
          ══════════════════════════════ */}
          <section className="
  min-h-[calc(100vh-60px)] sm:min-h-[calc(100vh-66px)] md:min-h-[calc(100vh-68px)]
  flex flex-col items-center justify-center text-center
  px-5 sm:px-8 md:px-12
  pt-6 pb-8
  sm:pt-14 sm:pb-16
  relative overflow-hidden
">

            {/* Floating envelopes — tablet+ only */}
            <div className="hidden sm:block absolute top-[12%] right-[5%] opacity-[0.05] animate-[float_6s_ease-in-out_infinite] pointer-events-none">
              <Mail size={64} className="text-amber-500" />
            </div>
            <div className="hidden md:block absolute bottom-[20%] left-[4%] opacity-[0.04] animate-[float_7s_ease-in-out_2s_infinite] pointer-events-none">
              <Mail size={48} className="text-amber-500" />
            </div>
            <div className="hidden lg:block absolute top-[50%] right-[10%] opacity-[0.03] animate-[float_8s_ease-in-out_4s_infinite] pointer-events-none">
              <Mail size={32} className="text-amber-500" />
            </div>

            {/* Eyebrow pill */}
            <div className={`
    inline-flex items-center gap-1.5 sm:gap-2
    px-3.5 py-1.5 sm:px-5 sm:py-2
    rounded-full border border-amber-300/60 bg-amber-50 text-amber-700
    text-[9px] sm:text-[11px] font-medium tracking-[0.14em] uppercase
    mb-5 sm:mb-9
    shadow-sm
    ${anim(0)}
  `}>
              <Sparkles size={9} className="sm:hidden" />
              <Sparkles size={11} className="hidden sm:block" />
              Your identity, always protected
            </div>

            {/* Headline — merged on mobile, split on sm+ */}
            <h1
              className={`font-black tracking-tight mb-3 sm:mb-5 ${anim(100)}`}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 7.5vw, 5.5rem)',
                lineHeight: 1.06,
              }}
            >
              {/* Mobile: all one line flow */}
              <span className="sm:hidden">
                Speak freely,{' '}
                stay{' '}
                <em className="not-italic relative inline-block text-amber-600">
                  anonymous
                  <span
                    className="absolute bottom-0 left-0 w-full h-[2px] rounded-full"
                    style={{ background: 'linear-gradient(90deg, #d97706, transparent)' }}
                  />
                </em>
                .
              </span>

              {/* Tablet+: two-line layout */}
              <span className="hidden sm:inline">
                Speak freely.
                <br />
                Stay{' '}
                <em className="not-italic relative inline-block text-amber-600">
                  anonymous
                  <span
                    className="absolute bottom-1 left-0 w-full h-[3px] rounded-full"
                    style={{ background: 'linear-gradient(90deg, #d97706, transparent)' }}
                  />
                </em>
                .
              </span>
            </h1>

            {/* Subheading */}
            <p
              className={`
      text-stone-500 font-light mx-auto leading-[1.68]
      max-w-[360px] sm:max-w-[480px]
      text-[0.84rem] sm:text-[0.98rem] md:text-[1.05rem]
      mb-7 sm:mb-11
      ${anim(200)}
    `}
            >
              A refined space to send and receive honest messages — without the weight of identity.
              {/* Extra phrase hidden on tiny screens */}
              <span className="hidden xs:inline"> Real feedback, real connection, zero exposure.</span>
              <span className="xs:hidden"> Zero exposure, real connection.</span>
            </p>

            {/* CTA buttons */}
            <div className={`
    flex flex-col sm:flex-row items-center justify-center
    gap-2.5 sm:gap-4
    mb-8 sm:mb-14
    w-full max-w-[280px] sm:max-w-none
    ${anim(300)}
  `}>
              <Link
                href="/sign-up"
                className="
        flex items-center justify-center gap-2
        w-full sm:w-auto
        px-6 py-2.5 sm:px-7 sm:py-3.5
        rounded-lg bg-stone-900 text-amber-50
        text-[0.82rem] sm:text-[0.88rem] font-medium tracking-wide
        no-underline transition-all duration-200
        hover:-translate-y-0.5 hover:bg-stone-800
        hover:shadow-[0_10px_28px_rgba(0,0,0,0.16)]
      "
              >
                Get your link
                <ArrowRight size={13} />
              </Link>
              <Link
                href="/sign-in"
                className="
        flex items-center justify-center gap-2
        w-full sm:w-auto
        px-6 py-2.5 sm:px-6 sm:py-3.5
        rounded-lg border border-stone-200 bg-white text-stone-700
        text-[0.82rem] sm:text-[0.88rem] font-medium tracking-wide
        no-underline transition-all duration-200
        hover:border-stone-300 hover:bg-stone-50 hover:shadow-sm
      "
              >
                <Lock size={12} />
                Sign in
              </Link>
            </div>

            {/* Stats row */}
            <div className={`flex items-center gap-5 sm:gap-10 md:gap-14 ${anim(400)}`}>
              {[
                { num: '2.4M', label: 'Messages sent' },
                { num: '100%', label: 'Anonymous' },
                { num: '256-bit', label: 'Encrypted' },
              ].map((s, i) => (
                <React.Fragment key={s.label}>
                  {i > 0 && <div className="w-px h-7 sm:h-10 bg-stone-200" />}
                  <div className="text-center">
                    <div
                      className="text-stone-900 leading-none mb-1"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(1.1rem, 3.5vw, 1.8rem)',
                        fontWeight: 700,
                      }}
                    >
                      {s.num}
                    </div>
                    <div className="text-[8px] sm:text-[10px] text-stone-400 uppercase tracking-[0.1em] sm:tracking-[0.14em]">
                      {s.label}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-4 sm:bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-20 pointer-events-none">
              <div
                className="w-px h-7 sm:h-10 rounded-full"
                style={{ background: 'linear-gradient(to bottom, transparent, #d97706)' }}
              />
            </div>

          </section>

          {/* ══════════════════════════════
              MESSAGES CAROUSEL
          ══════════════════════════════ */}
          <section className="py-14 sm:py-18 md:py-24 px-5 sm:px-8 md:px-12 bg-white/60 border-y border-stone-100">
            <div className="text-center mb-10 sm:mb-12 md:mb-14">
              <p className="text-amber-600 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.22em] font-medium mb-3 sm:mb-4">
                — What people are saying —
              </p>
              <h2
                className="text-stone-900 leading-tight tracking-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                  fontWeight: 700,
                }}
              >
                Real messages.{' '}
                <em className="not-italic text-amber-600">Real impact.</em>
              </h2>
            </div>

            <div className="max-w-lg sm:max-w-xl mx-auto relative">
              <Carousel plugins={[Autoplay({ delay: 3000 })]} className="w-full">
                <CarouselContent>
                  {messages.map((message, index) => (
                    <CarouselItem key={index} className="px-1.5 sm:px-2 py-2 sm:py-3">
                      <div className="rounded-xl sm:rounded-2xl border border-stone-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.07)] overflow-hidden hover:-translate-y-0.5 sm:hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] transition-all duration-300">
                        <div
                          className="h-[3px] w-full"
                          style={{ background: 'linear-gradient(90deg, #d97706, #fbbf24, transparent)' }}
                        />
                        <div className="px-5 sm:px-7 py-5 sm:py-6">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-amber-600 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em]">
                              Anonymous
                            </span>
                            <span className="text-stone-400 text-[10px] sm:text-[11px]">
                              {message.received}
                            </span>
                          </div>
                          <h3
                            className="text-stone-900 mb-2.5 leading-snug"
                            style={{
                              fontFamily: "'Playfair Display', serif",
                              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                              fontWeight: 700,
                            }}
                          >
                            {message.title}
                          </h3>
                          <p className="text-stone-500 text-[0.84rem] sm:text-[0.9rem] leading-[1.7] font-light">
                            {message.content}
                          </p>
                          <div className="flex items-center gap-2.5 mt-5 pt-4 border-t border-stone-100">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                              <Mail size={13} className="text-amber-500 sm:hidden" />
                              <Mail size={14} className="text-amber-500 hidden sm:block" />
                            </div>
                            <span className="text-stone-400 text-[10px] sm:text-[11px] italic">
                              Received anonymously
                            </span>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex items-center justify-center gap-3 mt-6 sm:mt-8">
                  <CarouselPrevious className="static translate-y-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-stone-200 bg-white text-stone-500 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50 shadow-sm transition-all duration-200" />
                  <CarouselNext className="static translate-y-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-stone-200 bg-white text-stone-500 hover:border-amber-300 hover:text-amber-600 hover:bg-amber-50 shadow-sm transition-all duration-200" />
                </div>
              </Carousel>
            </div>
          </section>

          {/* ══════════════════════════════
              FEATURES
          ══════════════════════════════ */}
          <section className="py-14 sm:py-18 md:py-24 px-5 sm:px-8 md:px-12 max-w-5xl mx-auto">
            <div className="text-center mb-10 sm:mb-12 md:mb-14">
              <p className="text-amber-600 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium mb-3 sm:mb-4">
                — Why Anonyms Message —
              </p>
              <h2
                className="text-stone-900 leading-tight tracking-tight"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.6rem)',
                  fontWeight: 700,
                }}
              >
                Built for honest conversations.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="group rounded-xl sm:rounded-2xl border border-stone-100 bg-white p-6 sm:p-7 md:p-8 shadow-[0_2px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_36px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 sm:hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-amber-200 bg-amber-50 text-amber-600 flex items-center justify-center mb-5 shadow-sm group-hover:border-amber-300 group-hover:bg-amber-100 transition-all duration-200">
                      {f.icon}
                    </div>
                    <h3
                      className="text-stone-900 mb-2.5"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 'clamp(0.98rem, 2vw, 1.1rem)',
                        fontWeight: 700,
                      }}
                    >
                      {f.title}
                    </h3>
                    <p className="text-stone-500 text-[0.83rem] sm:text-[0.87rem] leading-[1.68] font-light">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════
              CTA BANNER
          ══════════════════════════════ */}
          <section className="mx-4 sm:mx-6 md:mx-10 lg:mx-12 mb-14 sm:mb-18 md:mb-24 rounded-2xl sm:rounded-3xl bg-stone-900 px-6 sm:px-10 py-12 sm:py-14 md:py-16 text-center relative overflow-hidden shadow-[0_20px_56px_rgba(0,0,0,0.14)]">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.11) 0%, transparent 60%)' }}
            />
            <div className="relative z-10">
              <p className="text-amber-400 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-medium mb-3 sm:mb-4">
                Start today
              </p>
              <h2
                className="text-amber-50 leading-tight mb-3 sm:mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.35rem, 3.5vw, 2.6rem)',
                  fontWeight: 700,
                }}
              >
                Ready to hear what people{' '}
                <em className="not-italic text-amber-400">really</em> think?
              </h2>
              <p className="text-stone-400 font-light text-[0.85rem] sm:text-[0.92rem] max-w-sm sm:max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed">
                Create your free anonymous link in seconds. No credit card required.
              </p>
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg bg-amber-500 text-stone-900 text-[0.84rem] sm:text-[0.88rem] font-medium tracking-wide no-underline transition-all duration-200 hover:-translate-y-0.5 hover:bg-amber-400 hover:shadow-[0_8px_24px_rgba(251,191,36,0.32)]"
              >
                Get your free link
                <ArrowRight size={14} />
              </Link>
            </div>
          </section>

        </main>

        {/* ── FOOTER ── */}
        <footer className="border-t border-stone-200 bg-white px-5 sm:px-8 md:px-12 py-7 sm:py-8 md:py-10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center bg-amber-600 shadow-sm transition-all duration-300 hover:shadow-[0_2px_8px_rgba(217,119,6,0.35)]">
                <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none rounded-lg" />
                <Mail size={13} className="text-white relative z-10" />
              </div>
              <div className="flex flex-col justify-center leading-none">
                <span
                  className="text-stone-800 leading-[1.1]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 900,
                    fontStyle: 'italic',
                    fontSize: 'clamp(0.8rem, 1.5vw, 0.95rem)',
                  }}
                >
                  Anonyms
                </span>
                <span
                  className="text-amber-600 uppercase leading-[1.1]"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: 'clamp(0.42rem, 0.8vw, 0.5rem)',
                    letterSpacing: '0.18em',
                  }}
                >
                  Message
                </span>
              </div>
            </div>
            <p className="text-stone-400 text-[0.72rem] sm:text-[0.78rem] tracking-wide text-center sm:text-right">
              © 2026 Anonyms Message. All rights reserved.
            </p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
      `}</style>
    </>
  );
}