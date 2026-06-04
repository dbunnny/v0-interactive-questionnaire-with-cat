"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy, Wrench } from "lucide-react"

// Custom social icons since they may not exist in all lucide versions
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}

type PowerType = "powered" | "unpowered" | null
type YesNo = "yes" | "no" | null
type Frequency = "all_the_time" | "intermittent" | null

interface FormData {
  powerType: PowerType
  turnsOn: YesNo
  triedOtherPower: YesNo
  issueFrequency: Frequency
  makeModel: string
  itemAge: string
  currentBehavior: string
  issueStart: string
  triggerEvent: string
  physicalDamage: string
  hasAccessories: string
  sentimentalValue: string
}

const totalQuestions = 11

export default function RepairQuestionnaire() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    powerType: null,
    turnsOn: null,
    triedOtherPower: null,
    issueFrequency: null,
    makeModel: "",
    itemAge: "",
    currentBehavior: "",
    issueStart: "",
    triggerEvent: "",
    physicalDamage: "",
    hasAccessories: "",
    sentimentalValue: "",
  })
  const [isComplete, setIsComplete] = useState(false)
  const [copied, setCopied] = useState(false)
  const [showCat, setShowCat] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const progress = Math.min((step / totalQuestions) * 100, 100)

  useEffect(() => {
    if (isComplete) {
      setTimeout(() => setShowCat(true), 300)
    }
  }, [isComplete])

  const handleNext = () => {
    if (step < totalQuestions) {
      // If unpowered is selected at step 0, skip the power-related questions (1, 2, 3)
      if (step === 0 && formData.powerType === "unpowered") {
        setStep(4) // Skip to make/model question
      } else {
        setStep(step + 1)
      }
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    setIsComplete(true)
  }

  const generateSummary = () => {
    let summary = `🔧 HINCKLEY FIXERS REPAIR REQUEST 🔧\n${"═".repeat(40)}\n\n`
    
    summary += `📋 ITEM DETAILS\n${"─".repeat(30)}\n`
    summary += `• Make/Model/Serial: ${formData.makeModel || "Not provided"}\n`
    summary += `• Age: ${formData.itemAge || "Not specified"}\n`
    summary += `• Power Type: ${formData.powerType === "powered" ? "Powered device" : "Unpowered item"}\n\n`
    
    if (formData.powerType === "powered") {
      summary += `⚡ POWER DIAGNOSTICS\n${"─".repeat(30)}\n`
      summary += `• Turns on (lights/fans/displays): ${formData.turnsOn === "yes" ? "Yes" : "No"}\n`
      summary += `• Tried different power source: ${formData.triedOtherPower === "yes" ? "Yes" : "No"}\n`
      summary += `• Issue frequency: ${formData.issueFrequency === "all_the_time" ? "All the time" : "Intermittent"}\n\n`
    }
    
    summary += `🔍 PROBLEM DESCRIPTION\n${"─".repeat(30)}\n`
    summary += `• Current behavior: ${formData.currentBehavior || "Not described"}\n`
    summary += `• When did issue start: ${formData.issueStart || "Not specified"}\n`
    summary += `• Trigger event: ${formData.triggerEvent || "None identified"}\n`
    summary += `• Physical damage visible: ${formData.physicalDamage || "Not specified"}\n\n`
    
    summary += `📦 ADDITIONAL INFO\n${"─".repeat(30)}\n`
    summary += `• Has accessories: ${formData.hasAccessories || "Not specified"}\n`
    summary += `• Sentimental value/critical data: ${formData.sentimentalValue || "None mentioned"}\n\n`
    
    summary += `${"═".repeat(40)}\n`
    summary += `Posted via HinckleyFixers Repair Form`
    
    return summary
  }

  const copyToClipboard = () => {
    const summary = generateSummary()
    
    // Fallback for environments where Clipboard API is blocked
    const textArea = document.createElement('textarea')
    textArea.value = summary
    textArea.style.position = 'fixed'
    textArea.style.left = '-9999px'
    textArea.style.top = '0'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    try {
      document.execCommand('copy')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // If execCommand fails, try the modern API as fallback
      navigator.clipboard.writeText(summary).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }).catch(() => {
        alert('Could not copy text. Please select and copy manually.')
      })
    } finally {
      document.body.removeChild(textArea)
    }
  }

  const renderQuestion = () => {
    switch (step) {
      case 0:
        return (
          <QuestionCard title="Let's start with the basics">
            <p className="text-muted-foreground mb-6">Is your item powered or unpowered?</p>
            <div className="flex flex-col gap-3">
              <SelectOption
                selected={formData.powerType === "powered"}
                onClick={() => setFormData({ ...formData, powerType: "powered" })}
                label="Powered"
                description="Requires electricity, batteries, or charging"
              />
              <SelectOption
                selected={formData.powerType === "unpowered"}
                onClick={() => setFormData({ ...formData, powerType: "unpowered" })}
                label="Unpowered"
                description="Mechanical, manual, or passive item"
              />
            </div>
            <NavButtons onNext={handleNext} canProgress={formData.powerType !== null} />
          </QuestionCard>
        )
      
      case 1:
        // This case only shows for powered items
        return (
          <QuestionCard title="Does the item turn on at all?">
            <p className="text-muted-foreground mb-6">Do any lights, fans, or displays react when you power it on?</p>
            <RadioGroup
              value={formData.turnsOn}
              onChange={(val) => setFormData({ ...formData, turnsOn: val as YesNo })}
              options={[
                { value: "yes", label: "Yes, something happens" },
                { value: "no", label: "No, completely dead" },
              ]}
            />
            <NavButtons onBack={handleBack} onNext={handleNext} canProgress={formData.turnsOn !== null} />
          </QuestionCard>
        )
      
      case 2:
        return (
          <QuestionCard title="Have you tried a different power source?">
            <p className="text-muted-foreground mb-6">Different outlet, charging cable, or fresh batteries?</p>
            <RadioGroup
              value={formData.triedOtherPower}
              onChange={(val) => setFormData({ ...formData, triedOtherPower: val as YesNo })}
              options={[
                { value: "yes", label: "Yes, I've tried that" },
                { value: "no", label: "No, not yet" },
              ]}
            />
            <NavButtons onBack={handleBack} onNext={handleNext} canProgress={formData.triedOtherPower !== null} />
          </QuestionCard>
        )
      
      case 3:
        return (
          <QuestionCard title="Does the issue happen all the time?">
            <p className="text-muted-foreground mb-6">Or is it intermittent?</p>
            <RadioGroup
              value={formData.issueFrequency}
              onChange={(val) => setFormData({ ...formData, issueFrequency: val as Frequency })}
              options={[
                { value: "all_the_time", label: "All the time" },
                { value: "intermittent", label: "Intermittent / Sometimes" },
              ]}
            />
            <NavButtons onBack={handleBack} onNext={handleNext} canProgress={formData.issueFrequency !== null} />
          </QuestionCard>
        )
      
      case 4:
        return (
          <QuestionCard title="What is the make & model?">
            <p className="text-muted-foreground mb-6">Include the serial number if available</p>
            <textarea
              value={formData.makeModel}
              onChange={(e) => setFormData({ ...formData, makeModel: e.target.value })}
              placeholder="e.g., Samsung TV Model UN55NU7100, S/N: ABC123..."
              className="w-full p-4 border-2 border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary min-h-[100px] resize-none"
            />
            <NavButtons 
              onBack={() => formData.powerType === "powered" ? setStep(3) : setStep(0)} 
              onNext={handleNext} 
              canProgress={formData.makeModel.length > 0} 
            />
          </QuestionCard>
        )
      
      case 5:
        return (
          <QuestionCard title="Roughly how old is the item?">
            <p className="text-muted-foreground mb-6">Approximate age helps us understand wear and availability of parts</p>
            <select
              value={formData.itemAge}
              onChange={(e) => setFormData({ ...formData, itemAge: e.target.value })}
              className="w-full p-4 border-2 border-border rounded-lg bg-input text-foreground focus:outline-none focus:border-primary"
            >
              <option value="">Select age...</option>
              {Array.from({ length: 21 }, (_, i) => (
                <option key={i} value={`${i} year${i !== 1 ? "s" : ""}`}>
                  {i} year{i !== 1 ? "s" : ""}
                </option>
              ))}
              <option value="20+ years">20+ years</option>
            </select>
            <NavButtons onBack={handleBack} onNext={handleNext} canProgress={formData.itemAge !== ""} />
          </QuestionCard>
        )
      
      case 6:
        return (
          <QuestionCard title="What is it doing (or not doing)?">
            <p className="text-muted-foreground mb-6">Describe exactly what&apos;s happening right now</p>
            <textarea
              value={formData.currentBehavior}
              onChange={(e) => setFormData({ ...formData, currentBehavior: e.target.value })}
              placeholder="e.g., The screen flickers for a few seconds then goes black..."
              className="w-full p-4 border-2 border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary min-h-[120px] resize-none"
            />
            <NavButtons onBack={handleBack} onNext={handleNext} canProgress={formData.currentBehavior.length > 0} />
          </QuestionCard>
        )
      
      case 7:
        return (
          <QuestionCard title="When did the issue first start?">
            <p className="text-muted-foreground mb-6">Did it happen suddenly or gradually get worse?</p>
            <textarea
              value={formData.issueStart}
              onChange={(e) => setFormData({ ...formData, issueStart: e.target.value })}
              placeholder="e.g., Started two weeks ago, gradually getting worse..."
              className="w-full p-4 border-2 border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary min-h-[100px] resize-none"
            />
            <NavButtons onBack={handleBack} onNext={handleNext} canProgress={formData.issueStart.length > 0} />
          </QuestionCard>
        )
      
      case 8:
        return (
          <QuestionCard title="Was there a specific trigger event?">
            <p className="text-muted-foreground mb-6">Power surge, drop, water exposure, etc.?</p>
            <textarea
              value={formData.triggerEvent}
              onChange={(e) => setFormData({ ...formData, triggerEvent: e.target.value })}
              placeholder="e.g., It was dropped last week / No known event..."
              className="w-full p-4 border-2 border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary min-h-[100px] resize-none"
            />
            <NavButtons onBack={handleBack} onNext={handleNext} canProgress={formData.triggerEvent.length > 0} />
          </QuestionCard>
        )
      
      case 9:
        return (
          <QuestionCard title="Any visible physical damage?">
            <p className="text-muted-foreground mb-6">Cracks, burns, corrosion, loose parts?</p>
            <textarea
              value={formData.physicalDamage}
              onChange={(e) => setFormData({ ...formData, physicalDamage: e.target.value })}
              placeholder="e.g., Small crack on the corner, no other visible damage..."
              className="w-full p-4 border-2 border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary min-h-[100px] resize-none"
            />
            <NavButtons onBack={handleBack} onNext={handleNext} canProgress={formData.physicalDamage.length > 0} />
          </QuestionCard>
        )
      
      case 10:
        return (
          <QuestionCard title="Do you have all necessary accessories?">
            <p className="text-muted-foreground mb-6">Chargers, remotes, cables, manuals, etc.?</p>
            <textarea
              value={formData.hasAccessories}
              onChange={(e) => setFormData({ ...formData, hasAccessories: e.target.value })}
              placeholder="e.g., Yes, I have the charger and remote..."
              className="w-full p-4 border-2 border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary min-h-[100px] resize-none"
            />
            <NavButtons onBack={handleBack} onNext={handleNext} canProgress={formData.hasAccessories.length > 0} />
          </QuestionCard>
        )
      
      case 11:
        return (
          <QuestionCard title="Anything special we should know?">
            <p className="text-muted-foreground mb-6">Critical data, memories, or sentimental attachments?</p>
            <textarea
              value={formData.sentimentalValue}
              onChange={(e) => setFormData({ ...formData, sentimentalValue: e.target.value })}
              placeholder="e.g., Contains family photos / Was my grandmother's..."
              className="w-full p-4 border-2 border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary min-h-[100px] resize-none"
            />
            <NavButtons onBack={handleBack} onNext={handleSubmit} canProgress={formData.sentimentalValue.length > 0} isLast />
          </QuestionCard>
        )
      
      default:
        return null
    }
  }

  if (isComplete) {
    return (
      <main className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Cat Animation */}
          <div className={`flex justify-center mb-8 transition-all duration-700 ${showCat ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
            <div className="relative">
              <div className="animate-spin-slow">
                <CatMascot />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap animate-bounce">
                Thank you!
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-card border-2 border-border rounded-xl p-6 mb-6 shadow-lg">
            <h2 className="text-2xl font-bold text-foreground mb-4 text-center" style={{ fontFamily: "var(--font-heading)" }}>
              Your Repair Request is Ready!
            </h2>
            
            <div className="bg-primary/10 border-2 border-primary rounded-lg p-4 mb-6">
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
                Click the Copy button below
              </h3>
              <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
                Paste into a new post on:
              </h3>
              <div className="flex flex-col sm:flex-row gap-3 ml-8 mt-3">
                <a
                  href="https://www.facebook.com/groups/hinckleyfixers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-secondary text-secondary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  <FacebookIcon className="w-5 h-5" />
                  HinckleyFixers Facebook
                </a>
                <a
                  href="https://www.instagram.com/Hinckley.fixers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
                >
                  <InstagramIcon className="w-5 h-5" />
                  @Hinckley.fixers
                </a>
              </div>
            </div>

            {/* Summary Box */}
            <div className="relative">
              <textarea
                ref={textareaRef}
                readOnly
                value={generateSummary()}
                className="w-full p-4 border-2 border-border rounded-lg bg-muted text-foreground font-mono text-sm min-h-[300px] resize-none"
              />
              <Button
                onClick={copyToClipboard}
                className="absolute top-3 right-3 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Start Over */}
          <div className="text-center">
            <button
              onClick={() => {
                setIsComplete(false)
                setShowCat(false)
                setStep(0)
                setFormData({
                  powerType: null,
                  turnsOn: null,
                  triedOtherPower: null,
                  issueFrequency: null,
                  makeModel: "",
                  itemAge: "",
                  currentBehavior: "",
                  issueStart: "",
                  triggerEvent: "",
                  physicalDamage: "",
                  hasAccessories: "",
                  sentimentalValue: "",
                })
              }}
              className="text-muted-foreground hover:text-foreground underline transition-colors"
            >
              Start a new request
            </button>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-primary p-3 rounded-xl">
              <Wrench className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              HinckleyFixers
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">Tell us about your broken item</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">Progress</span>
            <span className="text-sm font-medium text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden border border-border">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        {renderQuestion()}
      </div>
    </main>
  )
}

// Components

function QuestionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border-2 border-border rounded-xl p-6 shadow-lg animate-fadeIn">
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function SelectOption({
  selected,
  onClick,
  label,
  description,
}: {
  selected: boolean
  onClick: () => void
  label: string
  description: string
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
        selected
          ? "border-primary bg-primary/10 text-foreground"
          : "border-border bg-input text-foreground hover:border-primary/50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            selected ? "border-primary bg-primary" : "border-muted-foreground"
          }`}
        >
          {selected && <Check className="w-3 h-3 text-primary-foreground" />}
        </div>
        <div>
          <div className="font-semibold">{label}</div>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
      </div>
    </button>
  )
}

