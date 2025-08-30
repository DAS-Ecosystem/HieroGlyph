import { Metadata } from "next";
import dynamic from "next/dynamic";

import { meta } from "@/lib/utils";

// Dynamically import Chat to prevent SSR errors
const Chat = dynamic(() => import("@/components/Chat"), { ssr: false });

export const metadata: Metadata = meta;

export default function ChatPage(): React.JSX.Element {
	return <Chat />;
}
