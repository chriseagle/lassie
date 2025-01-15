const Lassie = async <TExpectedResponse>(
  url: string | URL | globalThis.Request,
  assertion: (data: unknown) => data is TExpectedResponse,
  ReqOpts?: RequestInit
): Promise<TExpectedResponse> => {
  const response = await fetch(url, { ...ReqOpts });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  let data: unknown = null;
  const contentType =
    response.headers.get("content-Type") ?? "application/json";

  if (contentType.includes("text/")) {
    data = await response.text();
  }
  if (contentType.includes("application/json")) {
    data = await response.json();
  }

  if (data === null) {
    throw new Error("No data received");
  }

  if (!assertion(data)) {
    throw new Error("Data validation failed");
  }

  return data;
};

export default Lassie;
