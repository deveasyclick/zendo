import { useCreateOrg } from "@/queries/org";
import { useFetchMe } from "@/queries/user";
import { orgOnboardingSchema, type OrgOnboardingData } from "@/schema/org";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  DEFAULT_ORG_ONBOARDING_FORM_VALUES,
  STEP_VALIDATION_FIELDS,
} from "../constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const useOrgOnboarding = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { refetch } = useFetchMe();
  const form = useForm<OrgOnboardingData>({
    resolver: zodResolver(orgOnboardingSchema),
    defaultValues: DEFAULT_ORG_ONBOARDING_FORM_VALUES,
    mode: "onChange",
  });
  const { mutate: createOrg, ...createOrgQueryProps } = useCreateOrg();

  const next = async () => {
    form.clearErrors();
    createOrgQueryProps.reset();
    const fieldsToValidate = STEP_VALIDATION_FIELDS[step] || [];
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep((s) => s + 1);
    }
  };

  const prev = () => {
    form.clearErrors();
    createOrgQueryProps.reset();
    setStep((s) => s - 1);
  };
  const handleSubmit = async (data: OrgOnboardingData) => {
    form.clearErrors();
    try {
      const formData = {
        ...data,
        logo: "",
      };

      createOrg(formData, {
        onSuccess: async () => {
          // Refetch distributor to preload org
          await refetch();
          // Redirect to dashboard
          navigate("/");
        },
        onError: (err) => {
          console.log(err);
          form.setError("root.onboarding", {
            message: "failed to create org. Please try again.",
            type: "server",
          });
        },
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      form.setError("root.onboarding", {
        message: "An unexpected error occurred. Please try again.",
        type: "server",
      });
    }
  };

  return {
    next,
    prev,
    step,
    handleSubmit: form.handleSubmit(handleSubmit),
    createOrgQueryProps,
    form,
  };
};

export default useOrgOnboarding;
