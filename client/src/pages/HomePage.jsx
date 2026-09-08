import { useState } from "react";
import MessageBox from "../components/MessageBox.jsx";
import RenderModels from "../components/RenderModels.jsx";
import { useModels } from "../contexts/ModelsContext";

export default function HomePage() {
    const { models, error, isLoading } = useModels();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredModels = models.filter(model =>
        model.model_name?.toLowerCase().includes(searchQuery.toLowerCase().trim()),
    );

    return (
        <div className="flex flex-col gap-4 container">
            <form role="search" onSubmit={e => e.preventDefault()}>
                <input
                    type="search"
                    name="search"
                    placeholder="Search by model name..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>

            {error && <MessageBox message="Error loading models" />}

            {isLoading ? (
                <MessageBox message="Loading models..." />
            ) : filteredModels.length > 0 ? (
                <RenderModels list={filteredModels} />
            ) : (
                <MessageBox
                    message={searchQuery ? `No models matching "${searchQuery}"` : "No models found in database."}
                />
            )}
        </div>
    );
}
