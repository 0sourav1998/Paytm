"use client"
import {Appbar} from "@repo/ui/Appbar"
import { useSession , signIn , signOut} from "next-auth/react";

export default function Home()  : JSX.Element{
  const session = useSession()
  console.log("Session",session)
  return (
    <div>
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user}/>
    </div>
  );
}
