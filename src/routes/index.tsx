import { createFileRoute } from "@tanstack/react-router";
import { Play, Star, Download, ChevronRight, Flame } from "lucide-react";
import { MobileShell } from "@/components/mobile-shell";
import { PosterCard, type Show } from "@/components/poster-card";
import { appConfig } from "@/config/app-config";
import { trackDownload } from "@/lib/track-download";
const logoUrl = "/logo.png";
import poster1 from "@/assets/poster-1.webp";
import poster2 from "@/assets/poster-2.webp";
import poster3 from "@/assets/poster-3.webp";
import poster4 from "@/assets/poster-4.webp";
import poster5 from "@/assets/poster-5.webp";
import poster6 from "@/assets/poster-6.webp";
import poster7 from "@/assets/poster-7.webp";
import poster8 from "@/assets/poster-8.webp";
import poster9 from "@/assets/poster-9.webp";
import poster10 from "@/assets/poster-10.webp";
import poster11 from "@/assets/poster-11.webp";
import poster12 from "@/assets/poster-12.webp";
import poster13 from "@/assets/poster-13.webp";
import poster14 from "@/assets/poster-14.webp";
import poster15 from "@/assets/poster-15.webp";
import poster16 from "@/assets/poster-16.webp";
import poster17 from "@/assets/poster-17.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [
      { rel: "preload", as: "image", href: poster1, fetchpriority: "high" },
    ],
    meta: [
      { title: "ReelShort · Series verticales gratis en tu móvil" },
      {
        name: "description",
        content:
          "Miles de miniseries verticales: romance, acción, terror, misterio, vampiros y fantasía. Un capítulo dura un minuto. Descarga la app gratis.",
      },
      { property: "og:title", content: "ReelShort · Series verticales gratis" },
      {
        property: "og:description",
        content:
          "Romance, acción, terror, misterio, vampiros y fantasía en miniseries de un minuto. Descarga la app gratis.",
      },
    ],
  }),
  component: Index,
});

const categories = [
  "Para ti",
  "Romance",
  "Acción",
  "Terror",
  "Misterio",
  "Vampiros",
  "Fantasía",
  "Hombres lobo",
  "Venganza",
  "Millonarios",
  "Comedia",
  "Época",
  "Mafia",
  "Instituto",
  "Ciencia ficción",
  "Viajes en el tiempo",
];

const trending: Show[] = [
  { title: "La novia secreta del millonario", tag: "Top 1", views: "820 M", image: poster1 },
  { title: "El alfa de la luna roja", tag: "Nuevo", views: "560 M", image: poster2 },
  { title: "Regresé con su heredero", tag: "Top 3", views: "410 M", image: poster3 },
  { title: "La venganza de la directora", tag: "Exclusiva", views: "370 M", image: poster4 },
  { title: "Mil años esperándote", tag: "Popular", views: "290 M", image: poster5 },
  { title: "Bajo la lluvia te encontré", tag: "Romance", views: "230 M", image: poster6 },
];

const genreRows: { title: string; subtitle: string; shows: Show[] }[] = [
  {
    title: "Acción y adrenalina",
    subtitle: "Peleas, disparos y venganza",
    shows: [
      { title: "El guardaespaldas sin nombre", tag: "Acción", views: "198 M", image: poster7 },
      { title: "Sangre en el garaje", tag: "Estreno", views: "142 M", image: poster15 },
      { title: "Contrato de honor", tag: "Mafia", views: "121 M", image: poster4 },
      { title: "El último round", tag: "Acción", views: "98 M", image: poster1 },
    ],
  },
  {
    title: "Terror y misterio",
    subtitle: "No lo veas de noche",
    shows: [
      { title: "El pasillo 13", tag: "Terror", views: "176 M", image: poster8 },
      { title: "El detective de la niebla", tag: "Misterio", views: "133 M", image: poster9 },
      { title: "Susurros en la clínica", tag: "Terror", views: "109 M", image: poster5 },
      { title: "El caso de la casa vacía", tag: "Misterio", views: "87 M", image: poster3 },
    ],
  },
  {
    title: "Vampiros y sobrenatural",
    subtitle: "Colmillos, lunas y pactos",
    shows: [
      { title: "La reina de las rosas negras", tag: "Vampiros", views: "211 M", image: poster11 },
      { title: "Mordida de medianoche", tag: "Vampiros", views: "154 M", image: poster5 },
      { title: "La loba y su alfa", tag: "Lobos", views: "147 M", image: poster2 },
      { title: "Marca del destino", tag: "Lobos", views: "102 M", image: poster17 },
    ],
  },
  {
    title: "Fantasía y ciencia ficción",
    subtitle: "Otros mundos, otras vidas",
    shows: [
      { title: "El discípulo de la espada", tag: "Fantasía", views: "188 M", image: poster10 },
      { title: "Neón 2099", tag: "Sci-Fi", views: "126 M", image: poster13 },
      { title: "Caí en otro tiempo", tag: "Tiempo", views: "119 M", image: poster17 },
      { title: "La corte de la emperatriz", tag: "Época", views: "94 M", image: poster14 },
    ],
  },
  {
    title: "Romance y comedia",
    subtitle: "Para sonreír en dos minutos",
    shows: [
      { title: "Café sobre el jefe", tag: "Comedia", views: "165 M", image: poster12 },
      { title: "Promesa de azotea", tag: "Instituto", views: "138 M", image: poster16 },
      { title: "Casados por error", tag: "Romance", views: "112 M", image: poster6 },
      { title: "Mi vecino millonario", tag: "Romance", views: "90 M", image: poster1 },
    ],
  },
];

