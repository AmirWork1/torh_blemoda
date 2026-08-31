// import React from 'react'
// import { Link } from 'react-router-dom'

// export default function About() {
//   return (
//     <div className='  p-4 text-center' >
//       <p>  ברוכים הבאים לאתר האתר נבנה כדי לרכז ולשתף את כל שיעורי
       
//         הרב שאנשים סיכמו במהלך השנים,  לטובת קהל הלומדים  </p>
// <p>נשמח להערות לטובת שיפורים</p>
// <p>האתר בשלבי הרצה נשמח להערות רבות ככל האפשר</p>
// <a href="mailto:amir.fr.work@gmail.com?subject=פנייה מהאתר">amir.fr.work@gmail.com</a>
// {/* <a herf="mailto:amir.fr.work@gmail.com?subject=פנייה מהאתר">amir.fr.work@gmail.com</a> */}
//     </div>
//   )
// }
import React from 'react';
// import { Mail } from 'lucide-react';

export default function About() {
  return (
    <div className="container p-4">
      <div className="text-center mb-4">
        <h2 className="font-serif fw-bold">אודות האתר</h2>
      </div>

  <div className="mx-auto text-end" style={{ maxWidth: '700px' }}>        <p className="mb-3">
          האתר נבנה כדי לרכז ולשתף את שיעורי הרב שסוכמו במהלך השנים,
          כדי שכל מי שרוצה ללמוד ולחזור על החומר יוכל למצוא אותו במקום אחד ונגיש.
        </p>

        <p className="mb-3">
          כרגע האתר עדיין בשלבי הרצה ראשונים, ואנחנו שמחים לכל הערה שתעזור לנו לשפר ולהתאים אותו טוב יותר לצרכים שלכם.
        </p>

        <p className="mb-4">
          אם נתקלתם בבעיה, יש לכם רעיון לשיפור, או סתם רציתם לומר משהו — נשמח לשמוע.
        </p>

        <div className="text-center">
          
        <a  href="mailto:amir.fr.work@gmail.com?subject=פנייה מהאתר"
            className="text-decoration-none d-inline-flex align-items-center gap-2 footer-link"
          >
            {/* <Mail size={16} /> */}
            amir.fr.work@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}