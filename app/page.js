"use client";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  const {user} = useUser();
  const createUser = useMutation(api.user.createUser);

  
  useEffect(()=>{
    const CheckUser = async () => {
      const result = await createUser({
        email: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        imageUrl: user?.imageUrl
      });
      console.log(result);
    }
    user&&CheckUser();
  },[user, createUser])
  return (
    <div>
      
    </div>
  );
}
