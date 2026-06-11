"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import fotos from "@/data/fotos";

type Tab = "projetos" | "servicos" | "contato";

export default function HomePage() {
  const [tab, setTab] = useState<Tab>("projetos");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const filtradas = [...fotos.parthenon, ...fotos.ourizona, ...fotos.royal];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ===== BARRA SUPERIOR MINIMALISTA ===== */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="AV" width={36} height={34} className={`object-contain transition-all duration-500 ${scrolled ? "brightness-100" : "brightness-0 invert"}`} />
          </div>
          <nav className="hidden md:flex items-center gap-10">
            {[
              { key: "projetos", label: "Projetos" },
              { key: "servicos", label: "Serviços" },
              { key: "contato", label: "Contato" },
            ].map((item) => (
              <button key={item.key} onClick={() => setTab(item.key as Tab)}
                className={`text-sm font-medium tracking-widest uppercase transition-all duration-300 ${tab === item.key ? (scrolled ? "text-[#0A6162]" : "text-white") : (scrolled ? "text-gray-400 hover:text-gray-600" : "text-white/50 hover:text-white/80")}`}>
                {item.label}
              </button>
            ))}
            <a href="https://wa.me/5544999554709" target="_blank" rel="noopener"
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${scrolled ? "bg-[#070707] text-white hover:bg-gray-800" : "bg-white text-[#070707] hover:bg-gray-100"}`}>
              Orçamento
            </a>
          </nav>
        </div>
      </div>

      {/* ===== PAGE CONTAINER ===== */}
      <div className="bg-[#070707] min-h-screen">
        {/* ===== HERO - IMPACTO VISUAL MÍNIMO ===== */}
        <section className="h-screen flex flex-col justify-center px-8 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#0A6162]/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/[0.02] rounded-full blur-[80px]" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto w-full">
            <div className="max-w-3xl">
              <div className="mb-6">
                <span className="text-[#0A6162] text-xs font-bold tracking-[0.3em] uppercase">AlumiVetro ®</span>
              </div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-[0.92] tracking-[-0.04em]">
                Alumínio<br />
                <span className="text-white/40">como expressão</span>
              </h1>
              <p className="text-white/30 text-base sm:text-lg mt-8 max-w-md leading-relaxed">
                Esquadrias, brises e estruturas. Projetos sob medida com instalação profissional no Paraná.
              </p>
              <div className="flex gap-4 mt-10">
                <button onClick={() => setTab("projetos")} className="bg-white text-[#070707] px-8 py-4 rounded-full text-sm font-bold hover:bg-gray-100 transition-all inline-flex items-center gap-3 group">
                  Ver projetos
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button onClick={() => setTab("contato")} className="text-white/50 hover:text-white text-sm font-medium transition-colors">
                  Orçamento
                </button>
              </div>
            </div>
          </div>
          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/20 text-xs tracking-widest">
            <span className="animate-bounce">↓</span>
          </div>
        </section>

        {/* ===== CONTEÚDO TABS ===== */}
        <div className="bg-[#FDFEFE] rounded-t-[3rem] relative z-10">
          {/* === PROJETOS === */}
          {tab === "projetos" && (
            <section className="py-24 px-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex items-baseline justify-between mb-16">
                  <div>
                    <span className="text-[#0A6162] text-xs font-bold tracking-[0.3em] uppercase">— Galeria</span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#070707] mt-4 leading-tight tracking-tight">
                      Obras selecionadas
                    </h2>
                  </div>
                  <span className="hidden sm:block text-gray-300 text-sm">{filtradas.length} projetos</span>
                </div>

                {/* Layout bold: alterna larguras */}
                <div className="space-y-6">
                  {filtradas.map((foto, i) => {
                    const isWide = i % 2 === 0;
                    const isTall = i === 2 || i === 5;
                    return (
                      <div
                        key={i}
                        className={`relative group cursor-pointer overflow-hidden rounded-3xl bg-gray-100 ${isWide ? "lg:col-span-2" : ""} ${isTall ? "lg:row-span-2" : ""}`}
                        style={{ gridRow: isTall ? "span 2" : undefined }}
                        onClick={() => setLightbox(foto.src)}
                      >
                        <div className={`relative ${isWide ? "aspect-[21/9]" : isTall ? "aspect-[3/4] lg:aspect-[3/5]" : "aspect-[4/3]"}`}>
                          <Image src={foto.src} alt={foto.alt} fill className="object-cover" sizes="100vw" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                              <p className="text-white text-sm font-medium">{foto.alt}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-16 text-center">
                  <a href="https://wa.me/5544999554709" target="_blank" rel="noopener" className="inline-flex items-center gap-3 bg-[#070707] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-gray-800 transition-all group">
                    Solicite seu orçamento
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* === SERVIÇOS === */}
          {tab === "servicos" && (
            <section className="py-24 px-8">
              <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                  <span className="text-[#0A6162] text-xs font-bold tracking-[0.3em] uppercase">— Expertise</span>
                  <h2 className="text-4xl lg:text-5xl font-bold text-[#070707] mt-4 leading-tight tracking-tight">
                    O que entregamos
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0.5 bg-gray-100 rounded-3xl overflow-hidden">
                  {[
                    { title: "Esquadrias", desc: "Janelas, portas e vitrôs sob medida com perfis de alta resistência.", stat: "50+" },
                    { title: "Brises", desc: "Controle de luz e ventilação com design arquitetônico funcional.", stat: "30+" },
                    { title: "Estruturas", desc: "Fachadas, coberturas e projetos comerciais em alumínio.", stat: "20+" },
                    { title: "Instalação", desc: "Equipe própria para instalação profissional com precisão.", stat: "100%" },
                    { title: "Manutenção", desc: "Preventiva e corretiva para preservar suas esquadrias.", stat: "5+" },
                    { title: "Projetos Personalizados", desc: "Soluções feitas sob medida para cada obra.", stat: "Todos" },
                  ].map((s, i) => (
                    <div key={i} className="bg-white p-10 hover:bg-gray-50 transition-colors group">
                      <div className="text-[#0A6162] text-4xl font-bold mb-6">{s.stat}</div>
                      <h3 className="text-lg font-bold text-[#070707] mb-3">{s.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* === CONTATO === */}
          {tab === "contato" && (
            <section className="py-24 px-8">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <span className="text-[#0A6162] text-xs font-bold tracking-[0.3em] uppercase">— Contato</span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-[#070707] mt-4 leading-tight tracking-tight mb-8">
                      Vamos conversar
                    </h2>
                    <div className="space-y-6 text-sm">
                      {[
                        { label: "WhatsApp", value: "(44) 99955-4709", href: "https://wa.me/5544999554709" },
                        { label: "Email", value: "alumivetro@outlook.com", href: "mailto:alumivetro@outlook.com" },
                        { label: "Localização", value: "Paranavaí, PR", href: null },
                      ].map((c, i) => (
                        <div key={i}>
                          <p className="text-gray-400 text-xs tracking-widest uppercase mb-1">{c.label}</p>
                          {c.href ? (
                            <a href={c.href} target="_blank" rel="noopener" className="text-[#070707] font-medium hover:text-[#0A6162] transition-colors">{c.value}</a>
                          ) : (
                            <p className="text-[#070707] font-medium">{c.value}</p>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-10">
                      <a href="https://wa.me/5544999554709" target="_blank" rel="noopener" className="inline-flex items-center gap-3 bg-[#070707] text-white px-8 py-4 rounded-full text-sm font-bold hover:bg-gray-800 transition-all group">
                        Falar pelo WhatsApp
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </a>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="bg-[#070707] rounded-3xl p-16 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
                      <div className="relative text-center">
                        <Image src="/logo.png" alt="AV" width={100} height={100} className="object-contain mx-auto mb-8 brightness-0 invert opacity-60" />
                        <p className="text-white/50 text-sm">Seg a Sex — 08h às 18h</p>
                        <p className="text-white/50 text-sm">Sáb — 08h às 12h</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ===== FOOTER MINIMAL ===== */}
          <footer className="border-t border-gray-100 py-12 px-8">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image src="/logo.png" alt="AV" width={24} height={22} className="object-contain" />
                <span className="text-sm text-gray-400">AlumiVetro © {new Date().getFullYear()}</span>
              </div>
              <div className="flex gap-6 text-sm text-gray-400">
                <a href="https://wa.me/5544999554709" target="_blank" rel="noopener" className="hover:text-[#0A6162] transition-colors">WhatsApp</a>
                <a href="https://www.instagram.com/alumivetro" target="_blank" rel="noopener" className="hover:text-[#0A6162] transition-colors">Instagram</a>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* ===== LIGHTBOX ===== */}
      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-[#070707]/95 flex items-center justify-center p-4 cursor-pointer" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-white/30 text-2xl hover:text-white transition-colors z-10" onClick={() => setLightbox(null)}>✕</button>
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image src={lightbox} alt="" fill className="object-contain" sizes="100vw" priority />
          </div>
        </div>
      )}
    </>
  );
}
