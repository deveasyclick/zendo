import StepIndicator from "../components/StepIndicator";
import MultiStepForm from "../components/MultiStepForm";
import { Form } from "@/components/ui/form";
import useOrgOnboarding from "../hooks/useOrgOnboarding";
import { ONBOARDING_STEPS } from "../constants";

// Helper to determine step status
const getStepStatus = (
  current: number,
  idx: number
): "current" | "upcoming" | "completed" => {
  if (idx === current) return "current";
  if (idx > current) return "upcoming";
  return "completed";
};

export default function OrgOnboarding() {
  const { step, next, prev, createOrgQueryProps, handleSubmit, form } =
    useOrgOnboarding();
  return (
    <main className="flex w-full md:w-3/4 justify-self-center">
      <section className="w-2/5 hidden md:block">
        {ONBOARDING_STEPS.map(({ label }, index) => (
          <StepIndicator
            label={label}
            key={index}
            id={index + 1}
            status={getStepStatus(step, index)}
          />
        ))}
      </section>
      <section className="w-full md:w-3/5">
        <Form {...form}>
          <MultiStepForm
            next={next}
            prev={prev}
            currentStep={step}
            onSubmit={handleSubmit}
            isSubmitting={createOrgQueryProps.isPending}
            error={createOrgQueryProps.error?.message}
          />
        </Form>
      </section>
    </main>
  );
}
