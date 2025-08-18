"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, Plus, Eye, Calendar, Users, MoreHorizontal, Search, Check, Link as LinkIcon } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { fetchCurrentUser } from "@/lib/api/users";
import { fetchForms, deleteForm } from "@/lib/api/forms";

export default function DashboardPage() {
    const [user, setUser] = useState<{ name?: string } | null>(null);
    const [forms, setForms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    useEffect(() => {
        fetchCurrentUser().then(setUser).catch(() => setUser(null));
        fetchForms().then(setForms).finally(() => setLoading(false));
    }, []);

    const handleCopyLink = (form_unique_id: string) => {
        navigator.clipboard.writeText(`${window.location.origin}/forms/${form_unique_id}`);
        setCopiedId(form_unique_id);
        setTimeout(() => setCopiedId(null), 1500);
    };
    const handleDelete = async (formId: number) => {
        if (!window.confirm("Are you sure you want to delete this form?")) return;
        setDeletingId(formId);
        try {
            await deleteForm(formId);
            setForms(forms.filter(f => f.id !== formId));
        } finally {
            setDeletingId(null);
        }
    };

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
                                {user && (
                                    <span className="text-lg font-semibold text-slate-700">Hi, {user.name}!</span>
                                )}
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
                            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white cursor-pointer">
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
                        {loading ? (
                            <div className="col-span-full text-center text-slate-500">Loading forms...</div>
                        ) : forms.length === 0 ? (
                            <div className="col-span-full text-center text-slate-500">No forms found.</div>
                        ) : (
                            forms.map((form) => (
                                <Card key={form.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <CardTitle className="text-lg font-semibold text-slate-800 mb-1">{form.title}</CardTitle>
                                                <CardDescription className="text-slate-600">{form.description}</CardDescription>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 cursor-pointer">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="cursor-pointer">Edit Form</DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer">Duplicate</DropdownMenuItem>
                                                    <DropdownMenuItem className="cursor-pointer">Share Link</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => handleDelete(form.id)} disabled={deletingId === form.id}>
                                                        {deletingId === form.id ? "Deleting..." : "Delete"}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-600">Language</span>
                                                <span className="font-medium text-slate-800">{form.language}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-600">Status</span>
                                                <span className="font-medium text-slate-800">{form.status}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-600">Created</span>
                                                <span className="font-medium text-slate-800">{new Date(form.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2 bg-slate-100 rounded-full px-3 py-1 shadow-sm border border-slate-200 min-w-[220px]">
                                                <LinkIcon className="w-4 h-4 text-blue-500" />
                                                <a
                                                    href={`/forms/${form.form_unique_id}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs font-mono font-medium text-green-700 hover:underline focus:underline outline-none transition-colors cursor-pointer flex-1"
                                                    style={{ wordBreak: 'break-all' }}
                                                >
                                                    {window.location.host}/forms/{form.form_unique_id}
                                                </a>
                                                <Button size="sm" variant="ghost" className="p-1 cursor-pointer flex items-center" style={{marginLeft: 0}} onClick={() => handleCopyLink(form.form_unique_id)}>
                                                    {copiedId === form.form_unique_id ? <Check className="w-4 h-4 text-green-600" /> : "Copy"}
                                                </Button>
                                            </div>
                                            <Link href={`/results/${form.id}`}>
                                                <Button variant="outline" className="w-full mt-4 bg-transparent cursor-pointer">
                                                    <Eye className="w-4 h-4 mr-2" />
                                                    View Results
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
