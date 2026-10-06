const styles = {
  number: 'bg-slate-700 hover:bg-slate-600 text-white',
  operator: 'bg-emerald-500 hover:bg-emerald-400 text-slate-950',
  action: 'bg-slate-500 hover:bg-slate-400 text-white',
  danger: 'bg-rose-500 hover:bg-rose-400 text-white',
  equals: 'bg-amber-400 hover:bg-amber-300 text-slate-950',
}

export default function Button({ label, onClick, variant = 'number', wide = false, ariaLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || label}
      className={`${styles[variant]} ${wide ? 'col-span-2' : ''}
        h-14 sm:h-16 rounded-xl text-xl font-semibold shadow-md
        transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white`}
    >
      {label}
    </button>
  )
}
