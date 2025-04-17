"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the 'express' module along with 'Request' and 'Response' types from express
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./api/routes"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
// Create an Express application
const app = (0, express_1.default)();
// Database connection
config_1.Database.connection();
app.use((0, cors_1.default)());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Routes
app.use('/api/v1', routes_1.default);
// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: err.message,
    });
});
// Start the server and listen on the specified port
app.listen(config_1.port, () => {
    // Log a message when the server is successfully running
    console.log(`Server is running on http://localhost:${config_1.port} server`);
});
