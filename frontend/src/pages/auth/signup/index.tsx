import { SignUp } from "@clerk/react-router";

export default function Signup() {
  return (
    <main className="flex justify-center items-center h-screen">
      <SignUp fallbackRedirectUrl="/" signInUrl="/signin" />
    </main>
  );
}
