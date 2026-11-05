import React from 'react';
import Modal from '../common/Modal';
import { MapPin, Shield } from 'lucide-react';

export default function FaceVerificationModal({ isOpen, onClose }) {
  return (
    <Modal title="Attendance verification" subtitle="Use your assigned workplace and live GPS" isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="space-y-4">
        <div className="flex items-start gap-3 rounded-xl border border-orange-500/20 bg-orange-500/10 p-4">
          <Shield size={22} className="shrink-0 text-orange-500" />
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Facial verification is not configured</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">Your camera will stay off. No face image or biometric verification result is collected here.</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">Return to attendance, verify your live GPS location and clock in at a workplace assigned by HR during an open attendance window.</p>
        <button type="button" onClick={onClose} className="btn-primary w-full"><MapPin size={16} /> Return to GPS attendance</button>
      </div>
    </Modal>
  );
}
