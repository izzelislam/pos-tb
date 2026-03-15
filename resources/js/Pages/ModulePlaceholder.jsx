import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function ModulePlaceholder({ title }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-900">
                    {title}
                </h2>
            }
        >
            <Head title={title} />

            <div className="py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm text-slate-600">
                            Modul <span className="font-semibold">{title}</span>{" "}
                            sudah terdaftar. Implementasi fitur detail akan
                            dilanjutkan di tahap berikutnya.
                        </p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
