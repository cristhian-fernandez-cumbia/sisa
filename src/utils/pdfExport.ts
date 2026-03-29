import type { CobroDetalle } from '@/interfaces/cobro.interface';
import { formatCurrency } from './formatCurrency';
import { formatDateLong } from './formatDate';
import { formatTime12h } from './formatTime';
import { TIPO_COBRO_LABELS } from './constants';

/**
 * Genera y descarga un PDF del historial de cobros del día.
 * Usa jsPDF (texto plano) — sin html2canvas, funciona en SSR.
 */
export async function exportHistorialPDF(
  cobros: CobroDetalle[],
  fecha: string,
  mercadoNombre: string,
  cobradorNombre: string,
): Promise<void> {
  const { default: jsPDF } = await import('jspdf');

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = 20;

  const totalDia = cobros.reduce((s, c) => s + c.monto, 0);

  // ── Encabezado ──
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('SISA — Reporte de Cobros', pageW / 2, y, { align: 'center' });
  y += 8;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  doc.text(mercadoNombre, pageW / 2, y, { align: 'center' });
  y += 5;
  doc.text(`Cobrador: ${cobradorNombre}`, pageW / 2, y, { align: 'center' });
  y += 5;
  doc.text(`Fecha: ${formatDateLong(fecha)}`, pageW / 2, y, { align: 'center' });
  y += 10;

  // ── Resumen ──
  doc.setTextColor(0);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total cobrado: ${formatCurrency(totalDia)}`, margin, y);
  doc.text(`Operaciones: ${cobros.length}`, pageW - margin, y, { align: 'right' });
  y += 2;

  doc.setDrawColor(200);
  doc.line(margin, y, pageW - margin, y);
  y += 7;

  // ── Cabecera de tabla ──
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80);
  doc.text('Hora',      margin,        y);
  doc.text('Puesto',    margin + 18,   y);
  doc.text('Inquilino', margin + 32,   y);
  doc.text('Tipo',      margin + 90,   y);
  doc.text('Monto',     pageW - margin, y, { align: 'right' });
  y += 4;
  doc.line(margin, y, pageW - margin, y);
  y += 5;

  // ── Filas ──
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30);

  for (const cobro of cobros) {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(9);
    doc.text(formatTime12h(cobro.hora),                   margin,        y);
    doc.text(cobro.puesto.codigo,                         margin + 18,   y);
    doc.text(cobro.socio.nombre.substring(0, 28),         margin + 32,   y);
    doc.text(TIPO_COBRO_LABELS[cobro.tipo] ?? cobro.tipo, margin + 90,   y);

    if (cobro.monto > 0) {
      doc.setTextColor(22, 120, 50);
    } else {
      doc.setTextColor(100);
    }
    doc.text(formatCurrency(cobro.monto), pageW - margin, y, { align: 'right' });
    doc.setTextColor(30);
    y += 6;
  }

  // ── Total final ──
  y += 3;
  doc.setDrawColor(200);
  doc.line(margin, y, pageW - margin, y);
  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('TOTAL RECAUDADO:', margin, y);
  doc.setTextColor(22, 120, 50);
  doc.text(formatCurrency(totalDia), pageW - margin, y, { align: 'right' });

  // ── Footer ──
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `SISA v2.4.0 — Página ${i} de ${pageCount}`,
      pageW / 2,
      doc.internal.pageSize.getHeight() - 8,
      { align: 'center' },
    );
  }

  doc.save(`SISA_Reporte_${fecha}.pdf`);
}

/**
 * Exporta el contenido visual de un elemento HTML como imagen en PDF.
 * Usa html-to-image en lugar de html2canvas — compatible con CSS moderno
 * (oklch, lab, color-mix) que usa Tailwind v4.
 */
export async function exportElementAsPDF(
  elementId: string,
  filename = 'ticket.pdf',
): Promise<void> {
  // Imports dinámicos para evitar SSR
  const [{ default: jsPDF }, { toPng }] = await Promise.all([
    import('jspdf'),
    import('html-to-image'),
  ]);

  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`[pdfExport] No se encontró el elemento #${elementId}`);
    return;
  }

  const imgData = await toPng(element, {
    cacheBust: true,
    pixelRatio: 2,         // equivalente al scale: 2 de html2canvas
  });

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a5' });
  const pageW = doc.internal.pageSize.getWidth();

  // Calcular altura proporcional a partir del elemento real
  const imgHeight = (element.offsetHeight * pageW) / element.offsetWidth;

  doc.addImage(imgData, 'PNG', 0, 0, pageW, imgHeight);
  doc.save(filename);
}