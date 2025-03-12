import { NextResponse } from "next/server";
import { sign } from "../utils"; // Assuming this function is in utils.js
import logger from "@/lib/logger"; // Import Winston logger

const base_url = process.env.PAYKU_BASE_URL;
const token_publico = process.env.PAYKU_TOKEN_PUBLICO;

export async function POST(req) {
    try {
        const data = await req.json();
        logger.info("Received POST request", { data });

        async function request(data) {
            try {
                const requestPath = base_url + "/api/suclient";
                const signature = await sign(requestPath, data);

                logger.debug("Generated signature for request", { signature });

                const response = await fetch(requestPath, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Sign": signature,
                        "Authorization": `Bearer ${token_publico}`,
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }

                const result = await response.json();
                logger.info("Successful response from external API", { result });

                return result;
            } catch (error) {
                logger.error("Error in request function", { error: error.message });
                throw new Error("Failed to send request to external API.");
            }
        }

        const resp = await request(data);
        return NextResponse.json(resp);
    } catch (error) {
        logger.error("Error in POST handler", { error: error.message });
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
