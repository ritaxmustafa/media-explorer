import { useVideos } from "./hooks/useVideos";

function App() {
  const { data, isLoading, error } = useVideos();

  console.log(data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return <div>API connected successfully.</div>;
}

export default App;