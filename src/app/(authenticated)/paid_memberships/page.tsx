'use client';
import DataTable from "@/components/data/table"

export default function PaymentsPage() {

    // This is a placeholder for future implementation
// todo: show the total paid amount

    function approveFn(data: any) {
        console.log(data)
        return null;
    }


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Paid Memberships</h2>

            </div>

            <DataTable canDelete={true}
                showNew={true}
                model={'PaidMembership'}
                preloads={['membership_package', 'seller', 'payment']}
                join_statements={[{membership_package: 'membership_package'}, {seller: 'seller'}]}
                search_queries={['b.name|c.name']} 
                // buttons={[{ name: 'Approve', onclickFn: approveFn }]}
                customCols={
                    [
                        {
                            title: 'General',
                            list: [
                                'id',
                                {
                                    label: 'seller_id',
                                    customCols: null,
                                    selection: 'Seller',
                                    search_queries: ['a.name'],
                                    newData: 'name',
                                    title_key: 'name'
                                },

                                'start_date',
                                'end_date',
                                'payment_id',
                                {
                                    label: 'membership_package_id',
                                    customCols: null,
                                    selection: 'MembershipPackage',
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

                    { label: 'Package', data: 'name', through: ['membership_package'] },
                    { label: 'Paid (MYR)', data: 'price', through: ['membership_package'] },
                    { label: 'Seller', data: 'name', through: ['seller'] },
                    { label: 'Start', data: 'start_date', },
                    { label: 'End', data: 'end_date', },
                    { label: 'Payment', data: 'payment', showJson: true },
                ]}


            />
        </div>
    )
}