import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

// הקישור הישיר לגוגל סקריפט לפיתוח מקומי
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwPaJE9Afiq6ea2N_S5kQoIPpQAuApOdlwHGouT3oNs1--ko4d5nY9e8ZzJl65M0_jv/exec";

export function AppContextProvider({ children }) {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSummaries = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
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




