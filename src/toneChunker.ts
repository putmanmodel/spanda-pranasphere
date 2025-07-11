// Naive chunker: splits text into sentences using punctuation
export function chunkText(input: string): string[] {
  return input
    .split(/(?<=[.?!])\s+/)  // split after punctuation + space
    .map(chunk => chunk.trim())
    .filter(chunk => chunk.length > 0);
}