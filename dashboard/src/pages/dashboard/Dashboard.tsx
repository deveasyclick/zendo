import { ChannelHealth } from "./components/ChannelHealth";
import { RecentActivity } from "./components/RecentActivity";
import { StatsGrid } from "./components/stats/StatsGrid";
import { Topbar } from "./components/TopBar";

function Dashboard() {
  return (
    <section>
      <Topbar />
      <div className="space-y-8 p-8">
        <header>
          <h2 className="text-2xl font-bold">Real-time Overview</h2>
          <p className="text-gray-500">
            Live snapshots of your active support operations.
          </p>
        </header>
        <StatsGrid />
        <main>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
            <ChannelHealth />
          </div>
        </main>
      </div>
    </section>
  );
}

export default Dashboard;
