// 🏗 Stwórz funkcję 'homeRouting', która obsłuży stronę główną.
// 🏗 Ustaw odpowiedni nagłówek 'Content-Type'.
// Podpowiedź: response.setHeader("Content-Type", "text/html");
// 🏗 Zakończ odpowiedź HTTP po wyrenderowaniu strony.
// Podpowiedź: return response.end();
function homeRouting(method, response) {
    response.setHeader("Content-Type", "text/html");

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Shop – Home</title>
        </head>
        <body>
            <h1>Home</h1>
            <nav>
                <a href="/product/add">Add product</a> |
                <a href="/product/new">Newest product</a> |
                <a href="/logout">Logout</a>
            </nav>
        </body>
        </html>
    `;

    response.end(htmlContent);
}

// 🔧 Wyeksportuj funkcję 'homeRouting', aby inne moduł mogły jej używać.

module.exports = { homeRouting };
