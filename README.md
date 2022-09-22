# Airstack Subgraphs

**Every day there are millions of blockchain transactions.**
**Airstack makes sense of them.**

[Here](https://app.airstack.xyz/) is a live example of how the Airstack entities are consumed.

## Introduction

Airstack is developing a Protocols and APIs for browsing, discovering, and consuming on-chain data across projects and across blockchains. Our motivation for creating Airstack is to enable common ways to organize blockchain data and make it universally consumable.

This is a large and important problem to solve. On Ethereum based chains (EVMs) alone there are already more than 10 million daily transactions happening across thousands of protocols and dapps. Today those transactions exist in silos; there are no easy ways to query across projects and blockchains — to map relationship and behaviors, discover trends at the event level, and analyze product utility.

Airstack is building the tooling now to enable a decentralized web3 data network that will enable easy querying of data across projects and blockchains.

To do so, Airstack is helping standardize blockchain data, aggregating it, mapping relationships, and providing protocols and APIs to access it.

## What are Airstack Schema?

Airstack schemas are standardized schemas to access the data across projects and blockchains.
These schemas are for eight initial verticals, and it is intended that any dapp/protocol within those verticals could be indexed consistently by utilizing the Airstack schemas for Subgraph.

The 8 verticals defined for Airstack schemas are:

1. NFT Marketplaces (E.g. OpenSea, Looksrare)
2. NFT Projects (E.g. ENS, POAP, Nouns, Moonbirds, Apes)
3. Swaps (e.g. Quickswap, Uniswap, Sushiswap)
4. Defi (e.g. Aave or Compound)
5. Bridges (e.g. Hop)
6. Games (e.g. Sandbox)
7. DAOs
8. Social (e.g. Farcaster and Lens)
9. Catch all for Other Dapps (we anticipate that this will soon be broken out into additional verticals, e.g. Music, Publishing, Social)

## Getting Started

### 1. Prerequisite:

You already have a subgraph for Dapp/Protocol. And you intend to integrate Airstack schemas into the project.

### 2. Identify the vertical for the Dapp/Protocol:

Currently, we support eight verticals. Identify your project's vertical

Use the following command to add Airstack Schemas and ABIs in your project's `subgraph.yaml`

```npm
npx airstack <verical>  --yaml <subgraph.yaml file path --dataSourceNames <name1, name2, ...>
```

`npx airstack <vertical>`
will add the required Airstack entities and the ABI files in your **subgraph.yaml** file

`--yaml <subgraph.yaml file path>`
provide the location of your project's **subgraph.yaml** file. This is an optional parameter.

`--dataSourceNames <name1, name2, ...>` provide the **dataSource** name where Airstack entities will be added. This is an optional parameter. By default, the entities will be added in all the **dataSource** provided in the **subgraph.yaml**.

Examples:

a. NFT Marketplace

```
npx airstack nft_marketplace
```

b. DEX

```
npx airstack dex --yaml "./subgraph.yaml" --dataSourceNames Factory, Pair
```

Following are the vertical Ids

NFT Marketplace: `nft_marketplace`<br/> NFT: `nft`Swap:`dex`<br/> Bridges: `bridge`<br/> DAO: `TBD`<br/> Defi: `TBD`<br/> Games: `TBD`<br/>

Integration of the Airstack schemas is done. Now, move to the vertical-specific section for further integration.

### 3. Code integration

#### a. NFT Marketplace

Track actions for NFT Marketplace.
Call the following functions from your subgraph mapping. An example implementation is [Here](https://github.com/Airstack-xyz).

1. NFT sale transactions

   ```ts
   function trackNFTSaleTransactions(
     txHash: string,
     fromArray: Address[],
     toArray: Address[],
     contractAddressArray: Address[],
     nftIdArray: BigInt[],
     paymentTokenAddress: Address,
     paymentAmount: BigInt,
     timestamp: BigInt
   ): void;
   ```

   **txHash**: Add details<br/>
   **fromArray**: Add details<br/>
   **toArray**: Add details<br/>
   **contractAddressArray**: Add details<br/>
   **nftIdArray**: Add details<br/>
   **paymentTokenAddress**: Add details<br/>
   **paymentAmount**: Add details<br/>
   **timestamp**: Add details<br/>

#### b. Swaps/DEX

Track actions for DEX Projects.
Call the following functions from your subgraph mapping. An example implementation is [Here](https://github.com/Airstack-xyz).

1. Creation of Pool

   ```ts
    dex.addDexPool(
      poolAddress: string,
      fee: BigInt,
      inputTokens: Array<string>,
      weights: Array<BigDecimal> | null = null,
      outputToken: string | null = null
    ): void;
   ```

   **poolAddress**: Dex pool address<br/>
   **fee**: Fee amount<br/>
   **inputTokens**: Array of address of tokens<br/>
   **weights**: Weightage of each input token<br/>
   **outputToken**: LP token address<br/>

2. Add Liquidity

   ```ts
   function addLiquidity(
     poolAddress: string,
     inputAmounts: Array<BigInt>,
     from: string,
     to: string,
     hash: string,
     logIndex: BigInt,
     timestamp: BigInt
   ): void;
   ```

   **poolAddress**: Dex pool address<br/>
   **inputAmounts**: Array of input token amounts<br/>
   **from**: From wallet address<br/>
   **to**: To wallet address<br/>
   **hash**: Transaction hash<br/>
   **logIndex**: Transaction log index<br/>
   **timestamp**: Transaction timestamp<br/>

3. Swap

   ```ts
   function swap(
     poolAddress: string,
     inputAmounts: Array<BigInt>,
     outputAmounts: Array<BigInt>,
     inputTokenIndex: i32,
     outputTokenIndex: i32,
     from: string,
     to: string,
     hash: string,
     logIndex: BigInt,
     timestamp: BigInt
   ): void;
   ```

   **poolAddress**: Dex pool address<br/>
   **inputAmounts**: Array of input amounts<br/>
   **outputAmounts**: Array of output amounts<br/>
   **inputTokenIndex**: Index of token in dex pool for input<br/>
   **outputTokenIndex**: Index of token in dex pool for output<br/>
   **from**: From wallet address<br/>
   **to**: To wallet address<br/>
   **hash**: Transaction hash<br/>
   **logIndex**: Transaction log index<br/>
   **timestamp**: Transaction timestamp<br/>

4. Remove Liquidity
   ```
     TBA
   ```

### 4. Development status of each vertical

⌛ = Prioritized<br/>
💬 = In discussion<br/>
🔨 = In progress implementation<br/>
✅ = Completed<br/>

| Verical         | Status |
| --------------- | :----: |
| NFT Marketplace |   🔨   |
| DEX             |   🔨   |
| Bridges         |   💬   |
| DAO             |   ⌛   |
| Defi            |   ⌛   |
| Games           |   ⌛   |
