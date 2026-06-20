const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
// Generic international phone regex supporting codes, parens, spaces, hyphens
const phoneRegex = /(?:\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{4}/g;

export async function extractData(text: string, type: string): Promise<{ success: boolean, result?: string[], error?: string }> {
    if (!text) return { success: true, result: [] };
    const t = type.toLowerCase();
    let matches: RegExpMatchArray | null = null;
    
    if (t === 'email') {
        matches = text.match(emailRegex);
    } else if (t === 'url') {
        matches = text.match(urlRegex);
    } else if (t === 'phone') {
        matches = text.match(phoneRegex);
    } else {
        return { success: false, error: 'Type must be email, url, or phone.' };
    }
    
    const unique = matches ? Array.from(new Set(matches)) : [];
    return { success: true, result: unique };
}

export async function validateData(text: string, type: string): Promise<{ success: boolean, result?: boolean, error?: string }> {
    if (!text) return { success: true, result: false };
    const t = type.toLowerCase();
    
    let regex: RegExp;
    if (t === 'email') {
        regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    } else if (t === 'url') {
        regex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
    } else if (t === 'phone') {
        regex = /^(?:\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{4}$/;
    } else {
        return { success: false, error: 'Type must be email, url, or phone.' };
    }
    
    return { success: true, result: regex.test(text.trim()) };
}

export async function maskData(text: string, maskEmails: boolean, maskUrls: boolean, maskPhones: boolean): Promise<{ success: boolean, result?: string, error?: string }> {
    if (!text) return { success: true, result: '' };
    let masked = text;
    if (maskEmails) {
        masked = masked.replace(emailRegex, '[EMAIL_REDACTED]');
    }
    if (maskUrls) {
        masked = masked.replace(urlRegex, '[URL_REDACTED]');
    }
    if (maskPhones) {
        masked = masked.replace(phoneRegex, '[PHONE_REDACTED]');
    }
    return { success: true, result: masked };
}
