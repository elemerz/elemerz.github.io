/**
 * Number Base Converter Application
 * Supports conversion between bases 2-36 and base 60 (Babylonian)
 */

class NumberBaseConverter {
    constructor() {
        this.initializeElements();
        this.attachEventListeners();
        this.updateHelperText();
    }

    /**
     * Initialize DOM elements
     */
    initializeElements() {
        this.inputBase = document.getElementById('input-base');
        this.outputBase = document.getElementById('output-base');
        this.inputNumber = document.getElementById('input-number');
        this.outputNumber = document.getElementById('output-number');
        this.inputError = document.getElementById('input-error');
        this.outputError = document.getElementById('output-error');
        this.inputHelp = document.getElementById('input-help');
        this.outputHelp = document.getElementById('output-help');
        this.copyButton = document.getElementById('copy-button');
        this.swapButton = document.getElementById('swap-bases');
        this.charCounter = document.getElementById('char-counter');
        
        // Set initial input length limit
        this.updateInputMaxLength();
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        // Input changes
        this.inputNumber.addEventListener('input', () => {
            this.updateCharCounter();
            this.performConversion();
        });
        this.inputBase.addEventListener('change', () => {
            this.updateInputMaxLength();
            this.updateCharCounter();
            this.updateHelperText();
            this.performConversion();
        });
        this.outputBase.addEventListener('change', () => {
            this.updateHelperText();
            this.performConversion();
        });

        // Copy functionality
        this.copyButton.addEventListener('click', () => this.copyToClipboard());

        // Swap bases
        this.swapButton.addEventListener('click', () => this.swapBases());

        // Allow clicking on output to copy
        this.outputNumber.addEventListener('click', () => this.copyToClipboard());
    }

    /**
     * Update input maximum length based on base
     */
    updateInputMaxLength() {
        const inputBase = parseInt(this.inputBase.value);
        let maxLength;
        
        if (inputBase === 2) {
            maxLength = 400; // 400 binary digits
        } else if (inputBase === 16) {
            maxLength = 100; // 100 hexadecimal digits
        } else if (inputBase === 60) {
            maxLength = 200; // Reasonable limit for base 60 comma-separated values
        } else {
            // Calculate proportional limit based on bit capacity
            // 400 bits = log2(2^400) bits, so for base N: log2(2^400) / log2(N) digits
            maxLength = Math.floor(400 / Math.log2(inputBase));
            // Ensure minimum reasonable length
            maxLength = Math.max(maxLength, 50);
        }
        
        this.inputNumber.maxLength = maxLength;
    }

    /**
     * Update character counter
     */
    updateCharCounter() {
        const currentLength = this.inputNumber.value.length;
        const maxLength = this.inputNumber.maxLength;
        const remaining = maxLength - currentLength;
        
        this.charCounter.textContent = `${remaining}/${maxLength}`;
        
        // Update styling based on remaining characters
        this.charCounter.classList.remove('warning', 'error');
        if (remaining <= 0) {
            this.charCounter.classList.add('error');
        } else if (remaining <= maxLength * 0.1) { // Warning when 10% or less remaining
            this.charCounter.classList.add('warning');
        }
    }

    /**
     * Update helper text based on selected bases
     */
    updateHelperText() {
        const inputBaseValue = parseInt(this.inputBase.value);
        const outputBaseValue = parseInt(this.outputBase.value);
        const maxLength = this.inputNumber.maxLength;

        // Input helper text
        if (inputBaseValue === 60) {
            this.inputHelp.textContent = `Use comma-separated values (0-59). Max ${maxLength} characters. Example: 1,30,45`;
        } else if (inputBaseValue <= 10) {
            this.inputHelp.textContent = `Use digits 0-${inputBaseValue - 1}. Max ${maxLength} digits. Decimals supported with dot (.)`;
        } else {
            const lastChar = String.fromCharCode(54 + inputBaseValue);
            this.inputHelp.textContent = `Use digits 0-9 and letters A-${lastChar}. Max ${maxLength} digits. Decimals supported with dot (.)`;
        }

        // Output helper text
        if (outputBaseValue === 60) {
            this.outputHelp.textContent = 'Result in comma-separated format (0-59)';
        } else if (outputBaseValue <= 10) {
            this.outputHelp.textContent = `Result using digits 0-${outputBaseValue - 1}`;
        } else {
            const lastChar = String.fromCharCode(54 + outputBaseValue);
            this.outputHelp.textContent = `Result using digits 0-9 and letters A-${lastChar}`;
        }
    }

