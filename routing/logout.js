// 🏗 Stwórz funkcję 'logoutRouting', która obsłuży stronę wylogowania.
// 🏗 Ustaw odpowiedni nagłówek 'Content-Type'.
// Podpowiedź: response.setHeader("Content-Type", "text/html");
// 🏗 Zakończ odpowiedź HTTP po wyrenderowaniu strony.
// Podpowiedź: return response.end();
function logoutRouting(method, response) {
    response.setHeader("Content-Type", "text/html");

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Shop – Logout</title>
        </head>
        <body>
            <h1>Logout</h1>
            <nav>
                <a href="/">Home</a> |
                <a href="/kill">Logout from application</a>
            </nav>
        </body>
        </html>
    `;

    return response.end(htmlContent);
}
// 🔧 Wyeksportuj funkcję 'logoutRouting', aby inne moduł mogły jej używać.
module.exports = { logoutRouting };
