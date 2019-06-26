/** @format */

import React, { useState } from 'react'
import './App.css'

function useFactorial() {
  const [result, setResult] = useState(0)

  async function calculate(number) {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/factorial`, {
      method: 'post',
      body: JSON.stringify({ number })
    }).then(res => res.json())
    setResult(response.result)
  }

  return [result, calculate]
}

function App() {
  const [number, setNumber] = useState(0)
  const [result, calculate] = useFactorial()

  return (
    <div className="App">
      <main>
        <h1>Factorial</h1>
        <form className="form">
          <div className="form-group">
            <label className="form-label">Your Number</label>
            <input className="form-input" type="number" value={number} onChange={event => setNumber(event.target.value)} />
          </div>
          <button type="button" onClick={() => calculate(number)}>
            Calculate
          </button>
        </form>
        <div className="result">
          Your Number is <strong>{number}</strong>
          <br />
          Result: <strong>{result}</strong>
        </div>
      </main>
    </div>
  )
}

export default App
