import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function ShowPage({ module }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Modul
                    </p>
                    <h2 className="mt-1 text-xl font-semibold leading-tight text-slate-900">
                        {module.label}
                    </h2>
                </div>
            }
        >
            <Head title={`Modul - ${module.label}`} />

            <div className="space-y-4 bg-slate-50/70 p-4 sm:p-6 lg:p-8">
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm text-slate-600">{module.description}</p>
                </section>

                <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {module.menus.map((menu) => (
                        <Link
                            key={menu.route}
                            href={route(menu.route)}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow"
                        >
                            <h3 className="text-base font-semibold text-slate-900">
                                {menu.label}
                            </h3>
                            <p className="mt-2 text-xs text-slate-500">
                                Route: {menu.route}
                            </p>
                        </Link>
                    ))}
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
