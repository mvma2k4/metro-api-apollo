import * as dotenv from "dotenv";

const path = `${__dirname}/../.env.${process.env.NODE_ENV}`;

dotenv.config({ path: path });
jest.setTimeout(1000 * 60 * 10);