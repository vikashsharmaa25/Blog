import DataUriParser from "datauri/parser.js";
import path from "path";

const parser = new DataUriParser();

const getUserDataUri = (file) => {
  const extentionName = path.extname(file.originalname).toString();
  return parser.format(extentionName, file.buffer).content;
};

export default getUserDataUri;
