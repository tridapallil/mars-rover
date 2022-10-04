# Resume project
Mars Rover in JavaScript
A squad of robotic rovers are to be landed by NASA on a plateau on Mars.
This plateau, which is curiously rectangular, must be navigated by the rovers so that their on-board cameras can get a complete view of the surrounding terrain to send back to Earth.
A rover’s position and location is represented by a combination of x and y co-ordinates and a letter representing one of the four cardinal compass points. The plateau is divided up into a grid to simplify navigation. An example position might be 0, 0, N, which means the rover is in the bottom left corner and facing North.
In order to control a rover , NASA sends a simple string of letters. The possible letters are ‘L’, ‘R’ and ‘M’. ‘L’ and ‘R’ makes the rover spin 90 degrees left or right respectively, without moving from its current spot. ‘M’ means move forward one grid point, and maintain the same heading.
Assume that the square directly North from (x, y) is (x, y 1).

# Solution and Techs
To solve this problem, was develop a structure and code thinking on clean code, using little methods to do little things and make easier to test and read.

It was used some techs to be easier to develop and use. One example is to use csv file to input the data (easier than input data on console).

- **[EsLint](https://www.npmjs.com/package/eslint)**

- **[Jest](https://jestjs.io/)**

# About the program

The program accepts as many rovers you want to input. 
If its a valid input, will return the rover position, if no, will return an error message to help to fix the input.
All the output is printed at the console, this way:
```
[
  {
    referenceRover: '1 2 N',
    instructions: 'LMLMLMLMM',
    result: { x: 1, y: 3, heading: 'N' }
  },
  {
    referenceRover: '3 3 E',
    instructions: 'MRRMMRMRRM',
    result: { x: 2, y: 3, heading: 'S' }
  },
  {
    referenceRover: '3 3 E',
    instructions: 'MRRMMRMRRZ',
    result: 'Invalid instruction'
  }
]
```

To run the project, you just need to:

1 - clone the project

2 - run: ```yarn``` or ```npm i```

3 - run: ```yarn start``` or ```npm run start```

4 - To run tests: ```yarn test``` or ```npm run test```

There is a file called rovers.csv, which is the file where have all the input data. The scructure is very simple. There are 3 columns.
The first line is the header, and the second will always be used to get the plateau information (x y), the rest of the lines will always be the rovers.
You can edit with any input you want, following the example structure below:

```
coordinates;instructions;plateau
;;4 5
1 2 N;LMLMLMLMM
```

In the fist line, after the header, you need to put the value from plateau, respecting: {number number}
The rest of the lines, you need to respect this structure:

* First column: {number number character} (coordinates from rover)

* Second column: {character} (instruction)




