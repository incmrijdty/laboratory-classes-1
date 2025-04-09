// 📦 Zaimportuj moduły 'fs' oraz 'STATUS_CODE' do obsługi produktów.
const fs = require('fs');
const { STATUS_CODE } = require('../constants/statusCode');

// 🏗 Stwórz funkcję 'productRouting', która obsłuży żądania dotyczące produktów.
function productRouting(url, method, response) {
    if (url === "/product/add" && method === "GET") {
        return renderAddProductPage(response);
    }

    if (url === "/product/add" && method === "POST") {
        return addNewProduct(response);
    }

    if (url === "/product/new") {
        return renderNewProductPage(response);
    }

    console.warn(`ERROR: requested url ${url} doesn’t exist.`);
    response.statusCode = STATUS_CODE.NOT_FOUND;
    return response.end("<h1>404 Not Found</h1>");
}
// 🏗 Stwórz funkcję 'renderAddProductPage', która wyrenderuje stronę dodawania produktu.
function renderAddProductPage(response) {
    response.setHeader("Content-Type", "text/html");

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Shop – Add product</title>
        </head>
        <body>
            <h1>Add product</h1>
            <nav>
                <a href="/">Home</a> |
                <a href="/product/new">Newest product</a> |
                <a href="/logout">Logout</a>
            </nav>
            <form action="/product/add" method="POST">
                <label>Product Name: <input type="text" name="name" required></label><br>
                <label>Description: <input type="text" name="description" required></label><br>
                <button type="submit">Add Product</button>
            </form>
        </body>
        </html>
    `;

    return response.end(htmlContent);
}
// 🏗 Stwórz funkcję 'renderNewProductPage', która wyświetli najnowszy produkt z pliku 'product.txt'.
// Podpowiedź: fileSystem.readFile(...);
function renderNewProductPage(response) {
    response.setHeader("Content-Type", "text/html");

    fs.readFile('product.txt', 'utf8', (err, data) => {
        let productDetails;
        if (err || !data) {
            productDetails = "<p>No new products available.</p>";
        } else {
            const [name, description] = data.split('|');
            productDetails = `<h2>${name}</h2><p>${description}</p>`;
        }

        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Shop – Newest product</title>
            </head>
            <body>
                <h1>Newest product</h1>
                <nav>
                    <a href="/">Home</a> |
                    <a href="/product/add">Add product</a> |
                    <a href="/logout">Logout</a>
                </nav>
                ${productDetails}
            </body>
            </html>
        `;

        return response.end(htmlContent);
    });
}

// 🏗 Stwóz funkcję 'addNewProduct', która obsłuży dodawanie nowego produktu, zapisywanie go do pliku 'product.txt' oraz przeniesie użytkownika na stronę '/product/new'.
// Podpowiedź: fileSystem.writeFile(...);
// Podpowiedź: response.setHeader("Location", "/product/new");
function addNewProduct(request, response) {
    let body = '';

    request.on('data', chunk => {
        body += chunk.toString();
    });

    request.on('end', () => {
        const params = new URLSearchParams(body);
        const name = params.get('name');
        const description = params.get('description');

        if (!name || !description) {
            response.statusCode = STATUS_CODE.BAD_REQUEST;
            return response.end("<h1>400 Bad Request</h1><p>Missing product data.</p>");
        }

        fs.writeFile('product.txt', `${name}|${description}`, (err) => {
            if (err) {
                response.statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR;
                return response.end("<h1>500 Internal Server Error</h1><p>Could not save product.</p>");
            }

            response.statusCode = STATUS_CODE.FOUND;
            response.setHeader("Location", "/product/new");
            return response.end();
        });
    });
}
// 🔧 Wyeksportuj funkcję 'productRouting', aby inne moduł mogły jej używać.
module.exports = { productRouting };
