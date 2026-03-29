import type { Metadata } from "next";
import { ProofStory } from "@/components/ProofStory";

export const metadata: Metadata = {
  title: "The Moderation Incident — Greenlight",
};

export default function StoryPage() {
  return <ProofStory />;
}
