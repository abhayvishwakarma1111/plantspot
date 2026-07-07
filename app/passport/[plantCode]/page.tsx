import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

type Props = {
  params: Promise<{
    plantCode: string;
  }>;
};

export default async function PassportPage({ params }: Props) {
  const { plantCode } = await params;

  const { data: plant } = await supabase
    .from("plants")
    .select(
      `
      plant_code,
       adopted_at,
      plant_types (
        name,
        scientific_name,
        description,
        benefits,
        symbolism,
        care_water,
        care_light,
        care_soil,
        care_temperature,
        image_url
      )
    `,
    )
    .eq("plant_code", plantCode)
    .single();

  if (!plant) {
    notFound();
  }

  const plantType = Array.isArray(plant.plant_types)
    ? plant.plant_types[0]
    : plant.plant_types;

  const adoptedDate = plant.adopted_at ? new Date(plant.adopted_at) : null;

  const now = new Date();

  const daysTogether = adoptedDate
  ? Math.floor(
      (Date.UTC(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      ) -
      Date.UTC(
        adoptedDate.getFullYear(),
        adoptedDate.getMonth(),
        adoptedDate.getDate()
      )) /
      86400000
    ) + 1
  : 0;
    

  return (
    <main className="min-h-screen bg-linear-to-b from-green-50 via-[#F8FAF5] to-white">

  <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-12">

  <div className="overflow-hidden rounded-4xl bg-linear-to-b from-green-100 via-green-50 to-white shadow-xl">

  {plantType.image_url?.startsWith("http") ? (
  <Image
    src={plantType.image_url}
    alt={plantType.name}
    width={900}
    height={700}
    priority
    className="mx-auto h-105 w-full object-contain p-10"
  />
) : (
    <div className="flex h-105 items-center justify-center text-8xl">
      🌿
    </div>
  )}

</div>

  <div className="mt-8 text-center">

    <h1 className="text-5xl text-gray-700 font-extrabold tracking-tight">
      {plantType.name}
    </h1>

    <p className="mt-2 text-gray-500">
      Digital Plant Passport
    </p>

    <div className="mt-5 inline-flex rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700">
      Registered
    </div>

    <p className="mt-4 font-mono text-gray-500">
      {plant.plant_code}
    </p>

  </div>

</div>

        <div className="mb-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white shadow-lg p-5 text-center">
            <div className="text-3xl">🌱</div>

            <p className="mt-2 text-sm text-gray-500">Days Together</p>

            <p className="text-2xl font-bold text-gray-500">{daysTogether}</p>
          </div>

          <div className="rounded-3xl bg-white shadow-lg p-5 text-center">
            <div className="text-3xl">📅</div>

            <p className="mt-2 text-sm text-gray-500">Adopted</p>

            <p className="font-semibold text-gray-500">
              {adoptedDate ? adoptedDate.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric'
}) : "-"}
            </p>
          </div>

          <div className="rounded-3xl bg-white shadow-lg p-5 text-center">
            <div className="text-3xl">💚</div>

            <p className="mt-2 text-sm text-gray-500">Status</p>

            <p className="font-semibold text-green-700">Healthy</p>
          </div>
        </div>

        <section className="mb-12 rounded-3xl bg-white shadow-lg p-6">
          <h2 className="mb-2 text-xl font-semibold text-gray-500">Scientific Name</h2>

          <span className="italic text-gray-700">{plantType.scientific_name}  </span>
        </section>

        <section className="mb-12 rounded-3xl bg-white shadow-lg p-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-500">🌿 About Your Plant</h2>

          <p className="leading-7 text-gray-700">
            {plantType.description || "Coming soon..."}
          </p>
        </section>

        <section className="mb-12 rounded-3xl bg-white shadow-lg p-6">
          <h2 className="mb-5 text-2xl font-bold text-gray-500">🔮 Symbolism</h2>

          <div className="rounded-2xl border bg-green-50 p-6">
            <p className="leading-7 text-gray-700">
              {plantType.symbolism || "Coming soon..."}
            </p>
          </div>
        </section>

        <section className="mb-12 rounded-3xl bg-white shadow-lg p-6">
          <h2 className="mb-5 text-2xl font-bold text-gray-500">✨ Benefits</h2>

          <div className="rounded-2xl border bg-green-50 p-6">
            <p className="leading-7 text-gray-700">
              {plantType.benefits || "Coming soon..."}
            </p>
          </div>
        </section>

        <section className="mb-12 rounded-3xl bg-white shadow-lg p-6">
          <h2 className="mb-6 text-2xl font-bold text-gray-500">🪴 Care Guide</h2>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-blue-50 p-6">
              <div className="text-3xl">💧</div>

              <h3 className="mt-3 font-semibold text-gray-500">Water</h3>

              <p className="mt-2 text-gray-700">
                {plantType.care_water || "-"}
              </p>
            </div>

            <div className="rounded-2xl bg-yellow-50 p-6">
              <div className="text-3xl">☀️</div>

              <h3 className="mt-3 font-semibold text-gray-500">Light</h3>

              <p className="mt-2 text-gray-700">
                {plantType.care_light || "-"}
              </p>
            </div>

            <div className="rounded-2xl bg-orange-50 p-6">
              <div className="text-3xl">🌡️</div>

              <h3 className="mt-3 font-semibold text-gray-500">Temperature</h3>

              <p className="mt-2 text-gray-700">
                {plantType.care_temperature || "-"}
              </p>
            </div>

            <div className="rounded-2xl bg-green-50 p-6">
              <div className="text-3xl">🪴</div>

              <h3 className="mt-3 font-semibold text-gray-500">Soil</h3>

              <p className="mt-2 text-gray-700">{plantType.care_soil || "-"}</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-15 mb-10 border-t pt-10 text-center">

  <p className="text-2xl">
    🌿
  </p>

  <h2 className="mt-3 text-2xl font-bold text-green-700">
    Thank you for adopting.
  </h2>

  <p className="mt-3 text-gray-500">
    Every PlantSpot plant has its own digital identity.
  </p>

</div>
    </main>
  );
}
