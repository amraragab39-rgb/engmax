import React, { useEffect, useRef, useState } from 'react';

interface SplashScreenProps {
  onReady: () => void;
  logoSrc?: string;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onReady, logoSrc }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [progress, setProgress] = useState(0);
  const titleRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Initial fade in + pulse animation (mirrors DuoCards splash)
    const t1 = setTimeout(() => {
      if (titleRef.current) {
        titleRef.current.style.opacity = '1';
        titleRef.current.style.animation = 'pulse 2s infinite';
      }
    });

    // Simulate app loading progress
    let p = 0;
    const interval = setInterval(() => {
      p = Math.min(p + Math.random() * 18, 95);
      setProgress(p);
    }, 300);

    // After a short "load", hide loader and mark ready
    const t2 = setTimeout(() => {
      setShowLoader(true);
    }, 1200);

    const t3 = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setShowLoader(false);
      onReady();
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, [onReady]);

  // 15s timeout → show error / retry (like DuoCards)
  useEffect(() => {
    const t = setTimeout(() => {
      setShowError(true);
    }, 15000);
    return () => clearTimeout(t);
  }, []);

  const handleRetry = () => {
    setShowError(false);
    setProgress(0);
    setShowLoader(false);
    let p = 0;
    const interval = setInterval(() => {
      p = Math.min(p + Math.random() * 20, 95);
      setProgress(p);
    }, 200);
    const t = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      onReady();
    }, 1800);
    return () => {
      clearTimeout(t);
      clearInterval(interval);
    };
  };

  const pulse = `
    @keyframes engmax-pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `;

  return (
    <div
      id="engmax-splash"
      className="fixed inset-0 z-50 bg-white dark:bg-[#0f172a] flex flex-col items-center justify-center text-engmax-brand transition-opacity duration-300"
      style={{ animation: showError ? 'fadeOut 0.5s ease forwards' : undefined }}
    >
      <style>{pulse}</style>

      {/* Logo / title */}
      <div className="flex flex-col items-center gap-4 mb-8">
        {logoSrc ? (
          <img
            ref={titleRef}
            src={logoSrc}
            alt="ENGMAX"
            width={180}
            height={34}
            className="transition-all duration-1000 ease-in"
            style={{
              opacity: 0,
              transform: 'translateY(0)',
            } as React.CSSProperties}
          />
        ) : (
          <div className="w-48 h-10 bg-engmax-brand rounded-xl flex items-center justify-center text-white font-bold text-xl tracking-tight shadow-lg">
            ENGMAX
          </div>
        )}
      </div>

      {/* Loader bar */}
      {showLoader && (
        <div className="w-72 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-engmax-brand transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
      {showLoader && progress < 100 && (
        <p className="text-[10px] text-engmax-text-muted font-medium">Loading ENGMAX...</p>
      )}

      {/* Error state */}
      {showError && (
        <div className="flex flex-col items-center gap-2 text-center px-6 max-w-md mt-8 opacity-0 transition-opacity duration-500" style={{ animationDelay: '400ms' }}>
          <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed">
            We&rsquo;re having trouble loading ENGMAX
          </p>
          <button
            onClick={handleRetry}
            className="px-6 py-2.5 bg-engmax-brand text-white rounded-full text-sm font-medium shadow-sm hover:bg-engmax-brand-hover transition-colors"
          >
            Refresh App
          </button>
        </div>
      )}
    </div>
  );
};
