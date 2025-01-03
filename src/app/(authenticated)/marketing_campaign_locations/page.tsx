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
                <h2 className="text-3xl font-bold tracking-tight">Unit of Measurements</h2>

            </div>

            <DataTable canDelete={true}
                showNew={true}
                model={'UnitMeasurement'}
                search_queries={['a.name']}
                // buttons={[{ name: 'Approve', onclickFn: approveFn }]}
                customCols={
                    [
                        {
                            title: 'General',
                            list: [
                                'id',
                                'name',
                                { label: 'is_b2b', boolean: true }



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

                    { label: 'Name', data: 'name' },
                    {
                        label: 'B2B?', data: 'is_b2b', color: [
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
                    { label: 'Timestamp', data: 'inserted_at',  formatDateTime: true , offset: 8 },



                ]}


            />
        </div>
    )
}