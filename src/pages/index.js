import supabase from "@/config/supabase";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  };

  useEffect(() => {
    supabase.auth.getSession()
    .then(session => setUser(session.data.session?.user ?? null))
    .catch(err => { console.log("ERROR GET SESSION: ", err) })
  },[])

  return (
    <>
      <div className="container mx-auto mt-8 max-w-[560px]">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="text-3xl font-semibold">Private Page</h1>
        </div>
        {user ? (
          <div>
            <p>Hi, {user?.email}</p>
            <button
              className="mt-4 bg-red-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
              type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link href="/login">
              <button
                className="mt-4 bg-blue-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
                type="button"
              >
                Login
              </button>
            </Link>
            <Link href="/register">
              <button
                className="mt-4 bg-red-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
                type="button"
              >
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
      <Head>
        <title>Private Page</title>
      </Head>
    </>
  );
}
