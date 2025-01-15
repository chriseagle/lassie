const Lassie = async <TExpectedResult>(
  url: string,
  options: RequestInit,
  assertationTest: (data: unknown) => data is TExpectedResult
): Promise<TExpectedResult> => {
  const response = await fetch(url, {
    ...options
  });


  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // @TODO add for json/text/blob? support
  const data = await response.json();

  // Use the assertion test to validate the data
  if (!assertationTest(data)) {
    throw new Error("Data validation failed");
  }

  return data;
};

export default Lassie;