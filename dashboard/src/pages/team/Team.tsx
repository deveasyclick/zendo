import { TeamFilters } from "./components/TeamFilters";
import { TeamHeader } from "./components/TeamHeader";
import { TeamStats } from "./components/TeamStats";
import { TeamTable } from "./components/TeamTable";
import type { TeamMember } from "./types";

const members: TeamMember[] = [
  {
    id: "1",
    name: "David Chen",
    email: "david.c@zendo.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBoVql2CxMTcB0XRSGZ5blghriLpEQLJZfvFjMCfNhroMPSA7c_BBBWodT-fUZgs2MSgWpy6wgkL0jkO-4FFt0tEcG1QxdmH61smkCYcpDy-DJEp6HLk4jqf_gHbD0J9qNJe94l_I2D2GRlFP37FXA7LgllhzycIpcH_rVupNykbPAEmOYiQH9t9toMplccruStAJJDMz9aecn_xdLhZdnMIAEHKW82ilI5Q4z8YJtv0QYrL5f_-_qAji4ZRXhVHBbgIAqq6slpA2g",
    role: "Manager",
    status: "Online",
    lastActive: "Just now",
  },
];

export default function TeamPage() {
  const handleFilterChange = () => {};
  return (
    <main className="flex-1 bg-[#f8fbfb] dark:bg-background-dark/50">
      <TeamHeader total={24} />
      <div className="p-8 space-y-6">
        <TeamFilters onChange={handleFilterChange} />
        <TeamTable data={members} role="All" status="All" />
        <TeamStats />
      </div>
    </main>
  );
}
