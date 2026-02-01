import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chatSchema } from "./schemas/chat.schema";
import { Appearance } from "./components/Appearance";
import { Content } from "./components/Content";
import { Features } from "./components/Features";
import { LivePreview } from "./components/LivePreview";

export default function ChatWidgetSettingsPage() {
  const methods = useForm({
    resolver: zodResolver(chatSchema),
    defaultValues: chatSchema.parse({}),
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col lg:flex-row gap-8 p-8">
        <div className="flex-1 max-w-2xl space-y-10">
          <Appearance />
          <Content />
          <Features />
        </div>
        <div className="lg:w-100 shrink-0 sticky top-32 h-fit">
          <LivePreview />
        </div>
      </div>
    </FormProvider>
  );
}
