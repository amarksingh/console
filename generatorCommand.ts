import Command from './command';
import { rtrim, trim } from '@ostro/support/function';
import StringHelper from '@ostro/support/string';

/**
 * Class GeneratorCommand.
 */
class GeneratorCommand extends Command {

    $file;

    $type;

    $dirname = __dirname;

    $reservedNames = [
        'abstract',
        'and',
        'as',
        'break',
        'case',
        'catch',
        'class',
        'const',
        'continue',
        'default',
        'do',
        'else',
        'elseif',
        'eval',
        'exit',
        'extends',
        'finally',
        'for',
        'function',
        'global',
        'if',
        'instanceof',
        'new',
        'or',
        'public',
        'require',
        'return',
        'static',
        'switch',
        'throw',
        'try',
        'var',
        'while',
        'yield',
    ];

    $arguments = [
        this.createArgument('name', 'The name of the migration').required()
    ];

    /**
     * Create a new instance.
     * @param {*} $files
     */
    constructor($files: any) {
        super()

        this.$file = $files;
    }

    /**
     * handle method.
     * @async
     * @returns {any}
     */
    async handle() {
        let $name = this.getNameInput()

        if (this.isReservedName($name)) {
            this.error('The name "' + $name + '" is reserved by js.');

            return false;
        }

        let qualifyClass = await this.qualifyClass($name)

        let $path = await this.getPath(qualifyClass)

        if ((!this.hasOption('force') || !this.option('force')) && await this.alreadyExists($path)) {
            this.error(this.$type + ' already exists!');

            return false;
        }

        await this.makeDirectory($path);
        let $stub = await this.buildClass($name)
        if ($stub) {
            await this.$file.put($path, $stub.toString());
            this.info(this.$type + ' created successfully.');
        } else {
            this.error('Unable to create ' + this.$type);

        }

    }

    /**
     * qualifyClass method.
     * @param {*} $name
     * @returns {any}
     */
    qualifyClass($name: string) {
        $name = $name.trim()
        let $rootNamespace = this.rootNamespace();

        if ($name.startsWith($rootNamespace)) {
            return $name;
        }
        return this.qualifyClass(
            path.join(this.getDefaultNamespace(String.trimEnd($rootNamespace, path.sep)), $name)
        );
    }

    /**
     * getDefaultNamespace method.
     * @param {*} $rootNamespace
     * @returns {any}
     */
    getDefaultNamespace($rootNamespace: any) {
        return $rootNamespace;
    }

    /**
     * qualifyModel method.
     * @param {*} $model
     * @returns {any}
     */
    qualifyModel($model: any) {
        $model = ltrim($model, '/');

        let $rootNamespace = this.rootNamespace();

        if (String.startsWith($model, $rootNamespace)) {
            return $model;
        }

        return isDirectory(app_path('models')) ?
            app_path('models/' + $model) :
            path.join($rootNamespace, $model);
    }

    /**
     * alreadyExists method.
     * @param {*} $rawName
     * @returns {any}
     */
    alreadyExists($rawName: any) {
        return this.$file.exists($rawName)
    }

    /**
     * getFileName method.
     * @param {*} $name
     * @returns {any}
     */
    getFileName($name: string) {
        $name = path.normalize($name)
        let lastSlash = $name.lastIndexOf(path.sep)
        lastSlash = lastSlash > -1 ? lastSlash : 0
        return String.trim($name.slice(lastSlash, $name.length), path.sep)
    }

    /**
     * getPath method.
     * @param {*} $name
     * @returns {any}
     */
    getPath($name: string) {
        let $class = this.getFileName($name).camelCase()
        let namespace = this.getNamespace($name).replace(this.rootNamespace(), '')
        return this.rootNamespace(path.join(namespace, $class + ".js"))
    }

    /**
     * makeDirectory method.
     * @async
     * @param {*} $path
     * @returns {any}
     */
    async makeDirectory($path: string) {
        await this.$file.makeDirectory(dirname($path), 0o755, true, true);

        return $path;
    }

    /**
     * resolveStubPath method.
     * @param {*} $stub
     * @returns {any}
     */
    resolveStubPath($stub: any) {
        let $customPath = this.$app.basePath(String.trim($stub, '/'))
        return this.$file.exists($customPath).then($exists => ($exists ? $customPath : path.join(this.$dirname, $stub)))
    }

    /**
     * buildClass method.
     * @async
     * @param {*} $name
     * @returns {any}
     */
    async buildClass($name: string) {
        let $stub = await this.getStub()
        return this.$file.get($stub)
            .then($stub => {
                $stub = this.replaceNamespace($stub, $name)
                $stub = this.replaceClass($stub, $name)
                return $stub
            })

    }

    /**
     * replaceNamespace method.
     * @param {*} $stub
     * @param {*} $name
     * @returns {any}
     */
    replaceNamespace($stub: any, $name: string) {
        let $searches = {
            'DummyNamespace': this.getNamespace($name),
            'DummyRootNamespace': this.getNamespace($name),
            'NamespacedDummyUserModel': this.getNamespace($name),
            '{{ namespace }}': this.rootNamespace(),
            '{{ rootNamespace }}': this.rootNamespace(),
            '{{ namespacedUserModel }}': this.rootNamespace(),
            '{{namespace}}': this.userProviderModel(),
            '{{rootNamespace}}': this.userProviderModel(),
            '{{namespacedUserModel}}': this.userProviderModel(),
        };
        $stub = StringHelper.replaceAllArray($stub,
            Object.keys($searches), Object.values($searches)

        );

        return $stub;
    }

    /**
     * getNamespace method.
     * @param {*} $name
     * @returns {any}
     */
    getNamespace($name: string) {
        $name = path.normalize($name)
        return rtrim($name.slice(0, $name.lastIndexOf(path.sep)), path.sep);
    }

    /**
     * replaceClass method.
     * @param {*} $stub
     * @param {*} $name
     * @returns {any}
     */
    replaceClass($stub: any, $name: string) {
        let $class = StringHelper.ucfirst(StringHelper.pascal(this.getFileName($name)));
        return StringHelper.replaceAll($stub, ['DummyClass', '{{ class }}', '{{class}}'], $class);
    }

    /**
     * sortImports method.
     * @param {*} $stub
     * @returns {any}
     */
    sortImports($stub: any) {
        return $stub;
    }

    /**
     * getNameInput method.
     * @returns {any}
     */
    getNameInput() {
        return trim(this.argument('name'));
    }

    /**
     * rootNamespace method.
     * @param {*} $path
     * @returns {any}
     */
    rootNamespace($path: string) {
        return this.$app.basePath($path);
    }

    /**
     * userProviderModel method.
     * @returns {any}
     */
    userProviderModel() {
        let $config = this.$app['config'];

        let $provider = $config.get('auth.guards.' + $config.get('auth.defaults.guard') + '.provider');

        return $config.get(`auth.providers.${$provider}.model`);
    }

    /**
     * isReservedName method.
     * @param {*} $name
     * @returns {any}
     */
    isReservedName($name: string) {
        $name = $name.toLowerCase();

        return this.$reservedNames.indexOf($name) > -1;
    }

    /**
     * viewPath method.
     * @param {*} $path
     * @returns {any}
     */
    viewPath($path: string = '') {
        $views = this.$app['config']['view.paths'][0] || resource_path('views');

        return $views + ($path ? pat.sep + $path : $path);
    }

}

export default GeneratorCommand;