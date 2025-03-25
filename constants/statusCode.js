// 🔧 Zdefiniuj obiekt STATUS_CODE, który przechowuje kody statusu HTTP 302 (FOUND) oraz 404 (NOT_FOUND).
const STATUS_CODE = {
    FOUND: 302,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,           
    INTERNAL_SERVER_ERROR: 500  
};

// 🔧 Wyeksportuj STATUS_CODE, który przechowuje kody statusu HTTP.
module.exports = { STATUS_CODE };

