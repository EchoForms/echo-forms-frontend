"use client"

import { useEffect, useState } from "react"

interface EmbeddedFormProps {
  formId: string
  baseUrl?: string
}

export default function EmbeddedForm({ formId, baseUrl }: EmbeddedFormProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Set loading to false after a short delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Get the base URL dynamically
  const getBaseUrl = () => {
    if (baseUrl) return baseUrl
    if (typeof window !== "undefined") {
      return `${window.location.protocol}//${window.location.host}`
    }
    return "http://localhost:3000"
  }

  const formUrl = `${getBaseUrl()}/forms/${formId}`

  if (isLoading) {
    return (
      <div className="w-full h-[600px] bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl flex items-center justify-center border-2 border-purple-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg text-purple-600 font-medium">Loading your voice survey...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-[400px] bg-red-50 rounded-2xl flex items-center justify-center border-2 border-red-200">
        <div className="text-center">
          <p className="text-lg text-red-600 font-medium">Failed to load form</p>
          <p className="text-sm text-red-500 mt-2">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <iframe
          src={formUrl}
          width="100%"
          height="800"
          frameBorder="0"
          className="w-full"
          title="EchoForm Voice Survey"
          onError={() => setError("Failed to load form")}
          style={{
            minHeight: "600px",
            border: "none",
            borderRadius: "16px"
          }}
        />
      </div>
      
      {/* Fallback link */}
      <div className="mt-4 text-center">
        <p className="text-sm text-slate-500">
          Having trouble viewing the form?{" "}
          <a 
            href={formUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-700 font-medium underline"
          >
            Open in new tab
          </a>
        </p>
      </div>
    </div>
  )
}
