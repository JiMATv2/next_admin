import DataTable from "@/components/data/table"

export default function SellersPage() {

  // This is a placeholder for future implementation

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Buyers</h2>
        
      </div>

      <DataTable canDelete={true}
        showNew={true}
        model={'User'}
        search_queries={['a.name']}
        customCols={
          [
            {
              title: 'General',
              list: [
                'id',
                'fullname',
                'username',
                'email',
                'phone',
                'uid',

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
          { label: 'Username', data: 'username' },
          { label: 'Email', data: 'email' },
          { label: 'Phone', data: 'phone' },
          { label: 'Uid', data: 'uid' }

        ]}


      />
    </div>
  )
}