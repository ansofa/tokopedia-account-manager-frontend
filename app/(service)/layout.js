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
        <head>
          <title>Tokopedia Account Manager</title>
        </head>
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          <GlobalContext.Provider value={{ userAuthenticated, setUserAuthenticated }}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader />
                <div className="flex-1">{children}</div>
              </div>
              <TailwindIndicator />
            </ThemeProvider>
          </GlobalContext.Provider>
          <footer className="py-6 md:px-8 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built by TEAM 3 BINAR FSW-37
              </p>
            </div>
          </footer>
        </body>
      </html>
    </>
  );
}
