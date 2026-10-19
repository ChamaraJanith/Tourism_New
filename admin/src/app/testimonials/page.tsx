"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { 
  Star, 
  Check, 
  X, 
  Trash2, 
  Plus, 
  Search, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  MessageSquareQuote,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  country: string;
  flag: string;
  rating: number;
  quote: string;
  short_quote?: string;
  tags: string[];
  bg_image?: string;
  status: "Pending" | "Approved" | "Rejected";
  created_at: string;
}

const INITIAL_MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "mock-1",
    name: "Eleanor Vance",
    role: "Private Client",
    country: "United Kingdom",
    flag: "🇬🇧",
    rating: 5,
    quote: "A perfectly paced exploration of Sri Lanka's hidden highlands. The expert local guides knew every secret tea plantation trail. Pure luxury coupled with wild, raw authenticity.",
    short_quote: "The expert local guides knew every secret tea plantation trail.",
    tags: ["Highland Expedition", "Culture Trails"],
    status: "Approved",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: "mock-2",
    name: "Marcus Aurelius",
    role: "Bespoke Adventurer",
    country: "Germany",
    flag: "🇩🇪",
    rating: 5,
    quote: "Booking the Dandeniya Lake retreat was the best wellness decision I've ever made. The sound of birds at sunrise, combined with organic food and top-tier service, was unmatched.",
    short_quote: "Booking the Dandeniya Lake retreat was the best wellness decision.",
    tags: ["Lake Retreat", "Ayurvedic Spa"],
    status: "Approved",
    created_at: new Date(Date.now() - 86400000 * 4).toISOString()
  },
  {
    id: "mock-3",
    name: "Alexander Wright",
    role: "Wildlife Explorer",
    country: "Australia",
    flag: "🇦🇺",
    rating: 5,
    quote: "The private leopard safari in Yala was extraordinary. Chauffeur guide was deeply knowledgeable and the tented villa was supreme comfort. Will definitely return with family.",
    short_quote: "Private leopard safari was extraordinary.",
    tags: ["Wildlife & Safari", "Private Chauffeur"],
    status: "Pending",
    created_at: new Date().toISOString()
  }
];

