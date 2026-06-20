# Regex Toolkit MCP Server

A specialized, high-performance Model Context Protocol (MCP) server engineered to handle complex Regular Expression operations deterministically. This server equips your LLM agents with the ability to securely extract, validate, and mask Personally Identifiable Information (PII) without relying on token-heavy, hallucination-prone AI pattern matching.

[![Available on Vinkius Cloud](https://img.shields.io/badge/Run%20on-Vinkius%20Cloud-blue?style=for-the-badge)](https://vinkius.com/mcp/regex-toolkit)
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

## Deploy & Run via Vinkius Cloud

You don't need to host or manage this infrastructure. For production workloads requiring high availability and low latency, you can attach this MCP directly to your agents via **Vinkius Cloud**.

👉 **[Get Instant Access to Regex Toolkit MCP on Vinkius](https://vinkius.com/mcp/regex-toolkit)**

Vinkius Cloud is a specialized edge platform for running MCP servers. Our infrastructure executes your tools in secure, isolated V8 sandboxes globally, providing native DDoS protection, automatic scaling, and instant tool availability.

---

## Local Installation & Source Code

For developers who want to run this locally, audit the source code, or deploy it into their own VPCs, this project is entirely open-source. It is constructed using [MCP Fusion](https://www.npmjs.com/package/@mcpfusion/core), ensuring strict type safety and architectural separation of concerns.

### Setup Instructions

1. **Install Dependencies**
   Ensure you have Node.js v20+ installed, then run:
   ```bash
   npm install
   ```

2. **Build the TypeScript Source**
   ```bash
   npm run build
   ```

3. **Start the MCP Server**
   ```bash
   npm run dev
   ```
   *The server communicates via standard input/output (stdio), ready to be consumed by any compliant MCP client.*

### Edge Deployment
To publish this MCP to the Vinkius Edge network, use the integrated deployment command:
```bash
npx mcpfusion deploy
```

## Security & Architecture

This server is strictly stateless. It does not store, log, or transmit the text you send it for evaluation. The `mask_sensitive_data` tool is explicitly designed to help organizations meet GDPR and CCPA compliance requirements by ensuring PII is scrubbed *before* it hits downstream AI models or storage layers.
