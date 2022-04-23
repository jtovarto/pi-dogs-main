const validators = {
  
    isString: (data, name) => typeof data[name] === "string",

  isNumber: (data, name) => !isNaN(data[name]),
  
  isBetween: (data, name, compare) => {
    const [min, max] = compare.split(",");
    return data[name] > min && data[name] < max;
  },
  
  isLessThan: (data, name, compare) => data[name] < data[compare],
  
  isGreaterThan: (data, name, compare) => data[name] > data[compare],
  
  isImage: (data, name) => /(https?:\/\/.*\.(?:png|jpg|gif))/.test(data[name]),
  
  isRequired: (data, name) =>
    data[name] !== undefined &&
    data[name] !== null &&
    data[name] !== [] &&
    data[name] !== {} &&
    data[name] !== "",
  
    isArray: (data, name) => Array.isArray(data[name]),
};

const messages = {
  isString: (name) => `${name} must be string`,
  isNumber: (name) => `${name} must be a number`,
  isBetween: (name, compare) => {
    const [min, max] = compare.split(",");
    return `${name} must be between ${min} and ${max}`;
  },
  isLessThan: (name, compare) => {
    const [desc, property] = compare.split("_");
    return `${name} must be less than ${desc} ${property}`;
  },
  isGreaterThan: (name, compare) => {
    const [desc, property] = compare.split("_");
    return `${name} must be greater than ${desc} ${property}`;
  },
  isImage: (name) => `${name} must be a valid url image`,
  isRequired: (name) => `${name} is required`,
  isArray: (name) => `${name} must be an array`,
};

export const validate = function (inputs, rules, callback) {
  for (const property in inputs) {

    const rulesArray = rules[property].split("|");

    for (const ruleString of rulesArray) {
      
        const [rule, compare] = ruleString.split(":");

      if (!validators[rule](inputs, property, compare)) {
        console.log(messages[rule](property, compare));
      }
    }
  }
};
