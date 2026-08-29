"use client";

import { ComponentProps, ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "./ui/separator";
import { X } from "@/icons/icons";
import { Eye, EyeOff } from "@/icons/icons";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.6 5.6 0 0 1-2.41 3.66v3h3.9c2.28-2.1 3.53-5.2 3.53-8.9Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.9-3a7.4 7.4 0 0 1-4.03 1.15c-3.1 0-5.72-2.1-6.66-4.92H1.3v3.09A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.34 14.33A7.2 7.2 0 0 1 4.96 12c0-.81.14-1.6.38-2.33V6.58H1.3A12 12 0 0 0 0 12c0 1.94.46 3.77 1.3 5.42l4.04-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.69 1.3 6.58l4.04 3.09C6.28 6.85 8.9 4.75 12 4.75Z"
      />
    </svg>
  );
}

type Props = {
  children: ReactNode;
} & ComponentProps<typeof Button>;

export function AuthDialog({ children, ...props }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            {...props}
            className={"hidden sm:flex rounded-full h-10 px-4 cursor-pointer"}
          >
            {children}
          </Button>
        }
      />
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-sm p-0 gap-0 overflow-hidden rounded-xl text-white"
      >
        <Card className="border-0 shadow-none bg-transparent gap-6 py-6">
          <CardHeader className="text-center px-6 relative">
            <DialogTrigger
              render={
                <Button
                  variant={"ghost"}
                  aria-label="Close"
                  size={"icon"}
                  className="absolute right-4 top-0 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X size={40} />
                </Button>
              }
            />
            <CardTitle className="text-2xl font-semibold text-white">
              Log in or sign up
            </CardTitle>
            <CardDescription className="text-white/60 text-[15px] leading-snug">
              You&apos;ll get smarter responses and can upload files, images
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 flex flex-col gap-2">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-full border-white/15 bg-transparent px-4 text-white placeholder:text-white/50 focus-visible:ring-white/30"
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-full border-white/15 bg-transparent px-4 pr-12! text-white placeholder:text-white/50 focus-visible:ring-white/30"
              />
              <Button
                onClick={togglePasswordVisibility}
                variant={"ghost"}
                className={
                  "absolute right-0 h-full w-11 rounded-full cursor-pointer"
                }
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>

            <Button
              type="submit"
              className="h-11 w-full rounded-full bg-white text-black hover:bg-white/90 font-medium cursor-pointer"
            >
              Continue
            </Button>

            <div className="relative my-2 flex items-center">
              <Separator className="h-px flex-1 bg-white/15" />
              <span className="px-3 text-xs text-white/50">OR</span>
              <Separator className="h-px flex-1 bg-white/15" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-12 w-full justify-center gap-2 rounded-full border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white font-normal cursor-pointer"
            >
              <GoogleIcon />
              Continue with Google
            </Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
