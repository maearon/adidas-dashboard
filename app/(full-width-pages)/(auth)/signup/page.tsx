import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug?: string };
}): Promise<Metadata> {
  return {
  title: "Next.js SignUp Page | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js SignUp Page TailAdmin Dashboard Template",
  // other metadata
};
}

export default function SignUp() {
  return <SignUpForm />;
}
