'use client';
import DataTable from "@/components/data/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/lib/auth"
import { PlusIcon } from 'lucide-react'
import ModelProvider, { useModel } from '@/lib/provider';
import { useEffect, useState } from "react";

export default function PaymentsPage({ params }: { params: { marketing_banner_id: string } }) {
    const [data, setData] = useState<any[]>([]);
    console.log(data)
    const marketing_banner_id = params.marketing_banner_id
    // Load data from localStorage when the component mounts
    useEffect(() => {
        const storedData = localStorage.getItem('modelData');  // Replace 'modelData' with your key
        if (storedData) {
            setData(JSON.parse(storedData));  // Parse and set the data in state
        }
    }, []);
    // This is a placeholder for future implementation

    function approveFn(data: any) {
        console.log(data)
        return null;
    }


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Submitted Products</h2>

            </div>


            <DataTable canDelete={true}
                showNew={true}
                appendQueries={{ marketing_banner_id: marketing_banner_id }}
                model={'MarketingBannerProduct'}
                preloads={['product', 'price', 'seller', 'price_group']}
                search_queries={['b.name']}
                // buttons={[{ name: 'Approve', onclickFn: approveFn }]}
                customCols={
                    [
                        {
                            title: 'General',
                            list: [
                                'id',
                                'marketing_banner_id',
                             {label: 'img_url', upload: true},
                                {
                                    label: 'product_id',
                                    customCols: null,
                                    selection: 'Product',
                                    search_queries: ['a.name'],
                                    newData: 'name',
                                    title_key: 'name'
                                },

                                {
                                    label: 'price_id',
                                    customCols: null,
                                    selection: 'Price',
                                    // search_queries: ['b.seller'],
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
                    { label: 'Cover', data: 'img_url', showImg: true },
                    { label: '', data: 'img_url', showPreview: true },
                    { label: 'Product', data: 'name', through: ['product'] },
                    { label: 'Amount (MYR)', data: 'amount', through: ['price'] },
                    { label: 'Price Group', data: 'name', through: ['price_group'] },
                    { label: 'Seller', data: 'name', through: ['seller'] },

                ]}


            />
        </div>
    )
}