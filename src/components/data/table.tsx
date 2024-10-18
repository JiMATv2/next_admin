'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { genInputs } from '@/lib/svt_utils'
import DynamicForm from './dynaform'
import { PHX_ENDPOINT, PHX_HTTP_PROTOCOL } from '@/lib/constants'
import { useAuth } from '@/lib/auth'

// Assuming these are defined in your environment variables

const url = PHX_HTTP_PROTOCOL + PHX_ENDPOINT;

interface DataTableProps {
  appendQueries?: Record<string, string>
  showNew?: boolean
  canDelete?: boolean
  search_queries?: string[]
  model: string
  preloads?: string[]
  buttons?: {
    name: string
    onclickFn: (item: any, refreshData: () => void, confirmModalFn: (bool: boolean, message: string, fn: () => void, opts?: any) => void) => void
    href?: (item: any) => string
    showCondition?: (item: any) => boolean
  }[]
  customCols?: {
    title: string
    list: (string | {
      label: string
      hidden?: boolean
      value?: any
      selection?: string
      customCols?: any
      search_queries?: string[]
      newData?: string
      title_key?: string
      boolean?: boolean
      upload: boolean
    })[]
  }[]
  columns: {
    label: string
    data: string
    formatDateTime?: boolean
    offset?: number
    isBadge?: boolean
    color?: { key: string, value: string }[]
    through?: string[]
  }[]
}

export default function DataTable({
  appendQueries = {},
  showNew = false,
  canDelete = false,
  search_queries = [],
  model,
  preloads = [],
  buttons = [],
  customCols = [],
  columns
}: DataTableProps) {
  const { user, logout } = useAuth()

  console.log(user)
  const [items, setItems] = useState<any[]>([])
  const [colInputs, setColInputs] = useState<any[]>([]) // State to hold colInputs
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searchQuery, setSearchQuery] = useState<Record<string, string>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const [confirmModalMessage, setConfirmModalMessage] = useState('')
  const [confirmModalFunction, setConfirmModalFunction] = useState<(() => void) | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  let selectedData = {};
  const itemsPerPage = 100

  // Fetch colInputs using genInputs inside useEffect
  useEffect(() => {
    const fetchColInputs = async () => {
      const inputs = await genInputs(url, model);
      setColInputs(inputs);
    };
    fetchColInputs();
  }, []);

  const buildSearchString = useCallback((query: Record<string, string>) => {
    const slist = Object.entries(query)
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}=${value}`)
    return slist.join('|') || search_queries.join('|')
  }, [search_queries])

  function buildQueryString(data: any, parentKey: any) {
    return Object.keys(data)
      .map((key): any => {
        const nestedKey = parentKey
          ? `${parentKey}[${encodeURIComponent(key)}]`
          : encodeURIComponent(key);

        if (data[key] != null && typeof data[key] === 'object' && !Array.isArray(data[key])) {
          return buildQueryString(data[key], nestedKey);
        } else if (data[key] == null) {
          return ``;
        } else {
          return `${nestedKey}=${encodeURIComponent(data[key])}`;
        }
      })
      .join('&');
  }
  const fetchData = useCallback(async (pageNumber: number) => {
    if (isLoading) return; // Avoid fetching data while it's already being fetched

    setIsLoading(true);
    setError(null);

    const apiData = {
      search: { regex: 'false', value: '' },
      additional_join_statements: null,
      additional_search_queries: buildSearchString(searchQuery),
      draw: '1',
      length: itemsPerPage,
      model: model,
      columns: { 0: { data: 'id', name: 'id' } },
      order: { 0: { column: 0, dir: 'desc' } },
      preloads: JSON.stringify(preloads),
      start: (pageNumber - 1) * itemsPerPage,
    };

    const queryString = buildQueryString({ ...apiData, ...appendQueries }, null);
    const blog_url = PHX_HTTP_PROTOCOL + PHX_ENDPOINT;
    console.log(blog_url)
    try {
      const response = await fetch(`${blog_url}/svt_api/${model}?${queryString}`, {
        headers: {
          'content-type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const dataList = await response.json();
      setItems(dataList.data);
      setTotalPages(Math.ceil(dataList.recordsFiltered / itemsPerPage));
    } catch (error) {
      console.error('An error occurred', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  },
    [model, searchQuery, appendQueries, preloads, buildSearchString]
  );


  useEffect(() => {
    fetchData(currentPage)
  }, [currentPage, searchQuery]) // Remove fetchData as a dependency


  const handleSearch = () => {
    setCurrentPage(1)
    fetchData(1)
  }
  const handleNew = () => {
    setSelectedItem({id: 0})
    setIsModalOpen(true)

  }

  const handleEdit = (item: any) => {

    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleDelete = (item: any) => {
    setSelectedItem(item)
    setConfirmModalMessage('Are you sure you want to delete this item?')
    setConfirmModalFunction(() => async () => {
      // Implement delete API call here
      console.log('Deleting item', item.id)
      await fetchData(currentPage)
      setConfirmModalOpen(false)
    })
    setConfirmModalOpen(true)
  }

  const confirmModalFn = (bool: boolean, message: string, fn: () => void, opts?: any) => {
    setConfirmModalOpen(bool)
    setConfirmModalMessage(message)
    setConfirmModalFunction(() => fn)
  }

  const renderCell = (item: any, column: any) => {
    let value = item[column.data]
    if (column.through) {
      value = column.through.reduce((acc: any, key: string) => acc && acc[key], item)
    }
    if (column.formatDateTime) {
      // Implement date formatting
      const date = new Date(value)
      value = date.toLocaleString('en-US', { timeZone: 'UTC' })
    }
    if (column.isBadge) {
      const color = column.color?.find((c: { key: string }) => c.key === String(value))?.value || 'gray'
      return <Badge variant={color as any}>{String(value)}</Badge>
    }
    return String(value)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        {search_queries.map((query, index) => (
          <Input
            key={index}
            placeholder={query.split('.')[1]}
            value={searchQuery[query] || ''}
            onChange={(e) => setSearchQuery({ ...searchQuery, [query]: e.target.value })}
          />
        ))}
        <Button onClick={handleSearch}>Search</Button>
        {showNew && <Button onClick={
          handleNew
        }>New</Button>}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index}>{column.label}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item, itemIndex) => (
            <TableRow key={itemIndex}>
              {columns.map((column, columnIndex) => (
                <TableCell key={columnIndex}>
                  {renderCell(item, column)}
                </TableCell>
              ))}
              <TableCell>
                <Button variant="ghost" onClick={() => handleEdit(item)}>Edit</Button>
                {buttons.map((button, buttonIndex) => (
                  (!button.showCondition || button.showCondition(item)) && (
                    <Button
                      key={buttonIndex}
                      variant="ghost"
                      onClick={() => button.onclickFn(item, () => fetchData(currentPage), confirmModalFn)}
                    >
                      {button.name}
                    </Button>
                  )
                ))}
                {canDelete && (
                  <Button variant="ghost" onClick={() => handleDelete(item)}>Delete</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center space-x-2">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Item</DialogTitle>
          </DialogHeader>
          <DynamicForm data={selectedItem} inputs={colInputs} customCols={customCols} module={model} postFn={function (): void {
            throw new Error('Function not implemented.')
          }}

          />
        </DialogContent>
      </Dialog>

      <Dialog open={confirmModalOpen} onOpenChange={
        setConfirmModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
          </DialogHeader>
          <DialogDescription>{confirmModalMessage}</DialogDescription>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setConfirmModalOpen(false)}>Cancel</Button>
            <Button onClick={() => confirmModalFunction && confirmModalFunction()}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
