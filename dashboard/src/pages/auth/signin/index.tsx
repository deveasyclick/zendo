import { SignIn } from "@clerk/react-router";

export default function Signin() {
  return (
    <main className="flex justify-center items-center h-screen">
      <SignIn fallbackRedirectUrl="/" signUpUrl="/signup" />
    </main>
  );
}
