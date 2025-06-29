"use client";
import Link from "next/link";
import { useState } from "react";

const categories = [
  { name: "Mining", slug: "mining" },
  { name: "Mentorship", slug: "mentorship" },
  { name: "Faith", slug: "faith" },
  { name: "Travel", slug: "travel" },
  { name: "Reflections", slug: "reflections" },
  { name: "Relationship", slug: "relationship" },
];

// Dummy blogs array for demonstration
const blogs = [
  { title: "Mining Gold in Africa", slug: "mining-gold-in-africa" },
  { title: "Mentorship Matters", slug: "mentorship-matters" },
  { title: "Faith in Uncertain Times", slug: "faith-in-uncertain-times" },
  { title: "Travel Diaries: Kenya", slug: "travel-diaries-kenya" },
  { title: "Reflections on Growth", slug: "reflections-on-growth" },
  { title: "Building Strong Relationships", slug: "building-strong-relationships" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<typeof blogs>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setResults([]);
      return;
    }
    const filtered = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#DFDBCF]">
      {/* Top Row: Logo, Search */}
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Hamburger (mobile) */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Logo & Tagline */}
        <div className="flex flex-col items-center flex-1">
          <Link href="/" className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900 uppercase">
            Jewel in the Mines
          </Link>
          <span className="text-xs md:text-sm text-gray-700 tracking-wide mt-1">
            Stories of discovery, faith, and adventure
          </span>
        </div>

        {/* Search */}
        <div className="flex items-center space-x-2">
          {!searchOpen ? (
            <button
              className="hover:text-[#A855F7] transition"
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          ) : (
            <form onSubmit={handleSearch} className="relative">
              <input
                autoFocus
                type="text"
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setResults([]);
                }}
                placeholder="Search blogs..."
                className="px-2 py-1 rounded border border-gray-400 focus:outline-none focus:border-[#A855F7] text-gray-900"
                onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
              />
              {/* Results Dropdown */}
              {results.length > 0 && (
                <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded shadow z-50">
                  {results.map(blog => (
                    <li key={blog.slug}>
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="block px-3 py-2 text-gray-800 hover:bg-[#A855F7]/10"
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchTerm("");
                          setResults([]);
                        }}
                      >
                        {blog.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </form>
          )}
        </div>
      </div>

      {/* Nav Links Row - hidden on mobile, flex on md+ */}
      <nav className="bg-[#DFDBCF] border-t border-b border-gray-300">
        <div className="max-w-6xl mx-auto flex justify-center">
          <ul className="hidden md:flex flex-wrap items-center justify-center gap-2 md:gap-6 py-2 uppercase text-sm tracking-wider font-normal">
            <li>
              <Link href="/" className="px-3 py-1 rounded hover-underline-animate transition font-normal">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="px-3 py-1 rounded hover-underline-animate transition font-normal">
                About
              </Link>
            </li>
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/${cat.slug}`}
                  className="px-3 py-1 rounded hover-underline-animate transition font-normal"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="px-3 py-1 rounded hover-underline-animate transition font-normal">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#DFDBCF] border-t border-gray-300 px-4 transition-all duration-300 ${
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col space-y-2 py-4 font-normal">
          <li>
            <Link href="/" className="block py-2 px-2 rounded hover:bg-[#A855F7]/10 hover:text-[#A855F7] transition" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="block py-2 px-2 rounded hover:bg-[#A855F7]/10 hover:text-[#A855F7] transition" onClick={() => setMobileOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="block py-2 px-2 rounded hover:bg-[#A855F7]/10 hover:text-[#A855F7] transition" onClick={() => setMobileOpen(false)}>
              Contact
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/${cat.slug}`}
                className="block py-2 px-2 rounded hover:bg-[#A855F7]/10 hover:text-[#A855F7] transition"
                onClick={() => setMobileOpen(false)}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}