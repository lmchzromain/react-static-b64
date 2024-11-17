require("@babel/register")({
  extensions: [".js", ".jsx"],
});

const fs = require("fs");
const ReactDOMServer = require("react-dom/server");
const { App } = require("./src/scripts/App");

const fileName = "index.b64.txt";

const content = ReactDOMServer.renderToStaticMarkup(App());
const css = fs.readFileSync("./dist/styles.css", "utf8");

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hello world</title>
  <style>
    ${css}
  </style>
</head>
<body>
  ${content}
</body>
</html>
`;

fs.writeFile(
  `./dist/${fileName}`,
  `data:text/html;base64,${btoa(html)}`,
  (err) => {
    if (err) {
      console.error("Error writing to the file:", err);
    } else {
      // eslint-disable-next-line no-console
      console.log(`The file '${fileName}' has been successfully created !`);
    }
  }
);
