export default function Home() {
  return (
    <main className="w-full flex-1 grid place-content-center px-4 py-16">
      <div className="flex flex-col gap-y-0.5">
        <p className="mt-0.5 text-xs text-muted-foreground font-mono">v0.1.0</p>
        <h1
          className="flex gap-x-2 items-center uppercase"
          style={{
            fontStretch: "200%",
            fontWeight: "900",
          }}
        >
          Resilient&mdash;UI
        </h1>
        <p className="text-xs text-muted-foreground font-mono uppercase">
          by{" "}
          <a
            href="https://alexcarpenter.me"
            target="_blank"
            rel="noopener"
            className="hover:text-foreground"
          >
            Alex Carpenter
          </a>
        </p>
      </div>
    </main>
  );
}
