"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

export default function Profile() {
  const [allProfile, setAllProfile] = useState([])

  

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 container mx-auto my-8">
      <Card>
        <CardContent className="grid my-4 gap-6">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                <p className="text-sm text-muted-foreground">m@example.com</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="grid my-4 gap-6">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                <p className="text-sm text-muted-foreground">m@example.com</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="grid my-4 gap-6">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                <p className="text-sm text-muted-foreground">m@example.com</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="grid my-4 gap-6">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                <p className="text-sm text-muted-foreground">m@example.com</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="grid my-4 gap-6">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/avatars/01.png" />
              </Avatar>
              <div>
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                <p className="text-sm text-muted-foreground">m@example.com</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
