export default function TrendBars({ data }) {
    const max = Math.max(...data.map((item) => item.value), 1);

    return (
        <div className="space-y-3">
            {data.map((item) => {
                const width = `${Math.round((item.value / max) * 100)}%`;

                return (
                    <div key={item.label}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="font-medium text-slate-600">
                                {item.label}
                            </span>
                            <span className="font-semibold text-slate-800">
                                Rp {item.value.toLocaleString("id-ID")}
                            </span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100">
                            <div
                                className="h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                                style={{ width }}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
