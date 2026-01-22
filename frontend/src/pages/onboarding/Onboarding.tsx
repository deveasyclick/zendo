// src/pages/Onboarding.tsx
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { WebsiteSetupStep } from "./components/WebsiteSetup";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);

  return (
    <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
      <div className="max-w-[1000px] w-full bg-white rounded-xl shadow-xl flex flex-col md:flex-row min-h-[600px] border border-slate-200 dark:border-slate-900  overflow-hidden dark:bg-gray-800">
        {/* Left Content */}
        <div className="flex-1 p-8 md:p-12 flex flex-col">
          {/* Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary text-xs font-bold uppercase tracking-wider">
                Step {step} of 3
              </span>
              <span className="text-slate-400  text-xs">Profile Setup</span>
            </div>
            <Progress value={(step / 3) * 100} className="h-1.5" />
          </div>

          {/* Step Content */}
          {step === 1 && <WebsiteSetupStep onNext={() => setStep(2)} />}
          {/* {step === 2 && (
              <StepPlaceholder step={2} onNext={() => setStep(3)} />
            )}
            {step === 3 && (
              <StepPlaceholder step={3} onNext={() => console.log("Done")} />
            )} */}
        </div>
      </div>
    </main>
  );
}
