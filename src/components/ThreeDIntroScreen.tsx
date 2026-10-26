import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Volume2, VolumeX, Sparkles } from 'lucide-react';
import movieHumanoidImg from '../assets/images/movie_humanoid_robot_1792939694337.jpg';

interface ThreeDIntroScreenProps {
  isOpen: boolean;
  onFinish: () => void;
}

export const ThreeDIntroScreen: React.FC<ThreeDIntroScreenProps> = ({ isOpen, onFinish }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const onFinishRef = useRef(onFinish);
  onFinishRef.current = onFinish;

  // Prevent background page scroll while intro is visible & restore scroll on finish
  useEffect(() => {
    if (!isOpen) return;

    // Reset window scroll to top immediately
    window.scrollTo(0, 0);

    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    // Prevent default touchmove propagation to background window
    const preventScroll = (e: TouchEvent | WheelEvent) => {
      // Allow touch interaction with intro elements, but prevent body scrolling
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('wheel', preventScroll, { passive: false });

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.touchAction = prevTouchAction;
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('wheel', preventScroll);
    };
  }, [isOpen]);

  // Preload Iron Man style movie humanoid robot image
  useEffect(() => {
    const img = new Image();
    img.src = movieHumanoidImg;
  }, []);

  // Safe exit handler that ensures page starts at top
  const handleExit = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    playSfx('whoosh');
    onFinishRef.current();
  };

  // Procedural Web Audio Sound FX
  const playSfx = (type: 'boot' | 'whoosh') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      if (type === 'boot') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(620, now + 0.45);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'whoosh') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(360, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.4);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
      }
    } catch {
      // AudioContext policy handled
    }
  };

  // Three.js 3D WebGL Multi-Layer Spatial FX with dynamic mobile responsive adaptation
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;
    const mount = containerRef.current;

    // Detect software WebGL guard
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.03);

    const isMobileDevice = window.innerWidth < 768 || window.innerHeight > window.innerWidth;
    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    // Camera calibrated for mobile portrait aspect ratio
    const camera = new THREE.PerspectiveCamera(
      isMobileDevice ? 54 : 45,
      width / height,
      0.1,
      100
    );
    camera.position.set(0, isMobileDevice ? 0.2 : 0, isMobileDevice ? 10.0 : 8.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    mount.appendChild(renderer.domElement);

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0x00f0ff, 2.2);
    scene.add(ambientLight);

    const cyanKeyLight = new THREE.DirectionalLight(0x00f0ff, 5.0);
    cyanKeyLight.position.set(5, 5, 5);
    scene.add(cyanKeyLight);

    const purpleBacklight = new THREE.DirectionalLight(0x818cf8, 4.0);
    purpleBacklight.position.set(-5, -3, 3);
    scene.add(purpleBacklight);

    const centerPointLight = new THREE.PointLight(0x00f0ff, 6, 12);
    centerPointLight.position.set(0, 0, 2);
    scene.add(centerPointLight);

    // =========================================================================
    // 1. FLOATING 3D QUANTUM DATA CUBES (Orbiting in 3D space)
    // =========================================================================
    const cubesGroup = new THREE.Group();
    scene.add(cubesGroup);

    const cubeGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    const cubeMatWire = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.95,
      roughness: 0.1,
      wireframe: true,
    });
    const cubeMatSolid = new THREE.MeshPhysicalMaterial({
      color: 0x0284c7,
      metalness: 0.8,
      roughness: 0.2,
      transmission: isSoftwareGl ? 0 : 0.8,
      opacity: 0.85,
      transparent: true,
    });

    const cubeCount = isMobileDevice ? 10 : 14;
    const cubes: { mesh: THREE.Group; speedX: number; speedY: number; radius: number; angle: number; yOffset: number }[] = [];

    for (let i = 0; i < cubeCount; i++) {
      const cGroup = new THREE.Group();
      const wireMesh = new THREE.Mesh(cubeGeo, cubeMatWire);
      const innerMesh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.22, 0.22), cubeMatSolid);
      cGroup.add(wireMesh);
      cGroup.add(innerMesh);

      // Tighter radius on mobile so cubes stay visible in portrait view
      const radius = (isMobileDevice ? 2.4 : 3.2) + (i % 3) * 0.7;
      const angle = (i / cubeCount) * Math.PI * 2;
      const yOffset = ((i % 5) - 2) * (isMobileDevice ? 1.4 : 1.1);

      cGroup.position.set(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius);
      cubesGroup.add(cGroup);

      cubes.push({
        mesh: cGroup,
        speedX: 0.5 + Math.random() * 0.8,
        speedY: 0.4 + Math.random() * 0.7,
        radius,
        angle,
        yOffset,
      });
    }

    // =========================================================================
    // 2. TRIPLE 3D GYROSCOPIC HOLOGRAPHIC RINGS
    // =========================================================================
    const masterRingGroup = new THREE.Group();
    scene.add(masterRingGroup);

    const scaleFactor = isMobileDevice ? 0.76 : 1.0;

    const ringMatCyan = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.95,
      roughness: 0.1,
    });
    const ringGeo1 = new THREE.TorusGeometry(3.6 * scaleFactor, 0.035, 16, 120);
    const ring1 = new THREE.Mesh(ringGeo1, ringMatCyan);
    ring1.rotation.x = Math.PI / 2.3;
    masterRingGroup.add(ring1);

    const ringMatSky = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.15,
    });
    const ringGeo2 = new THREE.TorusGeometry(4.3 * scaleFactor, 0.025, 16, 120);
    const ring2 = new THREE.Mesh(ringGeo2, ringMatSky);
    ring2.rotation.y = Math.PI / 3;
    masterRingGroup.add(ring2);

    const ringMatViolet = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true,
    });
    const ringGeo3 = new THREE.TorusGeometry(5.0 * scaleFactor, 0.02, 16, 120);
    const ring3 = new THREE.Mesh(ringGeo3, ringMatViolet);
    ring3.rotation.x = -Math.PI / 3.5;
    masterRingGroup.add(ring3);

    // =========================================================================
    // 3. TARGETING RETICLE BRACKETS (Around Robot Head/Chest)
    // =========================================================================
    const targetGroup = new THREE.Group();
    scene.add(targetGroup);

    const bracketGeo = new THREE.RingGeometry(0.7 * scaleFactor, 0.76 * scaleFactor, 32, 1, 0, Math.PI / 1.7);
    const bracketMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const bracket1 = new THREE.Mesh(bracketGeo, bracketMat);
    bracket1.position.set(0, isMobileDevice ? 1.6 : 1.35, 0.5);
    targetGroup.add(bracket1);

    const bracket2 = new THREE.Mesh(bracketGeo, bracketMat);
    bracket2.position.set(0, isMobileDevice ? 1.6 : 1.35, 0.5);
    bracket2.rotation.z = Math.PI;
    targetGroup.add(bracket2);

    // =========================================================================
    // 4. MULTI-COLORED PARTICLES CONSTELLATION (CYAN & ELECTRIC INDIGO)
    // =========================================================================
    const particleCount = isSoftwareGl ? 350 : (isMobileDevice ? 800 : 1400);
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x00f0ff);
    const colorIndigo = new THREE.Color(0x6366f1);
    const colorAmber = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      const radius = (isMobileDevice ? 1.6 : 2.2) + Math.random() * (isMobileDevice ? 6.5 : 8.5);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = i % 3 === 0 ? colorCyan : i % 3 === 1 ? colorIndigo : colorAmber;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: isMobileDevice ? 0.06 : 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // =========================================================================
    // 5. GROUND PERSPECTIVE HOLOGRAPHIC GRID
    // =========================================================================
    const gridHelper = new THREE.GridHelper(34, 34, 0x00f0ff, 0x1e293b);
    gridHelper.position.y = -4.0;
    scene.add(gridHelper);

    // Pointer move & Gyroscope / DeviceOrientation Tracking for Mobile
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const normX = (clientX / window.innerWidth) * 2 - 1;
      const normY = -(clientY / window.innerHeight) * 2 + 1;
      targetX = normX;
      targetY = normY;
      setMousePos({ x: normX, y: normY });
    };

    // Mobile Device Orientation Gyroscope Tilt
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        const tiltLR = Math.max(-1, Math.min(1, e.gamma / 30));
        const tiltFB = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
        targetX = tiltLR;
        targetY = -tiltFB;
        setMousePos({ x: tiltLR, y: -tiltFB });
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handlePointerMove, { passive: true });
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    }

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      const isMobile = w < 768 || h > w;
      camera.fov = isMobile ? 54 : 45;
      camera.position.z = isMobile ? 10.0 : 8.5;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    playSfx('boot');

    let animationFrameId = 0;
    const clock = new THREE.Clock();

    function renderLoop() {
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Exponential damping mouse & gyro lookaround with subtle automated organic drift if idle
      const idleSwayX = Math.sin(elapsedTime * 0.8) * 0.2;
      const idleSwayY = Math.cos(elapsedTime * 0.6) * 0.15;

      const effectiveTargetX = targetX || idleSwayX;
      const effectiveTargetY = targetY || idleSwayY;

      currentX += (effectiveTargetX - currentX) * 0.08;
      currentY += (effectiveTargetY - currentY) * 0.08;

      camera.position.x = currentX * 2.2;
      camera.position.y = (isMobileDevice ? 0.2 : 0) + currentY * 1.6;
      camera.lookAt(0, isMobileDevice ? 0.2 : 0, 0);

      // Rotate 3D Gyroscopic Rings
      ring1.rotation.z += delta * 0.55;
      ring2.rotation.z -= delta * 0.45;
      ring3.rotation.y += delta * 0.35;
      masterRingGroup.rotation.y = elapsedTime * 0.22;

      // Rotate Orbiting Data Cubes
      cubes.forEach((cube, idx) => {
        const curAngle = cube.angle + elapsedTime * (0.35 + (idx % 3) * 0.1);
        cube.mesh.position.x = Math.cos(curAngle) * cube.radius;
        cube.mesh.position.z = Math.sin(curAngle) * cube.radius;
        cube.mesh.position.y = cube.yOffset + Math.sin(elapsedTime * 2 + idx) * 0.25;

        cube.mesh.rotation.x += delta * cube.speedX;
        cube.mesh.rotation.y += delta * cube.speedY;
      });

      // Target Reticle spins and tracks
      bracket1.rotation.z += delta * 0.9;
      bracket2.rotation.z -= delta * 0.9;
      targetGroup.position.x = currentX * 0.7;
      targetGroup.position.y = (isMobileDevice ? 1.6 : 1.35) + currentY * 0.5;

      // Particle Constellation orbit
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.025;

      // Floor grid dynamic scroll
      gridHelper.position.z = (elapsedTime * 1.5) % 1;

      // Core point light pulse
      centerPointLight.intensity = 5 + Math.sin(elapsedTime * 3.5) * 2;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    }

    renderLoop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation);
      }
      window.removeEventListener('resize', handleResize);

      cubeGeo.dispose();
      cubeMatWire.dispose();
      cubeMatSolid.dispose();
      ringGeo1.dispose();
      ringMatCyan.dispose();
      ringGeo2.dispose();
      ringMatSky.dispose();
      ringGeo3.dispose();
      ringMatViolet.dispose();
      bracketGeo.dispose();
      bracketMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();

      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [isOpen, soundEnabled]);

  if (!isOpen) return null;

  // 3D Spatial Parallax Offsets for Robot Background
  const robotTranslateX = mousePos.x * 20;
  const robotTranslateY = mousePos.y * 14;
  const robotRotateY = mousePos.x * 5;
  const robotRotateX = -mousePos.y * 4;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.08 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
        className="fixed inset-0 z-[100] flex flex-col justify-between bg-slate-950 text-white overflow-hidden select-none h-[100dvh] w-screen touch-none overscroll-none"
      >
        {/* ========================================================================= */}
        {/* FULLSCREEN REAL MOVIE HUMANOID ROBOT - DEDICATED HD PORTRAIT & LANDSCAPE */}
        {/* With fetchpriority="high", loading="eager", and zero background bleed */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-slate-950">
          <div
            style={{
              transform: `translate3d(${robotTranslateX}px, ${robotTranslateY}px, 0) rotateY(${robotRotateY}deg) rotateX(${robotRotateX}deg) scale(1.05)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.15s ease-out',
            }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <img
              src={movieHumanoidImg}
              alt="Iron Man style Movie Humanoid Robot with KITE ROBOTICS Embossed on Chest"
              loading="eager"
              decoding="sync"
              fetchPriority="high"
              className="w-full h-full object-cover object-[50%_25%] sm:object-center filter contrast-115 brightness-110 drop-shadow-[0_0_60px_rgba(0,240,255,0.45)]"
            />

            {/* Glowing Laser Energy Core on the Robot Chest */}
            <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 rounded-full bg-cyan-400/30 blur-[60px] pointer-events-none animate-pulse" />

            {/* Glowing Optic Visor Eyes Flare */}
            <div className="absolute top-[22%] sm:top-[18.5%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-28 sm:w-32 h-12 sm:h-14 bg-cyan-300/50 blur-[20px] pointer-events-none" />

            {/* Dual Scanning Laser Lines */}
            <motion.div
              initial={{ top: '5%' }}
              animate={{ top: ['5%', '92%', '5%'] }}
              transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_#00f0ff,0_0_50px_#00f0ff] opacity-85 pointer-events-none"
            />
            <motion.div
              initial={{ top: '92%' }}
              animate={{ top: ['92%', '5%', '92%'] }}
              transition={{ repeat: Infinity, duration: 4.0, ease: 'easeInOut' }}
              className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_#38bdf8] opacity-60 pointer-events-none"
            />
          </div>
        </div>

        {/* 3D Foreground Three.js WebGL Hologram Canvas Layer */}
        <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-auto touch-none" />

        {/* Subtle Atmospheric Vignette */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-slate-950/70 pointer-events-none z-10" />

        {/* TOP BAR: AUDIO & MINIMAL SKIP (Clean & Responsive) */}
        <header className="relative z-30 flex items-center justify-end p-3.5 sm:p-6 w-full max-w-7xl mx-auto pt-safe">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSoundEnabled(!soundEnabled);
              }}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-cyan-400 transition-colors backdrop-blur-md cursor-pointer shadow-lg active:scale-95"
              title={soundEnabled ? 'Mute 3D Audio' : 'Enable 3D Audio'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>
            <button
              type="button"
              onClick={handleExit}
              className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/40 text-xs font-mono-code text-cyan-300 hover:text-white transition-all backdrop-blur-md cursor-pointer shadow-lg active:scale-95"
            >
              Skip
            </button>
          </div>
        </header>

        {/* CENTER VIEWPORT: OPEN TO SHOWCASE THE ROBOT */}
        <div className="relative z-20 flex-1 flex items-center justify-center pointer-events-none" />

        {/* BOTTOM SECTION: RESPONSIVE CTA LINES & BUTTON FOR MOBILE */}
        <footer className="relative z-30 p-4 sm:p-10 pb-safe w-full max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Punchy, Inspiring CTA Lines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 px-2"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 font-mono-code text-[10px] sm:text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.35)] mb-1">
              <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" />
              <span>THE NEXT ERA OF BIONIC INTELLIGENCE</span>
            </div>
            <div className="font-display font-black text-2xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
              BUILD. INNOVATE. <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(0,240,255,0.9)]">LEAD.</span>
            </div>
            <p className="text-xs sm:text-lg text-cyan-200/90 font-medium tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] max-w-md mx-auto">
              Empowering the next generation with advanced Robotics, AI & IoT.
            </p>
          </motion.div>

          {/* Prominent Call-to-Action Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            onClick={handleExit}
            className="group relative w-full sm:w-auto px-8 py-3.5 sm:px-14 sm:py-4.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-display font-black text-sm sm:text-lg tracking-wider transition-all shadow-[0_0_40px_rgba(6,182,212,0.65)] hover:shadow-[0_0_65px_rgba(6,182,212,0.95)] active:scale-95 cursor-pointer flex items-center justify-center gap-3 border border-white/40 mb-2 sm:mb-0"
          >
            <div className="absolute inset-0 bg-white/25 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10">EXPLORE KITE ROBOTICS</span>
            <ArrowRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform" />
          </motion.button>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};
