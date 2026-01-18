import { lazy } from "react";

const InfoStep = lazy(() => import("../onboarding/steps/information"));
const AddressStep = lazy(() => import("../onboarding/steps/address"));
const ReviewStep = lazy(() => import("../onboarding/steps/review"));

export const STEP_VALIDATION_FIELDS = [
  ["name", "organizationName", "organizationUrl", "logo"],
  [
    "email",
    "phone",
    "address.state",
    "address.city",
    "address.address",
    "address.zip",
    "address.country",
  ],
  [],
] as const;

export const ONBOARDING_STEPS = [
  { component: InfoStep, label: "Org Information" },
  { component: AddressStep, label: "Org Address" },
  {
    component: ReviewStep,
    label: "Review & Submit",
    description: "Review all information before submitting.",
  },
];

export const DEFAULT_ORG_ONBOARDING_FORM_VALUES = {
  name: "",
  organizationName: "",
  organizationUrl: "",
  email: "",
  phone: "",
  address: {
    state: "",
    city: "",
    address: "",
    zip: "",
    country: "",
  },
};
