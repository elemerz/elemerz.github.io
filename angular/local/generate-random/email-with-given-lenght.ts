// Generates INSECURE random string, do not use for tokens etc.
export function generateRandomString(length: number = 10): string {
    const x = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({length}, () => x[Math.floor(Math.random() * x.length)]).join('');
}

// Generates random email with certain length.
// tld is always .com and local part has always length 1
// if length < 254, output is compliant with RFC 5321
// if length < 7, output will always be 'a@a.com'
export function generateRandomEmail(length: number = 7): string {
    // smallest email |a@a.com| == 7
    if (length < 7) {
        return 'a@a.com';
    }

    let localPart = generateRandomString(1) + '@'; // local part == everything before '@' symbol max length of local part is 63 chars
    let domain = 'com';                     // always using .com

    while (domain.length + localPart.length < length) { // generate subdomains
        domain = generateRandomString(63) + '.' + domain;   // max length of each domain label is 63 chars
    }

    const overflow = domain.length + localPart.length - length;
    domain = domain.substring(overflow);      // cut to get desired length

    if (domain.charAt(0) === '.') {      // if first character of domain is a dot, exchange it
        domain = generateRandomString(1) + domain.substring(1);
    }
    return localPart + domain;
}
