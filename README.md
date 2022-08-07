# Airstack Subgraphs

**Every day there are millions of blockchain transactions.**
**Airstack makes sense of them.**

[Here](https://app.airstack.xyz/) is a live example of how the Airstack entities are consumed.

## Introduction

**Abstract.** Airstack is a decentralized data network that makes blockchain activity easily discoverable, browsable, and consumable. Before Airstack, blockchain data was trapped in silos: A person might transact with a bunch of dapps, or interact with different protocols, or earn various currencies, or trade different tokens, or participate in various DAOs, or be a member of several NFT communities, and each of those transactions happen in isolation. Airstack brings those transactions together in virtual stacks of data. For example, with Airstack you can easily pinpoint that 5040 people all used a specific dapp today, that 807 of them used that dapp plus a specific DeFi protocol, 257 of them are members of investment DAOs, and that 53 of them are also attending the upcoming ETH.cc conference.

This data is incredibly valuable to developers, traders, investors, marketers, and for various types of business development. The Airstack Data Privacy Protocol (ADPP) provides for access to this data while empowering consumers to securely lock, control and monetize it. ADPP also provides a method for ensuring that no 3rd party, including Airstack, can de-anonymize user data without their permission.

## What is Airstack Schema?

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

   **poolAddress**: Add details<br/>
   **fee**: Add details<br/>
   **inputTokens**: Add details<br/>
   **weights**: Add details<br/>
   **outputToken**: Add details<br/>

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

   **poolAddress**: Add details<br/>
   **inputAmounts**: Add details<br/>
   **from**: Add details<br/>
   **to**: Add details<br/>
   **hash**: Add details<br/>
   **logIndex**: Add details<br/>
   **timestamp**: Add details<br/>

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

   **poolAddress**: Add details<br/>
   **inputAmounts**: Add details<br/>
   **outputAmounts**: Add details<br/>
   **inputTokenIndex**: Add details<br/>
   **outputTokenIndex**: Add details<br/>
   **from**: Add details<br/>
   **to**: Add details<br/>
   **hash**: Add details<br/>
   **logIndex**: Add details<br/>
   **timestamp**: Add details<br/>

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
