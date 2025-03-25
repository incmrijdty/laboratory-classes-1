// 📦 Zaimportuj moduł odpowiedzialne za routing poszczególnych części aplikacji.
// 📦 Zaimportuj obiekt STATUS_CODE.
const { homeRouting } = require('./home');
const { productRouting } = require('./product');
const { logoutRouting } = require('./logout');
const { STATUS_CODE } = require('../statusCode');

// 🏗 Stwórz tutaj funkcję 'requestRouting', która będzie obsługiwać zapytania HTTP.
// Podpowiedź: const requestRouting = (request, response) => {
// 🏗 Tutaj stwórz logowanie do konsoli informacji, mówiące o typie logowania (INFO), dacie, metodzie oraz url żądania.
// 🏗 Tutaj stwórz podstawowy 'request routing' dla ścieżek '/', zawierającej /product' oraz '/logout'. Przekaż `request` i `routing` do odpowiednio routingu.

// 🏗 Obsłuż specjalny przypadek, jeśli użytkownik zostanie przekierowany na ścieżkę /kill, aplikacja się zamknie.
// 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (PROCESS), dacie oraz informację, że wylogowowyanie zostało wywołane a aplikacja zamknie się.

// 🏗 Tutaj stwórz obsługę przypadku, jeśli żądany URL nie istnieje. Zwróć wtedy błąd 404.
// 🏗 Stwórz również logowanie do konsoli informacji, mówiące o typie logowania (ERROR), dacie oraz informację, że żądany url nie istnieje.
//  };
const requestRouting = (request, response) => {
    const { method, url } = request;
    const date = new Date().toISOString();
    
    console.log(`INFO [${date}]: ${method} - ${url}`);

    if (url === "/") {
        return homeRouting(method, response);
    } 
    
    if (url.startsWith("/product")) {
        return productRouting(method, url, response);
    } 
    
    if (url === "/logout") {
        return logoutRouting(method, response);
    } 

    if (url === "/kill") {
        console.log(`PROCESS [${date}]: Logout has been initiated and the application will be closed.`);
        process.exit();
    }

    console.log(`ERROR [${date}]: Requested URL ${url} doesn’t exist.`);
    response.writeHead(STATUS_CODE.NOT_FOUND, { "Content-Type": "text/html" });
    return response.end("<h1>404 - Page Not Found</h1>");
};
// 🔧 Wyeksportuj funkcję 'requestRouting', aby inne moduł mogły jej używać.
module.exports = { requestRouting };
