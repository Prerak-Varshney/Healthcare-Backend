import { isSpoofedBot } from "@arcjet/inspect";
import { aj } from "../config/arcjet.js";

const arcJetMiddleware = async(req, res, next) => {
    const decision = await aj.protect(req);

    console.log("Arcjet decision:", decision);

    if (decision.isDenied()) {
        if (decision.reason.isBot()) {
        res.writeHead(403, { "Content-Type": "text/html" });
        res.end("<h1>Forbidden</h1><p>Bots denied.</p>");
        } else if (decision.reason.isRateLimit()) {
        res.writeHead(429, { "Content-Type": "text/html" });
        res.end("<h1>Too Many Requests</h1><p>Rate limit exceeded.</p>");
        } else {
        res.writeHead(403, { "Content-Type": "text/html" });
        res.end("<h1>Forbidden</h1><p>Access denied.</p>");
        }
    }
    // https://docs.arcjet.com/bot-protection/reference#bot-verification
    // Test it with:
    // `curl -H "User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)" http://localhost:3000`
    else if (decision.results.some(isSpoofedBot)) {
        res.writeHead(403, { "Content-Type": "text/html" });
        res.end("<h1>Forbidden</h1><p>No spoofing!</p>");
    } else {
        next();
    }

}

export { arcJetMiddleware };