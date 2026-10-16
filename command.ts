import type { ICommand } from '@ostro/contracts/console/command';

import Argument from './argument';
import Option from './option';
import CommandContracts from '@ostro/contracts/console/command';
import { implement } from '@ostro/support/function';
import Interaction from './concerns/intraction';
import HasParameters from './concerns/hasParameters';
import CallCommands from './concerns/callsCommands';

/**
 * Class Command.
 */
class Command extends implement(CommandContracts, Interaction, CallCommands, HasParameters) implements ICommand {
    $app: any;
    $console: any;

    get $signature(): any {
        throw Error('$signature must be defined');
    }
    set $signature(val: any) {
        Object.defineProperty(this, '$signature', { value: val, writable: true, configurable: true });
    }

    get $description(): any {
        throw Error('$description must be defined');
    }
    set $description(val: any) {
        Object.defineProperty(this, '$description', { value: val, writable: true, configurable: true });
    }

    get $options(): any {
        return [];
    }
    set $options(val: any) {
        Object.defineProperty(this, '$options', { value: val, writable: true, configurable: true });
    }

    get $arguments(): any {
        return [];
    }
    set $arguments(val: any) {
        Object.defineProperty(this, '$arguments', { value: val, writable: true, configurable: true });
    }

    /**
     * createArgument method.
     * @returns {any}
     */
    createArgument(...args: any[]) {
        return new (Argument as any)(...args)
    }

    /**
     * createOption method.
     * @returns {any}
     */
    createOption(...args: any[]) {
        return new (Option as any)(...args)
    }

    /**
     * getApp method.
     * @returns {any}
     */
    getApp() {
        return this.$app;
    }

    /**
     * setApp method.
     * @param {*} $app
     * @returns {any}
     */
    setApp($app: any) {
        this.$app = $app;
    }

    /**
     * setConsole method.
     * @param {*} $console
     * @returns {any}
     */
    setConsole($console: any) {
        this.$console = $console
    }

    /**
     * getConsole method.
     * @returns {any}
     */
    getConsole() {
        return this.$console
    }

    /**
     * execute method.
     * @returns {any}
     */
    execute() {
        let $method = typeof this['handle'] == 'function' ? 'handle' : '__invoke';
        return this.$app.call(this, $method);
    }
    /**
     * __invoke method.
     * @returns {any}
     */
    __invoke() {
        throw Error('class should have either handle or __invike function')
    }
}

export default Command;