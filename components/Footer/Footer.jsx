import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full text-center p-[3rem]">
      <p className="text-[#6a6d77] mb-[1.5rem]">© 2024 Parrot Software.</p>
      <p className="text-[#6a6d77] mb-[1.5rem]">
        Todos los derechos reservados
      </p>
      <p className="text-[#f65954] mb-[1.5rem]">
        <Link href="https://www.nngroup.com/articles/toggle-switch-guidelines/">
          Aviso de privacidad
        </Link>
      </p>
      <p className="text-[#f65954] mb-[1.5rem]">
        <Link href="https://parrotsoftware.com.mx/programa-de-lealtad-parrot">
          Conoce nuestro Programa de Lealtad
        </Link>
      </p>
    </footer>
  );
}
