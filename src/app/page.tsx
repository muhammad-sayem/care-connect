import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4">

      <h1 className="text-5xl font-bold text-primary text-center mb-6">
        Care <span className="text-secondary">Connect</span>
      </h1>

      <p className="text-gray-500 text-center max-w-md mb-8">
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
