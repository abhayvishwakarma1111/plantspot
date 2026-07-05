import Image from "next/image";

const plants = [
  {
    name: "Jade Plant",
    image: "/plants/jade.png",
  },
  {
    name: "Rubber Plant",
    image: "/plants/rubber.png",
  },
  {
    name: "Spider Plant",
    image: "/plants/spider.png",
  },
  {
    name: "tablePalm",
    image: "/plants/palm.png",
  },
  {
    name: "Snake Plant",
    image: "/plants/snake.png",
  },
  {
    name: "Asparagus Fern",
    image: "/plants/fern.png",
  },
  {
    name: "Table Kamini",
    image: "/plants/kamini.png",
  },
  {
    name: "Ming Aralia",
    image: "/plants/aralia.png",
  },
  {
    name: "Golden sedum",
    image: "/plants/sedum.png",
  },
];

export default function PlantGrid() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Meet Our Plants</h2>

          <p className="mt-3 text-gray-600">
            Beautiful tabletop plants designed for every space.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {plants.map((plant) => (
            <div
              key={plant.name}
              className="rounded-2xl border p-8 text-center shadow-sm transition hover:shadow-md"
            >
              <div className="mb-5 overflow-hidden rounded-xl bg-green-50">
                <Image
                  src={plant.image}
                  alt={plant.name}
                  width={300}
                  height={300}
                  className="h-52 w-full object-contain p-4 transition duration-300 hover:scale-105"
                />
              </div>

              <h3 className="font-semibold text-gray-900">{plant.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
