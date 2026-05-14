#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// ANSI escape codes for colors
const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    dim: "\x1b[2m",
    bold: "\x1b[1m"
};

const jsonPath = path.join(__dirname, 'data', 'quotes.json');

fs.readFile(jsonPath, 'utf8', (err, data) => {
    if (err) {
        console.error(`${colors.red}Hata: quotes.json bulunamadı. Lütfen komutu proje kök dizininde çalıştırın.${colors.reset}`);
        process.exit(1);
    }

    try {
        const parsed = JSON.parse(data);
        const modules = parsed.modules;
        
        // Rastgele bir modül seç
        const randomModule = modules[Math.floor(Math.random() * modules.length)];
        
        // Modülden rastgele bir söz seç
        const randomQuote = randomModule.quotes[Math.floor(Math.random() * randomModule.quotes.length)];

        console.log(`\n${colors.cyan}${colors.bold}🌑 GÖLGE HAKİKATLER${colors.reset}\n`);
        console.log(`${colors.dim}Kategori: ${randomModule.name}${colors.reset}\n`);
        
        console.log(`${colors.white}"${randomQuote.quote}"${colors.reset}`);
        console.log(`${colors.dim}— ${randomQuote.source}${colors.reset}\n`);
        
        console.log(`${colors.red}${colors.bold}Gölge Hakikat:${colors.reset}`);
        console.log(`${colors.white}${randomQuote.shadowTruth}${colors.reset}\n`);
        
    } catch (e) {
        console.error(`${colors.red}Hata: JSON verisi ayrıştırılamadı.${colors.reset}`);
    }
});
