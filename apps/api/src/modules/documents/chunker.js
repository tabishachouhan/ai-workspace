const CHUNK_SIZE_WORDS = 300;
const CHUNK_OVERLAP_WORDS = 50;

export function chunkText(text) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];

  const chunks = [];
  let start = 0;
  let index = 0;

  while (start < words.length) {
    const end = Math.min(start + CHUNK_SIZE_WORDS, words.length);
    const chunkWords = words.slice(start, end);

    chunks.push({
      content: chunkWords.join(" "),
      chunkIndex: index,
    });

    index += 1;

    if (end === words.length) break;
    start = end - CHUNK_OVERLAP_WORDS;
  }

  return chunks;
}