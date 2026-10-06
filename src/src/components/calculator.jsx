import Display from './Display'
import Button from './Button'

export default function Calculator({ state, dispatch }) {
  const digit = (d) => () => dispatch({ type: 'digit', value: d })
  const op = (o) => () => dispatch({ type: 'operator', value: o })

  return (
    <section
      aria-label="Calculator"
      className="bg-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl w-full max-w-sm mx-auto"
    >
      <Display expression={state.expression} value={state.current} error={!!state.error} />

      <div className="grid grid-cols-4 gap-3">
        <Button label="AC" variant="danger" wide ariaLabel="All clear" onClick={() => dispatch({ type: 'clear' })} />
        <Button label="DEL" variant="action" ariaLabel="Delete last digit" onClick={() => dispatch({ type: 'delete' })} />
        <Button label="÷" variant="operator" ariaLabel="Divide" onClick={op('/')} />

        <Button label="7" onClick={digit('7')} />
        <Button label="8" onClick={digit('8')} />
        <Button label="9" onClick={digit('9')} />
        <Button label="×" variant="operator" ariaLabel="Multiply" onClick={op('*')} />

        <Button label="4" onClick={digit('4')} />
        <Button label="5" onClick={digit('5')} />
        <Button label="6" onClick={digit('6')} />
        <Button label="−" variant="operator" ariaLabel="Subtract" onClick={op('-')} />

        <Button label="1" onClick={digit('1')} />
        <Button label="2" onClick={digit('2')} />
        <Button label="3" onClick={digit('3')} />
        <Button label="+" variant="operator" ariaLabel="Add" onClick={op('+')} />

        <Button label="0" wide onClick={digit('0')} />
        <Button label="." ariaLabel="Decimal point" onClick={() => dispatch({ type: 'dot' })} />
        <Button label="=" variant="equals" ariaLabel="Equals" onClick={() => dispatch({ type: 'equals' })} />
      </div>
    </section>
  )
}
