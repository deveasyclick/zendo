import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";
import type { TeamMember } from "../types";

const columns: ColumnDef<TeamMember>[] = [
  {
    accessorKey: "name",
    header: "Member",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <img src={row.original.avatar} className="size-10 rounded-full" />
        <div>
          <p className="font-bold text-sm">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ getValue }) => (
      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary">
        {getValue<string>()}
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <span className="text-xs font-semibold">{getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "lastActive",
    header: "Last Active",
    cell: ({ getValue }) => (
      <span className="text-xs text-muted-foreground">
        {getValue<string>()}
      </span>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: () => (
      <div className="text-right">
        <Button variant="ghost" size="icon">
          <MoreVertical className="size-4" />
        </Button>
      </div>
    ),
  },
];

export function TeamTable({
  data,
  role,
  status,
}: {
  data: TeamMember[];
  role: string;
  status: string;
}) {
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters: [
        role !== "All" ? { id: "role", value: role } : undefined,
        status !== "All" ? { id: "status", value: status } : undefined,
      ].filter(Boolean) as any,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="rounded-2xl border bg-background overflow-hidden">
      <table className="w-full">
        <thead className="border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-4 text-left text-xs uppercase text-muted-foreground"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b last:border-0">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t">
        <p className="text-xs text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </p>

        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
