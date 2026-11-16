"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  Stethoscope,
  FileCheck,
  PlaneTakeoff,
  UserCheck,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  PhoneCall,
  Clock,
  Award,
  Building2,
  Send,
  HelpCircle,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  MessageSquareQuote,
  Activity,
  Heart,
  FileText,
  BedDouble,
  Compass
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { fireBookingConfetti } from "@/lib/booking-confetti";

interface CoreService {
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  highlights: string[];
}

const MEDICAL_SERVICES: CoreService[] = [
  {
    number: "01",
    title: "International Patient Referrals",
    tagline: "Direct Access to Sri Lanka's Preeminent Specialist Physicians",
    description:
      "Coordinating referrals for patients seeking specialist medical treatments and procedures in Sri Lanka. We liaise directly between international patients, their primary doctors, and leading Sri Lankan consultant specialists across all major surgical and clinical disciplines.",
    icon: <Stethoscope className="w-6 h-6 text-[#d4af37]" />,
    image: "/images/medical-services/International Patient Referrals.png",
    highlights: [
      "Access to 500+ UK, US & Commonwealth board-certified consultant doctors",
      "Expedited fast-track admissions with zero waiting lists",
      "Multi-disciplinary medical board evaluations for complex conditions",
      "Seamless transfer of cross-border medical histories and clinical records"
    ]
  },
  {
    number: "02",
    title: "Specialist Medical Consultations",
    tagline: "Comprehensive Preliminary Assessments & Expert Second Opinions",
    description:
      "Arranging preliminary consultations, medical assessments and second opinions with relevant Sri Lankan medical specialists. Patients can engage in secure video teleconsultations and obtain rigorous review of diagnostic images, scans, and pathology reports before traveling.",
    icon: <Activity className="w-6 h-6 text-[#d4af37]" />,
    image: "/images/medical-services/Specialist Medical Consultations.png",
    highlights: [
      "Secure virtual teleconsultations from the comfort of your home",
      "Detailed second opinions on existing diagnoses and surgical recommendations",
      "Review of high-resolution CT, MRI, PET scans, biopsies, and lab bloodwork",
      "Comprehensive pre-travel medical readiness documentation"
    ]
  },
  {
    number: "03",
    title: "Treatment Coordination",
    tagline: "Transparent Hospital Quotations & Clinical Schedule Management",
    description:
      "Obtaining treatment plans, hospital quotations, appointment confirmations and estimated treatment durations from suitable healthcare providers. We ensure complete clinical clarity, transparent all-inclusive hospital pricing, and locked-in procedure schedules.",
    icon: <FileCheck className="w-6 h-6 text-[#d4af37]" />,
    image: "/images/medical-services/Treatment Coordination.png",
    highlights: [
      "Itemized, transparent cost estimates from JCI & ACHSI accredited hospitals",
      "Guaranteed scheduling of specialized surgical suites and private patient rooms",
      "Clear timelines covering admission, procedure, ICU (if needed), and recovery days",
      "No hidden fees or unexpected billing throughout the clinical process"
    ]
  },
  {
    number: "04",
    title: "Medical Travel Management",
    tagline: "First-Class Travel Logistics for Patients & Companions",
    description:
      "Coordinating international flights, accommodation, airport transfers and local transportation. We orchestrate stress-free medical travel, including medical flight clearance, wheelchair and stretcher assistance, and premium chauffeur-driven patient transfers.",
    icon: <PlaneTakeoff className="w-6 h-6 text-[#d4af37]" />,
    image: "/images/medical-services/Medical Travel Management.png",
    highlights: [
      "Flight booking assistance with medical clearance and airline oxygen/wheelchair arrangements",
      "VIP airport tarmac reception and private ambulance or luxury vehicle transfers",
      "Bespoke 5-star hotel or serviced apartment reservations for traveling family/companions",
      "Dedicated air-conditioned vehicles and private chauffeurs on standby 24/7"
    ]
  },
  {
    number: "05",
    title: "Patient Assistance",
    tagline: "24/7 Dedicated Concierge, Visa Facilitation & Bedside Support",
    description:
      "Providing logistical support throughout the patient's medical journey, including assistance with travel documentation and visa-related arrangements where applicable. We stand by the patient from initial inquiry through hospital discharge and return travel.",
    icon: <UserCheck className="w-6 h-6 text-[#d4af37]" />,
    image: "/images/medical-services/Patient Assistance.png",
    highlights: [
      "Official Medical Visa invitation letters issued in partnership with hospital authorities",
      "Personal bilingual patient liaison officer assigned to you for hospital visits",
      "Bedside companion support, medicine dispensing liaison, and dietary coordination",
      "Assistance with international insurance pre-authorization and claim paperwork"
    ]
  },
  {
    number: "06",
    title: "Recovery and Wellness Packages",
    tagline: "Restorative Post-Operative Healing in Island Sanctuaries",
    description:
      "Combining high-standard clinical recuperation with Sri Lanka's world-renowned natural serenity. Patients transition from hospital discharge to private oceanfront villas or misty mountain estates for gentle rehabilitation, specialized nutrition, and holistic care.",
    icon: <Sparkles className="w-6 h-6 text-[#d4af37]" />,
    image: "/images/medical-services/packages.png",
    highlights: [
      "Secluded luxury rehabilitation villas with barrier-free accessibility",
      "Qualified on-call registered nursing support and clinical dressing changes",
      "Nutritious chef-curated meals designed for tissue healing and recovery",
      "Optional gentle Ayurvedic rejuvenative treatments, herbal baths, and light physiotherapy"
    ]
  }
];

