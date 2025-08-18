"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, ArrowRight, ArrowLeft, Check } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { fetchFormByUniqueId } from "@/lib/api/forms"
import { Input } from "@/components/ui/input";

export default function PublicFormPage({ params }: { params: any }) {
  const { id } = React.use(params) as { id: string };
  const [form, setForm] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [responses, setResponses] = useState<Record<string, boolean>>({})
  const [textResponses, setTextResponses] = useState<Record<string, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    fetchFormByUniqueId(id)
      .then(setForm)
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading form...</div>
  }
  if (!form) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Form not found.</div>
  }

  const questions = form.fields || []
  const progress = questions.length > 0 ? ((currentQuestion) / questions.length) * 100 : 0

  const handleRecord = () => {
    setIsRecording(!isRecording)
    // Mock recording - in real app, handle audio recording
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false)
        setResponses({ ...responses, [questions[currentQuestion].id]: true })
      }, 2000)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const canProceed =
    responses[questions[currentQuestion]?.id] || !questions[currentQuestion]?.required

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Thank you!</h2>
            <p className="text-slate-600 mb-6">
              Your voice responses have been submitted successfully. We appreciate your feedback!
            </p>
            <div className="text-sm text-slate-500">
              Powered by <span className="font-medium">EchoForm</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="p-4 text-center">
        <div className="flex items-center justify-center mb-2 gap-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
            {form.title?.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold text-slate-800">{form.title}</h1>
        </div>
        {form.description && <p className="text-slate-600 mb-4">{form.description}</p>}
        <Badge variant="secondary" className="mb-4">
          {form.language}
        </Badge>
      </div>

      {/* Progress */}
      <div className="px-4 mb-6">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question Card */}
      <div className="px-4 flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="text-sm text-slate-500 mb-4">
                {currentQuestion + 1}/{questions.length}
                {questions[currentQuestion]?.required && (
                  <Badge variant="outline" className="ml-2 text-xs">
                    Required
                  </Badge>
                )}
              </div>

              <h2 className="text-xl font-semibold text-slate-800 mb-8 leading-relaxed">
                {questions[currentQuestion]?.question}
              </h2>

              {/* Recording Interface */}
              <div className="mb-8 flex flex-col items-center gap-4">
                <button
                  onClick={handleRecord}
                  className={`w-20 h-20 rounded-full flex justify-center transition-all duration-200 text-left items-center px-0 mx-[150px] ${
                    isRecording
                      ? "bg-red-500 hover:bg-red-600 animate-pulse"
                      : responses[questions[currentQuestion]?.id]
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-purple-500 hover:bg-purple-600"
                  } shadow-lg hover:shadow-xl cursor-pointer`}
                >
                  {responses[questions[currentQuestion]?.id] ? (
                    <Check className="w-8 h-8 text-white" />
                  ) : (
                    <Mic className="w-8 h-8 text-white" />
                  )}
                </button>

                <Input
                  className="w-full max-w-xs mx-auto rounded-md border border-slate-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition cursor-pointer"
                  placeholder="Type your answer (optional)"
                  value={textResponses[questions[currentQuestion]?.id] || ""}
                  onChange={e => setTextResponses({ ...textResponses, [questions[currentQuestion]?.id]: e.target.value })}
                />
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex items-center bg-transparent cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="flex space-x-2">
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white cursor-pointer"
                  >
                    {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="p-4 text-center">
        <p className="text-xs text-slate-500">
          Powered by <span className="font-medium">EchoForm</span>
        </p>
      </div>
    </div>
  )
}
