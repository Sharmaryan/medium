"use client";
import dynamic from "next/dynamic";
const AuthForm = dynamic(() => import('../components/AuthForm/AuthForm'),{ssr:false})

export default function SignUp() {
  return (
    <div className="flex justify-center items-center h-screen">
      <AuthForm path="/signin" linkText="Click to Signin"/>
    </div>
  );
}
