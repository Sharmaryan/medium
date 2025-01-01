import { AuthForm } from "../components/AuthForm/AuthForm";

export default function SignIn() {
  return (
    <div className="flex justify-center items-center h-screen">
      <AuthForm path="/signup" linkText="Click to Signup"/>
    </div>
  );
}
