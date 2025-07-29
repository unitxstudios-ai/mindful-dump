import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PenTool, Sparkles, Moon, Sun } from "lucide-react";

const motivationalQuotes = [
  "Every feeling is temporary, but growth is permanent.",
  "Your thoughts create your reality. Choose them wisely.",
  "Today is a new page in your story.",
  "Be kind to your mind. It's the only one you have.",
  "Small steps lead to big changes.",
  "Your mental health matters. You matter.",
  "Progress, not perfection.",
  "You are worthy of peace and happiness."
];

export default function Home() {
  const navigate = useNavigate();
  const [dailyQuote, setDailyQuote] = useState("");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Get a consistent daily quote based on the date
    const today = new Date().toDateString();
    const savedQuote = localStorage.getItem(`quote-${today}`);
    
    if (savedQuote) {
      setDailyQuote(savedQuote);
    } else {
      const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
      setDailyQuote(randomQuote);
      localStorage.setItem(`quote-${today}`, randomQuote);
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="p-6 space-y-6 fade-in">
      {/* Header with theme toggle */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Welcome back</h1>
          <p className="text-muted-foreground">How are you feeling today?</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full hover:bg-muted"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>

      {/* Daily Quote Card */}
      <Card className="p-6 gradient-soft border-none shadow-soft hover-lift">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-foreground mb-2">Today's Thought</h3>
            <p className="text-foreground/80 italic leading-relaxed">"{dailyQuote}"</p>
          </div>
        </div>
      </Card>

      {/* Start Journaling Button */}
      <Button 
        onClick={() => navigate("/journal")}
        className="w-full h-14 gradient-primary text-white font-medium rounded-2xl shadow-soft hover:shadow-glow transition-all duration-300"
      >
        <PenTool className="w-5 h-5 mr-2" />
        Start Journaling
      </Button>

      {/* Ad Banner Slot */}
      <Card className="p-4 bg-muted/30 border-dashed border-2 border-muted-foreground/20">
        <div className="text-center text-muted-foreground text-sm">
          📱 Ad Banner Slot
          <br />
          <span className="text-xs">Advertisement placeholder</span>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 hover-lift">
          <div className="text-center">
            <div className="text-2xl font-semibold text-primary">7</div>
            <div className="text-sm text-muted-foreground">Day Streak</div>
          </div>
        </Card>
        <Card className="p-4 hover-lift">
          <div className="text-center">
            <div className="text-2xl font-semibold text-secondary">23</div>
            <div className="text-sm text-muted-foreground">Total Entries</div>
          </div>
        </Card>
      </div>
    </div>
  );
}