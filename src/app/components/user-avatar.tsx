"use client"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

const UserButton = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader className="size-6 mr-4 mt-4 float-right animate-spin" />;
  }

  const avatarFallback = session?.user?.name?.charAt(0).toUpperCase();
    const handleSignOut = async () => {
        await signOut({
            redirect: false,
        });
        router.push("/")
}
  return (
    <nav>
      {session ? (
        // <DropdownMenu modal={false}>
        //   <DropdownMenuTrigger className="outline-none relative float-right p-4 md:p-8 user-name">
        //     <div className="flex gap-4 items-center user-name-image">
        //       <span>Welcome, {session.user?.name}</span>
              <Avatar className="size-10 hover:opacity-75 transition profile-image-container">
                <AvatarImage
                  className="size-10 hover:opacity-75 transition  ecup-profile-avatar-image"
                  src={session.user?.image || undefined}
                />
                <AvatarFallback className="bg-sky-900 text-white ">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
        //     </div>
        //   </DropdownMenuTrigger>
        //   <DropdownMenuContent align="center" side="bottom" className="w-50">
        //     <DropdownMenuItem className="dropdown-item"><Link href="/userProfile">Profile</Link></DropdownMenuItem>
        //     <DropdownMenuItem className="dropdown-item" onClick={()=>handleSignOut()}>Log out</DropdownMenuItem>
        //   </DropdownMenuContent>
        // </DropdownMenu>
      ) : (
        <div>
          
        </div>
      )}
    </nav>
  );
};

export default UserButton;
