import { VideoGrid } from "./components/video/VideoGrid";
import { useVideos } from "./hooks/useVideos";

function App() {
  const videosQuery = useVideos();

  return (
    <div className="container mx-auto py-10 px-4 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Video Browser</h1>
      <VideoGrid videosQuery={videosQuery} />
    </div>
  );
}

export default App;
