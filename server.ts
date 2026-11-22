import express from 'express';
import type { Request, Response } from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createServer as createViteServer } from 'vite';

interface EnquiryRecord {
  referenceId: string;
  type: 'admission' | 'contact';
  parentName: string;
  studentName?: string;
  phone: string;
  classApplying?: string;
  subject?: string;
  message: string;
  submittedAt: string;
}

const PORT = Number(process.env.PORT || 3000);
const DATA_DIR = path.resolve(process.cwd(), 'data');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

const ALLOWED_CLASSES = new Set([
  'Nursery',
  'Kindergarten (LKG)',
  'Kindergarten (UKG)',
  'Class I',
  'Class II',
  'Class III',
  'Class IV',
  'Class V',
  'Class VI',
  'Class VII',
  'Class VIII',
]);

function normalizePhone(raw: string): string {
  return raw.replace(/[\s()-]/g, '');
}

function isValidIndianPhone(raw: string): boolean {
  const cleaned = normalizePhone(raw);
  return /^(?:\+?91)?[6-9]\d{9}$/.test(cleaned);
}

function createReferenceId(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `SOA-${y}${m}${d}-${suffix}`;
}

async function appendEnquiry(record: EnquiryRecord): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  let existing: EnquiryRecord[] = [];
  try {
    const content = await fs.readFile(ENQUIRIES_FILE, 'utf8');
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      existing = parsed;
    }
  } catch {
    existing = [];
  }
  existing.push(record);
  await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(existing, null, 2), 'utf8');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', school: 'Silver Oak Academy' });
  });

  app.post('/api/enquiries', async (req: Request, res: Response) => {
    const body = req.body ?? {};
    const type = body.type === 'contact' ? 'contact' : body.type === 'admission' ? 'admission' : null;

    if (!type) {
      res.status(400).json({ ok: false, error: 'Invalid enquiry type.' });
      return;
    }

    const parentName = typeof body.parentName === 'string' ? body.parentName.trim() : '';
    const studentName = typeof body.studentName === 'string' ? body.studentName.trim() : '';
    const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
    const classApplying = typeof body.classApplying === 'string' ? body.classApplying.trim() : '';
    const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
    const message = typeof body.message === 'string' ? body.message.trim() : '';

    if (parentName.length < 2 || parentName.length > 100) {
      res.status(400).json({
        ok: false,
        error:
          type === 'admission'
            ? "Please enter a valid parent's name (at least 2 characters)."
            : 'Please enter your full name (at least 2 characters).',
      });
      return;
    }

    if (!isValidIndianPhone(phone)) {
      res.status(400).json({
        ok: false,
        error: 'Please enter a valid 10-digit Indian mobile number.',
      });
      return;
    }

    if (type === 'admission') {
      if (studentName.length < 2 || studentName.length > 100) {
        res.status(400).json({
          ok: false,
          error: "Please enter a valid student's name (at least 2 characters).",
        });
        return;
      }
      if (!ALLOWED_CLASSES.has(classApplying)) {
        res.status(400).json({
          ok: false,
          error: 'Please select a valid class from Nursery to Class VIII.',
        });
        return;
      }
    } else if (message.length < 5) {
      res.status(400).json({
        ok: false,
        error: 'Please enter a message with at least 5 characters.',
      });
      return;
    }

    const record: EnquiryRecord = {
      referenceId: createReferenceId(),
      type,
      parentName,
      studentName: type === 'admission' ? studentName : undefined,
      phone: normalizePhone(phone),
      classApplying: type === 'admission' ? classApplying : undefined,
      subject: type === 'contact' && subject ? subject : undefined,
      message: message.slice(0, 1500),
      submittedAt: new Date().toISOString(),
    };

    try {
      await appendEnquiry(record);
      res.status(201).json({
        ok: true,
        referenceId: record.referenceId,
        submittedAt: record.submittedAt,
      });
    } catch (error) {
      console.error('Failed to save enquiry:', error);
      res.status(500).json({
        ok: false,
        error: 'Unable to record your enquiry right now. Please call or WhatsApp our office directly.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Silver Oak Academy server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Server startup error:', err);
  process.exit(1);
});
