"use strict";

// Safely handle structured user input. Do NOT use `eval` or `Function`.
function processUserInput(input) {
    try {
        const data = JSON.parse(input);
        return handleData(data);
    } catch (e) {
        console.warn('processUserInput: invalid JSON input', e);
        return null;
    }
}

// Render user content safely. Prefer textContent or a sanitizer like DOMPurify.
function renderUserContent(userContent) {
    const el = document.getElementById('content');
    if (!el) return;
    if (window.DOMPurify && typeof DOMPurify.sanitize === 'function') {
        el.innerHTML = DOMPurify.sanitize(userContent);
    } else {
        el.textContent = userContent;
    }
}

// Replace `with` and explicitly submit the form. Use `requestSubmit()` where available.
function submitFirstForm() {
    const form = document.forms && document.forms[0];
    if (!form) return;
    if (typeof form.requestSubmit === 'function') {
        form.requestSubmit();
    } else {
        form.submit();
    }
}

// Safe merge that prevents prototype pollution.
function safeMerge(target, source) {
    Object.keys(source).forEach(function (key) {
        if (key === '__proto__' || key === 'constructor') return;
        target[key] = source[key];
    });
    return target;
}

// Module-scoped counter to avoid global pollution.
let globalCounter = 0;

function insecureCounter(userInput) {
    globalCounter++;

    // Do NOT use `new Function` or evaluate arbitrary user input.
    // If you must evaluate expressions, use a safe, sandboxed evaluator.

    // Avoid storing sensitive tokens in localStorage. Use secure, HttpOnly cookies
    // or server-side session management. For demo, keep token in-memory only.
    const session = { token: null };
    function setSessionToken(token) {
        session.token = token; // in-memory only; not persisted to localStorage
    }

    return { counter: globalCounter, setSessionToken };
}

// Clear loop without side-effecting the condition.
function weirdLoop() {
    for (let i = 1; i <= 5; i++) {
        console.log(i);
    }
}

// Handle errors instead of swallowing them.
try {
    riskyOperation();
} catch (e) {
    console.error('riskyOperation failed', e);
    // rethrow or handle appropriately depending on the app's error strategy
}

// Child process execution must validate commands and arguments.
const { spawn } = require('child_process');
const ALLOWED_COMMANDS = new Set(['echo', 'ls', 'dir']);

function runSafeCommand(cmd, args) {
    if (!ALLOWED_COMMANDS.has(cmd)) {
        throw new Error('runSafeCommand: command not allowed');
    }
    // spawn without a shell prevents shell injection; pass args as an array.
    return spawn(cmd, args || [], { shell: false });
}

