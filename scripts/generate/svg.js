const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) =>
  path.resolve(appDirectory, 'src', relativePath);

const paths = {
  appFileOutput: 'assets/icons/index.jsx',
  appFiles: 'assets/icons',
};

function kebabToTitle(string) {
  return string
    .split('-')
    .map((word) => {
      return word.slice(0, 1).toUpperCase() + word.slice(1);
    })
    .join('');
}

function generateName(file, existListName) {
  const fileName = 'Icon' + kebabToTitle(file.replace('.svg', ''));
  if (!existListName.includes(fileName)) {
    return fileName;
  }
  let i = 1;
  while (existListName.includes(fileName + i)) {
    i++;
  }
  return fileName + i;
}

function readExistFile(paths) {
  let icons = { name: [], path: [], data: '' };
  if (fs.existsSync(paths)) {
    icons.data = fs.readFileSync(paths, 'utf8');
    const dataFilter = icons.data
      .replace(/(?:\r\n|\r|\n)/g, '')
      .split(';')
      .filter(Boolean);
    dataFilter.forEach((item) => {
      const key = item.match(/(?<=as\s)(.*)(?=\s})/g);
      const path = item.match(/(?<=from\s')(.*)(?=')/g);
      key && icons.name.push(...key);
      path && icons.path.push(...path.map((item) => resolveApp(item)));
    });
  }
  return icons;
}

module.exports.svg = function writeFileSVGIcon() {
  const {
    name: existName,
    path: existPath,
    data,
  } = readExistFile(resolveApp(paths.appFileOutput));
  console.log(existName, existPath, data);
  fs.readdir(resolveApp(paths.appFiles), (err, files) => {
    let output = data;
    files.forEach((file) => {
      const convert = generateName(file, existName);

      const fullPath = path.join(resolveApp(paths.appFiles), file);
      if (path.extname(file) === '.svg' && !existPath.includes(fullPath)) {
        const shortPath = fullPath
          .replace(path.resolve(appDirectory, 'src'), '')
          .replace(/\\/g, '/')
          .slice(1);
        output += `export { ReactComponent as ${convert} } from "${shortPath}";`;
      }
    });
    fs.writeFile(resolveApp(paths.appFileOutput), output, (err) => {
      if (err) throw err;
      exec(`npx prettier -w "src/${paths.appFileOutput}"`);
      console.log('Build SVG Icon Success');
    });
  });
};
