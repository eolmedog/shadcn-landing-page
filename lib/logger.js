import winston from "winston";

// Custom log format to support objects
const logFormat = winston.format.printf(({ level, message, timestamp, ...meta }) => {
    let metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
    return `[${timestamp}]:[${level.toUpperCase()}] - ${message}${metaString}`;
});

const logger = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Timestamp format
        winston.format.errors({ stack: true }), // Include error stack traces
        winston.format.splat(), // Supports formatting placeholders (%s, %d, %j)
        winston.format.json(), // Enable JSON output
        logFormat
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston.transports.File({ filename: "logs/combined.log" })
    ],
});

// Usage examples:

export default logger;
