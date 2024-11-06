'use client';
import DataTable from "@/components/data/table"
import ModelProvider from "@/lib/provider";

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
        <ModelProvider modelName="marketingBanners">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold tracking-tight">Marketing Banners</h2>

                </div>

                <DataTable canDelete={true}
                    showNew={true}
                    model={'MarketingBanner'}
                    preloads={['marketing_campaign', 'seller', 'payment', 'location']}
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





                    ]}


                />
            </div>
        </ModelProvider>

    )
}