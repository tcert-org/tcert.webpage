"use client";

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("./navbar").then((mod) => mod.Navbar), {
  ssr: false,
});

export default function ClientNavbar() {
  console.log("Navbar renderizando en el cliente");

  return <Navbar />;
}
