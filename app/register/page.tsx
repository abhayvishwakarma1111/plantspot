"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import RegistrationModal from "@/components/register/RegistrationModal";


export default function RegisterPage() {
  const [plantCode, setPlantCode] = useState("");

  const router = useRouter();

const [showModal, setShowModal] = useState(false);
const [selectedPlantCode, setSelectedPlantCode] = useState("");


  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const response = await fetch("/api/lookup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plantCode,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.message);
    return;
  }

  if (data.plant.is_registered) {
    router.push(`/passport/${plantCode}`);
    return;
  }

  setSelectedPlantCode(plantCode);
  setShowModal(true);
}

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F8FAF5] px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Let's Find Your Plant!
        </h1>

        <p className="mb-8 text-gray-600">
          Enter your unique plant ID to view its passport or register it for the first time.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
  placeholder="Example: PS-JD-001"
  value={plantCode}
  onChange={(e) => setPlantCode(e.target.value.toUpperCase())}
/>

          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </div>
      <RegistrationModal
  open={showModal}
  onClose={() => setShowModal(false)}
  plantCode={selectedPlantCode}
/>
    </main>
  );
}