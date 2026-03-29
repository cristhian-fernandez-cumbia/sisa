export interface Ticket {
  id: string;               // "TKT-000247"
  cobroId: string;
  numero: number;
  fechaEmision: string;     // "YYYY-MM-DD"
  horaEmision: string;      // "HH:MM"
  mercadoNombre: string;
  cobradorNombre: string;
  puestoCodigo: string;
  sectorNombre: string;
  inquilinoNombre: string;
  inquilinoCelular: string;
  sisaDiaria: number;
  montoSisa: number;
  montoAbono: number;
  totalPagado: number;
  deudaRestante: number;
  qrData: string;           // string para generar QR
}

export interface TicketData {
  ticket: Ticket;
  whatsappUrl: string;
}