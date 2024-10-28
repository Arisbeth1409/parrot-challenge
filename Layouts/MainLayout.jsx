import React from "react";

import Header from "@/components/Header/Header/";
import Footer from "@/components/Footer/Footer";

import { Toaster } from "sonner";
export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Toaster position="bottom-right" richColors />
      <Footer />
    </>
  );
}
