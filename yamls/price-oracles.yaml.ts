const yamlString = `
abis:
  - name: ERC721MetaData
    file: ./node_modules/airstack/abis/Prices/ERC721.json    
  - name: ERC20
    file: ./node_modules/airstack/abis/ERC20.json
  - name: CurveRegistry
    file: ./node_modules/airstack/abis/Prices/Curve/Registry.json
  - name: CurvePoolRegistry
    file: ./node_modules/airstack/abis/Prices/Curve/PoolRegistry.json
  - name: CalculationsCurve
    file: ./node_modules/airstack/abis/Prices/Calculations/Curve.json
  - name: YearnLensContract
    file: ./node_modules/airstack/abis/Prices/YearnLens.json
  - name: ChainlinkOracle
    file: ./node_modules/airstack/abis/Prices/ChainLink.json
  - name: ChainLinkContract
    file: ./node_modules/airstack/abis/Prices/ChainLink.json
  - name: UniswapRouter
    file: ./node_modules/airstack/abis/Prices/Uniswap/Router.json
  - name: UniswapFeeRouter
    file: ./node_modules/airstack/abis/Prices/Uniswap/FeeRouter.json
  - name: UniswapFactory
    file: ./node_modules/airstack/abis/Prices/Uniswap/Factory.json
  - name: UniswapPair
    file: ./node_modules/airstack/abis/Prices/Uniswap/Pair.json
  - name: SushiSwapRouter
    file: ./node_modules/airstack/abis/Prices/SushiSwap/Router.json
  - name: SushiSwapFactory
    file: ./node_modules/airstack/abis/Prices/SushiSwap/Factory.json
  - name: SushiSwapPair
    file: ./node_modules/airstack/abis/Prices/SushiSwap/Pair.json
  - name: CalculationsSushiSwap
    file: ./node_modules/airstack/abis/Prices/Calculations/SushiSwap.json
`;

export default yamlString;
