"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

type Column = string | { label: string; data: string; alt_class?: string }

interface DynamicFormProps {
  model: string
  customCols: Column[]
  data: Record<string, any>
  onSuccessCallback: () => void
  onFailedCallback: () => void
}

export default function Component({
  model = "Users",
  customCols = ['id', { label: 'Name', data: 'name', alt_class: 'text-sm' }],
  data = { id: 1, name: 'damien' },
  onSuccessCallback = () => {},
  onFailedCallback = () => {}
}: DynamicFormProps) {
  const [formData, setFormData] = useState(data)

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    // For this example, we'll just simulate a successful submission
    console.log("Form submitted with data:", formData)
    onSuccessCallback()
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{model} Form</CardTitle>
        <CardDescription>Edit {model.toLowerCase()} information</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {customCols.map((col, index) => {
            const isString = typeof col === 'string'
            const key = isString ? col : col.data
            const label = isString ? col : col.label
            const altClass = !isString && col.alt_class ? col.alt_class : ''

            return (
              <div key={index} className="space-y-2">
                <Label htmlFor={key} className={altClass}>
                  {label}
                </Label>
                <Input
                  id={key}
                  value={formData[key] || ''}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className={altClass}
                />
              </div>
            )
          })}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Save Changes</Button>
        </CardFooter>
      </form>
    </Card>
  )
}