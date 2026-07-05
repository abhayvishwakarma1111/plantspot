
"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";



export default function PlantsPage() {
  const [plantCodes, setPlantCodes] = useState("");

  async function handleImport() {
  const response = await fetch("/api/admin/import-plants", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      plantCodes,
    }),
  });

  const data = await response.json();

  alert(
    `Added: ${data.added}\n\nSkipped:\n${data.skipped.join("\n")}`
  );

  setPlantCodes("");
}

  return (
    <main className="min-h-screen bg-[#F8FAF5] p-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-2 text-3xl font-bold text-gray-600">
          Bulk Import Plants
        </h1>

        <p className="mb-6 text-gray-600">
          Paste one Plant ID per line.
        </p>

        <textarea
          rows={12}
          value={plantCodes}
          onChange={(e) => setPlantCodes(e.target.value.toUpperCase())}
          placeholder={`PS-JD-001
PS-JD-002
PS-RB-001`}
          className="mb-6 w-full rounded-xl border p-4 outline-none focus:border-green-700 text-gray-600"
        />

        <Button onClick={handleImport}>
  Import Plants
</Button>
      </div>
    </main>
  );
}