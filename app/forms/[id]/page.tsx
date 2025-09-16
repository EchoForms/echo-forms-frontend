"use client"

import React, { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, Mic, ArrowRight, ArrowLeft, X, Play, Square, Pause, Trash} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { useParams } from "next/navigation"
import { fetchFormByUniqueId } from "@/lib/api/forms"
import { createFormResponse, getFormResponseById } from "@/lib/api/form_responses"
import { createFormResponseFieldMultipart } from "@/lib/api/form_response_fields"
import jsCookie from "js-cookie"
import { useVoiceVisualizer, VoiceVisualizer } from "react-voice-visualizer"

export default function PublicFormPage({ params }: { params: any }) {
  const { id } = React.use(params) as { id: string };
  const [form, setForm] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [textResponses, setTextResponses] = useState<Record<string, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [formResponse, setFormResponse] = useState<any | null>(null)
  const [showContinue, setShowContinue] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [canPlayback, setCanPlayback] = useState(false)
  
  // Helper function to format duration in seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const recorderControls = useVoiceVisualizer({
    onEndAudioPlayback: () => {
      setIsPlaying(false);
    },
    onStopRecording: () => {
      setIsRecording(false);

      setTimeout(() => {
        setCanPlayback(true);
      }, 300);
    }
  })

  const handleRecordingClick = () => {
    if(!isRecording) {
      recorderControls.startRecording();
      setIsRecording(true);
    }
    else {
      recorderControls.stopRecording();
      setIsRecording(false);
    }
  };

  const handlePlaybackClick = () => {
    if (!canPlayback) {
      return;
    }

    if (!isPlaying) {
      recorderControls.startAudioPlayback();
      setIsPlaying(true);
    }
    else {
      recorderControls.stopAudioPlayback();
      setIsPlaying(false);
    }
  }


  const handleClearRecording = () => {
    
    recorderControls.clearCanvas();
    setCanPlayback(false);
    setIsRecording(false);
    setIsPlaying(false);
    setRecordingDuration(0);
  }

  // Auto-stop recording at 60 seconds
  useEffect(() => {
    if (isRecording && recorderControls.recordingTime !== undefined) {
      const currentTime = recorderControls.recordingTime / 1000; // Convert milliseconds to seconds
      
      // Auto-stop recording at exactly 60 seconds
      if (currentTime >= 60) {
        console.log("Auto-stopping recording at 60 seconds");
        recorderControls.stopRecording();
        setIsRecording(false);
      }
    }
  }, [isRecording, recorderControls.recordingTime, recorderControls]);

  useEffect(() => {
    if (recorderControls.recordingTime) { 
      setRecordingDuration(recorderControls.recordingTime / 1000 || 0);
    }
  }, [recorderControls.recordingTime, recorderControls.recordedBlob]); 

  useEffect(() => {
    fetchFormByUniqueId(id)
      .then(async (formData) => {
        
        setForm(formData);
        if (formData?.id) {
          // Check for existing form responses first
          try {
            let response: any;
            
            // 1. Check if cookie exists with formId
            const cookieKey = `echo-forms-${formData.id}`;
            const existingCookieVal = jsCookie.get(cookieKey);
            
            if (existingCookieVal && existingCookieVal.includes(':')) {
              // 2. Cookie exists - get responseId and questionNumber, fetch response by responseId
              const [responseIdStr, questionNumStr] = existingCookieVal.split(':');
              const responseId = Number(responseIdStr);
              const questionNumber = Number(questionNumStr);
              
              try {
                // Fetch form response by specific responseId
                response = await getFormResponseById(responseId);
                console.log("Using existing form response:", response.responseId);
                
                // Set continue state
                if (questionNumber >= formData?.fields?.length) {
                  setIsCompleted(true);
                } else {
                  setShowContinue(true);
                  setCurrentQuestion(questionNumber);
                }
              } catch (e) {
                // Response not found, create new one
                response = await createFormResponse({ formId: formData.id });
                console.log("Created new form response (old one not found):", response.responseId);
                // Set new cookie
                jsCookie.set(cookieKey, `${response.responseId}:0`);
              }
            } else {
              // 3. Cookie doesn't exist - create new response and set cookie
              response = await createFormResponse({ formId: formData.id });
              console.log("Created new form response (new user):", response.responseId);
              // Set new cookie with responseId:0
              jsCookie.set(cookieKey, `${response.responseId}:0`);
            }
            
            setFormResponse(response);
          } catch (e) {
            console.error("Failed to get/create form response", e);
          }
        }
      })
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading form...</p>
        </div>
      </div>
    )
  }

  if (!form) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Form not found</h1>
          <p className="text-gray-600">The form you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  const questions = form.fields || []
  const progress = questions.length > 0 ? ((currentQuestion) / questions.length) * 100 : 0
  

  const handleNext = async () => {
    try {
      // Set loading state
      setIsLoading(true);
      if (formResponse && form) {
        const isLast = currentQuestion === questions.length - 1;
        const textValue = textResponses[questions[currentQuestion].id] || "";
        const question = questions[currentQuestion];
        let file: File | null = null;
        let finalDuration = recordingDuration;
      
        if (recorderControls.recordedBlob) {
          file = new File([recorderControls.recordedBlob], `audio_question_${question.question_number || currentQuestion + 1}.webm`, { type: "audio/webm" });
        }

        try {
          await createFormResponseFieldMultipart({
            formResponseId: formResponse.responseId,
            formId: form.id,
            formfeildId: question.id,
            question_number: question.question_number || currentQuestion + 1,
            responseText: textValue,
            isLastQuestion: isLast,
            file,
            responseTime: recorderControls.duration
          });
          
          recorderControls.clearCanvas();
        } catch (err) {
          console.error("Multipart API call failed", err);
          return;
        } finally {
          setIsLoading(false);
        }

        // Update cookie with new question number
        const cookieKey = `echo-forms-${form.id}`;
        const newQuestionNum = currentQuestion + 1;
        // Keep the existing responseId and update question number
        const existingCookieVal = jsCookie.get(cookieKey);
        if (existingCookieVal && existingCookieVal.includes(':')) {
          const [responseId] = existingCookieVal.split(':');
          jsCookie.set(cookieKey, `${responseId}:${newQuestionNum}`);
        } else {
          // Fallback: create new cookie with current responseId
          jsCookie.set(cookieKey, `${formResponse?.responseId}:${newQuestionNum}`);
        }
        
        // Only mark as completed if this was the last question
        if (isLast) {
          setIsCompleted(true);
        } else {
          // Move to next question
          setCurrentQuestion(currentQuestion + 1);
        }
      }
    } catch (error) {
      console.error("Error in handleNext:", error);
      alert(error instanceof Error ? error.message : "An error occurred while processing your response");
      setIsLoading(false);
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      recorderControls.clearCanvas();
      setCanPlayback(false);
      setIsRecording(false);
      setIsPlaying(false);
      setRecordingDuration(0);
      setTextResponses({});
      setCurrentQuestion(currentQuestion - 1)
    }
  }


  const canProceed = questions[currentQuestion]?.required 
    ? (textResponses[questions[currentQuestion].id] || recorderControls.recordedBlob)
    : true;

  const handleRestart = () => {
    if (form?.id) {
      const cookieKey = `echo-forms-${form.id}`;
      jsCookie.remove(cookieKey); // Expire the cookie immediately
    }
    window.location.reload();
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-100 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Thank you!</h2>
            <p className="text-slate-600 mb-6">
              Your voice responses have been submitted successfully. We appreciate your feedback!
            </p>
            <div className="text-sm text-slate-500 mb-4">
              Powered by <span className="font-medium">EchoForm</span>
            </div>
            <Button onClick={handleRestart} className="mt-2 cursor-pointer">Submit another response</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-indigo-100">
      <div className="max-w-4xl mx-auto">
        {/* Continue Banner */}
        {showContinue && (
          <div className="w-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 text-center py-3 font-medium text-sm border border-purple-300 shadow-sm">
            Continue from where you left off
          </div>
        )}
        
        {/* Progress */}
        <div className="px-4 mb-6 pt-8">
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
          <Card className="w-full max-w-md border-0 shadow-none bg-white rounded-md">
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
                  {/* Voice Visualizer for Recording */}
                  <div className="w-full max-w-xs">
                    <VoiceVisualizer
                      controls={recorderControls}
                      height={80}
                      width={300}
                      backgroundColor="white"
                      mainBarColor="purple"
                      secondaryBarColor="green"
                      speed={1}
                      gap={1}
                      rounded={20}
                      barWidth={3}
                      isAudioProcessingTextShown={true}
                      isProgressIndicatorShown={false}
                      isControlPanelShown={false}
                      isDownloadAudioButtonShown={false}
                    />
                  </div>

                <p className={`text-sm font-medium ${
                  isRecording && recordingDuration >= 50 
                    ? "text-red-600 animate-pulse" 
                    : "text-slate-600"
                }`}>
                  {isRecording 
                    ? recorderControls.formattedRecordingTime
                    : (recorderControls.recordedBlob ? recorderControls.formattedRecordedAudioCurrentTime : "00:00")
                  }
                  {isRecording && recordingDuration >= 50 && (
                    <span className="ml-2 text-xs">
                      (Max: 60s)
                    </span>
                  )}
                </p>
                
                
                <div className="mb-8 flex flex-row justify-center items-center gap-6">
                  {/* Pause/Resume Button - Always show but conditionally style */}
                  <button 
                    onClick={recorderControls.togglePauseResume}
                    disabled={!isRecording || isLoading}
                    className={`w-20 h-20 rounded-full flex justify-center items-center transition-all duration-200 ${
                      isRecording 
                        ? "bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-xl cursor-pointer" 
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    {recorderControls.isPausedRecording ? <Play className="w-8 h-8 text-white" /> : <Pause className="w-8 h-8 text-white" />}
                  </button>

                  {/* Recording/Playback Button */}
                  {recorderControls.recordedBlob && recorderControls.isAvailableRecordedAudio ? (
                    <button
                      onClick={handlePlaybackClick}
                      disabled={isLoading}
                      className={`w-20 h-20 rounded-full flex justify-center items-center transition-all duration-200 ${
                        isPlaying
                          ? "bg-purple-500 hover:bg-purple-600 animate-pulse" 
                          : "bg-green-500 hover:bg-green-600"
                      } shadow-lg hover:shadow-xl cursor-pointer`}
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white" />
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handleRecordingClick}
                      disabled={isLoading}
                      className={`w-20 h-20 rounded-full flex justify-center items-center transition-all duration-200 ${
                        isRecording
                          ? recordingDuration >= 50 
                            ? "bg-red-600 hover:bg-red-700 animate-pulse border-2 border-red-300" 
                            : "bg-red-500 hover:bg-red-600 animate-pulse"
                          : "bg-purple-500 hover:bg-purple-600"
                      } shadow-lg hover:shadow-xl cursor-pointer`}
                    >
                      {isRecording ? (
                        <Square className="w-8 h-8 text-white" />
                      ) : (
                        <Mic className="w-8 h-8 text-white" />
                      )}
                    </button>
                  )}

                  {/* Clear/Trash Button - Always show but conditionally style */}
                  <button
                    onClick={handleClearRecording}
                    disabled={(!recorderControls.recordedBlob && !isRecording) || isLoading}
                    className={`w-20 h-20 rounded-full flex justify-center items-center transition-all duration-200 ${
                      (recorderControls.recordedBlob || isRecording)
                        ? "bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-xl cursor-pointer"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Trash className="w-8 h-8 text-white" />
                  </button>
                </div>
                
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
                      disabled={!canProceed || isLoading}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white cursor-pointer"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          Processing...
                        </div>
                      ) : (
                        <>
                          {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
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
    </div>
  )
}
