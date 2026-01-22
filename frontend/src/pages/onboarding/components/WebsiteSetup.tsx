import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowRight, Headset } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  WebsiteSetupSchema,
  type WebsiteSetupFormValues,
} from "../onboarding.schema";
import { Button } from "@/components/ui/button";

const INDUSTRIES = [
  { value: "saas", label: "SaaS & Technology" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];
interface WebsiteSetupProps {
  onNext: () => void;
}

export function WebsiteSetupStep({ onNext }: WebsiteSetupProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<WebsiteSetupFormValues>({
    resolver: zodResolver(WebsiteSetupSchema),
    defaultValues: {
      companyName: "",
      websiteUrl: "",
      industry: "",
    },
  });

  const onSubmit = (data: WebsiteSetupFormValues) => {
    console.log("Form Submitted:", data);
    if (onNext) onNext();
  };

  return (
    <section className="grid grid-cols-2">
      <div className="px-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-2 dark:text-white">
          Welcome to Zendo!
        </h1>

        <p className="text-base text-slate-500 mb-8 dark:text-white">
          Let's get your account set up in just a few minutes.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 space-y-6"
        >
          {/* Company Name */}
          <div className="flex flex-col gap-2">
            <Label>Company Name</Label>
            <Input placeholder="e.g. Acme Corp" {...register("companyName")} />
            {errors.companyName && (
              <p className="text-red-500 text-xs">
                {errors.companyName.message}
              </p>
            )}
          </div>

          {/* Website URL */}
          <div className="flex flex-col gap-2">
            <Label>Website URL</Label>
            <Input
              type="url"
              placeholder="https://example.com"
              {...register("websiteUrl")}
            />
            {errors.websiteUrl && (
              <p className="text-red-500 text-xs">
                {errors.websiteUrl.message}
              </p>
            )}
          </div>

          {/* Industry */}
          <div className="flex flex-col gap-2">
            <Label>Industry</Label>
            <Select
              value={watch("industry")}
              onValueChange={(value) => setValue("industry", value)}
            >
              <SelectTrigger className="cursor-pointer">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {INDUSTRIES.map((i) => (
                  <SelectItem
                    className="text-black"
                    key={i.value}
                    value={i.value}
                  >
                    {i.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.industry && (
              <p className="text-red-500 text-xs">{errors.industry.message}</p>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto flex flex-col gap-4 pt-10">
            <Button
              type="submit"
              className="w-full py-4 flex items-center justify-center gap-2 text-white cursor-pointer"
            >
              Continue <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-center text-slate-400 text-xs">
              Already have an account?{" "}
              <a href="#" className="text-primary hover:underline">
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>

      {/* Right section */}
      <div>
        <div className="hidden md:flex flex-1 bg-slate-50 dark:bg-slate-800/50 items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full -ml-10 -mb-10"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-72 h-72 mb-8 flex items-center justify-center bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-4 border border-slate-100 dark:border-slate-800">
              <div className="w-full h-full rounded-2xl bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
                <Headset className="text-primary w-20 h-20" />
              </div>
            </div>
            <div className="max-w-[280px]">
              <h3 className="text-xl font-bold dark:text-white mb-2">
                We're here to help
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed dark:text-slate-400">
                Zendo helps thousands of teams deliver exceptional support in
                real-time.
              </p>
            </div>
            <div className="absolute top-20 right-10 bg-white dark:bg-slate-900 p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-2 animate-bounce">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Live now
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
