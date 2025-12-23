import { Base } from "@/core/Base";
import { config } from "dotenv";
config({
  path: "../../.env"
});

const base = new Base();

base.init();
