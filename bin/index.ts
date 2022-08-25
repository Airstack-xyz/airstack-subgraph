#! /usr/bin/env node

import { integrate } from "../src/integrate";

const args = process.argv.slice(2);
console.log("arguments: ", args);

if (args.length == 0) {
  console.error("Please enter at least the vertical type");
  process.exit(1); //an error occurred
}

const vertical: string = args[0];
let graphql: string = "./schema.graphql";
let yaml: string = "./subgraph.yaml";
let dataSources: Array<string> | undefined = undefined;
let templates: Array<string> | undefined = undefined;

const START_INDEX = 1;
for (let index = START_INDEX; index < args.length; index++) {
  const paramString = args[index];
  if (paramString.toLowerCase() === "--yaml") {
    if (args.length - START_INDEX < index + 1) {
      console.error("Please enter yaml file path");
      process.exit(1);
    }
    const val = args[index + 1];
    if (val.startsWith("--")) {
      console.error("Invalid value for --yaml");
      process.exit(1);
    }
    yaml = val;
  } else if (paramString.toLowerCase() === "--graphql") {
    if (args.length - START_INDEX < index + 1) {
      console.error("Please enter yaml file path");
      process.exit(1);
    }
    const val = args[index + 1];
    if (val.startsWith("--")) {
      console.error("Invalid value for --graphql");
      process.exit(1);
    }
    graphql = val;
  } else if (paramString.toLowerCase() === "--datasourcenames") {
    if (args.length - START_INDEX < index + 1) {
      console.error("Please enter dataSource value");
      process.exit(1);
    }
    const val = args[index + 1];
    if (val.startsWith("--")) {
      console.error("Invalid value for --dataSourceNames");
      process.exit(1);
    }
    dataSources = val.split(",");
  } else if (paramString.toLowerCase() === "--templates") {
    if (args.length - START_INDEX < index + 1) {
      console.error("Please enter template value");
      process.exit(1);
    }
    const val = args[index + 1];
    if (val.startsWith("--")) {
      console.error("Invalid value for --templates");
      process.exit(1);
    }
    templates = val.split(",");
  }
}

integrate(vertical, yaml, graphql, dataSources, templates)
  .then(() => {
    process.exit(0); //no errors occurred
  })
  .catch(() => {
    process.exit(1);
  });