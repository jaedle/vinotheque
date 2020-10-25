import * as YAML from 'yaml'
import * as faker from 'faker';
import {v4 as uuidv4} from 'uuid';


const types = ['red', 'rose', 'white', 'sparkling'];

const grapes = {
    red: ['Bordeaux', 'Burgundy', 'Cabernet Sauvignon', 'Chianti', 'Malbec', 'Rioja', 'Shiraz', 'Zinfandel', 'Pinot Noir'],
    rose: ['Burgundy', 'Merlot', 'Malbec', 'Zinfandel', 'Pinot Noir'],
    white: ['Chardonnay', 'Pinot Gris', 'Riesling', 'Zinfandel', 'Sauvignon Blanc'],
    sparkling: ['Pinot Gris', 'Riesling', 'Pinot Noir'],
}

function aType() {
    return types[Math.floor(Math.random() * types.length)];
}

let currentBottle = 1;

function bottles() {
    const result = [];

    const amount = Math.floor(Math.random() * 4) + 1;
    for (let i = 0; i < amount; i++) {
        result.push(currentBottle.toString());
        currentBottle++;
    }

    return result;
}

function aWine() {
    const type = aType();

    const possibleGrapes = grapes[type];
    const grape = possibleGrapes[Math.floor(Math.random() * possibleGrapes.length)];
    return {
        id: uuidv4(),
        name: faker.commerce.productName(),
        winery: faker.company.companyName(),
        type: type,
        grape: grape,
        year: faker.date.past(20).getFullYear(),
        bottles: bottles(),
    };
}

const wines = [];
for (let i = 0; i < 200; i++) {
    wines.push(aWine());
}
const result = {wines: wines};
console.log(YAML.stringify(result));



