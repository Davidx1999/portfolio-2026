import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import {
  getAnalyticsConsent,
  setAnalyticsConsent,
} from '../services/analytics';

/**
 * AnalyticsConsent
 * Discrete, accessible privacy consent banner matching portfolio design system.
 * Allows users to accept or decline GA4 cookies, persisting preference across sessions.
 */
export function AnalyticsConsent() {
  const { t } = useTranslation(['common']);
  const [consentState, setConsentState] = useState(() => getAnalyticsConsent());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setConsentState(getAnalyticsConsent());
  }, []);

  if (!isClient || consentState !== null) {
    return null;
  }

  const handleAccept = () => {
    setAnalyticsConsent('granted');
    setConsentState('granted');
  };

  const handleDecline = () => {
    setAnalyticsConsent('denied');
    setConsentState('denied');
  };

  return (
    <AnimatePresence>
      <motion.aside
        role="region"
        aria-label="Privacy & Analytics Consent"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-md w-auto"
      >
        <div className="bg-[#151613]/95 backdrop-blur-md border border-white/[0.12] rounded-[16px] p-4 sm:p-5 shadow-2xl shadow-black/60 text-[#FAFAF7] flex flex-col gap-3.5">
          {/* Header & Description */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-[10px] bg-white/[0.06] border border-white/[0.08] text-[#C4FF00] shrink-0 mt-0.5">
              <ShieldCheck size={16} />
            </div>
            <p className="font-sans text-xs sm:text-[13px] text-[#F4F3EE]/80 leading-relaxed">
              {t(
                'common:consent_banner_text',
                'We use analytics cookies to understand traffic and improve portfolio experience. No personal data is ever sold.'
              )}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={handleDecline}
              className="px-4 py-2 rounded-[10px] font-mono text-[11px] font-semibold uppercase tracking-wider text-[#F4F3EE]/70 hover:text-[#FAFAF7] hover:bg-white/[0.06] transition-colors focus-visible:outline-2 focus-visible:outline-[#C4FF00] cursor-pointer"
            >
              {t('common:consent_action_decline', 'Decline')}
            </button>
            <button
              type="button"
              onClick={handleAccept}
              className="px-4 py-2 rounded-[10px] font-mono text-[11px] font-bold uppercase tracking-wider text-[#10110F] bg-[#C4FF00] hover:bg-[#d4ff33] active:scale-[0.98] transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-[#FAFAF7] cursor-pointer"
            >
              {t('common:consent_action_accept', 'Accept')}
            </button>
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}

export default AnalyticsConsent;
