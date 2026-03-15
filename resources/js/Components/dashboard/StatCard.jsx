export default function StatCard({
    label,
    value,
    delta,
    tone = "slate",
    helper,
}) {
    const toneMap = {
        slate: "from-slate-900 to-slate-700",
        emerald: "from-emerald-700 to-emerald-500",
        amber: "from-amber-700 to-amber-500",
        sky: "from-sky-700 to-sky-500",
    };

    return (
        <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div
                className={`absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-gradient-to-br opacity-15 ${toneMap[tone] ?? toneMap.slate}`}
            />
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {label}
            </p>
            <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
            <div className="mt-3 flex items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                    {delta}
                </span>
                {helper ? <span className="text-xs text-slate-500">{helper}</span> : null}
            </div>
        </article>
    );
}
