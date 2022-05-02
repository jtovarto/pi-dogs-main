const validators = {
  isString: (data, name) => typeof data[name] === "string",

  isNumber: (data, name) => !isNaN(data[name]),

  isBetween: (data, name, compare) => {
    const [min, max] = compare.split(",");
    return +data[name] >= +min && +data[name] <= +max;
  },

  isLessThan: (data, name, compare) => {
    const value = isNaN(data[name]) ? data[name].length : +data[name];
    const comp = isNaN(compare) ? +data[compare] : +compare;
    return value < comp;
  },

  isGreaterThan: (data, name, compare) => {
    const value = isNaN(data[name]) ? data[name].length : +data[name];
    const comp = isNaN(compare) ? +data[compare] : +compare;
    return value > comp;
  },

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
    const field_name = name.split('_').join(' ');
    return `${field_name} must be between ${min} and ${max}`;
  },
  isLessThan: (name, compare) => {
    if (isNaN(compare)) {
      const [desc, property] = compare.split("_");
      const field_name = name.split('_').join(' ');
      return `${field_name} must be less than ${desc} ${property}`;
    }
    return `${name} must be less than ${compare}`;
  },
  isGreaterThan: (name, compare) => {
    if (isNaN(compare)) {
      const [desc, property] = compare.split("_");
      const field_name = name.split('_').join(' ');
      return `${field_name} must be greater than ${desc} ${property}`;
    }
    return `${name} must be greater than ${compare}`;
  },
  isImage: (name) => `${name} must be a valid url image`,
  isRequired: (name) => `${name} is required`,
  isArray: (name) => `${name} must be an array`,
};

export const validate = function (inputs, rules, callback) {
  let errors = {};
  for (const property in inputs) {
    const rulesArray = rules[property].split("|");

    for (const ruleString of rulesArray) {
      const [rule, compare] = ruleString.split(":");
      const validated = validators[rule](inputs, property, compare);
      if (!validated) {
        const message = messages[rule](property, compare);
        if (!errors[property]?.length) errors[property] = [];
        errors[property].push(message);
      }
    }
  }

  callback(errors);
  return Object.keys(errors).length === 0;
};
