'use client';

import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { LogOut, X } from 'lucide-react';

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  username?: string;
  email?: string;
}

export function SignOutModal({ isOpen, onClose, username, email }: SignOutModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-stone-200/50 max-w-sm w-full transform transition-all duration-200 animate-in fade-in scale-95">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200/30">
            <h2 className="text-lg font-semibold text-stone-900">Account</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors duration-200"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-4">
            
            {/* User Info */}
            <div className="bg-gradient-to-br from-amber-50 to-stone-50 rounded-xl p-4 border border-amber-200/30">
              <div className="space-y-3">
                {username && (
                  <div>
                    <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                      Username
                    </p>
                    <p className="text-sm font-medium text-stone-900 mt-1 break-all">
                      {username}
                    </p>
                  </div>
                )}
                
                {email && (
                  <div>
                    <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                      Email
                    </p>
                    <p className="text-sm font-medium text-stone-900 mt-1 break-all">
                      {email}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium text-sm transition-all duration-200 hover:from-red-600 hover:to-red-700 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-smooth-spin" />
                  <span>Signing out...</span>
                </>
              ) : (
                <>
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </>
              )}
            </button>

            {/* Cancel Button */}
            <button
              onClick={onClose}
              disabled={isLoading}
              className="w-full px-4 py-2.5 rounded-lg border border-stone-200 bg-white text-stone-700 font-medium text-sm transition-all duration-200 hover:bg-stone-50 hover:border-stone-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
