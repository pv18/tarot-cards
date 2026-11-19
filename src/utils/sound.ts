let ctx: AudioContext | null = null;

const STORAGE_KEY = 'tarot-sound';

export const isSoundEnabled = (): boolean =>
  localStorage.getItem(STORAGE_KEY) === 'on';

/** Переключает звук и возвращает новое состояние */
export const toggleSound = (): boolean => {
  const next = !isSoundEnabled();
  localStorage.setItem(STORAGE_KEY, next ? 'on' : 'off');
  return next;
};

const getCtx = (): AudioContext | null => {
  if (!isSoundEnabled()) return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === 'suspended') void ctx.resume();
  return ctx;
};

/** Короткий шорох — имитация тасования колоды */
export const playShuffle = (): void => {
  const audio = getCtx();
  if (!audio) return;
  const duration = 0.28;
  const buffer = audio.createBuffer(
    1,
    Math.floor(audio.sampleRate * duration),
    audio.sampleRate
  );
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) ** 2;
  }
  const source = audio.createBufferSource();
  source.buffer = buffer;
  const filter = audio.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 2600;
  filter.Q.value = 0.8;
  const gain = audio.createGain();
  gain.gain.value = 0.22;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(audio.destination);
  source.start();
};

/** Тихий щелчок при перевороте карты */
export const playFlip = (): void => {
  const audio = getCtx();
  if (!audio) return;
  const duration = 0.07;
  const buffer = audio.createBuffer(
    1,
    Math.floor(audio.sampleRate * duration),
    audio.sampleRate
  );
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) ** 3;
  }
  const source = audio.createBufferSource();
  source.buffer = buffer;
  const filter = audio.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 3200;
  const gain = audio.createGain();
  gain.gain.value = 0.3;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(audio.destination);
  source.start();
};
