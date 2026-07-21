import type { ReactNode } from "react";
import { LoadingState } from "@/components/LoadingState";
import { PropertyNotFound } from "@/components/PropertyNotFound";

type QueryStateProps<T> = {
  data: T | undefined | null;
  loadingMessage?: string;
  notFound?: ReactNode;
  children: (data: NonNullable<T>) => ReactNode;
};

export function QueryState<T>({
  data,
  loadingMessage,
  notFound,
  children,
}: QueryStateProps<T>) {
  if (data === undefined) {
    return <LoadingState message={loadingMessage} />;
  }
  if (data === null) {
    return notFound ?? <PropertyNotFound />;
  }
  return <>{children(data)}</>;
}
