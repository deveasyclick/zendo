// src/components/onboarding/InviteStep.tsx
import { useState } from "react";
import { User, X, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InviteProps {
  onFinish: () => void;
  onSkip?: () => void;
}

type TeamMember = {
  email: string;
  role: "admin" | "agent";
};

export function InviteStep({ onFinish, onSkip }: InviteProps) {
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState<TeamMember[]>([
    { email: "sarah.j@zendo.io", role: "agent" },
    { email: "mike.ross@zendo.io", role: "admin" },
  ]);

  const addMember = () => {
    if (!email) return;

    setMembers((prev) => [...prev, { email, role: "agent" }]);
    setEmail("");
  };

  const updateRole = (index: number, role: "admin" | "agent") => {
    setMembers((prev) =>
      prev.map((m, i) => (i === index ? { ...m, role } : m)),
    );
  };

  const removeMember = (index: number) => {
    setMembers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-8 max-w-[640px] mx-auto w-full">
      {/* Headline */}
      <div className="text-center pt-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Invite your team
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-3">
          Zendo works best with your colleagues. Add them now to start managing
          chats together.
        </p>
      </div>

      {/* Invite Input */}
      <div className="flex flex-col md:flex-row gap-3 items-end">
        <div className="flex-1 w-full">
          <label className="text-sm font-medium text-slate-700 dark:text-white">
            Team Member Email
          </label>
          <Input
            type="email"
            placeholder="Enter colleague's email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2"
          />
        </div>

        <Button
          onClick={addMember}
          className="h-12 px-6 uppercase tracking-wider font-bold"
        >
          Add
        </Button>
      </div>

      {/* Members List */}
      <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">
          Added Members
        </p>

        <div className="flex flex-col gap-3 max-h-[240px] overflow-y-auto pr-2">
          {members.map((member, index) => (
            <div
              key={member.email}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {member.email}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <Select
                  value={member.role}
                  onValueChange={(value) =>
                    updateRole(index, value as "admin" | "agent")
                  }
                >
                  <SelectTrigger className="h-8 w-[90px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                  </SelectContent>
                </Select>

                <button
                  onClick={() => removeMember(index)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 px-6 py-5 rounded-lg">
        <Button
          onClick={onSkip}
          className="text-sm text-slate-500 hover:text-primary underline underline-offset-4"
          variant={"link"}
        >
          Skip for now
        </Button>

        <Button
          onClick={onFinish}
          className="h-12 px-6 uppercase tracking-widest font-bold shadow-lg"
        >
          Finish Setup
        </Button>
      </div>

      {/* Security Footer */}
      <div className="flex justify-center items-center gap-2 text-slate-400 text-xs">
        <Lock className="w-4 h-4" />
        <span>Secure & encrypted platform. Zendo.io © 2024</span>
      </div>
    </div>
  );
}
