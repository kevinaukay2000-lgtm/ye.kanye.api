import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [quote, setQuote] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchQuote = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('https://api.kanye.rest')
      if (!response.ok) throw new Error('Failed to fetch quote')
      const data = await response.json()
      setQuote(data.quote)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuote()
  }, [])

  return (
    <div className="app-container">
      <main className="quote-card">
        <div className="quote-header">
          <span className="kanye-badge">KANYE WEST</span>
        </div>

        <div className="quote-content">
          {loading ? (
            <div className="loader">Loading wisdom...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <blockquote className="quote-text">
              "{quote}"
            </blockquote>
          )}
        </div>

        <button
          className="refresh-button"
          onClick={fetchQuote}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Next Quote'}
        </button>
      </main>

      <footer className="footer">
        <p>Powered by api.kanye.rest</p>
      </footer>
    </div>
  )
}

export default App