const SQL_SETUP_SCRIPT = `-- Run this in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT DEFAULT 'Client',
  country TEXT DEFAULT '',
  flag TEXT DEFAULT '🌍',
  rating INTEGER NOT NULL DEFAULT 5,
  quote TEXT NOT NULL,
  short_quote TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  bg_image TEXT DEFAULT '/images/nine_arch_bridge.png',
  avatar TEXT,
  status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.testimonials DISABLE ROW LEVEL SECURITY;`;

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [tableMissing, setTableMissing] = useState(false);
  const [copiedSql, setCopiedSql] = useState(false);

  // New review modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    country: "United Kingdom",
    role: "Private Client",
    rating: 5,
    quote: "",
    journey: "The Grand Sri Lanka Discovery",
    tags: "Highland Expedition",
    status: "Approved" as "Approved" | "Pending"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTestimonials = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        if (error.message.includes("does not exist") || error.code === "42P01" || error.message.includes("schema cache")) {
          setTableMissing(true);
          setTestimonials(INITIAL_MOCK_TESTIMONIALS);
        } else {
          console.warn("Error fetching testimonials:", error.message);
        }
      } else if (data) {
        setTableMissing(false);
        if (data.length === 0) {
          setTestimonials(INITIAL_MOCK_TESTIMONIALS);
        } else {
          setTestimonials(data);
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setTestimonials(INITIAL_MOCK_TESTIMONIALS);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();

    // Supabase realtime subscription
    const channel = supabase
      .channel("admin-testimonials-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "testimonials" },
        (payload: any) => {
          if (payload.eventType === "INSERT") {
            setTestimonials((prev) => [payload.new, ...prev.filter((t) => t.id !== payload.new.id)]);
          } else if (payload.eventType === "UPDATE") {
            setTestimonials((prev) => prev.map((t) => (t.id === payload.new.id ? payload.new : t)));
          } else if (payload.eventType === "DELETE") {
            setTestimonials((prev) => prev.filter((t) => t.id !== payload.old?.id));
          }
        }
      )
      .subscribe();

    // Fallback interval
    const interval = setInterval(() => {
      fetchTestimonials();
    }, 12000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(interval);
    };
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: "Approved" | "Rejected" | "Pending") => {
    setTestimonials((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );

    if (!tableMissing) {
      const { error } = await supabase
        .from("testimonials")
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq("id", id);

      if (error) {
        alert("Failed to update status in database: " + error.message);
        fetchTestimonials();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this testimonial?")) return;

    setTestimonials((prev) => prev.filter((item) => item.id !== id));

    if (!tableMissing) {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) {
        alert("Failed to delete from database: " + error.message);
        fetchTestimonials();
      }
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SQL_SETUP_SCRIPT);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  const handleCreateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.quote.trim()) return;

    setIsSubmitting(true);
    const newItem: Partial<Testimonial> = {
      name: newReview.name.trim(),
      role: newReview.role.trim() || "Private Client",
      country: newReview.country,
      flag: newReview.country === "United Kingdom" ? "🇬🇧" :
            newReview.country === "United States" ? "🇺🇸" :
            newReview.country === "Germany" ? "🇩🇪" :
            newReview.country === "Australia" ? "🇦🇺" : "🌍",
      rating: newReview.rating,
      quote: newReview.quote.trim(),
      short_quote: newReview.quote.trim().slice(0, 110) + "...",
      tags: [newReview.journey, newReview.tags].filter(Boolean),
      status: newReview.status,
      created_at: new Date().toISOString()
    };

    if (!tableMissing) {
      const { data, error } = await supabase
        .from("testimonials")
        .insert([newItem])
        .select()
        .single();

      if (error) {
        alert("Error creating review: " + error.message);
      } else if (data) {
        setTestimonials((prev) => [data, ...prev]);
        setIsAddModalOpen(false);
      }
    } else {
      setTestimonials((prev) => [
        { ...newItem, id: `local-${Date.now()}` } as Testimonial,
        ...prev
      ]);
      setIsAddModalOpen(false);
    }
    setIsSubmitting(false);
  };

  const filteredTestimonials = testimonials.filter((item) => {
    const matchesStatus = filterStatus === "All" || item.status === filterStatus;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.quote.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = testimonials.filter((t) => t.status === "Pending").length;
  const approvedCount = testimonials.filter((t) => t.status === "Approved").length;
  const rejectedCount = testimonials.filter((t) => t.status === "Rejected").length;
  const avgRating = testimonials.length > 0 
    ? (testimonials.reduce((acc, cur) => acc + (cur.rating || 5), 0) / testimonials.length).toFixed(1)
    : "5.0";

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      
      {/* Top Header & Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-white tracking-tight">Testimonials & Reviews</h1>
            {pendingCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold animate-pulse">
                {pendingCount} Pending Approval
              </span>
            )}
          </div>
          <p className="text-slate-400 mt-1">
            Review submitted guest feedback. Once accepted by Admin, reviews appear on the public website dashboard.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchTestimonials(true)}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium transition border border-white/5"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#c49f28] text-black font-semibold text-sm transition shadow-lg shadow-[#d4af37]/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* SQL Setup Banner if table is not yet in Supabase */}
      {tableMissing && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 text-amber-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-300 text-sm">Supabase Database Setup Recommended</h4>
              <p className="text-xs text-amber-200/80 mt-0.5">
                The <code className="bg-black/30 px-1.5 py-0.5 rounded text-amber-300">testimonials</code> table is not yet created in your Supabase project. A setup script has been prepared in <code className="bg-black/30 px-1.5 py-0.5 rounded text-amber-300">testimonials_setup.sql</code>.
              </p>
            </div>
          </div>
          <button
            onClick={handleCopySql}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold shrink-0 transition"
          >
            {copiedSql ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedSql ? "Copied SQL!" : "Copy SQL Script"}</span>
          </button>
        </motion.div>
      )}

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Reviews</span>
            <MessageSquareQuote className="w-5 h-5 text-slate-500" />
          </div>
          <div className="text-3xl font-bold text-white">{testimonials.length}</div>
          <p className="text-xs text-slate-500 mt-1">All collected guest stories</p>
        </div>

        <div className="bg-[#111827] border border-amber-500/20 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Pending Approvals</span>
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-bold text-amber-400">{pendingCount}</div>
          <p className="text-xs text-amber-400/80 mt-1">Requires Admin acceptance to go live</p>
        </div>

        <div className="bg-[#111827] border border-emerald-500/20 rounded-2xl p-5">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Published on Website</span>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-bold text-emerald-400">{approvedCount}</div>
          <p className="text-xs text-emerald-400/80 mt-1">Live on public frontend dashboard</p>
        </div>

        <div className="bg-[#111827] border border-white/5 rounded-2xl p-5">
          <div className="flex items-center justify-between text-[#d4af37] mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Average Rating</span>
            <Star className="w-5 h-5 fill-[#d4af37] text-[#d4af37]" />
          </div>
          <div className="text-3xl font-bold text-white">{avgRating} <span className="text-sm font-normal text-slate-400">/ 5.0</span></div>
          <p className="text-xs text-slate-500 mt-1">Based on guest ratings</p>
        </div>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center p-1 bg-[#111827] border border-white/5 rounded-xl self-start w-full sm:w-auto">
          {(["All", "Pending", "Approved", "Rejected"] as const).map((tab) => {
            const count = tab === "All" ? testimonials.length :
                          tab === "Pending" ? pendingCount :
                          tab === "Approved" ? approvedCount : rejectedCount;
            const isActive = filterStatus === tab;

            return (
              <button
                key={tab}
                onClick={() => setFilterStatus(tab)}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition ${
                  isActive
                    ? "bg-[#d4af37] text-black shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{tab}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive ? "bg-black/20 text-black font-extrabold" : "bg-white/10 text-slate-400"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#111827] border border-white/5 text-white placeholder-slate-500 text-xs focus:border-[#d4af37] focus:outline-none transition"
          />
        </div>
      </div>

      {/* Testimonials List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-[#111827] border border-white/5 rounded-2xl p-12 text-center text-slate-500">
            <RefreshCw className="w-8 h-8 text-[#d4af37] animate-spin mx-auto mb-3" />
            <p className="text-sm">Loading guest testimonials...</p>
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <div className="bg-[#111827] border border-white/5 rounded-2xl p-12 text-center text-slate-500">
            <MessageSquareQuote className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-300">No Testimonials Found</h3>
            <p className="text-xs text-slate-500 mt-1">
              {filterStatus !== "All"
                ? `No testimonials with status "${filterStatus}".`
                : "No client reviews match your search."}
            </p>
          </div>
        ) : (
          filteredTestimonials.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-[#111827] border rounded-2xl p-6 transition-all ${
                item.status === "Pending"
                  ? "border-amber-500/30 bg-[#111827]/90 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/20"
                  : "border-white/5 hover:border-white/10"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                
                {/* Left Content */}
                <div className="space-y-3 flex-1">
                  
                  {/* Reviewer Header */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8d6f1f] text-black font-bold flex items-center justify-center text-sm shadow-md">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white">{item.name}</h3>
                        <span className="text-sm">{item.flag || "🌍"}</span>
                        <span className="text-xs text-slate-400 font-medium">{item.country}</span>
                      </div>
                      <p className="text-xs text-[#d4af37] font-medium">{item.role}</p>
                    </div>

                    {/* Status Badge */}
                    <div className="ml-auto sm:ml-4">
                      {item.status === "Approved" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Published (Live)
                        </span>
                      )}
                      {item.status === "Pending" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse">
                          <Clock className="w-3.5 h-3.5" /> Pending Admin Acceptance
                        </span>
                      )}
                      {item.status === "Rejected" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          <X className="w-3.5 h-3.5" /> Rejected
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating Stars & Tags */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1 text-[#d4af37]">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.tags?.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-slate-300 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quote Body */}
                  <div className="bg-black/30 rounded-xl p-4 border border-white/5">
                    <p className="text-sm text-slate-200 italic leading-relaxed">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  {/* Meta: date */}
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span>Submitted on: {new Date(item.created_at).toLocaleDateString()} at {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>

                </div>

                {/* Right Actions Box */}
                <div className="flex lg:flex-col items-center gap-2 lg:border-l lg:border-white/5 lg:pl-6 shrink-0">
                  {item.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(item.id, "Approved")}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-semibold text-xs tracking-wider uppercase transition shadow-lg shadow-emerald-500/20"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Accept & Publish</span>
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(item.id, "Rejected")}
                        className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold transition"
                      >
                        <X className="w-4 h-4" />
                        <span>Reject</span>
                      </button>
                    </>
                  )}

                  {item.status === "Approved" && (
                    <button
                      onClick={() => handleUpdateStatus(item.id, "Rejected")}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 text-xs font-medium transition border border-white/5"
                    >
                      Unpublish
                    </button>
                  )}

                  {item.status === "Rejected" && (
                    <button
                      onClick={() => handleUpdateStatus(item.id, "Approved")}
                      className="px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-medium transition border border-emerald-500/20"
                    >
                      Re-Approve
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(item.id)}
                    aria-label="Delete Testimonial"
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-rose-500/10 text-slate-400 hover:text-rose-400 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add Review Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#111827] border border-white/10 rounded-2xl p-6 shadow-2xl text-white z-10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#d4af37]" /> Add Client Review
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Guest Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sir David Attenborough"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Country</label>
                    <select
                      value={newReview.country}
                      onChange={(e) => setNewReview({ ...newReview, country: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    >
                      <option value="United Kingdom">🇬🇧 United Kingdom</option>
                      <option value="United States">🇺🇸 United States</option>
                      <option value="Germany">🇩🇪 Germany</option>
                      <option value="Australia">🇦🇺 Australia</option>
                      <option value="France">🇫🇷 France</option>
                      <option value="Other">🌍 Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Traveler Role</label>
                    <input
                      type="text"
                      placeholder="e.g. Private Client"
                      value={newReview.role}
                      onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Rating</label>
                    <select
                      value={newReview.rating}
                      onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    >
                      <option value={5}>5 Stars (Exceptional)</option>
                      <option value={4}>4 Stars (Very Good)</option>
                      <option value={3}>3 Stars (Average)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Initial Status</label>
                    <select
                      value={newReview.status}
                      onChange={(e) => setNewReview({ ...newReview, status: e.target.value as any })}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    >
                      <option value="Approved">Approved (Publish Now)</option>
                      <option value="Pending">Pending (Draft)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Our Signature Journey</label>
                    <select
                      value={newReview.journey}
                      onChange={(e) => setNewReview({ ...newReview, journey: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    >
                      <option value="">None / Custom</option>
                      <option value="The Grand Sri Lanka Discovery">The Grand Sri Lanka Discovery</option>
                      <option value="Luxury Escape Sri Lanka">Luxury Escape Sri Lanka</option>
                      <option value="Heritage & Cultural Discovery">Heritage & Cultural Discovery</option>
                      <option value="Wildlife & Nature Adventure">Wildlife & Nature Adventure</option>
                      <option value="Wellness & Ayurveda Retreat">Wellness & Ayurveda Retreat</option>
                      <option value="Romance & Honeymoon Collection">Romance & Honeymoon Collection</option>
                      <option value="Adventure Sri Lanka">Adventure Sri Lanka</option>
                      <option value="Family Holiday Experience">Family Holiday Experience</option>
                      <option value="Silver Horizons – Luxury Senior Living Experience">Silver Horizons – Luxury Senior Living Experience</option>
                      <option value="MICE & Corporate Excellence">MICE & Corporate Excellence</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Trip Highlights / Category</label>
                    <select
                      value={newReview.tags}
                      onChange={(e) => setNewReview({ ...newReview, tags: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-sm focus:border-[#d4af37] focus:outline-none"
                    >
                      <option value="Highland Expedition">Highland Expedition</option>
                      <option value="Lake Retreat & Wellness">Lake Retreat & Wellness</option>
                      <option value="Organic Village & Culture">Organic Village & Culture</option>
                      <option value="Wildlife & Safari">Wildlife & Safari</option>
                      <option value="Coastal & Surfing">Coastal & Surfing</option>
                      <option value="Ayurvedic Spa & Serenity">Ayurvedic Spa & Serenity</option>
                      <option value="Bespoke Private Journey">Bespoke Private Journey</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Review Quote *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Quote text..."
                    value={newReview.quote}
                    onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/10 text-white text-sm focus:border-[#d4af37] focus:outline-none resize-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2.5 rounded-xl bg-[#d4af37] hover:bg-[#c49f28] text-black font-semibold text-xs tracking-wider uppercase transition shadow-lg shadow-[#d4af37]/20 disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Save Testimonial"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
