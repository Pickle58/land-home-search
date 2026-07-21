"use client";

import dynamic from "next/dynamic";
import { LoadingState } from "@/components/LoadingState";

const PropertyMap = dynamic(
  () =>
    import("@/components/PropertyMap").then((mod) => mod.PropertyMap),
  {
    ssr: false,
    loading: () => <LoadingState message="Loading map…" />,
  },
);

export default function MapPage() {
  return <PropertyMap />;
}
