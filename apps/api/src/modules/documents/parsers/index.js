import { parsePdf } from "./pdf.parser.js";

const PARSERS = {
  PDF: parsePdf,
};

export function getParser(documentType) {
  const parser = PARSERS[documentType];
  if (!parser) {
    throw new Error(`No parser available for document type: ${documentType}`);
  }
  return parser;
}