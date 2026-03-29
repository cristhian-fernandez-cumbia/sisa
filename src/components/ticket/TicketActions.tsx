'use client';

import { useState }   from 'react';
import { useTicket }  from '@/hooks/useTicket';
import clsx           from 'clsx';

interface TicketActionsProps {
  onClose?: () => void;
}

export default function TicketActions({ onClose }: TicketActionsProps) {
  const { compartirWhatsApp, imprimir, cerrar } = useTicket();
  const [printing, setPrinting] = useState(false);

  const handleClose = () => {
    cerrar();
    onClose?.();
  };

  const handleImprimir = async () => {
    setPrinting(true);
    await imprimir();
    setPrinting(false);
  };

  return (
    <div className="flex flex-col gap-2 mt-4">

      {/* WhatsApp — botón verde principal */}
      <button
        onClick={compartirWhatsApp}
        className={clsx(
          'w-full flex items-center justify-center gap-2.5',
          'h-12 rounded-2xl font-semibold text-sm',
          'bg-[#25D366] text-white',
          'hover:bg-[#20b858] active:bg-[#1da34e]',
          'transition-colors duration-150',
        )}
      >
        {/* Ícono de WhatsApp */}
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        COMPARTIR WHATSAPP
      </button>

      {/* Fila Imprimir + Listo */}
      <div className="flex gap-2">
        {/* Imprimir */}
        <button
          onClick={handleImprimir}
          disabled={printing}
          className={clsx(
            'flex-1 flex items-center justify-center gap-2',
            'h-12 rounded-2xl font-semibold text-sm',
            'border-2 border-sisa-blue text-sisa-blue',
            'hover:bg-blue-50 active:bg-blue-100',
            'transition-colors duration-150',
            printing && 'opacity-60 cursor-not-allowed',
          )}
        >
          {printing ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          )}
          {printing ? 'EXPORTANDO...' : 'IMPRIMIR'}
        </button>

        {/* Listo */}
        <button
          onClick={handleClose}
          className={clsx(
            'flex-1 flex items-center justify-center gap-2',
            'h-12 rounded-2xl font-semibold text-sm',
            'bg-sisa-blue text-white',
            'hover:bg-blue-600 active:bg-blue-700',
            'transition-colors duration-150',
          )}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          LISTO
        </button>
      </div>
    </div>
  );
}