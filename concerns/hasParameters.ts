declare const InputArgument: any;
declare const InputOption: any;

/**
 * Class HasParameters.
 */
class HasParameters {
    getDefinition: any;
    addArgument: any;
    addOption: any;

    /**
     * specifyParameters method.
     * @returns {any}
     */
    specifyParameters() {

        for (let $arguments of this.getArguments()) {
            if (typeof InputArgument !== 'undefined' && $arguments instanceof InputArgument) {
                this.getDefinition().addArgument($arguments);
            } else {
                this.addArgument(...Object.values($arguments as any));
            }
        }

        for (let $options of this.getOptions()) {
            if (typeof InputOption !== 'undefined' && $options instanceof InputOption) {
                this.getDefinition().addOption($options);
            } else {
                this.addOption(...Object.values($options as any));
            }
        }
    }

    /**
     * getArguments method.
     * @returns {any}
     */
    getArguments(): any[] {
        return [];
    }

    /**
     * getOptions method.
     * @returns {any}
     */
    getOptions(): any[] {
        return [];
    }
}

export default HasParameters;