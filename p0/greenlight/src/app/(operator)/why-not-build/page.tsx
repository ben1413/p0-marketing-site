import type { Metadata } from "next";
import { WhyNotBuild } from "@/components/WhyNotBuild";

export const metadata: Metadata = {
  title: "Why not build this yourself? — Greenlight",
};

export default function WhyNotBuildPage() {
  return <WhyNotBuild />;
}
