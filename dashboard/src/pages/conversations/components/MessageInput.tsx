import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import IconButton from "@/components/IconButton";
import { Paperclip, SendHorizonal, Smile, Zap } from "lucide-react";

type FormValues = {
  message: string;
};

export function MessageInput() {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("send message:", data.message);
    reset();
  };

  return (
    <footer className="p-4 border-t border-[#d1e2e6] dark:border-gray-700">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#f8fbfb] dark:bg-gray-800 rounded-xl p-2 border border-[#d1e2e6] dark:border-gray-700 focus-within:ring-2 ring-primary/20"
      >
        <Textarea
          {...register("message")}
          placeholder="Type your message or use '/' for macros..."
          className="min-h-20 resize-none bg-transparent border-none focus-visible:ring-0"
        />

        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="flex gap-1">
            <IconButton icon={Paperclip} />
            <IconButton icon={Zap} />
            <IconButton icon={Smile} />
          </div>

          <Button type="submit" size="sm">
            <span className="material-symbols-outlined text-sm ml-1 inline-flex gap-2 items-center justify-center">
              send <SendHorizonal />
            </span>
          </Button>
        </div>
      </form>
    </footer>
  );
}
