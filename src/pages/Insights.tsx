import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, TrendingUp, Heart } from "lucide-react";
import { format } from "date-fns";

interface JournalEntry {
  id: number;
  text: string;
  mood: string;
  affirmation: string;
  date: string;
}

export default function Insights() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    const savedEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
    setEntries(savedEntries);
  }, []);

  const getMoodColor = (mood: string) => {
    const moodColors: { [key: string]: string } = {
      anxious: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
      hopeful: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
      reflective: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
      grateful: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
      peaceful: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
      excited: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
      melancholy: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    };
    return moodColors[mood] || "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300";
  };

  if (selectedEntry) {
    return (
      <div className="p-6 space-y-6 fade-in">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedEntry(null)}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold">Entry Details</h1>
            <p className="text-sm text-muted-foreground">
              {format(new Date(selectedEntry.date), "MMMM d, yyyy 'at' h:mm a")}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Mood */}
          <Card className="p-4 border-none shadow-soft">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="w-5 h-5 text-primary" />
              <span className="font-medium">Mood</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getMoodColor(selectedEntry.mood)}`}>
              {selectedEntry.mood}
            </span>
          </Card>

          {/* Journal Text */}
          <Card className="p-6 border-none shadow-soft">
            <h3 className="font-medium mb-3">Your Thoughts</h3>
            <p className="text-foreground/80 leading-relaxed">{selectedEntry.text}</p>
          </Card>

          {/* AI Insight */}
          <Card className="p-6 gradient-secondary border-none shadow-soft">
            <h3 className="font-medium mb-3 text-white">AI Insight</h3>
            <p className="text-white/90 italic leading-relaxed">"{selectedEntry.affirmation}"</p>
          </Card>
        </div>
      </div>
    );
  }

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
        <div>
          <h1 className="text-xl font-semibold">Your Insights</h1>
          <p className="text-sm text-muted-foreground">{entries.length} total entries</p>
        </div>
      </div>

      {/* Weekly Summary Card */}
      {entries.length > 0 && (
        <Card className="p-6 gradient-soft border-none shadow-soft">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">This Week's Journey</h3>
              <p className="text-sm text-muted-foreground">Your emotional patterns</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-primary">{entries.length}</div>
              <div className="text-xs text-muted-foreground">Entries</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-secondary">7</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-accent">94%</div>
              <div className="text-xs text-muted-foreground">Mindful</div>
            </div>
          </div>
        </Card>
      )}

      {/* Ad Banner */}
      <Card className="p-4 bg-muted/30 border-dashed border-2 border-muted-foreground/20">
        <div className="text-center text-muted-foreground text-sm">
          📱 Ad Banner Slot
        </div>
      </Card>

      {/* Entries List */}
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Recent Entries</h2>
        {entries.length === 0 ? (
          <Card className="p-8 text-center border-none shadow-soft">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <h3 className="font-medium text-foreground mb-2">No entries yet</h3>
            <p className="text-muted-foreground mb-4">Start your journaling journey today</p>
            <Button onClick={() => navigate("/journal")} className="gradient-primary text-white rounded-2xl">
              Write Your First Entry
            </Button>
          </Card>
        ) : (
          entries.map((entry) => (
            <Card 
              key={entry.id}
              className="p-4 border-none shadow-soft hover-lift cursor-pointer"
              onClick={() => setSelectedEntry(entry)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getMoodColor(entry.mood)}`}>
                      {entry.mood}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(entry.date), "MMM d, h:mm a")}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/70 line-clamp-2">
                    {entry.text.length > 100 ? `${entry.text.substring(0, 100)}...` : entry.text}
                  </p>
                </div>
              </div>
              <div className="bg-accent-soft p-3 rounded-lg">
                <p className="text-xs text-accent-foreground italic">
                  "{entry.affirmation.length > 80 ? `${entry.affirmation.substring(0, 80)}...` : entry.affirmation}"
                </p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}