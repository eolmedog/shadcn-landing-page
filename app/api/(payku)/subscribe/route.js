import { NextResponse } from "next/server";
import { sign } from "../utils"; // Assuming you have a sign function in utils.js
import logger from "@/lib/logger"; // Winston logger for logging

const BASE_URL = process.env.PAYKU_BASE_URL;
const TOKEN_PUBLICO = process.env.PAYKU_TOKEN_PUBLICO;

export async function POST(req) {
    try {
        // Parse request body
        const data = await req.json();
        logger.info("Received subscription request", data);
        console.log(data);

        // Construct request path
        const requestPath = "/api/sususcription";  // Only the path, not full URL

        // Generate signature using `sign` function
        const signature = await sign(requestPath, data);

        // Send subscription request
        const response = await fetch(`${BASE_URL}${requestPath}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Sign": signature,
                "Authorization": `Bearer ${TOKEN_PUBLICO}`,
            },
            body: JSON.stringify(data),
        });

        // Parse response
        const result = await response.json();
        logger.info("Received response from subscription API", { result });

        if (response.status === 200 && result.status === "register") {
            logger.info("Subscription registered, redirecting user", { redirectUrl: result.url });
            return NextResponse.redirect(result.url);
        } else {
            logger.error("Subscription failed", { error: result });
            return NextResponse.json(
                { error: result.message_error || "Unknown error occurred" },
                { status: response.status }
            );
        }
    } catch (error) {
        logger.error("Error in subscription endpoint", error.message);
        console.log(error)
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
