import { f } from '../../mcpfusion.js';
import { RegexResponsePresenter } from '../../views/index.js';
import { extractData, validateData, maskData } from '../../engine/logic.js';
export const extractTool = f.action('extract_pattern')
    .describe('Extracts all unique emails, URLs, or phone numbers from a large body of text.')
    .instructions('Use this tool to harvest specific PII or links from raw text blocks.')
    .withString('text', 'The raw input text.')
    .withString('type', 'The pattern to extract: "email", "url", or "phone".')
    .returns(RegexResponsePresenter)
    .handle(async (i) => extractData(i.text, i.type));
export const validateTool = f.action('validate_pattern')
    .describe('Validates if a single string perfectly matches an email, URL, or phone format.')
    .instructions('Returns true if the string is a valid format, false otherwise.')
    .withString('text', 'The single string to validate (e.g. "user@example.com").')
    .withString('type', 'The pattern type: "email", "url", or "phone".')
    .returns(RegexResponsePresenter)
    .handle(async (i) => validateData(i.text, i.type));
export const maskTool = f.action('mask_sensitive_data')
    .describe('Redacts sensitive PII (emails, phones, URLs) from a text blob by replacing them with [REDACTED] tags.')
    .instructions('Use this before sending sensitive user content to external systems.')
    .withString('text', 'The text to sanitize.')
    .withBoolean('maskEmails', 'Set to true to mask email addresses.')
    .withBoolean('maskUrls', 'Set to true to mask web URLs.')
    .withBoolean('maskPhones', 'Set to true to mask phone numbers.')
    .returns(RegexResponsePresenter)
    .handle(async (i) => maskData(i.text, i.maskEmails, i.maskUrls, i.maskPhones));