const MEDICAL_SPECIALTIES = [
  {
    name: "Cardiology & Cardiac Surgery",
    desc: "CABG bypass surgery, heart valve replacements, coronary angioplasty, and pediatric cardiac interventions in state-of-the-art hybrid catheterization labs.",
    icon: "🫀",
    savings: "Up to 70% Savings"
  },
  {
    name: "Orthopedic & Joint Replacement",
    desc: "Computer-navigated total knee and hip replacements, minimally invasive spinal fusion, arthroscopic sports surgeries, and comprehensive rehab.",
    icon: "🦴",
    savings: "Up to 65% Savings"
  },
  {
    name: "Cosmetic & Plastic Surgery",
    desc: "Rhinoplasty, facelifts, liposuction, tummy tucks, breast aesthetics, and reconstructive procedures by international society-certified plastic surgeons.",
    icon: "✨",
    savings: "Up to 75% Savings"
  },
  {
    name: "Advanced Dentistry & Implants",
    desc: "Full-mouth dental reconstructions, All-on-4 / All-on-6 implants, porcelain veneers, and pain-free cosmetic dentistry completed in minimal visits.",
    icon: "🦷",
    savings: "Up to 80% Savings"
  },
  {
    name: "Fertility & Reproductive Medicine (IVF)",
    desc: "Advanced assisted reproductive technology (IVF, ICSI, egg freezing, PGT genetic screening) with world-class success rates in confidential clinics.",
    icon: "👶",
    savings: "Up to 60% Savings"
  },
  {
    name: "Ophthalmology & Laser Eye Care",
    desc: "Femto-LASIK vision correction, multifocal premium cataract surgery, corneal transplants, and retinal micro-surgery with cutting-edge German lasers.",
    icon: "👁️",
    savings: "Up to 70% Savings"
  },
  {
    name: "Oncology & Surgical Oncology",
    desc: "Multidisciplinary cancer board evaluations, robotic surgical oncology, modern linear accelerator radiotherapy, and targeted immunotherapies.",
    icon: "🔬",
    savings: "Second Opinions & Care"
  },
  {
    name: "Executive Health Screenings",
    desc: "Comprehensive 1-day executive wellness checkups including full-body 3T MRI, cardiac calcium scoring, colonoscopy, and genetic risk panels.",
    icon: "📋",
    savings: "Complete VIP Day Packages"
  }
];

