import Lassie from "../src/core/lassie.js";
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
  hogwartsStudent: true;
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
