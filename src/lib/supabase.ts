import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Chocolate, CHOCOLATES } from "@/data/chocolates";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("http") &&
    !supabaseUrl.includes("your-project")
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface DbChocolateRow {
  id: string | number;
  name: string;
  subtitle?: string | null;
  description?: string | null;
  price_aed?: number | string | null;
  price?: number | string | null;
  weight?: string | null;
  category?: string | null;
  badge?: string | null;
  image?: string | null;
  image_url?: string | null;
  cocoa_percent?: string | null;
  notes?: string[] | null;
}

export function mapDbRowToChocolate(row: DbChocolateRow): Chocolate {
  const validCategories: Chocolate["category"][] = [
    "Signature",
    "Truffles",
    "Pralines",
    "Artisan Bars",
  ];
  const category = validCategories.includes(
    row.category as Chocolate["category"]
  )
    ? (row.category as Chocolate["category"])
    : "Signature";

  const rawPrice = row.price_aed ?? row.price ?? 85;

  return {
    id: String(row.id),
    name: row.name,
    subtitle: row.subtitle || "Artisan Dubai Chocolate Creation",
    description:
      row.description ||
      "Handcrafted in Dubai using single-origin couverture cacao.",
    priceAED: Number(rawPrice),
    weight: row.weight || "180g",
    category,
    badge: row.badge || undefined,
    image:
      row.image ||
      row.image_url ||
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=85",
    cocoaPercent: row.cocoa_percent || "58% Artisan Cacao",
    notes:
      Array.isArray(row.notes) && row.notes.length > 0
        ? row.notes
        : ["Artisan Cacao", "Dubai Handcrafted"],
  };
}

export async function fetchChocolatesFromSupabase(): Promise<{
  chocolates: Chocolate[];
  fromSupabase: boolean;
  error?: string;
}> {
  if (!supabase) {
    return {
      chocolates: CHOCOLATES,
      fromSupabase: false,
      error: "Supabase URL and Anon Key not configured in .env.local yet",
    };
  }

  try {
    const { data, error } = await supabase
      .from("chocolates")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      return {
        chocolates: CHOCOLATES,
        fromSupabase: false,
        error: error.message,
      };
    }

    if (!data || data.length === 0) {
      return {
        chocolates: CHOCOLATES,
        fromSupabase: false,
        error: "No rows found in Supabase chocolates table yet",
      };
    }

    return {
      chocolates: data.map((row) => mapDbRowToChocolate(row as DbChocolateRow)),
      fromSupabase: true,
    };
  } catch (err) {
    return {
      chocolates: CHOCOLATES,
      fromSupabase: false,
      error: err instanceof Error ? err.message : "Failed to load from Supabase",
    };
  }
}
