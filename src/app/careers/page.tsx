"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SharedNav, SharedFooter } from "@/components/SharedNav";
import {
  Briefcase, MapPin, Clock, ChevronRight, ChevronLeft, Search, X,
  TrendingUp, Users, GraduationCap, Building2,
  Code2, Database, TestTube, BarChart3, Brain, Shield, Network,
  Layers, Globe, Cpu, Lock, LineChart, MonitorSmartphone,
  Cloud, Settings, PenTool, Headphones, FileText, Zap,
  Upload, CheckCircle2, Loader2,
} from "lucide-react";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const BENEFITS = [
  { icon: GraduationCap, title: "Paid Internships",       desc: "Earn while you learn with competitive stipends and real project exposure." },
  { icon: Users,         title: "Mentorship & Training",  desc: "Guided by senior engineers and industry leaders from day one." },
  { icon: TrendingUp,    title: "Career Growth",          desc: "Clear promotion tracks, skill certifications, and leadership pipelines." },
  { icon: Building2,     title: "Professional Environment", desc: "World-class workspace, remote options, and a collaborative culture." },
];

const STATS = [
  { v: "40+",  l: "Open Positions" },
  { v: "12",   l: "Departments" },
  { v: "Global",  l: "Hiring Worldwide" },
  { v: "250+", l: "Team Members" },
];

type Job = {
  id: number; title: string; dept: string; location: string;
  type: string; level: string; icon: React.ElementType; tags: string[];
};

