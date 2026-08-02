import { Play } from "lucide-react";
import { trackDownload } from "@/lib/track-download";

export type Show = {
  title: string;
  tag: string;
  views: string;
  image: string;
};

export function PosterCard({ show, eager = false }: { show: Show; eager?: boolean }) {
  return (
    <button
      type="button"
      onClick={() => trackDownload()}
      className="group w-full text-left"
      aria-label={`Ver ${show.title} en la app`}
    >
      <div className="relative aspect-2/3 overflow-hidden rounded-xl shadow-[var(--shadow-poster)]">
        <img
          src={show.image}
          alt={`Póster de la serie ${show.title}`}
          width={400}
          height={600}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          sizes="(max-width: 480px) 33vw, 160px"
          className="h-full w-full object-cover"
        />
        <span className="absolute left-1.5 top-1.5 rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
          {show.tag}
        </span>
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 bg-[image:var(--gradient-fade)] px-2 pb-2 pt-8 text-[11px] text-foreground/85">
          <Play className="size-3 shrink-0 fill-current" />
          {show.views}
        </div>
      </div>
      <h3 className="mt-1.5 line-clamp-2 text-[13px] font-semibold leading-snug text-foreground">
        {show.title}
      </h3>
    </button>
  );
}
