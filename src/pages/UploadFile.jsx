import React, { useState } from 'react';
import DropZone from '../components/DropZone';
import DetailsModal from '../components/DetailsModal';

// הקישור הישיר של גוגל סקריפט (לצורך פיתוח מקומי במחשב)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwPaJE9Afiq6ea2N_S5kQoIPpQAuApOdlwHGouT3oNs1--ko4d5nY9e8ZzJl65M0_jv/exec";
// הקישור לפונקציית נטליפיי המאובטחת (לצורך האתר הרץ באוויר בנטליפיי)
const NETLIFY_FUNCTION_URL = "/.netlify/functions/upload";

// בפיתוח מקומי (localhost) נשתמש בקישור הישיר של גוגל כי נטליפיי לא פעיל מקומית ב-npm run dev.
// כאשר האתר יעלה לאוויר בנטליפיי, הוא ישתמש בפונקציה המאובטחת באופן אוטומטי!
const UPLOAD_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
  ? GOOGLE_SCRIPT_URL
  : NETLIFY_FUNCTION_URL;

export default function UploadFile() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleCancel = () => {
    setSelectedFile(null);
  };

  const handleFormSubmit1 = (formData) => {
    if (!selectedFile) return Promise.reject(new Error("לא נבחר קובץ"));

    // יצירת פרומיס לביצוע ההעלאה
    const uploadPromise = new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      
      reader.onload = async () => {
        try {
          const base64Data = reader.result.split(',')[1]; // חילוץ ה-Base64 ללא הקידומת
          
          const payload = {
            fileData: base64Data,
            fileName: selectedFile.name,
            mimeType: selectedFile.type,
            uploaderName: formData.uploaderName,
            lessonContent: formData.lessonContent,
            year: formData.year
          };

          const response = await fetch(UPLOAD_URL, {
            method: "POST",
            headers: {
              "Content-Type": "text/plain"
            },
            body: JSON.stringify(payload)
          });

          const result = await response.json();

          if (result.status === "success") {
            alert("הסיכום הועלה בהצלחה ל-Google Drive! 🎉");
            setSelectedFile(null); // איפוס הקובץ וסגירת המודאל רק לאחר הצלחה
            resolve(result);
          } else {
            alert(`שגיאה בהעלאה: ${result.message}`);
            reject(new Error(result.message));
          }
        } catch (err) {
          alert(`שגיאה בחיבור לשרת: ${err.message}`);
          reject(err);
        }
      };

      reader.onerror = () => {
        alert("שגיאה בקריאת הקובץ מהמחשב.");
        reject(new Error("שגיאה בקריאת הקובץ מהמחשב"));
      };
    });

    return uploadPromise; // מחזיר את הפרומיס כדי שהמודאל ינטרל את הכפתור בזמן העבודה
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px', direction: 'rtl' }}>
      <DropZone onFileSelect={handleFileSelect} />

      {selectedFile && (
        <DetailsModal 
          file={selectedFile} 
          onCancel={handleCancel} 
          onSubmit={handleFormSubmit1} 
        />
      )}
    </div>
  );
}