const JOBS: Job[] = [
  { id:1,  title:"Senior Full-Stack Engineer",         dept:"Developers",                   location:"Dubai / Remote", type:"Full-time", level:"Senior", icon:Code2,             tags:["React","Node.js","TypeScript"] },
  { id:2,  title:"Frontend Developer (React/Next.js)", dept:"Developers",                   location:"Lahore",         type:"Full-time", level:"Mid",    icon:MonitorSmartphone, tags:["React","Next.js","TailwindCSS"] },
  { id:3,  title:"Backend Developer (.NET / C#)",      dept:"Developers",                   location:"Remote",         type:"Full-time", level:"Mid",    icon:Code2,             tags:[".NET","C#","REST APIs"] },
  { id:4,  title:"Mobile Developer (Flutter)",         dept:"Developers",                   location:"Dubai",          type:"Full-time", level:"Mid",    icon:Cpu,               tags:["Flutter","Dart","iOS/Android"] },
  { id:5,  title:"Junior Web Developer",               dept:"Developers",                   location:"Karachi",        type:"Full-time", level:"Junior", icon:Code2,             tags:["HTML","CSS","JavaScript"] },
  { id:6,  title:"WordPress / Shopify Developer",      dept:"Developers",                   location:"Remote",         type:"Contract",  level:"Mid",    icon:Globe,             tags:["WordPress","Shopify","PHP"] },
  { id:7,  title:"DevOps Engineer",                    dept:"Developers",                   location:"Remote",         type:"Full-time", level:"Senior", icon:Settings,          tags:["Docker","Kubernetes","CI/CD"] },
  { id:8,  title:"Senior Database Administrator",      dept:"Database Engineers",           location:"Dubai",          type:"Full-time", level:"Senior", icon:Database,          tags:["Oracle","PostgreSQL","Performance Tuning"] },
  { id:9,  title:"SQL / BI Engineer",                  dept:"Database Engineers",           location:"Remote",         type:"Full-time", level:"Mid",    icon:Database,          tags:["SQL Server","Power BI","SSRS"] },
  { id:10, title:"Data Engineer (ETL Pipelines)",      dept:"Database Engineers",           location:"Remote",         type:"Full-time", level:"Mid",    icon:Layers,            tags:["Python","Apache Spark","Airflow"] },
  { id:11, title:"Cloud Database Engineer (AWS/Azure)",dept:"Database Engineers",           location:"Remote",         type:"Full-time", level:"Senior", icon:Cloud,             tags:["AWS RDS","Azure SQL","DynamoDB"] },
  { id:12, title:"Junior Database Analyst",            dept:"Database Engineers",           location:"Lahore",         type:"Full-time", level:"Junior", icon:Database,          tags:["MySQL","PostgreSQL","Data Modeling"] },
  { id:13, title:"Senior QA Automation Engineer",      dept:"QA Engineers",                 location:"Remote",         type:"Full-time", level:"Senior", icon:TestTube,          tags:["Selenium","Cypress","JIRA"] },
  { id:14, title:"Manual QA Engineer",                 dept:"QA Engineers",                 location:"Lahore",         type:"Full-time", level:"Mid",    icon:TestTube,          tags:["Test Plans","Bug Tracking","Agile"] },
  { id:15, title:"Mobile QA Engineer",                 dept:"QA Engineers",                 location:"Remote",         type:"Full-time", level:"Mid",    icon:TestTube,          tags:["Appium","iOS/Android","Performance"] },
  { id:16, title:"QA Lead",                            dept:"QA Engineers",                 location:"Dubai",          type:"Full-time", level:"Senior", icon:TestTube,          tags:["Team Lead","Strategy","Automation"] },
  { id:17, title:"Junior QA Tester",                   dept:"QA Engineers",                 location:"Karachi",        type:"Full-time", level:"Junior", icon:TestTube,          tags:["Manual Testing","Documentation","SDLC"] },
  { id:18, title:"Senior Project Manager (IT)",        dept:"Project Managers",             location:"Dubai",          type:"Full-time", level:"Senior", icon:Briefcase,         tags:["PMP","Agile","Stakeholder Mgmt"] },
  { id:19, title:"Scrum Master",                       dept:"Project Managers",             location:"Remote",         type:"Full-time", level:"Mid",    icon:Zap,               tags:["Scrum","Kanban","Confluence"] },
  { id:20, title:"Technical Project Manager",          dept:"Project Managers",             location:"Dubai / Remote", type:"Full-time", level:"Senior", icon:Briefcase,         tags:["SDLC","Budget Control","Risk Mgmt"] },
  { id:21, title:"Junior Project Coordinator",         dept:"Project Managers",             location:"Lahore",         type:"Full-time", level:"Junior", icon:FileText,          tags:["MS Project","Documentation","Reporting"] },
  { id:22, title:"Delivery Manager",                   dept:"Project Managers",             location:"Dubai",          type:"Full-time", level:"Lead",   icon:Briefcase,         tags:["Client Relations","KPIs","Delivery"] },
  { id:23, title:"Senior Business Analyst (ERP)",      dept:"Business Analysts",            location:"Dubai",          type:"Full-time", level:"Senior", icon:BarChart3,         tags:["SAP","Oracle ERP","Process Mapping"] },
  { id:24, title:"Business Systems Analyst",           dept:"Business Analysts",            location:"Remote",         type:"Full-time", level:"Mid",    icon:BarChart3,         tags:["Requirements","BPMN","UAT"] },
  { id:25, title:"Data Analyst",                       dept:"Business Analysts",            location:"Remote",         type:"Full-time", level:"Mid",    icon:LineChart,         tags:["Power BI","Excel","SQL"] },
  { id:26, title:"Product Analyst",                    dept:"Business Analysts",            location:"Dubai / Remote", type:"Full-time", level:"Mid",    icon:BarChart3,         tags:["Roadmapping","User Research","Metrics"] },
  { id:27, title:"Junior Business Analyst",            dept:"Business Analysts",            location:"Lahore",         type:"Full-time", level:"Junior", icon:BarChart3,         tags:["Documentation","Wireframes","Stakeholders"] },
  { id:28, title:"AI/ML Engineer (LLMs)",              dept:"AI Engineers",                 location:"Remote",         type:"Full-time", level:"Senior", icon:Brain,             tags:["Python","LangChain","OpenAI","RAG"] },
  { id:29, title:"Computer Vision Engineer",           dept:"AI Engineers",                 location:"Remote",         type:"Full-time", level:"Senior", icon:Brain,             tags:["PyTorch","OpenCV","YOLO"] },
  { id:30, title:"NLP Engineer",                       dept:"AI Engineers",                 location:"Remote",         type:"Full-time", level:"Mid",    icon:Brain,             tags:["HuggingFace","Transformers","BERT"] },
  { id:31, title:"MLOps Engineer",                     dept:"AI Engineers",                 location:"Remote",         type:"Full-time", level:"Senior", icon:Cpu,               tags:["MLflow","Kubeflow","Model Deployment"] },
  { id:32, title:"AI Product Engineer",                dept:"AI Engineers",                 location:"Dubai",          type:"Full-time", level:"Mid",    icon:Brain,             tags:["Prompt Engineering","API Integration","AI UX"] },
  { id:33, title:"Junior AI Engineer",                 dept:"AI Engineers",                 location:"Remote",         type:"Full-time", level:"Junior", icon:Brain,             tags:["Python","ML Basics","TensorFlow"] },
  { id:34, title:"Senior Network Engineer",            dept:"Network & Security Engineers", location:"Dubai",          type:"Full-time", level:"Senior", icon:Network,           tags:["Cisco","Aruba","CCNP"] },
  { id:35, title:"Cybersecurity Analyst",              dept:"Network & Security Engineers", location:"Dubai / Remote", type:"Full-time", level:"Mid",    icon:Shield,            tags:["SIEM","SOC","CrowdStrike"] },
  { id:36, title:"Penetration Tester",                 dept:"Network & Security Engineers", location:"Remote",         type:"Contract",  level:"Senior", icon:Lock,              tags:["Ethical Hacking","OSCP","Kali Linux"] },
  { id:37, title:"Cloud Security Engineer",            dept:"Network & Security Engineers", location:"Remote",         type:"Full-time", level:"Senior", icon:Shield,            tags:["AWS","Azure","Zero Trust"] },
  { id:38, title:"Junior Network Technician",          dept:"Network & Security Engineers", location:"Lahore",         type:"Full-time", level:"Junior", icon:Network,           tags:["LAN/WAN","Troubleshooting","Cisco"] },
  { id:39, title:"UI/UX Designer",                     dept:"Design & UX",                  location:"Remote",         type:"Full-time", level:"Mid",    icon:PenTool,           tags:["Figma","User Research","Design Systems"] },
  { id:40, title:"IT Support Specialist",              dept:"IT Support",                   location:"Dubai",          type:"Full-time", level:"Junior", icon:Headphones,        tags:["Helpdesk","Windows","Active Directory"] },
];

