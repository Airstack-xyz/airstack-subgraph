export const DEFAULT_SUBGRAPH_YAML_PATH = './subgraph.yaml';
export const DEFAULT_SUBGRAPH_SCHEMA_PATH = './schema.graphql';

export enum Vertical {
  Dex = 'dex',
  NftMarketplace = 'nft-marketplace',
}
export const SupportedVerticals = [Vertical.Dex, Vertical.NftMarketplace];
