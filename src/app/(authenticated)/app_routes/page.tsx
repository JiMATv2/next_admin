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
                <h2 className="text-3xl font-bold tracking-tight">App Route</h2>

            </div>

            <DataTable canDelete={true}
                showNew={true}
                model={'AppRoute'}
                // preloads={['seller']}
                // join_statements={[{seller: 'seller'}]}
                // search_queries={['a.channel_ref|b.name']}
                // buttons={[{ name: 'Approve', onclickFn: approveFn }]}
                customCols={
                    [
                        {
                            title: 'General',
                            list: [
                                'id',
                                'name', 'icon', 'desc', 'route',
                             

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
                    { label: 'Name', data: 'name' },
                    { label: 'Icon', data: 'icon' },
                    { label: 'Desc', data: 'desc' },
                    { label: 'Route', data: 'route' },
                  


                ]}


            />
        </div>
    )
}