function Index() {
  return (
    <MobileShell>
      <header className="sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
        <button
          type="button"
          onClick={() => trackDownload()}
          className="flex min-w-0 items-center gap-2"
        >
          <img
            src={logoUrl}
            alt={`Logotipo de ${appConfig.brandName}`}
            width={32}
            height={32}
            loading="eager"
            className="size-8 shrink-0 rounded-lg"
          />
          <span className="truncate text-lg font-extrabold tracking-tight">
            {appConfig.brandName}
          </span>
        </button>
        <button
          type="button"
          onClick={() => trackDownload()}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-[image:var(--gradient-brand)] px-4 py-2 text-[13px] font-bold text-primary-foreground"
        >
          <Download className="size-4" /> Descargar app
        </button>
      </header>

      <section className="relative">
        <img
          src={poster1}
          alt="Serie destacada: La novia secreta del millonario"
          width={400}
          height={500}
          loading="eager"
          // @ts-expect-error fetchpriority es un atributo HTML válido
          fetchpriority="high"
          decoding="sync"
          className="aspect-4/5 w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-[image:var(--gradient-fade)] px-4 pb-5 pt-24">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground">
            <Flame className="size-3" /> N.º 1 de la semana
          </span>
          <h1 className="mt-3 text-[27px] font-extrabold leading-tight">
            La novia secreta del millonario
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Romance · Millonarios · 76 capítulos
          </p>
          <button
            type="button"
            onClick={() => trackDownload()}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-brand)] py-3.5 text-[15px] font-bold text-primary-foreground"
          >
            <Play className="size-4 fill-current" /> Ver capítulo 1 gratis
          </button>
        </div>
      </section>

      <nav className="no-scrollbar mt-4 flex gap-2 overflow-x-auto px-4 pb-1">
        {categories.map((c, i) => (
          <button
            key={c}
            type="button"
            onClick={() => trackDownload()}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${
              i === 0 ? "bg-foreground text-background" : "bg-secondary text-secondary-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </nav>

      <Section title="Lo más visto" subtitle="Series que arrasan ahora mismo">
        <div className="grid grid-cols-3 gap-3 px-4">
          {trending.map((s) => (
            <PosterCard key={s.title} show={s} />
          ))}
        </div>
      </Section>

      {genreRows.map((row) => (
        <Section key={row.title} title={row.title} subtitle={row.subtitle}>
          <div className="no-scrollbar flex gap-3 overflow-x-auto px-4">
            {row.shows.map((s) => (
              <div key={row.title + s.title} className="w-[38%] shrink-0">
                <PosterCard show={s} />
              </div>
            ))}
          </div>
        </Section>
      ))}

      <section className="mx-4 mt-8 rounded-2xl bg-card p-5 text-center">
        <div className="flex items-center justify-center gap-1 text-accent">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Más de <span className="font-bold text-foreground">100 millones</span> de personas ya ven{" "}
          {appConfig.brandName}
        </p>
        <h2 className="mt-4 text-xl font-extrabold leading-snug">
          Descarga la app y mira sin conexión
        </h2>
        <div className="mt-4 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => trackDownload("ios")}
            className="flex items-center justify-center gap-2 rounded-full bg-foreground py-3 text-sm font-bold text-background"
          >
            <Download className="size-4" /> Descargar en App Store
          </button>
          <button
            type="button"
            onClick={() => trackDownload("android")}
            className="flex items-center justify-center gap-2 rounded-full border border-border py-3 text-sm font-bold"
          >
            <Download className="size-4" /> Descargar en Google Play
          </button>
        </div>
      </section>

      <footer className="mt-10 px-4 text-center text-[11px] leading-relaxed text-muted-foreground">
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1">
          {["Sobre nosotros", "Términos", "Privacidad", "Contacto"].map((l) => (
            <button key={l} type="button" onClick={() => trackDownload()} className="underline-offset-2 hover:underline">
              {l}
            </button>
          ))}
        </div>
        <p className="mt-3">
          © 2026 {appConfig.brandName}. Series y pósteres son contenido original de demostración.
        </p>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[480px] border-t border-border bg-background/95 px-4 py-3 backdrop-blur">
        <button
          type="button"
          onClick={() => trackDownload()}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-brand)] py-3.5 text-[15px] font-bold text-primary-foreground"
        >
          <Download className="size-4" /> Descargar {appConfig.brandName} gratis
        </button>
      </div>
    </MobileShell>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <button
        type="button"
        onClick={() => trackDownload()}
        className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-end gap-3 px-4 pb-3 text-left"
      >
        <div className="min-w-0">
          <h2 className="truncate text-[17px] font-extrabold">{title}</h2>
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <ChevronRight className="size-5 shrink-0 text-muted-foreground" />
      </button>
      {children}
    </section>
  );
}
