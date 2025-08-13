"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, ArrowRight, ArrowLeft, Check } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock form data
const mockForm = {
  id: "xyz123",
  title: "Customer Satisfaction Survey",
  description: "Help us improve our service by sharing your thoughts",
  language: "English",
  questions: [
    {
      id: "1",
      text: "What did you enjoy most about our service?",
      required: true,
    },
    {
      id: "2",
      text: "How would you rate your overall experience?",
      required: true,
    },
    {
      id: "3",
      text: "What could we improve?",
      required: false,
    },
    {
      id: "4",
      text: "Would you recommend us to others?",
      required: true,
    },
    {
      id: "5",
      text: "Any additional feedback?",
      required: false,
    },
  ],
}

export default function PublicFormPage({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [responses, setResponses] = useState<Record<string, boolean>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  const progress = ((currentQuestion + 1) / mockForm.questions.length) * 100

  const handleRecord = () => {
    setIsRecording(!isRecording)
    // Mock recording - in real app, handle audio recording
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false)
        setResponses({ ...responses, [mockForm.questions[currentQuestion].id]: true })
      }, 2000)
    }
  }

  const handleNext = () => {
    if (currentQuestion < mockForm.questions.length - 1) {
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
    responses[mockForm.questions[currentQuestion]?.id] || !mockForm.questions[currentQuestion]?.required

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
        <h1 className="text-2xl font-bold text-slate-800 mb-2">{mockForm.title}</h1>
        {mockForm.description && <p className="text-slate-600 mb-4">{mockForm.description}</p>}
        <Badge variant="secondary" className="mb-4">
          {mockForm.language}
        </Badge>
      </div>

      {/* Progress */}
      <div className="px-4 mb-6">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>
              Question {currentQuestion + 1} of {mockForm.questions.length}
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
                {currentQuestion + 1}/{mockForm.questions.length}
                {mockForm.questions[currentQuestion]?.required && (
                  <Badge variant="outline" className="ml-2 text-xs">
                    Required
                  </Badge>
                )}
              </div>

              <h2 className="text-xl font-semibold text-slate-800 mb-8 leading-relaxed">
                {mockForm.questions[currentQuestion]?.text}
              </h2>

              {/* Recording Interface */}
              <div className="mb-8">
                <button
                  onClick={handleRecord}
                  className={`w-20 h-20 rounded-full flex justify-center transition-all duration-200 text-left items-center px-0 mx-[150px] ${
                    isRecording
                      ? "bg-red-500 hover:bg-red-600 animate-pulse"
                      : responses[mockForm.questions[currentQuestion]?.id]
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-purple-500 hover:bg-purple-600"
                  } shadow-lg hover:shadow-xl`}
                >
                  {responses[mockForm.questions[currentQuestion]?.id] ? (
                    <Check className="w-8 h-8 text-white" />
                  ) : (
                    <Mic className="w-8 h-8 text-white" />
                  )}
                </button>

                <p className="text-sm text-slate-600 mt-4">
                  {isRecording
                    ? "Recording... Speak now"
                    : responses[mockForm.questions[currentQuestion]?.id]
                      ? "Response recorded!"
                      : "Tap to record your answer"}
                </p>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex items-center bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="flex space-x-2">
                  
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                  >
                    {currentQuestion === mockForm.questions.length - 1 ? "Submit" : "Next"}
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
