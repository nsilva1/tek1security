export default function SupervisorDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="px-6 py-4 bg-card shadow-sm flex justify-between items-center border-b border-border">
        <h1 className="text-2xl font-bold text-primary">Supervisor Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
            S
          </div>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold mb-2">Welcome back, Supervisor!</h2>
          <p className="text-muted-foreground">Here is an overview of your team and site activities.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card p-6 rounded-2xl shadow-sm border border-border flex flex-col justify-between hover:shadow-md transition-all duration-200 group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Site Metric {i}</p>
                  <h3 className="text-2xl font-bold mt-1 group-hover:text-primary transition-colors">12</h3>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <div className="w-5 h-5 rounded-full bg-primary/50" />
                </div>
              </div>
              <p className="text-xs text-emerald-500 font-medium">Active sites</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl shadow-sm border border-border flex-1 min-h-[400px] p-6">
          <h3 className="text-xl font-bold mb-6">Recent Team Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 items-center p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Guard checked in</p>
                  <p className="text-xs text-muted-foreground">{i * 30} minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
