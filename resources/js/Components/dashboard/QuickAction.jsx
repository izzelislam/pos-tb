import { Link } from "@inertiajs/react";

export default function QuickAction({ title, description, href, accent }) {
    return (
        <Link
            href={href}
            className={`group rounded-xl border border-slate-200 p-4 transition hover:-translate-y-0.5 hover:shadow-sm ${accent}`}
        >
            <p className="text-sm font-semibold text-slate-900">{title}</p>
            <p className="mt-1 text-xs text-slate-600">{description}</p>
        </Link>
    );
}
