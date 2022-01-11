export function sum(...args) {
    if (args.length === 0) {
        throw Error('Sum required at least 1 argument');
    }

    console.log("test");
    
    return args.reduce((result, current) => result + current, 0)
}