import winston from "winston";

// Custom log format: [datetime]:[LEVEL] message
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}]:[${level.toUpperCase()}] - ${message}`;
});

const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Timestamp format
        logFormat
    ),
    transports: [
        new winston.transports.Console(), // Logs to console
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/combined.log" })
    ],
});

export default logger;
