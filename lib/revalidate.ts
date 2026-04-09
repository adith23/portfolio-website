import { revalidatePath, revalidateTag } from "next/cache";

export function handleRevalidation({
  type,
  slug,
}: {
  type?: string;
  slug?: string;
}) {
  if (type === "profile") {
    revalidateTag("profile", "max");
    revalidatePath("/", "page");
    revalidatePath("/about", "page");
    revalidatePath("/contact", "page");
    return;
  }

  revalidateTag("projects", "max");
  revalidatePath("/", "page");
  revalidatePath("/projects", "page");

  if (slug) {
    revalidateTag(`project:${slug}`, "max");
    revalidatePath(`/projects/${slug}`, "page");
  }
}
