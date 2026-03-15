import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function IndexPage({ modules = [] }) {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Menu Utama
                    </p>
                    <h2 className="mt-1 text-xl font-semibold leading-tight text-slate-900">
                        Daftar Modul
                    </h2>
                </div>
            }
        >
            <Head title="Daftar Modul" />

            <div className="bg-slate-50/70 p-4 sm:p-6 lg:p-8">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {modules.map((module) => (
                        <Link
                            key={module.key}
                            href={route("modules.show", module.key)}
                            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow"
                        >
                            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
                                {(module.label ?? "M").slice(0, 2).toUpperCase()}
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900">
                                {module.label}
                            </h3>
                            <p className="mt-2 text-sm text-slate-600">
                                {module.description}
                            </p>
                            <p className="mt-3 text-xs font-medium text-slate-500">
                                {module.menus?.length ?? 0} menu
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
