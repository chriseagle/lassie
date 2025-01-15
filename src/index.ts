interface LassieOpts {
  responseType?: "json" | "text" | "blob";
}

const Lassie = async <TExpectedResponse>(
  url: string | URL | globalThis.Request,
  ReqOpts: RequestInit,
  assertationTest: (data: unknown) => data is TExpectedResponse,
  LassieOpts: LassieOpts = { responseType: "json" }
): Promise<TExpectedResponse> => {
  const response = await fetch(url, ReqOpts);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let data: unknown;
  switch (LassieOpts.responseType) {
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
      throw new Error(`Unsupported returnType: ${LassieOpts.responseType}`);
  }

  if (!assertationTest(data)) {
    throw new Error("Data validation failed");
  }

  return data;
};

export default Lassie;
