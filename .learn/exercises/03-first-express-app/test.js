const fs = require('fs');
const path = require('path');
const rewire = require('rewire');

test('app.js file should exist in your root directory', () => {
    let fileExists = false;

    if(fs.existsSync(path.resolve('./app.js'))){
        fileExists = true;
    }

    expect(fileExists).toBeTruthy();
})

test('express dependency should be required', () => {
    const file = fs.readFileSync(path.resolve('./app.js'), 'utf8');

    const regex = /(let|const)\s*express\s*=\s*require\s*\(\s*'express'\s*\)/gm

    expect(regex.test(file.toString())).toBeTruthy();
})

test('should should initialize your express app', () => {
    const file = fs.readFileSync(path.resolve('./app.js'), 'utf8');

    const regex = /(let|const)\s*app\s*=\s*express\s*\(\s*\)/gm

    expect(regex.test(file.toString())).toBeTruthy();
})

test('your app should be using express.json()', () => {
    const file = fs.readFileSync(path.resolve('./app.js'), 'utf8');

    const regex = /app\.use\s*\(\s*express\.json\s*\(\s*\)\s*\)/gm

    expect(regex.test(file.toString())).toBeTruthy();
})

test('your server should be opening with port 8080', () => {
    const file = rewire(path.resolve('./app.js'))

    expect(app.listen).toHaveBeenCalledWith(8080)
})
