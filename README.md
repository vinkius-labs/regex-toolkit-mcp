# Regex Toolkit MCP Server

A specialized, high-performance Model Context Protocol (MCP) server engineered to handle complex Regular Expression operations deterministically. This server equips your LLM agents with the ability to securely extract, validate, and mask Personally Identifiable Information (PII) without relying on token-heavy, hallucination-prone AI pattern matching.

[![Available on Vinkius Edge](https://img.shields.io/badge/Run%20on-Vinkius%20Edge-blue?style=for-the-badge)](https://vinkius.com/mcp/regex-toolkit)
[![Docker Pulls](https://img.shields.io/docker/pulls/vinkius/regex-toolkit-mcp?style=for-the-badge&logo=docker&color=2496ed)](https://hub.docker.com/r/vinkius/regex-toolkit-mcp)
[![Built with MCP Fusion](https://img.shields.io/badge/Powered%20By-MCP%20Fusion-success?style=for-the-badge)](https://www.npmjs.com/package/@mcpfusion/core)

## The LLM Pattern Matching Dilemma

Through extensive testing with autonomous data-processing agents, we identified a critical limitation in how Large Language Models handle unstructured text: **LLMs are highly inefficient at strict pattern matching.**

When tasked with extracting or redacting emails, URLs, or phone numbers from large text blobs (such as chat logs or scraped web pages), an LLM must read every single token. This process:
- **Consumes massive context windows**, driving up inference costs exponentially.
- **Risks Hallucination**: The LLM may "invent" emails that look similar, or miss edge-case formatted phone numbers.
- **Introduces Privacy Risks**: Asking an LLM to process and return raw PII directly exposes sensitive data to the model provider's inference pipeline.

### The Regex Toolkit Solution
The **Regex Toolkit MCP** solves this by shifting pattern matching away from the AI and into a deterministic, sandboxed execution environment. By leveraging native regex engines, this MCP server can scan megabytes of text in milliseconds, perfectly extracting or masking data. The LLM only receives the exact structured data it needs, saving thousands of tokens and ensuring absolute accuracy.

---

## Technical Capabilities

This server exposes three distinct, highly optimized tools for your AI workflows:

* `extract_pattern`
  * **Function**: Scans a large body of raw text and extracts all unique instances of a specified pattern (`email`, `url`, or `phone`).
  * **Use Case**: Harvesting links from a scraped webpage or compiling a contact list from unstructured meeting transcripts.
  
* `validate_pattern`
  * **Function**: Strictly validates if a single string perfectly matches a standard email, URL, or international phone format.
  * **Use Case**: Data sanitization pipelines where an agent must verify user input before writing to a database.

* `mask_sensitive_data`
  * **Function**: Redacts sensitive PII from a text blob by deterministically replacing matches with `[REDACTED]` tags.
  * **Use Case**: Privacy compliance. An agent can use this tool to sanitize logs or customer messages before passing the text to an external analytics API.

---

## Run on Vinkius Edge (Free Edge Hosting)

Vinkius provides **free, highly available edge hosting** using secure V8 isolates. Deploying to the Vinkius Edge is the fastest way to make this MCP server accessible to any AI agent anywhere, with sub-millisecond response times and zero maintenance.

1. Clone this repository
2. Run the deployment command:

```bash
npx mcpfusion deploy
```

That's it. Your MCP server is now live, secure, and ready to be connected to your agents.

👉 **[Access the Regex Toolkit MCP on Vinkius](https://vinkius.com/mcp/regex-toolkit)**

## Local Development

Constructed using [MCP Fusion](https://www.npmjs.com/package/@mcpfusion/core) for reliable, strictly typed execution.

```bash
npm install
npm run dev
```

## Security & Architecture

This server is strictly stateless. It does not store, log, or transmit the text you send it for evaluation. The `mask_sensitive_data` tool is explicitly designed to help organizations meet GDPR and CCPA compliance requirements by ensuring PII is scrubbed *before* it hits downstream AI models or storage layers.
