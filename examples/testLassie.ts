import Lassie from "../src/index.js"; // Adjust the path based on your project structure

// Example assertion function
const isString = (data: unknown): data is string => typeof data === "string";

async function testLassie() {
  try {
    const data = await Lassie<string>(
      "https://jsonplaceholder.typicode.com/posts/1",
      { method: "GET" },
      isString,
      { responseType: "json" }
    );
    console.log("Received data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

testLassie();