const DEPTS  = ["All", ...Array.from(new Set(JOBS.map(j => j.dept)))];
const LEVELS = ["All Levels", "Junior", "Mid", "Senior", "Lead"];
const PER_PAGE = 10;

const DEPT_COLORS: Record<string, string> = {
  "Developers":                   "#2563FF",
  "Database Engineers":           "#7C3AED",
  "QA Engineers":                 "#059669",
  "Project Managers":             "#D97706",
  "Business Analysts":            "#DC2626",
  "AI Engineers":                 "#0891B2",
  "Network & Security Engineers": "#BE123C",
  "Design & UX":                  "#9333EA",
  "IT Support":                   "#64748B",
};

/* ─── Floating Label Input ─────────────────────────────────────────── */
type FloatInputProps = {
  id: string; label: string; type?: string; value: string;
  onChange: (v: string) => void; error?: string; required?: boolean;
  as?: "input" | "textarea";
};
function FloatInput({ id, label, type = "text", value, onChange, error, required, as = "input" }: FloatInputProps) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  const border = error ? "#EF4444" : focused ? "#2563FF" : "#E2E8F0";
  const shadow = focused ? (error ? "0 0 0 3px rgba(239,68,68,0.12)" : "0 0 0 3px rgba(37,99,255,0.10)") : "none";
  const Tag = as;
  return (
    <div className="relative">
      <label htmlFor={id} className="absolute left-4 pointer-events-none transition-all duration-200 select-none"
        style={{ top: lifted ? 8 : "50%", transform: lifted ? "none" : "translateY(-50%)", fontSize: lifted ? 10 : 14, fontWeight: lifted ? 600 : 400, color: error ? "#EF4444" : focused ? "#2563FF" : "#94A3B8", letterSpacing: lifted ? "0.05em" : 0, textTransform: lifted ? "uppercase" : "none" }}>
        {label}{required && " *"}
      </label>
      <Tag
        id={id} type={as === "input" ? type : undefined}
        value={value}
        rows={as === "textarea" ? 4 : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value)}
        className="w-full outline-none transition-all duration-200 resize-none"
        style={{ paddingTop: lifted ? 22 : 14, paddingBottom: 10, paddingLeft: 16, paddingRight: 16, borderRadius: 14, border: `1.5px solid ${border}`, boxShadow: shadow, background: "#FAFBFF", fontSize: 14, color: "#0F172A", fontFamily: "inherit" }}
      />
      {error && (
        <p className="flex items-center gap-1 mt-1.5" style={{ fontSize: 12, color: "#EF4444" }}>
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

/* ─── Apply Modal ─────────────────────────────────────────────────── */
type ApplyModalProps = { job: Job; onClose: () => void };

function ApplyModal({ job, onClose }: ApplyModalProps) {
  const accent = DEPT_COLORS[job.dept] ?? "#2563FF";
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", experience: "", linkedin: "", message: "" });
  const [fileInfo, setFileInfo] = useState<{ name: string; size: string } | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [onClose]);

  const setField = (k: keyof typeof form) => (v: string) => setForm(p => ({ ...p, [k]: v }));

  const attachFile = (file: File | undefined) => {
    if (!file) return;
    const mb = (file.size / 1024 / 1024).toFixed(1);
    setFileInfo({ name: file.name, size: `${mb} MB` });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())  e.name  = "Please enter your full name";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email address";
    if (!form.experience)   e.experience = "Please select your experience level";
    if (!fileInfo)          e.cv = "Please upload your CV before submitting";
    return e;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setStatus("loading");
    await new Promise(r => setTimeout(r, 1600));
    setStatus("success");
  };

  const EXP_OPTIONS = [
    { v: "0-1", l: "Less than 1 year", sub: "Entry level / Fresh graduate" },
    { v: "1-3", l: "1 – 3 years",      sub: "Junior professional" },
    { v: "3-5", l: "3 – 5 years",      sub: "Mid-level" },
    { v: "5-8", l: "5 – 8 years",      sub: "Senior professional" },
    { v: "8+",  l: "8+ years",         sub: "Lead / Principal" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: "rgba(4,15,50,0.65)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 70, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.97 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="w-full sm:max-w-[660px] rounded-t-[28px] sm:rounded-[28px] flex flex-col"
        style={{ background: "#fff", maxHeight: "95vh" }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Sticky header with gradient accent bar ── */}
        <div className="flex-shrink-0 rounded-t-[28px] sm:rounded-t-[28px] overflow-hidden">
          <div style={{ height: 4, background: `linear-gradient(90deg,${accent},${accent}88,transparent)` }} />
          <div className="flex items-start justify-between px-8 pt-6 pb-5" style={{ borderBottom: "1px solid #F1F5F9" }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: `${accent}12` }}>
                <job.icon size={22} color={accent} strokeWidth={1.8} />
              </div>
              <div>
                <p className="font-bold uppercase tracking-widest mb-1" style={{ fontSize: 10, color: accent }}>{job.dept}</p>
                <h2 className="font-extrabold text-[#0F172A] leading-tight" style={{ fontSize: "clamp(16px,2vw,20px)" }}>{job.title}</h2>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2">
                  <span className="flex items-center gap-1" style={{ fontSize: 12, color: "#64748B" }}><MapPin size={11} strokeWidth={2} />{job.location}</span>
                  <span className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
                  <span className="flex items-center gap-1" style={{ fontSize: 12, color: "#64748B" }}><Clock size={11} strokeWidth={2} />{job.type}</span>
                  <span className="w-1 h-1 rounded-full bg-[#CBD5E1]" />
                  <span className="px-2.5 py-0.5 rounded-full font-semibold" style={{ fontSize: 11, background: `${accent}12`, color: accent }}>{job.level}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose}
              className="ml-3 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:rotate-90"
              style={{ background: "#F1F5F9" }}>
              <X size={16} color="#64748B" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-8 py-6" style={{ overscrollBehavior: "contain" }}>
          {status === "success" ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="text-center py-12">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ background: `linear-gradient(135deg,${accent}20,${accent}08)`, border: `2px solid ${accent}30` }}>
                <CheckCircle2 size={38} color={accent} strokeWidth={1.8} />
              </motion.div>
              <h3 className="font-extrabold text-[#0F172A] mb-2" style={{ fontSize: 22 }}>Application Sent!</h3>
              <p className="text-[#64748B] mb-2 mx-auto" style={{ fontSize: 15, maxWidth: 380, lineHeight: 1.6 }}>
                Thank you for applying to <strong className="text-[#0F172A]">{job.title}</strong>. Our talent team will review your profile and reach out within <strong className="text-[#0F172A]">3–5 business days</strong>.
              </p>
              <p className="text-[#94A3B8] mb-10" style={{ fontSize: 13 }}>Check your inbox — a confirmation has been sent to {form.email || "your email"}.</p>
              <button onClick={onClose}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-white transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg,${accent},${accent}BB)`, fontSize: 14, boxShadow: `0 6px 24px ${accent}40` }}>
                Back to Openings
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Section label */}
              <p className="font-bold text-[#0F172A] mb-5" style={{ fontSize: 13, letterSpacing: "0.03em" }}>
                Personal Information
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <FloatInput id="name"  label="Full Name"     value={form.name}  onChange={setField("name")}  error={errors.name}  required />
                <FloatInput id="email" label="Email Address" type="email" value={form.email} onChange={setField("email")} error={errors.email} required />
                <FloatInput id="phone" label="Phone Number"  type="tel"  value={form.phone} onChange={setField("phone")} />
                <FloatInput id="linkedin" label="LinkedIn URL" value={form.linkedin} onChange={setField("linkedin")} />
              </div>

              {/* Experience */}
              <p className="font-bold text-[#0F172A] mt-7 mb-4" style={{ fontSize: 13, letterSpacing: "0.03em" }}>Experience Level</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-1">
                {EXP_OPTIONS.map(opt => {
                  const sel = form.experience === opt.v;
                  return (
                    <button key={opt.v} type="button" onClick={() => { setForm(p => ({ ...p, experience: opt.v })); setErrors(p => ({ ...p, experience: "" })); }}
                      className="text-left px-4 py-3 rounded-2xl transition-all"
                      style={{ border: sel ? `2px solid ${accent}` : "1.5px solid #E2E8F0", background: sel ? `${accent}08` : "#FAFBFF", boxShadow: sel ? `0 4px 16px ${accent}18` : "none" }}>
                      <p className="font-bold" style={{ fontSize: 13, color: sel ? accent : "#0F172A" }}>{opt.l}</p>
                      <p style={{ fontSize: 11, color: sel ? accent : "#94A3B8", marginTop: 2 }}>{opt.sub}</p>
                    </button>
                  );
                })}
              </div>
              {errors.experience && <p className="flex items-center gap-1 mt-2" style={{ fontSize: 12, color: "#EF4444" }}><span>⚠</span> {errors.experience}</p>}

              {/* CV Upload */}
              <p className="font-bold text-[#0F172A] mt-7 mb-4" style={{ fontSize: 13, letterSpacing: "0.03em" }}>
                Resume / CV <span style={{ color: "#EF4444" }}>*</span>
              </p>
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); attachFile(e.dataTransfer.files[0]); if (errors.cv) setErrors(p => ({ ...p, cv: "" })); }}
                onClick={() => fileRef.current?.click()}
                className="rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all select-none"
                style={{ border: errors.cv ? "2px solid #EF4444" : dragOver ? `2px solid ${accent}` : fileInfo ? `2px solid ${accent}` : "2px dashed #CBD5E1", background: errors.cv ? "#FFF5F5" : dragOver ? `${accent}06` : fileInfo ? `${accent}04` : "#FAFBFF", padding: "28px 20px", boxShadow: errors.cv ? "0 0 0 4px rgba(239,68,68,0.08)" : dragOver ? `0 0 0 4px ${accent}12` : "none" }}>
                {fileInfo ? (
                  <div className="flex items-center gap-3 w-full max-w-xs">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${accent}15` }}>
                      <FileText size={18} color={accent} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#0F172A] truncate" style={{ fontSize: 13 }}>{fileInfo.name}</p>
                      <p style={{ fontSize: 12, color: "#64748B" }}>{fileInfo.size}</p>
                    </div>
                    <button type="button" onClick={e => { e.stopPropagation(); setFileInfo(null); if (fileRef.current) fileRef.current.value = ""; }}
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-[#FEE2E2] transition-colors">
                      <X size={13} color="#94A3B8" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background: `${accent}10` }}>
                      <Upload size={22} color={accent} strokeWidth={1.8} />
                    </div>
                    <p className="font-semibold text-[#0F172A]" style={{ fontSize: 14 }}>Drop your CV here, or <span style={{ color: accent }}>browse</span></p>
                    <p style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>PDF, DOC, or DOCX · Max 5 MB</p>
                  </>
                )}
              </div>
              <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden"
                onChange={e => { attachFile(e.target.files?.[0]); if (errors.cv) setErrors(p => ({ ...p, cv: "" })); }} />
              {errors.cv && (
                <p className="flex items-center gap-1 mt-2" style={{ fontSize: 12, color: "#EF4444" }}>
                  <span>⚠</span> {errors.cv}
                </p>
              )}

              {/* Cover note */}
              <p className="font-bold text-[#0F172A] mt-7 mb-4" style={{ fontSize: 13, letterSpacing: "0.03em" }}>
                Cover Note <span className="font-normal text-[#94A3B8]">— optional</span>
              </p>
              <FloatInput id="message" label="Why are you a great fit for this role?" value={form.message} onChange={setField("message")} as="textarea" />

              {/* Required note */}
              <p className="mt-4 mb-6" style={{ fontSize: 12, color: "#94A3B8" }}>Fields marked with * are required.</p>

              {/* Submit */}
              <button type="submit" disabled={status === "loading"}
                className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-2.5 transition-all hover:scale-[1.015] active:scale-[0.99]"
                style={{ background: `linear-gradient(135deg,${accent} 0%,${accent}BB 100%)`, fontSize: 15, boxShadow: `0 8px 28px ${accent}45`, letterSpacing: "0.01em" }}>
                {status === "loading"
                  ? <><Loader2 size={18} className="animate-spin" /> Submitting your application…</>
                  : <>Submit Application <ChevronRight size={17} strokeWidth={2.5} /></>}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Page ───────────────────────────────────────────────────── */
