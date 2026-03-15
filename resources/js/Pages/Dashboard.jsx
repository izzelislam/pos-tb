import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import LowStockList from "@/Components/dashboard/LowStockList";
import QuickAction from "@/Components/dashboard/QuickAction";
import SectionCard from "@/Components/dashboard/SectionCard";
import StatCard from "@/Components/dashboard/StatCard";
import TrendBars from "@/Components/dashboard/TrendBars";

export default function Dashboard({ stats = null }) {
    const { navigation = [] } = usePage().props;

    const fallback = {
        salesToday: 12850000,
        totalTransactions: 174,
        lowStockProducts: 12,
        stockUnits: 4820,
        salesTrend: [
            { label: "Sen", value: 9200000 },
            { label: "Sel", value: 10100000 },
            { label: "Rab", value: 8850000 },
            { label: "Kam", value: 11300000 },
            { label: "Jum", value: 12500000 },
            { label: "Sab", value: 9800000 },
            { label: "Min", value: 7300000 },
        ],
        topProducts: [
            { name: "Semen Tiga Roda 50kg", sold: 84 },
            { name: "Cat Tembok 5L", sold: 59 },
            { name: "Besi Beton 10mm", sold: 53 },
            { name: "Pipa PVC 3/4", sold: 45 },
        ],
        lowStockItems: [
            {
                name: "Paku Beton 5cm",
                sku: "SKU-PK-05",
                stock: 8,
                minimum: 20,
                unit: "pack",
            },
            {
                name: "Cat Besi Hitam 1L",
                sku: "SKU-CB-01",
                stock: 4,
                minimum: 10,
                unit: "kaleng",
            },
            {
                name: "Mata Bor 8mm",
                sku: "SKU-MB-08",
                stock: 6,
                minimum: 15,
                unit: "pcs",
            },
            {
                name: 'Engsel Pintu 4"',
                sku: "SKU-EN-04",
                stock: 9,
                minimum: 24,
                unit: "pcs",
            },
        ],
    };

    const data = stats ?? fallback;
    const allowedRoutes = new Set(
        navigation.flatMap((module) => module.menus.map((menu) => menu.route)),
    );
    const quickActions = [
        {
            title: "Buka POS",
            description: "Mulai transaksi kasir",
            route: "pos.index",
            accent: "hover:border-emerald-300",
        },
        {
            title: "Input Pembelian",
            description: "Catat PO / barang masuk",
            route: "purchases.index",
            accent: "hover:border-amber-300",
        },
        {
            title: "Kelola Produk",
            description: "Update harga dan stok minimum",
            route: "products.index",
            accent: "hover:border-sky-300",
        },
        {
            title: "Lihat Laporan",
            description: "Review performa penjualan",
            route: "reports.index",
            accent: "hover:border-slate-300",
        },
    ].filter((item) => allowedRoutes.has(item.route));

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold leading-tight text-gray-900">
                        Dashboard Operasional
                    </h2>
                    <p className="text-sm text-slate-500">
                        Ringkasan penjualan, stok, dan aktivitas toko hari ini.
                    </p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="bg-slate-50/70 py-8">
                <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <StatCard
                            label="Penjualan Hari Ini"
                            value={`Rp ${data.salesToday.toLocaleString("id-ID")}`}
                            delta="+8.2%"
                            helper="vs kemarin"
                            tone="emerald"
                        />
                        <StatCard
                            label="Total Transaksi"
                            value={data.totalTransactions.toLocaleString(
                                "id-ID",
                            )}
                            delta="+14"
                            helper="transaksi baru"
                            tone="sky"
                        />
                        <StatCard
                            label="Produk Hampir Habis"
                            value={data.lowStockProducts.toLocaleString(
                                "id-ID",
                            )}
                            delta="Perlu restock"
                            helper="prioritas hari ini"
                            tone="amber"
                        />
                        <StatCard
                            label="Total Unit Stok"
                            value={data.stockUnits.toLocaleString("id-ID")}
                            delta="+2.1%"
                            helper="minggu ini"
                            tone="slate"
                        />
                    </section>

                    <section className="grid gap-6 xl:grid-cols-3">
                        <div className="xl:col-span-2">
                            <SectionCard
                                title="Tren Penjualan 7 Hari"
                                subtitle="Performa penjualan harian toko"
                            >
                                <TrendBars data={data.salesTrend} />
                            </SectionCard>
                        </div>

                        <SectionCard
                            title="Produk Terlaris"
                            subtitle="Berdasarkan jumlah item terjual"
                        >
                            <ul className="space-y-3">
                                {data.topProducts.map((item, index) => (
                                    <li
                                        key={item.name}
                                        className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
                                                {index + 1}
                                            </span>
                                            <span className="text-sm font-medium text-slate-800">
                                                {item.name}
                                            </span>
                                        </div>
                                        <span className="text-sm font-semibold text-slate-900">
                                            {item.sold}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </SectionCard>
                    </section>

                    <section className="grid gap-6 lg:grid-cols-2">
                        <SectionCard
                            title="Peringatan Stok Rendah"
                            subtitle="Item yang perlu pengadaan ulang"
                        >
                            <LowStockList items={data.lowStockItems} />
                        </SectionCard>

                        <SectionCard
                            title="Aksi Cepat"
                            subtitle="Akses modul utama operasional toko"
                        >
                            <div className="grid gap-3 sm:grid-cols-2">
                                {quickActions.map((item) => (
                                    <QuickAction
                                        key={item.route}
                                        title={item.title}
                                        description={item.description}
                                        href={route(item.route)}
                                        accent={item.accent}
                                    />
                                ))}
                            </div>
                        </SectionCard>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
