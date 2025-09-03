import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaHandshakeAngle } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">

      <h1 className="text-6xl font-bold text-primary text-center mb-6 flex gap-x-4">
        <FaHandshakeAngle />
        Care <span className="text-secondary">Connect</span>
        <FaHandshakeAngle className="text-secondary"/>
      </h1>

      <p className="font-bold text-gray-500 text-lg text-center max-w-md mb-8">
        Easily book appointments with top doctors. Simple, fast, and secure healthcare at your fingertips.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/login">
          <Button className="px-8 py-3" variant="outline">
            Login
          </Button>
        </Link>
        <Link href="/register">
          <Button className="px-8 py-3" variant="outline">
            Register
          </Button>
        </Link>
      </div>
    </div>
  );
}
