import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-muted/30 py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="text-xl font-bold text-primary">
              ArkaNet
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              © {new Date().getFullYear()} ArkaNet Corporation
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <FooterColumn
              title="General"
              links={["Sign Up", "Help Center", "About"]}
            />
            <FooterColumn
              title="Browse"
              links={["Jobs", "Companies", "People"]}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="font-semibold mb-3">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, i) => (
          <li key={i}>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-primary hover:underline"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
