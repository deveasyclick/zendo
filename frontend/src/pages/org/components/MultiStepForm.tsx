import Icon from "@/components/icons";
import { Button } from "@/components/ui/button";
import React from "react";
import { ONBOARDING_STEPS } from "../constants";

type MultiStepFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  currentStep: number;
  prev: () => void;
  next: () => void;
  isSubmitting?: boolean;
  error?: string;
};

const baseButtonStyle =
  "text-dark dark:text-white px-6 py-2 cursor-pointer font-bold rounded-md hover:bg-primary-600";
const MultiStepForm = ({
  onSubmit,
  currentStep,
  prev,
  next,
  isSubmitting,
  error,
}: MultiStepFormProps) => {
  const {
    component: CurrentStep,
    label,
    description,
  } = ONBOARDING_STEPS[currentStep];

  return (
    <form onSubmit={onSubmit}>
      <small className="text-md md:hidden">
        {currentStep + 1}/{ONBOARDING_STEPS.length}
      </small>
      <h2 className="mb-2">{label}</h2>
      <p className="mb-6">{description}</p>
      <CurrentStep />

      <div className="flex justify-between mt-10">
        {currentStep > 0 && (
          <Button className={baseButtonStyle} type="button" onClick={prev}>
            <Icon name="arrowLeft" className="w-4 h-4 inline mr-2" />
            Back
          </Button>
        )}

        {currentStep < ONBOARDING_STEPS.length - 1 && (
          <Button className={baseButtonStyle} type="button" onClick={next}>
            Next
            <Icon name="arrowRight" className="w-4 h-4 inline ml-2" />
          </Button>
        )}

        {currentStep === ONBOARDING_STEPS.length - 1 && (
          <div className="flex flex-col items-end gap-2">
            <Button
              className={`px-6 py-2 cursor-pointer font-bold rounded-md text-white bg-primary hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Icon name="loader" className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        )}
      </div>
      {error && (
        <p
          className="text-sm text-red-600 dark:text-red-400 pt-4 text-center"
          role="alert"
        >
          {error}
        </p>
      )}
    </form>
  );
};

export default MultiStepForm;
