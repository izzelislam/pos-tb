import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router, useForm } from "@inertiajs/react";
import { useState } from "react";

const initialForm = {
    category_id: "",
    name: "",
    sku: "",
    barcode: "",
    unit: "pcs",
    cost_price: "",
    sell_price: "",
    minimum_stock: "",
    current_stock: "",
    is_active: true,
};

export default function IndexPage({ products, categories }) {
    const [editing, setEditing] = useState(null);
    const form = useForm(initialForm);

    const submit = (e) => {
        e.preventDefault();

        const payload = {
            ...form.data,
            category_id: form.data.category_id || null,
        };

        if (editing) {
            form.transform(() => payload).patch(
                route("products.update", editing.id),
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        form.reset();
                        setEditing(null);
                        form.setData("is_active", true);
                    },
                },
            );
            return;
        }

        form.transform(() => payload).post(route("products.store"), {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                form.setData("is_active", true);
            },
        });
    };

    const startEdit = (item) => {
        setEditing(item);
        form.setData({
            category_id: item.category_id ?? "",
            name: item.name ?? "",
            sku: item.sku ?? "",
            barcode: item.barcode ?? "",
            unit: item.unit ?? "pcs",
            cost_price: item.cost_price ?? "",
            sell_price: item.sell_price ?? "",
            minimum_stock: item.minimum_stock ?? "",
            current_stock: item.current_stock ?? "",
            is_active: item.is_active ?? true,
        });
    };

    const remove = (item) => {
        if (!confirm(`Hapus produk "${item.name}"?`)) return;
        router.delete(route("products.destroy", item.id), {
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
                        Produk
                    </h2>
                </div>
            }
        >
            <Head title="Master - Produk" />

            <div className="space-y-4 bg-slate-50/70 p-4 sm:p-6 lg:p-8">
                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <form
                        onSubmit={submit}
                        className="grid gap-3 md:grid-cols-2 xl:grid-cols-4"
                    >
                        <select
                            value={form.data.category_id}
                            onChange={(e) =>
                                form.setData("category_id", e.target.value)
                            }
                            className="rounded-lg border-slate-300 text-sm focus:border-slate-500 focus:ring-slate-500"
                        >
                            <option value="">Pilih kategori</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData("name", e.target.value)
                            }
                            placeholder="Nama produk"
                            className="rounded-lg border-slate-300 text-sm focus:border-slate-500 focus:ring-slate-500"
                        />
                        <input
                            type="text"
                            value={form.data.sku}
                            onChange={(e) =>
                                form.setData("sku", e.target.value)
                            }
                            placeholder="SKU"
                            className="rounded-lg border-slate-300 text-sm focus:border-slate-500 focus:ring-slate-500"
                        />
                        <input
                            type="text"
                            value={form.data.barcode}
                            onChange={(e) =>
                                form.setData("barcode", e.target.value)
                            }
                            placeholder="Barcode (opsional)"
                            className="rounded-lg border-slate-300 text-sm focus:border-slate-500 focus:ring-slate-500"
                        />
                        <input
                            type="text"
                            value={form.data.unit}
                            onChange={(e) =>
                                form.setData("unit", e.target.value)
                            }
                            placeholder="Satuan"
                            className="rounded-lg border-slate-300 text-sm focus:border-slate-500 focus:ring-slate-500"
                        />
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={form.data.cost_price}
                            onChange={(e) =>
                                form.setData("cost_price", e.target.value)
                            }
                            placeholder="Harga beli"
                            className="rounded-lg border-slate-300 text-sm focus:border-slate-500 focus:ring-slate-500"
                        />
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={form.data.sell_price}
                            onChange={(e) =>
                                form.setData("sell_price", e.target.value)
                            }
                            placeholder="Harga jual"
                            className="rounded-lg border-slate-300 text-sm focus:border-slate-500 focus:ring-slate-500"
                        />
                        <input
                            type="number"
                            min="0"
                            value={form.data.minimum_stock}
                            onChange={(e) =>
                                form.setData("minimum_stock", e.target.value)
                            }
                            placeholder="Minimum stok"
                            className="rounded-lg border-slate-300 text-sm focus:border-slate-500 focus:ring-slate-500"
                        />
                        <input
                            type="number"
                            min="0"
                            value={form.data.current_stock}
                            onChange={(e) =>
                                form.setData("current_stock", e.target.value)
                            }
                            placeholder="Stok saat ini"
                            className="rounded-lg border-slate-300 text-sm focus:border-slate-500 focus:ring-slate-500"
                        />
                        <label className="inline-flex items-center gap-2 text-sm text-slate-700">
                            <input
                                type="checkbox"
                                checked={form.data.is_active}
                                onChange={(e) =>
                                    form.setData("is_active", e.target.checked)
                                }
                                className="rounded border-slate-300"
                            />
                            Aktif
                        </label>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50"
                        >
                            {editing ? "Update Produk" : "Tambah Produk"}
                        </button>
                        {editing ? (
                            <button
                                type="button"
                                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
                                onClick={() => {
                                    setEditing(null);
                                    form.reset();
                                    form.setData("is_active", true);
                                }}
                            >
                                Batal
                            </button>
                        ) : null}
                    </form>
                    {Object.keys(form.errors).length > 0 ? (
                        <p className="mt-2 text-xs text-rose-600">
                            Mohon periksa input form, masih ada field yang belum
                            valid.
                        </p>
                    ) : null}
                </section>

                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                                <tr>
                                    <th className="px-4 py-3">Produk</th>
                                    <th className="px-4 py-3">Kategori</th>
                                    <th className="px-4 py-3">Harga</th>
                                    <th className="px-4 py-3">Stok</th>
                                    <th className="px-4 py-3 text-right">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-t border-slate-100"
                                    >
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-slate-900">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                SKU: {item.sku}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">
                                            {item.category_name ?? "-"}
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">
                                            <p>
                                                Beli: Rp{" "}
                                                {Number(
                                                    item.cost_price,
                                                ).toLocaleString("id-ID")}
                                            </p>
                                            <p>
                                                Jual: Rp{" "}
                                                {Number(
                                                    item.sell_price,
                                                ).toLocaleString("id-ID")}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">
                                            {item.current_stock} / min{" "}
                                            {item.minimum_stock}
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
