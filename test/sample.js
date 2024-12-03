import awesome from "./awesome";

// Sample comment
let numbers = [1, 2, 3, 4, 5];
const user = {
  name: "Alice",
  regex: /hello/gi,
  other: null,
};

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    console.log(`${numbers[i]} is even`);
  }
}

function greet(name, show) {
  if (show === true && name !== undefined) {
    return `${user.name} & ${name} are awesome!`;
  }
}

const getDate = () => {
  return new Date();
};

export { greet, getDate, awesome };
