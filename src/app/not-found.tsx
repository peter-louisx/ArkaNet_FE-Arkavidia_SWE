import Image from "next/image";
import Link from "next/link";
export default function NotFound() {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 md:py-20">
      <div className="container mx-auto px-14 flex justify-center">
        <div className="">
          <Image
            src="not-found.svg"
            width={500}
            height={500}
            alt="Professional networking"
            className="object-cover rounded-lg"
            priority
          />
          <h1 className="text-4xl font-bold text-center text-black mt-8">
            404 Not Found
          </h1>
          <p className="text-center text-lg text-gray-500 mt-4">
            The page you are looking for is not available
          </p>
          <Link href="/" className="block text-center text-primary mt-4">
            Go back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
