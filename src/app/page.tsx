"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, ArrowDown, ChevronDown, Globe, ShieldCheck, Ruler,
  Wrench, FileText, MessageSquare, Camera, X, Plus, Minus, Check,
} from "lucide-react";
import fotos from "@/data/fotos";

const fadeUp = { initial: { opacity: 0, y: 48 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } };
const stagger = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

const produtos = [
  { icon: Ruler, title: "Esquadrias", desc: "Portas, janelas e vitrôs sob medida. Perfis de alta resistência com acabamento industrial.", metric: "50+", label: "projetos" },
  { icon: Globe, title: "Brises Soleil", desc: "Controle de luz natural com design arquitetônico funcional e durável.", metric: "30+", label: "instalações" },
  { icon: ShieldCheck, title: "Estruturas", desc: "Fachadas, coberturas e projetos comerciais em alumínio estrutural.", metric: "20+", label: "obras" },
  { icon: Wrench, title: "Instalação", desc: "Equipe própria. Precisão técnica. Do projeto à finalização sem intermediários.", metric: "100%", label: "satisfação" },
];

const faq = [
  { q: "Quanto tempo leva uma instalação?", a: "Depende da complexidade. Esquadrias residenciais levam de 3 a 10 dias úteis. Projetos comerciais maiores podem levar de 15 a 30 dias." },
  { q: "Vocês atendem fora de Paranavaí?", a: "Sim. Atendemos todo o noroeste do Paraná e regiões próximas. Consulte disponibilidade para sua cidade." },
  { q: "Qual a garantia dos serviços?", a: "Todas as instalações têm garantia de 1 ano contra defeitos de mão de obra. Os perfis seguem garantia do fabricante." },
  { q: "Fazem orçamento presencial?", a: "Sim. Fazemos visita técnica sem compromisso para avaliação e orçamento detalhado." },
  { q: "Trabalham com vidros também?", a: "Sim. Fornecemos e instalamos vidros temperados, laminados e comuns integrados às esquadrias." },
];

