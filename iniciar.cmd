IF EXIST node_modules (
    node server.js
) ELSE (
    npm i
    node server.js
)