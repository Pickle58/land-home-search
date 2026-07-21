"use client";

import { useMutation, useQuery } from "convex/react";
import { ChangeEvent, useState } from "react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { DOCUMENT_LABELS, type DocumentLabel } from "@/convex/lib/enums";
import { labelize } from "@/lib/format";

type Props = {
  propertyId: Id<"properties">;
  photoIds: Id<"_storage">[];
  documents: {
    _id: Id<"documents">;
    storageId: Id<"_storage">;
    label: DocumentLabel;
    fileName?: string;
  }[];
};

export function MediaUploader({ propertyId, photoIds, documents }: Props) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const attachPhoto = useMutation(api.files.attachPhoto);
  const removePhoto = useMutation(api.files.removePhoto);
  const attachDocument = useMutation(api.files.attachDocument);
  const removeDocument = useMutation(api.files.removeDocument);
  const photoUrls = useQuery(api.files.getUrls, { storageIds: photoIds });
  const docUrls = useQuery(api.files.getUrls, {
    storageIds: documents.map((d) => d.storageId),
  });

  const [docLabel, setDocLabel] = useState<DocumentLabel>("other");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadFile(file: File): Promise<Id<"_storage">> {
    const postUrl = await generateUploadUrl({});
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file.type || "application/octet-stream" },
      body: file,
    });
    if (!result.ok) {
      throw new Error("Upload failed");
    }
    const json = (await result.json()) as { storageId: Id<"_storage"> };
    return json.storageId;
  }

  async function onPhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const storageId = await uploadFile(file);
      await attachPhoto({ propertyId, storageId });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Photo upload failed");
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  }

  async function onDocumentChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const storageId = await uploadFile(file);
      await attachDocument({
        propertyId,
        storageId,
        label: docLabel,
        fileName: file.name,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Document upload failed");
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  }

  const urlById = new Map(
    [...(photoUrls ?? []), ...(docUrls ?? [])].map((u) => [
      u.storageId,
      u.url,
    ]),
  );

  return (
    <div className="space-y-4">
      {error ? (
        <p className="text-sm text-red-700">{error}</p>
      ) : null}

      <div>
        <h3 className="mb-2 text-sm font-semibold text-foreground">Photos</h3>
        <input
          type="file"
          accept="image/*"
          disabled={busy}
          onChange={onPhotoChange}
          className="text-sm"
        />
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {photoIds.map((id) => {
            const url = urlById.get(id);
            return (
              <div key={id} className="relative overflow-hidden rounded-md border">
                {url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={url}
                    alt=""
                    className="aspect-video w-full object-cover"
                  />
                ) : (
                  <div className="aspect-video bg-muted" />
                )}
                <button
                  type="button"
                  className="absolute right-1 top-1 rounded bg-black/70 px-2 py-0.5 text-xs text-white"
                  onClick={() => removePhoto({ propertyId, storageId: id })}
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-foreground">Documents</h3>
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <select
            className="rounded-md border border-input bg-background px-2 py-1 text-sm"
            value={docLabel}
            onChange={(e) => setDocLabel(e.target.value as DocumentLabel)}
          >
            {DOCUMENT_LABELS.map((label) => (
              <option key={label} value={label}>
                {labelize(label)}
              </option>
            ))}
          </select>
          <input
            type="file"
            accept="image/*,.pdf,application/pdf"
            disabled={busy}
            onChange={onDocumentChange}
            className="text-sm"
          />
        </div>
        <ul className="space-y-2 text-sm">
          {documents.map((doc) => {
            const url = urlById.get(doc.storageId);
            return (
              <li
                key={doc._id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border px-3 py-2"
              >
                <div>
                  <span className="font-medium">{labelize(doc.label)}</span>
                  {doc.fileName ? (
                    <span className="text-muted-foreground"> — {doc.fileName}</span>
                  ) : null}
                </div>
                <div className="flex gap-2">
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline"
                    >
                      Open
                    </a>
                  ) : null}
                  <button
                    type="button"
                    className="text-red-700"
                    onClick={() => removeDocument({ documentId: doc._id })}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
