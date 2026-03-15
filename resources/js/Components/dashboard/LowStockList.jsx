export default function LowStockList({ items }) {
    return (
        <ul className="divide-y divide-slate-100">
            {items.map((item) => (
                <li
                    key={item.sku}
                    className="flex items-center justify-between py-3"
                >
                    <div>
                        <p className="text-sm font-semibold text-slate-900">
                            {item.name}
                        </p>
                        <p className="text-xs text-slate-500">{item.sku}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-bold text-rose-600">
                            {item.stock} {item.unit}
                        </p>
                        <p className="text-xs text-slate-500">
                            min {item.minimum} {item.unit}
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
}
