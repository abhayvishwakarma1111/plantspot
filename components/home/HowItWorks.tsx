export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Scan the QR",
      description: "Scan the QR code attached to your PlantSpot plant.",
    },
    {
      number: "02",
      title: "Register Your Plant",
      description: "Enter your unique Plant Code and complete registration.",
    },
    {
      number: "03",
      title: "Enjoy Your Passport",
      description: "Access care guides, benefits, and your plant's digital identity.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-900">
            How It Works
          </h2>

          <p className="mt-3 text-gray-600">
            Register your plant in three simple steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 ">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border p-8 text-center shadow-sm"
            >
              <div className="mb-5 text-4xl font-bold text-green-700">
                {step.number}
              </div>

              <h3 className="mb-3 text-xl font-semibold text-gray-500">
                {step.title}
              </h3>

              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}