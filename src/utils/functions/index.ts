export const pipe = (arg: any,...fns: Array<(args: any) => any>) => {
   return fns.reduce((acc, fn) => fn(acc) ,arg);
}