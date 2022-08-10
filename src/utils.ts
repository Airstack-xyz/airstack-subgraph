import {SupportedVerticals, Vertical} from './constants';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

export function isVerticalSupported(verticalName: Vertical): boolean {
  return SupportedVerticals.includes(verticalName);
}

export function getAbisForVertical(verticalName: Vertical) {
  if (!isVerticalSupported(verticalName)) {
    throw new Error(`Unsupported vertical ${verticalName}`);
  }
}

export function getSchemasForVertical(verticalName: Vertical) {
  if (!isVerticalSupported(verticalName)) {
    throw new Error(`Unsupported vertical ${verticalName}`);
  }
  const {schemaFilePath} = getFileNamesForVertical(verticalName);
  console.log('schemaFilePath: ', schemaFilePath);
  try {
    // const targetSubraphYaml = yaml.load(
    //   fs.readFileSync("subgraphYamlPath", 'utf8')
    // );
    // console.log('targetSubraphYaml: ', targetSubraphYaml);
    // const targetSubgraphGraphql = yaml.load(
    //   fs.readFileSync(schemaGraphqlPath, 'utf8')
    // );
    // console.log('targetSubraphYaml: ', targetSubgraphGraphql);
  } catch (err) {
    console.error('Error while reading the file: ', err);
  }
}

export function getSubgraphYamlForVertical(
  verticalName: Vertical
): Record<string, any> {
  if (!isVerticalSupported(verticalName)) {
    throw new Error(`Unsupported vertical ${verticalName}`);
  }
  const {yamlFilePath} = getFileNamesForVertical(verticalName);
  console.log('yamlFilePath: ', yamlFilePath);
  let yamlFileContent: Record<string, any> = {};
  try {
    yamlFileContent = yaml.load(
      fs.readFileSync(yamlFilePath, 'utf8')
    ) as Record<string, any>;
  } catch (err) {
    console.error('Error while reading the file: ', err);
  }
  return yamlFileContent;
}

export function getFileNamesForVertical(
  verticalName: Vertical
): Record<string, string> {
  if (!isVerticalSupported(verticalName)) {
    throw new Error(`Unsupported vertical ${verticalName}`);
  }

  const currentDirectory = process.cwd();
  const schemaFilePath = `${currentDirectory}/graphql/${verticalName}.graphql`;
  const yamlFilePath = `${currentDirectory}/yaml/${verticalName}.yaml`;

  return {schemaFilePath, yamlFilePath};
}
