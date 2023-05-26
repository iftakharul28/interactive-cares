"use client";
import { CartIcon, PersonIcon } from "@/constants/icons";
import Button from "../Button";
import { signIn, signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: userData, status } = useSession();
  return (
    <header className='header'>
      <div className='container header__wrapper'>
        <img className='header__logo' src='/logo.png' alt='interactivecares' />
        <div className='header__icons'>
          <button type='button' className='header__icons-wrapper'>
            <CartIcon className='header__icon' />
          </button>
          {userData && status === "authenticated" ? (
            <Button
              type='button'
              className='header__icons-wrapper'
              onClick={() =>
                signOut({
                  callbackUrl: "/auth/login",
                  redirect: true,
                })
              }>
              <PersonIcon className='header__icon' />
              <p className='header__user'>{userData.user.name?.slice(0, 10)}</p>
            </Button>
          ) : (
            <Button type='button' className='header__icons-wrapper' onClick={() => signIn()}>
              <PersonIcon className='header__icon' />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
