"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";



type Props = {
  open: boolean;
  onClose: () => void;
  plantCode: string;
};

export default function RegistrationModal({
  open,
  onClose,
  plantCode,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    instagram: "",
  });

  const router = useRouter();

  if (!open) return null;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  if (!form.name.trim()) {
  alert("Please enter your name.");
  return;
}

if (!form.phone.trim()) {
  alert("Please enter your phone number.");
  return;
}

if (!form.city.trim()) {
  alert("Please enter your city.");
  return;
}

  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plantCode,
      ...form,
    }),
  });

  const data = await response.json();
  

  if (!response.ok) {
    alert(data.message);
    return;
  }

  router.push(`/passport/${plantCode}`);
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8">
        <h2 className="mb-2 text-2xl font-bold text-gray-500">
          Register Your Plant
        </h2>

        <p className="mb-6 text-gray-600">
          Complete your registration to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
  name="phone"
  type="tel"
  inputMode="numeric"
  maxLength={10}
  placeholder="Phone Number"
  value={form.phone}
  onChange={(e) =>
    setForm({
      ...form,
      phone: e.target.value.replace(/\D/g, ""),
    })
  }
/>

          <Input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />

          <Input
            name="instagram"
            placeholder="Instagram (Optional)"
            value={form.instagram}
            onChange={handleChange}
          />

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              className="w-full bg-gray-200 text-black hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}