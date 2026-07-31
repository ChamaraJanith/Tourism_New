"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { toggleMenu, setMenuOpen } from "@/store/slices/uiSlice";
import { UserIcon, MenuIcon } from "@/components/ui/Icons";
import { logOut } from "@/store/slices/authSlice";
import { Home, Compass, Mail, Info, Users, ChevronDown, Briefcase } from "lucide-react";

import { BespokeButton } from "@/components/ui/BespokeButton";
import { LanguageSelector } from "@/components/ui/LanguageSelector";
import Link from "next/link";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const isMenuOpen = useAppSelector((state) => state.ui.isMenuOpen);
  const { user, isAuthenticated, isInitialized } = useAppSelector((state) => state.auth);

  // Track expanded mobile accordion
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const handleLogout = () => {
    dispatch(logOut());
  };

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Lifestyle Experiences", href: "/lifestyle-experiences" },
    {
      name: "About",
      href: "/#about"
    },
    {
      name: "Services",
      href: "/tourism-segments"
    },
    {
      name: "Our Signature Journey",
      href: "/journeys"
    },
    {
      name: "Partnerships",
      href: "#",
      dropdown: [
        { name: "Our Global Strategic Partner Network", href: "/partnerships/global-network" },
        { name: "Our Sri Lankan Tourism Partner Network", href: "/partnerships/sri-lankan-network" },
        { name: "Our Local Hospitality Partners", href: "/partnerships/local-hospitality" },
        { name: "Building Partnerships That Create Lasting Value", href: "/partnerships/building-value" },
        { name: "Partner With Us", href: "/partnerships/partner-with-us" }
      ]
    },
    { name: "Contact Us", href: "/#contact" }
  ];

  const premiumNavItems = [
    {
      name: "Home",
      href: "/",
      desc: "Return to the main page",
      icon: <Home className="w-4 h-4 text-[#d4af37]" />
    },
    {
      name: "Lifestyle Experiences",
      href: "/lifestyle-experiences",
      desc: "Discover curated pathways and adventures",
      icon: <Compass className="w-4 h-4 text-[#d4af37]" />
    },
    {
      name: "About",
      href: "/#about",
      desc: "Learn about our vision and story",
      icon: <Info className="w-4 h-4 text-[#d4af37]" />
    },
    {
      name: "Services",
      href: "/tourism-segments",
      desc: "Explore our specialized offerings",
      icon: <Briefcase className="w-4 h-4 text-[#d4af37]" />
    },
    {
      name: "Our Signature Journey",
      href: "/journeys",
      desc: "Discover curated travel packages",
      icon: <Compass className="w-4 h-4 text-[#d4af37]" />
    },
    {
      name: "Partnerships",
      href: "#",
      desc: "Discover our networks and create value",
      icon: <Users className="w-4 h-4 text-[#d4af37]" />,
      children: [
        { name: "Sri Lankan Partner Network", href: "/partnerships/sri-lankan-network" },
        { name: "Global Strategic Partner Network", href: "/partnerships/global-network" },
        { name: "Local Hospitality Partners", href: "/partnerships/local-hospitality" },
        { name: "Building Lasting Value", href: "/partnerships/building-value" },
        { name: "Partner With Us", href: "/partnerships/partner-with-us" }
      ]
    },
    {
      name: "Contact Us",
      href: "/#contact",
      desc: "Get in touch with our concierge desk",
      icon: <Mail className="w-4 h-4 text-[#d4af37]" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
        duration: 0.3,
        ease: "easeOut" as const
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.2, ease: "easeIn" as const }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  const handleMobileNavClick = (item: any, e: React.MouseEvent) => {
    if (item.children) {
      e.preventDefault();
      setExpandedMobileItem(expandedMobileItem === item.name ? null : item.name);
    } else {
      dispatch(setMenuOpen(false));
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 20) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
        dispatch(setMenuOpen(false));
        setExpandedMobileItem(null);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, dispatch]);

  // Handle click outside to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        isMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        dispatch(setMenuOpen(false));
        setExpandedMobileItem(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isMenuOpen, dispatch]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="relative bg-[#111416]/80 backdrop-blur-md border-b border-x border-zinc-800 rounded-b-[2.5rem]">
        <header className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-6 sm:px-12 lg:px-16 py-3 sm:py-3.5">

          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <img src="/images/title2.jpeg" alt="IHV Travel Logo" className="h-8 md:h-10 w-auto object-contain rounded-lg shadow-md transition-transform group-hover:scale-105" />
          </Link>

          <nav className="hidden xl:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <div key={item.name} className="group relative">
                <Link
                  href={item.href}
                  scroll={item.href.includes('#') ? false : undefined}
                  className="flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gray-300 transition-colors hover:text-white py-2"
                >
                  <motion.span whileHover={{ y: -1 }}>
                    {item.name}
                  </motion.span>
                  {item.dropdown && (
                    <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-[#d4af37] transition-colors" />
                  )}
                  <span className="absolute bottom-1 left-0 h-[1.5px] w-0 bg-[#d4af37] transition-all duration-300 group-hover:w-full" />
                </Link>

                {item.dropdown && (
                  <div className="absolute left-0 top-full pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50 min-w-[280px]">
                    <div className="bg-[#111416]/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)]">
                      {item.dropdown.map((dropItem: any) => (
                        <Link
                          key={dropItem.name}
                          href={dropItem.href}
                          className="block px-4 py-2.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-[#d4af37] hover:bg-white/5 rounded-lg transition-colors leading-relaxed"
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <button
            ref={menuButtonRef}
            className="flex xl:hidden items-center justify-center rounded-full bg-white/5 p-2 text-gray-300 transition-all hover:bg-white/10 active:scale-90"
            onClick={() => dispatch(toggleMenu())}
          >
            <span className="sr-only">Toggle Menu</span>
            <MenuIcon />
          </button>



          <div className="flex items-center gap-4 sm:gap-8">
            <LanguageSelector />
            {isInitialized && isAuthenticated && user ? (
              <div className="flex items-center gap-4 sm:gap-6">
                <Link
                  href="/profile"
                  className="hidden sm:flex items-center gap-2.5 text-[0.68rem] font-bold uppercase tracking-[0.25em] text-[#d4af37] hover:text-[#f0c040] transition-colors"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover border border-[#d4af37]/30"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                      <UserIcon size={11} />
                    </div>
                  )}
                  <span>Hi, {user.name.split(' ')[0]}</span>
                </Link>
                <BespokeButton
                  variant="secondary"
                  onClick={handleLogout}
                  className="!px-6 !py-2.5 !text-[0.65rem] shadow-lg border border-zinc-700 hover:border-[#d4af37]/50 hover:text-[#d4af37] transition-all"
                >
                  Log Out
                </BespokeButton>
              </div>
            ) : (
              <BespokeButton
                variant="emerald"
                href="/auth"
                className="!px-4 !py-2 !text-[0.55rem] md:!px-8 md:!py-3 md:!text-[0.65rem] shadow-lg"
              >
                <UserIcon className="w-3 h-3 md:w-4 md:h-4" />
                Sign Up
              </BespokeButton>
            )}
          </div>
        </header>

      </div>


      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                dispatch(setMenuOpen(false));
                setExpandedMobileItem(null);
              }}
              className="fixed inset-0 z-40 bg-black/30 xl:hidden"
            />

            <motion.div
              ref={mobileMenuRef}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-x-0 top-full z-50 overflow-hidden px-4 pb-6 pt-2 xl:hidden max-h-[85vh] overflow-y-auto"
            >
              <div className="rounded-[1.8rem] border border-white/10 bg-[#111416]/95 p-5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  {premiumNavItems.map((item) => (
                    <motion.div key={item.name} variants={itemVariants} className="flex flex-col">
                      <Link
                        href={item.href}
                        onClick={(e) => handleMobileNavClick(item, e)}
                        scroll={item.href.includes('#') ? false : undefined}
                        className="group flex items-center justify-between p-3 rounded-2xl bg-white/0 hover:bg-white/5 transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#d4af37]/10 group-hover:border-[#d4af37]/30 group-hover:text-white transition-all duration-300">
                            {item.icon}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-white/90 group-hover:text-[#d4af37] transition-colors duration-300">
                              {item.name}
                            </span>
                            <span className="text-[0.62rem] text-gray-400 font-medium tracking-wide mt-0.5 group-hover:text-white/60 transition-colors duration-300">
                              {item.desc}
                            </span>
                          </div>
                        </div>

                        {item.children && (
                          <motion.div
                            animate={{ rotate: expandedMobileItem === item.name ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          </motion.div>
                        )}
                      </Link>

                      {item.children && (
                        <AnimatePresence>
                          {expandedMobileItem === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pl-14 pr-4 py-2 flex flex-col gap-3 border-l border-white/5 ml-8 mt-2 mb-2">
                                {item.children.map((child: any) => (
                                  <Link
                                    key={child.name}
                                    href={child.href}
                                    onClick={() => {
                                      dispatch(setMenuOpen(false));
                                      setExpandedMobileItem(null);
                                    }}
                                    className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-gray-400 hover:text-[#d4af37] transition-colors py-1"
                                  >
                                    {child.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
