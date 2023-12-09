"use client"


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
import { postRegistration } from "@/rest/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Registration() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [responseError, setResponseError] = useState(null);

  const router = useRouter();

  const serviceRegistration = async (e) => {
    e.preventDefault();
    const isSuccess = await postRegistration(
      {
        username,
        email,
        password,
        confPassword
      }
    )

    if (isSuccess && isSuccess.status === 'SUCCESS') {
      alert(isSuccess.message);

      setTimeout(() => {
        router.push("/login");
      }, 1000)
    } else {
      setResponseError(isSuccess.message || "Server error");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Create your email by filling this section
          </CardDescription>
        </CardHeader>
        {responseError && <div className="text-red-500 text-sm text-center mb-4">{responseError}</div>}
        <CardContent  className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              type="text"
              placeholder="Full Name"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value)
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
              value={confPassword}
              onChange={(e) => {
                setConfPassword(e.target.value)
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={serviceRegistration} className="w-full">Registration</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
