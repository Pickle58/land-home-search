"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { STATUS_COLORS, STATUS_LABELS, type PropertyStatus } from "@/convex/lib/enums";
import { formatAcres, formatCurrency } from "@/lib/format";
import "leaflet/dist/leaflet.css";

function markerIcon(color: string) {
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:14px;height:14px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,.4)"></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

export function PropertyMap() {
  const pins = useQuery(api.properties.listForMap);

  if (pins === undefined) {
    return <p className="text-sm text-stone-500">Loading map…</p>;
  }

  const center: [number, number] =
    pins.length > 0
      ? [pins[0].latitude, pins[0].longitude]
      : [39.5, -98.35];

  return (
    <div className="space-y-3">
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">Map</h1>
        <p className="text-sm text-stone-600">
          Pins colored by status. Click a pin for details.
        </p>
      </div>
      <div className="h-[70vh] overflow-hidden rounded-lg border border-stone-200">
        <MapContainer
          center={center}
          zoom={pins.length ? 8 : 4}
          className="h-full w-full"
          scrollWheelZoom
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {pins.map((pin) => (
            <Marker
              key={pin._id}
              position={[pin.latitude, pin.longitude]}
              icon={markerIcon(
                STATUS_COLORS[pin.status as PropertyStatus] ?? "#64748b",
              )}
            >
              <Popup>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold">
                    {pin.address || `${pin.city}, ${pin.state}`}
                  </p>
                  <p>
                    {formatCurrency(pin.price)} · {formatAcres(pin.lotSizeAcres)}
                  </p>
                  <p>{STATUS_LABELS[pin.status as PropertyStatus]}</p>
                  <Link href={`/properties/${pin._id}`} className="underline">
                    Open detail
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {pins.length === 0 ? (
        <p className="text-sm text-stone-500">
          No properties with map coordinates yet.
        </p>
      ) : null}
    </div>
  );
}
