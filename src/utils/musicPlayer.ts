/**
 * Mohabbatein Love Theme Instrumental Synthesizer & Music Manager
 * Synthesizes the iconic romantic violin & piano melody of Mohabbatein
 * using Web Audio API with natural vibrato and acoustic resonance.
 */

// Note frequency map (in Hz)
const NOTES: Record<string, number> = {
  "A3": 220.00,
  "Bb3": 233.08,
  "B3": 246.94,
  "C4": 261.63,
  "C#4": 277.18,
  "D4": 293.66,
  "Eb4": 311.13,
  "E4": 329.63,
  "F4": 349.23,
  "F#4": 369.99,
  "G4": 392.00,
  "G#4": 415.30,
  "A4": 440.00,
  "Bb4": 466.16,
  "B4": 493.88,
  "C5": 523.25,
  "C#5": 554.37,
  "D5": 587.33,
  "Eb5": 622.25,
  "E5": 659.25,
  "F5": 698.46,
};

// Iconic Mohabbatein Violin melody note durations (note, duration in seconds)
const MOHABBATEIN_MELODY: Array<{ note: string; dur: number; pause?: number }> = [
  // Phrase 1
  { note: "D4", dur: 0.6 },
  { note: "E4", dur: 0.5 },
  { note: "F4", dur: 0.8 },
  { note: "G4", dur: 0.6 },
  { note: "A4", dur: 1.2 },
  { note: "F4", dur: 0.6 },
  { note: "E4", dur: 0.6 },
  { note: "D4", dur: 1.4, pause: 0.3 },

  // Phrase 2
  { note: "D4", dur: 0.6 },
  { note: "F4", dur: 0.6 },
  { note: "A4", dur: 0.8 },
  { note: "D5", dur: 1.2 },
  { note: "C#5", dur: 0.8 },
  { note: "A4", dur: 0.7 },
  { note: "F4", dur: 0.6 },
  { note: "E4", dur: 1.4, pause: 0.3 },

  // Phrase 3
  { note: "G4", dur: 0.6 },
  { note: "F4", dur: 0.6 },
  { note: "E4", dur: 0.7 },
  { note: "D4", dur: 0.7 },
  { note: "C#4", dur: 0.8 },
  { note: "D4", dur: 0.6 },
  { note: "E4", dur: 0.7 },
  { note: "F4", dur: 0.8 },
  { note: "D4", dur: 2.0, pause: 0.6 },
];

class MohabbateinMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private masterGain: GainNode | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      // Check if user had it playing previously
      const saved = localStorage.getItem("lime_green_music_playing");
      if (saved === "true") {
        // Will start on first user interaction
        const startOnFirstGesture = () => {
          this.play();
          window.removeEventListener("click", startOnFirstGesture);
          window.removeEventListener("keydown", startOnFirstGesture);
          window.removeEventListener("touchstart", startOnFirstGesture);
        };
        window.addEventListener("click", startOnFirstGesture, { once: true });
        window.addEventListener("keydown", startOnFirstGesture, { once: true });
        window.addEventListener("touchstart", startOnFirstGesture, { once: true });
      }
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public subscribe(cb: (playing: boolean) => void): () => void {
    this.listeners.add(cb);
    cb(this.isPlaying);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
    if (typeof window !== "undefined") {
      localStorage.setItem("lime_green_music_playing", this.isPlaying ? "true" : "false");
    }
  }

  public getStatus() {
    return this.isPlaying;
  }

  public play() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.notify();
    this.playLoop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
    this.notify();
  }

  public toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.play();
    }
  }

  private playTone(freq: number, duration: number, startTime: number) {
    if (!this.ctx || !this.masterGain) return;

    // Violin timbre simulation using dual saw/triangle oscillators with subtle vibrato
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = "sawtooth";
    osc2.type = "triangle";

    // Warm filter for acoustic string resonance
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, startTime);
    filter.Q.setValueAtTime(2.2, startTime);

    // Vibrato LFO (5.2 Hz gentle romantic vibrato)
    vibrato.frequency.setValueAtTime(5.2, startTime);
    vibratoGain.gain.setValueAtTime(2.5, startTime);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc1.frequency);
    vibratoGain.connect(osc2.frequency);

    osc1.frequency.setValueAtTime(freq, startTime);
    osc2.frequency.setValueAtTime(freq * 1.002, startTime); // Slight chorus detune

    // Gentle string attack & decay envelope
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(0.24, startTime + 0.12);
    noteGain.gain.setValueAtTime(0.2, startTime + duration - 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    vibrato.start(startTime);
    osc1.start(startTime);
    osc2.start(startTime);

    vibrato.stop(startTime + duration);
    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  private playLoop() {
    if (!this.isPlaying || !this.ctx) return;

    const startAudioTime = this.ctx.currentTime + 0.05;
    let accumulatedTime = startAudioTime;

    for (let i = 0; i < MOHABBATEIN_MELODY.length; i++) {
      const item = MOHABBATEIN_MELODY[i];
      const freq = NOTES[item.note] || 440;
      this.playTone(freq, item.dur, accumulatedTime);
      accumulatedTime += item.dur + (item.pause || 0.04);
    }

    const totalDurationMs = (accumulatedTime - startAudioTime) * 1000;

    this.timer = window.setTimeout(() => {
      if (this.isPlaying) {
        this.playLoop();
      }
    }, totalDurationMs);
  }
}

export const musicEngine = new MohabbateinMusicEngine();
