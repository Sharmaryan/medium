import { AuthForm } from "../components/AuthForm/AuthForm";

export default function SignUp() {
  return (
    <div className="flex justify-center items-center h-screen">
      <AuthForm path="/signin" linkText="Click to Signin"/>
    </div>
  );
}
