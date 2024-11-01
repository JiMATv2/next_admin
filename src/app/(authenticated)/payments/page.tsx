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
                <h2 className="text-3xl font-bold tracking-tight">Payments</h2>

            </div>

            <DataTable canDelete={true}
                showNew={true}
                model={'Payment'}
                preloads={['seller']}
                join_statements={[{seller: 'seller'}]}
                search_queries={['a.channel_ref|b.name']}
                // buttons={[{ name: 'Approve', onclickFn: approveFn }]}
                customCols={
                    [
                        {
                            title: 'General',
                            list: [
                                'id',

                                {
                                    label: 'status',
                               
                                    selection: ['pending_payment', 'paid'],
                                 
                                },

                                'amount',
                                'desc',
                       
                                'channel',
                                'channel_ref',
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


                    { label: 'Timestamp', data: 'inserted_at', formatDateTime: true, offset: 8 },
            

                    {
                        label: 'Status', data: 'status', color: [
                            {
                                key: 'pending_payment',
                                value: 'destructive'
                            },

                            {
                                key: 'paid',
                                value: 'default'
                            }
                        ]
                    },
                    { label: 'Paid (MYR)', data: 'amount' },
                    { label: 'Seller', data: 'name', through: ['seller'] },
                    { label: 'Description', data: 'desc', },
                    { label: 'Ref', data: 'ref_no', },
                    { label: 'Channel', data: 'channel', },
                    { label: 'Ch. Ref', data: 'channel_ref', },

                ]}


            />
        </div>
    )
}