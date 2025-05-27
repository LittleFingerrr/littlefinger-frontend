import { RegistrationForm } from "@/components/RegistrationForm";
import Image from "next/image";

export default function Home() {
  return (
    // flex min-h-screen flex-col items-center justify-between p-24
    <main className="min-h-screen bg-slate-100">
      <RegistrationForm />
    </main>
  );
}
