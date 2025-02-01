"use client";
import dynamic from 'next/dynamic';
const AuthForm = dynamic(() => import('../components/AuthForm/AuthForm'),{ssr:false})

export default function SignIn() {
  return (
    <div className="flex justify-center items-center h-screen">
      <AuthForm path="/signup" linkText="Click to Signup "/>
    </div>
  );
}
