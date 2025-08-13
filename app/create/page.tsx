"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Mic, Plus, Trash2, ArrowLeft, Eye, Share, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Question {
  id: string
  text: string
  required: boolean
}

export default function CreateFormPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    language: "",
  })
  const [questions, setQuestions] = useState<Question[]>([{ id: "1", text: "", required: false }])
  const [publishedLink, setPublishedLink] = useState("")
  const router = useRouter()

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      text: "",
      required: false,
    }
    setQuestions([...questions, newQuestion])
  }

  const removeQuestion = (id: string) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id))
    }
  }

  const updateQuestion = (id: string, field: keyof Question, value: string | boolean) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  const handlePublish = () => {
    // Generate mock link
    const mockId = Math.random().toString(36).substring(2, 8)
    setPublishedLink(`https://yourechoform.io/s/${mockId}`)
    setCurrentStep(4)
  }

  const steps = [
    { number: 1, title: "Form Details", description: "Basic information" },
    { number: 2, title: "Language", description: "Select input language" },
    { number: 3, title: "Questions", description: "Add your questions" },
    { number: 4, title: "Publish", description: "Share your form" },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center text-slate-600 hover:text-slate-800">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-800">EchoForm</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center space-x-3 ${
                      currentStep >= step.number ? "text-purple-600" : "text-slate-400"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step.number ? "bg-purple-600 text-white" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {step.number}
                    </div>
                    <div className="hidden md:block">
                      <p className="font-medium">{step.title}</p>
                      <p className="text-xs text-slate-500">{step.description}</p>
                    </div>
                  </div>
                  {index < steps.length - 1 && <ChevronRight className="w-4 h-4 text-slate-400 mx-4" />}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Form Details */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Form Details</CardTitle>
                <CardDescription>Give your voice survey a title and description</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Form Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Customer Satisfaction Survey"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of your survey..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={() => setCurrentStep(2)}
                    disabled={!formData.title.trim()}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Next: Select Language
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Language Selection */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Select Input Language</CardTitle>
                <CardDescription>Choose the language your respondents will use</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="italian">Italian</SelectItem>
                      <SelectItem value="portuguese">Portuguese</SelectItem>
                      <SelectItem value="chinese">Chinese (Mandarin)</SelectItem>
                      <SelectItem value="japanese">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(3)}
                    disabled={!formData.language}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Next: Add Questions
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Questions */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Add Questions</CardTitle>
                <CardDescription>Create questions that your respondents will answer with their voice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {questions.map((question, index) => (
                  <div key={question.id} className="border border-slate-200 rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-slate-700">Question {index + 1}</Label>
                      {questions.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <Textarea
                      placeholder="Enter your question here..."
                      value={question.text}
                      onChange={(e) => updateQuestion(question.id, "text", e.target.value)}
                      rows={2}
                    />

                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`required-${question.id}`}
                        checked={question.required}
                        onCheckedChange={(checked) => updateQuestion(question.id, "required", checked)}
                      />
                      <Label htmlFor={`required-${question.id}`} className="text-sm">
                        Required question
                      </Label>
                    </div>

                    <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
                      <Mic className="w-3 h-3 inline mr-1" />
                      Responses will be audio-only
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={addQuestion}
                  className="w-full border-dashed border-slate-300 hover:border-slate-400 bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Question
                </Button>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Back
                  </Button>
                  <Button
                    onClick={() => setCurrentStep(4)}
                    disabled={questions.some((q) => !q.text.trim())}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Preview & Publish
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Preview & Publish */}
          {currentStep === 4 && !publishedLink && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Preview Your Form</CardTitle>
                  <CardDescription>Review how your form will appear to respondents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-slate-100 p-6 rounded-lg">
                    <div className="bg-white p-6 rounded-lg shadow-sm max-w-md mx-auto">
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{formData.title}</h3>
                      {formData.description && <p className="text-slate-600 mb-4">{formData.description}</p>}
                      <Badge variant="secondary" className="mb-4">
                        Language: {formData.language}
                      </Badge>

                      <div className="space-y-4">
                        {questions.slice(0, 2).map((question, index) => (
                          <div key={question.id} className="border border-slate-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-slate-500">
                                {index + 1}/{questions.length}
                              </span>
                              {question.required && (
                                <Badge variant="outline" className="text-xs">
                                  Required
                                </Badge>
                              )}
                            </div>
                            <p className="text-slate-800 mb-3">{question.text}</p>
                            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto">
                              <Mic className="w-5 h-5 text-purple-600" />
                            </div>
                          </div>
                        ))}
                        {questions.length > 2 && (
                          <p className="text-center text-slate-500 text-sm">
                            ... and {questions.length - 2} more questions
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(3)}>
                  Back to Edit
                </Button>
                <Button
                  onClick={handlePublish}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  <Share className="w-4 h-4 mr-2" />
                  Publish Form
                </Button>
              </div>
            </div>
          )}

          {/* Published Success */}
          {publishedLink && (
            <Card>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Share className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-800">Your form is live!</CardTitle>
                <CardDescription>Share the link below to start collecting voice responses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-slate-50 p-4 rounded-lg">
                  <Label className="text-sm font-medium text-slate-700 mb-2 block">Share this link:</Label>
                  <div className="flex items-center space-x-2">
                    <Input value={publishedLink} readOnly className="bg-white" />
                    <Button variant="outline" onClick={() => navigator.clipboard.writeText(publishedLink)}>
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <Link href="/dashboard">
                    <Button variant="outline">Back to Dashboard</Button>
                  </Link>
                  <Link href={`/form/${publishedLink.split("/").pop()}`}>
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <Eye className="w-4 h-4 mr-2" />
                      View Live Form
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
