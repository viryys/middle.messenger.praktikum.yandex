import { Props } from "./types";
import merge from "./merge";

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

  return merge(object, result);
}

export default set;
