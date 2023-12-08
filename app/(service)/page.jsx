"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { fetchProfile, getAllProfile } from "@/rest/profile";
import { ProfileLoading } from "./profile-loading";
import { deleteProfile } from "@/rest/profile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { ButtonLoading } from "@/components/button-loading";

export default function Home() {
  const [allProfiles, setAllProfiles] = useState(null);
  const [loadingSkeleton, setLoadingSkeleton] = useState(true);
  const [loaderTotal, setLoaderTotal] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [triggerFetch, setTriggerFetch] = useState(false);

  const deleteSubmit = async (profileId) => {
    setIsLoading(true);
    console.log(JSON.stringify(allProfiles));
    await deleteProfile(profileId);
    setIsLoading(false);
    setTriggerFetch(true);
    setShowDelete(false);
  };

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
        setLoadingSkeleton(false);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setLoadingSkeleton(false);
      }
    };
    fetchData();
    return () => {
      setTriggerFetch(false);
    };
  }, [triggerFetch]);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 container mx-auto my-8">
      {loadingSkeleton
        ? Array.from({ length: loaderTotal.length }).map((_, index) => <ProfileLoading key={index} />)
        : allProfiles.map((profile, index) => (
            <Card key={`${profile.data.id}_${index}`}>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="grid justify-items-end">
                    <Button variant="ghost" className="h-8">
                      <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-auto" align="end" forceMount>
                  <DropdownMenuItem onSelect={() => setShowDelete(true)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialog open={showDelete} onOpenChange={setShowDelete}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Apakah anda yakin ingin menghapus profile ?</AlertDialogTitle>
                    <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {isLoading ? <ButtonLoading /> : <Button onClick={() => deleteSubmit(profile.data.id)}>Delete</Button>}
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <CardContent className="grid mt-0.25 mb-4 gap-6">
                <div className="flex items-center space-x-4">
                  <Avatar>{profile.details.data && <AvatarImage src={profile.details.data.profilePicture} />}</Avatar>
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
