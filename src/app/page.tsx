import { Metadata } from "next";
import dynamic from "next/dynamic";
import { meta } from "@/lib/utils";

// Use dynamic import to prevent SSR for AuthForm
const AuthForm = dynamic(() => import("@/components/AuthForm"), { ssr: false });

export const metadata: Metadata = meta;

export default function Home(): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#f0f2f5] to-[#efeae2] py-12 dark:from-[#222e35] dark:to-[#0b141a] sm:px-6 lg:px-8">
      <AuthForm />
    </div>
  );
}
