"use client";

import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import * as React from "react";
import { FC } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";
import { Icons } from "./Icons";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface LoadingState {
  google: boolean;
  twitter: boolean;
}
const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  const { toast } = useToast();
  const [loadingState, setLoadingState] = React.useState<LoadingState>({
    google: false,
    twitter: false,
  });
  const loginWithGoogle = async () => {
    setLoadingState((prev) => ({ ...prev, google: true }));

    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setLoadingState((prev) => ({ ...prev, google: false }));
    }
  };
  const loginWithTwitter = async () => {
    setLoadingState((prev) => ({ ...prev, twitter: true }));

    try {
      await signIn("twitter");
    } catch (error) {
      console.error("Twitter Authentication Error:", error);
      console.log(
        "Twitter API Keys:",
        process.env.TWITTER_CLIENT_ID,
        process.env.TWITTER_CLIENT_SECRET,
      );
      console.log(
        "Callback URL:",
        process.env.NEXTAUTH_URL + "/api/auth/callback/twitter",
      );

      toast({
        title: "Error",
        description: "There was an error logging in with twitter",
        variant: "destructive",
      });
    } finally {
      setLoadingState((prev) => ({ ...prev, twitter: false }));
    }
  };

  return (
    <div className={cn("flex justify-center flex-col gap-3", className)} {...props}>
      <Button
        isLoading={loadingState.google}
        type="button"
        size="sm"
        className="w-full"
        onClick={loginWithGoogle}
        disabled={loadingState.google}
      >
        {loadingState.google ? null : <Icons.google className="h-4 w-4 mr-2" />}
        Google
      </Button>
      <Button
        isLoading={loadingState.twitter}
        type="button"
        size="sm"
        className="w-full"
        onClick={loginWithTwitter}
        disabled={loadingState.twitter}
      >
        {loadingState.twitter ? null : <Icons.twitter className="h-4 w-4 mr-2" />}
        Twitter
      </Button>
    </div>
  );
};

export default UserAuthForm;
