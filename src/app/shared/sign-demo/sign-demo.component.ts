import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  ViewChild
} from '@angular/core';

export interface SignChallenge {
  id: 'A' | 'E' | 'I' | 'O' | 'U';
  title: string;
  subtitle: string;
  tip: string;
  image: string;
  previewImage: string;
  accentBg: string;
  accentColor: string;
  badgeText?: string;
  completed: boolean;
  quizPrompt: string;
  quizOptions: { label: string; correct: boolean }[];
}

type DemoStage = 'choose' | 'loading' | 'camera' | 'celebration' | 'fallback';

const HAND_CONNECTIONS: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [17, 18], [18, 19], [19, 20],
  [0, 17]
];

@Component({
  selector: 'app-sign-demo',
  templateUrl: './sign-demo.component.html',
  styleUrls: ['./sign-demo.component.css']
})
export class SignDemoComponent implements OnDestroy {
  @ViewChild('cameraVideo') cameraVideoRef?: ElementRef<HTMLVideoElement>;
  @ViewChild('overlayCanvas') overlayCanvasRef?: ElementRef<HTMLCanvasElement>;

  public readonly challenges: SignChallenge[] = [
    {
      id: 'A',
      title: 'Letra A',
      subtitle: 'Vocales LSA',
      tip: 'Cerrá los 4 dedos en un puño relajado y dejá el pulgar apoyado al costado, apuntando hacia arriba.',
      image: 'assets/vocales/letra_a.png',
      previewImage: 'assets/vocales/letra_a_preview.png',
      accentBg: '#eef2ff',
      accentColor: '#5262d6',
      badgeText: '¡Empezá acá!',
      completed: false,
      quizPrompt: '¿Cómo se coloca el pulgar al hacer la letra A en LSA?',
      quizOptions: [
        { label: 'Apoyado al costado del puño cerrado', correct: true },
        { label: 'Escondido adentro de todos los dedos', correct: false },
        { label: 'Todos los dedos bien abiertos', correct: false }
      ]
    },
    {
      id: 'E',
      title: 'Letra E',
      subtitle: 'Vocales LSA',
      tip: 'Formá una "C" abierta con el pulgar y el índice (como muestra la medalla) mientras cerrás los otros 3 dedos.',
      image: 'assets/vocales/letra_e.png',
      previewImage: 'assets/vocales/letra_e_preview.png',
      accentBg: '#f3f0ff',
      accentColor: '#6d4ce6',
      completed: false,
      quizPrompt: '¿Qué dedos forman la abertura en la letra E de LSA?',
      quizOptions: [
        { label: 'Pulgar e índice formando una C abierta', correct: true },
        { label: 'Solo el meñique levantado', correct: false },
        { label: 'Todos los dedos cerrados en puño', correct: false }
      ]
    },
    {
      id: 'I',
      title: 'Letra I',
      subtitle: 'Vocales LSA',
      tip: 'Cerrá la mano y dejá levantado solamente el dedo índice hacia arriba, como muestra la medalla.',
      image: 'assets/vocales/letra_i.png',
      previewImage: 'assets/vocales/letra_i_preview.png',
      accentBg: '#e6f5ee',
      accentColor: '#387a60',
      completed: false,
      quizPrompt: '¿Qué dedo queda levantado en la letra I de LSA?',
      quizOptions: [
        { label: 'El dedo índice hacia arriba', correct: true },
        { label: 'El dedo pulgar y el meñique', correct: false },
        { label: 'Tres dedos extendidos', correct: false }
      ]
    },
    {
      id: 'O',
      title: 'Letra O',
      subtitle: 'Vocales LSA',
      tip: 'Juntá la punta del pulgar con la punta del índice formando un círculo y dejá los otros 3 dedos levantados.',
      image: 'assets/vocales/letra_o.png',
      previewImage: 'assets/vocales/letra_o_preview.png',
      accentBg: '#fdf6dc',
      accentColor: '#a67c00',
      completed: false,
      quizPrompt: '¿Cómo se forma la letra O en LSA?',
      quizOptions: [
        { label: 'Círculo con pulgar e índice y los otros 3 dedos arriba', correct: true },
        { label: 'Un puño cerrado con el pulgar al costado', correct: false },
        { label: 'Solo el índice y el meñique arriba', correct: false }
      ]
    },
    {
      id: 'U',
      title: 'Letra U',
      subtitle: 'Vocales LSA',
      tip: 'Levantá el dedo índice y el meñique hacia arriba, manteniendo cerrados los dedos del medio.',
      image: 'assets/vocales/letra_u.png',
      previewImage: 'assets/vocales/letra_u_preview.png',
      accentBg: '#fff4e5',
      accentColor: '#c06a14',
      completed: false,
      quizPrompt: '¿Qué dedos quedan levantados hacia arriba en la letra U de LSA?',
      quizOptions: [
        { label: 'El dedo índice y el meñique', correct: true },
        { label: 'Los cinco dedos abiertos', correct: false },
        { label: 'Ningún dedo extendido', correct: false }
      ]
    }
  ];

