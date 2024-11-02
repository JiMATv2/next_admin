'use client';
import DataTable from "@/components/data/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/lib/auth"
import { PlusIcon } from 'lucide-react'

export default function PaymentsPage() {

    // This is a placeholder for future implementation


    function approveFn(data: any) {
        console.log(data)
        return null;
    }


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Staffs</h2>

            </div>

            <DataTable canDelete={true}
                showNew={true}
                model={'Staff'}
                // preloads={['seller']}
                // join_statements={[{seller: 'seller'}]}
                // search_queries={['a.channel_ref|b.name']}
                // buttons={[{ name: 'Approve', onclickFn: approveFn }]}
                customCols={
                    [
                        {
                            title: 'General',
                            list: [
                                'id',
                                'name', 'username', 'phone', 'email',
                                'password',
                                {
                                    label: 'role_id',
                                    customCols: null,
                                    selection: 'Role',
                                    search_queries: ['a.name'],
                                    newData: 'name',
                                    title_key: 'name'
                                }
                            ]
                        },
                        {
                            title: 'Detail',
                            list: [

                            ]
                        },
                    ]
                }
                columns={[


                    { label: 'Timestamp', data: 'inserted_at', formatDateTime: true, offset: 8 },
                    { label: 'Name', data: 'name' },
                    { label: 'Username', data: 'username' },
                    { label: 'Phone', data: 'phone' },
                    { label: 'Email', data: 'email' }


                ]}


            />
        </div>
    )
}