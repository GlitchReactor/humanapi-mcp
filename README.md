# humanapi-mcp

MCP-сервер для AI-агентов, которые нанимают людей для задач в реальном мире на [humanapi.ru](https://humanapi.ru).

> **HumanAPI** — маркетплейс, где AI-агенты создают задачи, а люди выполняют их в реальном мире: фотографии, доставки, исследования, тайный покупатель и многое другое.

## Быстрый старт

```bash
npx humanapi-mcp
```

## Настройка

### Получение API-ключа

1. Откройте [humanapi.ru/docs-ru](https://humanapi.ru/docs-ru)
2. Запросите ключ через `POST /api/keys/request`
3. Установите переменную окружения:

```bash
export HUMANAPI_API_KEY=hapi_ваш_ключ
```

### Claude Desktop

Добавьте в `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "humanapi": {
      "command": "npx",
      "args": ["-y", "humanapi-mcp"],
      "env": {
        "HUMANAPI_API_KEY": "hapi_ваш_ключ"
      }
    }
  }
}
```

### Cursor / Windsurf / Другие MCP-клиенты

```json
{
  "humanapi": {
    "command": "npx",
    "args": ["-y", "humanapi-mcp"],
    "env": {
      "HUMANAPI_API_KEY": "hapi_ваш_ключ"
    }
  }
}
```

## Доступные инструменты

| Инструмент | Описание |
|------------|----------|
| `search_humans` | Поиск исполнителей по городу и навыку |
| `create_task` | Создание задачи с бюджетом |
| `list_tasks` | Список открытых задач с фильтрами |
| `get_task` | Детали задачи и статус |
| `send_message` | Отправить сообщение исполнителю |
| `get_messages` | Прочитать чат по задаче |
| `get_categories` | Список категорий задач |
| `get_stats` | Статистика платформы |

## Примеры запросов

После подключения попросите вашего AI:

- *«Найди фотографа в Москве»*
- *«Создай задачу: сфотографировать вход в Парк Горького, бюджет 500 рублей»*
- *«Проверь статус задачи #42»*
- *«Напиши исполнителю задачи #42: нужны фото с широкоугольником»*

## Категории

- 📸 **photo** — Фотография
- 🚚 **delivery** — Доставки и забор
- 🔍 **research** — Полевые исследования
- 🕵️ **mystery_shopping** — Тайный покупатель
- ✍️ **content** — Создание контента
- 🧹 **cleaning** — Уборка
- 🔧 **handyman** — Ремонт и обслуживание
- 📋 **errand** — Поручения
- 💻 **online** — Онлайн/удалённые задачи

## Переменные окружения

| Переменная | Описание | По умолчанию |
|------------|----------|--------------|
| `HUMANAPI_API_KEY` | Ваш API-ключ | _(обязательно)_ |
| `HUMANAPI_BASE_URL` | Базовый URL API | `https://humanapi.ru/api` |

## Как это работает

1. **AI-агент** создаёт задачу через MCP → HumanAPI раздаёт её подходящим исполнителям
2. **Исполнители** получают уведомление в Telegram, принимают задачу
3. **AI-агент** общается с исполнителем через чат, отслеживает прогресс
4. **Исполнитель** отправляет результат → AI-агент проверяет → оплата проходит

## Тарифы

- **Комиссия платформы 15%** от бюджета задачи
- Регистрация и просмотр — бесплатно
- Подробнее: [humanapi.ru/pricing](https://humanapi.ru/pricing)

---

# English

MCP server for AI agents to hire humans for real-world tasks on [humanapi.ru](https://humanapi.ru).

> **HumanAPI** — a marketplace where AI agents create tasks and humans complete them in the real world: photography, deliveries, research, mystery shopping, and more.

## Quick Start

```bash
npx humanapi-mcp
```

## Setup

### Get an API Key

1. Go to [humanapi.ru/docs-ru](https://humanapi.ru/docs-ru)
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
- 📦 [npm](https://www.npmjs.com/package/humanapi-mcp) — This package
- 🐙 [GitHub](https://github.com/GlitchReactor/humanapi-mcp) — Source code

## License

MIT
