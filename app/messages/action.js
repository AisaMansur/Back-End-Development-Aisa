// Mini Challenge 3 - Server Actions
// Update for Supabase Integration
'use server';

import { createSupabaseServerClient } from "@/lib/supabase/supabase";
import { revalidatePath } from "next/cache";

export async function deleteMessageAction(formData) {
  const supabase = await createSupabaseServerClient();
  const id = formData.get("id");

  if (!id) return;

  const { error } = await supabase
    .from("messages") // Sesuaikan dengan nama tabel pesan Anda di Supabase
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Gagal menghapus pesan:", error.message);
    return;
  }

  // Refresh halaman agar pesan yang dihapus langsung hilang dari tampilan
  revalidatePath("/messages");
}