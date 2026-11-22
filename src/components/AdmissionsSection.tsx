import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle, MessageCircle, PhoneCall } from 'lucide-react';
import { CLASS_OPTIONS, SCHOOL_INFO } from '../data/schoolData';

interface AdmissionsSectionProps {
  preselectedClass: string;
}

interface FormErrors {
  parentName?: string;
  studentName?: string;
  phone?: string;
  classApplying?: string;
}

export function AdmissionsSection({ preselectedClass }: AdmissionsSectionProps) {
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [phone, setPhone] = useState('');
  const [classApplying, setClassApplying] = useState<string>('Nursery');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{
    referenceId: string;
    studentName: string;
    classApplying: string;
  } | null>(null);

  useEffect(() => {
    if (preselectedClass && CLASS_OPTIONS.includes(preselectedClass as (typeof CLASS_OPTIONS)[number])) {
      setClassApplying(preselectedClass);
    }
  }, [preselectedClass]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (parentName.trim().length < 2) {
      nextErrors.parentName = "Please enter the parent's or guardian's full name.";
    }
    if (studentName.trim().length < 2) {
      nextErrors.studentName = "Please enter the student's full name.";
    }
    const cleanedPhone = phone.replace(/[\s()-]/g, '');
    if (!/^(?:\+?91)?[6-9]\d{9}$/.test(cleanedPhone)) {
      nextErrors.phone = 'Enter a valid 10-digit mobile number (e.g. 9876543210).';
    }
    if (!classApplying) {
      nextErrors.classApplying = 'Please select the class applying for.';
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
          type: 'admission',
          parentName: parentName.trim(),
          studentName: studentName.trim(),
          phone: phone.trim(),
          classApplying,
          message: message.trim(),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        setSubmitError(
          data.error ||
            'Could not submit enquiry right now. Please call or WhatsApp our admissions desk.'
        );
        return;
      }

      setConfirmation({
        referenceId: data.referenceId,
        studentName: studentName.trim(),
        classApplying,
      });
      setParentName('');
      setStudentName('');
      setPhone('');
      setMessage('');
      setErrors({});
    } catch {
      setSubmitError(
        'Admission enquiry service is currently unreachable. Please call +91 7909086255 or message us on WhatsApp.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappSummaryUrl = `https://wa.me/${SCHOOL_INFO.phones[0].whatsappNumber}?text=${encodeURIComponent(
    `Hello Silver Oak Academy, I would like to enquire about admission for ${
      studentName.trim() || 'my child'
    } in ${classApplying}.${
      parentName.trim() ? ` Parent Name: ${parentName.trim()}.` : ''
    }${phone.trim() ? ` Contact: ${phone.trim()}.` : ''}${
      message.trim() ? ` Message: ${message.trim()}` : ''
    }`
  )}`;

  return (
    <section
      id="admissions"
      className="py-16 sm:py-24 bg-[#FAF7F0] border-y border-[#E6DEC8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Guidance Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#B88B2E]">
              Admissions
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#0D244D] text-balance">
              Admissions Open – Enquire Now
            </h2>
            <p className="mt-3 text-lg font-medium text-[#15356B]">
              Give Your Child a Strong Foundation for a Bright Future.
            </p>

            <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              We welcome parents and guardians seeking admission for{' '}
              <strong className="font-semibold text-[#0D244D]">
                {SCHOOL_INFO.classes}
              </strong>{' '}
              ({SCHOOL_INFO.curriculum}). Submit your admission enquiry online or speak directly with our school office for guidance on the admission process.
            </p>

            <div className="mt-8 pt-6 border-t border-[#E6DEC8] space-y-5">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Classes Offered
                </h3>
                <p className="mt-1 text-base font-semibold text-[#0D244D]">
                  {SCHOOL_INFO.classes} ({SCHOOL_INFO.curriculum})
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Campus Address
                </h3>
                <p className="mt-1 text-sm sm:text-base text-slate-700">
                  {SCHOOL_INFO.fullAddress}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Direct Admissions Helplines
                </h3>
                <div className="mt-2 flex flex-wrap gap-3">
                  {SCHOOL_INFO.phones.map((item) => (
                    <a
                      key={item.display}
                      href={item.tel}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-[#E6DEC8] text-sm font-semibold text-[#0D244D] hover:border-[#B88B2E] hover:text-[#15356B] transition-colors tabular-nums whitespace-nowrap"
                    >
                      <PhoneCall className="w-4 h-4 text-[#B88B2E]" aria-hidden="true" />
                      {item.display}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Functional Admission Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-2xl border border-[#E6DEC8] shadow-sm p-6 sm:p-8 lg:p-10">
              {confirmation ? (
                <div
                  role="status"
                  className="py-6 text-left space-y-4"
                >
                  <div className="inline-flex items-center gap-2 text-emerald-700 font-semibold text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>Admission Enquiry Recorded</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#0D244D]">
                    Thank You for Enquiring with Silver Oak Academy
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    Your admission enquiry for{' '}
                    <strong className="font-semibold text-[#0D244D]">
                      {confirmation.studentName}
                    </strong>{' '}
                    ({confirmation.classApplying}) has been saved. Please note your reference number:{' '}
                    <span className="font-mono font-semibold text-[#15356B] tabular-nums">
                      {confirmation.referenceId}
                    </span>
                    .
                  </p>
                  <p className="text-sm text-slate-600">
                    For immediate assistance, you can also call{' '}
                    <a
                      href={SCHOOL_INFO.phones[0].tel}
                      className="font-semibold text-[#0D244D] underline underline-offset-2"
                    >
                      {SCHOOL_INFO.phones[0].display}
                    </a>{' '}
                    or message us on WhatsApp.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setConfirmation(null)}
                      className="px-5 py-2.5 rounded-lg bg-[#0D244D] hover:bg-[#061329] text-[#FAF7F0] text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Submit Another Enquiry
                    </button>
                    <a
                      href={whatsappSummaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 text-slate-800 hover:bg-slate-50 text-sm font-semibold transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                      <span>Message on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="border-b border-slate-100 pb-4">
                    <h3 className="font-display text-xl font-bold text-[#0D244D]">
                      Admission Enquiry Form
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Fields marked with <span className="text-rose-600">*</span> are required.
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="admission-parent-name"
                        className="block text-sm font-semibold text-slate-800 mb-1.5"
                      >
                        Parent&apos;s Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="admission-parent-name"
                        name="parentName"
                        type="text"
                        required
                        value={parentName}
                        onChange={(e) => {
                          setParentName(e.target.value);
                          if (errors.parentName) {
                            setErrors((prev) => ({ ...prev, parentName: undefined }));
                          }
                        }}
                        placeholder="Enter parent's full name"
                        aria-invalid={Boolean(errors.parentName)}
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D244D]/25 focus:border-[#0D244D] ${
                          errors.parentName ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 bg-white'
                        }`}
                      />
                      {errors.parentName && (
                        <p className="mt-1.5 text-xs font-medium text-rose-700">
                          {errors.parentName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="admission-student-name"
                        className="block text-sm font-semibold text-slate-800 mb-1.5"
                      >
                        Student&apos;s Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="admission-student-name"
                        name="studentName"
                        type="text"
                        required
                        value={studentName}
                        onChange={(e) => {
                          setStudentName(e.target.value);
                          if (errors.studentName) {
                            setErrors((prev) => ({ ...prev, studentName: undefined }));
                          }
                        }}
                        placeholder="Enter student's full name"
                        aria-invalid={Boolean(errors.studentName)}
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D244D]/25 focus:border-[#0D244D] ${
                          errors.studentName ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 bg-white'
                        }`}
                      />
                      {errors.studentName && (
                        <p className="mt-1.5 text-xs font-medium text-rose-700">
                          {errors.studentName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="admission-phone"
                        className="block text-sm font-semibold text-slate-800 mb-1.5"
                      >
                        Phone Number <span className="text-rose-600">*</span>
                      </label>
                      <input
                        id="admission-phone"
                        name="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) {
                            setErrors((prev) => ({ ...prev, phone: undefined }));
                          }
                        }}
                        placeholder="10-digit mobile number"
                        aria-invalid={Boolean(errors.phone)}
                        className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 tabular-nums focus:outline-none focus:ring-2 focus:ring-[#0D244D]/25 focus:border-[#0D244D] ${
                          errors.phone ? 'border-rose-400 bg-rose-50/40' : 'border-slate-300 bg-white'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs font-medium text-rose-700">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="admission-class"
                        className="block text-sm font-semibold text-slate-800 mb-1.5"
                      >
                        Class Applying For <span className="text-rose-600">*</span>
                      </label>
                      <select
                        id="admission-class"
                        name="classApplying"
                        value={classApplying}
                        onChange={(e) => {
                          setClassApplying(e.target.value);
                          if (errors.classApplying) {
                            setErrors((prev) => ({ ...prev, classApplying: undefined }));
                          }
                        }}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D244D]/25 focus:border-[#0D244D]"
                      >
                        {CLASS_OPTIONS.map((cls) => (
                          <option key={cls} value={cls}>
                            {cls}
                          </option>
                        ))}
                      </select>
                      {errors.classApplying && (
                        <p className="mt-1.5 text-xs font-medium text-rose-700">
                          {errors.classApplying}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="admission-message"
                      className="block text-sm font-semibold text-slate-800 mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="admission-message"
                      name="message"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Any questions regarding admission, academic session, or campus visit..."
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D244D]/25 focus:border-[#0D244D]"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#0D244D] hover:bg-[#061329] disabled:opacity-60 text-[#FAF7F0] text-sm font-semibold transition-colors duration-150 cursor-pointer whitespace-nowrap"
                    >
                      {submitting ? 'Submitting Enquiry...' : 'Submit Enquiry'}
                    </button>

                    <a
                      href={whatsappSummaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                      <span>Enquire via WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
