'use client';

import { Card, Badge, Button } from '@/components/ui';
import { formatCurrency } from '@/utils/formatCurrency';
import type { Socio } from '@/interfaces/socio.interface';
import clsx from 'clsx';

interface DeudorCardProps {
  socio:       Socio;
  puesto?:     { codigo: string; sectorId: string } | null;
  onCobrar?:   (socioId: string) => void;
  /** Posición en el ranking (opcional) */
  rank?:       number;
  className?:  string;
}

/* Intensidad del borde izquierdo según monto de deuda */
function getAccentClass(deuda: number): string {
  if (deuda >= 20) return 'border-l-red-600';
  if (deuda >= 10) return 'border-l-sisa-red';
  return 'border-l-red-300';
}

/* Color del badge de días según urgencia */
function getDiasBadgeVariant(dias: number): 'deuda' | 'warning' | 'gray' {
  if (dias >= 10) return 'deuda';
  if (dias >= 5)  return 'warning';
  return 'gray';
}

export default function DeudorCard({
  socio,
  puesto,
  onCobrar,
  rank,
  className,
}: DeudorCardProps) {
  const sectorLabel = socio.sectorId.replace('sec_', 'Sector ');

  return (
    <Card
      padding="md"
      className={clsx(
        'border-l-4',
        getAccentClass(socio.deudaTotal),
        className,
      )}
    >
      {/* ── Fila superior: badges + días ── */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          {rank !== undefined && (
            <span className={clsx(
              'w-6 h-6 rounded-lg flex items-center justify-center',
              'text-xs font-extrabold border',
              rank === 0 ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
              : rank === 1 ? 'bg-gray-100 text-gray-600 border-gray-200'
              : rank === 2 ? 'bg-orange-100 text-orange-600 border-orange-200'
              : 'bg-red-50 text-sisa-red border-red-200',
            )}>
              {rank + 1}
            </span>
          )}
          <Badge variant="gray" size="sm">
            {sectorLabel}
          </Badge>
          {puesto && (
            <span className="text-sm font-extrabold text-gray-900">
              {puesto.codigo}
            </span>
          )}
        </div>
        <Badge
          variant={getDiasBadgeVariant(socio.diasDeuda)}
          size="sm"
        >
          {socio.diasDeuda} días
        </Badge>
      </div>

      {/* ── Nombre del inquilino ── */}
      <p className="text-base font-bold text-gray-900 mb-3 leading-tight">
        {socio.nombre}
      </p>

      {/* ── Fila inferior: deuda + botón ── */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
            Deuda Total
          </p>
          <p className="text-lg font-extrabold text-sisa-red leading-none">
            {formatCurrency(socio.deudaTotal)}
          </p>
        </div>

        {onCobrar && (
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onCobrar(socio.id);
            }}
            className="rounded-full px-5 shrink-0"
          >
            COBRAR
          </Button>
        )}
      </div>
    </Card>
  );
}