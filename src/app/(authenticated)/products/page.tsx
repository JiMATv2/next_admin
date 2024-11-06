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
                <h2 className="text-3xl font-bold tracking-tight">Products</h2>

            </div>

            <DataTable canDelete={true}
                showNew={true}
                model={'Product'}
                preloads={['seller', 'sub_category', 'category', 'brand']}
                search_queries={['a.name']}
                // buttons={[{ name: 'Approve', onclickFn: approveFn }]}
                customCols={
                    [
                        {
                            title: 'General',
                            list: [
                                'id',
                                'name',
                                'short_desc',
                                { label: 'is_visible', boolean: true },
                             
                                {
                                    label: 'brand_id',
                                    customCols: null,
                                    selection: 'Brand',
                                    search_queries: ['a.name'],
                                    newData: 'name',
                                    title_key: 'name'
                                },
                                {
                                    label: 'sub_category_id',
                                    customCols: null,
                                    selection: 'SubCategory',
                                    search_queries: ['a.name'],
                                    newData: 'name',
                                    title_key: 'name'
                                },
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
                                'id',
                                { label: 'is_visible', boolean: true },
                                { label: 'long_desc', editor2: true },
                            ]
                        },
                    ]
                }
                columns={[


                    { label: 'Timestamp', data: 'inserted_at',   formatDateTime: true , offset: 8 },
                    { label: 'Name', data: 'name' },
                    { label: 'Seller', data: 'name', through: ['seller'] },
                 
                    { label: 'Brand', data: 'name', through: ['brand'] },
                    { label: 'Category', data: 'name', through: ['category'] },
                    { label: 'SubCategory', data: 'name', through: ['sub_category'] },
       

                    {
                        label: 'Visible?', data: 'is_visible', color: [
                            {
                                key: false,
                                value: 'destructive'
                            },

                            {
                                key: true,
                                value: 'default'
                            }
                        ]
                    }
                ]}


            />
        </div>
    )
}