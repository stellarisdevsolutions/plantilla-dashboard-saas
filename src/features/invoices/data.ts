export type Status = "Pendiente" | "Borrador" | "Pagada";
export type Item = { label: string; amount: number };
export type Invoice = {
  id: number; company: string; contact: string; initials: string; tone: string;
  status: Status; due: string; items: Item[];
};

export const customers = [
  { company: "Forma Studio", contact: "Ana León", initials: "AL", tone: "#cbb2aa" },
  { company: "Northline", contact: "Lucas Vidal", initials: "LV", tone: "#b4c6cc" },
  { company: "BrightWave", contact: "Jaime Castro", initials: "JC", tone: "#e1c290" },
  { company: "Lumen Labs", contact: "Emma Costa", initials: "EC", tone: "#c6bddc" },
  { company: "Atlas Digital", contact: "Leo Silva", initials: "LS", tone: "#bfd8be" },
];
export const reportDate = "2026-11-18";
const seeds: { customer: number; due: string; status: Status; items: Item[] }[] = [
  { customer: 0, due: "2026-11-11", status: "Pendiente", items: [{ label: "Identidad visual", amount: 24850 }] },
  { customer: 1, due: "2026-11-22", status: "Pendiente", items: [{ label: "Consultoría", amount: 21480 }] },
  { customer: 2, due: "2026-11-23", status: "Pendiente", items: [{ label: "Diseño UX/UI", amount: 15990 }, { label: "Desarrollo", amount: 21250 }, { label: "QA y pruebas", amount: 10740 }] },
  { customer: 3, due: "2026-12-04", status: "Borrador", items: [{ label: "Plataforma web", amount: 55230 }] },
  { customer: 4, due: "2026-12-07", status: "Borrador", items: [{ label: "Auditoría", amount: 6880 }] },
  { customer: 3, due: "2026-12-09", status: "Pendiente", items: [{ label: "Portal de clientes", amount: 73100 }] },
  { customer: 0, due: "2026-11-04", status: "Pagada", items: [{ label: "Suite de productos", amount: 186540 }] },
];
export const initialInvoices: Invoice[] = seeds.map(({ customer, ...invoice }, index) => ({
  ...customers[customer], ...invoice, id: 1001 + index,
}));
export const total = (invoice: Invoice) => invoice.items.reduce((sum, item) => sum + item.amount, 0);
export const currency = (amount: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
export const shortDate = (date: string) => new Intl.DateTimeFormat("es", { day: "numeric", month: "short", timeZone: "UTC" }).format(new Date(date + "T00:00:00Z"));
export const daysToCollect = [31, 29, 27, 26, 26, 24, 22, 22, 20, 19, 18, 16];
export const monthlyBilling = [
  { month: "Jun", amount: 31000 }, { month: "Jul", amount: 48000 }, { month: "Ago", amount: 79000 },
  { month: "Sep", amount: 107000 }, { month: "Oct", amount: 74000 }, { month: "Nov", amount: 111000 },
];