function RadioGroup({
  value,
  onChange,
  options,
}: {
  value: string | null
  onChange: (val: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
            value === option.value
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-input text-foreground hover:border-primary/50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                value === option.value ? "border-primary bg-primary" : "border-muted-foreground"
              }`}
            >
              {value === option.value && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
            </div>
            <span className="font-medium">{option.label}</span>
          </div>
        </button>
      ))}
    </div>
  )
}

function NavButtons({
  onBack,
  onNext,
  canProgress,
  isLast = false,
}: {
  onBack?: () => void
  onNext: () => void
  canProgress: boolean
  isLast?: boolean
}) {
  return (
    <div className="flex justify-between mt-6 pt-4 border-t border-border">
      {onBack ? (
        <Button variant="outline" onClick={onBack} className="border-2">
          Back
        </Button>
      ) : (
        <div />
      )}
      <Button
        onClick={onNext}
        disabled={!canProgress}
        className="bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
      >
        {isLast ? "Finish" : "Next"}
      </Button>
    </div>
  )
}

function CatMascot() {
  return (
    <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Construction Hard Hat */}
      <path d="M30 42 L30 38 Q30 22 75 18 Q120 22 120 38 L120 42 Z" fill="#F59E0B" />
      <rect x="25" y="40" width="100" height="8" rx="2" fill="#D97706" />
      <rect x="28" y="42" width="94" height="4" fill="#FBBF24" />
      
      {/* Cat Body */}
      <ellipse cx="75" cy="95" rx="40" ry="45" fill="#FCD34D" />
      
      {/* Cat Head */}
      <circle cx="75" cy="65" r="35" fill="#FCD34D" />
      
      {/* Ears */}
      <path d="M45 45 L35 20 L55 35 Z" fill="#FCD34D" />
      <path d="M105 45 L115 20 L95 35 Z" fill="#FCD34D" />
      <path d="M47 42 L40 25 L53 36 Z" fill="#FBBF24" />
      <path d="M103 42 L110 25 L97 36 Z" fill="#FBBF24" />
      
      {/* Face */}
      <ellipse cx="60" cy="60" rx="6" ry="8" fill="#1F2937" />
      <ellipse cx="90" cy="60" rx="6" ry="8" fill="#1F2937" />
      <ellipse cx="62" cy="58" rx="2" ry="3" fill="white" />
      <ellipse cx="92" cy="58" rx="2" ry="3" fill="white" />
      
      {/* Nose */}
      <path d="M75 70 L71 76 L79 76 Z" fill="#F87171" />
      
      {/* Mouth */}
      <path d="M75 76 Q65 85 60 80" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M75 76 Q85 85 90 80" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
      
      {/* Whiskers */}
      <line x1="55" y1="72" x2="35" y2="68" stroke="#1F2937" strokeWidth="1.5" />
      <line x1="55" y1="76" x2="35" y2="78" stroke="#1F2937" strokeWidth="1.5" />
      <line x1="95" y1="72" x2="115" y2="68" stroke="#1F2937" strokeWidth="1.5" />
      <line x1="95" y1="76" x2="115" y2="78" stroke="#1F2937" strokeWidth="1.5" />
      
      {/* Arms */}
      <ellipse cx="40" cy="100" rx="12" ry="20" fill="#FCD34D" />
      <ellipse cx="110" cy="100" rx="12" ry="20" fill="#FCD34D" />
      
      {/* Wrench in paw */}
      <g transform="translate(95, 75) rotate(25)">
        {/* Wrench handle */}
        <rect x="0" y="8" width="45" height="7" rx="2" fill="#4B5563" />
        {/* Wrench head - open jaw */}
        <path d="M-5 0 L5 0 L8 8 L8 23 L5 23 L5 15 L-2 15 L-2 23 L-5 23 L-5 8 Z" fill="#4B5563" />
        {/* Wrench detail lines */}
        <rect x="5" y="10" width="35" height="1.5" fill="#6B7280" />
      </g>
      
      {/* Feet */}
      <ellipse cx="55" cy="135" rx="15" ry="8" fill="#FCD34D" />
      <ellipse cx="95" cy="135" rx="15" ry="8" fill="#FCD34D" />
    </svg>
  )
}
