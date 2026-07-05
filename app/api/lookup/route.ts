import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const { plantCode } = await request.json();

  const { data, error } = await supabase
    .from("plants")
    .select(`
      *,
      plant_types (
        name
      )
    `)
    .eq("plant_code", plantCode)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { success: false, message: "Plant not found." },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    plant: data,
  });
}