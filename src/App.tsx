import { useEffect, useRef } from "react";
import { Filters } from "./components/filters/Filters";
import { VideoGrid } from "./components/video/VideoGrid";
import { useVideoFilters } from "./hooks/useVideoFilters";

function App() {
  const { search, genre, year } = useVideoFilters();
  const scrollRef = useRef<HTMLElement>(null);

  // Jump the results back to the top whenever a filter changes, so a
  // scrolled-down user isn't left staring at a stale mid-list position.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [search, genre, year]);

  return (
    <div className="flex h-dvh flex-col">
      <header className="container mx-auto flex shrink-0 flex-col items-center px-4 pt-10 pb-2">
        <h1 className="mb-6 text-2xl font-bold">Video Browser</h1>
        <Filters />
      </header>

      <main ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 pb-10">
          <VideoGrid />
        </div>
      </main>
    </div>
  );
}

export default App;
