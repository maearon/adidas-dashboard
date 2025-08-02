import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: "Next.js SignIn Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};
}

export default function SignIn() {
  return <SignInForm />;
}
