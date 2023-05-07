import { fatumCommandDecorator } from './utils';

export default fatumCommandDecorator(
    fatum => fatum.firstName()
);
