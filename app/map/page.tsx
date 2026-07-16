"use client";

import dynamic from "next/dynamic";

const PropertyMap = dynamic(
  () =>
    import("@/components/PropertyMap").then((mod) => mod.PropertyMap),
  {
    ssr: false,
    loading: () => <p className="text-sm text-stone-500">Loading map…</p>,
  },
);

export default function MapPage() {
  return <PropertyMap />;
}
