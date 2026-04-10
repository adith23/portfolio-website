import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path = "/") {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatDate(date?: string | null) {
  if (!date) return "";
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "";

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
  }).format(parsedDate);
}
