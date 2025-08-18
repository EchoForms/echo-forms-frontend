"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mic, Globe, BarChart3, ArrowRight, Sparkles, Zap, Shield } from 'lucide-react'
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Move ALL hooks here, before any return!
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    role: "",
    otherRole: "",
    feedback: "",
    phone: "",
  });

  useEffect(() => {
    const token = Cookies.get("auth_token");
    if (token) {
      router.replace("/dashboard");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
        <div className="text-lg text-slate-600 animate-pulse">Redirecting to your dashboard...</div>
      </div>
    );
  }

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock submission - in real app, send to backend
    alert("Thank you for your feedback! We'll be in touch soon.")
    setFeedbackForm({
      name: "",
      role: "",
      otherRole: "",
      feedback: "",
      phone: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-300/10 to-blue-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative border-b bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Mic className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">EchoForm</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-slate-600 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105">
              Features
            </Link>
            <Link href="#how-it-works" className="text-slate-600 hover:text-purple-600 transition-all duration-300 font-medium hover:scale-105">
              How it Works
            </Link>
            <Link href="/login" className="px-4 py-2 text-slate-600 hover:text-purple-600 transition-all duration-300 font-medium hover:bg-purple-50 rounded-lg">
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full mb-8 border border-purple-200/50">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">AI-Powered Voice Analytics</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">Create Surveys That </span>
            <span className="relative">
              <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent animate-pulse">Listen.</span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Let your users respond with their voice. Perfect for PMs, marketers, HRs & students. 
            <span className="text-purple-600 font-semibold"> Get deeper insights</span> than ever before.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/signup">
              <Button
                size="lg"
                className="group relative bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 text-white px-10 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-3">
                  <span className="text-2xl">🎙️</span>
                  <span className="font-semibold">Try for Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Button>
            </Link>
            
            
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">10k+</div>
              <div className="text-slate-600">Voice Responses</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-slate-600">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-slate-600">Languages</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full mb-6 border border-purple-200/50">
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Powerful Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Why Choose EchoForm?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Experience the future of feedback collection with our cutting-edge voice technology</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-purple-50/30">
              <CardContent className="p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Mic className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">🎤 Audio-based answers</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Capture authentic responses with natural voice recordings. No typing required, just pure human expression.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-blue-50/30">
              <CardContent className="p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Globe className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">🌐 Language flexibility</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Support for 50+ languages with automatic transcription and real-time analysis powered by AI.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br from-white to-green-50/30">
              <CardContent className="p-10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 via-green-200 to-green-300 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <BarChart3 className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-6">📊 Instant AI analysis</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    Get sentiment analysis, key insights, and actionable trends automatically generated in real-time.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="relative py-24 px-4 bg-gradient-to-br from-slate-50 to-purple-50/50">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full mb-6 border border-purple-200/50">
              <Shield className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Simple Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">How it Works</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">Get started in minutes with our intuitive platform</p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { step: "1", title: "Sign Up", desc: "Create your account in seconds with our streamlined onboarding", color: "from-purple-500 to-purple-600" },
                { step: "2", title: "Create Form", desc: "Design your voice survey with our intuitive & simple builder", color: "from-blue-500 to-blue-600" },
                { step: "3", title: "Select Language", desc: "Choose from 50+ supported languages for global reach", color: "from-green-500 to-green-600" },
                { step: "4", title: "Add Questions", desc: "Write engaging questions that inspire authentic responses", color: "from-orange-500 to-orange-600" },
                { step: "5", title: "Publish & Share", desc: "Share your survey link across all your channels instantly", color: "from-pink-500 to-pink-600" },
                { step: "6", title: "Get AI Results", desc: "Analyze responses with powerful AI-driven insights", color: "from-indigo-500 to-indigo-600" },
              ].map((item, index) => (
                <div key={index} className="group text-center relative">
                  <div className="relative mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} text-white rounded-2xl flex items-center justify-center mx-auto font-bold text-xl shadow-xl group-hover:scale-110 transition-all duration-300 group-hover:shadow-2xl`}>
                      {item.step}
                    </div>
                    {index < 5 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-slate-300 to-transparent"></div>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-800 mb-3 text-xl">{item.title}</h3>
                  <p className="text-slate-600 text-base leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* User Personas Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full mb-6 border border-purple-200/50">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">For Everyone</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Built for Anyone Who Asks Questions</h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Whether you're gathering feedback, conducting research, or measuring satisfaction, EchoForm adapts to
              your unique needs across every department and industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Product Managers */}
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 bg-gradient-to-br from-white via-blue-50/30 to-white">
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <div className="text-3xl">📊</div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Product </h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    Get authentic user feedback on features, usability, and product direction through natural voice
                    responses that reveal true emotions.
                  </p>
                  <div className="text-xs text-slate-500 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200/50">
                    <strong className="text-blue-700">Use cases:</strong> Feature feedback, user interviews, beta testing
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* HR Teams */}
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 bg-gradient-to-br from-white via-green-50/30 to-white">
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 via-green-200 to-green-300 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <div className="text-3xl">👥</div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">HR Teams</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    Capture honest employee sentiment and feedback with the warmth and nuance that only voice can provide for deeper insights.


                  </p>
                  <div className="text-xs text-slate-500 bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200/50">
                    <strong className="text-green-700">Use cases:</strong> Employee satisfaction, exit interviews, onboarding feedback, culture surveys
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Marketing Teams */}
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 bg-gradient-to-br from-white via-purple-50/30 to-white">
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <div className="text-3xl">📈</div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Marketing </h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    Understand customer emotions, brand perception, and campaign effectiveness through voice insights that text can't capture.
                  </p>
                  <div className="text-xs text-slate-500 bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200/50">
                    <strong className="text-purple-700">Use cases:</strong> Brand research, campaign feedback, customer personas, market validation
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Success */}
            <Card className="group border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 bg-gradient-to-br from-white via-orange-50/30 to-white">
              <CardContent className="p-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <div className="text-3xl">🎯</div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-4">Customer Success</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    Get insights by hearing directly from customers about their experience and needs with authentic voice feedback.
                  </p>
                  <div className="text-xs text-slate-500 bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200/50">
                    <strong className="text-orange-700">Use cases:</strong> CSAT surveys, churn analysis, success stories, support feedback
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full mb-6 border border-purple-200/50">
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">Comparison</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">Why Choose EchoForm?</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">See how EchoForm compares to traditional survey tools and discover the difference</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/50">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200/50">
                    <th className="text-left p-8 font-bold text-slate-800 bg-gradient-to-r from-slate-50 to-slate-100/50 text-lg">Features</th>
                    <th className="text-center p-8 font-bold text-white bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-90"></div>
                      <div className="relative flex items-center justify-center space-x-3">
                        <Mic className="w-6 h-6" />
                        <span className="text-xl">EchoForm</span>
                        <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold">BEST</div>
                      </div>
                    </th>
                    <th className="text-center p-8 font-semibold text-slate-600 bg-gradient-to-r from-slate-50 to-slate-100/50 text-lg">Google Forms</th>
                    <th className="text-center p-8 font-semibold text-slate-600 bg-gradient-to-r from-slate-50 to-slate-100/50 text-lg">Typeform</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Voice Responses", voiceform: true, google: false, typeform: false },
                    { feature: "AI driven Analysis", voiceform: true, google: false, typeform: false },
                    { feature: "Multi-language Support", voiceform: true, google: "partial", typeform: true },
                    { feature: "Conversational experience", voiceform: true, google: false, typeform: false },
                    { feature: "Sentiment Analysis", voiceform: true, google: false, typeform: "partial" },
                    { feature: "Real-time Analytics", voiceform: true, google: "partial", typeform: true },
                    { feature: "Ease of Use", voiceform: true, google: true, typeform: true },
                  ].map((row, index) => (
                    <tr key={index} className={`border-b border-slate-100/50 ${index % 2 === 0 ? 'bg-white/50' : 'bg-slate-50/30'} hover:bg-purple-50/30 transition-colors duration-300`}>
                      <td className="p-6 font-semibold text-slate-800 text-lg">{row.feature}</td>
                      <td className="p-6 text-center">
                        <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full shadow-lg">
                          <span className="text-white font-bold text-lg">✓</span>
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full shadow-lg ${
                          row.google === true ? 'bg-gradient-to-br from-green-400 to-green-500' :
                          row.google === 'partial' ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' :
                          'bg-gradient-to-br from-red-400 to-red-500'
                        }`}>
                          <span className="text-white font-bold text-lg">
                            {row.google === true ? '✓' : row.google === 'partial' ? '~' : '✗'}
                          </span>
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full shadow-lg ${
                          row.typeform === true ? 'bg-gradient-to-br from-green-400 to-green-500' :
                          row.typeform === 'partial' ? 'bg-gradient-to-br from-yellow-400 to-yellow-500' :
                          'bg-gradient-to-br from-red-400 to-red-500'
                        }`}>
                          <span className="text-white font-bold text-lg">
                            {row.typeform === true ? '✓' : row.typeform === 'partial' ? '~' : '✗'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 p-10 text-center border-t border-purple-200/50">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Ready to hear what your users really think?</h3>
              <Link href="/signup">
                <Button className="group bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 text-white px-10 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <span className="mr-3">Start Your Free Trial</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 rounded-full mb-6 border border-purple-200/50">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">We're Listening</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">We'd Love Your Feedback</h2>
            <p className="text-xl text-slate-600">Help us build the perfect voice survey platform for your unique needs</p>
          </div>

          <Card className="border-0 shadow-2xl bg-gradient-to-br from-white via-purple-50/30 to-white">
            <CardContent className="p-10">
              <form onSubmit={handleFeedbackSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="text-slate-700 font-semibold text-lg">
                      Your Name *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={feedbackForm.name}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                      className="border-2 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl py-4 px-4 text-lg transition-all duration-300"
                      required
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="role" className="text-slate-700 font-semibold text-lg">
                      What do you do? *
                    </Label>
                    <Select
                      value={feedbackForm.role}
                      onValueChange={(value) =>
                        setFeedbackForm({
                          ...feedbackForm,
                          role: value,
                          otherRole: value !== "other" ? "" : feedbackForm.otherRole,
                        })
                      }
                    >
                      <SelectTrigger className="border-2 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl py-4 px-4 text-lg">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product">Product Manager</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="hr">HR</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {feedbackForm.role === "other" && (
                  <div className="space-y-3">
                    <Label htmlFor="otherRole" className="text-slate-700 font-semibold text-lg">
                      Please specify your role
                    </Label>
                    <Input
                      id="otherRole"
                      type="text"
                      placeholder="Enter your role"
                      value={feedbackForm.otherRole}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, otherRole: e.target.value })}
                      className="border-2 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl py-4 px-4 text-lg transition-all duration-300"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <Label htmlFor="feedback" className="text-slate-700 font-semibold text-lg">
                    Your Feedback *
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="Tell us what you think about voice surveys, what features you'd like to see, or any questions you have..."
                    value={feedbackForm.feedback}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, feedback: e.target.value })}
                    className="border-2 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl py-4 px-4 text-lg min-h-[150px] transition-all duration-300"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-slate-700 font-semibold text-lg">
                    Phone Number (Optional)
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={feedbackForm.phone}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, phone: e.target.value })}
                    className="border-2 border-slate-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl py-4 px-4 text-lg transition-all duration-300"
                  />
                  <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <Shield className="w-4 h-4 inline mr-2" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-4 h-4 inline mr-2"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>We won't spam you - this is purely for feedback purpose :)
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 text-white py-6 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  disabled={!feedbackForm.name || !feedbackForm.role || !feedbackForm.feedback}
                >
                  Send Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-300 py-16 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
        <div className="container mx-auto relative z-10 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">EchoForm</span>
          </div>
          <p className="text-slate-400 text-lg mb-6">Create surveys that listen to your users</p>
          <div className="border-t border-slate-700 pt-6">
            <p className="text-slate-400">&copy; 2024 EchoForm. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
