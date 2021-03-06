const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const CONSTANTS = {
  pathComponent: resolveApp('src/components'),
  pathContainer: resolveApp('src/containers'),
  pathComponentTemplate: resolveApp('scripts/generate/templates/component'),
  pathContainerTemplate: resolveApp('scripts/generate/templates/container'),
  templateExtension: '.temp',
};

const componentsDirPath = CONSTANTS.pathComponent;
const containerDirPath = CONSTANTS.pathContainer;

const templateComponentPath = CONSTANTS.pathComponentTemplate;
const templateContainerPath = CONSTANTS.pathContainerTemplate;

const templateExtension = CONSTANTS.templateExtension;

/**
 * G
 * @param {string} componentType
 * @param {string} componentName
 */
module.exports.g = function g(componentType, componentName) {
  if (!componentName || componentName == '') {
    console.log(`
        [componentName] must not empty.
        `);
  }
  switch (componentType) {
    case 'component':
      component(componentName);
      break;

    case 'container':
      container(componentName);
      break;

    default:
      console.log(`
            [component | container]
            `);
      break;
  }
  console.log(
    `${componentType} with name ${componentName} was created successfull!`
  );
};

/**
 *
 * @param {string} path
 * @returns {string[]}
 */
function getAllTemplate(path) {
  const templates = [];
  const dirContents = fs.readdirSync(path, {
    withFileTypes: true,
  });
  for (const item of dirContents) {
    if (item.isFile()) {
      templates.push(`${path}/${item.name}`);
    } else if (item.isDirectory()) {
      templates.push(...getAllTemplate(`${path}/${item.name}`));
    }
  }
  return templates;
}
/**
 *
 * @param {string} componentName
 */
function component(componentName) {
  const dir = `${componentsDirPath}/${componentName}`;
  fs.mkdirSync(dir, {
    recursive: true,
    mode: 0o777,
  });
  const allTempaltes = getAllTemplate(templateComponentPath);
  for (const template of allTempaltes) {
    const newPath = template.replace(templateComponentPath, dir);
    fs.mkdirSync(newPath.substring(0, newPath.lastIndexOf('/')), {
      recursive: true,
      mode: 0o777,
    });
    let content = fs.readFileSync(template, {
      encoding: 'utf8',
    });
    content = content
      .replace(/(__Component__)/g, componentName.replace(/ /g, ''))
      .replace(
        /(__TestId__)/g,
        componentName
          .trim()
          .replace(/([A-Z])|(\s)/g, (match, p1, p2, offset) => {
            if (p2 === ' ') match = '';
            return (offset > 0 && match ? '-' : '') + match.toLowerCase();
          })
      );
    fs.writeFileSync(newPath.replace(templateExtension, ''), content, {
      mode: 0o777,
      encoding: 'utf8',
    });
  }
}
/**
 *
 * @param {string} containerName
 */
function container(containerName) {
  const dir = `${containerDirPath}/${containerName}`;
  fs.mkdirSync(dir, {
    recursive: true,
    mode: 0o777,
  });
  const allTempaltes = getAllTemplate(templateContainerPath);
  for (const template of allTempaltes) {
    const newPath = template.replace(templateContainerPath, dir);
    fs.mkdirSync(newPath.substring(0, newPath.lastIndexOf('/')), {
      recursive: true,
      mode: 0o777,
    });
    let content = fs.readFileSync(template, {
      encoding: 'utf8',
    });
    content = content
      .replace(/(__Component__)/g, containerName.replace(/ /g, ''))
      .replace(
        /(__COMPONENT__)/g,
        containerName.replace(/ /g, '').toUpperCase()
      );
    fs.writeFileSync(newPath.replace(templateExtension, ''), content, {
      mode: 0o777,
      encoding: 'utf8',
    });
  }
  exec(`npx prettier -w ${dir}`);
}
