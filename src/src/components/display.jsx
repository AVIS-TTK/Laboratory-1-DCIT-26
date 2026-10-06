export default function Display({ expression, value, error }) {
  const size =
    value.length > 14 ? 'text-2xl' : value.length > 10 ? 'text-3xl' : 'text-5xl'

  return (
    <div
      className="bg-slate-900 rounded-2xl px-4 py-3 mb-4 text-right min-h-[96px] flex flex-col justify-end overflow-hidden"
      aria-live="polite"
    >
      <div className="text-slate-500 text-sm h-5 truncate">{expression}</div>
      <div
        className={`font-mono font-semibold break-all ${size} ${
          error ? 'text-red-400 !text-xl' : 'text-white'
        }`}
      >
        {value}
      </div>
    </div>
  )
}
