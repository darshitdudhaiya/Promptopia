"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import React from "react";

function Nav() {
  const {data : session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const res = await getProviders();
      
      setProviders(res);
    };

    setUpProviders();
  },[]);
  return (
    <>
      <nav className="flex-between w-full mb-18 pt-3 ">
        <Link href={"/"} className="flex gap-2 flex-xenter">
          <Image
            src="/assets/images/logo.svg"
            alt="darshit logi"
            width={30}
            height={30}
            className="object-contain"
          />
          <p className="logo_text">Promptopia</p>
        </Link>


        {/*Desktop*/}
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href={"/create-prompt"} className="black_btn">
                Create post
              </Link>

              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>

              <Link href={"/profile"}>
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  alt="profile"
                  className="rounded-full"
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => {
                  return (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                  );
                })}
            </>
          )}
        </div>

        {/*Mobile*/}
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <div className="flex">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  alt="profile"
                  className="rounded-full"
                  onClick={() => setToggleDropDown((prev) => !prev)}
                />
                {toggleDropDown && (
                  <div className="dropdown">
                    <Link
                      href={"/profile"}
                      className="dropdown_link"
                      onClick={() => setToggleDropDown(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      href={"/create-propmt"}
                      className="dropdown_link"
                      onClick={() => setToggleDropDown(false)}
                    >
                      Create prompt
                    </Link>
                    <button
                    type="button"
                    onClick={()=>{
                      setToggleDropDown(false);
                      signIn();
                    }}
                    className="mt-5 w-full black_btn">
                      Sign out
                    </button>
                  </div>
                )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => {
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>;
                })}
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default Nav;
