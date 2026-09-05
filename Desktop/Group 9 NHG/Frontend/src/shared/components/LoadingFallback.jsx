export default function LoadingFallback() {
  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,#dbeafe_0,#f8fafc_34%,#eef2ff_100%)] px-4 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center">
        <div className="relative w-full max-w-sm text-center">
          <div className="absolute -inset-8 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="relative rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-2xl shadow-blue-900/10 backdrop-blur-xl">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-cyan-50 shadow-inner">
              <div className="relative flex h-16 w-16 items-center justify-center">
                <span className="absolute h-full w-full animate-ping rounded-full bg-blue-400/25" />
                <span className="absolute h-12 w-12 rounded-full border border-blue-200" />
                <span className="h-10 w-10 animate-spin rounded-full border-[5px] border-blue-100 border-t-blue-600" />
                <span className="absolute h-3 w-3 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/40" />
              </div>
            </div>
            <p className="mt-7 text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
              National Hospital Galle
            </p>
            <h1 className="mt-3 text-2xl font-bold text-slate-950">//Donationgit
              Loading
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Please wait while we prepare the next page.
            </p>
            <div className="mt-7 flex justify-center gap-2">
              <span className="h-2 w-8 animate-pulse rounded-full bg-blue-600" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-500 [animation-delay:160ms]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 [animation-delay:320ms]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
