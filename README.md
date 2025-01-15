# Lassie

A fetch wrapper that leverages [Valibot](https://valibot.dev/) to validate the response using type predicates.

## Reasoning

Validation of data from trusted sources can still be required. Type assertions using the "as" operator are not sufficient for this purpose. Lassie aims to provide first-class type predicate based validation for fetch responses. This light-weight performance oriented approach is not as strict as complete object parsing and validation, however it can still provide a high level of confidence in the data received from a remote source.

### Usage

Lassie is a wrapper around the fetch API. It takes a URL, a type predicate and an optional request options object. The type predicate is used to validate the response data. If the data is valid, the response is returned. If the data is invalid, an error is thrown.

```ts
import Lassie from "lassie";
import * as v from "valibot";

interface HogwartsStudent {
  id: string;
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: string;
  dateOfBirth: string;
  yearOfBirth: number;
  wizard: boolean;
  ancestry: string;
  eyeColour: string;
  hairColour: string;
  wand: {
    wood: string;
    core: string;
    length: number;
  };
  patronus: string;
  hogwartsStudent: boolean;
  hogWartsStaff: boolean;
  actor: string;
  alternate_actors: string[];
  alive: boolean;
  image: string;
}

const isHogwartsStudent = (data: unknown): data is HogwartsStudent[] => {
  const schema = v.array(
    v.object({
      hogwartsStudent: v.pipe(v.boolean(), v.literal(true)),
    })
  );
  return v.is(schema, data);
};

async function example() {
  try {
    const data = await Lassie<HogwartsStudent[]>(
      "https://hp-api.onrender.com/api/character/9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8",
      isHogwartsStudent
    );
    console.log("Received data:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}


