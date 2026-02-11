const TopNav: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-3">
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="bg-primary text-white p-1.5 rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">
              chat_bubble
            </span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight">Zendo</h2>
        </div>
        <div className="hidden md:flex relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            search
          </span>
          <input
            className="w-64 bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary transition-all"
            placeholder="Search settings..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors relative">
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
            notifications
          </span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
        </button>
        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-400">
            help_outline
          </span>
        </button>
        <div className="h-8 w-[1px] bg-slate-200 dark:border-slate-800 mx-1"></div>
        <div className="flex items-center gap-3 pl-2">
          <div className="bg-primary/10 text-primary font-bold w-9 h-9 flex items-center justify-center rounded-full text-sm border border-primary/20">
            JS
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
