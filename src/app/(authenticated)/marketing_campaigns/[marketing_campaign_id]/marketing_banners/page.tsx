'use client';
import { BreadcrumbHelper } from "@/components/data/breadcrumbHelper";
import DataTable from "@/components/data/table"
import ModelProvider from "@/lib/provider";
import { useEffect, useState } from "react";

export default function PaymentsPage({ params }: { params: { marketing_campaign_id: string } }) {
    const [data, setData] = useState<any[]>([]);

    const marketingCampaignId = params.marketing_campaign_id

    useEffect(() => {
        const storedData = localStorage.getItem('marketingCampaignsData');  // Replace 'modelData' with your key
        if (storedData) {
            setData(JSON.parse(storedData));  // Parse and set the data in state
        }
    }, []);


    const [title, setTitle] = useState<string>('');
    useEffect(() => {
        let filteredData = data.filter((v, i) => {
            return v.id == marketingCampaignId
        })[0]
        console.log(filteredData)
        if (filteredData) {
            setTitle(filteredData.name);
        }

    }, [data])
    function approveFn(data: any) {
      
        return null;
    }

    function hrefFn(data: any) {
     
        return '/marketing_banners/' + data.id + '/marketing_banner_products';
    }

    return (

        <div className="space-y-6">

            <BreadcrumbHelper items={[
                { link: '/marketing_campaigns', title: 'Marketing Campaigns' },
                { link: `/marketing_campaigns/${marketingCampaignId}/marketing_banners`, title: `${title}` },
                // { link: '', title: 'Edit Banner' }
            ]} />

            <ModelProvider modelName="marketingBanners">
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-3xl font-bold tracking-tight">Submitted Banners - {title}</h2>

                    </div>

                    <DataTable canDelete={true}
                    showNew={true}
                    model={'MarketingBanner'}
                    preloads={['marketing_campaign', 'seller', 'payment', 'location', 'products', 'banner_position']}
                    search_queries={['b.name|c.name']}
                    join_statements={[{seller: 'seller'}, {location: 'location'}]}
                    buttons={[{ name: 'Participating Products', onclickFn: approveFn, href: hrefFn }]}

                    customCols={
                        [
                            {
                                title: 'General',
                                list: [
                                    'id',
                               
                                    {
                                        label: 'banner_position_id',
                                        customCols: null,
                                        selection: 'BannerPosition',
                                        search_queries: ['a.name'],
                                        newData: 'name',
                                        title_key: 'name'
                                    },
                                    {
                                        label: 'location_id',
                                        customCols: null,
                                        selection: 'Location',
                                        search_queries: ['a.name'],
                                        newData: 'name',
                                        title_key: 'name'
                                    },
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
                        // { label: 'Name', data: 'name' },
                        { label: 'Location', data: 'name', through: ['location'] },
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
                        { label: 'Products', data: 'products', showJson: true },




                    ]}


                />
                </div>
            </ModelProvider>
        </div>
    )
}