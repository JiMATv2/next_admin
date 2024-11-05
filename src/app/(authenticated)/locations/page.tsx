'use client';
import DataTable from "@/components/data/table"

export default function LocationsPage() {

    // This is a placeholder for future implementation


    function approveFn(data: any) {
        console.log(data)
        return null;
    }


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Locations</h2>

            </div>

            <DataTable canDelete={true}
                showNew={true}
                model={'Location'}
                search_queries={['a.name']}
                // buttons={[{ name: 'Approve', onclickFn: approveFn }]}
                customCols={
                    [
                        {
                            title: 'General',
                            list: [
                                'id',
                                'name',
                            



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
                    
                    { label: 'Timestamp', data: 'inserted_at',  formatDateTime: true , offset: 8 },



                ]}


            />
        </div>
    )
}