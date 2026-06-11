"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import fotos from "@/data/fotos";

type GaleriaCategoria = "todas" | "parthenon" | "ourizona" | "royal";

const categorias: { key: GaleriaCategoria; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "parthenon", label: "Condomínio Parthenon" },
  { key: "ourizona", label: "Ourizona" },
  { key: "royal", label: "Cond. Royal" },
];

function getFiltro(cat: GaleriaCategoria) {
  if (cat === "todas") return [...fotos.parthenon, ...fotos.ourizona, ...fotos.royal];
  return fotos[cat];
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("opacity-100", "translate-y-0");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export default function HomePage() {
  const [categoria, setCategoria] = useState<GaleriaCategoria>("todas");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [menuAberto, setMenuAberto] = useState(false);
  const filtradas = getFiltro(categoria);
  useScrollReveal();

  return (
    <>
      {/* ===== HEADER CUSTOM ===== */}
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference" id="home">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <Image src="/logo.png" alt="AlumiVetro" width={38} height={36} className="object-contain brightness-0 invert" priority />
            <span className="text-white font-bold text-lg tracking-tight">AlumiVetro</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {["Sobre", "Projetos", "Serviços", "Contato"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-white/80 hover:text-white transition-colors tracking-wide uppercase">
                {item}
              </a>
            ))}
          </nav>

          <a href="https://wa.me/5544999554709" target="_blank" rel="noopener" className="hidden md:inline-flex items-center gap-2 bg-white text-[#070707] px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors">
            Orçamento
          </a>

          <button className="md:hidden p-2 text-white" onClick={() => setMenuAberto(!menuAberto)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuAberto ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
        {menuAberto && (
          <div className="md:hidden bg-white shadow-xl mx-4 rounded-2xl p-6 flex flex-col gap-4">
            {["Sobre", "Projetos", "Serviços", "Contato"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuAberto(false)} className="text-sm font-medium text-gray-700 hover:text-[#0A6162]">{item}</a>
            ))}
            <a href="https://wa.me/5544999554709" target="_blank" rel="noopener" className="bg-[#070707] text-white px-4 py-3 rounded-xl text-sm font-bold text-center">Solicitar Orçamento</a>
          </div>
        )}
      </header>

      {/* ===== HERO - FULL SCREEN COM SPLIT ===== */}
      <section className="relative min-h-screen bg-[#0A6162] flex items-center overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-32">
            {/* Left */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 text-white/60 text-sm tracking-widest uppercase">
                <span className="w-8 h-px bg-white/40" />
                Referência no Paraná
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
                Alumínio que<br />
                <span className="text-white/80">transforma</span> espaços
              </h1>
              <p className="text-lg text-white/70 max-w-md leading-relaxed">
                Projetos sob medida em esquadrias, brises e estruturas de alumínio. 
                Instalação profissional com padrão que dura.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a href="#projetos" className="bg-white text-[#070707] font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all inline-flex items-center gap-2">
                  Ver Projetos
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
                <a href="#servicos" className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all inline-flex items-center gap-2">
                  Como trabalhamos
                </a>
              </div>
            </div>

            {/* Right - Stats Card */}
            <div className="hidden lg:flex justify-end">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 space-y-8 max-w-sm">
                {[
                  { number: "10+", label: "Anos de mercado" },
                  { number: "50+", label: "Projetos entregues" },
                  { number: "100%", label: "Satisfação" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-6">
                    <span className="text-4xl font-bold text-white tracking-tight">{s.number}</span>
                    <span className="text-white/60 text-sm uppercase tracking-widest">{s.label}</span>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-white/20 border-2 border-[#0A6162] flex items-center justify-center text-white text-xs font-bold">AV</div>
                    ))}
                    <div className="w-10 h-10 rounded-full bg-[#070707] border-2 border-[#0A6162] flex items-center justify-center text-white text-xs font-bold">+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SOBRE - MAIS VISUAL ===== */}
      <section id="sobre" className="py-28 bg-[#FDFEFE]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            {/* Visual block */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-[#0A6162] to-[#0d7a7b] rounded-3xl overflow-hidden relative">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 30% 70%, white 0%, transparent 50%)" }} />
                  <div className="absolute inset-0 flex items-center justify-center p-12">
                    <Image src="/logo.png" alt="AlumiVetro" width={200} height={200} className="object-contain opacity-80" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#070707] rounded-2xl flex items-center justify-center text-white text-center p-4 shadow-xl">
                  <div>
                    <div className="text-2xl font-bold">2025</div>
                    <div className="text-[10px] uppercase tracking-widest opacity-70">Fundação</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3 space-y-6">
              <span className="section-badge">Nossa História</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0A6162] leading-tight tracking-tight">
                Mais que esquadrias,<br />entregamos soluções
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed max-w-xl">
                <p>
                  A <strong>AlumiVetro</strong> nasceu da visão de oferecer o que há de melhor 
                  em esquadrias de alumínio para o Paraná. Trabalhamos com materiais selecionados 
                  e processos que garantem do projeto à instalação — sem atalhos.
                </p>
                <p>
                  Cada obra é tratada como única. Do residencial ao comercial, 
                  nosso compromisso é com o acabamento que faz diferença no dia a dia.
                </p>
              </div>
              <div className="flex flex-wrap gap-6 pt-4">
                {["Equipe própria", "Materiais certificados", "Orçamento transparente"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-4 py-2 rounded-full">
                    <svg className="w-4 h-4 text-[#0A6162]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROJETOS / GALERIA - MASONRY + FULL WIDTH ===== */}
      <section id="projetos" className="py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div className="max-w-xl space-y-4">
              <span className="section-badge">Portfólio</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0A6162] leading-tight tracking-tight">Projetos realizados</h2>
              <p className="text-gray-500">Cada trabalho conta uma história. Conheça alguns dos nossos projetos.</p>
            </div>
            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {categorias.map((cat) => (
                <button key={cat.key} onClick={() => setCategoria(cat.key)} className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${categoria === cat.key ? "bg-[#070707] text-white shadow-lg" : "bg-white text-gray-500 hover:text-[#0A6162] border border-gray-200"}`}>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Masonry-like grid with varied aspect ratios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtradas.map((foto, i) => {
              // Vary aspect ratios: first item tall, others varied
              const isTall = i === 0 || i % 5 === 0;
              const isWide = i === 1 || i % 4 === 0;
              return (
                <div
                  key={i}
                  className={`relative group cursor-pointer rounded-2xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 ${isTall ? "row-span-2" : ""} ${isWide ? "col-span-1 lg:col-span-2" : ""}`}
                  onClick={() => setLightbox(foto.src)}
                >
                  <div className={`relative ${isTall ? "aspect-[3/4]" : isWide ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                    <Image
                      src={foto.src}
                      alt={foto.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A6162]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                      <div>
                        <span className="text-white text-sm font-semibold block">{foto.alt}</span>
                        <span className="text-white/60 text-xs">Clique para ampliar</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SERVIÇOS - CARDS INCLINADOS / VISUAL ===== */}
      <section id="servicos" className="py-28 bg-[#0A6162] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-16 space-y-4">
            <span className="inline-flex items-center gap-2 text-white/60 text-xs font-bold tracking-widest uppercase">O que fazemos</span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">Serviços especializados</h2>
            <p className="text-white/60">Soluções completas em alumínio para sua obra, do projeto à instalação.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Esquadrias",
                desc: "Janelas, portas e vitrôs sob medida. Perfis de alta resistência com design moderno e durabilidade.",
                icon: "🪟",
              },
              {
                title: "Brises Soleil",
                desc: "Elementos arquitetônicos que controlam luz e ventilação sem abrir mão da estética.",
                icon: "☀️",
              },
              {
                title: "Estruturas",
                desc: "Fachadas, coberturas, sacadas e estruturas comerciais em alumínio sob medida.",
                icon: "🏗️",
              },
              {
                title: "Instalação",
                desc: "Equipe própria para instalação profissional com precisão e acabamento impecável.",
                icon: "🔧",
              },
              {
                title: "Manutenção",
                desc: "Preventiva e corretiva para prolongar a vida útil das suas esquadrias com garantia.",
                icon: "🛠️",
              },
              {
                title: "Projetos",
                desc: "Desenvolvimento personalizado do zero, adaptado às necessidades específicas da sua obra.",
                icon: "📐",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1"
              >
                <div className="text-3xl mb-5">{s.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA - CONTATO COM SPLIT ===== */}
      <section id="contato" className="py-28 bg-[#FDFEFE]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="section-badge">Entre em Contato</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#070707] leading-tight tracking-tight">
                Vamos construir<br />algo incrível juntos
              </h2>
              <p className="text-gray-500 max-w-md">
                Solicite um orçamento sem compromisso. Respondemos em até 24 horas.
              </p>
              <div className="space-y-4">
                {[
                  { icon: "📞", label: "(44) 99955-4709" },
                  { icon: "✉️", label: "alumivetro@outlook.com" },
                  { icon: "📍", label: "Paranavaí, PR" },
                ].map((c, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-xl">{c.icon}</span>
                    <span className="text-gray-700">{c.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-4 pt-4">
                <a href="https://wa.me/5544999554709" target="_blank" rel="noopener" className="btn-primary text-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
                  WhatsApp
                </a>
                <a href="https://www.instagram.com/alumivetro" target="_blank" rel="noopener" className="btn-outline text-sm">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z" /></svg>
                  Instagram
                </a>
              </div>
            </div>
            {/* Right visual */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-[#0A6162] to-[#074748] rounded-3xl p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 0%, transparent 50%)" }} />
                <div className="relative text-center">
                  <Image src="/logo.png" alt="AlumiVetro" width={120} height={120} className="object-contain mx-auto mb-8 opacity-60 brightness-0 invert" />
                  <div className="space-y-3 text-white/80">
                    <p className="text-sm">Seg a Sex: 08h às 18h</p>
                    <p className="text-sm">Sáb: 08h às 12h</p>
                    <div className="pt-4">
                      <p className="text-white font-bold text-lg">Solicite seu orçamento</p>
                      <p className="text-white/60 text-sm">Respondemos rápido</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-[#070707] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <Image src="/logo.png" alt="AlumiVetro" width={32} height={30} className="object-contain brightness-0 invert" />
                <span className="text-white font-bold text-lg">AlumiVetro</span>
              </div>
              <p className="text-gray-500 text-sm max-w-md leading-relaxed">
                Esquadrias de alumínio sob medida com instalação profissional. 
                Qualidade que transforma espaços no Paraná.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Contato</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <p>(44) 99955-4709</p>
                <p>alumivetro@outlook.com</p>
                <p>Paranavaí, PR</p>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Redes</h4>
              <div className="space-y-3 text-sm">
                <a href="https://wa.me/5544999554709" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition-colors block">WhatsApp</a>
                <a href="https://www.instagram.com/alumivetro" target="_blank" rel="noopener" className="text-gray-400 hover:text-white transition-colors block">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-600">
            © {new Date().getFullYear()} AlumiVetro. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* ===== LIGHTBOX ===== */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-[#070707]/95 flex items-center justify-center p-4 cursor-pointer" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/60 text-2xl hover:text-white transition-colors z-10" onClick={() => setLightbox(null)}>✕</button>
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image src={lightbox} alt="Ampliada" fill className="object-contain" sizes="100vw" priority />
          </div>
        </div>
      )}
    </>
  );
}
