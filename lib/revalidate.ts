import { revalidatePath, revalidateTag } from "next/cache";

export function handleRevalidation({
  type,
  slug,
}: {
  type?: string;
  slug?: string;
}) {
  if (type === "profile") {
    revalidateTag("profile", "default");
    revalidatePath("/", "page");
    revalidatePath("/about", "page");
    revalidatePath("/contact", "page");
    return;
  }

  revalidateTag("projects", "default");
  revalidatePath("/", "page");
  revalidatePath("/projects", "page");

  if (slug) {
    revalidateTag(`project:${slug}`, "default");
    revalidatePath(`/projects/${slug}`, "page");
  }
}
