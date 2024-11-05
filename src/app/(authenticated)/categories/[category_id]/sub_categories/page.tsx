'use client';
import DataTable from "@/components/data/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAuth } from "@/lib/auth"
import { PlusIcon } from 'lucide-react'
import ModelProvider, { useModel } from '@/lib/provider';
import { useEffect, useState } from "react";

export default function PaymentsPage({ params }: { params: { category_id: string } }) {
    const [data, setData] = useState<any[]>([]);

    const categoryId = params.category_id
    // Load data from localStorage when the component mounts
    useEffect(() => {
        const storedData = localStorage.getItem('modelData');  // Replace 'modelData' with your key
        if (storedData) {
            setData(JSON.parse(storedData));  // Parse and set the data in state
        }
    }, []);
    // This is a placeholder for future implementation

    function approveFn(data: any) {
        console.log(data)
        return null;
    }


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Sub Categories - {data[0].name}</h2>

            </div>


            <DataTable canDelete={true}
                showNew={true}
                appendQueries={{ category_id: categoryId }}
                model={'SubCategory'}
                preloads={['category']}
                search_queries={['a.name']}
                // buttons={[{ name: 'Approve', onclickFn: approveFn }]}
                customCols={
                    [
                        {
                            title: 'General',
                            list: [
                                'id',
                                'category_id',
                                'name',
                                'group',
                                'desc',
                                {label: 'img_url', upload: true},
                                {label: 'background_img_url', upload: true},

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
                    { label: 'Parent', data: 'name', through: ['category'] },
                    { label: 'Image', data: 'img_url', showImg: true },
                    { label: '', data: 'img_url', showPreview: true },
                    { label: 'Name', data: 'name', },
                    { label: 'Description', data: 'desc', },
               






                ]}


            />
        </div>
    )
}