const PATIENT_JOURNEY_STEPS = [
  {
    step: "01",
    title: "Initial Inquiry & Medical Records",
    desc: "Submit your medical history, diagnosis, and current doctor recommendations securely. Our medical desk conducts a preliminary confidential triage within 24 hours."
  },
  {
    step: "02",
    title: "Specialist Review & Custom Treatment Plan",
    desc: "Leading consultant surgeons evaluate your case. We present a detailed clinical treatment proposal, physician profile, hospital accreditation details, and an all-inclusive quotation."
  },
  {
    step: "03",
    title: "Teleconsultation & Visa Coordination",
    desc: "Speak face-to-face with your specialist surgeon via video call. We issue your official hospital Medical Visa facilitation letters and arrange flights, transfers, and accommodations."
  },
  {
    step: "04",
    title: "VIP Arrival & Hospital Admission",
    desc: "Greeted at Colombo airport by our medical concierge. Transferred in comfort directly to the accredited private hospital for pre-op assessments and surgeon consultation."
  },
  {
    step: "05",
    title: "Specialist Procedure & Hospital Care",
    desc: "Undergo your medical treatment with personalized bedside care, dedicated patient liaison officers, and daily communication updates for your family abroad."
  },
  {
    step: "06",
    title: "Luxury Recovery & Rejuvenation Retreat",
    desc: "Transition to a private coastal or highland recovery villa with nursing support, customized nutrition, gentle Ayurvedic healing, and full post-operative clearance before flying home."
  }
];

const FAQS = [
  {
    q: "Why choose Sri Lanka for specialist medical treatments?",
    a: "Sri Lanka offers a rare combination of internationally accredited private hospitals (JCI, ACHSI, ISO), consultant specialists trained in the UK, US, and Commonwealth systems, zero waiting lists, and savings of 60% to 80% compared to Western nations. Furthermore, the island's tranquil tropical climate and world-renowned wellness heritage provide the ultimate setting for gentle, restorative healing."
  },
  {
    q: "Do I need a special Medical Visa to enter Sri Lanka for treatment?",
    a: "Yes, Sri Lanka offers an official Medical Visa category for international patients and their registered accompanying persons. Our patient assistance team coordinates directly with partner hospitals to issue formal hospital appointment confirmation letters and visa invitation documentation, ensuring swift processing."
  },
  {
    q: "How are quotations and treatment plans determined?",
    a: "After you submit your medical reports and diagnostic scans, our medical director reviews them alongside the appointed specialist surgeon. You receive a comprehensive, itemized hospital quotation covering surgeon fees, operating theater charges, standard medications, estimated length of hospital stay, and post-op checkups with zero surprise charges."
  },
  {
    q: "Can family members or companions travel and stay with me?",
    a: "Absolutely. We arrange companion-inclusive accommodations, whether you prefer private hospital suites with companion beds, luxury boutique hotels located minutes from the medical center, or private serviced villas for the subsequent recovery phase."
  },
  {
    q: "How does the Recovery and Wellness Package differ from standard hotel stays?",
    a: "Our recovery packages are specifically tailored for clinical convalescence. They include barrier-free suites, on-call registered nursing staff, prescribed post-surgery nutrition, wound dressing care, scheduled transport to follow-up consultations, and complementary Ayurvedic herbal teas, gentle therapies, or physiotherapy as cleared by your surgeon."
  }
];

