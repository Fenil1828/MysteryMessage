'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Mail, LogOut, LogIn, Menu, X } from 'lucide-react';
import { User } from 'next-auth';
import { SignOutModal } from './SignOutModal';

function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signOutModalOpen, setSignOutModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const initial = (user?.username || user?.email || 'U')[0].toUpperCase();

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'bg-white/97 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,0,0,0.08)] border-b border-stone-200/60'
            : 'bg-[#faf8f4]/85 backdrop-blur-sm border-b border-amber-200/20'
        }`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* ── Main bar ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 h-[60px] sm:h-[66px] md:h-[68px] flex items-center justify-between gap-4">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 flex-shrink-0 group no-underline">

            {/* Icon badge */}
            <div className="
    relative
    w-8 h-8 sm:w-9 sm:h-9
    rounded-[9px]
    flex items-center justify-center
    bg-amber-600
    shadow-[0_2px_8px_rgba(217,119,6,0.35)]
    transition-all duration-300
    group-hover:shadow-[0_4px_16px_rgba(217,119,6,0.5)]
    group-hover:scale-105
    overflow-hidden
  ">
              {/* Subtle inner highlight */}
              <span className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
              <Mail size={15} strokeWidth={2} className="text-white relative z-10" />
            </div>

            {/* Wordmark */}
            <div className="flex flex-col justify-center leading-none">
              <span
                className="text-stone-900 tracking-[0.01em] leading-[1.1]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  fontStyle: 'italic',
                  fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
                }}
              >
                Anonyms
              </span>
              <span
                className="text-amber-600 tracking-[0.18em] uppercase leading-[1.1]"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: 'clamp(0.52rem, 1vw, 0.6rem)',
                  letterSpacing: '0.22em',
                }}
              >
                Message
              </span>
            </div>

          </a>

          {/* Center rule — desktop only */}
          <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3 flex-shrink-0">
            {session ? (
              <>
                <div className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-full border border-amber-200 bg-amber-50 shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[11px] font-semibold text-white flex-shrink-0">
                    {initial}
                  </div>
                  <span className="text-stone-600 text-[0.8rem] font-normal max-w-[140px] truncate">
                    {user?.username || user?.email}
                  </span>
                </div>
                <button
                  onClick={() => setSignOutModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-md border border-stone-200 bg-white text-stone-500 text-[0.8rem] font-medium tracking-wide transition-all duration-200 hover:text-stone-800 hover:border-stone-300 hover:bg-stone-50 hover:shadow-sm cursor-pointer"
                >
                  <LogOut size={13} />
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/sign-in"
                className="flex items-center gap-2 px-5 py-2.5 rounded-md bg-stone-900 text-amber-50 text-[0.82rem] font-medium tracking-wide no-underline transition-all duration-200 hover:-translate-y-px hover:bg-stone-800 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]"
              >
                <LogIn size={13} />
                Sign in
              </Link>
            )}
          </div>

          {/* Mobile: avatar + hamburger */}
          <div className="flex md:hidden items-center gap-2 flex-shrink-0">
            {session && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[11px] font-semibold text-white">
                {initial}
              </div>
            )}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="w-9 h-9 flex items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 shadow-sm transition-all duration-200 hover:bg-stone-50"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pb-4 pt-1 border-t border-stone-100 flex flex-col gap-2">
            {session ? (
              <>
                <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-amber-100 bg-amber-50">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-[11px] font-semibold text-white flex-shrink-0">
                    {initial}
                  </div>
                  <span className="text-stone-700 text-[0.82rem] font-normal truncate">
                    {user?.username || user?.email}
                  </span>
                </div>
                <button
                  onClick={() => { setSignOutModalOpen(true); setMobileOpen(false); }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-stone-200 bg-white text-stone-600 text-[0.83rem] font-medium transition-all duration-200 hover:bg-stone-50 cursor-pointer"
                >
                  <LogOut size={13} />
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/sign-in"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-stone-900 text-amber-50 text-[0.83rem] font-medium no-underline transition-all duration-200 hover:bg-stone-800"
              >
                <LogIn size={13} />
                Sign in
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-[60px] sm:h-[66px] md:h-[68px]" />

      {/* Sign Out Modal */}
      <SignOutModal
        isOpen={signOutModalOpen}
        onClose={() => setSignOutModalOpen(false)}
        username={user?.username}
        email={user?.email}
      />
    </>
  );
}

export default Navbar;