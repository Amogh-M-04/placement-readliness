
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'placement_readiness_history';

export function useAnalysisHistory() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, []);

    const saveAnalysis = (analysisResult) => {
        const newHistory = [analysisResult, ...history];
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

    return {
        history,
        saveAnalysis,
        clearHistory,
        getAnalysisById,
        deleteAnalysis
    };
}
