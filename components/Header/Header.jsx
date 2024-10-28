import Image from "next/image";
import Link from "next/link";

import logo from "@/public/images/parrotlogo.png";

export default function Header() {
  return (
    <header className="fixed top-0 h-[4rem] bg-white w-full pl-[3rem] pr-[3rem] flex justify-left items-center shadow-xl z-[1]">
      <Link href="/">
        <Image src={logo} alt="parrot" width={132} height={50} />
      </Link>
    </header>
  );
}
