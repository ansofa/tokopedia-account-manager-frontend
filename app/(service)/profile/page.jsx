"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { fetchProfile, getAllProfile } from "@/rest/profile";
import { ProfileLoading } from "./profile-loading";

export default function Profile() {
  const [allProfiles, setAllProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaderTotal, setLoaderTotal] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileIds = await getAllProfile();
        setLoaderTotal(profileIds.data);
        const profileDetails = await Promise.all(profileIds.data.map(async (data) => fetchProfile(data.id)));
        const profiles = profileIds.data.map((data, index) => ({
          data,
          details: profileDetails[index],
        }));
        setAllProfiles(profiles);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 container mx-auto my-8">
      {loading
        ? Array.from({ length: loaderTotal.length }).map((_, index) => <ProfileLoading key={index} />)
        : allProfiles.map((profile, index) => (
            <Card key={`${profile.id}_${index}`}>
              <CardContent className="grid my-4 gap-6">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/01.png" />
                  </Avatar>
                  <div>
                    {profile.details.data ? (
                      <>
                        <p className="text-sm font-medium leading-none">{profile.details.data.name}</p>
                        <p className="text-sm text-muted-foreground">{profile.details.data.phone}</p>
                        <p className="text-sm text-muted-foreground">Saldo {profile.details.data.saldoTokopedia}</p>
                      </>
                    ) : (
                      <>
                      <p className="text-sm text-red-500">FAILED</p>
                      <p className="text-sm text-red-500">Data profil gagal dimuat</p>
                      <p className="text-sm text-red-500">Silahkan Reload Page</p>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
    </div>
  );
}
