import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, Plus, Eye, Calendar, Users, MoreHorizontal, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for forms
const mockForms = [
  {
    id: "1",
    title: "Customer Satisfaction Survey",
    description: "Quarterly feedback collection",
    responses: 127,
    lastUpdated: "2 days ago",
    status: "active",
    language: "English",
  },
  {
    id: "2",
    title: "Product Feature Feedback",
    description: "Voice feedback on new features",
    responses: 89,
    lastUpdated: "1 week ago",
    status: "active",
    language:"Hindi",
  },
  {
    id: "3",
    title: "Employee Onboarding Experience",
    description: "HR feedback collection",
    responses: 45,
    lastUpdated: "3 days ago",
    status: "draft",
    language: "English",
  },
  {
    id: "4",
    title: "Event Feedback Survey",
    description: "Post-event voice responses",
    responses: 203,
    lastUpdated: "5 days ago",
    status: "completed",
    language: "French",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-slate-800">EchoForm</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                
                
              </div>
              <div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-slate-600">JD</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">My Forms</h1>
              <p className="text-slate-600 mt-1">Manage your voice surveys and view responses</p>
            </div>
            <Link href="/create">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create New Form
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Forms</p>
                    <p className="text-2xl font-bold text-slate-800">12</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Mic className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Responses</p>
                    <p className="text-2xl font-bold text-slate-800">1,247</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Forms</p>
                    <p className="text-2xl font-bold text-slate-800">8</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Avg. Response Time</p>
                    <p className="text-2xl font-bold text-slate-800">2.3m</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Forms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockForms.map((form) => (
              <Card key={form.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-slate-800 mb-1">{form.title}</CardTitle>
                      <CardDescription className="text-slate-600">{form.description}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Form</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem>Share Link</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Responses</span>
                      <span className="font-medium text-slate-800">{form.responses}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Language</span>
                      <span className="font-medium text-slate-800">{form.language}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Last updated</span>
                      <span className="font-medium text-slate-800">{form.lastUpdated}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge
                        variant={
                          form.status === "active" ? "default" : form.status === "draft" ? "secondary" : "outline"
                        }
                        className={
                          form.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : form.status === "draft"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              : "bg-slate-100 text-slate-800 hover:bg-slate-100"
                        }
                      >
                        {form.status}
                      </Badge>
                    </div>

                    <Link href={`/results/${form.id}`}>
                      <Button variant="outline" className="w-full mt-4 bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        View Results
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
