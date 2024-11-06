'use client';
import { BreadcrumbHelper } from "@/components/data/breadcrumbHelper";
import DataTable from "@/components/data/table"
import { useEffect, useState } from "react";

export default function PaymentsPage({ params }: { params: { marketing_banner_id: string } }) {
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any>({id: 0, name: 0, marketing_campaign: {id: 0}});
    console.log(data)
    const marketing_banner_id = params.marketing_banner_id
    // Load data from localStorage when the component mounts
    useEffect(() => {
        const storedData = localStorage.getItem('marketingBannersData');  // Replace 'modelData' with your key
        if (storedData) {
            setData(JSON.parse(storedData));  // Parse and set the data in state
        }
    }, []);

    const [title, setTitle] = useState<string>('');
    useEffect(() => {
        let filteredResult = data.filter((v, i) => {
            return v.id == marketing_banner_id
        })[0]
        console.log(filteredResult)
        if (filteredResult) {
            setFilteredData(filteredResult)
            setTitle(filteredResult.seller.name + ' Submitted Products');
        }

    }, [data])
    function approveFn(data: any) {
        console.log(data)
        return null;
    }

    // filteredData

    return (
        <div className="space-y-6">

            <BreadcrumbHelper items={[
                { link: '/marketing_campaigns', title: 'Marketing Campaigns' },
                { link: `/marketing_campaigns/${filteredData.marketing_campaign.id}/marketing_banners`, title: `${filteredData.marketing_campaign.name}` },
                { link: `/marketing_campaigns/${filteredData.marketing_campaign.id}/marketing_banners`, title: `${title}` },
       
            ]} />
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">{title}</h2>

            </div>

            <DataTable canDelete={true}
                showNew={true}
                appendQueries={{ marketing_banner_id: marketing_banner_id }}
                model={'MarketingBannerProduct'}
                preloads={['product', 'price', 'seller', 'price_group']}
                search_queries={['b.name']}
                join_statements={[{product: 'product'}]}
                // buttons={[{ name: 'Approve', onclickFn: approveFn }]}
                customCols={
                    [
                        {
                            title: 'General',
                            list: [
                                'id',
                                'marketing_banner_id',
                                { label: 'img_url', upload: true },
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