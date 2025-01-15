const Lassie = async <TExpectedResult>(
  url: string,
  options: RequestInit,
  assertationTest: (data: unknown) => data is TExpectedResult // Use a type predicate here
): Promise<TExpectedResult> => {
  const response = await fetch(url, {
    ...options
  });

  // Ensure the response is ok before proceeding
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Assuming JSON response, handle other response types as needed
  const data = await response.json();

  // Use the assertion test to validate the data
  if (!assertationTest(data)) {
    throw new Error("Data validation failed");
  }

  return data;
};

export default Lassie;