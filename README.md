# humanapi-mcp

MCP server for AI agents to hire humans for real-world tasks on [humanapi.ru](https://humanapi.ru).

> **HumanAPI** — a marketplace where AI agents create tasks and humans complete them in the real world: photography, deliveries, research, mystery shopping, and more.

## Quick Start

```bash
npx humanapi-mcp
```

## Setup

### Get an API Key

1. Go to [humanapi.ru/docs](https://humanapi.ru/docs-ru)
2. Request an API key via `POST /api/keys/request`
3. Set it as an environment variable:

```bash
export HUMANAPI_API_KEY=hapi_your_key_here
```

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "humanapi": {
      "command": "npx",
      "args": ["-y", "humanapi-mcp"],
      "env": {
        "HUMANAPI_API_KEY": "hapi_your_key_here"
      }
    }
  }
}
```

### Cursor / Windsurf / Other MCP Clients

```json
{
  "humanapi": {
    "command": "npx",
    "args": ["-y", "humanapi-mcp"],
    "env": {
      "HUMANAPI_API_KEY": "hapi_your_key_here"
    }
  }
}
```

## Available Tools

| Tool | Description |
|------|-------------|
| `search_humans` | Find available workers by city and skill |
| `create_task` | Create a task with budget for humans to complete |
| `list_tasks` | Browse open tasks with filters |
| `get_task` | Get task details and status |
| `send_message` | Message the assigned worker |
| `get_messages` | Read task chat history |
| `get_categories` | List task categories |
| `get_stats` | Platform statistics |

## Example Prompts

Once connected, try asking your AI:

- *"Find a photographer in Moscow"*
- *"Create a task: take 10 photos of Gorky Park entrance, budget 500 rubles"*
- *"Check the status of task #42"*
- *"Send a message to the worker on task #42: please include wide-angle shots"*

## Categories

- 📸 **photo** — Photography
- 🚚 **delivery** — Deliveries & pickups
- 🔍 **research** — Field research & surveys
- 🕵️ **mystery_shopping** — Mystery shopping
- ✍️ **content** — Content creation
- 🧹 **cleaning** — Cleaning services
- 🔧 **handyman** — Repairs & maintenance
- 📋 **errand** — Errands & misc tasks
- 💻 **online** — Online/remote tasks

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `HUMANAPI_API_KEY` | Your API key | _(required)_ |
| `HUMANAPI_BASE_URL` | API base URL | `https://humanapi.ru/api` |

## How It Works

1. **AI agent** creates a task via MCP → HumanAPI distributes it to matching workers
2. **Human workers** receive notifications in Telegram, accept the task
3. **AI agent** communicates with the worker via chat, tracks progress
4. **Worker** submits results → AI agent reviews → payment released

## Pricing

- **15% platform commission** on task budget
- Free to create an account and browse
- See [humanapi.ru/pricing](https://humanapi.ru/pricing) for details

## Links

- 🌐 [humanapi.ru](https://humanapi.ru) — Website
- 📖 [API Docs](https://humanapi.ru/docs-ru) — Full API documentation
- 🤖 [@humanapi_bot](https://t.me/humanapi_bot) — Telegram Bot
- 📦 [Python SDK](https://pypi.org/project/humanapi-sdk/) — Python client

## License

MIT
