import type { LassieOpts } from "../types/index.js";

const lassieOptsDefaults: LassieOpts = {
  responseType: "json",
};

const Lassie = async <TExpectedResponse>(
  url: string | URL | globalThis.Request,
  assertion: (data: unknown) => data is TExpectedResponse,
  ReqOpts?: RequestInit,
  LassieOpts?: LassieOpts
): Promise<TExpectedResponse> => {
  const response = await fetch(url, { ...ReqOpts });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const LassieOptsFinal = { ...lassieOptsDefaults, ...LassieOpts };

  let data: unknown;
  switch (LassieOptsFinal.responseType) {
    case "json":
      data = await response.json();
      break;
    case "text":
      data = await response.text();
      break;
    case "blob":
      data = await response.blob();
      break;
    default:
      throw new Error(
        `Unsupported returnType: ${LassieOptsFinal.responseType}`
      );
  }

  if (!assertion(data)) {
    throw new Error("Data validation failed");
  }

  return data;
};

export default Lassie;
