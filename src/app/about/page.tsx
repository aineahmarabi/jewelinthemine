'use client';

import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#EAE9E4] flex flex-col items-center py-8 px-2">
      <div className="max-w-5xl w-full bg-[#f0efe9] rounded-lg shadow-xl p-6 md:p-10 flex flex-col md:flex-row gap-8">
        {/* Left: Main Image */}
        <div className="md:w-2/3 w-full flex flex-col">
          <h1 className="text-2xl md:text-3xl font-bold text-[#22223B] mb-4">
            My Journey in the Mines – Imelda
          </h1>
          <div className="w-full h-64 md:h-80 relative mb-6 rounded-lg overflow-hidden">
            <Image
              src="/Imelda.jpg" // Replace with your actual image path
              alt="Imelda writing in a notebook"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
            <span>July 2025</span>
            <span className="mx-1">|</span>
            <span>Imelda Nasubo</span>
          </div>
          <p className="text-base text-gray-700 mb-4">
            I had always dreamed of working in an industry that let me dig deep—literally and figuratively. As a mining engineer, I get to explore the earth’s treasures, solve real-world challenges, and make a difference in communities. My journey has been filled with adventure, learning, and a passion for discovery.
          </p>
          <p className="text-base text-gray-700 mb-4">
            When I am not at a mining site or working on new projects, you will find me lost in a good novel, sipping coffee, or marveling at the beauty of gemstones—especially citrine, my birthstone. I believe every stone, like every person, has a unique story to tell.
          </p>
          <p className="text-base text-gray-700 mb-4">
            <span className="font-semibold text-[#A855F7]">Jewel in the Mines</span> is my space to share stories, insights, and inspiration from my life as an engineer, adventurer, and believer. Whether you’re curious about mining, love gemstones, or just want toenjoy a good story, I hope you’ll find something here that resonates with you.
          </p>
          <p className="text-base text-gray-700">
            Thank you for stopping by! If you would like to connect, feel free to <Link href="/contact" className="text-[#A855F7] underline hover:text-[#9333EA]">reach out</Link> or explore more of my journey.
          </p>
        </div>
        {/* Right: Sidebar */}
        <aside className="md:w-1/3 w-full flex flex-col items-center">
          <div className="w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-[#A855F7] bg-[#EAE9E4]">
            <Image
              src="/Ime.webp" // Replace with your actual profile image path
              alt="Imelda Nasubo"
              width={160}
              height={160}
              className="object-cover w-full h-full"
              priority
            />
          </div>
          <div className="bg-[#F6F5F0] rounded-lg p-4 text-center shadow">
            <h2 className="text-lg font-bold text-[#22223B] mb-2">Hey! I’m Imelda</h2>
            <p className="text-sm text-gray-700 mb-2">
Welcome to Jewel in the Mines! Here, we explore everything from adventure to inspiration, with stories that spark curiosity and conversation. As they say, "The best stories are those we share together." Thank you for being part of the adventure.            </p>
            <p className="text-sm text-gray-700">
              Along with my engineering work, I started this blog to share my experiences and connect with fellow adventurers and dreamers. If you want to know more about me, check my <Link href="/contact" className="text-[#A855F7] underline hover:text-[#9333EA]">contact page</Link>.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}