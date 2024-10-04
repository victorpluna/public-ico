"use server";

import { revalidatePath } from "next/cache";

export async function refreshPage(path: string) {
  revalidatePath(path);
}
