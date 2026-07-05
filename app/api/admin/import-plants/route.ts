import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const body: { plantCodes: string } = await request.json();

const { plantCodes } = body;

  const codes: string[] = [
  ...new Set(
    plantCodes
      .split("\n")
      .map((code) => code.trim())
      .filter(Boolean)
  ),
];

  let added = 0;
  const skipped: string[] = [];

  for (const plantCode of codes) {
    const parts = plantCode.split("-");

    if (parts.length !== 3) {
      skipped.push(`${plantCode} (Invalid format)`);
      continue;
    }

    const plantTypeCode = parts[1];

    const { data: plantType } = await supabase
      .from("plant_types")
      .select("id")
      .eq("code", plantTypeCode)
      .single();

    if (!plantType) {
      skipped.push(`${plantCode} (Unknown plant type)`);
      continue;
    }

    const { error } = await supabase
      .from("plants")
      .insert({
        plant_code: plantCode,
        plant_type_id: plantType.id,
      });

    if (error) {
      skipped.push(`${plantCode} (Already exists)`);
      continue;
    }

    added++;
  }

  return NextResponse.json({
    added,
    skipped,
  });
}