"use client"

import { postRegistration } from "@/app/rest/api"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/router"
import { useState } from "react"

export default function Registration() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const serviceRegistration = async (e) => {
    e.preventDefault();
    const isSuccess = await postRegistration(
      {
        fullName,
        email,
        password,
        confirmPassword
      }
    )

    if (isSuccess && isSuccess.status === 'success') {
      alert(isSuccess.message);

      setTimeout(() => {
        router.push("/");
      }, 1000)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      {console.log(email)}
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Create your email by filling this section
          </CardDescription>
        </CardHeader>
        <CardContent onSubmit={serviceRegistration} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input 
            id="full_name" 
            type="text" 
            placeholder="Full Name" 
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value)
            }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input 
            id="email" 
            type="email" 
            placeholder="m@example.com" 
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
            id="password" 
            type="password" 
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input 
            id="confirm_password" 
            type="password" 
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
            }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
