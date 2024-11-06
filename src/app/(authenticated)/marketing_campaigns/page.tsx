'use client';
import { BreadcrumbHelper } from "@/components/data/breadcrumbHelper";
import DataTable from "@/components/data/table"
import ModelProvider from "@/lib/provider";

export default function MarketingCampaignPage() {

    // This is a placeholder for future implementation

    function approveFn(data: any) {
    
        return null;
    }
    function hrefFn(data: any) {
      
        return '/marketing_campaigns/' + data.id + '/marketing_banners';
    }



    return (
        <ModelProvider modelName="marketingCampaigns">
            <BreadcrumbHelper items={[
                { link: '/marketing_campaigns', title: 'Marketing Campaigns' },
                // { link: '/marketing_campaigns/123/marketing_banners', title: '11/11 Nov Sales...' },
                // { link: '', title: 'Edit Banner' }
            ]} />

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold tracking-tight">Marketing Campaign</h2>

                </div>

                <DataTable canDelete={true}
                    showNew={true}
                    model={'MarketingCampaign'}
                    search_queries={['a.name']}
                    buttons={[{ name: 'Submissions', onclickFn: approveFn, href: hrefFn }]}
                    customCols={
                        [
                            {
                                title: 'General',
                                list: [
                                    'id',
                                    'name',

                                    { label: 'short_desc', alt_class: 'w-2/3  mx-4 my-2 ' },
                                    { label: 'long_desc', editor2: true },
                                    'price',
                                    { label: 'img_url', upload: true },
                                    { label: 'date_start', date: true },
                                    { label: 'date_end', date: true },
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
                        { label: 'Name', data: 'name' },
                        { label: 'Date', data: 'date_start', subtitle: { label: '', data: 'date_end' } },
                        { label: 'Price (MYR)', data: 'price' },

                    ]}


                />
            </div>
        </ModelProvider>
    )
}