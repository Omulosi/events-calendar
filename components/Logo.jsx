"use client";

import Image from "next/image";
import Link from "next/link";

const Logo = ({ children, size = 50 }) => {
  return (
    <Link href="/" className="flex gap-2 flex-center">
      <Image src="/assets/images/logo.jpg" alt="logo" width={size} height={size} className="object-contain" />
      {children}
    </Link>
  );
};

export default Logo;
