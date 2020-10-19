import * as YAML from 'yaml'
import * as faker from 'faker';

const types = ['red', 'rose', 'white', 'sparkling'];

function aType() {
    return types[Math.floor(Math.random() * types.length)];
}

function aWine() {
    return {
        name: faker.commerce.productName(),
        winery: faker.company.companyName(),
        type: aType(),
        grape: faker.commerce.productName(),
    };
}

const wines = [];
for (let i = 0; i < 200; i++) {
    wines.push(aWine());
}
const result = {wines: wines};
console.log(YAML.stringify(result));



