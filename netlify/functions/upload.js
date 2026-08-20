export async function handler(event, context) {
  // תמיכה הן ב-GET (לקריאת נתונים) והן ב-POST (להעלאת קבצים)
  if (event.httpMethod !== "POST" && event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!googleScriptUrl) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "error", message: "Google Script URL not configured in Netlify environment variables" }),
      };
    }

    let response;
    if (event.httpMethod === "GET") {
      // ניתוב בקשת GET לגוגל סקריפט
      response = await fetch(googleScriptUrl, {
        method: "GET"
      });
    } else {
      // ניתוב בקשת POST לגוגל סקריפט
      response = await fetch(googleScriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: event.body,
      });
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "error", message: error.toString() }),
    };
  }
}
