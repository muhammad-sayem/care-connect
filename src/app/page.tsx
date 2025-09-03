import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaHandshakeAngle } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 text-center">

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
        <FaHandshakeAngle className="text-3xl sm:text-4xl md:text-5xl" />
        <span>Care <span className="text-secondary">Connect</span></span>
        <FaHandshakeAngle className="text-3xl sm:text-4xl md:text-5xl text-secondary" />
      </h1>

      {/* Subtext */}
      <p className="font-semibold text-gray-500 text-base sm:text-lg md:text-xl max-w-md mb-8">
        Easily book appointments with top doctors. Simple, fast, and secure healthcare at your fingertips.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
        <Link href="/login">
          <Button className="px-6 sm:px-8 py-3 w-full sm:w-auto" variant="outline">
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button className="px-6 sm:px-8 py-3 w-full sm:w-auto" variant="outline">
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
}
