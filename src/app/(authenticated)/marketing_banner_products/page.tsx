'use client';
import DataTable from "@/components/data/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/lib/auth"
import { PlusIcon } from 'lucide-react'

export default function MarketingBannerProductPage() {

    // This is a placeholder for future implementation


    function approveFn(data: any) {
        console.log(data)
        return null;
    }


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Participating Products</h2>

            </div>

            <DataTable canDelete={true}
                showNew={true}
                model={'MarketingBannerProduct'}
                // search_queries={['a.name']}
                preloads={['product', 'price', 'seller', 'price_group']}
                customCols={
                    [
                        {
                            title: 'General',
                            list: [
                                'id',
                                'name',
                              



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