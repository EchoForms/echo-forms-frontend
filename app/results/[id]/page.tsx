"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, ArrowLeft, Download, Share, Play, Calendar, Users, Clock, TrendingUp, MessageSquare, Search, Pause, Globe, LinkIcon, Check } from 'lucide-react'
import Link from "next/link"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from "recharts"
import { fetchFormResults, fetchFormResponses } from "@/lib/api/forms"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"

// Mock data for results
const mockResults = {
  id: "1",
  title: "Customer Satisfaction Survey",
  totalResponses: 132,
  avgResponseLength: "18 sec",
  completionRate: 76,
  sentimentScore: 0.23,
  language: "English",
  createdOn: "Dec 15, 2024",
  
  // AI Insights
  aiInsights: [
    { summary: "Users found setup confusing", percentage: 37, description: "Multiple users mentioned difficulty with initial setup process" },
    { summary: "Pricing concerns raised frequently", percentage: 29, description: "Cost-related feedback appeared in many responses" },
    { summary: "Excellent customer support praised", percentage: 24, description: "Support team received positive mentions" },
    { summary: "Mobile app needs improvement", percentage: 18, description: "App functionality issues were commonly reported" },
  ],

  // Sentiment data
  sentimentData: [
    { name: "Positive", value: 58, color: "#10b981", keywords: ["great", "excellent", "love", "amazing"] },
    { name: "Neutral", value: 32, color: "#6b7280", keywords: ["okay", "fine", "average", "decent"] },
    { name: "Negative", value: 10, color: "#ef4444", keywords: ["bad", "terrible", "hate", "awful"] },
  ],

  // Questions and responses
  questions: [
    {
      id: "q1",
      text: "How would you rate your overall experience?",
      responses: [
        {
          id: "r1",
          transcript: "I absolutely love the product! The interface is intuitive and the customer service has been exceptional...",
          duration: "1:23",
          sentiment: "positive"
        },
        {
          id: "r2", 
          transcript: "It's been pretty good overall. There are a few areas that could use improvement but I'm satisfied...",
          duration: "0:45",
          sentiment: "neutral"
        },
        {
          id: "r3",
          transcript: "The experience has been fantastic. I've recommended it to several colleagues already...",
          duration: "0:52",
          sentiment: "positive"
        }
      ]
    },
    {
      id: "q2",
      text: "What features do you find most valuable?",
      responses: [
        {
          id: "r4",
          transcript: "The analytics dashboard is incredibly helpful. I can see all the data I need at a glance...",
          duration: "1:15",
          sentiment: "positive"
        },
        {
          id: "r5",
          transcript: "I really appreciate the mobile app. Being able to access everything on the go is great...",
          duration: "0:38",
          sentiment: "positive"
        }
      ]
    },
    {
      id: "q3",
      text: "What could we improve?",
      responses: [
        {
          id: "r6",
          transcript: "The pricing could be more competitive. I think you're a bit expensive compared to alternatives...",
          duration: "1:02",
          sentiment: "neutral"
        }
      ]
    }
  ],

  // Top issues
  topIssues: [
    { category: "Pricing", percentage: 37 },
    { category: "Setup", percentage: 29 },
    { category: "UX", percentage: 24 },
    { category: "Performance", percentage: 18 },
    { category: "Support", percentage: 12 },
  ],

  // Question completion funnel
  completionFunnel: [
    { question: "Q1", responses: 132, percentage: 100 },
    { question: "Q2", responses: 118, percentage: 89 },
    { question: "Q3", responses: 95, percentage: 72 },
    { question: "Q4", responses: 78, percentage: 59 },
    { question: "Q5", responses: 65, percentage: 49 },
  ],

  // Question-wise breakdown
  questionBreakdown: [
    {
      question: "Q1: Overall Experience",
      data: [
        { category: "Excellent", value: 45, color: "#10b981" },
        { category: "Good", value: 35, color: "#3b82f6" },
        { category: "Average", value: 15, color: "#f59e0b" },
        { category: "Poor", value: 5, color: "#ef4444" },
      ]
    },
    {
      question: "Q2: Feature Value",
      data: [
        { category: "Very Valuable", value: 52, color: "#10b981" },
        { category: "Somewhat Valuable", value: 28, color: "#3b82f6" },
        { category: "Not Very Valuable", value: 15, color: "#f59e0b" },
        { category: "Not Valuable", value: 5, color: "#ef4444" },
      ]
    }
  ],

  // Response heatmap
  responseHeatmap: [
    { day: "Mon", morning: 8, afternoon: 15, evening: 12, night: 3 },
    { day: "Tue", morning: 12, afternoon: 18, evening: 14, night: 4 },
    { day: "Wed", morning: 10, afternoon: 22, evening: 16, night: 2 },
    { day: "Thu", morning: 14, afternoon: 20, evening: 18, night: 5 },
    { day: "Fri", morning: 16, afternoon: 25, evening: 15, night: 6 },
    { day: "Sat", morning: 6, afternoon: 12, evening: 20, night: 8 },
    { day: "Sun", morning: 4, afternoon: 8, evening: 18, night: 10 },
  ],

  // Individual responses for Tab 2
  individualResponses: [
    {
      id: "user1",
      name: "User #12",
      responses: [
        {
          questionId: "q1",
          questionText: "How would you rate your overall experience?",
          transcript: "I absolutely love the product! The interface is intuitive and the customer service has been exceptional. I've been using it for 3 months now and it's exceeded my expectations.",
          duration: "1:23",
          sentiment: "positive"
        },
        {
          questionId: "q2",
          questionText: "What features do you find most valuable?",
          transcript: "The analytics dashboard is incredibly helpful. I can see all the data I need at a glance and the reporting features save me hours of work.",
          duration: "1:15",
          sentiment: "positive"
        }
      ]
    },
    {
      id: "user2",
      name: "User #34",
      responses: [
        {
          questionId: "q1",
          questionText: "How would you rate your overall experience?",
          transcript: "It's been pretty good overall. There are a few areas that could use improvement but I'm generally satisfied with the service.",
          duration: "0:45",
          sentiment: "neutral"
        },
        {
          questionId: "q3",
          questionText: "What could we improve?",
          transcript: "The pricing could be more competitive. I think you're a bit expensive compared to alternatives in the market.",
          duration: "1:02",
          sentiment: "neutral"
        }
      ]
    },
    {
      id: "user3",
      name: "User #56",
      responses: [
        {
          questionId: "q1",
          questionText: "How would you rate your overall experience?",
          transcript: "The experience has been fantastic. I've recommended it to several colleagues already and they're all impressed with the results.",
          duration: "0:52",
          sentiment: "positive"
        },
        {
          questionId: "q2",
          questionText: "What features do you find most valuable?",
          transcript: "I really appreciate the mobile app. Being able to access everything on the go is great for my workflow.",
          duration: "0:38",
          sentiment: "positive"
        }
      ]
    }
  ]
}

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  
  const [selectedQuestion, setSelectedQuestion] = useState<string>("all")
  const [searchKeyword, setSearchKeyword] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<any>(null)
  const [copiedLink, setCopiedLink] = useState(false)
  const responsesPerPage = 5
  
  // Real data state
  const [formResults, setFormResults] = useState<any>(null)
  const [formResponses, setFormResponses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // Fetch form results on component mount
  useEffect(() => {
    const loadFormData = async () => {
      try {
        setLoading(true)
        const results = await fetchFormResults(Number(id))
        setFormResults(results)
        
        // Load initial responses
        const responses = await fetchFormResponses(Number(id), 1, responsesPerPage)
        setFormResponses(responses.responses)
        setPagination(responses.pagination)
      } catch (error) {
        console.error('Failed to load form data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadFormData()
  }, [id])
  
  // Load responses when filters change
  const loadResponses = async (page: number = 1) => {
    try {
      const responses = await fetchFormResponses(
        Number(id), 
        page, 
        responsesPerPage, 
        selectedQuestion, 
        searchKeyword
      )
      setFormResponses(responses.responses)
      setPagination(responses.pagination)
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to load responses:', error)
    }
  }
  
  // Handle search and filter changes
  useEffect(() => {
    loadResponses(1)
  }, [selectedQuestion, searchKeyword])

  const getHeatmapColor = (value: number) => {
    const intensity = Math.min(value / 25, 1)
    return `rgba(139, 92, 246, ${intensity})`
  }

  // Filter individual responses based on question and search
  const filteredResponses = mockResults.individualResponses.filter(user => {
    const matchesQuestion = selectedQuestion === "all" || 
      user.responses.some(response => response.questionId === selectedQuestion)
    
    const matchesSearch = searchKeyword === "" ||
      user.responses.some(response => 
        response.transcript.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    
    return matchesQuestion && matchesSearch
  })

  // Pagination
  const totalPages = Math.ceil(filteredResponses.length / responsesPerPage)
  const startIndex = (currentPage - 1) * responsesPerPage
  const paginatedResponses = filteredResponses.slice(startIndex, startIndex + responsesPerPage)

  return (
    <div className="min-h-screen bg-white">
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
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
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
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">Loading form results...</p>
            </div>
          ) : (
            <>
              {/* Page Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-500 text-slate-800 mb-2">
                      {formResults?.title || "Form Results"}
                    </h1>
                    <div className="flex items-center space-x-6 text-sm text-slate-600">
                      <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-1 " />
                        {formResults?.language || "No Language Specified"}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formResults?.created_at ? new Date(formResults.created_at).toLocaleString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : "No date"}
                      </div>
                    </div>
                  </div>
                  
                  {/* Form Link - Right Side */}
                  {formResults?.form_unique_id && (
                    <div className="flex items-center gap-2 bg-slate-100 rounded-full px-3 py-1 border border-slate-200 min-w-[220px] w-fit">
                      <LinkIcon className="w-4 h-4 text-blue-500 mr-1" />
                      <a
                        href={`/forms/${formResults.form_unique_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-poppins tracking-wide font-medium text-green-700 hover:underline focus:underline outline-none transition-colors cursor-pointer flex-1"
                        style={{ wordBreak: 'break-all' }}
                      >
                        {typeof window !== 'undefined' ? `${window.location.host}/forms/${formResults.form_unique_id}` : `/forms/${formResults.form_unique_id}`}
                      </a>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="p-1 cursor-pointer flex items-center" 
                        style={{marginLeft: 0}} 
                        onClick={() => {
                          const formUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/forms/${formResults.form_unique_id}`;
                          navigator.clipboard.writeText(formUrl).then(() => {
                            setCopiedLink(true);
                            setTimeout(() => setCopiedLink(false), 2000);
                          }).catch(err => {
                            console.error('Failed to copy:', err);
                            // Fallback for older browsers
                            const textArea = document.createElement('textarea');
                            textArea.value = formUrl;
                            document.body.appendChild(textArea);
                            textArea.select();
                            document.execCommand('copy');
                            document.body.removeChild(textArea);
                            setCopiedLink(true);
                            setTimeout(() => setCopiedLink(false), 2000);
                          });
                        }}
                      >
                        {copiedLink ? (
                          <>
                            <Check className="w-4 h-4 text-green-600 mr-1" />
                          </>
                        ) : (
                          "Copy"
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

          {/* Top Summary Cards (Real Data) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="border border-slate-400 shadow-none rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-400 text-slate-600">Total Responses</p>
                    <p className="text-3xl font-500 text-slate-800 mt-4">
                      {loading ? "..." : formResults?.total_responses || 0}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-400 shadow-none rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-400 text-slate-600">Avg. Response Length</p>
                    <p className="text-3xl font-500 text-slate-800 mt-4">
                      {loading ? "..." : `${formResults?.avg_response_time || 0}s`}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-400 shadow-none rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-400 text-slate-600">Completion Rate</p>
                    <p className="text-3xl font-500 text-slate-800 mt-4">
                      {loading ? "..." : `${formResults?.completion_rate || 0}%`}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <Progress value={formResults?.completion_rate || 0} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="border border-slate-400 shadow-none rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-400 text-slate-600">Questions</p>
                    <p className="text-3xl font-500 text-slate-800 mt-4">
                      {loading ? "..." : formResults?.question_breakdown?.length || 0}
                    </p>
                    <p className="text-xs text-slate-500">Total questions</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabbed Analytics Section */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="overview" className="text-sm font-400 text-slate-800">Overview</TabsTrigger>
              <TabsTrigger value="individual" className="text-sm font-400 text-slate-800">Individual Responses</TabsTrigger>
            </TabsList>

            {/* Tab 1: Overview */}
            <TabsContent value="overview" className="space-y-8">
              {/* AI Insights Section */}
              <Card className="border border-slate-400 shadow-none rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-400 text-slate-800">AI Insights</CardTitle>
                  <CardDescription>Most common themes identified from voice responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockResults.aiInsights.map((insight, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-400">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-400 text-blue-600">{index + 1}</span>
                            </div>
                            <h4 className="font-400 text-slate-800">{insight.summary}</h4>
                            <Badge variant="outline" className="text-xs">
                              {insight.percentage}%
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 ml-9">{insight.description}</p>
                          <div className="ml-9 mt-2">
                            <Progress value={insight.percentage} className="h-2" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sentiment Breakdown */}
                <Card className="border border-slate-400 shadow-none rounded-lg">
                  <CardHeader>
                    <CardTitle>Sentiment Breakdown</CardTitle>
                    <CardDescription>Overall sentiment analysis of responses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={mockResults.sentimentData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {mockResults.sentimentData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name, props) => [
                              `${value}%`, 
                              `${props.payload.name} (Keywords: ${props.payload.keywords.join(', ')})`
                            ]} 
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center space-x-6 mt-4">
                      {mockResults.sentimentData.map((item) => (
                        <div key={item.name} className="flex items-center space-x-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          <span className="text-sm text-slate-600">
                            {item.name}: {item.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Top Issues */}
                <Card className="border border-slate-400 shadow-none rounded-lg">
                  <CardHeader>
                    <CardTitle>Top Issues</CardTitle>
                    <CardDescription>Most frequently mentioned concerns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={mockResults.topIssues} layout="horizontal">
                          <XAxis type="number" />
                          <YAxis dataKey="category" type="category" width={80} />
                          <Tooltip formatter={(value) => [`${value}%`, "Mentioned by"]} />
                          <Bar dataKey="percentage" fill="#ef4444" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Responses Section */}
              <Card className="border border-slate-400 shadow-none rounded-lg">
                <CardHeader>
                  <CardTitle>Top Responses</CardTitle>
                  <CardDescription>Featured voice responses for each question</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockResults.questions.map((question) => (
                      <div key={question.id} className="border border-slate-400 rounded-lg p-4">
                        <h4 className="font-medium text-slate-800 mb-4">{question.text}</h4>
                        <div className="space-y-3">
                          {question.responses.slice(0, 3).map((response) => (
                            <div key={response.id} className="bg-white rounded-lg p-4 border border-slate-400">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                                    <Play className="w-3 h-3" />
                                  </Button>
                                  <Badge
                                    variant={response.sentiment === "positive" ? "default" : response.sentiment === "negative" ? "destructive" : "secondary"}
                                    className={
                                      response.sentiment === "positive"
                                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                                        : response.sentiment === "negative"
                                          ? "bg-red-100 text-red-800 hover:bg-red-100"
                                          : "bg-slate-100 text-slate-800 hover:bg-slate-100"
                                    }
                                  >
                                    {response.sentiment}
                                  </Badge>
                                  <span className="text-sm text-slate-500">{response.duration}</span>
                                </div>
                              </div>
                              <p className="text-sm text-slate-700 italic">"{response.transcript}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Question Completion Chart */}
              <Card className="border border-slate-400 shadow-none rounded-lg">
                <CardHeader>
                  <CardTitle>Question Completion Chart</CardTitle>
                  <CardDescription>Response drop-off across questions</CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-slate-500">Loading completion data...</div>
                    </div>
                  ) : formResults?.completion_funnel?.length > 0 ? (
                    <>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={formResults.completion_funnel}>
                            <XAxis dataKey="question" />
                            <YAxis />
                            <Tooltip formatter={(value) => [value, "Responses"]} />
                            <Line 
                              type="monotone" 
                              dataKey="responses" 
                              stroke="#8b5cf6" 
                              strokeWidth={3}
                              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="mt-4 flex justify-center space-x-8">
                        {formResults.completion_funnel.map((item: any) => (
                          <div key={item.question} className="text-center">
                            <div className="text-lg font-semibold text-slate-800">{item.responses}</div>
                            <div className="text-sm text-slate-600">{item.question}</div>
                            <div className="text-xs text-slate-500">{item.percentage}%</div>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="h-64 flex items-center justify-center">
                      <div className="text-slate-500">No completion data available</div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Question-wise Response Breakdown */}
              <Card className="border border-slate-400 shadow-none rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-200 text-slate-800">Question-wise Response Breakdown</CardTitle>
                  <CardDescription>Response distribution for each question</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {mockResults.questionBreakdown.map((question, index) => (
                      <div key={index}>
                        <h4 className="font-medium text-slate-800 mb-4">{question.question}</h4>
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={question.data}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="value"
                              >
                                {question.data.map((entry, idx) => (
                                  <Cell key={`cell-${idx}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip formatter={(value) => [`${value}%`, "Responses"]} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {question.data.map((item) => (
                            <div key={item.category} className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                              <span className="text-xs text-slate-600">
                                {item.category}: {item.value}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Response Heatmap */}
              <Card className="border border-slate-400 shadow-none rounded-lg">
                <CardHeader>
                  <CardTitle>Response Heatmap</CardTitle>
                  <CardDescription>Daily submission activity by time of day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <div className="min-w-[600px]">
                      <div className="grid grid-cols-5 gap-1 mb-2">
                        <div></div>
                        {['Morning', 'Afternoon', 'Evening', 'Night'].map(time => (
                          <div key={time} className="text-center text-xs font-medium text-slate-600">
                            {time}
                          </div>
                        ))}
                      </div>
                      {mockResults.responseHeatmap.map((day) => (
                        <div key={day.day} className="grid grid-cols-5 gap-1 mb-1">
                          <div className="text-xs font-medium text-slate-600 flex items-center">
                            {day.day}
                          </div>
                          <div 
                            className="h-8 rounded flex items-center justify-center text-xs font-medium text-white"
                            style={{ backgroundColor: getHeatmapColor(day.morning) }}
                          >
                            {day.morning}
                          </div>
                          <div 
                            className="h-8 rounded flex items-center justify-center text-xs font-medium text-white"
                            style={{ backgroundColor: getHeatmapColor(day.afternoon) }}
                          >
                            {day.afternoon}
                          </div>
                          <div 
                            className="h-8 rounded flex items-center justify-center text-xs font-medium text-white"
                            style={{ backgroundColor: getHeatmapColor(day.evening) }}
                          >
                            {day.evening}
                          </div>
                          <div 
                            className="h-8 rounded flex items-center justify-center text-xs font-medium text-white"
                            style={{ backgroundColor: getHeatmapColor(day.night) }}
                          >
                            {day.night}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-center mt-4 space-x-2">
                      <span className="text-xs text-slate-600">Less</span>
                      <div className="flex space-x-1">
                        {[0.2, 0.4, 0.6, 0.8, 1].map(opacity => (
                          <div 
                            key={opacity}
                            className="w-3 h-3 rounded"
                            style={{ backgroundColor: `rgba(139, 92, 246, ${opacity})` }}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-600">More</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 2: Individual Responses */}
            <TabsContent value="individual" className="space-y-6">
              {/* Filters */}
              <Card className="border border-slate-400 shadow-none rounded-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          placeholder="Search keywords in responses..."
                          value={searchKeyword}
                          onChange={(e) => setSearchKeyword(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-64">
                      <Select value={selectedQuestion} onValueChange={setSelectedQuestion}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select question" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Questions</SelectItem>
                          {formResults?.question_breakdown?.map((question: any) => (
                            <SelectItem key={question.question_id} value={question.question_id.toString()}>
                              {question.question_text.substring(0, 50)}...
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Response Cards */}
              <div className="space-y-6">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="text-slate-500">Loading responses...</div>
                  </div>
                ) : formResponses.length > 0 ? (
                  formResponses.map((user) => (
                    <Card key={user.response_id} className="border border-slate-400 shadow-none rounded-lg">
                      <CardHeader>
                        <CardTitle className="text-lg">{user.user_id}</CardTitle>
                        <CardDescription>{user.responses.length} responses</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {user.responses.map((response: any, index: number) => (
                            <div key={index} className="border border-slate-400 rounded-lg p-4">
                              <div className="mb-3">
                                <h4 className="font-400 text-slate-800 mb-2">{response.question_text}</h4>
                                <div className="flex w-1/2 items-center space-x-3 mb-3 mt-3">
                                  {response.voice_file ? (
                                    <AudioPlayer
                                      src={response.voice_file}
                                      layout="horizontal-reverse"
                                      defaultDuration={response.duration}
                                      showSkipControls={false}
                                      showJumpControls={false}
                                      showFilledVolume={true}
                                      className="custom-audio-player"
                                    />
                                  ) : (
                                    <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
                                      <Mic className="w-3 h-3 text-slate-400" />
                                    </div>
                                  )}
                                  <Badge
                                    variant={response.sentiment === "positive" ? "default" : response.sentiment === "negative" ? "destructive" : "secondary"}
                                    className={
                                      response.sentiment === "positive"
                                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                                        : response.sentiment === "negative"
                                          ? "bg-red-100 text-red-800 hover:bg-green-100"
                                          : "bg-slate-100 text-slate-800 hover:bg-slate-100"
                                    }
                                  >
                                    {response.sentiment}
                                  </Badge>
                                  <span className="text-sm text-slate-500">{response.duration}</span>
                                </div>
                              </div>
                              <div className="bg-white rounded-lg p-3 border border-slate-400">
                                <p className="text-sm text-slate-700 italic">"{response.transcript}"</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="text-slate-500">No responses found</div>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {pagination && pagination.pages > 1 && (
                <div className="flex justify-center items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => loadResponses(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-slate-600">
                    Page {currentPage} of {pagination.pages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => loadResponses(currentPage + 1)}
                    disabled={currentPage === pagination.pages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
            </>
          )}
        </div>
      </main>
      <footer className="p-4 text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Mic className="w-3 h-3 text-white" />
          </div>
          <span className="font-semibold text-slate-800">EchoForm</span>
        </div>
        <p className="text-xs text-slate-500">
          The fastest way to collect voice-based insights through smart forms.
        </p>
      </footer>
    </div>
  )
}
