import { Vertical } from "./constants";
import { Utils } from "./utils";
import * as fs from "fs";
import * as yaml from "js-yaml";

export async function integrate(
  vertical: string,
  yaml: string,
  graphql: string,
  dataSources?: Array<string>,
  templates?: Array<string>
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    if (!Utils.isVerticalSupported(vertical)) {
      console.error(`${vertical} vertical is not supported`);
      reject();
    }

    if (!Utils.fileExits(yaml)) {
      console.error(`YAML file ${yaml} does not exist.`);
      reject();
    }

    if (!Utils.fileExits(graphql)) {
      console.error(`GraphQL file ${graphql} does not exist.`);
      reject();
    }

    writeSubgraphYaml(vertical as Vertical, yaml, dataSources, templates)
      .then(() => {
        writeSubgraphGraphql(vertical as Vertical, graphql)
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject();
          });
      })
      .catch(() => {
        reject();
      });
  });
}

async function writeSubgraphYaml(
  vertical: Vertical,
  subgraphYamlPath: string,
  dataSource?: Array<string>,
  templates?: Array<string>
): Promise<void> {
  return new Promise((resolve, reject) => {
    console.log("writeSubgraphYaml called: ", {
      vertical,
      subgraphYamlPath,
      dataSource,
      templates,
    });
    const airstackYaml = Utils.getAirstackYamlForVertical(vertical);
    console.log("airstackYaml: ", airstackYaml);

    const sourceSchemas = fs.readFileSync(subgraphYamlPath, "utf8");
    if (sourceSchemas.includes("--Airstack Schemas--")) {
      return resolve();
    }
    const sourceSubgraphYaml = yaml.load(sourceSchemas) as Record<string, any>;

    let whiteListedDataSource = dataSource;
    if (!whiteListedDataSource) {
      whiteListedDataSource = sourceSubgraphYaml.dataSources.map(
        (dSrc: Record<string, any>) => dSrc.name
      );
    }

    let whiteListedTemplates = templates;
    if (!whiteListedTemplates) {
      whiteListedTemplates = sourceSubgraphYaml.templates.map(
        (dSrc: Record<string, any>) => dSrc.name
      );
    }

    const targetSubgraphYaml = { ...sourceSubgraphYaml };
    const targetDataSources = targetSubgraphYaml.dataSources;
    targetDataSources.forEach((dataSrc: Record<string, any>) => {
      if (whiteListedDataSource!.includes(dataSrc.name)) {
        const existingEntities = [...dataSrc.mapping.entities];
        airstackYaml!.entities.forEach((airEntity: string) => {
          if (!existingEntities.includes(airEntity)) {
            dataSrc.mapping.entities.push(airEntity);
          }
        });
      }
    });

    if (targetSubgraphYaml.templates) {
      const targetTemplates = targetSubgraphYaml.templates;
      targetTemplates.forEach((dataSrc: Record<string, any>) => {
        if (whiteListedTemplates!.includes(dataSrc.name)) {
          const existingEntities = [...dataSrc.mapping.entities];
          airstackYaml!.entities.forEach((airEntity: string) => {
            if (!existingEntities.includes(airEntity)) {
              dataSrc.mapping.entities.push(airEntity);
            }
          });
        }
      });
    }

    Utils.backupFiles(subgraphYamlPath).then((isBackupSuccess: boolean) => {
      if (isBackupSuccess) {
        Utils.createFile(
          subgraphYamlPath,
          yaml.dump(targetSubgraphYaml, { lineWidth: -1 })
        ).then((isWriteSuccess: boolean) => {
          if (isWriteSuccess) {
            resolve();
          } else {
            reject();
          }
        });
      } else {
        reject();
      }
    });
  });
}

function writeSubgraphGraphql(
  vertical: Vertical,
  schemaGraphqlPath: string
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const isBackupSuccess = await Utils.backupFiles(schemaGraphqlPath);
    console.log("isBackupSuccess: ", isBackupSuccess);
    if (!isBackupSuccess) {
      reject();
    }

    const schemas = Utils.getAirstackSchemasForVertical(vertical);
    console.log({ schemas });
    const isAppendSuccess = await Utils.appendFiles(schemaGraphqlPath, schemas);
    if (!isAppendSuccess) {
      reject();
    }
    resolve();
  });
}
