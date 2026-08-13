const Argument = require('../argument');
const Option = require('../option');

describe('Argument and Option Unit Tests', () => {

    test('Argument initializes and chains configuration methods', () => {
        const arg = new Argument('name', 'User name description');
        expect(arg.$handler).toBeDefined();

        const chainedArg = arg.choices(['admin', 'user']).default('user').required();
        expect(chainedArg).toBe(arg);
    });

    test('Option initializes and chains configuration methods', () => {
        const opt = new Option('-e, --env <environment>', 'Environment name');
        expect(opt.$handler).toBeDefined();

        const chainedOpt = opt.choices(['dev', 'prod']).default('dev').hideHelp().required();
        expect(chainedOpt).toBe(opt);
    });

});
