import type { Metadata } from "next";
import "./globals.css";
import { MyContextProvider } from "@/context/Store";
import StateComponent from "@/components/StateComponent";
import HeaderCounseler from "@/components/HeaderCounseler";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>
      <StateComponent paddingTop="pt-0">{children} </StateComponent>
    </section>
  );
}
