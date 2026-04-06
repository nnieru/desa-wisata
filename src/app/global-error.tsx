"use client";

export default function GlobalError({
  error,
  reset,
}: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-on-surface">
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
          <p className="mb-4 rounded-full bg-error/10 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-error">
            ERROR 500
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Something went wrong
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-on-surface-variant sm:text-base">
            An unexpected server error happened while loading this page. Please
            try again.
          </p>

          {error.digest ? (
            <p className="mt-3 text-xs text-on-surface-variant/80">
              Ref: {error.digest}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-on-primary transition hover:bg-primary-dim"
            >
              Try again
            </button>
            <a
              href="/"
              className="rounded-xl border border-outline/40 bg-surface-container-low px-5 py-2.5 text-sm font-medium text-on-surface transition hover:bg-surface-container"
            >
              Back to home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
