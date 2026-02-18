#!/usr/bin/env node
/**
 * HumanAPI MCP Server
 *
 * MCP server that lets AI agents create tasks, find humans,
 * and manage work on humanapi.ru — a marketplace where AI agents
 * hire humans for real-world tasks.
 *
 * Usage:
 *   HUMANAPI_API_KEY=your_key npx humanapi-mcp
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
const API_BASE = process.env.HUMANAPI_BASE_URL || "https://humanapi.ru/api";
const API_KEY = process.env.HUMANAPI_API_KEY || "";
// ─── helpers ────────────────────────────────────────────────────────
async function api(method, path, params, body) {
    const url = new URL(`${API_BASE}${path}`);
    if (params) {
        for (const [k, v] of Object.entries(params)) {
            if (v !== undefined && v !== "")
                url.searchParams.set(k, String(v));
        }
    }
    const headers = {
        "Content-Type": "application/json",
    };
    if (API_KEY)
        headers["X-Api-Key"] = API_KEY;
    const res = await fetch(url.toString(), {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`API ${res.status}: ${text}`);
    }
    return res.json();
}
// ─── server ─────────────────────────────────────────────────────────
const server = new McpServer({
    name: "humanapi",
    version: "1.0.0",
});
// --- Tool: search_humans ---
server.tool("search_humans", "Search for human workers by city and/or skill. Returns people available to perform real-world tasks.", {
    city: z.string().optional().describe("City name (e.g. Москва, Новосибирск)"),
    skill: z.string().optional().describe("Skill to search for (e.g. фото, доставка, уборка)"),
}, async ({ city, skill }) => {
    const data = await api("GET", "/humans", { city, skill });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
});
// --- Tool: create_task ---
server.tool("create_task", "Create a new task (bounty) for humans to complete. The task will be distributed to matching workers automatically.", {
    title: z.string().min(10).describe("Task title (min 10 chars)"),
    description: z.string().min(30).describe("Detailed description of what needs to be done (min 30 chars)"),
    city: z.string().describe("City where the task should be performed"),
    budget: z.number().int().min(100).describe("Budget in rubles (min 100₽)"),
    category: z.string().optional().describe("Category slug: photo, delivery, research, mystery_shopping, content, cleaning, handyman, errand, online"),
    spots: z.number().int().min(1).max(100).optional().describe("Number of workers needed (default 1)"),
}, async ({ title, description, city, budget, category, spots }) => {
    const body = {
        title,
        description,
        city,
        budget,
    };
    if (category)
        body.category_slug = category;
    if (spots)
        body.spots = spots;
    const data = await api("POST", "/tasks", undefined, body);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
});
// --- Tool: list_tasks ---
server.tool("list_tasks", "Browse open tasks on the marketplace. Filter by city, category, budget range.", {
    city: z.string().optional().describe("Filter by city"),
    category: z.string().optional().describe("Category slug"),
    status: z.enum(["open", "in_progress", "completed"]).optional().describe("Task status filter"),
    min_budget: z.number().int().optional().describe("Minimum budget"),
    max_budget: z.number().int().optional().describe("Maximum budget"),
    limit: z.number().int().min(1).max(100).optional().describe("Max results (default 20)"),
    offset: z.number().int().optional().describe("Offset for pagination"),
}, async ({ city, category, status, min_budget, max_budget, limit, offset }) => {
    const data = await api("GET", "/bounties", {
        city,
        category,
        status,
        min_budget,
        max_budget,
        limit,
        offset,
    });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
});
// --- Tool: get_task ---
server.tool("get_task", "Get detailed information about a specific task by ID, including status and assigned worker.", {
    task_id: z.number().int().describe("Task ID"),
}, async ({ task_id }) => {
    const data = await api("GET", `/tasks/${task_id}`);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
});
// --- Tool: send_message ---
server.tool("send_message", "Send a message to the worker assigned to your task. Supports text communication between AI agent and human worker.", {
    task_id: z.number().int().describe("Task ID"),
    text: z.string().min(1).describe("Message text"),
}, async ({ task_id, text }) => {
    const data = await api("POST", `/tasks/${task_id}/messages`, undefined, { text });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
});
// --- Tool: get_messages ---
server.tool("get_messages", "Get chat messages for a task. Use to check worker's updates and responses.", {
    task_id: z.number().int().describe("Task ID"),
}, async ({ task_id }) => {
    const data = await api("GET", `/tasks/${task_id}/messages`);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
});
// --- Tool: get_categories ---
server.tool("get_categories", "List all available task categories (photo, delivery, research, cleaning, etc.)", {}, async () => {
    const data = await api("GET", "/categories");
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
});
// --- Tool: get_stats ---
server.tool("get_stats", "Get platform statistics: number of workers, tasks, completed jobs.", {}, async () => {
    const data = await api("GET", "/stats");
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
});
// ─── start ──────────────────────────────────────────────────────────
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
main().catch((err) => {
    console.error("Fatal:", err);
    process.exit(1);
});
