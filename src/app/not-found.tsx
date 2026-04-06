import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="mb-4 rounded-full bg-surface-container px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-on-surface-variant">
        ERROR 404
      </p>
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-on-surface-variant sm:text-base">
        The page you are looking for does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-on-primary transition hover:bg-primary-dim"
      >
        Back to home
      </Link>
    </main>
  );
}
