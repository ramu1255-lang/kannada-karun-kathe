import { useEffect, useRef, useState } from "react";
import { Loader2, Square, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const audioCache = new Map<string, string>();

/**
 * Plays Kannada audio. Order: device Kannada voice (free, offline) → AI speech service →
 * honest message pointing to the written pronunciation guide.
 */
export function ListenButton({ text, label }: { text: string; label?: string }) {
  const [voice, setVoice] = useState<SpeechSynthesisVoice>();
  const [state, setState] = useState<"idle" | "loading" | "playing">("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const load = () => setVoice(speechSynthesis.getVoices().find((v) => v.lang.toLowerCase().startsWith("kn")));
    load();
    speechSynthesis.addEventListener("voiceschanged", load);
    return () => {
      speechSynthesis.removeEventListener("voiceschanged", load);
      audioRef.current?.pause();
    };
  }, []);

  const stop = () => {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    audioRef.current?.pause();
    setState("idle");
  };

  const play = async () => {
    if (state !== "idle") return stop();
    if (voice) {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.voice = voice;
      u.lang = "kn-IN";
      u.rate = 0.8;
      u.onend = () => setState("idle");
      u.onerror = () => setState("idle");
      setState("playing");
      speechSynthesis.speak(u);
      return;
    }
    setState("loading");
    try {
      let url = audioCache.get(text);
      if (!url) {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        if (!res.ok) throw new Error(String(res.status));
        url = URL.createObjectURL(await res.blob());
        audioCache.set(text, url);
      }
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setState("idle");
      audio.onerror = () => setState("idle");
      setState("playing");
      await audio.play();
    } catch {
      setState("idle");
      toast.info("Kannada audio is unavailable right now. Please use the written pronunciation guide.");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={state === "idle" ? (label ?? `Listen to ${text}`) : "Stop audio"}
      onClick={() => void play()}
    >
      {state === "loading" ? <Loader2 className="animate-spin" /> : state === "playing" ? <Square /> : <Volume2 />}
    </Button>
  );
}
