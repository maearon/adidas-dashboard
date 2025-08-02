import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: "Next.js SignUp Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js SignUp Page TailAdmin Dashboard Template",
  // other metadata
};
}

export default function SignUp() {
  return <SignUpForm />;
}
