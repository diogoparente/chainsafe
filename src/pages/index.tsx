import { Inter } from "next/font/google";
import { Selects } from "@/components/selects";
import { Calendar } from "@/components/calendar";
import { AppProvider } from "@/context/app-context";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col p-24 ${inter.className}`}>
      <AppProvider>
        <Selects />
        <Calendar />
      </AppProvider>
    </main>
  );
}
