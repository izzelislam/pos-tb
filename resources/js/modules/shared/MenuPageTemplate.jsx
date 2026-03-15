import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function MenuPageTemplate({ module, menu, description }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {module}
                    </p>
                    <h2 className="mt-1 text-xl font-semibold leading-tight text-slate-900">
                        {menu}
                    </h2>
                </div>
            }
        >
            <Head title={`${module} - ${menu}`} />

            <div className="bg-slate-50/70 py-8">
                <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
                    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                        <h3 className="text-base font-semibold text-slate-900">
                            Halaman Modul
                        </h3>
                        <p className="mt-2 text-sm text-slate-600">
                            {description}
                        </p>
                    </section>

                    <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <h3 className="text-sm font-semibold text-slate-900">
                            Aksi Cepat
                        </h3>
                        <div className="mt-3 space-y-2">
                            <Link
                                href={route("dashboard")}
                                className="block rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                            >
                                Ke Dashboard
                            </Link>
                            <Link
                                href={route("profile.edit")}
                                className="block rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                            >
                                Edit Profil
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
