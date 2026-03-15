import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function IndexPage({ categories, filters }) {
    const [editing, setEditing] = useState(null);
    const form = useForm({ name: "" });

    const submit = (e) => {
        e.preventDefault();

        if (editing) {
            form.patch(route("categories.update", editing.id), {
                preserveScroll: true,
                onSuccess: () => {
                    form.reset();
                    setEditing(null);
                },
            });
            return;
        }

        form.post(route("categories.store"), {
            preserveScroll: true,
            onSuccess: () => form.reset(),
        });
    };

    const startEdit = (item) => {
        setEditing(item);
        form.setData("name", item.name);
    };

    const remove = (item) => {
        if (!confirm(`Hapus kategori "${item.name}"?`)) return;
        router.delete(route("categories.destroy", item.id), {
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Master
                    </p>
                    <h2 className="mt-1 text-xl font-semibold leading-tight text-slate-900">
                        Kategori Produk
                    </h2>
                </div>
            }
        >
            <Head title="Master - Kategori Produk" />

            <div className="space-y-4 bg-slate-50/70 p-4 sm:p-6 lg:p-8">
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <form
                        onSubmit={submit}
                        className="grid gap-3 sm:grid-cols-[1fr_auto_auto]"
                    >
                        <input
                            type="text"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData("name", e.target.value)
                            }
                            placeholder="Nama kategori"
                            className="w-full rounded-lg border-slate-300 text-sm focus:border-slate-500 focus:ring-slate-500"
                        />
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
                        >
                            {editing ? "Update" : "Tambah"}
                        </button>
                        {editing ? (
                            <button
                                type="button"
                                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
                                onClick={() => {
                                    setEditing(null);
                                    form.reset();
                                }}
                            >
                                Batal
                            </button>
                        ) : null}
                    </form>
                    {form.errors.name ? (
                        <p className="mt-2 text-xs text-rose-600">
                            {form.errors.name}
                        </p>
                    ) : null}
                </section>

                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                                <tr>
                                    <th className="px-4 py-3">Nama</th>
                                    <th className="px-4 py-3">Slug</th>
                                    <th className="px-4 py-3">Total Produk</th>
                                    <th className="px-4 py-3 text-right">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-t border-slate-100"
                                    >
                                        <td className="px-4 py-3 font-medium text-slate-900">
                                            {item.name}
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">
                                            {item.slug}
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">
                                            {item.products_count}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => startEdit(item)}
                                                className="mr-2 rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => remove(item)}
                                                className="rounded-md border border-rose-300 px-3 py-1.5 text-xs font-medium text-rose-700"
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </AuthenticatedLayout>
    );
}