export default function MedicalTourismPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedSpecialty, setSelectedSpecialty] = useState("Orthopedic & Joint Replacement");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    specialty: "Orthopedic & Joint Replacement",
    hasReports: "Yes",
    travelTimeframe: "Within 1-2 Months",
    companion: "Yes (1-2 persons)",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      fireBookingConfetti();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#d4af37]/30 selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-white/10">
        {/* Background Visual with Dark Gradients */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/tourism-segments/medical-tourism.jpg"
            alt="International Medical Tourism Sri Lanka"
            fill
            priority
            className="object-cover opacity-25 brightness-75 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(16,185,129,0.12),transparent_70%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md">
              <HeartPulse className="w-4 h-4 animate-pulse" />
              <span>A Leading Destination for Medical Tourism</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight leading-[1.1] mb-6">
              World-Class Specialist Healthcare & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37]">Luxury Healing</span> in Sri Lanka
            </h1>

            <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-8">
              International Hospitality Ventures (IHV) coordinates seamless specialist medical journeys to Sri Lanka. From accredited hospital referrals and board-certified surgeon consultations to transparent treatment plans, VIP travel management, and restorative wellness sanctuaries.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#inquiry"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#d4af37] hover:bg-[#b5952f] text-black font-semibold text-sm transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(212,175,55,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(212,175,55,0.6)]"
              >
                <span>Request Specialist Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium text-sm transition-all duration-300 backdrop-blur-md"
              >
                <span>Explore Our Medical Services</span>
              </a>

              <a
                href="https://wa.me/94771522718?text=Hello%20IHV%20Travel,%20I%20am%20inquiring%20about%20Medical%20Tourism%20and%20Specialist%20Healthcare%20services%20in%20Sri%20Lanka."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium text-sm transition-all duration-300 backdrop-blur-md"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>Direct Medical Concierge</span>
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-white/10">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-display">500+</div>
                <div className="text-xs text-gray-400 mt-0.5">Board-Certified Specialists</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#d4af37] font-display">JCI & ACHSI</div>
                <div className="text-xs text-gray-400 mt-0.5">Accredited Hospital Network</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-display">60–80%</div>
                <div className="text-xs text-gray-400 mt-0.5">Average Treatment Savings</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-display">Zero</div>
                <div className="text-xs text-gray-400 mt-0.5">Waiting Lists for Procedures</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialist Medical Services */}
      <section id="services" className="py-20 sm:py-28 relative border-b border-white/10 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold text-[#d4af37] tracking-[0.2em] uppercase block mb-3">
              Comprehensive Healthcare Delivery
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-white tracking-tight mb-4">
              Our Specialist Medical Services
            </h2>
            <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
              Every stage of your medical journey in Sri Lanka is professionally coordinated by our specialized medical concierge desk, ensuring world-class clinical results, absolute comfort, and complete peace of mind.
            </p>
          </div>

          {/* 6 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {MEDICAL_SERVICES.map((service) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col justify-between rounded-[2rem] bg-[#111416]/90 border border-white/10 hover:border-[#d4af37]/40 transition-all duration-300 shadow-xl group hover:shadow-2xl hover:shadow-[#d4af37]/5 overflow-hidden"
              >
                <div>
                  {/* Top Image Banner */}
                  <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-black/60">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111416] via-[#111416]/30 to-transparent" />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center shadow-lg">
                      {service.icon}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 pt-2">
                    <h3 className="text-xl sm:text-2xl font-display font-semibold text-white tracking-tight mb-2 group-hover:text-[#d4af37] transition-colors">
                      {service.number}. {service.title}
                    </h3>

                    <p className="text-xs font-medium text-gray-400 italic mb-4">
                      {service.tagline}
                    </p>

                    <p className="text-sm text-gray-300 font-light leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Highlights checklist */}
                    <div className="space-y-2.5 pt-4 border-t border-white/5">
                      {service.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                          <span className="font-light">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-2 border-t border-white/5 flex items-center justify-between">
                  <a
                    href="#inquiry"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#d4af37] hover:text-white transition-colors"
                  >
                    <span>Inquire for {service.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Clinical Specialties */}
      <section className="py-20 sm:py-24 bg-gradient-to-b from-[#0c0e10] to-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <span className="text-xs font-semibold text-emerald-400 tracking-[0.2em] uppercase block mb-3">
                Clinical Excellence
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight">
                Specialized Treatments & Procedures
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 font-light max-w-md">
              Performed by leading Sri Lankan surgeons certified by the Royal Colleges of the UK, American Medical Boards, and Australasian Colleges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MEDICAL_SPECIALTIES.map((spec, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-[#111416]/70 border border-white/10 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between group hover:bg-[#14181b]"
              >
                <div>
                  <div className="text-3xl mb-3.5">{spec.icon}</div>
                  <h4 className="text-base font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {spec.name}
                  </h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                    {spec.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#d4af37]">
                    {spec.savings}
                  </span>
                  <a
                    href={`#inquiry`}
                    onClick={() => {
                      setSelectedSpecialty(spec.name);
                      setFormData((prev) => ({ ...prev, specialty: spec.name }));
                    }}
                    className="text-xs text-gray-400 hover:text-white transition-colors"
                  >
                    Select →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patient Journey Timeline */}
      <section className="py-20 sm:py-28 relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold text-[#d4af37] tracking-[0.2em] uppercase block mb-3">
              Step-by-Step Pathway
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight mb-4">
              Your Seamless Medical Journey
            </h2>
            <p className="text-sm text-gray-400 font-light">
              From your initial confidential assessment to a safe return home, we manage every clinical, logistical, and recovery detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PATIENT_JOURNEY_STEPS.map((step) => (
              <div
                key={step.step}
                className="relative p-7 rounded-3xl bg-[#111416]/90 border border-white/10 shadow-lg"
              >
                <div className="text-3xl font-display font-bold text-[#d4af37]/40 mb-3 font-mono">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospital Network & Why Sri Lanka */}
      <section className="py-20 sm:py-24 bg-[#0a0c0e] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold text-emerald-400 tracking-[0.2em] uppercase block">
                World-Class Clinical Standards
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight">
                Sri Lanka&apos;s Internationally Accredited Healthcare Infrastructure
              </h2>
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                Sri Lanka is rapidly emerging as South Asia&apos;s premier medical destination, distinguished by JCI and ACHSI-accredited private tertiary care hospitals, cutting-edge surgical suites, and dedicated international patient pavilions.
              </p>

              <div className="space-y-3.5">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-semibold text-white">JCI & ACHSI International Standards</h5>
                    <p className="text-[11px] text-gray-400 mt-0.5">Strict adherence to global patient safety protocols, zero hospital-acquired infection targets, and advanced robotics.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <Award className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-semibold text-white">UK & US Board-Certified Consultant Specialists</h5>
                    <p className="text-[11px] text-gray-400 mt-0.5">Specialist surgeons and physicians trained in leading international centers with decades of complex clinical experience.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/5">
                  <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-semibold text-white">Serene Tropical Convalescence</h5>
                    <p className="text-[11px] text-gray-400 mt-0.5">Complement modern surgical recovery with fresh tropical air, organic nutrition, and ancient Ayurvedic rejuvenation.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/Travel_Packages/Silver_Horizons_Luxury_Senior_Living_Experience/Picture54.jpg"
                alt="Sri Lanka Private Medical Healthcare"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#d4af37] uppercase tracking-wider mb-1">
                  <Building2 className="w-3.5 h-3.5" /> Partner Hospital Network
                </div>
                <p className="text-xs text-gray-300 font-light">
                  Direct affiliations with Colombo&apos;s leading private tertiary medical centers, advanced surgical centers, and private recovery retreats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Referral & Consultation Inquiry Form */}
      <section id="inquiry" className="py-20 sm:py-28 relative border-b border-white/10 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-[#d4af37] tracking-[0.2em] uppercase block mb-3">
              Confidential Medical Desk
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight mb-3">
              Request a Specialist Medical Referral
            </h2>
            <p className="text-sm text-gray-400 font-light max-w-xl mx-auto">
              Submit your inquiry and treatment requirements. Our medical concierge desk will coordinate preliminary assessments with appropriate Sri Lankan specialists and issue a detailed proposal within 24 hours.
            </p>
          </div>

          <div className="rounded-[2.5rem] bg-[#111416] border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-display font-medium text-white">
                  Medical Referral Request Received
                </h3>
                <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed font-light">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Our international medical concierge team has received your inquiry. A dedicated patient coordinator will reach out to you via email/WhatsApp shortly to request any diagnostic reports and schedule preliminary consultations.
                </p>
                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href="https://wa.me/94771522718?text=Hello%20IHV%20Travel,%20I%20have%20submitted%20a%20Medical%20Tourism%20referral%20request%20on%20your%20website."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-black font-semibold text-xs shadow-lg"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    <span>Chat on WhatsApp Now</span>
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-gray-400 hover:text-white transition"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Full Name (Patient or Representative) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Johnathan Davis"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +44 7911 123456"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Country of Residence *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. United Kingdom, UAE, Germany, Australia"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Medical Specialty Required *
                    </label>
                    <select
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-[#d4af37]"
                    >
                      {MEDICAL_SPECIALTIES.map((spec, idx) => (
                        <option key={idx} value={spec.name} className="bg-[#111416] text-white">
                          {spec.name}
                        </option>
                      ))}
                      <option value="Other Specialist Care" className="bg-[#111416] text-white">
                        Other Specialist Medical Care
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Preferred Travel Timeframe
                    </label>
                    <select
                      value={formData.travelTimeframe}
                      onChange={(e) => setFormData({ ...formData, travelTimeframe: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Urgent (Within 2 Weeks)" className="bg-[#111416] text-white">Urgent (Within 2 Weeks)</option>
                      <option value="Within 1-2 Months" className="bg-[#111416] text-white">Within 1-2 Months</option>
                      <option value="Within 3-6 Months" className="bg-[#111416] text-white">Within 3-6 Months</option>
                      <option value="Just Exploring Information" className="bg-[#111416] text-white">Just Exploring Information</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">
                    Clinical Details & Procedure Description
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe the symptoms, required surgery/procedure, previous medical history, or specific consultant preferences..."
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                    <strong>Medical Confidentiality Guaranteed:</strong> All patient data and medical records are handled under strict doctor-patient confidentiality and global privacy standards. Diagnostic reports can be securely shared after our coordinator contacts you.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-[#d4af37] hover:bg-[#b5952f] text-black font-semibold text-sm transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Transmitting Medical Inquiry..." : "Submit Confidential Medical Referral"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 sm:py-24 border-b border-white/10 bg-[#0a0c0e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-[#d4af37] tracking-[0.2em] uppercase block mb-3">
              Patient Guidance
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-white tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light">
              Essential information for international patients seeking specialist treatment in Sri Lanka.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-[#111416] border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm font-semibold text-white">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#d4af37] shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-5 text-xs sm:text-sm text-gray-300 font-light leading-relaxed border-t border-white/5 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 relative overflow-hidden bg-black text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-xs font-semibold mb-4">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Sri Lanka Medical Tourism Desk</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-white mb-4">
            Begin Your Healing Journey Today
          </h2>
          <p className="text-sm text-gray-400 font-light mb-8 max-w-xl mx-auto leading-relaxed">
            Speak directly with our clinical coordinators. We will evaluate your requirements, connect you with the appropriate specialist doctors, and design your complete treatment and recovery plan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#inquiry"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#d4af37] hover:bg-[#b5952f] text-black font-semibold text-sm transition-all duration-300 shadow-xl"
            >
              <span>Get Your Free Treatment Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="tel:+94771522718"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-sm transition"
            >
              <PhoneCall className="w-4 h-4 text-[#d4af37]" />
              <span>Call: +94 77 15 22 718</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

