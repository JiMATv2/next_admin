'use client'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LockIcon, MailIcon, UserIcon } from 'lucide-react'
import { postData } from '@/lib/svt_utils'
import { PHX_ENDPOINT, PHX_HTTP_PROTOCOL } from '@/lib/constants'

export default function SignUpPage() {
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log('Sign-up attempted with:', { name, email, password, confirmPassword })
    const url = `${PHX_HTTP_PROTOCOL}${PHX_ENDPOINT}/admin/sign-up`
    let res = await postData({
      endpoint: url,
      data: { first_name, last_name, email, password, confirmPassword }
    })

    console.log('Sign-up response:', res)


    let sampleRes = {
      "statusCode": 201,
      "message": "",
      "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoieWl0aGFuZ2xlZUBnbWFpbC5jb20iLCJpYXQiOjE3MzMzNjI2NjYsImV4cCI6MTczMzM2MzU2Nn0.6L_AEmEJ1XCwM2-c7uz_h7PDhjZA_ClD0bYfMyZcJ3c",
        "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoieWl0aGFuZ2xlZUBnbWFpbC5jb20iLCJpYXQiOjE3MzMzNjI2NjYsImV4cCI6MTczNDU3MjI2Nn0.hWor8ZdNto_c84z-PC5KisGL_UqGPcSaVhRURLFKH9Q"
      }
    }

    if (res.statusCode == 201) {
      Cookies.set('access_token', res.data.access_token)
      Cookies.set('refresh_token', res.data.refresh_token)
      router.push('/dashboard')
    }

   
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>Create an account to access the Seller Portal</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">First Name</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  placeholder="John"
                  type="text"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Last Name</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  placeholder="Doe"
                  type="text"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  placeholder="m@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <LockIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-center w-full text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}