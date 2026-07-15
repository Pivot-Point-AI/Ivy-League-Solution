"use client";

import { Suspense } from "react";
import WorldExperience from "@/components/world/WorldExperience";

export default function IvyLeagueSolutionsPage() {
  return (
    <div className="min-h-screen bg-black relative" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Suspense fallback={null}>
        <WorldExperience />
      </Suspense>
    </div>
  );
}
