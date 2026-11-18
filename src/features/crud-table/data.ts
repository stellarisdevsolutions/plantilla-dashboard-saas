export interface ClientAccount {
  id: string;
  name: string;
  email: string;
  role: "Administrador" | "Editor" | "Analista" | "Cliente";
  status: "Activo" | "Inactivo" | "Pendiente";
  spent: number;
  lastLogin: string;
}

export const CLIENT_ACCOUNTS: ClientAccount[] = [
  {
    id: "USR-001",
    name: "Valentina Vega",
    email: "valentina@vortexai.com",
    role: "Administrador",
    status: "Activo",
    spent: 42500,
    lastLogin: "Hace 10 min",
  },
  {
    id: "USR-002",
    name: "Ignacio Morales",
    email: "ignacio@solaria.io",
    role: "Editor",
    status: "Activo",
    spent: 18200,
    lastLogin: "Hace 2 horas",
  },
  {
    id: "USR-003",
    name: "Camila Rojas",
    email: "camila@bioquim.org",
    role: "Analista",
    status: "Pendiente",
    spent: 9400,
    lastLogin: "Ayer",
  },
  {
    id: "USR-004",
    name: "Rodrigo Benítez",
    email: "rodrigo@apexcorp.de",
    role: "Cliente",
    status: "Activo",
    spent: 85000,
    lastLogin: "Hace 3 días",
  },
  {
    id: "USR-005",
    name: "Lucía Fernández",
    email: "lucia@cloudwave.es",
    role: "Editor",
    status: "Inactivo",
    spent: 3100,
    lastLogin: "Hace 2 semanas",
  },
  {
    id: "USR-006",
    name: "Tomás Navarro",
    email: "tomas@quantumsec.co",
    role: "Cliente",
    status: "Activo",
    spent: 67200,
    lastLogin: "Hoy a las 09:15",
  },
  {
    id: "USR-007",
    name: "Mariana Delgado",
    email: "mariana@novahealth.com",
    role: "Analista",
    status: "Activo",
    spent: 14500,
    lastLogin: "Hace 4 horas",
  },
];
