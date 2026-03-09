export const revalidate = 3600;

export default function PropertyInfo() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-6 sm:p-10 rounded-xl border border-neutral-200 shadow-sm flex items-start gap-6">
                <div className="w-16 h-16 flex items-center justify-center bg-green-50 rounded-full text-3xl shrink-0">
                    🏨
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Property Info</h1>
                    <p className="text-neutral-500 mt-2 text-lg">
                        Quick reference guide for property details, suites, and pricing.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <section className="bg-white border text-neutral-800 border-neutral-200 p-6 rounded-xl shadow-sm space-y-4">
                    <h2 className="text-2xl font-bold border-b border-neutral-100 pb-2">The Basics</h2>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                        <div>
                            <dt className="text-neutral-500 font-medium">Name</dt>
                            <dd className="font-semibold text-neutral-900">The Big Muddy Inn & Blues Room</dd>
                        </div>
                        <div>
                            <dt className="text-neutral-500 font-medium">Address</dt>
                            <dd className="font-semibold text-neutral-900">411 North Commerce Street<br />Natchez, MS 39120</dd>
                        </div>
                        <div>
                            <dt className="text-neutral-500 font-medium">Phone</dt>
                            <dd className="font-semibold text-neutral-900">(769) 376-8045</dd>
                        </div>
                        <div>
                            <dt className="text-neutral-500 font-medium">Email</dt>
                            <dd className="font-semibold text-neutral-900">info@thebigmuddyinn.com</dd>
                        </div>
                        <div>
                            <dt className="text-neutral-500 font-medium">Website</dt>
                            <dd className="font-semibold text-neutral-900 border-b border-transparent hover:border-blue-500"><a href="https://thebigmuddyinn.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">thebigmuddyinn.com</a></dd>
                        </div>
                    </dl>
                </section>

                <section className="bg-white border text-neutral-800 border-neutral-200 p-6 rounded-xl shadow-sm space-y-4">
                    <h2 className="text-2xl font-bold border-b border-neutral-100 pb-2">The 6 Suites</h2>
                    <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                        <li><strong>Muddy Waters Suite</strong> — Father of modern Chicago blues</li>
                        <li><strong>John Lee Hooker Suite</strong> — The boogie man</li>
                        <li><strong>Robert Johnson Suite</strong> — Crossroads king</li>
                        <li><strong>British Invasion Suite I</strong> — British rockers who brought blues back</li>
                        <li><strong>British Invasion Suite II</strong> — Companion to Suite I</li>
                        <li><strong>B.B. King Suite</strong> — King of the Blues</li>
                    </ul>
                </section>

                <section className="bg-white border text-neutral-800 border-neutral-200 p-6 rounded-xl shadow-sm space-y-4">
                    <h2 className="text-2xl font-bold border-b border-neutral-100 pb-2">Pricing & Rates</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                        <dl className="space-y-3">
                            <div className="flex justify-between border-b border-neutral-100 border-dotted pb-1">
                                <dt className="text-neutral-600">Base Rate</dt>
                                <dd className="font-bold text-neutral-900">$125/night</dd>
                            </div>
                            <div className="flex justify-between border-b border-neutral-100 border-dotted pb-1">
                                <dt className="text-neutral-600">Non-Refundable (-10%)</dt>
                                <dd className="font-semibold text-neutral-800">$112.50</dd>
                            </div>
                            <div className="flex justify-between border-b border-neutral-100 border-dotted pb-1">
                                <dt className="text-neutral-600">Advance Purchase (-15%)</dt>
                                <dd className="font-semibold text-neutral-800">$106.25</dd>
                            </div>
                        </dl>
                        <dl className="space-y-3">
                            <div className="flex justify-between border-b border-neutral-100 border-dotted pb-1">
                                <dt className="text-neutral-600">Extended Stay (-10%)</dt>
                                <dd className="font-semibold text-neutral-800">$112.50</dd>
                            </div>
                            <div className="flex justify-between border-b border-neutral-100 border-dotted pb-1">
                                <dt className="text-neutral-600">Weekly (-20%)</dt>
                                <dd className="font-semibold text-neutral-800">$100.00</dd>
                            </div>
                            <div className="flex justify-between border-b border-neutral-100 border-dotted pb-1">
                                <dt className="text-neutral-600">Blues Room Package</dt>
                                <dd className="font-semibold text-neutral-800">+$50</dd>
                            </div>
                        </dl>
                    </div>
                    <div className="mt-4 p-4 bg-amber-50 rounded-lg text-sm text-amber-800 flex flex-col gap-1 border border-amber-100 border-dashed">
                        <span className="font-semibold text-amber-900">Taxes: ~12%</span>
                        <span>MS State: 7% | Adams County: 2% | City of Natchez: 3%</span>
                    </div>
                </section>

                <section className="bg-white border text-neutral-800 border-neutral-200 p-6 rounded-xl shadow-sm space-y-4">
                    <h2 className="text-2xl font-bold border-b border-neutral-100 pb-2">Local Competitors</h2>
                    <ul className="list-disc pl-5 space-y-2 text-neutral-700">
                        <li><strong>Monmouth Historic Inn</strong> — high-end, antebellum estate</li>
                        <li><strong>Dunleith Historic Inn</strong> — upscale historic property</li>
                        <li><strong>The Guest House Hotel</strong> — downtown boutique</li>
                        <li><strong>Natchez Grand Hotel</strong> — larger hotel, convention-friendly</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
