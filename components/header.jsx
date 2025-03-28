import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import Link from "next/link";
import { Button } from "./ui/button";
import { LayoutDashboard, PenBox } from "lucide-react";

import { checkUser } from "@/lib/checkUser";

import { AnimatedGradientText } from "./magicui/animated-gradient-text";

const Header = async () => {
  await checkUser();
  return (
    <div className="fixed top-0 w-full bg-black backdrop-blur-md z-50 border-b  ">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <AnimatedGradientText className="text-2xl sm:text-3xl md:text-4xl font-medium">
            FinGenius
          </AnimatedGradientText>
        </Link>
        <div className="flex items-center space-x-4">
          <SignedIn>
            <Link
              href={"/dashboard"}
              className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
            >
              <Button variant="outline">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>
            <Link href={"/transaction/create"}>
              <Button className="flex items-center gap-2 ">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default Header;
