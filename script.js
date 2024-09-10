//Linear congruential generator

function lcg(seed, a, c, m) {
    return (a * seed + c) % m;
}

function generateRandomColor(seedValues) {
    const r = lcg(seedValues[0], ...seedValues.slice(1, 4)) % 256;
    const g = lcg(r, ...seedValues.slice(1, 4)) % 256;
    const b = lcg(g, ...seedValues.slice(1, 4)) % 256;

    return `rgb(${r},${g},${b})`;
}

function drawRandomLine(canvas, ctx, seedValues) {
    const x1 = lcg(seedValues[0], ...seedValues.slice(1, 4)) % canvas.width;
    const y1 = lcg(lcg(seedValues[0], ...seedValues.slice(1, 4)), ...seedValues.slice(1, 4)) % canvas.height;
    const x2 = lcg(y1, ...seedValues.slice(1, 4)) % canvas.width;
    const y2 = lcg(lcg(y1, ...seedValues.slice(1, 4)), ...seedValues.slice(1, 4)) % canvas.height;
    const color = generateRandomColor([y2, ...seedValues.slice(1, 4)]);

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.stroke();
}

function generateRandomLines(seed, a, c, m, numberOfLines) {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    for (let i = 0; i < numberOfLines; i++) {
        drawRandomLine(canvas, ctx, [seed, a, c, m]);
        seed = lcg(seed, a, c, m);
    }
}

// Exemplo de uso:
generateRandomLines(12345, 1664525, 1013904223, Math.pow(2, 32), 1024);
Math.rand