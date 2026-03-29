'use client';

import { Card, Badge, Divider } from '@/components/ui';
import { formatCurrency } from '@/utils/formatCurrency';
import type { PuestoConSocio } from '@/interfaces/puesto.interface';
import clsx from 'clsx';

interface PuestoInfoProps {
  puesto: PuestoConSocio;
}

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[10px] font-bold tracking-widest uppercase text-sisa-blue">
        {label}
      </p>
      <div className="text-sm font-bold text-gray-900">{value}</div>
    </div>
  );
}

export default function PuestoInfo({ puesto }: PuestoInfoProps) {
  const tieneDeuda = (puesto.socio?.deudaTotal ?? 0) > 0;

  return (
    <div>
      <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-2">
        Información del Puesto
      </p>

      <Card padding="md">
        {/* Grid 2 columnas: datos básicos */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <InfoRow
            label="Inquilino"
            value={puesto.socio?.nombre ?? (
              <span className="text-gray-400 font-medium italic">Sin asignar</span>
            )}
          />
          <InfoRow
            label="Sisa Diaria"
            value={formatCurrency(puesto.sisaDiaria)}
          />
          <InfoRow
            label="Sector"
            value={puesto.sectorId.replace('sec_', 'Sector ')}
          />
          <InfoRow
            label="Tamaño"
            value={puesto.tamano}
          />
        </div>

        {/* Deuda — solo si existe */}
        {tieneDeuda && (
          <>
            <Divider className="my-3" />
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-sisa-blue mb-0.5">
                  Deuda Total
                </p>
                <p className={clsx(
                  'text-xl font-extrabold text-sisa-red',
                )}>
                  {formatCurrency(puesto.socio!.deudaTotal)}
                </p>
              </div>
              <Badge variant="deuda" size="md">
                {puesto.socio!.diasDeuda} días
              </Badge>
            </div>
          </>
        )}

        {/* Sin deuda — mensaje positivo */}
        {!tieneDeuda && puesto.socio && (
          <>
            <Divider className="my-3" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-sisa-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-xs font-semibold text-sisa-green">Sin deuda pendiente</p>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}