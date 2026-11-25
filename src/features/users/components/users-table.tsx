"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import { parseAsString, useQueryState } from "nuqs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CLIENT_ACCOUNTS, ClientAccount } from "../data";
import { getRolePermissions, useDemoRoleStore } from "@/lib/demo-role-store";
import {
  ArrowUpDown,
  MoreHorizontal,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  Download,
  Pencil,
  X,
  Activity,
} from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  role: z.enum(["Administrador", "Editor", "Analista", "Cliente"]),
  spent: z.number().min(0, "El monto no puede ser negativo"),
});

type FormValues = z.infer<typeof formSchema>;

const roles: ClientAccount["role"][] = ["Administrador", "Editor", "Analista", "Cliente"];
const statuses: ClientAccount["status"][] = ["Activo", "Pendiente", "Inactivo"];

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function UserStatus({ status }: { status: ClientAccount["status"] }) {
  const Icon = { Activo: CheckCircle2, Pendiente: Clock, Inactivo: XCircle }[status];
  return (
    <Badge variant="outline" className="directory-status" data-status={status}>
      <Icon aria-hidden />
      {status}
    </Badge>
  );
}

export function UsersTable() {
  const { role: demoRole } = useDemoRoleStore();
  const { canEdit, canDelete } = getRolePermissions(demoRole);

  const [data, setData] = React.useState<ClientAccount[]>(CLIENT_ACCOUNTS);
  const [pendingDeletion, setPendingDeletion] = React.useState<string[]>([]);
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(null);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({});
  const [open, setOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  // Filtros sincronizados con URL mediante nuqs
  const [globalFilter, setGlobalFilter] = useQueryState("q", parseAsString.withDefault(""));
  const [roleFilter, setRoleFilter] = useQueryState("role", parseAsString.withDefault(""));
  const [statusFilter, setStatusFilter] = useQueryState("status", parseAsString.withDefault(""));
  const [rawView, setRawView] = useQueryState("view", parseAsString.withDefault("table"));
  const view = rawView === "grid" ? "grid" : "table";

  const filteredData = React.useMemo(() => {
    return data.filter(
      (account) =>
        (!roleFilter || account.role === roleFilter) &&
        (!statusFilter || account.status === statusFilter)
    );
  }, [data, roleFilter, statusFilter]);

  const selectedUser = React.useMemo(
    () => data.find((account) => account.id === selectedUserId) ?? null,
    [data, selectedUserId]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "Cliente",
      spent: 0,
    },
  });

  function closeDialog() {
    setOpen(false);
    setEditingId(null);
    reset();
  }

  function openEditDialog(account: ClientAccount) {
    if (!canEdit) {
      toast.warning("Modo solo lectura", {
        description: "Cambia el rol en el encabezado para editar cuentas.",
      });
      return;
    }
    reset({
      name: account.name,
      email: account.email,
      role: account.role,
      spent: account.spent,
    });
    setEditingId(account.id);
    setOpen(true);
  }

  function onSubmit(values: FormValues) {
    if (!canEdit) return;
    if (editingId) {
      setData((records) =>
        records.map((record) => (record.id === editingId ? { ...record, ...values } : record))
      );
    } else {
      const newRecord: ClientAccount = {
        ...values,
        id: `USR-${String(recordsNextIndex(data)).padStart(3, "0")}`,
        status: "Activo",
        lastLogin: "Recién añadido",
      };
      setData((records) => [newRecord, ...records]);
    }
    toast.success(editingId ? "Cuenta actualizada" : "Cuenta registrada");
    closeDialog();
  }

  function recordsNextIndex(records: ClientAccount[]) {
    return records.length + 1;
  }

  function updateStatus(id: string, nextStatus: ClientAccount["status"]) {
    if (!canEdit) {
      toast.warning("Modo solo lectura", {
        description: "No puedes cambiar el estado con el rol actual.",
      });
      return;
    }
    setData((records) =>
      records.map((record) => (record.id === id ? { ...record, status: nextStatus } : record))
    );
    toast.success(`Estado actualizado a ${nextStatus}`);
  }

  function deleteUsers(ids: string[]) {
    if (!canDelete) return;
    const removedIds = new Set(ids);
    setData((records) => records.filter(({ id }) => !removedIds.has(id)));
    setRowSelection((selection) =>
      Object.fromEntries(Object.entries(selection).filter(([id]) => !removedIds.has(id)))
    );
    if (selectedUserId && removedIds.has(selectedUserId)) {
      setSelectedUserId(null);
    }
    toast.success(ids.length === 1 ? "Cuenta eliminada" : "Cuentas eliminadas");
  }

  function clearFilters() {
    setGlobalFilter("");
    setRoleFilter("");
    setStatusFilter("");
  }

  const columns: ColumnDef<ClientAccount>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          className="h-3.5 w-3.5 rounded border-border accent-primary cursor-pointer"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(!!e.target.checked)}
          aria-label="Seleccionar todas"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="h-3.5 w-3.5 rounded border-border accent-primary cursor-pointer"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(!!e.target.checked)}
          aria-label="Seleccionar fila"
        />
      ),
      enableSorting: false,
    },
    {
      id: "name",
      accessorFn: ({ name, email }) => `${name} ${email}`,
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-ml-3 h-8 text-xs font-medium cursor-pointer"
        >
          <span>Usuario</span>
          <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      ),
      cell: ({ row }) => (
        <button
          type="button"
          onClick={() => setSelectedUserId(row.original.id)}
          className="flex flex-col text-left group cursor-pointer"
        >
          <span className="font-semibold text-xs text-foreground group-hover:text-primary group-hover:underline">
            {row.original.name}
          </span>
          <span className="text-[11px] text-muted-foreground">{row.original.email}</span>
        </button>
      ),
    },
    {
      accessorKey: "role",
      header: "Rol",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-[10px] font-medium border-border/80">
          {row.getValue("role")}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => <UserStatus status={row.original.status} />,
    },
    {
      accessorKey: "spent",
      header: ({ column }) => (
        <div className="text-right">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="-mr-3 h-8 text-xs font-medium cursor-pointer"
          >
            <span>Facturación</span>
            <ArrowUpDown className="ml-1.5 h-3.5 w-3.5 text-muted-foreground" />
          </Button>
        </div>
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("spent"));
        return <div className="text-right font-mono text-xs font-semibold">{formatMoney(amount)}</div>;
      },
    },
    {
      accessorKey: "lastLogin",
      header: "Último Acceso",
      cell: ({ row }) => (
        <span className="text-[11px] text-muted-foreground">{row.getValue("lastLogin")}</span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="text-right">
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label={`Opciones de ${item.name}`}
                className="inline-flex items-center justify-center h-7 w-7 rounded-md text-muted-foreground hover:bg-muted cursor-pointer"
              >
                <MoreHorizontal className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 text-xs">
                <DropdownMenuItem onClick={() => setSelectedUserId(item.id)}>
                  Ver detalle
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={!canEdit}
                  onClick={() => openEditDialog(item)}
                >
                  Editar cuenta
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(item.id);
                      toast.success("ID copiado");
                    } catch {
                      toast.error("No se pudo copiar el ID");
                    }
                  }}
                >
                  Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  disabled={!canDelete}
                  onClick={() => setPendingDeletion([item.id])}
                >
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    getRowId: ({ id }) => id,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  function exportCsv() {
    const rows = table.getFilteredRowModel().rows;
    const headers = ["ID", "Nombre", "Correo", "Rol", "Estado", "Facturacion USD", "Ultimo Acceso"];
    const escapeCell = (value: string | number) =>
      `"${String(value).replace(/"/g, '""')}"`;

    const lines = [
      headers.map(escapeCell).join(","),
      ...rows.map(({ original }) =>
        [
          original.id,
          original.name,
          original.email,
          original.role,
          original.status,
          original.spent,
          original.lastLogin,
        ]
          .map(escapeCell)
          .join(",")
      ),
    ];

    const blob = new Blob(["\uFEFF" + lines.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "usuarios-panel.csv";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast.success(`Exportados ${rows.length} registros a CSV`);
  }

  const selectedCount = Object.keys(rowSelection).length;
  const hasFilters = Boolean(globalFilter || roleFilter || statusFilter);

  return (
    <Card className="border-border/80 bg-card shadow-xs">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 gap-3">
        <div>
          <CardTitle className="text-base font-semibold tracking-tight">
            Directorio de usuarios
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            {data.length} cuentas · {data.filter((user) => user.status === "Activo").length} activas · Pulsa un nombre para ver su detalle
          </CardDescription>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {selectedCount > 0 && (
            <Button
              variant="destructive"
              size="sm"
              disabled={!canDelete}
              title={!canDelete ? "Solo el rol Administrador puede eliminar cuentas" : undefined}
              onClick={() => setPendingDeletion(Object.keys(rowSelection))}
              className="h-8 gap-1 text-xs cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Eliminar ({selectedCount})</span>
            </Button>
          )}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={exportCsv}
            className="h-8 gap-1.5 text-xs cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Exportar CSV</span>
          </Button>

          {/* Modal Crear / Editar Registro */}
          <Dialog
            open={open}
            onOpenChange={(nextOpen) => {
              if (nextOpen) setOpen(true);
              else closeDialog();
            }}
          >
            <DialogTrigger
              disabled={!canEdit}
              title={!canEdit ? "Deshabilitado en modo Solo lectura" : undefined}
              className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-xs font-medium cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs disabled:pointer-events-none disabled:opacity-50"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Nuevo Usuario</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[420px]">
              <DialogHeader>
                <DialogTitle className="text-base font-semibold">
                  {editingId ? "Editar usuario" : "Registrar usuario"}
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  {editingId
                    ? "Actualiza los datos de la cuenta."
                    : "Añade una cuenta de ejemplo a la tabla."}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 py-2">
                <div className="space-y-1">
                  <label htmlFor="user-name" className="text-xs font-medium text-foreground">
                    Nombre Completo
                  </label>
                  <Input
                    id="user-name"
                    {...register("name")}
                    placeholder="ej. Carlos Silva"
                    className="text-xs h-8"
                  />
                  {errors.name && <p className="text-[10px] text-destructive">{errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="user-email" className="text-xs font-medium text-foreground">
                    Correo Electrónico
                  </label>
                  <Input
                    id="user-email"
                    {...register("email")}
                    type="email"
                    placeholder="carlos@empresa.com"
                    className="text-xs h-8"
                  />
                  {errors.email && (
                    <p className="text-[10px] text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="user-role" className="text-xs font-medium text-foreground">
                      Rol
                    </label>
                    <select
                      id="user-role"
                      {...register("role")}
                      className="h-8 w-full rounded-md border border-input bg-transparent px-2.5 text-xs focus-visible:ring-1"
                    >
                      <option value="Cliente">Cliente</option>
                      <option value="Analista">Analista</option>
                      <option value="Editor">Editor</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="user-spent" className="text-xs font-medium text-foreground">
                      Facturación Inicial ($)
                    </label>
                    <Input
                      id="user-spent"
                      {...register("spent", { valueAsNumber: true })}
                      type="number"
                      placeholder="5000"
                      className="text-xs h-8 font-mono"
                    />
                    {errors.spent && (
                      <p className="text-[10px] text-destructive">{errors.spent.message}</p>
                    )}
                  </div>
                </div>

                <DialogFooter className="pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={closeDialog} className="text-xs">
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="text-xs bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Guardar
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Filtros sincronizados en URL */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                aria-label="Buscar usuarios"
                placeholder="Buscar usuarios…"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="h-8 pl-8 text-xs bg-muted/30 border-border/70"
              />
            </div>

            <select
              aria-label="Filtrar por rol"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="h-8 rounded-lg border border-border/80 bg-card px-2.5 text-xs text-foreground cursor-pointer"
            >
              <option value="">Todos los roles</option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <select
              aria-label="Filtrar por estado"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-8 rounded-lg border border-border/80 bg-card px-2.5 text-xs text-foreground cursor-pointer"
            >
              <option value="">Todos los estados</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {hasFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                Limpiar
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="module-view-toggle" role="group" aria-label="Vista del directorio">
              <button aria-pressed={view === "table"} onClick={() => setRawView("table")}>
                Tabla
              </button>
              <button aria-pressed={view === "grid"} onClick={() => setRawView("grid")}>
                Tarjetas
              </button>
            </div>
            <span className="text-[11px] text-muted-foreground hidden lg:block">
              {table.getFilteredRowModel().rows.length} registros
            </span>
          </div>
        </div>

        {/* Vista Tarjetas o Tabla */}
        {view === "grid" ? (
          <div className="directory-grid">
            {table.getRowModel().rows.map((row) => (
              <article key={row.id} className="directory-card">
                <div className="flex items-center justify-between">
                  {row
                    .getVisibleCells()
                    .filter((cell) => ["select", "actions"].includes(cell.column.id))
                    .map((cell) => (
                      <div key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    ))}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedUserId(row.original.id)}
                  className="text-left font-semibold hover:text-primary hover:underline cursor-pointer"
                >
                  {row.original.name}
                </button>
                <small>{row.original.email}</small>
                <div className="flex items-center justify-between gap-2">
                  <span>{row.original.role}</span>
                  <UserStatus status={row.original.status} />
                </div>
              </article>
            ))}
            {table.getRowModel().rows.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No se encontraron resultados para la búsqueda.
              </p>
            )}
          </div>
        ) : (
          <div className="directory-table overflow-x-auto rounded-xl border border-border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-border/70 hover:bg-transparent">
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="text-xs font-medium">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="border-border/70 hover:bg-muted/30 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-2.5">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-xs text-muted-foreground"
                    >
                      No se encontraron resultados para los filtros aplicados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Controles de paginación */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <span className="text-xs text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-mono">
              Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount() || 1}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-7 px-2.5 text-xs cursor-pointer"
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-7 px-2.5 text-xs cursor-pointer"
            >
              Siguiente
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Drawer lateral Master-Detail */}
      <Sheet
        open={Boolean(selectedUser)}
        onOpenChange={(isOpen) => {
          if (!isOpen) setSelectedUserId(null);
        }}
      >
        <SheetContent side="right" className="overflow-y-auto">
          {selectedUser && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-3 pr-8">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-sm font-bold text-primary">
                    {getInitials(selectedUser.name)}
                  </span>
                  <div className="min-w-0">
                    <SheetTitle className="truncate">{selectedUser.name}</SheetTitle>
                    <SheetDescription className="truncate mt-1">
                      {selectedUser.email}
                    </SheetDescription>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <Badge variant="outline" className="text-[10px]">
                    {selectedUser.role}
                  </Badge>
                  <UserStatus status={selectedUser.status} />
                </div>
              </SheetHeader>

              <div className="flex-1 space-y-5 p-5">
                {/* Mini métricas */}
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="rounded-xl border border-border/80 bg-muted/30 p-3">
                    <span className="block text-[10px] text-muted-foreground">Facturación</span>
                    <strong className="mt-1 block font-mono text-xs font-bold">
                      {formatMoney(selectedUser.spent)}
                    </strong>
                  </div>
                  <div className="rounded-xl border border-border/80 bg-muted/30 p-3">
                    <span className="block text-[10px] text-muted-foreground">Último acceso</span>
                    <strong className="mt-1 block text-xs font-semibold truncate">
                      {selectedUser.lastLogin}
                    </strong>
                  </div>
                  <div className="rounded-xl border border-border/80 bg-muted/30 p-3">
                    <span className="block text-[10px] text-muted-foreground">ID Cuenta</span>
                    <strong className="mt-1 block font-mono text-xs font-semibold truncate">
                      {selectedUser.id}
                    </strong>
                  </div>
                </div>

                {/* Cambio rápido de estado */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold text-foreground block">
                    Estado de la cuenta
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {statuses.map((statusOption) => (
                      <Button
                        key={statusOption}
                        type="button"
                        size="sm"
                        disabled={!canEdit}
                        variant={selectedUser.status === statusOption ? "default" : "outline"}
                        onClick={() => updateStatus(selectedUser.id, statusOption)}
                        className="text-xs cursor-pointer"
                      >
                        {statusOption}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Historial de actividad simulado */}
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    <Activity className="size-3.5 text-primary" aria-hidden />
                    <span>Actividad reciente</span>
                  </div>
                  <ol className="relative space-y-3 border-l border-border pl-4 text-xs">
                    <li>
                      <span className="font-medium text-foreground block">
                        Última sesión registrada
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Acceso al panel · {selectedUser.lastLogin}
                      </span>
                    </li>
                    <li>
                      <span className="font-medium text-foreground block">
                        Resumen de facturación acumulado
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Balance actualizado a {formatMoney(selectedUser.spent)}
                      </span>
                    </li>
                    <li>
                      <span className="font-medium text-foreground block">
                        Rol asignado: {selectedUser.role}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Cuenta incorporada al directorio ({selectedUser.id})
                      </span>
                    </li>
                  </ol>
                </div>
              </div>

              <SheetFooter>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={!canEdit}
                  onClick={() => {
                    const target = selectedUser;
                    setSelectedUserId(null);
                    openEditDialog(target);
                  }}
                  className="gap-1.5 text-xs cursor-pointer"
                >
                  <Pencil className="size-3.5" aria-hidden />
                  Editar cuenta
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={!canDelete}
                  title={!canDelete ? "Solo el rol Administrador puede eliminar cuentas" : undefined}
                  onClick={() => setPendingDeletion([selectedUser.id])}
                  className="gap-1.5 text-xs cursor-pointer"
                >
                  <Trash2 className="size-3.5" aria-hidden />
                  Eliminar
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Confirmación de eliminación */}
      <Dialog
        open={pendingDeletion.length > 0}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) setPendingDeletion([]);
        }}
      >
        <DialogContent>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogDescription>
            Se eliminarán las cuentas seleccionadas ({pendingDeletion.length}) del directorio de demostración.
          </DialogDescription>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPendingDeletion([])}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                deleteUsers(pendingDeletion);
                setPendingDeletion([]);
              }}
            >
              Confirmar eliminación
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
