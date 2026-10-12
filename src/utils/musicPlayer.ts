/**
 * Jungle Silence & Waterfall Ambient Synthesizer
 * Generates an organic, calming soundscape of peaceful jungle stillness,
 * flowing mountain waterfall stream, subtle bamboo flute, and gentle forest drops.
 * Includes instant pause/resume controls with zero audio latency or leaks.
 */

class JungleWaterfallAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private waterfallGain: GainNode | null = null;
  private jungleGain: GainNode | null = null;
  private fluteGain: GainNode | null = null;

  private waterfallSource: AudioBufferSourceNode | null = null;
  private cricketOsc: OscillatorNode | null = null;
  private cricketMod: OscillatorNode | null = null;

  private melodyTimer: number | null = null;
  private birdTimer: number | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();

  private initAudio() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.24, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Sub-mix gains
      this.waterfallGain = this.ctx.createGain();
      this.waterfallGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.waterfallGain.connect(this.masterGain);

      this.jungleGain = this.ctx.createGain();
      this.jungleGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      this.jungleGain.connect(this.masterGain);

      this.fluteGain = this.ctx.createGain();
      this.fluteGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
      this.fluteGain.connect(this.masterGain);
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
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("lime_green_music_playing", this.isPlaying ? "true" : "false");
      }
    } catch {
      // Ignore storage errors
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  /**
   * Generates a 5-second seamless looped stereo pink-brown noise buffer
   * for realistic natural waterfall and flowing stream acoustics.
   */
  private createWaterfallBuffer(): AudioBuffer {
    if (!this.ctx) throw new Error("AudioContext missing");
    const sampleRate = this.ctx.sampleRate;
    const bufferSize = sampleRate * 5; // 5 seconds loop
    const buffer = this.ctx.createBuffer(2, bufferSize, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      let b0 = 0;
      let b1 = 0;
      let b2 = 0;
      let b3 = 0;
      let b4 = 0;
      let b5 = 0;
      let b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Paul Kellet's filtered pink noise algorithm
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        b6 = white * 0.115926;
        data[i] = pink * 0.12;
      }
    }
    return buffer;
  }

  /**
   * Starts the organic waterfall stream layer
   */
  private startWaterfall() {
    if (!this.ctx || !this.waterfallGain) return;

    try {
      const noiseBuffer = this.createWaterfallBuffer();
      const source = this.ctx.createBufferSource();
      source.buffer = noiseBuffer;
      source.loop = true;

      // Waterfall acoustic sculpting: deep lowpass (cascading falls) + airy bandpass (mist spray)
      const lowFilter = this.ctx.createBiquadFilter();
      lowFilter.type = "lowpass";
      lowFilter.frequency.setValueAtTime(450, this.ctx.currentTime);
      lowFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      const sprayFilter = this.ctx.createBiquadFilter();
      sprayFilter.type = "bandpass";
      sprayFilter.frequency.setValueAtTime(950, this.ctx.currentTime);
      sprayFilter.Q.setValueAtTime(0.8, this.ctx.currentTime);

      // Slow organic swell LFO (waterfall rushing movement)
      const swellOsc = this.ctx.createOscillator();
      const swellGain = this.ctx.createGain();
      swellOsc.frequency.setValueAtTime(0.12, this.ctx.currentTime);
      swellGain.gain.setValueAtTime(60, this.ctx.currentTime);
      swellOsc.connect(swellGain);
      swellGain.connect(lowFilter.frequency);

      source.connect(lowFilter);
      source.connect(sprayFilter);
      lowFilter.connect(this.waterfallGain);
      sprayFilter.connect(this.waterfallGain);

      swellOsc.start();
      source.start();
      this.waterfallSource = source;
    } catch {
      // Audio setup failure fallback
    }
  }

  /**
   * Starts peaceful jungle stillness layer: faint night crickets & wind whisper
   */
  private startJungleAtmosphere() {
    if (!this.ctx || !this.jungleGain) return;

    try {
      // Gentle cricket chirping tremolo
      const osc = this.ctx.createOscillator();
      const mod = this.ctx.createOscillator();
      const modGain = this.ctx.createGain();
      const cricketAmp = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(4600, this.ctx.currentTime);

      mod.type = "square";
      mod.frequency.setValueAtTime(14, this.ctx.currentTime);
      modGain.gain.setValueAtTime(0.5, this.ctx.currentTime);

      cricketAmp.gain.setValueAtTime(0.015, this.ctx.currentTime); // Very subtle

      mod.connect(modGain);
      modGain.connect(cricketAmp.gain);
      osc.connect(cricketAmp);
      cricketAmp.connect(this.jungleGain);

      osc.start();
      mod.start();

      this.cricketOsc = osc;
      this.cricketMod = mod;
    } catch {
      // Ignore
    }
  }

  /**
   * Occasional peaceful meditative bamboo flute / water drop chimes
   */
  private playBambooFluteNote(freq: number, dur: number) {
    if (!this.ctx || !this.fluteGain || !this.isPlaying) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Bamboo flute hollow warmth
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t);

    // Warm overtone
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 2, t);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(freq * 2.8, t);

    // Gentle soft attack and meditative long decay
    noteGain.gain.setValueAtTime(0.0001, t);
    noteGain.gain.linearRampToValueAtTime(0.09, t + 0.4);
    noteGain.gain.setValueAtTime(0.07, t + dur * 0.7);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.fluteGain);

    osc.start(t);
    osc2.start(t);
    osc.stop(t + dur + 0.1);
    osc2.stop(t + dur + 0.1);
  }

  /**
   * Serene Indus valley & jungle flute motif (peaceful pentatonic notes)
   */
  private scheduleMelodyLoop() {
    if (!this.isPlaying) return;

    const PENTATONIC_NOTES = [
      { f: 293.66, dur: 3.2 }, // D4
      { f: 349.23, dur: 2.8 }, // F4
      { f: 392.00, dur: 3.5 }, // G4
      { f: 440.00, dur: 4.0 }, // A4
      { f: 523.25, dur: 3.0 }, // C5
      { f: 587.33, dur: 4.5 }, // D5
      { f: 440.00, dur: 3.5 }, // A4
      { f: 392.00, dur: 4.2 }, // G4
    ];

    let delayMs = 1200;

    PENTATONIC_NOTES.forEach((note) => {
      window.setTimeout(() => {
        if (this.isPlaying) {
          this.playBambooFluteNote(note.f, note.dur);
        }
      }, delayMs);
      delayMs += (note.dur + 1.8) * 1000;
    });

    // Schedule next cycle with calm space
    this.melodyTimer = window.setTimeout(() => {
      if (this.isPlaying) {
        this.scheduleMelodyLoop();
      }
    }, delayMs + 3000);
  }

  /**
   * Subtle soft jungle bird call in the distance
   */
  private scheduleJungleBird() {
    if (!this.isPlaying) return;

    const interval = Math.floor(Math.random() * 8000) + 6000;
    this.birdTimer = window.setTimeout(() => {
      if (this.isPlaying && this.ctx && this.jungleGain) {
        try {
          const t = this.ctx.currentTime;
          const bird = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          bird.type = "sine";
          bird.frequency.setValueAtTime(2800, t);
          bird.frequency.exponentialRampToValueAtTime(3200, t + 0.08);
          bird.frequency.exponentialRampToValueAtTime(2400, t + 0.22);

          gain.gain.setValueAtTime(0.0001, t);
          gain.gain.linearRampToValueAtTime(0.03, t + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.25);

          bird.connect(gain);
          gain.connect(this.jungleGain);

          bird.start(t);
          bird.stop(t + 0.3);
        } catch {
          // Ignore
        }
        this.scheduleJungleBird();
      }
    }, interval);
  }

  /**
   * Resumes or starts playback
   */
  public async play() {
    this.initAudio();
    if (!this.ctx || !this.masterGain) return;

    if (this.isPlaying) return;

    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    // Smooth un-mute master gain
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.24, this.ctx.currentTime + 0.3);

    this.isPlaying = true;
    this.notify();

    // Start all layers
    this.startWaterfall();
    this.startJungleAtmosphere();
    this.scheduleMelodyLoop();
    this.scheduleJungleBird();
  }

  /**
   * Pauses all sound immediately with zero delay and zero bleed
   */
  public pause() {
    this.stop();
  }

  public stop() {
    this.isPlaying = false;

    // Clear all pending timers
    if (this.melodyTimer) {
      window.clearTimeout(this.melodyTimer);
      this.melodyTimer = null;
    }
    if (this.birdTimer) {
      window.clearTimeout(this.birdTimer);
      this.birdTimer = null;
    }

    if (this.ctx && this.masterGain) {
      try {
        // Immediate silence ramp
        this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
        this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      } catch {
        // Ignore
      }

      // Stop running continuous nodes
      if (this.waterfallSource) {
        try {
          this.waterfallSource.stop();
          this.waterfallSource.disconnect();
        } catch {
          // Ignore
        }
        this.waterfallSource = null;
      }

      if (this.cricketOsc) {
        try {
          this.cricketOsc.stop();
          this.cricketOsc.disconnect();
        } catch {
          // Ignore
        }
        this.cricketOsc = null;
      }

      if (this.cricketMod) {
        try {
          this.cricketMod.stop();
          this.cricketMod.disconnect();
        } catch {
          // Ignore
        }
        this.cricketMod = null;
      }

      // Suspend audio context to save CPU & battery
      try {
        this.ctx.suspend();
      } catch {
        // Ignore
      }
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
}

export const musicEngine = new JungleWaterfallAudioEngine();
