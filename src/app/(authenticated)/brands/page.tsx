'use client';
import DataTable from "@/components/data/table"

export default function PaymentsPage() {

    // This is a placeholder for future implementation


    function approveFn(data: any) {
        console.log(data)
        return null;
    }


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Brands</h2>

            </div>

            <DataTable canDelete={true}
                showNew={true}
                model={'Brand'}
                preloads={['seller']}
                // join_statements={[{seller: 'seller'}]}
                // search_queries={['a.channel_ref|b.name']}
                // buttons={[{ name: 'Approve', onclickFn: approveFn }]}
                customCols={
                    [
                        {
                            title: 'General',
                            list: [
                                'id',

                                // {
                                //     label: 'status',
                               
                                //     selection: ['pending_payment', 'paid'],
                                 
                                // },

                                // 'amount',
                                'name',
                                'desc',
                                {label: 'img_url', upload: true},
                                // 'channel',
                                // 'channel_ref',
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
                    { label: 'Image', data: 'img_url', showImg: true },
                    { label: '', data: 'img_url', showPreview: true },
                    { label: 'Name', data: 'name', },
                    { label: 'Description', data: 'desc', },
               
                
                    { label: 'Seller', data: 'name', through: ['seller'] },
                   

                ]}


            />
        </div>
    )
}