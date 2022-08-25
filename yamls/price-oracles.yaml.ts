const yamlString = `
abis:
  - name: ERC20
    file: ./abis/Prices/ERC20.json
  - name: CurveRegistry
    file: ./abis/Prices/Curve/Registry.json
  - name: CurvePoolRegistry
    file: ./abis/Prices/Curve/PoolRegistry.json
  - name: CalculationsCurve
    file: ./abis/Prices/Calculations/Curve.json
  - name: YearnLensContract
    file: ./abis/Prices/YearnLens.json
  - name: ChainLinkContract
    file: ./abis/Prices/ChainLink.json
  - name: UniswapRouter
    file: ./abis/Prices/Uniswap/Router.json
  - name: UniswapFeeRouter
    file: ./abis/Prices/Uniswap/FeeRouter.json
  - name: UniswapFactory
    file: ./abis/Prices/Uniswap/Factory.json
  - name: UniswapPair
    file: ./abis/Prices/Uniswap/Pair.json
  - name: SushiSwapRouter
    file: ./abis/Prices/SushiSwap/Router.json
  - name: SushiSwapFactory
    file: ./abis/Prices/SushiSwap/Factory.json
  - name: SushiSwapPair
    file: ./abis/Prices/SushiSwap/Pair.json
  - name: CalculationsSushiSwap
    file: ./abis/Prices/Calculations/SushiSwap.json
`;

export default yamlString;
