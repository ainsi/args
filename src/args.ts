class Args {
    public args: Argument[];

    constructor(args: string[]) {
        args = args.filter(arg => arg.length > 0);

        this.args = args.filter(arg => '-' === arg[0]).map(arg => {
            let next = args.indexOf(arg) + 1;
            let value = args[next] ? ('-' !== args[next][0] ? args[next] : null) : null;

            if (arg.match(/^-{1,2}[a-zA-Z]+=.+$/)) { // -x=4.2, --color=yellow
                value = arg.slice(arg.indexOf('=') + 1);
                arg = arg.slice(0, arg.indexOf('='));
            }

            if (arg.match(/^-{2}[a-zA-Z]{2,}$/)) { // --help
                arg = arg.substring(2);
            } else if (arg.match(/^-{1}[a-zA-Z]+$/)) { // -h, -vvv
                arg = arg.substring(1);
            }

            return new Argument(arg, value);
        });
    }

    public has(arg: string): boolean {
        return 0 !== this.args.filter(_arg => arg === _arg.arg).length;
    }

    public get(arg: string): string | null | undefined {
        return this.args.find(_arg => _arg.arg === arg)?.value;
    }
}

class Argument {
    public arg: string;
    public value: string | null;

    constructor(arg: string, value: string | null) {
        this.arg = arg;
        this.value = value;
    }
}

export const parse = (args: string[]): Args => {
    return new Args(args);
}
