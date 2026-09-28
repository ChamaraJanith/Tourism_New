"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Globe, Plus, Mail, Lock, User, Phone, Check, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const COUNTRIES = [
  "Sri Lanka", "India", "United Kingdom", "United States", "Australia", 
  "Germany", "France", "Canada", "Japan", "Maldives", "Singapore", "UAE"
];

export default function RepresentativesPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [reps, setReps] = useState<any[]>([]);

  const fetchReps = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("role", "representative")
      .order("custom_id", { ascending: true });
    
    if (!error && data) {
      setReps(data);
    }
  };

  useEffect(() => {
    fetchReps();
  }, []);

  const handleAddRep = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register-rep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          country,
          contactNumber: phone
        })
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to add representative");
      }

      setSuccess(`Successfully added representative: ${name}`);
      setName("");
      setEmail("");
      setPassword("");
      setCountry("");
      setPhone("");
      setShowAddForm(false);
      fetchReps(); // Refresh list
      
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Global Representatives</h1>
          <p className="text-slate-400 mt-1">Manage and assign country representatives.</p>
        </div>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#d4af37] hover:bg-[#e8c84a] text-black font-semibold py-2.5 px-5 rounded-xl transition flex items-center gap-2 text-sm"
        >
          <Plus className="w-4 h-4" />
          Add Representative
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111827] border border-white/5 rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-white mb-4">Register New Representative</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm flex items-center gap-2">
              <Check className="w-4 h-4" /> {success}
            </div>
          )}

          <form onSubmit={handleAddRep} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input required value={name} onChange={e => setName(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:border-[#d4af37] outline-none transition" placeholder="John Doe" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input required value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:border-[#d4af37] outline-none transition" placeholder="rep@ihvtravel.com" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Assigned Country</label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <select required value={country} onChange={e => setCountry(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:border-[#d4af37] outline-none transition appearance-none">
                  <option value="" className="bg-[#030712] text-slate-500">Select Country</option>
                  {COUNTRIES.map(c => <option key={c} value={c} className="bg-[#030712]">{c}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Contact Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input required value={phone} onChange={e => setPhone(e.target.value)} type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:border-[#d4af37] outline-none transition" placeholder="+1 234 567 890" />
              </div>
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Password for Login</label>
              <div className="relative max-w-md">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input required value={password} onChange={e => setPassword(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:border-[#d4af37] outline-none transition" placeholder="TempPass123!" />
              </div>
            </div>

            <div className="md:col-span-2 flex justify-end mt-2">
              <button disabled={loading} type="submit" className="bg-[#d4af37] hover:bg-[#e8c84a] text-black font-semibold py-2.5 px-6 rounded-xl transition flex items-center gap-2 text-sm disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                {loading ? "Registering..." : "Save Representative"}
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Reps Info Table */}
      <div className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white/5 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Rep ID</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Country</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {reps.length > 0 ? (
                reps.map(rep => (
                  <tr key={rep.id} className="hover:bg-white/[0.02] transition">
                    <td className="px-6 py-4 font-mono text-[#d4af37]">{rep.custom_id}</td>
                    <td className="px-6 py-4 text-slate-200 font-medium">{rep.full_name}</td>
                    <td className="px-6 py-4 text-slate-400">{rep.country}</td>
                    <td className="px-6 py-4 text-slate-400">{rep.email}</td>
                    <td className="px-6 py-4 text-slate-400">{rep.contact_number}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <Globe className="w-10 h-10 mx-auto text-slate-600 mb-3" />
                    <p>No Global Representatives found.</p>
                    <p className="text-xs mt-1">Their IDs will be automatically generated as REP-XXX-0001</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
