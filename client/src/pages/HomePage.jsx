import { useEffect, useRef, useState } from "react";
import MessageBox from "../components/MessageBox.jsx";
import RenderModels from "../components/RenderModels.jsx";
import { useModels } from "../contexts/ModelsContext";

export default function HomePage() {
    const { models, error, isLoading } = useModels();
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = e => {
            const activeElement = document.activeElement;
            const isSearchFocused = activeElement === searchInputRef.current;

            if (e.key === "Escape" && isSearchFocused) return searchInputRef.current?.blur();

            if (e.key === "/") {
                const activeTag = activeElement?.tagName.toLowerCase();
                if (activeTag === "input" || activeTag === "textarea") return;

                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const filteredModels = models?.filter(model =>
        model.model_name?.toLowerCase().includes(searchQuery.toLowerCase().trim()),
    );

    return (
        <div className="flex flex-col gap-4">
            <form role="search" onSubmit={e => e.preventDefault()} className="container">
                <input
                    ref={searchInputRef}
                    type="search"
                    name="search"
                    placeholder={`'/' to Search ${models?.length} Models by Name`}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                />
            </form>

            {error && <MessageBox message="Error loading models" />}

            {isLoading ? (
                <MessageBox message="Loading models..." />
            ) : filteredModels?.length > 0 ? (
                <RenderModels list={filteredModels} />
            ) : (
                <MessageBox
                    message={searchQuery ? `No models matching "${searchQuery}"` : "No models found in database."}
                />
            )}
        </div>
    );
}
