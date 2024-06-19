const inquirer = require('inquirer');
const fs = require('fs');
const { Circle, Triangle, Square } = require('./lib/shapes');

const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters for the logo text:',
    validate: input => input.length <= 3 || 'Text must be up to three characters.'
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color (keyword or hexadecimal):'
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape:',
    choices: ['Circle', 'Triangle', 'Square']
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color (keyword or hexadecimal):'
  }
];

function generateSVG({ text, textColor, shape, shapeColor }) {
  let shapeElement;
  switch (shape) {
    case 'Circle':
      shapeElement = new Circle();
      break;
    case 'Triangle':
      shapeElement = new Triangle();
      break;
    case 'Square':
      shapeElement = new Square();
      break;
  }

  shapeElement.setColor(shapeColor);

  return `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
  ${shapeElement.render()}
  <text x="150" y="125" font-size="60" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>
  `;
}

inquirer.prompt(questions).then(answers => {
  const svgContent = generateSVG(answers);
  fs.writeFileSync('logo.svg', svgContent);
  console.log('Generated logo.svg');
});
