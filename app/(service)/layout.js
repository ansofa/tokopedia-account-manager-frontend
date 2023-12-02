"use client";

import "../globals.css";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { useRouter } from "next/navigation";
import { getUser } from "@/rest/auth";
import { useEffect, useState } from "react";
import GlobalContext from "@/contexts/GlobalContext";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }) {
  const router = useRouter();
  const [userAuthenticated, setUserAuthenticated] = useState({});


  useEffect(() => {
    const checkUser = async () => {
      const user = await getUser();

      if (user.data) {
        setUserAuthenticated(user.data);
      } else {
        setUserAuthenticated({});
        router.push("/login");
      }
    };

    checkUser();
  }, [router]);

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <GlobalContext.Provider value={{userAuthenticated, setUserAuthenticated}} >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
          </GlobalContext.Provider>
        </body>
      </html>
    </>
  );
}
