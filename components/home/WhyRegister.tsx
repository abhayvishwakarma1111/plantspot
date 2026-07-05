import {
  Leaf,
  Heart,
  BookOpen,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Care Guide",
    description: "Know exactly how to care for your plant.",
  },
  {
    icon: Heart,
    title: "Plant Benefits",
    description: "Discover the health and lifestyle benefits of your plant.",
  },
  {
    icon: BookOpen,
    title: "Plant Passport",
    description: "Every registered plant gets its own digital identity.",
  },
  {
    icon: ShieldCheck,
    title: "Future Updates",
    description: "Unlock new features and improvements as PlantSpot grows.",
  },
];

export default function WhyRegister() {
  return (
    <section className="bg-[#F8FAF5] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Register Your Plant?
          </h2>

          <p className="mt-3 text-gray-600">
            More than just a plant — give it a permanent digital passport.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-8 text-center shadow-sm"
              >
                <div className="mb-5 flex justify-center">
                  <Icon
                    size={40}
                    className="text-green-700"
                  />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-gray-500">
                  {feature.title}
                </h3>

                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}