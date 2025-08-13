"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, ArrowLeft, Download, Share, Play, Calendar, Users, Clock, TrendingUp, MessageSquare, Search } from 'lucide-react'
import Link from "next/link"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from "recharts"

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

export default function ResultsPage({ params }: { params: { id: string } }) {
  const [selectedQuestion, setSelectedQuestion] = useState<string>("all")
  const [searchKeyword, setSearchKeyword] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const responsesPerPage = 5

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
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{mockResults.title}</h1>
            <div className="flex items-center space-x-6 text-sm text-slate-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Created {mockResults.createdOn}
              </div>
              <Badge variant="secondary">{mockResults.language}</Badge>
            </div>
          </div>

          {/* Top Summary Cards (Fixed) */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Responses</p>
                    <p className="text-3xl font-bold text-slate-800">{mockResults.totalResponses}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Avg. Response Length</p>
                    <p className="text-3xl font-bold text-slate-800">{mockResults.avgResponseLength}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Completion Rate</p>
                    <p className="text-3xl font-bold text-slate-800">{mockResults.completionRate}%</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <Progress value={mockResults.completionRate} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Sentiment Score</p>
                    <p className="text-3xl font-bold text-green-600">+{mockResults.sentimentScore}</p>
                    <p className="text-xs text-slate-500">Positive trend</p>
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
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="individual">Individual Responses</TabsTrigger>
            </TabsList>

            {/* Tab 1: Overview */}
            <TabsContent value="overview" className="space-y-8">
              {/* AI Insights Section */}
              <Card>
                <CardHeader>
                  <CardTitle>AI Insights</CardTitle>
                  <CardDescription>Most common themes identified from voice responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockResults.aiInsights.map((insight, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                            </div>
                            <h4 className="font-medium text-slate-800">{insight.summary}</h4>
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
                <Card>
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
                <Card>
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
              <Card>
                <CardHeader>
                  <CardTitle>Top Responses</CardTitle>
                  <CardDescription>Featured voice responses for each question</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockResults.questions.map((question) => (
                      <div key={question.id} className="border border-slate-200 rounded-lg p-4">
                        <h4 className="font-medium text-slate-800 mb-4">{question.text}</h4>
                        <div className="space-y-3">
                          {question.responses.slice(0, 3).map((response) => (
                            <div key={response.id} className="bg-slate-50 rounded-lg p-4">
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
              <Card>
                <CardHeader>
                  <CardTitle>Question Completion Chart</CardTitle>
                  <CardDescription>Response drop-off across questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockResults.completionFunnel}>
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
                    {mockResults.completionFunnel.map((item) => (
                      <div key={item.question} className="text-center">
                        <div className="text-lg font-semibold text-slate-800">{item.responses}</div>
                        <div className="text-sm text-slate-600">{item.question}</div>
                        <div className="text-xs text-slate-500">{item.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Question-wise Response Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Question-wise Response Breakdown</CardTitle>
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
              <Card>
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
              <Card>
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
                          {mockResults.questions.map((question) => (
                            <SelectItem key={question.id} value={question.id}>
                              {question.text.substring(0, 50)}...
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
                {paginatedResponses.map((user) => (
                  <Card key={user.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <CardDescription>{user.responses.length} responses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {user.responses
                          .filter(response => selectedQuestion === "all" || response.questionId === selectedQuestion)
                          .map((response, index) => (
                          <div key={index} className="border border-slate-200 rounded-lg p-4">
                            <div className="mb-3">
                              <h4 className="font-medium text-slate-800 mb-2">{response.questionText}</h4>
                              <div className="flex items-center space-x-3 mb-3">
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
                            <div className="bg-slate-50 rounded-lg p-3">
                              <p className="text-sm text-slate-700 italic">"{response.transcript}"</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-slate-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
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
