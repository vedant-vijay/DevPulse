import eventEmitter from "../utils/eventEmitter.js";
import { logger } from "../utils/logger.js";

export const sseController = (req, res) => {
    res.set({
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
    });

    res.flushHeaders();

    res.write(`data: Connected to SSE\n\n`);

    const onEvent = (data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    eventEmitter.on("event", onEvent);

    const interval = setInterval(() => {
        logger.info(`: heartbeat\n\n`);
    }, 25000);

    req.on("close", () => {
        logger.info("Client disconnected");

        eventEmitter.removeListener("event", onEvent);
        clearInterval(interval);
        res.end();
    });
};

