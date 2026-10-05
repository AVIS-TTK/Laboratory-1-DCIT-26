import { useReducer, useEffect } from 'react'
import Header from './components/Header'
import Calculator from './components/Calculator'
import Guide from './components/Guide'
import Footer from './components/Footer'

const initialState = {
  current: '0',
  previous: null,
  operator: null,
  overwrite: false,
  expression: '',
  error: null,
}

function compute(a, b, op) {
  const x = parseFloat(a)
  const y = parseFloat(b)
  let r
  if (op === '+') r = x + y
  else if (op === '-') r = x - y
  else if (op === '*') r = x * y
  else if (op === '/') {
    if (y === 0) return null
    r = x / y
  }
  return String(parseFloat(r.toPrecision(12)))
}

function reducer(state, action) {
  
  if (state.error && action.type !== 'clear') {
    return reducer(initialState, action)
  }

  switch (action.type) {
    case 'digit': {
      if (state.overwrite) {
        return { ...state, current: action.value, overwrite: false, expression: state.operator ? state.expression : '' }
      }
      if (state.current === '0') return { ...state, current: action.value }
      if (state.current.replace(/[-.]/g, '').length >= 15) return state
      return { ...state, current: state.current + action.value }
    }

    case 'dot': {
      if (state.overwrite) {
        return { ...state, current: '0.', overwrite: false, expression: state.operator ? state.expression : '' }
      }
      if (state.current.includes('.')) return state
      return { ...state, current: state.current + '.' }
    }

    case 'operator': {
      
      if (state.previous !== null && state.operator && state.overwrite) {
        return { ...state, operator: action.value, expression: `${state.previous} ${symbol(action.value)}` }
      }
      
      if (state.previous !== null && state.operator) {
        const result = compute(state.previous, state.current, state.operator)
        if (result === null) return { ...initialState, current: 'Cannot divide by 0', error: true }
        return {
          ...state,
          current: result,
          previous: result,
          operator: action.value,
          overwrite: true,
          expression: `${result} ${symbol(action.value)}`,
        }
      }
      return {
        ...state,
        previous: state.current,
        operator: action.value,
        overwrite: true,
        expression: `${state.current} ${symbol(action.value)}`,
      }
    }

    case 'equals': {
      if (!state.operator || state.previous === null) return state
      const result = compute(state.previous, state.current, state.operator)
      if (result === null) {
        return { ...initialState, current: 'Cannot divide by 0', error: true }
      }
      return {
        ...initialState,
        current: result,
        overwrite: true,
        expression: `${state.previous} ${symbol(state.operator)} ${state.current} =`,
      }
    }

    case 'delete': {
      if (state.overwrite) return state
      const next = state.current.slice(0, -1)
      return { ...state, current: next === '' || next === '-' ? '0' : next }
    }

    case 'clear':
      return initialState

    default:
      return state
  }
}

export const symbol = (op) => ({ '+': '+', '-': '−', '*': '×', '/': '÷' }[op])

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState)


  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return
      const k = e.key
      if (/^[0-9]$/.test(k)) dispatch({ type: 'digit', value: k })
      else if (k === '.') dispatch({ type: 'dot' })
      else if (['+', '-', '*', '/'].includes(k)) {
        e.preventDefault() 
        dispatch({ type: 'operator', value: k })
      } else if (k === 'Enter' || k === '=') {
        e.preventDefault()
        dispatch({ type: 'equals' })
      } else if (k === 'Backspace') dispatch({ type: 'delete' })
      else if (k === 'Escape' || k.toLowerCase() === 'c') dispatch({ type: 'clear' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 grid gap-8 md:grid-cols-2 items-start">
        <Calculator state={state} dispatch={dispatch} />
        <Guide />
      </main>
      <Footer />
    </div>
  )
}
