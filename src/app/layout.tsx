import type { Metadata } from "next"
import "./globals.css"
import "@fontsource/sora/400.css"
import "@fontsource/sora/500.css"
import "@fontsource/sora/600.css"
import "@fontsource/sora/700.css"
import "@fontsource/inter/400.css"
import "@fontsource/inter/500.css"
import "@fontsource/inter/600.css"

export const metadata: Metadata = {
  icons: { icon: "/favicon.png" },
  title: "AlumiVetro | Esquadrias de Alumínio · Paranavaí PR",
  description: "Projetos sob medida em esquadrias, brises e estruturas de alumínio. Equipe própria, materiais certificados, instalação profissional.",
  keywords: ["esquadrias", "alumínio", "brises", "estruturas metálicas", "Paranavaí", "AlumiVetro"],
  openGraph: { title: "AlumiVetro", description: "Esquadrias de alumínio sob medida", type: "website" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
