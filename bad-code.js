// CRITICAL: eval() - Arbitrary code execution (CWE-95)
function processUserInput(input) {
    eval(input);  // ⚠️ CRITICAL: Remote code execution risk
}

// CRITICAL: innerHTML - XSS vulnerability (CWE-79)
function renderUserContent(userContent) {
    document.getElementById('content').innerHTML = userContent;  // ⚠️ XSS
}

// BLOCKER: Deprecated APIs
function oldCode() {
    with (document.forms[0]) {  // ⚠️ BLOCKER: with statement banned
        submit();  // Deprecated form handling
    }
}

// CRITICAL: Unrestricted prototype pollution
function mergeObjects(target, source) {
    for (var key in source) {  // ⚠️ CRITICAL: Missing __proto__ check
        target[key] = source[key];
    }
}

// MAJOR: var + global pollution + no strict mode
var globalCounter = 0;

function insecureCounter() {
    globalCounter++;  // ⚠️ MAJOR: Global variable mutation
    
    // MAJOR: Function constructor (code injection)
    var dynamicFn = new Function('return ' + userInput)();
    
    // CRITICAL: Unprotected localStorage
    localStorage.setItem('session', JSON.stringify({token: 'abc123'}));  // XSS risk
}

// MAJOR: Post-increment in condition (side effects)
function weirdLoop() {
    var i = 0;
    while (i++ < 5) {  // ⚠️ MAJOR: Post-increment in condition
        console.log(i);
    }
}

// BLOCKER: Empty catch block
try {
    riskyOperation();
} catch (e) {  // ⚠️ BLOCKER: Swallowing all exceptions
}

// CRITICAL: Child process spawn without validation
var { spawn } = require('child_process');
spawn('cmd', ['/c', userCommand]);  // ⚠️ Command injection
