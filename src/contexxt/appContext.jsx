import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

// משיכת קישור גוגל ישירות מקובץ .env.local ללא חשיפה ב-Git
const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
// הקישור לפונקציית נטליפיי המאובטחת בייצור
const NETLIFY_FUNCTION_URL = "/.netlify/functions/upload";

// שימוש בקישור הישיר מקומית, ובנטליפיי מאובטחת באוויר
const API_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ? GOOGLE_SCRIPT_URL
  : NETLIFY_FUNCTION_URL;

export function AppContextProvider({ children }) {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSummaries = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!API_URL) {
        throw new Error("כתובת ה-API אינה מוגדרת.");
      }
      const response = await fetch(API_URL);
      const result = await response.json();
      
      if (result.status === "success") {
        setSummaries(result.data || []);
      } else {
        setError(result.message || "שגיאה בקבלת הנתונים מגוגל");
      }
    } catch (err) {
      setError("שגיאה בחיבור לשרת: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  return (
    <AppContext.Provider value={{ summaries, loading, error, refreshSummaries: fetchSummaries }}>
      {children}
    </AppContext.Provider>
  );
}




