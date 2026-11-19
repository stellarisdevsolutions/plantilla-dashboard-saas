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
  ColumnFiltersState,
} from "@tanstack/react-table";
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
import { CLIENT_ACCOUNTS, ClientAccount } from "../data";
import {
  ArrowUpDown,
  MoreHorizontal,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
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

export function UsersTable() {
  const [data, setData] = React.useState<ClientAccount[]>(CLIENT_ACCOUNTS);
  const [pendingDeletion, setPendingDeletion] = React.useState<string[]>([]);
  const [view, setView] = React.useState<"table" | "grid">("table");
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [rowSelection, setRowSelection] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);

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

  function onSubmit(values: FormValues) {
    if (editingId) {
      setData((records) => records.map((record) => record.id === editingId ? { ...record, ...values } : record));
    } else {
      const newRecord: ClientAccount = {
        ...values,
        id: crypto.randomUUID(),
        status: "Activo",
        lastLogin: "Recién añadido",
      };
      setData((records) => [newRecord, ...records]);
    }
    toast.success(editingId ? "Cuenta actualizada" : "Cuenta registrada");
    closeDialog();
  }

  function deleteUsers(ids: string[]) {
    const removedIds = new Set(ids);
    setData((records) => records.filter(({ id }) => !removedIds.has(id)));
    setRowSelection((selection) => Object.fromEntries(
      Object.entries(selection).filter(([id]) => !removedIds.has(id)),
    ));
    toast.success(ids.length === 1 ? "Cuenta eliminada" : "Cuentas eliminadas");
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
        <div className="flex flex-col">
          <span className="font-semibold text-xs text-foreground">{row.original.name}</span>
          <span className="text-[11px] text-muted-foreground">{row.original.email}</span>
        </div>
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
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div className="flex items-center gap-1.5 text-xs">
            {status === "Activo" && <CheckCircle2 className="h-3.5 w-3.5 text-primary" />}
            {status === "Pendiente" && <Clock className="h-3.5 w-3.5 text-warning" />}
            {status === "Inactivo" && <XCircle className="h-3.5 w-3.5 text-muted-foreground" />}
            <span className="text-[11px] font-medium">{status}</span>
          </div>
        );
      },
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
        const formatted = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(amount);
        return <div className="text-right font-mono text-xs font-semibold">{formatted}</div>;
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
              <DropdownMenuTrigger aria-label={`Opciones de ${item.name}`} className="inline-flex items-center justify-center h-7 w-7 rounded-md text-muted-foreground hover:bg-muted cursor-pointer">
                <MoreHorizontal className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 text-xs">
                <DropdownMenuItem onClick={() => {
                  reset({ name: item.name, email: item.email, role: item.role, spent: item.spent });
                  setEditingId(item.id);
                  setOpen(true);
                }}>
                  Editar cuenta
                </DropdownMenuItem>
                <DropdownMenuItem onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(item.id);
                    toast.success("ID copiado");
                  } catch {
                    toast.error("No se pudo copiar el ID");
                  }
                }}>
                  Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={() => setPendingDeletion([item.id])}>
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
    data,
    columns,
    getRowId: ({ id }) => id,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
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

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <Card className="border-border/80 bg-card shadow-xs">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 gap-3">
        <div>
          <CardTitle className="text-base font-semibold tracking-tight">
            Directorio de usuarios
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            {data.length} cuentas · {data.filter(user => user.status === "Activo").length} activas
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {selectedCount > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setPendingDeletion(Object.keys(rowSelection))}
              className="h-8 gap-1 text-xs cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Eliminar ({selectedCount})</span>
            </Button>
          )}

          {/* Modal Crear Registro */}
          <Dialog open={open} onOpenChange={(nextOpen) => {
            if (nextOpen) setOpen(true);
            else closeDialog();
          }}>
            <DialogTrigger className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-xs font-medium cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs">
              <Plus className="h-3.5 w-3.5" />
              <span>Nuevo Usuario</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[420px]">
              <DialogHeader>
                <DialogTitle className="text-base font-semibold">{editingId ? "Editar usuario" : "Registrar usuario"}</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  {editingId ? "Actualiza los datos de la cuenta." : "Añade una cuenta de ejemplo a la tabla."}
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 py-2">
                <div className="space-y-1">
                  <label htmlFor="user-name" className="text-xs font-medium text-foreground">Nombre Completo</label>
                  <Input id="user-name" {...register("name")} placeholder="ej. Carlos Silva" className="text-xs h-8" />
                  {errors.name && <p className="text-[10px] text-destructive">{errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="user-email" className="text-xs font-medium text-foreground">Correo Electrónico</label>
                  <Input id="user-email" {...register("email")} type="email" placeholder="carlos@empresa.com" className="text-xs h-8" />
                  {errors.email && <p className="text-[10px] text-destructive">{errors.email.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="user-role" className="text-xs font-medium text-foreground">Rol</label>
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
                    <label htmlFor="user-spent" className="text-xs font-medium text-foreground">Facturación Inicial ($)</label>
                    <Input id="user-spent" {...register("spent", { valueAsNumber: true })} type="number" placeholder="5000" className="text-xs h-8 font-mono" />
                    {errors.spent && <p className="text-[10px] text-destructive">{errors.spent.message}</p>}
                  </div>
                </div>

                <DialogFooter className="pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={closeDialog} className="text-xs">
                    Cancelar
                  </Button>
                  <Button type="submit" size="sm" className="text-xs bg-primary text-primary-foreground hover:bg-primary/90">
                    Guardar
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              aria-label="Buscar usuarios"
              placeholder="Buscar usuarios…"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-8 pl-8 text-xs bg-muted/30 border-border/70"
            />
          </div>
          <div className="module-view-toggle" role="group" aria-label="Vista del directorio">
            <button aria-pressed={view === "table"} onClick={() => setView("table")}>Tabla</button>
            <button aria-pressed={view === "grid"} onClick={() => setView("grid")}>Tarjetas</button>
          </div>
          <span className="text-[11px] text-muted-foreground hidden sm:block">
            {table.getFilteredRowModel().rows.length} registros encontrados
          </span>
        </div>

        {/* Table View */}
        {view === "grid" ? <div className="directory-grid">
          {table.getRowModel().rows.map(row => <article key={row.id} className="directory-card">
            <div className="flex items-center justify-between">
              {row.getVisibleCells().filter(cell => ["select","actions"].includes(cell.column.id)).map(cell => <div key={cell.id}>{flexRender(cell.column.columnDef.cell,cell.getContext())}</div>)}
            </div>
            <strong>{row.original.name}</strong><small>{row.original.email}</small>
            <div className="flex items-center justify-between gap-2"><span>{row.original.role}</span><Badge variant="secondary">{row.original.status}</Badge></div>
          </article>)}
          {table.getRowModel().rows.length === 0 && <p>No se encontraron resultados para la búsqueda.</p>}
        </div> : <div className="rounded-lg border border-border/70 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/40">
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
                  <TableCell colSpan={columns.length} className="h-24 text-center text-xs text-muted-foreground">
                    No se encontraron resultados para la búsqueda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>}

        {/* Pagination Controls */}
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
      <Dialog open={pendingDeletion.length > 0} onOpenChange={open => { if (!open) setPendingDeletion([]); }}>
        <DialogContent><DialogTitle>Confirmar eliminación</DialogTitle><DialogDescription>
          Se eliminarán las cuentas seleccionadas ({pendingDeletion.length}) del directorio de demostración.
        </DialogDescription><DialogFooter><Button variant="outline" onClick={() => setPendingDeletion([])}>Cancelar</Button>
          <Button variant="destructive" onClick={() => {deleteUsers(pendingDeletion); setPendingDeletion([]);}}>Confirmar eliminación</Button></DialogFooter></DialogContent>
      </Dialog>
    </Card>
  );
}
