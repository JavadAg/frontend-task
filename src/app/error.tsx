"use client"

import React, { useEffect } from "react"
import "../styles/_error-card.scss"

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="error-card-wrapper">
      <div className="error-card">
        <div className="error-card__icon" aria-hidden>
          ⚠️
        </div>
        <h1 className="error-card__heading">Something went wrong</h1>
        <p className="error-card__message">
          {error.message || "An unexpected error occurred."}
        </p>
        <button
          className="download-button"
          onClick={reset}
          aria-label="Try again"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
