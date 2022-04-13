import { Props } from "./types";

function set(object: Props, path: string, value: any) {
  if (typeof object !== "object") {
    return object;
  }

  const result = path
    .split(".")
    .reduceRight(
      (acc, key) => ({
        [key]: acc,
      }),
      value as any,
    );

  return { ...object, ...result };
}

export default set;
