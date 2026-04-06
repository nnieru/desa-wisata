import type { Destination } from "@/types/destination";
import { FallbackImage } from "@/components/ui";

export function DestinationGallery({
  destination,
}: {
  destination: Destination;
}) {
  const images =
    destination.gallery.length > 0
      ? destination.gallery
      : [destination.heroImage, destination.heroImage, destination.heroImage];

  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="overflow-hidden rounded-[2rem] bg-surface-container-lowest shadow-[0_4px_20px_rgba(45,51,53,0.04)]">
        <div className="relative aspect-[4/3]">
          <FallbackImage
            src={images[0]}
            alt={`${destination.name} main view`}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
      <div className="grid gap-4">
        {images.slice(1, 3).map((image, index) => (
          <div
            key={image + index}
            className="overflow-hidden rounded-[2rem] bg-surface-container-lowest shadow-[0_4px_20px_rgba(45,51,53,0.04)]"
          >
            <div className="relative aspect-[4/3]">
              <FallbackImage
                src={image}
                alt={`${destination.name} view ${index + 2}`}
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
