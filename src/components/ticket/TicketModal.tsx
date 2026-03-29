'use client';

import { useTicket }  from '@/hooks/useTicket';
import { Modal }      from '@/components/ui';
import TicketContent  from './TicketContent';
import TicketActions  from './TicketActions';

interface TicketModalProps {
  onClose?: () => void;
}

export default function TicketModal({ onClose }: TicketModalProps) {
  const { ticket, isOpen, cerrar } = useTicket();

  if (!isOpen || !ticket) return null;

  return (
    <Modal open={isOpen} onClose={cerrar} size="sm" showClose={false}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sisa-blue flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-900">SISA Control</span>
        </div>
        <button
          onClick={cerrar}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Contenido del ticket */}
      <TicketContent ticket={ticket} domId="ticket-content" />

      {/* Botones de acción */}
      <TicketActions onClose={onClose} />
    </Modal>
  );
}