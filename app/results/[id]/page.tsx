"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, ArrowLeft, Play, Calendar, Users, Clock, TrendingUp, MessageSquare, Search, Pause, Globe, LinkIcon, Check } from 'lucide-react'
import Link from "next/link"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, LineChart, Line, ResponsiveContainer, Tooltip } from '@/components/ui/chart'
import { fetchFormResults, fetchFormResponses, fetchFormAnalytics } from "@/lib/api/forms"
import AudioPlayer from "react-h5-audio-player"
import "react-h5-audio-player/lib/styles.css"

// Mock data for results - COMMENTED OUT, using real analytics data
/* const mockResults = {
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
} */

// Helper function to convert language codes to full language names
const getLanguageName = (code: string) => {
  const languageMap: { [key: string]: string } = {
    'en': 'English',
    'hi': 'Hindi',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'zh': 'Chinese',
    'ar': 'Arabic',
    'bn': 'Bengali',
    'ta': 'Tamil',
    'te': 'Telugu',
    'ml': 'Malayalam',
    'kn': 'Kannada',
    'gu': 'Gujarati',
    'pa': 'Punjabi',
    'or': 'Odia',
    'as': 'Assamese',
    'ne': 'Nepali',
    'ur': 'Urdu'
  };
  return languageMap[code] || code.toUpperCase();
};

