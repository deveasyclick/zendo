// src/pages/Onboarding.tsx
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { WebsiteSetupStep } from "./components/WebsiteSetup";
import { WidgetSetupStep } from "./components/WidgetSetup";
import { InviteStep } from "./components/Invite";
import { useNavigate } from "react-router";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const stepsProgress = ["Profile Setup", "Widget Setup", "Team Configuration"];
  const onFinish = () => {
    navigate("/dashboard", {
      replace: true,
    });
  };
  return (
    <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
      <div className="max-w-[1000px] w-full bg-white rounded-xl shadow-xl flex flex-col md:flex-row min-h-[600px] border border-slate-200 dark:border-slate-900  overflow-hidden dark:bg-gray-800">
        <div className="flex-1 p-8 md:p-12 flex flex-col">
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-primary text-xs font-bold uppercase tracking-wider">
                Step {step} of 3
              </span>
              {/* Progress */}
              <span className="text-slate-400  text-xs">
                {stepsProgress[step - 1]}
              </span>
            </div>
            <Progress value={(step / 3) * 100} className="h-1.5 mb-1" />
            {step !== 3 && (
              <small className="text-primary opacity-60">
                Next: {stepsProgress[step]}
              </small>
            )}
          </div>

          {step === 1 && <WebsiteSetupStep onNext={() => setStep(2)} />}
          {step === 2 && <WidgetSetupStep onNext={() => setStep(3)} />}
          {step === 3 && <InviteStep onFinish={onFinish} onSkip={onFinish} />}
        </div>
      </div>
    </main>
  );
}
