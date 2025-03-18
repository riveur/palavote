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
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  MoreHorizontalIcon,
  TicketIcon,
} from 'lucide-react'
import { Fragment, useState } from 'react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTableFilter } from '@/features/core/components/data_table_filter'
import { cn } from '@/lib/utils'
import type { Dilemma } from '@/library/types'
import { Link } from '@tanstack/react-router'
import { TableExpandedRow } from './table_expanded_row'

const columns: ColumnDef<Dilemma>[] = [
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
    header: 'Titre',
    accessorKey: 'title',
  },
  {
    header: 'Propositions',
    accessorKey: 'propositions',
    cell: ({ row }) => {
      const propositions = row.getValue('propositions') as Dilemma['propositions']
      return (
        <div className="flex flex-row items-center gap-1">
          {[propositions[0], '', propositions[1]].map((proposition) => {
            if (typeof proposition === 'string') {
              return <span key={proposition}>/</span>
            }
            return <span key={proposition.id}>{proposition.name}</span>
          })}
        </div>
      )
    },
  },
  {
    header: 'Auteur',
    accessorKey: 'author',
    cell: ({ row }) => {
      const author = row.getValue('author') as Dilemma['author']
      const anonymous = row.original.anonymousUsername

      return (
        <div className="flex flex-row items-center gap-1">
          <Avatar className="size-4">
            {author && <AvatarImage src={author.avatarUrl} alt={author.username} />}
            <AvatarFallback>{author?.username.at(0) || anonymous?.at(0)}</AvatarFallback>
          </Avatar>
          <span>{author?.username || anonymous}</span>
        </div>
      )
    },
    sortingFn: (rowA, rowB) => {
      const authorA = rowA.original.author?.username || rowA.original.anonymousUsername
      const authorB = rowB.original.author?.username || rowA.original.anonymousUsername
      return authorA!.localeCompare(authorB!)
    },
  },
  {
    header: 'Statut',
    accessorKey: 'isApproved',
    accessorFn: (row) => (row.isApproved ? 'Approuvé' : 'En attente'),
    cell: ({ row }) => {
      const isApproved = row.getValue('isApproved') === 'Approuvé'

      return (
        <Badge
          data-approved={isApproved}
          className="data-[approved=true]:bg-emerald-400/20 data-[approved=true]:text-emerald-500 data-[approved=false]:bg-indigo-400/20 data-[approved=false]:text-indigo-500"
        >
          {row.getValue('isApproved')}
        </Badge>
      )
    },
    meta: {
      filterVariant: 'select',
    },
    filterFn: (row, id, filterValue) => {
      const rowValue = row.getValue(id)
      return String(rowValue) === filterValue || filterValue === 'all'
    },
  },
  {
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
            <DropdownMenuGroup>
              {row.original.isApproved && (
                <DropdownMenuItem asChild>
                  <Link
                    to="/vote/$p1/$p2"
                    params={{
                      p1: row.original.propositions[0].slug,
                      p2: row.original.propositions[1].slug,
                    }}
                  >
                    <TicketIcon />
                    Voter
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

interface DilemasTableProps {
  data: Dilemma[]
}

export function DilemasTable({ data }: DilemasTableProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'isApproved',
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
        <div className="w-44">
          <DataTableFilter column={table.getColumn('title')!} />
        </div>
        <div className="w-36">
          <DataTableFilter column={table.getColumn('isApproved')!} />
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
                      <TableExpandedRow row={row} />
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
