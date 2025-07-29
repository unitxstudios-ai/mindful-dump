import { useLocation, useNavigate } from "react-router-dom";
import { Home, BookOpen, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", icon: Home, label: "Home" },
  { path: "/journal", icon: BookOpen, label: "Journal" },
  { path: "/insights", icon: BarChart3, label: "Insights" },
  { path: "/profile", icon: User, label: "Profile" },
];

export function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[430px] bg-card/90 backdrop-blur-md border-t border-border px-4 py-2 safe-area-inset-bottom">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200",
                isActive 
                  ? "text-primary bg-primary-soft" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}