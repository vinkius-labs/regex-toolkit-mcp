#!/usr/bin/env node
import { startServer } from '@mcpfusion/core';
import { f } from './mcpfusion.js';
import { credentials } from './credentials.js';
import * as tools from './agents/api/regex.tools.js';
export const registry = f.registry();
for (const tool of Object.values(tools)) {
    if (tool && typeof tool.getName === 'function') {
        registry.register(tool);
    }
}
async function main() {
    await startServer({ name: 'regex-toolkit', version: '1.0.0', registry, credentials });
}
main().catch(console.error);
