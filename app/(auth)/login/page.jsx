"use client";

import { ButtonLoading } from "@/components/button-loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/rest/auth";
import { setCookie } from "@/utils/cookies";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function Login() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [responseError, setResponseError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loginSubmit = async (data) => {
    setIsLoading(true);
    const response = await login(data);
    console.log(data);
    if (response.accessToken) {
      setCookie("accessToken", response.accessToken, {
        expires: 1,
      });
      router.push("/");
    } else {
      setResponseError(response.message || "Server error");
    }
    setIsLoading(false);
  };
  return (
      <div className="flex items-center justify-center h-screen">
        <Card className="w-full max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center">Sign In</CardTitle>
            <CardDescription className="text-center">Enter your email below for login into your account</CardDescription>
          </CardHeader>
          {responseError && <div className="text-red-500 text-sm text-center mb-4">{responseError}</div>}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(loginSubmit)} className="space-y-8">
              <CardContent className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <Label>Email</Label>
                        <FormControl>
                          <Input id="email" type="email" placeholder="m@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-2">
                        <Label>Password</Label>
                        <FormControl>
                          <Input id="password" type="password" placeholder="******" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                {isLoading ? (
                  <ButtonLoading classNameLoading="w-full" />
                ) : (
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                )}
              </CardFooter>
            </form>
          </Form>
          <div className="my-4">
          <CardDescription className="text-center">Dont have an account? <Link className="text-blue-500" href="/registration">Sign Up</Link></CardDescription>
          </div>
        </Card>
      </div>
  );
}