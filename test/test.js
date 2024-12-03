import "../styles/css.css";
import { itemOne, itemTwo } from "./other-file.js";

/* Comment with a link https://example.com */
var temp = "b";
const regex = /^asdfd12341234.+(asdfasfd)(?=.asdf+[a-z])(?=.*[A-Z])(?=.?\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/gi;
const regex2 = /.+/gi;

// Comment
const SAMPLE_ITEMS = {
  one: "one",
  two: 123,
  three: null,
  four: [1, 2, 1234.56],
  five: /as([0-9a-z]{1,2}234\d).+?df/gi,
  six: {
    other: 1 + 2 / 5,
  },
  seven: `This ${temp} cool`,
  eight: (param1, param2) => {
    console.log(param1, param2);
    return null;
  },
  "nine +": undefined,
  regex: regex,
  'regex-2': regex2,
};

const doWork = (name, string) => {
  return `This ${name} is ${string}.`;
};

let Viewer = {
  fileDropHandler: async (e, items, options) => {
    if (e.defaultPrevented !== true) {
      e.preventDefault();
    }
    document.body.classList.remove(SAMPLE_ITEMS.one);

    SAMPLE_ITEMS.eight(this, null);
    console.log(items);

    if (e.dataTransfer.items) {
      for (const item of options.dataTransfer.items) {
        if (typeof item.kind === "string") {
          try {
            const file = item.getAsFile();
            let string = "";
            const fragment = await doWork(file, string);
          } catch (error) {
            console.error("Error:", error);
          }
        }
      }
    }
  },
};