const todasFotos = [...fotos.parthenon, ...fotos.ourizona, ...fotos.royal];

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          let start = 0;
          const duration = 1500;
          const step = Math.ceil(value / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= value) { setCount(value); clearInterval(timer); }
            else setCount(start);
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HomePage() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* ===== HEADER ===== */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 mix-blend-difference"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3">
            <Image src="/logo.png" alt="AV" width={32} height={30} className="object-contain brightness-0 invert" />
            <span className="text-white font-[600] tracking-tight text-lg" style={{ fontFamily: "Sora, sans-serif" }}>AlumiVetro</span>
          </a>
          <nav className="hidden md:flex items-center gap-10">
            {["Projetos", "Serviços", "FAQ", "Contato"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-white/70 hover:text-white transition-colors tracking-wide font-[500]">{item}</a>
            ))}
            <a href="https://wa.me/5544999554709" target="_blank" rel="noopener" className="bg-white text-[#1C1C1C] px-5 py-2.5 rounded-full text-sm font-[600] hover:bg-gray-100 transition-all inline-flex items-center gap-2">
              Orçamento <ArrowUpRight size={14} />
            </a>
          </nav>
        </div>
      </motion.header>

      {/* ===== HERO — FULL FRAME ===== */}
      <section id="hero" ref={heroRef} className="relative h-screen overflow-hidden bg-[#1C1C1C]">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1C1C1C]/80 via-[#1C1C1C]/60 to-[#1C1C1C]/90 z-10" />
          {todasFotos[0] && (
            <Image src={todasFotos[0].src} alt="" fill className="object-cover" sizes="100vw" priority />
          )}
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl space-y-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}>
                <span className="inline-flex items-center gap-2 text-[#C4956A] text-xs font-[600] tracking-[0.25em] uppercase">
                  <span className="w-6 h-px bg-[#C4956A]" />
                  Paranavaí · PR
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl sm:text-7xl lg:text-8xl font-[700] text-white leading-[0.88] tracking-[-0.04em]"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                Alumínio que
                <br />
                <span className="text-[#C4956A]">constrói</span> confiança
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-white/40 text-lg max-w-lg leading-relaxed font-[400]"
              >
                Esquadrias, brises e estruturas de alumínio sob medida. 
                Projetamos, fabricamos e instalamos com padrão industrial.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="flex gap-4 pt-4"
              >
                <a href="#projetos" className="bg-white text-[#1C1C1C] px-8 py-4 rounded-full text-sm font-[600] hover:bg-gray-100 transition-all inline-flex items-center gap-2 group">
                  Ver projetos <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
                <a href="#contato" className="text-white/50 hover:text-white text-sm font-[500] transition-colors inline-flex items-center gap-1">
                  Solicitar orçamento
                </a>
              </motion.div>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <a href="#projetos" className="flex flex-col items-center gap-2 text-white/20 text-[10px] tracking-[0.2em] uppercase">
            <ArrowDown size={16} className="animate-bounce" />
          </a>
        </motion.div>
      </section>

      {/* ===== BENTO GRID — SOBRE + DIFERENCIAIS ===== */}
      <section className="py-28 px-6 bg-[#F5F4F1]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...stagger} transition={{ staggerChildren: 0.1 }} className="grid lg:grid-cols-3 gap-4">
            <motion.div {...fadeUp} className="lg:col-span-2 bg-white rounded-3xl p-10 lg:p-14 space-y-6">
              <span className="inline-flex items-center gap-2 text-[#C4956A] text-xs font-[600] tracking-[0.25em] uppercase">
                <span className="w-4 h-px bg-[#C4956A]" /> Sobre
              </span>
              <h2 className="text-3xl lg:text-4xl font-[700] text-[#1C1C1C] leading-tight tracking-tight" style={{ fontFamily: "Sora, sans-serif" }}>
                Mais de uma década<br />entregando o que promete
              </h2>
              <p className="text-gray-500 max-w-xl leading-relaxed">
                A AlumiVetro é referência em esquadrias de alumínio no noroeste do Paraná. 
                Da escolha dos materiais à instalação final, cada etapa é acompanhada de perto 
                pela nossa equipe.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Equipe própria", "Materiais certificados", "Orçamento transparente", "Garantia de 1 ano"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-1.5 text-xs font-[500] text-[#1C1C1C] bg-[#E8E6E1] px-4 py-2 rounded-full">
                    <Check size={12} className="text-[#C4956A]" /> {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="bg-[#1C1C1C] rounded-3xl p-10 lg:p-14 flex flex-col justify-between">
              <div className="space-y-1 mb-8">
                <div className="text-5xl font-[700] text-[#C4956A]" style={{ fontFamily: "Sora, sans-serif" }}>
                  <Counter value={10} />+
                </div>
                <p className="text-white/40 text-sm">anos de mercado</p>
              </div>
              <div className="space-y-6">
                {[
                  { value: 50, suffix: "+", label: "Obras realizadas" },
                  { value: 100, suffix: "%", label: "Satisfação" },
                ].map((s) => (
                  <div key={s.label} className="flex items-baseline gap-3">
                    <span className="text-2xl font-[700] text-white" style={{ fontFamily: "Sora, sans-serif" }}>
                      <Counter value={s.value} suffix={s.suffix} />
                    </span>
                    <span className="text-white/30 text-xs uppercase tracking-widest">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== PROJETOS — MASONRY ASSIMÉTRICO ===== */}
      <section id="projetos" className="py-28 px-6 bg-[#F5F4F1]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <span className="inline-flex items-center gap-2 text-[#C4956A] text-xs font-[600] tracking-[0.25em] uppercase">
              <span className="w-4 h-px bg-[#C4956A]" /> Galeria
            </span>
            <h2 className="text-4xl lg:text-5xl font-[700] text-[#1C1C1C] mt-3 leading-tight tracking-tight" style={{ fontFamily: "Sora, sans-serif" }}>
              Obras em destaque
            </h2>
          </motion.div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {todasFotos.map((foto, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="break-inside-avoid cursor-pointer relative group rounded-2xl overflow-hidden bg-[#E8E6E1]"
                onClick={() => setLightbox(foto.src)}
              >
                <div className={`relative ${i === 0 ? "aspect-[3/4]" : i === 3 ? "aspect-square" : "aspect-[4/5]"}`}>
                  <Image src={foto.src} alt={foto.alt} fill className="object-cover group-hover:scale-[1.03] transition-transform duration-700" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <span className="text-white text-sm font-[500]">{foto.alt}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVIÇOS — CARDS ASSIMÉTRICOS ===== */}
      <section id="serviços" className="py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <span className="inline-flex items-center gap-2 text-[#C4956A] text-xs font-[600] tracking-[0.25em] uppercase">
              <span className="w-4 h-px bg-[#C4956A]" /> Expertise
            </span>
            <h2 className="text-4xl lg:text-5xl font-[700] text-[#1C1C1C] mt-3 leading-tight tracking-tight" style={{ fontFamily: "Sora, sans-serif" }}>
              O que entregamos
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#E8E6E1] rounded-3xl overflow-hidden">
            {produtos.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white p-10 lg:p-12 hover:bg-[#F5F4F1] transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E8E6E1] flex items-center justify-center mb-6 group-hover:bg-[#1C1C1C] transition-colors">
                    <Icon size={20} className="text-[#1C1C1C] group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-3xl font-[700] text-[#C4956A] mb-2" style={{ fontFamily: "Sora, sans-serif" }}>{p.metric}</div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-6">{p.label}</p>
                  <h3 className="text-lg font-[600] text-[#1C1C1C] mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PROCESSO — TIMELINE ===== */}
      <section className="py-28 px-6 bg-[#1C1C1C]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-16">
            <span className="inline-flex items-center gap-2 text-[#C4956A] text-xs font-[600] tracking-[0.25em] uppercase">
              <span className="w-4 h-px bg-[#C4956A]" /> Processo
            </span>
            <h2 className="text-4xl lg:text-5xl font-[700] text-white mt-3 leading-tight tracking-tight" style={{ fontFamily: "Sora, sans-serif" }}>
              Como funciona
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-0 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-1/4 left-[8%] right-[8%] h-px bg-white/10" />

            {[
              { step: "01", title: "Contato", desc: "Você entra em contato. Entendemos o que precisa e agendamos uma visita." },
              { step: "02", title: "Projeto", desc: "Fazemos a medição e desenvolvemos o projeto sob medida para sua obra." },
              { step: "03", title: "Produção", desc: "Fabricamos as esquadrias com materiais certificados e controle de qualidade." },
              { step: "04", title: "Instalação", desc: "Equipe própria instala tudo com precisão. Entregamos e acompanhamos." },
            ].map((p, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="relative p-8 lg:p-10">
                <div className="hidden md:block absolute top-[calc(25%+8px)] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#C4956A] z-10" />
                <div className="text-6xl font-[700] text-white/5 mb-8" style={{ fontFamily: "Sora, sans-serif" }}>{p.step}</div>
                <h3 className="text-lg font-[600] text-white mb-3">{p.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-28 px-6 bg-[#F5F4F1]">
        <div className="max-w-3xl mx-auto">
          <motion.div {...fadeUp} className="mb-14 text-center">
            <span className="inline-flex items-center gap-2 text-[#C4956A] text-xs font-[600] tracking-[0.25em] uppercase">
              <span className="w-4 h-px bg-[#C4956A]" /> FAQ
            </span>
            <h2 className="text-3xl lg:text-4xl font-[700] text-[#1C1C1C] mt-3 leading-tight tracking-tight" style={{ fontFamily: "Sora, sans-serif" }}>
              Perguntas frequentes
            </h2>
          </motion.div>

          <div className="space-y-2">
            {faq.map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl overflow-hidden">
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="text-sm font-[500] text-[#1C1C1C] pr-4">{item.q}</span>
                  {faqOpen === i ? <Minus size={16} className="text-[#C4956A] flex-shrink-0" /> : <Plus size={16} className="text-gray-400 flex-shrink-0" />}
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                      <p className="px-6 pb-6 text-sm text-gray-500 leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="contato" className="py-28 px-6 bg-[#1C1C1C] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-2 text-[#C4956A] text-xs font-[600] tracking-[0.25em] uppercase">
              <span className="w-4 h-px bg-[#C4956A]" /> Contato
            </span>
            <h2 className="text-4xl lg:text-5xl font-[700] text-white mt-3 leading-tight tracking-tight" style={{ fontFamily: "Sora, sans-serif" }}>
          Vamos conversar sobre<br />seu projeto
            </h2>
          </motion.div>
          <motion.p {...fadeUp} className="text-white/40 max-w-lg mx-auto leading-relaxed">
            Solicite um orçamento sem compromisso. Respondemos em até 24 horas.
          </motion.p>
          <motion.div {...fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="https://wa.me/5544999554709" target="_blank" rel="noopener" className="bg-[#C4956A] hover:bg-[#b88655] text-[#1C1C1C] font-[600] px-8 py-4 rounded-full text-sm transition-all inline-flex items-center gap-2 group">
              <MessageSquare size={18} /> Fale pelo WhatsApp <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a href="https://www.instagram.com/alumivetro" target="_blank" rel="noopener" className="border border-white/20 text-white/80 hover:text-white hover:border-white/40 px-8 py-4 rounded-full text-sm transition-all inline-flex items-center gap-2">
              <Camera size={18} /> Instagram
            </a>
          </motion.div>
          <motion.div {...fadeUp} className="flex justify-center gap-10 text-sm text-white/20 pt-8">
            <span>(44) 99955-4709</span>
            <span>alumivetro@outlook.com</span>
            <span>Paranavaí · PR</span>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#1C1C1C] border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="AV" width={20} height={18} className="object-contain brightness-0 invert opacity-40" />
            <span className="text-white/20 text-xs">AlumiVetro © {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-6 text-xs text-white/20">
            <a href="https://wa.me/5544999554709" target="_blank" rel="noopener" className="hover:text-white/50 transition-colors">WhatsApp</a>
            <a href="https://www.instagram.com/alumivetro" target="_blank" rel="noopener" className="hover:text-white/50 transition-colors">Instagram</a>
          </div>
        </div>
      </footer>

      {/* ===== LIGHTBOX ===== */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1C1C1C]/95 flex items-center justify-center p-4 cursor-pointer"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors z-10" onClick={() => setLightbox(null)}>
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-6xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightbox} alt="" fill className="object-contain" sizes="100vw" priority />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
