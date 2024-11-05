'use client';
import DataTable from "@/components/data/table"
import { useEffect, useState } from "react";

export default function PaymentsPage({ params }: { params: { marketing_campaign_id: string } }) {
    const [data, setData] = useState<any[]>([]);

    const marketingCampaignId = params.marketing_campaign_id

    useEffect(() => {
        const storedData = localStorage.getItem('modelData');  // Replace 'modelData' with your key
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
        console.log(data)
        return null;
    }


    return (
        
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Submitted Banners - {title}</h2>

            </div>


            <DataTable canDelete={true}
                showNew={true}
                appendQueries={{ marketing_campaign_id: marketingCampaignId }}
                model={'MarketingBanner'}
                preloads={['seller']}
                search_queries={['a.name']}
                // buttons={[{ name: 'Approve', onclickFn: approveFn }]}
                customCols={
                    [
                        {
                            title: 'General',
                            list: [
                                'id',
                                {label: 'is_approved', boolean: true},
                                // {label: 'background_img_url', upload: true},

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
                    { label: 'Seller', data: 'name', through: ['seller'] },
                    { label: 'Image', data: 'img_url', showImg: true },
                    { label: '', data: 'img_url', showPreview: true },
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
               
               






                ]}


            />
        </div>
    )
}