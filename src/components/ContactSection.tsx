import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'motion/react';
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

interface ContactErrors {
  name?: string;
  phone?: string;
  message?: string;
}

export function ContactSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ContactErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmationRef, setConfirmationRef] = useState<string | null>(null);

  const validate = (): ContactErrors => {
    const nextErrors: ContactErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    const cleanedPhone = phone.replace(/[\s()-]/g, '');
    if (!/^(?:\+?91)?[6-9]\d{9}$/.test(cleanedPhone)) {
      nextErrors.phone = 'Enter a valid 10-digit mobile number.';
    }
    if (message.trim().length < 5) {
      nextErrors.message = 'Please enter a short message (at least 5 characters).';
    }
    return nextErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          parentName: name.trim(),
          phone: phone.trim(),
          subject: subject.trim(),
          message: message.trim(),
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        setSubmitError(
          data.error ||
            'Unable to send your message right now. Please call or WhatsApp our office directly.'
        );
        return;
      }

      setConfirmationRef(data.referenceId);
      setName('');
      setPhone('');
      setSubject('');
      setMessage('');
      setErrors({});
    } catch {
      setSubmitError(
        'Enquiry service is currently unreachable. Please contact us directly by phone or WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#B88B2E]">
            Contact Us
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0D244D] text-balance">
            Connect with Silver Oak Academy
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Reach out to our school office for admissions, parent visits, or general enquiries in Lohardaga.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Official Contact Details + Map Section */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="rounded-2xl border border-[#E6DEC8] bg-[#FAF7F0] p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-display text-xl font-bold text-[#0D244D]">
                  {SCHOOL_INFO.displayName}
                </h3>
                <div className="mt-3 flex items-start gap-3 text-slate-700">
                  <MapPin className="w-5 h-5 text-[#B88B2E] shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm sm:text-base leading-relaxed">
                    {SCHOOL_INFO.fullAddress}.
                  </p>
                </div>
              </div>

              <div className="pt-5 border-t border-[#E6DEC8]">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Official Contact Numbers
                </p>
                <div className="mt-4 space-y-4">
                  {SCHOOL_INFO.phones.map((item) => (
                    <div
                      key={item.display}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl bg-white border border-[#E6DEC8]"
                    >
                      <div>
                        <p className="text-base font-bold text-[#0D244D] tabular-nums">
                          {item.display}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.label}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={item.tel}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0D244D] hover:bg-[#061329] text-[#FAF7F0] text-xs font-semibold transition-colors whitespace-nowrap"
                        >
                          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Call Now</span>
                        </a>
                        <a
                          href={`https://wa.me/${item.whatsappNumber}?text=${encodeURIComponent(
                            'Hello Silver Oak Academy, I have an enquiry regarding the school.'
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition-colors whitespace-nowrap"
                        >
                          <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Google Maps Location Section */}
            <div className="rounded-2xl border border-[#E6DEC8] overflow-hidden bg-white shadow-sm">
              <div className="px-5 py-3.5 bg-[#FAF7F0] border-b border-[#E6DEC8] flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-[#0D244D]">
                    School Location Map
                  </h3>
                  <p className="text-xs text-slate-500">
                    {SCHOOL_INFO.fullAddress}
                  </p>
                </div>
                <a
                  href={SCHOOL_INFO.mapConfig.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D244D] hover:text-[#B88B2E] whitespace-nowrap shrink-0"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
              <div className="relative h-64 w-full bg-slate-100">
                <iframe
                  title="Silver Oak Academy Location — Mahadev Ashram Path, Lohardaga"
                  src={SCHOOL_INFO.mapConfig.embedUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                />
              </div>
              <div className="px-5 py-2.5 bg-[#FAF7F0] border-t border-[#E6DEC8] text-xs text-slate-500">
                {SCHOOL_INFO.mapConfig.placeholderNote}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="rounded-2xl border border-[#E6DEC8] bg-white shadow-sm p-6 sm:p-8 lg:p-10">
              {confirmationRef ? (
                <div role="status" className="py-6 space-y-4">
                  <div className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                    <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    <span>Message Received</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#0D244D]">
                    Thank You for Contacting Us
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    Your contact enquiry has been recorded under reference{' '}
                    <span className="font-mono font-semibold text-[#15356B] tabular-nums">
                      {confirmationRef}
                    </span>
                    . Our school office will review your message shortly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setConfirmationRef(null)}
                    className="px-5 py-2.5 rounded-lg bg-[#0D244D] hover:bg-[#061329] text-[#FAF7F0] text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-display text-xl font-bold text-[#0D244D]">
                      Send a General Enquiry
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Have a question for the school office? Leave your details below.
                    </p>
                  </div>

                  {submitError && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-sm text-rose-800"
                    >
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" aria-hidden="true" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Your Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Enter your full name"
                      aria-invalid={Boolean(errors.name)}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D244D]/25 focus:border-[#0D244D] ${
                        errors.name ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 bg-white'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs font-medium text-rose-700">{errors.name}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-sm font-semibold text-slate-800 mb-1.5"
                      >
                        Phone Number <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        placeholder="10-digit mobile number"
                        aria-invalid={Boolean(errors.phone)}
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 tabular-nums focus:outline-none focus:ring-2 focus:ring-[#0D244D]/25 focus:border-[#0D244D] ${
                          errors.phone ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 bg-white'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs font-medium text-rose-700">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-sm font-semibold text-slate-800 mb-1.5"
                      >
                        Subject
                      </label>
                      <input
                        id="contact-subject"
                        name="subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g., Campus Visit / Enquiry"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D244D]/25 focus:border-[#0D244D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Message <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      placeholder="How can our school office assist you?"
                      aria-invalid={Boolean(errors.message)}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D244D]/25 focus:border-[#0D244D] ${
                        errors.message ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 bg-white'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs font-medium text-rose-700">{errors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#E3BA59] hover:bg-[#D4A843] disabled:opacity-60 text-[#061329] text-sm font-semibold transition-colors cursor-pointer"
                  >
                    {submitting ? 'Sending Message...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
