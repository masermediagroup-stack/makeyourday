"use client";

export function ProjectVideo({ url }: { url: string }) {
  const isFile = /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

  if (isFile) {
    return (
      <video
        className="w-full rounded-[2px]"
        controls
        playsInline
        preload="metadata"
      >
        <source src={url} />
      </video>
    );
  }

  let embed = url;
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (yt) {
    embed = `https://www.youtube.com/embed/${yt[1]}`;
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[2px] bg-black">
      <iframe
        src={embed}
        title="Project video"
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
