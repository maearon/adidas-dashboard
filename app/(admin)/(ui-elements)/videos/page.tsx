import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import VideosExample from "@/components/ui/video/VideosExample";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
  title: "Next.js Videos | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Videos page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};
}

export default function VideoPage() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Videos" />

      <VideosExample />
    </div>
  );
}
