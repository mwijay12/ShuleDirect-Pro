
"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Loader2 } from 'lucide-react'

export function InstitutionalLoader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const [systemName, setSystemName] = useState("Shule Atra")
  const [logo, setLogo] = useState<string | null>(null)

  useEffect(() => {
    const savedLogo = localStorage.getItem("shule_logo")
    if (savedLogo) setLogo(savedLogo)

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsExiting(true)
            setTimeout(() => onComplete?.(), 1000)
          }, 500)
          return 100
        }
        const jump = Math.floor(Math.random() * 15) + 5
        return prev + jump
      })
    }, 120)
    
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center p-6 sm:p-12 overflow-hidden"
        >
          {/* Background Decor */}
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
            <div className="grid grid-cols-12 h-full gap-px">
              {Array.from({length: 144}).map((_, i) => (
                <div key={i} className="border-r border-b border-primary" />
              ))}
            </div>
          </div>

          <div className="relative mb-12 flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="h-24 w-24 sm:h-32 sm:w-32 rounded-[2.5rem] sm:rounded-[3rem] colorful-gradient flex items-center justify-center text-white shadow-[0_30px_60px_rgba(31,91,166,0.3)] group relative overflow-hidden"
            >
              {logo ? (
                <img src={logo} alt="Shule Atra Logo" className="h-full w-full object-cover" />
              ) : (
                <ShieldCheck className="h-12 w-12 sm:h-16 sm:w-16" />
              )}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 border-2 border-dashed border-primary/10 rounded-full" 
            />
          </div>

          <div className="w-full max-w-sm space-y-8 text-center relative z-10">
            <div className="space-y-3">
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl sm:text-3xl font-headline font-black text-primary tracking-tighter uppercase truncate px-4"
              >
                {systemName}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-3"
              >
                <div className="h-px w-8 bg-primary/20" />
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.4em] whitespace-nowrap">
                  2026 Institutional Node Online
                </p>
                <div className="h-px w-8 bg-primary/20" />
              </motion.div>
            </div>

            <div className="space-y-4">
              <div className="relative h-1.5 w-full bg-muted rounded-full overflow-hidden shadow-inner border border-muted">
                <motion.div 
                  className="absolute top-0 left-0 h-full colorful-gradient"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
              
              <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest">
                    {progress < 40 ? 'Security Check' : progress < 80 ? 'Optimizing Node' : 'Hub Ready'}
                  </span>
                </div>
                <span className="text-sm font-mono font-black text-primary">{Math.min(Math.round(progress), 100)}%</span>
              </div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-3 text-[8px] font-black text-muted-foreground uppercase tracking-[0.5em]">
              <Loader2 className="h-3 w-3 animate-spin text-primary" />
              Shule Atra Technology Core
            </div>
            <p className="text-[7px] font-bold text-muted-foreground/40 uppercase tracking-widest">Architecture by Atra Node</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
