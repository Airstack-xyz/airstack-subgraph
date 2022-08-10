import {
  DEFAULT_SUBGRAPH_SCHEMA_PATH,
  DEFAULT_SUBGRAPH_YAML_PATH,
  Vertical,
} from './constants';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import {getSchemasForVertical, getSubgraphYamlForVertical} from './utils';
import {string} from 'yargs';

export function integrate(
  vertical: Vertical,
  subgraphYamlPath: string = DEFAULT_SUBGRAPH_YAML_PATH,
  schemaGraphqlPath: string = DEFAULT_SUBGRAPH_SCHEMA_PATH,
  dataSource: Array<string>
): void {
  console.log('Received: ', {
    vertical,
    subgraphYamlPath,
    dataSource,
    schemaGraphqlPath,
  });

  try {
    writeSubgraphYaml(vertical, subgraphYamlPath, dataSource);
  } catch (err) {
    console.error('Error while reading the file: ', err);
  }
}

function writeSubgraphYaml(
  vertical: Vertical,
  subgraphYamlPath: string,
  dataSource: Array<string>
) {
  const airstackYaml = getSubgraphYamlForVertical(vertical);
  // console.log('airstackYaml: ', airstackYaml.dataSources[0].mapping);

  const sourceSubgraphYaml = yaml.load(
    fs.readFileSync(subgraphYamlPath, 'utf8')
  ) as Record<string, any>;

  let whiteListedDataSource = dataSource;
  if (!whiteListedDataSource) {
    whiteListedDataSource = sourceSubgraphYaml.dataSources.map(
      (dSrc: Record<string, any>) => dSrc.name
    );
    const whiteListedTemplates = sourceSubgraphYaml.templates.map(
      (dSrc: Record<string, any>) => dSrc.name
    );
    whiteListedDataSource = [...whiteListedDataSource, ...whiteListedTemplates];
  }

  const targetSubgraphYaml = {...sourceSubgraphYaml};

  const targetDataSources = targetSubgraphYaml.dataSources;
  targetDataSources.forEach((dataSrc: Record<string, any>) => {
    if (whiteListedDataSource.includes(dataSrc.name)) {
      const existingEntities = [...dataSrc.mapping.entities];
      airstackYaml.dataSources[0].mapping.entities.forEach(
        (airEntity: string) => {
          if (!existingEntities.includes(airEntity)) {
            dataSrc.mapping.entities.push(airEntity);
          }
        }
      );
    }
  });

  const targetTemplates = targetSubgraphYaml.templates;
  targetTemplates.forEach((dataSrc: Record<string, any>) => {
    if (whiteListedDataSource.includes(dataSrc.name)) {
      const existingEntities = [...dataSrc.mapping.entities];
      airstackYaml.dataSources[0].mapping.entities.forEach(
        (airEntity: string) => {
          if (!existingEntities.includes(airEntity)) {
            dataSrc.mapping.entities.push(airEntity);
          }
        }
      );
    }
  });

  fs.writeFile(
    `${subgraphYamlPath}.bck`,
    yaml.dump(sourceSubgraphYaml, {lineWidth: -1}),
    err => {
      if (err) {
        console.log(err);
      }
    }
  );

  fs.writeFile(
    subgraphYamlPath,
    yaml.dump(targetSubgraphYaml, {lineWidth: -1}),
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

function writeSubgraphGraphql() {}
