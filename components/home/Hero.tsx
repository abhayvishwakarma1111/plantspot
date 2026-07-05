import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="bg-[#F8FAF5] py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <h1 className="mb-6 text-5xl font-bold text-gray-900">
          Welcome to Your Plant's Digital Passport
        </h1>

        <p className="mb-8 max-w-2xl text-lg text-gray-600">
          Register your PlantSpot plant to unlock care guides, plant benefits,
          and your plant's unique digital identity.
        </p>

        <Link href="/register">
          <Button>Register My Plant</Button>
        </Link>
      </div>
    </section>
  );
}