  public selectedChallenge: SignChallenge = this.challenges[0];
  public stage: DemoStage = 'choose';

  public loadingMessage = 'Preparando la cámara y la IA de Comuseñas...';
  public cameraError = '';
  public handDetected = false;
  public detectedLabel = '';
  public isMatchingNow = false;
  public holdProgress = 0; // 0 to 100
  public liveFeedback = 'Mostrá tu mano frente a la cámara';
  public soundEnabled = true;

  // Fallback quiz state (when no camera or denied permission)
  public quizWrongMessage = '';

  // Celebration confetti pieces
  public readonly confettiPieces = Array.from({ length: 24 }, (_, i) => i);
  public medalPulse = false;

  private mediaStream: MediaStream | null = null;
  private handLandmarker: any = null;
  private animationFrameId: number | null = null;
  private lastFrameTime = 0;
  private lastVideoTime = -1;
  private lastDetectTimestamp = 0;

  constructor(private ngZone: NgZone) {}

  public get completedCount(): number {
    return this.challenges.filter(c => c.completed).length;
  }

  public get allCompleted(): boolean {
    return this.completedCount === this.challenges.length;
  }

  public toggleSound(): void {
    this.soundEnabled = !this.soundEnabled;
  }

  public get progressPercent(): number {
    return Math.round((this.completedCount / this.challenges.length) * 100);
  }

  public get nextUncompletedChallenge(): SignChallenge | null {
    const idx = this.challenges.findIndex(c => c.id === this.selectedChallenge.id);
    for (let offset = 1; offset <= this.challenges.length; offset++) {
      const candidate = this.challenges[(idx + offset) % this.challenges.length];
      if (!candidate.completed) {
        return candidate;
      }
    }
    return null;
  }

  public selectChallenge(challenge: SignChallenge): void {
    this.selectedChallenge = challenge;
    this.medalPulse = false;
    setTimeout(() => (this.medalPulse = true), 15);
    this.holdProgress = 0;
    this.isMatchingNow = false;
    this.detectedLabel = '';
    this.quizWrongMessage = '';
    this.liveFeedback = `Intentá hacer la ${challenge.title} frente a la cámara`;

    if (this.stage === 'celebration') {
      if (this.hasLiveCameraStream() && this.handLandmarker) {
        this.resumeCameraView();
      } else {
        this.stage = 'choose';
      }
    }
  }

  public async startCameraDemo(): Promise<void> {
    if (typeof window === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      this.cameraError = 'Tu navegador no tiene cámara disponible. ¡Podés probar el modo práctica sin cámara!';
      this.stage = 'fallback';
      return;
    }

    this.cameraError = '';
    this.stage = 'loading';
    this.loadingMessage = 'Pidiendo permiso para usar tu cámara...';
    this.holdProgress = 0;
    this.isMatchingNow = false;

    try {
      // 1. Request webcam stream ONLY now (never on page load)
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      });

      // 2. Lazy-load public Google MediaPipe HandLandmarker (zero proprietary models exposed)
      if (!this.handLandmarker) {
        this.loadingMessage = 'Cargando el detector de manos en tu dispositivo...';
        await this.loadHandLandmarker();
      }

      this.stage = 'camera';
      this.liveFeedback = `Mostrá tu mano haciendo la ${this.selectedChallenge.title}`;