    /**
     * Perform the number conversion
     */
    performConversion() {
        this.clearErrors();
        
        const inputValue = this.inputNumber.value.trim();
        if (!inputValue) {
            this.outputNumber.value = '';
            this.copyButton.disabled = true;
            return;
        }

        try {
            const inputBase = parseInt(this.inputBase.value);
            const outputBase = parseInt(this.outputBase.value);

            // Validate input
            if (!this.validateInput(inputValue, inputBase)) {
                return;
            }

            // Convert to decimal first
            let decimalValue;
            if (inputBase === 60) {
                decimalValue = { integer: BigInt(this.base60ToDecimal(inputValue)), fractional: 0, hasDecimal: false };
            } else {
                decimalValue = this.anyBaseToDecimal(inputValue, inputBase);
            }

            // Convert from decimal to target base
            let result;
            if (outputBase === 60) {
                result = this.decimalToBase60(decimalValue);
            } else {
                result = this.decimalToAnyBase(decimalValue, outputBase);
            }

            this.outputNumber.value = result;
            this.copyButton.disabled = false;

        } catch (error) {
            this.showError('input', error.message);
            this.outputNumber.value = '';
            this.copyButton.disabled = true;
        }
    }

    /**
     * Validate input based on the selected base
     */
    validateInput(input, base) {
        if (base === 60) {
            return this.validateBase60Input(input);
        } else {
            return this.validateStandardBaseInput(input, base);
        }
    }

    /**
     * Validate base 60 input
     */
    validateBase60Input(input) {
        const parts = input.split(',');
        
        // Check input length
        if (input.length > this.inputNumber.maxLength) {
            this.showError('input', `Input too long. Maximum ${this.inputNumber.maxLength} characters allowed for base 60`);
            return false;
        }
        
        for (let part of parts) {
            const trimmed = part.trim();
            if (trimmed === '') {
                this.showError('input', 'Empty values not allowed in base 60');
                return false;
            }
            
            const num = parseInt(trimmed, 10);
            if (isNaN(num) || num < 0 || num >= 60) {
                this.showError('input', 'Each value in base 60 must be between 0 and 59');
                return false;
            }
        }
        
        return true;
    }

    /**
     * Validate standard base input (2-36)
     */
    validateStandardBaseInput(input, base) {
        const validChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, base);
        const normalizedInput = input.toUpperCase();
        
        // Check for decimal point
        const parts = normalizedInput.split('.');
        if (parts.length > 2) {
            this.showError('input', 'Invalid number format: multiple decimal points');
            return false;
        }

        // Validate each part
        for (let part of parts) {
            if (part === '') {
                this.showError('input', 'Invalid number format');
                return false;
            }
            
            for (let char of part) {
                if (!validChars.includes(char)) {
                    this.showError('input', `Invalid character '${char}' for base ${base}`);
                    return false;
                }
            }
        }

        // Additional validation: check input length
        if (input.length > this.inputNumber.maxLength) {
            this.showError('input', `Input too long. Maximum ${this.inputNumber.maxLength} characters allowed for base ${base}`);
            return false;
        }

