'use client';
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#EAE9E4] flex items-center justify-center py-12 px-4">
      <div className="max-w-5xl w-full bg-[#f0efe9] rounded-lg shadow-xl p-8 flex flex-col md:flex-row gap-12">
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#22223B] mb-6">Say Hello!</h1>
            <p className="text-gray-700 mb-10">imelda@jewelinthemines.com</p>
          </div>
          <div>
            <div className="mb-2 text-xs text-gray-700 font-semibold">Find me on</div>
            <div className="flex gap-4 mb-6">
            {/* Twitter */}
              <a href="https://x.com/ImeldaNasubo" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <svg className="w-5 h-5 text-blue-500 transition" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.85 1.94 3.63-.72-.02-1.39-.22-1.98-.54v.05c0 2.11 1.5 3.87 3.5 4.27-.37.1-.76.16-1.16.16-.28 0-.55-.03-.82-.08.55 1.72 2.16 2.97 4.07 3a8.6 8.6 0 0 1-5.32 1.84c-.35 0-.7-.02-1.04-.06A12.13 12.13 0 0 0 8.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.36 8.36 0 0 0 24 4.59a8.19 8.19 0 0 1-2.36.65 4.28 4.28 0 0 0 1.88-2.37z"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/nasubo-imelda" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg className="w-5 h-5 text-blue-700 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.76 1.37-1.56 2.82-1.56 3.01 0 3.57 1.98 3.57 4.56v4.77z"/>
              </svg>
            </a>
            {/* Medium */}
            <a href="https://medium.com/@JewelInTheMines" target="_blank" rel="noopener noreferrer" aria-label="Medium">
              <svg className="w-5 h-5 text-green-700 transition" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 6.13c.02-.2-.06-.4-.22-.53L.27 3.67V3.41h6.16l4.76 10.45 4.19-10.45h5.89v.26l-1.67 1.6c-.14.11-.21.29-.18.47v12.97c-.03.18.04.36.18.47l1.63 1.6v.26h-8.36v-.26l1.69-1.64c.17-.17.17-.22.17-.47V7.91l-4.76 12.01h-.64L3.1 7.91v8.63c-.05.36.07.73.33.99l2.19 2.66v.26H.23v-.26l2.19-2.66c.25-.26.36-.63.31-.99V6.13z"/>
              </svg>
            </a>
            </div>
            <div className="text-xs text-gray-700 font-semibold mb-1">Nairobi, Kenya</div>
          </div>
        </div>
        {/* Right Side - Form */}
        <form className="flex-1 grid grid-cols-2 gap-6">
          <div className="col-span-1 flex flex-col">
            <label className="text-xs font-semibold text-gray-600 mb-1">NAME</label>
            <input
              type="text"
              placeholder="Your name"
              className="bg-transparent border-0 border-b-2 border-[#A855F7] focus:outline-none focus:border-[#9333EA] transition text-gray-800 py-2 mb-4"
            />
          </div>
          <div className="col-span-1 flex flex-col">
            <label className="text-xs font-semibold text-gray-600 mb-1">SUBJECT</label>
            <input
              type="text"
              placeholder="Choose subject"
              className="bg-transparent border-0 border-b-2 border-[#A855F7] focus:outline-none focus:border-[#9333EA] transition text-gray-800 py-2 mb-4"
            />
          </div>
          <div className="col-span-2 flex flex-col">
            <label className="text-xs font-semibold text-gray-600 mb-1">EMAIL</label>
            <input
              type="email"
              placeholder="Email address"
              className="bg-transparent border-0 border-b-2 border-[#A855F7] focus:outline-none focus:border-[#9333EA] transition text-gray-800 py-2 mb-4"
            />
          </div>
          <div className="col-span-2 flex flex-col">
            <label className="text-xs font-semibold text-gray-600 mb-1">MESSAGE</label>
            <textarea
              placeholder="Start typing here"
              rows={4}
              className="bg-transparent border-0 border-b-2 border-[#A855F7] focus:outline-none focus:border-[#9333EA] transition text-gray-800 py-2 mb-4 resize-none"
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-[#A855F7] hover:bg-[#9333EA] hover:scale-95 text-white rounded-full font-semibold transition"
            >
              Submit
              <span className="ml-1">&rarr;</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}