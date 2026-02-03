import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { chatSchema } from "./schemas/chat.schema";
import { Appearance } from "./components/Appearance";
import { Content } from "./components/Content";
import { Features } from "./components/Features";
import { LivePreview } from "./components/LivePreview";
import { SettingsHeader } from "../../components/Header";

export default function ChatWidgetSettingsPage() {
  const methods = useForm({
    resolver: zodResolver(chatSchema),
    defaultValues: chatSchema.parse({}),
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-8 w-full">
        <SettingsHeader
          title="Chat Widget"
          description="Configure how the chat bubble appears on your website."
        />
        <div className="flex p-8 space-y-10 gap-8">
          <div className="flex flex-col max-w-2xl  w-6/10 gap-10">
            <Appearance />
            <Content />
            <Features />
          </div>
          <div className="lg:w-100 shrink-0 sticky top-32 h-fit w-4/10">
            <LivePreview />
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
