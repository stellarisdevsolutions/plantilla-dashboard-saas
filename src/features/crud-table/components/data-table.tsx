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
  DropdownMenuLabel,
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
  Download,
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

export function AdvancedDataTable() {
  const [data, setData] = React.useState<ClientAccount[]>(CLIENT_ACCOUNTS);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [rowSelection, setRowSelection] = React.useState({});
  const [openCreateDialog, setOpenCreateDialog] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      name: "",
      email: "",
      role: "Cliente",
      spent: 0,
    },
  });

  const onSubmit = (values: FormValues) => {
    const newRecord: ClientAccount = {
      id: `USR-00${data.length + 1}`,
      name: values.name,
      email: values.email,
      role: values.role,
      status: "Activo",
      spent: values.spent,
      lastLogin: "Recién añadido",
    };
    setData([newRecord, ...data]);
    setOpenCreateDialog(false);
    reset();
    toast.success("Cuenta registrada", {
      description: `Se añadió ${values.name} a la lista de usuarios.`,
    });
  };

  const handleDeleteSelected = () => {
    const selectedIndices = Object.keys(rowSelection).map(Number);
    const remaining = data.filter((_, idx) => !selectedIndices.includes(idx));
    setData(remaining);
    setRowSelection({});
    toast.success("Registros eliminados", {
      description: `Se eliminaron ${selectedIndices.length} elementos seleccionados.`,
    });
  };

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
      accessorKey: "name",
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
            {status === "Pendiente" && <Clock className="h-3.5 w-3.5 text-amber-500" />}
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
              <DropdownMenuTrigger className="inline-flex items-center justify-center h-7 w-7 rounded-md text-muted-foreground hover:bg-muted cursor-pointer">
                <MoreHorizontal className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 text-xs">
                <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.info(`Editando a ${item.name}`)}>
                  Editar cuenta
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info(`Enlace de acceso copiado para ${item.email}`)}>
                  Copiar ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => {
                    setData((prev) => prev.filter((u) => u.id !== item.id));
                    toast.success(`Cuenta de ${item.name} eliminada`);
                  }}
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
    data,
    columns,
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
            Tabla de Datos Avanzada (TanStack Table)
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground mt-0.5">
            Ordenamiento multicolumna, selección de filas, paginación y formularios validados con Zod
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          {selectedCount > 0 && (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteSelected}
              className="h-8 gap-1 text-xs cursor-pointer"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Eliminar ({selectedCount})</span>
            </Button>
          )}

          {/* Modal Crear Registro */}
          <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
            <DialogTrigger className="inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-xs font-medium cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs">
              <Plus className="h-3.5 w-3.5" />
              <span>Nuevo Usuario</span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[420px]">
              <DialogHeader>
                <DialogTitle className="text-base font-semibold">Registrar Nuevo Usuario</DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Completa los datos con validación Zod en tiempo real.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5 py-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Nombre Completo</label>
                  <Input {...register("name")} placeholder="ej. Carlos Silva" className="text-xs h-8" />
                  {errors.name && <p className="text-[10px] text-destructive">{errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Correo Electrónico</label>
                  <Input {...register("email")} type="email" placeholder="carlos@empresa.com" className="text-xs h-8" />
                  {errors.email && <p className="text-[10px] text-destructive">{errors.email.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground">Rol</label>
                    <select
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
                    <label className="text-xs font-medium text-foreground">Facturación Inicial ($)</label>
                    <Input {...register("spent", { valueAsNumber: true })} type="number" placeholder="5000" className="text-xs h-8 font-mono" />
                    {errors.spent && <p className="text-[10px] text-destructive">{errors.spent.message}</p>}
                  </div>
                </div>

                <DialogFooter className="pt-2">
                  <Button type="button" variant="outline" size="sm" onClick={() => setOpenCreateDialog(false)} className="text-xs">
                    Cancelar
                  </Button>
                  <Button type="submit" size="sm" className="text-xs bg-primary text-primary-foreground hover:bg-primary/90">
                    Guardar Registro
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="flex items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Buscar en todas las columnas..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-8 pl-8 text-xs bg-muted/30 border-border/70"
            />
          </div>
          <span className="text-[11px] text-muted-foreground hidden sm:block">
            {table.getFilteredRowModel().rows.length} registros encontrados
          </span>
        </div>

        {/* Table View */}
        <div className="rounded-lg border border-border/70 overflow-hidden">
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
        </div>

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
    </Card>
  );
}
