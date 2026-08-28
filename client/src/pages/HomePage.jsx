import MessageBox from "../components/MessageBox.jsx";
import RenderModels from "../components/RenderModels.jsx";
import { useModels } from "../contexts/ModelsContext";

export default function HomePage() {
  const { models, error, isLoading } = useModels();

  return (
    <div className="flex flex-col gap-4">
      <form role="search">
        <input disabled name="search" type="search" placeholder="Model Name" />
        <input disabled type="submit" value="Search" />
      </form>

      {error && <MessageBox message="Error loading models" />}
      {isLoading ? (
        <MessageBox message="Loading..." />
      ) : (
        <RenderModels list={models} />
      )}
    </div>
  );
}
