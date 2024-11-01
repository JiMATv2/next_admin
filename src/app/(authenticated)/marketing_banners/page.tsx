'use client';
import DataTable from "@/components/data/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/lib/auth"
import { PlusIcon } from 'lucide-react'

export default function MarketingBannerPage() {

    // This is a placeholder for future implementation

    function hrefFn(data: any) {
        console.log(data)
        return '/marketing_banners/' + data.id + '/marketing_banner_products';
    }

    function approveFn(data: any) {
        console.log(data)
        return null;
    }


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Marketing Banner</h2>

            </div>

            <DataTable canDelete={true}
                showNew={true}
                model={'MarketingBanner'}
                preloads={['marketing_campaign', 'seller', 'payment']}
                search_queries={['a.name']}
                buttons={[{ name: 'Participating Products', onclickFn: approveFn, href: hrefFn }]}
               
                customCols={
                    [
                        {
                            title: 'General',
                            list: [
                                'id',
                                'name',
                                {
                                    label: 'marketing_campaign_id',
                                    customCols: null,
                                    selection: 'MarketingCampaign',
                                    search_queries: ['a.name'],
                                    newData: 'name',
                                    title_key: 'name'
                                },
                                'payment_id',
                                {
                                    label: 'seller_id',
                                    customCols: null,
                                    selection: 'Seller',
                                    search_queries: ['a.name'],
                                    newData: 'name',
                                    title_key: 'name'
                                },
                                { label: 'is_approved', boolean: true },
                                { label: 'img_url', upload: true }



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
                    { label: 'Seller', data: 'name', through: ['seller'] },


                    {
                        label: 'Approved?', data: 'is_approved', color: [
                            {
                                key: false,
                                value: 'destructive'
                            },

                            {
                                key: true,
                                value: 'default'
                            }
                        ]
                    },
                    { label: 'Payment', data: 'payment', showJson: true },





                ]}


            />
        </div>
    )
}