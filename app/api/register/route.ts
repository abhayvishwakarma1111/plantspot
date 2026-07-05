import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";


export async function POST(request: Request) {
  const { plantCode, name, phone, city, instagram } = await request.json();

  if (!name?.trim()) {
  return NextResponse.json(
    { message: "Name is required." },
    { status: 400 }
  );
}

if (!phone?.trim()) {
  return NextResponse.json(
    { message: "Phone number is required." },
    { status: 400 }
  );
}

if (!/^\d{10}$/.test(phone)) {
  return NextResponse.json(
    { message: "Phone number must be exactly 10 digits." },
    { status: 400 }
  );
}

if (!city?.trim()) {
  return NextResponse.json(
    { message: "City is required." },
    { status: 400 }
  );
}

  // Check if plant exists
const { data: plant, error: plantError } = await supabase
  .from("plants")
  .select("id, user_id, is_registered")
  .eq("plant_code", plantCode)
  .single();

if (plantError || !plant) {
  return NextResponse.json(
    { message: "Plant not found." },
    { status: 404 }
  );
}

if (plant.is_registered) {
  return NextResponse.json(
    { message: "This plant has already been registered." },
    { status: 409 }
  );
}

  // Check if user already exists
let { data: user } = await supabase
  .from("users")
  .select("*")
  .eq("phone", phone)
  .single();

// Create user if not found
if (!user) {
  const { data: newUser, error: userError } = await supabase
    .from("users")
    .insert({
      name,
      phone,
      city,
      instagram,
    })
    .select()
    .single();

  if (userError) {
    return NextResponse.json(
      { message: "Failed to create user." },
      { status: 500 }
    );
  }

  user = newUser;
}

  // Update plant
  const { error: plantUpdateError } = await supabase
    .from("plants")
    .update({
      user_id: user.id,
      is_registered: true,
      adopted_at: new Date().toISOString(),
    })
    .eq("id", plant.id);

  if (plantUpdateError) {
    return NextResponse.json(
      { message: "Failed to register plant." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}