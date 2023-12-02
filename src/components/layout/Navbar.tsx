import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Icons } from "../Icons";
import { buttonVariants } from "../ui/Button";
import { UserAccountNav } from "../UserAccountNav";
import SearchBar from "../SearchBar";
import { cn } from "@/lib/utils";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed top-0 inset-x-0 h-fit  z-[10] py-2 border-b bg-background">
      <div className="container flex items-center justify-between h-full gap-2 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center gap-2">
          <Icons.logo className="w-8 h-8 sm:h-6 sm:w-6 text-primary" />
          <p className="hidden text-sm font-medium md:block">LeetSocial</p>
        </Link>

        <div className="flex gap-3">
          {/* search bar */}
          <SearchBar />

          {/* actions */}
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link
              href="/sign-in"
              className={cn(buttonVariants(), "whitespace-nowrap")}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
