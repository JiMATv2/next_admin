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
                <h2 className="text-3xl font-bold tracking-tight">Products</h2>

            </div>

            <DataTable canDelete={true}
                showNew={true}
                model={'Product'}
                preloads={['seller']}
                search_queries={['a.name']}
                // buttons={[{ name: 'Approve', onclickFn: approveFn }]}
                customCols={
                    [
                        {
                            title: 'General',
                            list: [
                                'id',
                                'name',
                                'short_desc',
                                { label: 'is_visible', boolean: true },
                                { label: 'long_desc', editor2: true },
                                {
                                    label: 'seller_id',
                                    customCols: null,
                                    selection: 'Seller',
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


                    { label: 'Timestamp', data: 'inserted_at',   formatDateTime: true , offset: 8 },
                    { label: 'Seller', data: 'name', through: ['seller'] },
                    { label: 'Name', data: 'name' },

                    {
                        label: 'Visible?', data: 'is_visible', color: [
                            {
                                key: false,
                                value: 'destructive'
                            },

                            {
                                key: true,
                                value: 'default'
                            }
                        ]
                    }
                ]}


            />
        </div>
    )
}