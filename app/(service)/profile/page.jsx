"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { storeProfile } from "@/rest/profile";


const FormSchema = z.object({
  bearer: z.string().min(2, { message: "Invalid cookie" }),
})

export default function Profile() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bearer: "",
    },
  })
  const [responseError, setResponseError] = useState(null);
  const router = useRouter();

  const bearerSubmit = async (bearer) => {
    const response = await storeProfile(bearer);
    console.log(bearer);

    if (response && response.status === "SUCCESS") {
      alert(response.message)
      router.push("/");
    } else {
      setResponseError(response.message || "Server error");
    }

  };

  return (
    <div className="gap-4 md:grid-cols-2 lg:grid-cols-4 container mx-auto my-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(bearerSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="bearer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cookie</FormLabel>
                <FormControl>
                  <Input placeholder="Input your cookie here" {...field} />
                </FormControl>
                <FormDescription>
                {responseError && <div className="text-red-500 text-sm text-center mb-4">{responseError}</div>}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}