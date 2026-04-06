"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { ImageOff } from "lucide-react";

export function FallbackImage({ className, ...props }: ImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-surface-container text-on-surface-variant/40">
        <ImageOff className="h-8 w-8" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image {...props} className={className} onError={() => setErrored(true)} />
  );
}
