import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Moon, Sun, Bell, Shield, Heart, MessageCircle } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="p-6 space-y-6 fade-in">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/")}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold">Profile</h1>
      </div>

      {/* Profile Header */}
      <Card className="p-6 text-center border-none shadow-soft gradient-soft">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-xl font-semibold mb-1">Welcome to Mind Dump</h2>
        <p className="text-muted-foreground">Your personal wellness companion</p>
      </Card>

      {/* Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Settings</h3>
        
        {/* Theme Toggle */}
        <Card className="p-4 border-none shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isDark ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
              <div>
                <div className="font-medium">Dark Mode</div>
                <div className="text-sm text-muted-foreground">
                  {isDark ? "Dark theme enabled" : "Light theme enabled"}
                </div>
              </div>
            </div>
            <Switch checked={isDark} onCheckedChange={toggleTheme} />
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-4 border-none shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <div className="font-medium">Daily Reminders</div>
                <div className="text-sm text-muted-foreground">Get gentle journaling reminders</div>
              </div>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
        </Card>

        {/* Privacy */}
        <Card className="p-4 border-none shadow-soft">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <div>
              <div className="font-medium">Privacy & Security</div>
              <div className="text-sm text-muted-foreground">Your data is stored locally on your device</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Ad Banner */}
      <Card className="p-4 bg-muted/30 border-dashed border-2 border-muted-foreground/20">
        <div className="text-center text-muted-foreground text-sm">
          📱 Ad Banner Slot
          <br />
          <span className="text-xs">Premium upgrade available</span>
        </div>
      </Card>

      {/* Feedback Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Support</h3>
        
        <Card className="p-4 border-none shadow-soft hover-lift cursor-pointer">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-primary" />
            <div>
              <div className="font-medium">Send Feedback</div>
              <div className="text-sm text-muted-foreground">Help us improve Mind Dump</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Stats Summary */}
      <Card className="p-6 border-none shadow-soft">
        <h3 className="font-medium mb-4">Your Journey</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-semibold text-primary">23</div>
            <div className="text-sm text-muted-foreground">Total Entries</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-secondary">7</div>
            <div className="text-sm text-muted-foreground">Current Streak</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-accent">2</div>
            <div className="text-sm text-muted-foreground">Weeks Active</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-success">94%</div>
            <div className="text-sm text-muted-foreground">Consistency</div>
          </div>
        </div>
      </Card>

      <div className="text-center text-xs text-muted-foreground pb-8">
        Mind Dump v1.0 • Made with ❤️ for your wellness
      </div>
    </div>
  );
}