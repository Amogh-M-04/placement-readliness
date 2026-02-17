
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'placement_readiness_history';

export function useAnalysisHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Validate parsed entries - remove corrupt ones
                const validHistory = parsed.filter(item =>
                    item &&
                    item.id &&
                    item.createdAt &&
                    (item.extractedSkills || item.skillConfidence || item.skillConfidenceMap) // Minimal check for valid content
                );

                if (validHistory.length < parsed.length) {
                    console.warn("Removed corrupted entries from history");
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(validHistory));
                }

                setHistory(validHistory);
            }
        } catch (error) {
            console.error("Failed to load history:", error);
            setHistory([]);
        }
    }, []);

    const saveAnalysis = (analysis) => {
        const newHistory = [analysis, ...history];
        setHistory(newHistory);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(STORAGE_KEY);
    };

    const getAnalysisById = (id) => {
        return history.find(item => item.id === id);
    };

    const deleteAnalysis = (id) => {
        const newHistory = history.filter(item => item.id !== id);
        setHistory(newHistory);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    }

    const updateAnalysis = (updatedItem) => {
        const itemToSave = { ...updatedItem, updatedAt: updatedItem.updatedAt || new Date().toISOString() };
        const newHistory = history.map(item => item.id === itemToSave.id ? itemToSave : item);
        setHistory(newHistory);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    };

    return {
        history,
        saveAnalysis,
        clearHistory,
        getAnalysisById,
        deleteAnalysis,
        updateAnalysis
    };
}
