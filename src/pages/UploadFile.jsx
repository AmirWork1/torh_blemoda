import React, { useState } from 'react';
import DropZone from '../components/DropZone';
import DetailsModal from '../components/DetailsModal';
import { generateSafeFileName } from '../components/fileValidation';

export default function UploadFile() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleCancel = () => {
    setSelectedFile(null);
  };

  const handleUploadSubmit = async (formData) => {
    // TODO: לוודא שהמשתמש מחובר (auth) לפני שממשיכים - שכבת הגנה נוספת
    // if (!currentUser) throw new Error('לא מחובר');

    const safeFileName = generateSafeFileName(selectedFile.name);

    // כאן ירוץ קוד פיירבייס האמיתי:
    // - להעלות את selectedFile לפי safeFileName (ולא לפי selectedFile.name!)
    // - לשמור ב-Firestore את formData + originalFileName: selectedFile.name + storagePath: safeFileName
    // - Firebase Security Rules צריכים לאכוף שוב: auth, גודל קובץ, content-type

    console.log('העלאה:', {
      storagePath: safeFileName,
      originalFileName: selectedFile.name,
      ...formData,
    });

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSelectedFile(null);
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px', direction: 'rtl' }}>
      <DropZone onFileSelect={handleFileSelect} />

      {selectedFile && (
        <DetailsModal file={selectedFile} onCancel={handleCancel} onSubmit={handleUploadSubmit} />
      )}
    </div>
  );
}


// import React, { useState } from 'react';
// import DropZone from '../components/DropZone'
// import DetailsModal from '../components/DetailsModal';

// export default function UploadFile() {
//  const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileSelect = (file) => {
//     setSelectedFile(file);
//   };

//   const handleCancel = () => {
//     setSelectedFile(null);
//   };

//   const handleUploadSubmit = async (formData) => {
//     try {
//       console.log("כאן ירוץ קוד פיירבייס האמיתי בענן! הנתונים:", {
//         file: selectedFile.name,
//         ...formData
//       });

//       // סימולציית המתנה קטנה
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       alert("הקובץ הועלה בהצלחה!");
//       setSelectedFile(null); // סוגר את המודאל ומאפס
//     } catch (error) {
//       console.error(error);
//       alert("תקלה בשליחה");
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: '600px', direction: 'rtl' }}>
      
//       {/* 1. אזור הגרירה תמיד מוצג */}
//       <DropZone onFileSelect={handleFileSelect} />

//       {/* 2. המודאל קופץ רק אם נבחר קובץ */}
//       {selectedFile && (
//         <DetailsModal 
//           file={selectedFile} 
//           onCancel={handleCancel} 
//           onSubmit={handleUploadSubmit} 
//         />
//       )}
      
//     </div>
//   );
// }