import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon } from 'lucide-react'
import { Fragment, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { translateRole } from '@/features/auth/content/role'
import type { User } from '@/features/auth/types'
import { DataTableFilter } from '@/features/core/components/data_table_filter'
import { cn } from '@/lib/utils'
import { UserRoleBadge } from './user_role_badge'
import { UsersTableExpandedRow } from './users_table_expanded_row'

const columns: ColumnDef<User>[] = [
  {
    id: 'expand',
    cell: ({ row, table }) => {
      return (
        <Button
          size="icon"
          variant="ghost"
          className="group size-8"
          aria-expanded={row.getIsExpanded()}
          onClick={() => table.setExpanded({ [row.id]: !row.getIsExpanded() })}
        >
          <ChevronRightIcon className="group-aria-[expanded=true]:rotate-90 transition-transform" />
        </Button>
      )
    },
    enableSorting: false,
  },
  {
    header: '#',
    accessorKey: 'id',
  },
  {
    header: 'Nom',
    id: 'user',
    accessorFn: (row) => row.username,
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex flex-row items-center gap-1">
          <Avatar className="size-4">
            <AvatarImage src={user.avatarUrl} alt={user.username} />
            <AvatarFallback>{user.username.at(0)}</AvatarFallback>
          </Avatar>
          <span>{user.username}</span>
        </div>
      )
    },
    sortingFn: (rowA, rowB) => {
      return rowA.original.username.localeCompare(rowB.original.username)
    },
  },
  {
    header: 'Rôle',
    accessorKey: 'role',
    accessorFn: (row) => translateRole(row.role),
    cell: ({ row }) => {
      return <UserRoleBadge role={row.original.role} />
    },
    meta: {
      filterVariant: 'select',
    },
  },
  {
    header: 'Anonyme',
    accessorKey: 'isAnonymous',
    accessorFn: (row) => (row.isAnonymous ? 'Oui' : 'Non'),
    meta: {
      filterVariant: 'select',
    },
    filterFn: (row, id, filterValue) => {
      const rowValue = row.getValue(id)
      return String(rowValue) === filterValue || filterValue === 'all'
    },
  },
  {
    header: 'Date de création',
    accessorFn: (row) => new Date(row.createdAt).toLocaleString(),
  },
  /* {
    header: 'Actions',
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="size-8" variant="ghost">
              <MoreHorizontalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuGroup></DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }, */
]

interface UsersTableProps {
  data: User[]
}

export function UsersTable({ data }: UsersTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: '',
      desc: false,
    },
  ])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client-side filtering
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(), // generate min/max values for range filter
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 px-6">
        <div>
          <DataTableFilter column={table.getColumn('user')!} />
        </div>
        <div className="w-44">
          <DataTableFilter column={table.getColumn('role')!} />
        </div>
        <div className="w-44">
          <DataTableFilter column={table.getColumn('isAnonymous')!} />
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-muted/50">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="relative h-10 border-t select-none"
                    aria-sort={
                      header.column.getIsSorted() === 'asc'
                        ? 'ascending'
                        : header.column.getIsSorted() === 'desc'
                          ? 'descending'
                          : 'none'
                    }
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          header.column.getCanSort() &&
                            'flex h-full cursor-pointer items-center justify-between gap-2 select-none'
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          // Enhanced keyboard handling for sorting
                          if (header.column.getCanSort() && (e.key === 'Enter' || e.key === ' ')) {
                            e.preventDefault()
                            header.column.getToggleSortingHandler()?.(e)
                          }
                        }}
                        tabIndex={header.column.getCanSort() ? 0 : undefined}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: (
                            <ChevronUpIcon
                              className="shrink-0 opacity-60"
                              size={16}
                              aria-hidden="true"
                            />
                          ),
                          desc: (
                            <ChevronDownIcon
                              className="shrink-0 opacity-60"
                              size={16}
                              aria-hidden="true"
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? (
                          <span className="size-4" aria-hidden="true" />
                        )}
                      </div>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <TableRow data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow className="hover:bg-transparent">
                    <TableCell colSpan={row.getAllCells().length} className="p-4">
                      <UsersTableExpandedRow row={row} />
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
