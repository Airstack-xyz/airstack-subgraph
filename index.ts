import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import {Vertical} from './src/constants';
import {isVerticalSupported} from './src/utils';
import {integrate} from './src/integrate';

const argv = yargs(hideBin(process.argv)).argv as Record<string, string>;

const verticals = argv['_'];
if (verticals.length === 0) {
  throw new Error('Vertical name is required');
}
if (verticals.length > 1) {
  throw new Error('Please provide a single vertical name');
}

if (!isVerticalSupported(verticals[0] as Vertical)) {
  throw new Error(`Given vertical ${verticals[0]} is not supported`);
}

integrate(
  verticals[0] as Vertical,
  argv.yaml,
  argv.schema,
  argv?.dataSource?.split(',').map(element => element.trim())
);