export default function ResultsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params) as { id: string };
  
  const [selectedQuestion, setSelectedQuestion] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [pagination, setPagination] = useState<any>(null)
  const [copiedLink, setCopiedLink] = useState(false)
  const responsesPerPage = 5
  
  // Real data state
  const [formResults, setFormResults] = useState<any>(null)
  const [formResponses, setFormResponses] = useState<any[]>([])
  const [allFormResponses, setAllFormResponses] = useState<any[]>([]) // All responses for analytics
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // Fetch form results on component mount
  useEffect(() => {
    const loadFormData = async () => {
      try {
        setLoading(true)
        
        // Add timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 10000)
        )
        
        const resultsPromise = fetchFormResults(Number(id))
        const results = await Promise.race([resultsPromise, timeoutPromise])
        
        setFormResults(results)
        
        // Analytics data is included in formResults.analytics
        setAnalytics(results.analytics || null)
        
        // Load ALL responses for analytics (no pagination)
        const allResponses = await fetchFormResponses(Number(id), 1, 10000) // Large number to get all
        setAllFormResponses(allResponses.responses)
        
        // Load initial paginated responses for display
        const responses = await fetchFormResponses(Number(id), 1, responsesPerPage)
        setFormResponses(responses.responses)
        setPagination(responses.pagination)
      } catch (error) {
        console.error('Failed to load form data:', error)
        // Set some default values to prevent infinite loading
        setFormResults(null)
        setAnalytics(null)
        setFormResponses([])
        setPagination(null)
      } finally {
        setLoading(false)
      }
    }
    
    if (id) {
    loadFormData()
    }
  }, [id, responsesPerPage])
  
  // Load responses with server-side filtering
  const loadResponses = async (page: number = 1) => {
    try {
      const responses = await fetchFormResponses(
        Number(id), 
        page, 
        responsesPerPage, 
        selectedQuestion === "all" ? undefined : selectedQuestion
      )
      setFormResponses(responses.responses)
      setPagination(responses.pagination)
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to load responses:', error)
    }
  }
  
  // Handle filter changes
  useEffect(() => {
    loadResponses(1)
  }, [selectedQuestion])

  const getHeatmapColor = (value: number) => {
    if (value === 0) return '#f8fafc' // Very light gray for no activity
    const intensity = Math.min(value / 10, 1)
    const alpha = 0.2 + (intensity * 0.8) // Range from 0.2 to 1.0
    return `rgba(139, 92, 246, ${alpha})`
  }

  // Use server-side filtered responses directly
  const paginatedResponses = formResponses

  // Calculate language distribution from all responses
  const calculateLanguageDistribution = () => {
    if (!allFormResponses || allFormResponses.length === 0) return []
    
    const languageCount: { [key: string]: number } = {}
    
    allFormResponses.forEach((user: any) => {
      user.responses.forEach((response: any) => {
        const lang = response.language || 'en'
        languageCount[lang] = (languageCount[lang] || 0) + 1
      })
    })
    
    return Object.entries(languageCount).map(([lang, count]) => ({
      name: getLanguageName(lang),
      value: count,
      language: lang
    })).sort((a, b) => b.value - a.value)
  }

  const languageDistribution = calculateLanguageDistribution()

  // Calculate language-sentiment breakdown
  const calculateLanguageSentimentBreakdown = () => {
    if (!allFormResponses || allFormResponses.length === 0) return []
    
    const languageSentimentCount: { [key: string]: { [key: string]: number } } = {}
    
    allFormResponses.forEach((user: any) => {
      user.responses.forEach((response: any) => {
        const lang = response.language || 'en'
        const sentiment = response.sentiment || 'neutral'
        
        if (!languageSentimentCount[lang]) {
          languageSentimentCount[lang] = { positive: 0, neutral: 0, negative: 0 }
        }
        languageSentimentCount[lang][sentiment] = (languageSentimentCount[lang][sentiment] || 0) + 1
      })
    })
    
    return Object.entries(languageSentimentCount).map(([lang, sentiments]) => ({
      language: getLanguageName(lang),
      languageCode: lang,
      positive: sentiments.positive || 0,
      neutral: sentiments.neutral || 0,
      negative: sentiments.negative || 0,
      total: (sentiments.positive || 0) + (sentiments.neutral || 0) + (sentiments.negative || 0)
    })).sort((a, b) => b.total - a.total)
  }

  const languageSentimentBreakdown = calculateLanguageSentimentBreakdown()

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
          ) : !formResults ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No data available</h3>
              <p className="text-gray-500">Unable to load form results. Please try again later.</p>
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
                    {analytics?.categories?.length > 0 ? (
                      (() => {
                        // Sort categories by percentage (descending) and take top 4
                        const sortedCategories = [...analytics.categories].sort((a, b) => b.percentage - a.percentage);
                        const topCategories = sortedCategories.slice(0, 4);
                        const otherCategories = sortedCategories.slice(4);
                        
                        // Calculate "Others" percentage
                        const othersPercentage = otherCategories.reduce((sum, cat) => sum + cat.percentage, 0);
                        
                        return (
                          <>
                            {topCategories.map((category: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-400">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-400 text-blue-600">{index + 1}</span>
                            </div>
                                    <h4 className="font-400 text-slate-800">{category.category_name}</h4>
                            <Badge variant="outline" className="text-xs">
                                      {category.percentage}%
                            </Badge>
                          </div>
                                  <p className="text-sm text-slate-600 ml-9">{category.summary_text}</p>
                          <div className="ml-9 mt-2">
                                    <Progress value={category.percentage} className="h-2 [&>div]:bg-purple-500" />
                          </div>
                        </div>
                      </div>
                    ))}
                            
                            {/* Show "Others" category if there are more than 4 categories */}
                            {otherCategories.length > 0 && (
                              <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-400">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                      <span className="text-xs font-400 text-gray-600">+</span>
                                    </div>
                                    <h4 className="font-400 text-slate-800">Others</h4>
                                    <Badge variant="outline" className="text-xs">
                                      {othersPercentage.toFixed(1)}%
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-slate-600 ml-9">
                                    {otherCategories.length} additional category{otherCategories.length !== 1 ? 'ies' : ''} with smaller percentages
                                  </p>
                                  <div className="ml-9 mt-2">
                                    <Progress value={othersPercentage} className="h-2 [&>div]:bg-purple-500" />
                                  </div>
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })()
                    ) : (
                      <div className="text-center py-8 text-slate-500">
                        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                        <p>No analytics data available yet.</p>
                        <p className="text-sm mt-2">Submit some voice responses to see AI-generated insights!</p>
                      </div>
                    )}
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
                    {analytics?.sentiment_distribution ? (
                      <ChartContainer
                        config={{
                          positive: {
                            label: "Positive",
                            color: "#10b981",
                          },
                          neutral: {
                            label: "Neutral", 
                            color: "#6b7280",
                          },
                          negative: {
                            label: "Negative",
                            color: "#ef4444",
                          },
                        }}
                        className="h-64 w-full"
                      >
                        <PieChart>
                          <Pie
                            data={[
                              { name: "positive", value: analytics.sentiment_distribution.positive },
                              { name: "neutral", value: analytics.sentiment_distribution.neutral },
                              { name: "negative", value: analytics.sentiment_distribution.negative }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                          >
                            {[
                              { name: "positive", value: analytics.sentiment_distribution.positive },
                              { name: "neutral", value: analytics.sentiment_distribution.neutral },
                              { name: "negative", value: analytics.sentiment_distribution.negative }
                            ].map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={
                                  entry.name === "positive" ? "#10b981" :
                                  entry.name === "neutral" ? "#6b7280" :
                                  "#ef4444"
                                }
                                style={{
                                  cursor: 'pointer',
                                  transition: 'opacity 0.2s ease-in-out'
                                }}
                                onMouseEnter={(e) => {
                                  if (e.target && 'style' in e.target) {
                                    (e.target as any).style.opacity = 0.8;
                                  }
                                }}
                                onMouseLeave={(e) => {
                                  if (e.target && 'style' in e.target) {
                                    (e.target as any).style.opacity = 1;
                                  }
                                }}
                              />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <ChartLegend content={<ChartLegendContent />} />
                        </PieChart>
                      </ChartContainer>
                    ) : (
                      <div className="flex items-center justify-center h-64 text-slate-500">
                        <div className="text-center">
                          <MessageSquare className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                          <p>No sentiment data available</p>
                    </div>
                      </div>
                    )}
                    <div className="flex justify-center space-x-6 mt-4">
                      {analytics?.sentiment_distribution ? (
                        <>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="text-sm text-slate-600">Positive ({analytics.sentiment_distribution.positive})</span>
                        </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-gray-500" />
                            <span className="text-sm text-slate-600">Neutral ({analytics.sentiment_distribution.neutral})</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="text-sm text-slate-600">Negative ({analytics.sentiment_distribution.negative})</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-center text-slate-500">
                          <p>No sentiment data available</p>
                        </div>
                      )}
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
                    {analytics?.categories?.length > 0 ? (
                      <ChartContainer
                        config={{
                          responses: {
                            label: "Responses",
                            color: "#ef4444",
                          },
                        }}
                        className="h-80 w-full"
                      >
                        <BarChart 
                          data={analytics.categories
                            .sort((a: any, b: any) => b.response_count - a.response_count)
                            .slice(0, 5)
                            .map((cat: any, index: number) => ({
                              name: cat.category_name.length > 20 ? cat.category_name.substring(0, 20) + "..." : cat.category_name,
                              fullName: cat.category_name,
                              responses: cat.response_count,
                              percentage: cat.percentage,
                              index: index
                            }))} 
                          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
                        >
                          <XAxis 
                            dataKey="name"
                            tick={{ fontSize: 10 }}
                            height={50}
                            interval={0}
                          />
                          <YAxis 
                            tick={{ fontSize: 12 }}
                          />
                          <ChartTooltip 
                            content={(props) => {
                              if (!props.active || !props.payload?.length) return null;
                              const data = props.payload[0].payload;
                              return (
                                <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
                                  <p className="font-medium text-slate-900">{data.fullName}</p>
                                  <p className="text-sm text-slate-600">Responses: {data.responses}</p>
                                  <p className="text-sm text-slate-600">Percentage: {data.percentage}%</p>
                                </div>
                              );
                            }}
                          />
                          <Bar 
                              dataKey="responses" 
                            radius={[4, 4, 0, 0]}
                            maxBarSize={60}
                            style={{
                              cursor: 'pointer'
                            }}
                          >
                            {analytics.categories
                              .sort((a: any, b: any) => b.response_count - a.response_count)
                              .slice(0, 5)
                              .map((entry: any, index: number) => (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={
                                    index === 0 ? "#ef4444" :  // Red for #1 (most critical)
                                    index === 1 ? "#f97316" :  // Orange for #2
                                    index === 2 ? "#eab308" :  // Yellow for #3
                                    index === 3 ? "#22c55e" :  // Green for #4
                                    "#3b82f6"  // Blue for #5
                                  }
                                />
                              ))}
                          </Bar>
                        </BarChart>
                      </ChartContainer>
                    ) : (
                      <div className="flex items-center justify-center h-64 text-slate-500">
                        <div className="text-center">
                          <MessageSquare className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                          <p>No analytics data available</p>
                    </div>
                    </div>
                  )}
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Language Distribution */}
              <Card className="border border-slate-400 shadow-none rounded-lg">
                <CardHeader>
                    <CardTitle>Language Distribution</CardTitle>
                    <CardDescription>Languages used in responses</CardDescription>
                </CardHeader>
                <CardContent>
                    {languageDistribution.length > 0 ? (
                      <ChartContainer
                        config={languageDistribution.reduce((config, item, index) => {
                          const colors = [
                            "#8b5cf6", // Purple
                            "#06b6d4", // Cyan
                            "#10b981", // Emerald
                            "#f59e0b", // Amber
                            "#ef4444", // Red
                            "#3b82f6", // Blue
                            "#84cc16", // Lime
                            "#f97316", // Orange
                            "#ec4899", // Pink
                            "#6366f1"  // Indigo
                          ]
                          config[item.language] = {
                            label: item.name,
                            color: colors[index % colors.length]
                          }
                          return config
                        }, {} as any)}
                        className="h-80 w-full"
                      >
                        <PieChart>
                          <Pie
                            data={languageDistribution}
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            dataKey="value"
                            nameKey="name"
                          >
                            {languageDistribution.map((entry, index) => {
                              const colors = [
                                "#8b5cf6", // Purple
                                "#06b6d4", // Cyan
                                "#10b981", // Emerald
                                "#f59e0b", // Amber
                                "#ef4444", // Red
                                "#3b82f6", // Blue
                                "#84cc16", // Lime
                                "#f97316", // Orange
                                "#ec4899", // Pink
                                "#6366f1"  // Indigo
                              ]
                              return (
                                <Cell 
                                  key={`cell-${index}`} 
                                  fill={colors[index % colors.length]}
                                />
                              )
                            })}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <ChartLegend content={<ChartLegendContent />} />
                        </PieChart>
                      </ChartContainer>
                    ) : (
                      <div className="flex items-center justify-center h-80 text-slate-500">
                        <div className="text-center">
                          <MessageSquare className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                          <p>No language data available</p>
                                </div>
                              </div>
                    )}
                </CardContent>
              </Card>

                {/* Language-Sentiment Breakdown */}
              <Card className="border border-slate-400 shadow-none rounded-lg">
                <CardHeader>
                    <CardTitle>Language-Sentiment Analysis</CardTitle>
                    <CardDescription>Sentiment breakdown by language</CardDescription>
                </CardHeader>
                <CardContent>
                    {languageSentimentBreakdown.length > 0 ? (
                      <ChartContainer
                        config={{
                          positive: {
                            label: "Positive",
                            color: "#10b981",
                          },
                          neutral: {
                            label: "Neutral", 
                            color: "#6b7280",
                          },
                          negative: {
                            label: "Negative",
                            color: "#ef4444",
                          },
                        }}
                        className="h-80 w-full"
                      >
                        <BarChart
                          data={languageSentimentBreakdown}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <XAxis 
                            dataKey="language" 
                            tick={{ fontSize: 12 }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                          />
                          <YAxis tick={{ fontSize: 12 }} />
                          <ChartTooltip 
                            content={({ active, payload, label }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                const total = data.positive + data.neutral + data.negative;
                                return (
                                  <div className="bg-white border border-slate-200 rounded-lg shadow-lg p-3">
                                    <p className="font-semibold text-slate-800 mb-2">{label}</p>
                                    <div className="space-y-1">
                                      <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center space-x-2">
                                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                          <span className="text-slate-600">Positive</span>
                      </div>
                                        <span className="font-medium">{data.positive} ({total > 0 ? Math.round((data.positive / total) * 100) : 0}%)</span>
                          </div>
                                      <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center space-x-2">
                                          <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                                          <span className="text-slate-600">Neutral</span>
                      </div>
                                        <span className="font-medium">{data.neutral} ({total > 0 ? Math.round((data.neutral / total) * 100) : 0}%)</span>
                                      </div>
                                      <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center space-x-2">
                                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                          <span className="text-slate-600">Negative</span>
                                        </div>
                                        <span className="font-medium">{data.negative} ({total > 0 ? Math.round((data.negative / total) * 100) : 0}%)</span>
                                      </div>
                                      <div className="border-t border-slate-200 pt-1 mt-2">
                                        <div className="flex items-center justify-between text-sm font-semibold">
                                          <span className="text-slate-700">Total</span>
                                          <span className="text-slate-800">{total}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <ChartLegend content={<ChartLegendContent />} />
                          <Bar dataKey="positive" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} maxBarSize={40} />
                          <Bar dataKey="neutral" stackId="a" fill="#6b7280" radius={[0, 0, 0, 0]} maxBarSize={40} />
                          <Bar dataKey="negative" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
                        </BarChart>
                      </ChartContainer>
                    ) : (
                      <div className="flex items-center justify-center h-80 text-slate-500">
                        <div className="text-center">
                          <MessageSquare className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                          <p>No language-sentiment data available</p>
                        </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              </div>

              {/* Question-wise Response Breakdown */}
              <Card className="border border-slate-400 shadow-none rounded-lg">
                <CardHeader>
                  <CardTitle className="text-lg font-200 text-slate-800">Question-wise Response Breakdown</CardTitle>
                  <CardDescription>Response distribution for each question</CardDescription>
                </CardHeader>
                <CardContent>
                  {formResults?.question_breakdown?.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-3 px-4 font-medium text-slate-700">Question</th>
                            <th className="text-center py-3 px-4 font-medium text-slate-700">Responses</th>
                            <th className="text-center py-3 px-4 font-medium text-slate-700">Completion</th>
                          </tr>
                        </thead>
                        <tbody>
                          {formResults.question_breakdown.map((question: any, index: number) => (
                            <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                              <td className="py-3 px-4">
                                <div className="font-medium text-slate-800">Q{index + 1}</div>
                                <div className="text-sm text-slate-600 mt-1 max-w-md">
                                  {question.question_text.length > 60 
                                    ? question.question_text.substring(0, 60) + "..." 
                                    : question.question_text
                                  }
                        </div>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <div className="text-lg font-semibold text-slate-800">{question.response_count}</div>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <div className="text-sm font-medium text-slate-600">{question.percentage}%</div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                        </div>
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <MessageSquare className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                      <p>No question breakdown data available</p>
                      </div>
                  )}
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
                      {(() => {
                        // Generate heatmap data from actual form responses
                        const generateHeatmapData = () => {
                          const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                          const times = ['morning', 'afternoon', 'evening', 'night'];
                          
                          // Initialize the heatmap data structure
                          const heatmapData = days.map(day => ({
                            day,
                            timeData: times.map(time => ({ time, value: 0, color: '' }))
                          }));
                          
                          // Process actual form responses
                          if (allFormResponses && allFormResponses.length > 0) {
                            console.log('Form responses for heatmap:', allFormResponses.slice(0, 2)); // Debug log
                            allFormResponses.forEach((user: any) => {
                              if (user.start_timestamp) {
                                const responseDate = new Date(user.start_timestamp);
                                const dayOfWeek = responseDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
                                const hour = responseDate.getHours();
                                
                                // Convert to our day format (Monday = 0, Sunday = 6)
                                const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
                                
                                // Determine time period
                                let timeIndex = 0; // morning
                                if (hour >= 6 && hour < 12) timeIndex = 0; // morning (6-11)
                                else if (hour >= 12 && hour < 17) timeIndex = 1; // afternoon (12-16)
                                else if (hour >= 17 && hour < 21) timeIndex = 2; // evening (17-20)
                                else timeIndex = 3; // night (21-5)
                                
                                // Increment the count
                                if (dayIndex >= 0 && dayIndex < 7 && timeIndex >= 0 && timeIndex < 4) {
                                  heatmapData[dayIndex].timeData[timeIndex].value++;
                                }
                              }
                            });
                          }
                          
                          // Add colors to the data
                          heatmapData.forEach(dayData => {
                            dayData.timeData.forEach(timeData => {
                              timeData.color = getHeatmapColor(timeData.value);
                            });
                          });
                          
                          return heatmapData;
                        };

                        const heatmapData = generateHeatmapData();

                        return heatmapData.map((dayData, dayIndex) => (
                          <div key={dayData.day} className="grid grid-cols-5 gap-1 mb-1">
                          <div className="text-xs font-medium text-slate-600 flex items-center">
                              {dayData.day}
                          </div>
                            {dayData.timeData.map((timeData, timeIndex) => (
                              <div 
                                key={`${dayData.day}-${timeData.time}`}
                                className="h-8 rounded flex items-center justify-center text-xs font-medium text-white cursor-pointer hover:opacity-80 transition-opacity"
                                style={{ backgroundColor: timeData.color }}
                                title={`${dayData.day} ${timeData.time}: ${timeData.value} responses`}
                              >
                                {timeData.value > 0 ? timeData.value : ''}
                        </div>
                      ))}
                    </div>
                        ));
                      })()}
                    </div>
                    {(() => {
                      const heatmapData = (() => {
                        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                        const times = ['morning', 'afternoon', 'evening', 'night'];
                        
                        const heatmapData = days.map(day => ({
                          day,
                          timeData: times.map(time => ({ time, value: 0, color: '' }))
                        }));
                        
                        if (allFormResponses && allFormResponses.length > 0) {
                          allFormResponses.forEach((user: any) => {
                            if (user.start_timestamp) {
                              const responseDate = new Date(user.start_timestamp);
                              const dayOfWeek = responseDate.getDay();
                              const hour = responseDate.getHours();
                              
                              const dayIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
                              
                              let timeIndex = 0;
                              if (hour >= 6 && hour < 12) timeIndex = 0;
                              else if (hour >= 12 && hour < 17) timeIndex = 1;
                              else if (hour >= 17 && hour < 21) timeIndex = 2;
                              else timeIndex = 3;
                              
                              if (dayIndex >= 0 && dayIndex < 7 && timeIndex >= 0 && timeIndex < 4) {
                                heatmapData[dayIndex].timeData[timeIndex].value++;
                              }
                            }
                          });
                        }
                        
                        return heatmapData;
                      })();
                      
                      const maxValue = Math.max(...heatmapData.flatMap(d => d.timeData.map(t => t.value)));
                      let legendValues = maxValue > 0 ? [0, Math.ceil(maxValue * 0.25), Math.ceil(maxValue * 0.5), Math.ceil(maxValue * 0.75), maxValue] : [0, 1, 2, 3, 4];
                      
                      // Ensure unique values for keys
                      legendValues = [...new Set(legendValues)].sort((a, b) => a - b);
                      
                      // Fallback if we don't have enough unique values
                      if (legendValues.length < 3) {
                        legendValues = [0, 1, 2, 3, 4];
                      }
                      
                      return (
                    <div className="flex items-center justify-center mt-4 space-x-2">
                      <span className="text-xs text-slate-600">Less</span>
                      <div className="flex space-x-1">
                            {legendValues.map(value => (
                          <div 
                                key={value}
                            className="w-3 h-3 rounded"
                                style={{ backgroundColor: getHeatmapColor(value) }}
                                title={`${value} responses`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-600">More</span>
                    </div>
                      );
                    })()}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 2: Individual Responses */}
            <TabsContent value="individual" className="space-y-6">
              {/* Question Filter - allows users to view specific questions */}
              <div className="flex justify-end">
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

              {/* Individual Response Cards */}
              <div className="space-y-6">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="text-slate-500">Loading responses...</div>
                  </div>
                ) : paginatedResponses.length > 0 ? (
                  paginatedResponses.map((user) => (
                    <Card key={user.response_id} className="border border-slate-400 shadow-none rounded-lg">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                        <CardTitle className="text-lg">{user.user_id}</CardTitle>
                        <CardDescription>{user.responses.length} responses</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {user.responses.map((response: any, index: number) => (
                            <div key={index} className="border border-slate-400 rounded-lg p-4">
                              <div className="mb-3">
                                <div className="flex items-start gap-3 mb-2">
                                  {/* Question Number Box - shows the question number */}
                                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 border border-purple-200 rounded-lg flex items-center justify-center">
                                    <span className="text-sm font-semibold text-purple-700">
                                      #{index + 1}
                                    </span>
                                  </div>
                                  {/* Question Text - shows the actual question */}
                                  <h4 className="font-400 text-slate-800 flex-1">{response.question_text}</h4>
                                </div>
                                <div className="flex items-center space-x-3 mb-3 mt-3">
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
                                  
                                  {/* Sentiment Badge - shows the sentiment of the response */}
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
                                  
                                  {/* Language Tag - shows the language of the response */}
                                  {response.language && response.language !== "en" && (
                                    <div className="flex items-center space-x-1">
                                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                      <span className="text-xs font-medium text-orange-700">
                                        {getLanguageName(response.language)}
                                      </span>
                                </div>
                                  )}
                                  
                                  {/* Category Tags - shows specific categories for each question */}
                                  {response.categories && response.categories.length > 0 && (
                                    <>
                                      {response.categories.map((category: any, catIndex: number) => {
                                        // Different colors for different categories
                                        const colorClasses = [
                                          "bg-blue-100 text-blue-800",      // Blue
                                          "bg-green-100 text-green-800",    // Green
                                          "bg-purple-100 text-purple-800",  // Purple
                                          "bg-orange-100 text-orange-800",  // Orange
                                          "bg-pink-100 text-pink-800",      // Pink
                                          "bg-indigo-100 text-indigo-800",  // Indigo
                                          "bg-teal-100 text-teal-800",      // Teal
                                          "bg-red-100 text-red-800",        // Red
                                          "bg-yellow-100 text-yellow-800",  // Yellow
                                          "bg-cyan-100 text-cyan-800"       // Cyan
                                        ];
                                        
                                        const colorClass = colorClasses[catIndex % colorClasses.length];
                                        
                                        return (
                                          <span
                                            key={catIndex}
                                            className={`inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}
                                          >
                                            {category.name}
                                          </span>
                                        );
                                      })}
                                    </>
                                  )}
                              </div>
                                
                              </div>
                              <div className="space-y-3">
                                {/* Text Response - only show if user typed something */}
                                {response.transcript && response.transcript !== "No text response" && (
                                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                                      <span className="text-xs font-medium text-slate-600">Text Response</span>
                                    </div>
                                <p className="text-sm text-slate-700 italic">"{response.transcript}"</p>
                                  </div>
                                )}
                                
                                {/* AI Transcription - always show if available */}
                                {response.transcribed_text && response.transcribed_text !== "No AI transcription available" && (
                                  <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                      <span className="text-xs font-medium text-purple-700">AI Transcription</span>
                                    </div>
                                    <p className="text-sm text-purple-800 font-medium">"{response.transcribed_text}"</p>
                                  </div>
                                )}
                                
                                {/* Translated Text - show if available */}
                                {response.translated_text && (
                                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                      <span className="text-xs font-medium text-blue-700">English Translation</span>
                                    </div>
                                    <p className="text-sm text-blue-800 font-medium">"{response.translated_text}"</p>
                                  </div>
                                )}
                                
                                
                                {/* Show message if no text or transcription available */}
                                {(!response.transcript || response.transcript === "No text response") && 
                                 (!response.transcribed_text || response.transcribed_text === "No AI transcription available") && (
                                  <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                    <p className="text-sm text-gray-500 italic">No text response or transcription available</p>
                                  </div>
                                )}
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
