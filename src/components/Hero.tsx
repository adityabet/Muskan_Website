import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const frameModules = import.meta.glob("../../assets/60FPS/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const frameSources = Object.entries(frameModules)
  .sort((a, b) => {
    const getIndex = (value: string) => Number(value.match(/frame_(\d+)\.jpg$/)?.[1] ?? 0);
    return getIndex(a[0]) - getIndex(b[0]);
  })
  .map(([, src]) => src);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress, scrollY } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 30,
    mass: 0.8,
  });

  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      const diff = latest - lastScrollY.current;
      scrollVelocity.current = diff;
      lastScrollY.current = latest;
    });
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    const total = frameSources.length;

    frameSources.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount += 1;
        if (loadedCount === total) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount += 1;
        if (loadedCount === total) {
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    });

    setImages(loadedImages);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      container.style.setProperty("--mouse-x", `${x}px`);
      container.style.setProperty("--mouse-y", `${y}px`);
    };

    container.style.setProperty("--mouse-x", `${window.innerWidth / 2}px`);
    container.style.setProperty("--mouse-y", `${window.innerHeight / 2}px`);

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(canvas.clientWidth * ratio);
      canvas.height = Math.floor(canvas.clientHeight * ratio);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded]);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      targetProgressRef.current = latest;
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imagesLoaded || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const createParticle = (width: number, height: number, init: boolean): Particle => ({
      x: Math.random() * width,
      y: init ? Math.random() * height : height + 10,
      size: Math.random() * 1.3 + 0.5,
      speedY: Math.random() * 0.45 + 0.22,
      speedX: Math.random() * 0.22 - 0.11,
      opacity: Math.random() * 0.45 + 0.2,
      life: init ? Math.random() * 160 : 0,
      maxLife: Math.random() * 220 + 260,
    });

    const particles: Particle[] = Array.from({ length: 48 }, () => createParticle(canvas.width, canvas.height, true));

    let lastTime = performance.now();
    let animationFrameId = 0;

    const render = (time: number) => {
      const deltaTime = Math.min((time - lastTime) / 1000, 0.08);
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const diff = targetProgressRef.current - currentProgressRef.current;
      currentProgressRef.current += diff * 0.08;

      const frameIndex = Math.max(0, Math.min(images.length - 1, Math.floor(currentProgressRef.current * images.length)));
      const activeImage = images[frameIndex];
      if (activeImage) {
        drawImageProp(ctx, activeImage, 0, 0, canvas.width, canvas.height);
      }

      scrollVelocity.current *= 0.94;

      particles.forEach((particle, index) => {
        const currentSpeedY = particle.speedY + Math.abs(scrollVelocity.current) * 0.05;
        particle.y -= currentSpeedY * 60 * deltaTime;
        particle.x += Math.sin(particle.life * 0.04 + index) * particle.speedX * 60 * deltaTime;
        particle.life += 1;

        if (particle.y < -10 || particle.life > particle.maxLife || particle.x < -10 || particle.x > canvas.width + 10) {
          particles[index] = createParticle(canvas.width, canvas.height, false);
        }

        ctx.beginPath();
        const alpha = Math.sin((particle.life / particle.maxLife) * Math.PI) * particle.opacity;
        ctx.fillStyle = `rgba(197, 160, 89, ${alpha})`;
        ctx.shadowBlur = particle.size * 2;
        ctx.shadowColor = "rgba(197, 160, 89, 0.28)";
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [images, imagesLoaded]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const canvasScale = useTransform(smoothScrollProgress, [0, 0.36, 1], [1.05, 1, 0.93]);
  const canvasBlur = useTransform(smoothScrollProgress, [0, 0.55, 1], ["blur(0px)", "blur(1.6px)", "blur(8px)"]);
  const canvasOpacity = useTransform(smoothScrollProgress, [0, 0.08, 0.82, 1], [0.92, 1, 1, 0.72]);

  const introOpacity = useTransform(smoothScrollProgress, [0, 0.04, 0.18], [1, 0.82, 0]);
  const introY = useTransform(smoothScrollProgress, [0, 0.16], [0, -70]);
  const introScale = useTransform(smoothScrollProgress, [0, 0.16], [1, 1.04]);

  const chapter1Opacity = useTransform(smoothScrollProgress, [0.16, 0.22, 0.34, 0.4], [0, 1, 1, 0]);
  const chapter1Y = useTransform(smoothScrollProgress, [0.16, 0.24, 0.34, 0.4], [52, 0, 0, -60]);
  const chapter1Scale = useTransform(smoothScrollProgress, [0.16, 0.22, 0.34, 0.4], [0.95, 1, 1, 1.05]);

  const chapter2Opacity = useTransform(smoothScrollProgress, [0.42, 0.48, 0.64, 0.7], [0, 1, 1, 0]);
  const chapter2Y = useTransform(smoothScrollProgress, [0.42, 0.5, 0.64, 0.7], [54, 0, 0, -60]);
  const chapter2Scale = useTransform(smoothScrollProgress, [0.42, 0.48, 0.64, 0.7], [0.95, 1, 1, 1.05]);

  const chapter3Opacity = useTransform(smoothScrollProgress, [0.72, 0.78, 0.9, 0.96], [0, 1, 1, 0]);
  const chapter3Y = useTransform(smoothScrollProgress, [0.72, 0.8, 0.9, 0.96], [54, 0, 0, -60]);
  const chapter3Scale = useTransform(smoothScrollProgress, [0.72, 0.78, 0.9, 0.96], [0.95, 1, 1, 1.05]);

  const indicatorOpacity = useTransform(smoothScrollProgress, [0, 0.08], [1, 0]);
  const glowOpacity = useTransform(smoothScrollProgress, [0, 0.5, 1], [0.7, 0.95, 0.48]);
  const glowScale = useTransform(smoothScrollProgress, [0, 0.5, 1], [1, 1.18, 0.95]);
  const beamX = useTransform(smoothScrollProgress, [0, 0.4, 1], [-10, 10, 22]);
  const beamY = useTransform(smoothScrollProgress, [0, 0.4, 1], [-8, 16, 26]);
  const beamOpacity = useTransform(smoothScrollProgress, [0, 0.35, 1], [0.18, 0.36, 0.12]);

  return (
    <section ref={sectionRef} id="hero" className="relative h-[650vh] w-full bg-[#0D0D0C]">
      <div
        ref={containerRef}
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden bg-[#0D0D0C]"
        style={{
          ["--mouse-x" as any]: "50%",
          ["--mouse-y" as any]: "50%",
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ scale: canvasScale, filter: canvasBlur, opacity: canvasOpacity }}
            className="flex h-full w-full items-center justify-center will-change-transform"
          >
            <canvas ref={canvasRef} className="pointer-events-none h-full w-full object-cover brightness-[0.38] contrast-[1.05]" />
          </motion.div>
        </div>

        <motion.div style={{ opacity: glowOpacity, scale: glowScale }} className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
          <div className="absolute left-[46%] top-[28%] h-[780px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C5A059]/10 blur-[140px]" />
        </motion.div>

        <motion.div style={{ x: beamX, y: beamY, opacity: beamOpacity }} className="pointer-events-none absolute inset-0 z-[6] overflow-hidden">
          <div className="absolute left-[8%] top-[12%] h-[420px] w-[220px] rotate-12 rounded-full bg-[#C5A059]/20 blur-[90px]" />
          <div className="absolute bottom-[10%] right-[6%] h-[360px] w-[220px] -rotate-12 rounded-full bg-[#FAF9F6]/10 blur-[100px]" />
        </motion.div>

        <div
          className="pointer-events-none absolute inset-0 z-[10]"
          style={{
            background:
              "radial-gradient(circle 560px at var(--mouse-x) var(--mouse-y), rgba(197, 160, 89, 0.08) 0%, rgba(13, 13, 12, 0) 82%)",
          }}
        />

        <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-[#0D0D0C] via-transparent to-[#0D0D0C]/40" />
        <div className="pointer-events-none absolute inset-0 z-[5] bg-[linear-gradient(120deg,rgba(13,13,12,0.35),transparent,rgba(13,13,12,0.3))]" />

        <div className="absolute inset-0 z-20 flex items-center justify-center px-5 sm:px-8">
          <div className="relative flex h-[72vh] w-full max-w-6xl flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
              style={{ opacity: introOpacity, y: introY, scale: introScale }}
              className="max-w-3xl space-y-4 text-left"
            >
              <p className="text-[10px] font-mono uppercase tracking-[0.42em] text-[#C5A059]">Muskan Singh Studio</p>
              <h1 className="font-serif text-4xl leading-[0.9] text-[#FAF9F6] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.4rem]">
                Sculpting Sensory Spaces
              </h1>
              <p className="max-w-2xl text-sm uppercase tracking-[0.3em] text-[#FAF9F6]/65 sm:text-base">
                Warm minimalism, tactile materiality, and cinematic calm.
              </p>
            </motion.div>

            <motion.div style={{ opacity: chapter1Opacity, y: chapter1Y, scale: chapter1Scale }} className="absolute bottom-[16%] left-0 max-w-md rounded-[1.75rem] border border-white/10 bg-black/15 p-5 backdrop-blur-xl">
              <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.36em] text-[#C5A059]">Chapter I / Spatial Silence</p>
              <p className="font-serif text-xl text-[#FAF9F6] sm:text-2xl">
                Quiet luxury expressed through proportion, light, and stillness.
              </p>
            </motion.div>

            <motion.div style={{ opacity: chapter2Opacity, y: chapter2Y, scale: chapter2Scale }} className="absolute right-0 top-[24%] max-w-md rounded-[1.75rem] border border-white/10 bg-black/15 p-5 backdrop-blur-xl">
              <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.36em] text-[#C5A059]">Chapter II / Materiality</p>
              <p className="font-serif text-xl text-[#FAF9F6] sm:text-2xl">
                Stone, oak, and brushed metal shaped into a softer architectural rhythm.
              </p>
            </motion.div>

            <motion.div style={{ opacity: chapter3Opacity, y: chapter3Y, scale: chapter3Scale }} className="absolute bottom-[6%] right-[5%] max-w-sm rounded-[1.75rem] border border-white/10 bg-black/15 p-5 backdrop-blur-xl">
              <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.36em] text-[#C5A059]">Chapter III / Atmosphere</p>
              <p className="font-serif text-xl text-[#FAF9F6] sm:text-2xl">
                A living narrative carried by light, shadow, and sculptural calm.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div style={{ opacity: indicatorOpacity }} className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center pointer-events-none sm:bottom-10">
          <button
            onClick={() => scrollToSection("about")}
            className="flex flex-col items-center text-white/60 transition-colors duration-300 hover:text-[#C5A059] pointer-events-auto"
            data-cursor="tap"
          >
            <span className="mb-2 text-[8px] font-mono uppercase tracking-[0.25em] sm:text-[9px]">Scroll To Discover</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function drawImageProp(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  offsetX = 0.5,
  offsetY = 0.5
) {
  const iw = img.width;
  const ih = img.height;
  const r = Math.min(w / iw, h / ih);
  let nw = iw * r;
  let nh = ih * r;
  let cx = 0;
  let cy = 0;
  let cw = iw;
  let ch = ih;

  if (nw < w) nw = w;
  if (nh < h) nh = h;

  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;

  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
}
