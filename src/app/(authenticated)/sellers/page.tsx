import DataTable from "@/components/data/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/lib/auth"
import { PlusIcon } from 'lucide-react'

export default function SellersPage() {

  // This is a placeholder for future implementation

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Sellers</h2>
        
      </div>

      <DataTable canDelete={true}
        showNew={true}
        model={'Seller'}
        search_queries={['a.name']}
        customCols={
          [
            {
              title: 'General',
              list: [
                'id',
                'name',
                'username',
                'email',
                'phone',
                {
                  label: 'staff_id',
                  customCols: null,
                  selection: 'Staff',
                  search_queries: ['a.name'],
                  newData: 'name',
                  title_key: 'name'
              }

              ]
            },
            {
              title: 'Detail',
              list: [
                'jenis_lesen',
                'lesen_no',
                'bank_account_no',
                'bank_name',
                'bank_account_holder'
              ]
            },
          ]
        }
        columns={[

          { label: 'Name', data: 'name' },
          { label: 'Username', data: 'username' },
          { label: 'Email', data: 'email' },
          { label: 'Phone', data: 'phone' }

        ]}


      />
    </div>
  )
}