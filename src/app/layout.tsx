import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { getEnv } from "@/lib/env";
import { Toaster } from "sonner";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const geistSans = localFont({
	src: "../../public/fonts/GeistVF.woff",
	variable: "--font-geist-sans",
	weight: "100 900",
});

const geistMono = localFont({
	src: "../../public/fonts/GeistMonoVF.woff",
	variable: "--font-geist-mono",
	weight: "100 900",
});

const env = getEnv();

const title = "Recipe Generator";
const description =
	"An AI-powered recipe generator that suggests meal ideas based on your current or leftover ingredients, saving time and reducing food waste.";

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
	title,
	description,
	keywords: [
		"recipe",
		"recipe generator",
		"generative AI",
		"AI-powered",
		"meal ideas",
		"leftover ingredients",
		"food waste reduction",
		"no waste",
		"zero waste",
	],
	alternates: {
		canonical: "/",
	},
	openGraph: {
		title,
		description,
		type: "website",
		siteName: title,
		images: [
			{
				url: "/og.svg",
			},
		],
	},
	twitter: {
		title,
		description,
		card: "summary_large_image",
		site: title,
		creator: "Mike Liu",
		images: [
			{
				url: "/og.svg",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn("antialiased", geistSans.variable, geistMono.variable)}
			>
				<div className="relative min-h-[calc(100vh-172px)] sm:min-h-[calc(100vh-120px)] max-w-screen-xl mx-auto">
					{children}
				</div>

				<Footer />

				<Toaster className="z-50" />
			</body>
		</html>
	);
}
