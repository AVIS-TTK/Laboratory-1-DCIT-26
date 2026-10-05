const steps = [
  'Tap the number buttons (0–9) to enter a value. Use "." for decimals.',
  'Pick an operator (+, −, ×, ÷), then enter the second number.',
  'Press "=" to see the result.',
  'Keep chaining operations, e.g. 2 + 3 × 4 is evaluated left to right as you press each operator.',
  'Press "AC" to reset everything, or "DEL" to remove the last digit.',
]

const operations = [
  ['+', 'Addition'],
  ['−', 'Subtraction'],
  ['×', 'Multiplication'],
  ['÷', 'Division (shows an error when dividing by 0)'],
]

const keys = [
  ['0–9 / .', 'Enter numbers'],
  ['+ − * /', 'Operators'],
  ['Enter or =', 'Calculate'],
  ['Backspace', 'Delete last digit'],
  ['Esc or C', 'Clear all'],
]

export default function Guide() {
  return (
    <section aria-label="User guide" className="space-y-6">
      <div className="bg-slate-900 rounded-2xl p-5">
        <h2 className="text-xl font-semibold mb-3 text-emerald-400">How to Use</h2>
        <ol className="list-decimal list-inside space-y-2 text-slate-300 text-sm sm:text-base">
          {steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>

      <div className="bg-slate-900 rounded-2xl p-5">
        <h2 className="text-xl font-semibold mb-3 text-emerald-400">Supported Operations</h2>
        <ul className="space-y-2 text-sm sm:text-base">
          {operations.map(([sym, desc]) => (
            <li key={sym} className="flex items-center gap-3">
              <span className="w-9 h-9 grid place-items-center rounded-lg bg-emerald-500 text-slate-950 font-bold">
                {sym}
              </span>
              <span className="text-slate-300">{desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-slate-900 rounded-2xl p-5">
        <h2 className="text-xl font-semibold mb-3 text-emerald-400">Keyboard Shortcuts</h2>
        <ul className="space-y-2 text-sm sm:text-base">
          {keys.map(([k, desc]) => (
            <li key={k} className="flex items-center justify-between gap-3">
              <kbd className="px-2 py-1 rounded bg-slate-700 font-mono text-xs sm:text-sm">{k}</kbd>
              <span className="text-slate-300 text-right">{desc}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