        return true;
    }

    /**
     * Convert base 60 to decimal using BigInt for large numbers
     */
    base60ToDecimal(input) {
        const parts = input.split(',').map(part => parseInt(part.trim(), 10));
        let result = BigInt(0);
        const base = BigInt(60);
        
        for (let i = 0; i < parts.length; i++) {
            const power = BigInt(parts.length - 1 - i);
            result += BigInt(parts[i]) * (base ** power);
        }
        
        return Number(result); // Convert back to number for consistency with existing code
    }

    /**
     * Convert any base (2-36) to decimal using BigInt for large numbers
     */
    anyBaseToDecimal(input, base) {
        const normalizedInput = input.toUpperCase();
        const parts = normalizedInput.split('.');
        
        // Handle integer part with BigInt for large numbers
        const integerDigits = parts[0];
        let integerPart = BigInt(0);
        const baseBig = BigInt(base);
        
        for (let i = 0; i < integerDigits.length; i++) {
            const digit = BigInt(this.charToDigit(integerDigits[i]));
            const power = BigInt(integerDigits.length - 1 - i);
            integerPart += digit * (baseBig ** power);
        }

        // Handle fractional part with regular numbers for precision
        let fractionalPart = 0;
        if (parts.length === 2) {
            const fractionalDigits = parts[1];
            for (let i = 0; i < fractionalDigits.length; i++) {
                const digit = this.charToDigit(fractionalDigits[i]);
                const power = -(i + 1);
                fractionalPart += digit * Math.pow(base, power);
            }
        }

        // Return object with both parts for proper handling
        return {
            integer: integerPart,
            fractional: fractionalPart,
            hasDecimal: parts.length === 2
        };
    }

    /**
     * Convert decimal to base 60 using BigInt for large numbers
     */
    decimalToBase60(decimalObj) {
        let integer;
        
        // Handle both old number format and new BigInt format
        if (typeof decimalObj === 'object' && decimalObj.integer !== undefined) {
            integer = decimalObj.integer;
            if (decimalObj.hasDecimal) {
                throw new Error('Base 60 conversion only supports integers');
            }
        } else {
            // Legacy support
            integer = BigInt(Math.floor(decimalObj));
            if (integer !== BigInt(decimalObj)) {
                throw new Error('Base 60 conversion only supports integers');
            }
        }
        
        if (integer === BigInt(0)) return '0';
        
        if (integer < BigInt(0)) {
            throw new Error('Base 60 conversion only supports non-negative numbers');
        }

        const base = BigInt(60);
        const digits = [];
        let num = integer;

        while (num > BigInt(0)) {
            digits.unshift(Number(num % base));
            num = num / base;
        }

        return digits.join(',');
    }

    /**
     * Convert decimal to any base (2-36) using BigInt for large numbers
     */
    decimalToAnyBase(decimalObj, base) {
        let integerPart, fractionalPart, hasDecimal, isNegative = false;
        
        // Handle both old number format and new BigInt format
        if (typeof decimalObj === 'object' && decimalObj.integer !== undefined) {
            integerPart = decimalObj.integer;
            fractionalPart = decimalObj.fractional;
            hasDecimal = decimalObj.hasDecimal;
        } else {
            // Legacy support
            isNegative = decimalObj < 0;
            const absDecimal = Math.abs(decimalObj);
            integerPart = BigInt(Math.floor(absDecimal));
            fractionalPart = absDecimal - Math.floor(absDecimal);
            hasDecimal = fractionalPart > 0;
        }
        
        if (integerPart === BigInt(0) && (!hasDecimal || fractionalPart === 0)) {
            return '0';
        }

        let result;
        const baseBig = BigInt(base);

        // Convert integer part using BigInt
        if (integerPart === BigInt(0)) {
            result = '0';
        } else {
            let num = integerPart;
            const digits = [];
            while (num > BigInt(0)) {
                digits.unshift(this.digitToChar(Number(num % baseBig)));
                num = num / baseBig;
            }
            result = digits.join('');
        }

        // Convert fractional part
        if (hasDecimal && fractionalPart > 0) {
            result += '.';
            let frac = fractionalPart;
            let maxDigits = 10; // Limit precision to avoid infinite loops
            
            while (frac > 0 && maxDigits > 0) {
                frac *= base;
                const digit = Math.floor(frac);
                result += this.digitToChar(digit);
                frac -= digit;
                maxDigits--;
            }
            
            // Remove trailing zeros
            result = result.replace(/\.?0+$/, '');
        }

        return isNegative ? '-' + result : result;
    }

    /**
     * Convert character to digit value
     */
    charToDigit(char) {
        if (char >= '0' && char <= '9') {
            return char.charCodeAt(0) - '0'.charCodeAt(0);
        } else if (char >= 'A' && char <= 'Z') {
            return char.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
        }
        throw new Error(`Invalid character: ${char}`);
    }

    /**
     * Convert digit value to character
     */
    digitToChar(digit) {
        if (digit >= 0 && digit <= 9) {
            return String.fromCharCode('0'.charCodeAt(0) + digit);
        } else if (digit >= 10 && digit <= 35) {
            return String.fromCharCode('A'.charCodeAt(0) + digit - 10);
        }
        throw new Error(`Invalid digit: ${digit}`);
    }

    /**
     * Copy result to clipboard
     */
    async copyToClipboard() {
        const text = this.outputNumber.value;
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            this.showCopySuccess();
        } catch (error) {
            // Fallback for older browsers
            this.fallbackCopyToClipboard(text);
        }
    }

    /**
     * Fallback copy method for older browsers
     */
    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showCopySuccess();
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
        
        document.body.removeChild(textArea);
    }

    /**
     * Show copy success animation
     */
    showCopySuccess() {
        this.outputNumber.classList.add('copy-success');
        setTimeout(() => {
            this.outputNumber.classList.remove('copy-success');
        }, 500);
    }

    /**
     * Swap input and output bases
     */
    swapBases() {
        const inputBaseValue = this.inputBase.value;
        this.inputBase.value = this.outputBase.value;
        this.outputBase.value = inputBaseValue;
        
        // Also swap the numbers if there's a result
        if (this.outputNumber.value && this.inputNumber.value) {
            this.inputNumber.value = this.outputNumber.value;
        }
        
        this.updateHelperText();
        this.performConversion();
    }

    /**
     * Show error message
     */
    showError(type, message) {
        const errorElement = type === 'input' ? this.inputError : this.outputError;
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    /**
     * Clear all error messages
     */
    clearErrors() {
        this.inputError.classList.remove('show');
        this.outputError.classList.remove('show');
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NumberBaseConverter();
});

// Service Worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