export default function CareersPage() {
  const [search,   setSearch]   = useState("");
  const [dept,     setDept]     = useState("All");
  const [level,    setLevel]    = useState("All Levels");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [page,     setPage]     = useState(1);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  const filtered = JOBS.filter(j => {
    const q = search.toLowerCase();
    const matchSearch = !q || j.title.toLowerCase().includes(q) || j.tags.some(t => t.toLowerCase().includes(q)) || j.dept.toLowerCase().includes(q);
    return matchSearch && (dept === "All" || j.dept === dept) && (level === "All Levels" || j.level === level);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const resetPage  = () => { setPage(1); setExpanded(null); };

  const scrollToBoard = () => boardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const goPage = (n: number) => {
    setPage(n);
    setExpanded(null);
    scrollToBoard();
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <SharedNav />

      {/* ── Apply Modal ── */}
      <AnimatePresence>
        {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ paddingTop: 160, paddingBottom: 100, background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 35%,#3B5BFF 65%,#6C3CFF 100%)" }}>
        <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="absolute top-[-80px] right-[-80px] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(108,60,255,0.35) 0%,transparent 70%)" }} />
        <div className="absolute bottom-[-40px] left-[-40px] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle,rgba(37,99,255,0.25) 0%,transparent 70%)" }} />
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
          <motion.p {...fade(0)} className="text-blue-300 font-semibold uppercase tracking-widest mb-3" style={{ fontSize: 12 }}>Join Our Team</motion.p>
          <motion.h1 {...fade(0.1)} className="text-white font-extrabold mb-4" style={{ fontSize: "clamp(38px,4.5vw,66px)", letterSpacing: "-1.5px", lineHeight: 1.08, maxWidth: 720 }}>
            Your Career,{" "}
            <span style={{ background: "linear-gradient(90deg,#A5B4FC,#C084FC)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Starts Here.</span>
          </motion.h1>
          <motion.p {...fade(0.2)} className="text-white/70 leading-relaxed mb-12" style={{ fontSize: 17, maxWidth: 560 }}>
            Build the future of enterprise technology with a team that operates globally. 40+ open roles waiting for the right talent.
          </motion.p>
          <motion.div {...fade(0.3)} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div key={i} className="rounded-2xl p-5 text-center" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
                <p className="text-white font-extrabold" style={{ fontSize: 34 }}>{s.v}</p>
                <p className="text-white/60 font-medium" style={{ fontSize: 13 }}>{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Why Join Us ── */}
      <section className="bg-white" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <motion.div {...fade()} className="text-center mb-14">
            <p className="text-[#2563FF] font-semibold uppercase tracking-widest mb-2" style={{ fontSize: 12 }}>Why Ivy League Solutions</p>
            <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(28px,3vw,42px)", letterSpacing: "-0.5px" }}>More Than Just a Job</h2>
            <p className="text-[#64748B] mt-3 mx-auto" style={{ fontSize: 16, maxWidth: 520 }}>We invest in your growth, not just your output.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div key={i} {...fade(i * 0.08)} whileHover={{ y: -6, boxShadow: "0 24px 50px rgba(37,99,255,0.12)" }} transition={{ duration: 0.25 }}
                className="rounded-2xl p-7 text-center cursor-default" style={{ background: "linear-gradient(160deg,#F0F4FF 0%,#FAF5FF 100%)", border: "1px solid #E0E7FF" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "linear-gradient(135deg,#2563FF,#6C3CFF)" }}>
                  <b.icon size={26} color="#fff" strokeWidth={1.8} />
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2" style={{ fontSize: 16 }}>{b.title}</h3>
                <p className="text-[#64748B] leading-relaxed" style={{ fontSize: 14 }}>{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── We're Hiring Banner ── */}
      <section style={{ background: "linear-gradient(135deg,#0F172A 0%,#1E3A8A 100%)", paddingTop: 70, paddingBottom: 70 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14 text-center">
          <motion.p {...fade(0)} className="font-extrabold text-white mb-4" style={{ fontSize: "clamp(32px,4vw,52px)", letterSpacing: "-1px" }}>
            We&apos;re{" "}
            <span style={{ background: "linear-gradient(90deg,#60A5FA,#A78BFA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Hiring</span>
          </motion.p>
          <div className="w-16 mx-auto mb-8 rounded-full" style={{ height: 3, background: "linear-gradient(90deg,#2563FF,#6C3CFF)" }} />
          <motion.div {...fade(0.1)} className="flex flex-wrap justify-center gap-3">
            {["Developers","Database Engineers","QA Engineers","Project Managers","Business Analysts","AI Engineers","Network & Security Engineers"].map((role, i) => (
              <span key={i} className="px-5 py-2 rounded-full font-semibold" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)", fontSize: 14 }}>
                {role}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Jobs Board ── */}
      <section ref={boardRef} className="bg-[#F8FAFF]" style={{ paddingTop: 100, paddingBottom: 120, scrollMarginTop: 100 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <motion.div {...fade()} className="mb-10">
            <p className="text-[#2563FF] font-semibold uppercase tracking-widest mb-2" style={{ fontSize: 12 }}>Open Positions</p>
            <h2 className="text-[#0F172A] font-bold" style={{ fontSize: "clamp(28px,3vw,40px)", letterSpacing: "-0.5px" }}>Find Your Role</h2>
          </motion.div>

          {/* Search bar */}
          <motion.div {...fade(0.1)} className="relative mb-6" style={{ maxWidth: 480 }}>
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" strokeWidth={2} />
            <input value={search} onChange={e => { setSearch(e.target.value); resetPage(); }} placeholder="Search roles, skills, departments…"
              className="w-full pl-11 pr-10 outline-none text-[#0F172A]"
              style={{ height: 48, borderRadius: 12, border: "1.5px solid #E2E8F0", background: "#fff", fontSize: 14, boxShadow: "0 2px 8px rgba(15,23,42,0.05)" }} />
            {search && (
              <button onClick={() => { setSearch(""); resetPage(); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]">
                <X size={14} />
              </button>
            )}
          </motion.div>

          {/* Department filter pills */}
          <motion.div {...fade(0.15)} className="flex flex-wrap gap-2 mb-4">
            {DEPTS.map(d => (
              <button key={d} onClick={() => { setDept(d); resetPage(); }}
                className="px-4 py-2 rounded-full font-semibold text-sm transition-all"
                style={{
                  background: dept === d ? "linear-gradient(135deg,#2F6BFF,#2563FF)" : "#fff",
                  color: dept === d ? "#fff" : "#64748B",
                  border: dept === d ? "none" : "1.5px solid #E2E8F0",
                  boxShadow: dept === d ? "0 4px 14px rgba(37,99,255,0.3)" : "none",
                  cursor: "pointer",
                  fontSize: 13,
                }}>
                {d}
              </button>
            ))}
          </motion.div>

          {/* Level filter pills */}
          <motion.div {...fade(0.2)} className="flex flex-wrap gap-2 mb-8">
            {LEVELS.map(l => (
              <button key={l} onClick={() => { setLevel(l); resetPage(); }}
                className="px-4 py-1.5 rounded-full font-semibold transition-all"
                style={{
                  background: level === l ? "#0F172A" : "#fff",
                  color: level === l ? "#fff" : "#64748B",
                  border: level === l ? "none" : "1.5px solid #E2E8F0",
                  boxShadow: level === l ? "0 4px 12px rgba(15,23,42,0.2)" : "none",
                  cursor: "pointer",
                  fontSize: 12,
                }}>
                {l}
              </button>
            ))}
          </motion.div>

          {/* Results count */}
          <p className="text-[#64748B] mb-6" style={{ fontSize: 14 }}>
            Showing <strong className="text-[#0F172A]">{(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)}</strong> of <strong className="text-[#0F172A]">{filtered.length}</strong> openings
          </p>

          {/* Job cards */}
          <AnimatePresence mode="popLayout">
            <div className="flex flex-col gap-3">
              {paginated.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center py-20 text-[#94A3B8]" style={{ fontSize: 16 }}>
                  No roles match your search. Try different keywords.
                </motion.div>
              ) : paginated.map((job, i) => {
                const accent  = DEPT_COLORS[job.dept] ?? "#2563FF";
                const isOpen  = expanded === job.id;
                return (
                  <motion.div key={job.id}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="rounded-2xl overflow-hidden cursor-pointer"
                    style={{ background: "#fff", border: isOpen ? `1.5px solid ${accent}` : "1.5px solid #E2E8F0", boxShadow: isOpen ? `0 8px 32px ${accent}18` : "0 2px 12px rgba(15,23,42,0.05)" }}
                    onClick={() => setExpanded(isOpen ? null : job.id)}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-4 px-6 py-5">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `${accent}15` }}>
                          <job.icon size={20} color={accent} strokeWidth={1.8} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#0F172A] truncate" style={{ fontSize: 15 }}>{job.title}</p>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                            <span className="font-semibold" style={{ fontSize: 12, color: accent }}>{job.dept}</span>
                            <span className="flex items-center gap-1 text-[#94A3B8]" style={{ fontSize: 12 }}><MapPin size={11} />{job.location}</span>
                            <span className="flex items-center gap-1 text-[#94A3B8]" style={{ fontSize: 12 }}><Clock size={11} />{job.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="hidden sm:inline-flex px-3 py-1 rounded-full font-semibold" style={{ fontSize: 11, background: `${accent}12`, color: accent }}>{job.level}</span>
                        <ChevronRight size={18} color="#CBD5E1" style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.25s" }} />
                      </div>
                    </div>

                    {/* Expanded */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: "hidden", borderTop: `1px solid ${accent}22` }}
                        >
                          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ background: `${accent}06` }}>
                            <div className="flex flex-wrap gap-2">
                              {job.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 rounded-full font-medium" style={{ fontSize: 12, background: `${accent}12`, color: accent, border: `1px solid ${accent}25` }}>{tag}</span>
                              ))}
                            </div>
                            <button
                              onClick={e => { e.stopPropagation(); setApplyJob(job); }}
                              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                              style={{ background: `linear-gradient(135deg,${accent},${accent}CC)`, fontSize: 14, boxShadow: `0 4px 16px ${accent}40` }}
                            >
                              Apply Now <ChevronRight size={15} />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
              <button onClick={() => goPage(page - 1)} disabled={page === 1}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white"
                style={{ border: "1.5px solid #E2E8F0", background: page === 1 ? "transparent" : "#fff" }}>
                <ChevronLeft size={18} color="#64748B" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => {
                const isCur = n === page;
                return (
                  <button key={n} onClick={() => goPage(n)}
                    className="w-10 h-10 rounded-xl font-semibold transition-all"
                    style={{ background: isCur ? "linear-gradient(135deg,#2563FF,#6C3CFF)" : "#fff", color: isCur ? "#fff" : "#64748B", border: isCur ? "none" : "1.5px solid #E2E8F0", fontSize: 14, boxShadow: isCur ? "0 4px 16px rgba(37,99,255,0.35)" : "none" }}>
                    {n}
                  </button>
                );
              })}

              <button onClick={() => goPage(page + 1)} disabled={page === totalPages}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white"
                style={{ border: "1.5px solid #E2E8F0", background: page === totalPages ? "transparent" : "#fff" }}>
                <ChevronRight size={18} color="#64748B" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <div className="max-w-[1280px] mx-auto px-6 sm:px-10 lg:px-14">
          <motion.div {...fade()} className="rounded-3xl overflow-hidden relative" style={{ background: "linear-gradient(135deg,#071B8F 0%,#0A2BA8 40%,#6C3CFF 100%)", padding: "clamp(48px,6vw,80px)" }}>
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.8) 1px,transparent 1px)", backgroundSize: "32px 32px" }} />
            <div className="relative z-10 text-center">
              <p className="text-blue-300 font-semibold uppercase tracking-widest mb-3" style={{ fontSize: 12 }}>Don&apos;t See a Fit?</p>
              <h2 className="text-white font-extrabold mb-4" style={{ fontSize: "clamp(26px,3vw,42px)", letterSpacing: "-0.5px" }}>Send Us Your CV Anyway</h2>
              <p className="text-white/65 mb-8 mx-auto" style={{ fontSize: 16, maxWidth: 480 }}>
                We&apos;re always looking for exceptional talent. Drop us your resume and we&apos;ll reach out when the right role opens.
              </p>
              <button
                onClick={() => setApplyJob({ id: 0, title: "General Application", dept: "General", location: "Any", type: "Full-time", level: "Any", icon: Briefcase, tags: [] })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[#0F172A] transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg,#FFFFFF,#E0E7FF)", fontSize: 15, boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}>
                Submit General Application <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <SharedFooter />
    </div>
  );
}
