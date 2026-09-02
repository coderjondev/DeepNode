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
import { X, Eye, EyeOff } from "@/icons/icons";

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
            className="hidden h-10 cursor-pointer rounded-full px-4 sm:flex"
          >
            {children}
          </Button>
        }
      />

      <DialogContent
        showCloseButton={false}
        className="
          gap-0
          overflow-hidden
          rounded-xl
          border
          border-border
          bg-card
          p-0
          text-card-foreground
          shadow-xl
          sm:max-w-sm
        "
      >
        <Card className="gap-6 border-0 bg-transparent py-6 shadow-none">
          <CardHeader className="relative px-6 text-center">
            <DialogTrigger
              render={
                <Button
                  variant="ghost"
                  aria-label="Close"
                  size="icon"
                  className="
                    absolute
                    right-4
                    top-0
                    cursor-pointer
                    rounded-full
                    text-muted-foreground
                    transition-colors
                    hover:bg-accent
                    hover:text-foreground
                  "
                >
                  <X className="size-5" />
                </Button>
              }
            />

            <CardTitle className="text-2xl font-semibold text-foreground">
              Log in or sign up
            </CardTitle>

            <CardDescription
              className="
                text-[15px]
                leading-snug
                text-muted-foreground
              "
            >
              You&apos;ll get smarter responses and can upload files, images
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-2 px-6">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 rounded-full border-input bg-background px-4 text-foreground placeholder:text-muted-foreground focus-visible:ring-ring"
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                  h-10
                  rounded-full
                  border-input
                  bg-background
                  px-4
                  pr-12!
                  text-foreground
                  placeholder:text-muted-foreground
                  focus-visible:ring-ring
                "
              />

              <Button
                type="button"
                onClick={togglePasswordVisibility}
                variant="ghost"
                size="icon"
                className="
                  absolute
                  right-0
                  top-0
                  h-10
                  w-11
                  cursor-pointer
                  rounded-full
                  text-muted-foreground
                  hover:bg-accent
                  hover:text-foreground
                "
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </Button>
            </div>

            <Button
              type="submit"
              className="
                h-10
                w-full
                cursor-pointer
                rounded-full
                bg-primary
                font-medium
                text-primary-foreground
                hover:bg-primary/90
              "
            >
              Continue
            </Button>

            <div className="relative my-2 flex items-center">
              <Separator className="h-px flex-1 bg-border" />

              <span className="px-3 text-xs text-muted-foreground">OR</span>

              <Separator className="h-px flex-1 bg-border" />
            </div>

            {/* GOOGLE */}
            <Button
              type="button"
              variant="outline"
              className="
                h-12
                w-full
                cursor-pointer
                justify-center
                gap-2
                rounded-full
                border-border
                bg-background
                font-normal
                text-foreground
                hover:bg-accent
                hover:text-accent-foreground
              "
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
