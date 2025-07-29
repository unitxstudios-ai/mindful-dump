import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock AI responses for demonstration
const mockMoodAnalysis = [
  "anxious", "hopeful", "reflective", "grateful", "confused", 
  "peaceful", "excited", "melancholy", "optimistic", "contemplative"
];

const mockAffirmations = [
  "Your feelings are valid and this moment will pass.",
  "You have the strength to overcome any challenge.",
  "Every day is a new opportunity for growth and healing.",
  "You are exactly where you need to be right now.",
  "Your journey is unique and valuable.",
  "Trust in your ability to navigate through difficult times.",
  "You deserve kindness, especially from yourself.",
  "Your vulnerability is a sign of courage, not weakness."
];

export default function Journal() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [journalText, setJournalText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [mood, setMood] = useState("");
  const [affirmation, setAffirmation] = useState("");

  const handleSubmit = async () => {
    if (!journalText.trim()) {
      toast({
        description: "Please write something before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate AI processing
    setTimeout(() => {
      const randomMood = mockMoodAnalysis[Math.floor(Math.random() * mockMoodAnalysis.length)];
      const randomAffirmation = mockAffirmations[Math.floor(Math.random() * mockAffirmations.length)];
      
      setMood(randomMood);
      setAffirmation(randomAffirmation);
      
      // Save to localStorage
      const entry = {
        id: Date.now(),
        text: journalText,
        mood: randomMood,
        affirmation: randomAffirmation,
        date: new Date().toISOString(),
      };
      
      const existingEntries = JSON.parse(localStorage.getItem("journalEntries") || "[]");
      existingEntries.unshift(entry);
      localStorage.setItem("journalEntries", JSON.stringify(existingEntries));
      
      setIsSubmitting(false);
      setShowResults(true);
    }, 2000);
  };

  const handleStartNew = () => {
    setJournalText("");
    setShowResults(false);
    setMood("");
    setAffirmation("");
  };

  if (showResults) {
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
          <h1 className="text-xl font-semibold">AI Analysis</h1>
        </div>

        <div className="space-y-4">
          {/* Mood Analysis */}
          <Card className="p-6 border-none shadow-soft">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Detected Mood</h3>
                <p className="text-sm text-muted-foreground">AI analysis of your entry</p>
              </div>
            </div>
            <div className="text-center p-4 bg-primary-soft rounded-xl">
              <span className="text-2xl font-semibold text-primary capitalize">{mood}</span>
            </div>
          </Card>

          {/* Affirmation */}
          <Card className="p-6 gradient-secondary border-none shadow-soft">
            <h3 className="font-medium mb-3 text-white">Personalized Insight</h3>
            <p className="text-white/90 italic leading-relaxed">"{affirmation}"</p>
          </Card>

          {/* Ad Banner */}
          <Card className="p-4 bg-muted/30 border-dashed border-2 border-muted-foreground/20">
            <div className="text-center text-muted-foreground text-sm">
              📱 Ad Banner Slot
            </div>
          </Card>
        </div>

        <div className="space-y-3">
          <Button 
            onClick={handleStartNew}
            className="w-full h-12 gradient-primary text-white font-medium rounded-2xl"
          >
            Write Another Entry
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigate("/insights")}
            className="w-full h-12 rounded-2xl"
          >
            View All Entries
          </Button>
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
          <h1 className="text-xl font-semibold">Journal Entry</h1>
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      <Card className="p-6 space-y-4 border-none shadow-soft">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            How are you feeling? What's on your mind?
          </label>
          <Textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Write about your thoughts, feelings, experiences, or anything else on your mind..."
            className="min-h-[200px] border-none bg-muted/30 rounded-xl resize-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        
        <div className="text-right text-sm text-muted-foreground">
          {journalText.length} characters
        </div>
      </Card>

      <Button 
        onClick={handleSubmit}
        disabled={isSubmitting || !journalText.trim()}
        className="w-full h-14 gradient-primary text-white font-medium rounded-2xl shadow-soft disabled:opacity-50"
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Analyzing...
          </div>
        ) : (
          <>
            <Send className="w-5 h-5 mr-2" />
            Get AI Insights
          </>
        )}
      </Button>
    </div>
  );
}