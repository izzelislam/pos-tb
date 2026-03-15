import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AuthenticatedLayout({ header, children }) {
    const { auth, navigation } = usePage().props;
    const user = auth.user;
    const roles = auth.roles ?? [];
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-100">
            <div className="flex">
                <aside className="hidden min-h-screen w-72 border-r border-slate-200 bg-white lg:block">
                    <Sidebar
                        user={user}
                        roles={roles}
                        navigation={navigation}
                        onNavigate={null}
                    />
                </aside>

                <div className="min-h-screen flex-1">
                    <header className="border-b border-slate-200 bg-white">
                        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setMobileOpen(true)}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 text-slate-600 lg:hidden"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.8"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </button>
                                <div>{header}</div>
                            </div>

                            <div className="hidden items-center gap-4 sm:flex">
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-slate-800">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {roles.join(", ") || "User"}
                                    </p>
                                </div>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                >
                                    Logout
                                </Link>
                            </div>
                        </div>
                    </header>

                    <main>{children}</main>
                </div>
            </div>

            {mobileOpen ? (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <button
                        type="button"
                        className="absolute inset-0 bg-slate-900/45"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl">
                        <Sidebar
                            user={user}
                            roles={roles}
                            navigation={navigation}
                            onNavigate={() => setMobileOpen(false)}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
}

function Sidebar({ user, roles, navigation, onNavigate }) {
    const activeModuleKey = usePage().props.activeModuleKey;
    const activeModule = (navigation ?? []).find(
        (module) => module.key === activeModuleKey,
    );

    return (
        <div className="flex h-full flex-col">
            <div className="border-b border-slate-200 px-5 py-4">
                <Link href={route("dashboard")} onClick={onNavigate}>
                    <ApplicationLogo className="h-9 w-auto fill-current text-slate-800" />
                </Link>
                <div className="mt-3">
                    <p className="text-sm font-semibold text-slate-900">
                        {user.name}
                    </p>
                    <p className="text-xs text-slate-500">
                        {roles.join(", ") || "User"}
                    </p>
                </div>
            </div>

            <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-5">
                <div>
                    <p className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Menu Utama
                    </p>
                    <div className="mt-2 space-y-1">
                        <Link
                            href={route("dashboard")}
                            onClick={onNavigate}
                            className={`block rounded-lg px-3 py-2 text-sm transition ${
                                route().current("dashboard")
                                    ? "bg-slate-900 text-white"
                                    : "text-slate-700 hover:bg-slate-100"
                            }`}
                        >
                            Daftar Modul
                        </Link>
                    </div>
                </div>

                <div>
                    <p className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Modul
                    </p>
                    <div className="mt-2 space-y-1">
                        {(navigation ?? []).map((module) => (
                            <Link
                                key={module.key}
                                href={route("modules.show", module.key)}
                                onClick={onNavigate}
                                className={`block rounded-lg px-3 py-2 text-sm transition ${
                                    activeModuleKey === module.key
                                        ? "bg-slate-900 text-white"
                                        : "text-slate-700 hover:bg-slate-100"
                                }`}
                            >
                                {module.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {activeModule ? (
                    <div>
                        <p className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                            Menu {activeModule.label}
                        </p>
                        <div className="mt-2 space-y-1">
                            {activeModule.menus.map((menu) => {
                                const active = route().current(menu.route);

                                return (
                                    <Link
                                        key={menu.route}
                                        href={route(menu.route)}
                                        onClick={onNavigate}
                                        className={`block rounded-lg px-3 py-2 text-sm transition ${
                                            active
                                                ? "bg-slate-900 text-white"
                                                : "text-slate-700 hover:bg-slate-100"
                                        }`}
                                    >
                                        {menu.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ) : null}
            </nav>

            <div className="border-t border-slate-200 p-4">
                <Link
                    href={route("profile.edit")}
                    onClick={onNavigate}
                    className="mb-2 block rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                >
                    Profil Saya
                </Link>
                <Link
                    href={route("logout")}
                    method="post"
                    as="button"
                    onClick={onNavigate}
                    className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                    Logout
                </Link>
            </div>
        </div>
    );
}
