"use client";

import { ButtonLoading } from "@/components/button-loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import GlobalContext from "@/contexts/GlobalContext";
import { uploadImage, updateImage } from "@/rest/user-update";
import { useContext, useRef, useState } from "react";

export default function InputFile() {
  const { userAuthenticated } = useContext(GlobalContext);
  const [image, setImage] = useState(userAuthenticated.image);
  const [isLoading, setIsLoading] = useState(false);
  const [responseError, setResponseError] = useState(null);
  const hiddenFileInput = useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = async (e) => {
    setIsLoading(true);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const upload = await uploadImage(selectedFile);
      if (upload.url) {
        setImage(upload.url);
        await updateImage(upload.url);
        setIsLoading(false);
      } else {
        setResponseError(upload.message || "Server error");
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="flex items-center justify-center py-16">
      <Card className="w-full max-w-sm">
        <div className="grid justify-items-center my-8 space-y-6">
          <Avatar className="w-48 h-48">
            <AvatarImage src={image} />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          {responseError && <div className="text-red-500 text-sm text-center mb-4">{responseError}</div>}
          {isLoading ? (
                <ButtonLoading classNameLoading="w-48" />
              ) : (
                <Button variant="outline" className="w-48" onClick={handleClick}>
                  Pilih Foto
                </Button>
              )}
          <input type="file" onChange={handleChange} ref={hiddenFileInput} style={{ display: "none" }} />
        </div>
      </Card>
    </div>
  );
}