      // Wait one tick for Angular to render <video>
      setTimeout(() => {
        this.attachStreamAndRun();
      }, 60);
    } catch (err: any) {
      this.stopCameraStreamOnly();
      const name = err?.name || '';
      if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
        this.cameraError = 'No se habilitó el permiso de cámara. ¡Igual podés jugar en el modo sin cámara!';
      } else if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
        this.cameraError = 'No encontramos una cámara conectada en este dispositivo.';
      } else {
        this.cameraError = 'No pudimos iniciar la cámara en este navegador. Probá el modo guiado sin cámara.';
      }
      this.stage = 'fallback';
    }
  }

  public openFallbackMode(): void {
    this.stopCamera();
    this.cameraError = '';
    this.quizWrongMessage = '';
    this.stage = 'fallback';
  }

  public answerFallbackQuiz(option: { label: string; correct: boolean }): void {
    if (option.correct) {
      this.quizWrongMessage = '';
      this.completeCurrentChallenge();
    } else {
      this.quizWrongMessage = '¡Casi! Mirá la guía de la mano e intentá otra vez.';
    }
  }

  public stopCamera(): void {
    this.stopDetectionLoop();
    this.stopCameraStreamOnly();
    this.handDetected = false;
    this.isMatchingNow = false;
    this.holdProgress = 0;
    this.detectedLabel = '';
    this.stage = 'choose';
  }

  public tryNextChallenge(): void {
    const next = this.nextUncompletedChallenge;
    if (next) {
      this.selectChallenge(next);
    } else {
      // All completed: cycle to next one for replay
      const idx = this.challenges.findIndex(c => c.id === this.selectedChallenge.id);
      this.selectChallenge(this.challenges[(idx + 1) % this.challenges.length]);
    }
  }

  public replayCurrentWithCamera(): void {
    this.holdProgress = 0;
    this.isMatchingNow = false;
    if (this.hasLiveCameraStream() && this.handLandmarker) {
      this.resumeCameraView();
    } else {
      this.startCameraDemo();
    }
  }

  private hasLiveCameraStream(): boolean {
    return !!this.mediaStream && this.mediaStream.getVideoTracks().some(t => t.readyState === 'live');
  }

  private resumeCameraView(): void {
    this.stopDetectionLoop();
    this.lastVideoTime = -1;
    this.stage = 'camera';
    this.liveFeedback = `Mostrá tu mano haciendo la ${this.selectedChallenge.title}`;
    setTimeout(() => {
      this.attachStreamAndRun();
    }, 60);
  }

  ngOnDestroy(): void {
    this.stopDetectionLoop();
    this.stopCameraStreamOnly();
    if (this.handLandmarker) {
      try {
        this.handLandmarker.close();
      } catch {
        // Ignore cleanup errors
      }
      this.handLandmarker = null;
    }
  }

  private async loadHandLandmarker(): Promise<void> {
    const vision = await import('@mediapipe/tasks-vision');
    const filesetResolver = await vision.FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.2.3/wasm'
    );

    const baseOptions = {
      modelAssetPath:
        'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task'
    };

    const commonOptions: any = {
      runningMode: 'VIDEO',
      numHands: 1,
      minHandDetectionConfidence: 0.35,
      minHandPresenceConfidence: 0.35,
      minTrackingConfidence: 0.35
    };

    try {
      this.handLandmarker = await vision.HandLandmarker.createFromOptions(filesetResolver, {
        ...commonOptions,
        baseOptions: { ...baseOptions, delegate: 'GPU' }
      });
    } catch {
      this.handLandmarker = await vision.HandLandmarker.createFromOptions(filesetResolver, {
        ...commonOptions,
        baseOptions: { ...baseOptions, delegate: 'CPU' }
      });
    }
  }

  private attachStreamAndRun(): void {
    const videoEl = this.cameraVideoRef?.nativeElement;
    if (!videoEl || !this.mediaStream) {
      return;
    }
    this.lastVideoTime = -1;
    if (videoEl.srcObject !== this.mediaStream) {
      videoEl.srcObject = this.mediaStream;
    }

    const startPlayback = () => {
      videoEl.play().then(() => {
        this.lastFrameTime = performance.now();
        this.startDetectionLoop();
      }).catch(() => {
        this.cameraError = 'Tocá el botón nuevamente para activar el video de la cámara.';
        this.stage = 'fallback';
      });
    };

    if (videoEl.readyState >= 2) {
      startPlayback();
    } else {
      videoEl.onloadedmetadata = startPlayback;
    }
  }

  private startDetectionLoop(): void {
    this.stopDetectionLoop();
    this.lastFrameTime = performance.now();

    this.ngZone.runOutsideAngular(() => {
      const renderFrame = (now: number) => {
        if (this.stage !== 'camera') {
          return;
        }

        const videoEl = this.cameraVideoRef?.nativeElement;
        const canvasEl = this.overlayCanvasRef?.nativeElement;

        if (videoEl && canvasEl && this.handLandmarker && videoEl.readyState >= 2) {
          if (videoEl.currentTime !== this.lastVideoTime) {
            this.lastVideoTime = videoEl.currentTime;
            const dt = Math.min(120, Math.max(16, now - this.lastFrameTime));
            this.lastFrameTime = now;

            try {
              const detectTs = Math.max(this.lastDetectTimestamp + 1, Math.round(now));
              this.lastDetectTimestamp = detectTs;
              const result = this.handLandmarker.detectForVideo(videoEl, detectTs);
              this.processRecognitionResult(result, videoEl, canvasEl, dt);
            } catch {
              // Ignore single-frame runtime glitches
            }
          }
        }

        this.animationFrameId = requestAnimationFrame(renderFrame);
      };

      this.animationFrameId = requestAnimationFrame(renderFrame);
    });
  }

  private processRecognitionResult(
    result: any,
    videoEl: HTMLVideoElement,
    canvasEl: HTMLCanvasElement,
    dt: number
  ): void {
    const ctx = canvasEl.getContext('2d');
    if (ctx) {
      if (canvasEl.width !== videoEl.videoWidth || canvasEl.height !== videoEl.videoHeight) {
        canvasEl.width = videoEl.videoWidth || 640;
        canvasEl.height = videoEl.videoHeight || 480;
      }
      ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    }

    const landmarks = result?.landmarks?.[0];
    const hasHand = Array.isArray(landmarks) && landmarks.length >= 21;

    let matched = false;

    if (hasHand) {
      matched = this.matchesVowelGeometry(this.selectedChallenge.id, landmarks);

      if (ctx) {
        this.drawPlayfulHand(ctx, landmarks, canvasEl.width, canvasEl.height, matched);
      }
    }

    // Smooth progress accumulation (~500ms hold to complete, gentle decay on flicker)
    let nextProgress = this.holdProgress;
    if (matched) {
      nextProgress = Math.min(100, this.holdProgress + (dt / 520) * 100);
    } else {
      nextProgress = Math.max(0, this.holdProgress - (dt / 1400) * 100);
    }

    let nextFeedback = 'Mostrá tu mano frente a la cámara';
    if (matched) {
      nextFeedback = `¡Genial! Mantené la ${this.selectedChallenge.title} un instante...`;
    } else if (hasHand) {
      nextFeedback = `¡Mano detectada! Acomodá tus dedos como la guía de la ${this.selectedChallenge.title}`;
    }

    this.ngZone.run(() => {
      this.handDetected = hasHand;
      this.isMatchingNow = matched;
      this.detectedLabel = matched ? this.selectedChallenge.id : '';
      this.holdProgress = Math.round(nextProgress);
      this.liveFeedback = nextFeedback;

      if (nextProgress >= 100) {
        this.completeCurrentChallenge();
      }
    });
  }

  /**
   * Flexible geometric vowel matcher using Google's public 21-point HandLandmarker.
   * Keeps proprietary Comuseñas .task models 100% private on mobile/server.
   */
  private matchesVowelGeometry(
    target: 'A' | 'E' | 'I' | 'O' | 'U',
    lm: Array<{ x: number; y: number; z?: number }>
  ): boolean {
    const dist = (a: number, b: number) =>
      Math.hypot(lm[a].x - lm[b].x, lm[a].y - lm[b].y);

    const palmScale = dist(0, 9) || 0.1;

    const isExtended = (tip: number, pip: number) =>
      dist(tip, 0) > dist(pip, 0) * 1.12;

    const isCurled = (tip: number, pip: number, mcp: number) =>
      dist(tip, 0) < dist(pip, 0) * 1.15 || dist(tip, mcp) < palmScale * 0.74;

    const indexExt = isExtended(8, 6);
    const middleExt = isExtended(12, 10);
    const ringExt = isExtended(16, 14);
    const pinkyExt = isExtended(20, 18);

    const indexCurled = isCurled(8, 6, 5);
    const middleCurled = isCurled(12, 10, 9);
    const ringCurled = isCurled(16, 14, 13);
    const pinkyCurled = isCurled(20, 18, 17);

    switch (target) {
      case 'A': {
        // LSA A: Fist closed with thumb resting upright/alongside the side
        const curledCount = [indexCurled, middleCurled, ringCurled, pinkyCurled].filter(Boolean).length;
        const thumbUp = lm[4].y < lm[3].y + palmScale * 0.2 && dist(4, 17) > palmScale * 0.42;
        return curledCount >= 3 && indexCurled && middleCurled && thumbUp;
      }
      case 'E': {
        // LSA E: Index and thumb forming an open "C" pinch, other 3 fingers folded
        const pinchGap = dist(4, 8);
        const cShape = pinchGap >= palmScale * 0.3 && pinchGap <= palmScale * 1.55;
        const othersCurled = [middleCurled, ringCurled, pinkyCurled].filter(Boolean).length >= 2;
        const notFullOpen = !middleExt && !ringExt && !pinkyExt;
        return cShape && (othersCurled || notFullOpen);
      }
      case 'I': {
        // LSA I: Only index finger extended upright (near the eye)
        const othersClosed = !middleExt && !ringExt && !pinkyExt;
        const indexClearlyUp = indexExt || (lm[8].y < lm[6].y && dist(8, 0) > dist(6, 0) * 1.04);
        return indexClearlyUp && othersClosed;
      }
      case 'O': {
        // LSA O: Thumb tip + index tip touching in a circle, other 3 fingers extended up (OK sign)
        const thumbIndexPinch = dist(4, 8) < palmScale * 0.65;
        const otherFingersUp = [middleExt, ringExt, pinkyExt].filter(Boolean).length >= 2;
        return thumbIndexPinch && otherFingersUp;
      }
      case 'U': {
        // LSA U: Index + pinky extended upward, middle + ring folded
        return indexExt && pinkyExt && !middleExt && !ringExt;
      }
    }
  }

  private drawPlayfulHand(
    ctx: CanvasRenderingContext2D,
    landmarks: Array<{ x: number; y: number }>,
    width: number,
    height: number,
    isMatched: boolean
  ): void {
    const lineColor = isMatched ? '#6aaf93' : '#7584f2';
    const dotColor = isMatched ? '#f2d05c' : '#a275fd';

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 4;

    for (const [startIdx, endIdx] of HAND_CONNECTIONS) {
      const start = landmarks[startIdx];
      const end = landmarks[endIdx];
      ctx.beginPath();
      ctx.moveTo(start.x * width, start.y * height);
      ctx.lineTo(end.x * width, end.y * height);
      ctx.stroke();
    }

    for (let i = 0; i < landmarks.length; i++) {
      const pt = landmarks[i];
      const isTip = i === 4 || i === 8 || i === 12 || i === 16 || i === 20;
      ctx.beginPath();
      ctx.arc(pt.x * width, pt.y * height, isTip ? 6.5 : 4.5, 0, Math.PI * 2);
      ctx.fillStyle = isTip ? dotColor : '#ffffff';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = lineColor;
      ctx.stroke();
    }
  }

  private completeCurrentChallenge(): void {
    this.stopDetectionLoop();
    this.selectedChallenge.completed = true;
    this.holdProgress = 100;
    this.isMatchingNow = true;
    this.stage = 'celebration';
    this.playSuccessChime();
  }

  private playSuccessChime(): void {
    if (!this.soundEnabled || typeof window === 'undefined') {
      return;
    }
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) {
        return;
      }
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99]; // C5 -> E5 -> G5 joyful triad
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const start = ctx.currentTime + idx * 0.09;
        gain.gain.setValueAtTime(0.001, start);
        gain.gain.exponentialRampToValueAtTime(0.14, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.28);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.3);
      });
    } catch {
      // Ignore audio autoplay restrictions
    }
  }

  private stopDetectionLoop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private stopCameraStreamOnly(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }
  }
}
