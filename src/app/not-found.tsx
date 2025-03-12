import Image from "next/image";
export default function NotFound() {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 md:py-20">
      <div className="container mx-auto px-14 flex justify-center">
        <div className="hidden md:block">
          <Image
            src="/login/login.svg"
            width={570}
            height={570}
            alt="Professional networking"
            className="object-cover rounded-lg"
            priority
          />
          <h1 className="text-4xl font-bold text-center text-black mt-8">
            404 Not Found
          </h1>
        </div>
      </div>
    </section>
  );
}
