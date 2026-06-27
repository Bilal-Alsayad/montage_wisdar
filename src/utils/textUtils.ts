/**
 * Splits a text into two lines at the nearest space to the character midpoint.
 * The longer portion is always on the second line (text2).
 */
export const splitTitle = (text: string): { text1: string; text2: string } => {
  const trimmed = text?.trim() || "";
  if (!trimmed) return { text1: "", text2: "" };

  if (!trimmed.includes(" ")) {
    return { text1: trimmed, text2: "" };
  }

  const mid = trimmed.length / 2;

  let spaceBefore = -1;
  let spaceAfter = -1;

  for (let i = Math.floor(mid); i >= 0; i--) {
    if (trimmed[i] === " ") {
      spaceBefore = i;
      break;
    }
  }

  for (let i = Math.ceil(mid); i < trimmed.length; i++) {
    if (trimmed[i] === " ") {
      spaceAfter = i;
      break;
    }
  }

  const candidates = [];
  if (spaceBefore !== -1) candidates.push(spaceBefore);
  if (spaceAfter !== -1 && spaceAfter !== spaceBefore) candidates.push(spaceAfter);

  let bestSplit = candidates.length > 0 ? candidates[0] : -1;
  let minPenalty = Infinity;

  // We want to minimize the difference in length between line 1 and line 2,
  // but preferably have text2 longer or equal to text1.
  for (const index of candidates) {
    const t1 = trimmed.slice(0, index).trim();
    const t2 = trimmed.slice(index).trim();
    const diff = Math.abs(t1.length - t2.length);
    
    // Heavily penalize if t1 is longer than t2 (x2 multiplier)
    const penalty = t1.length > t2.length ? diff * 2 : diff;
    
    if (penalty < minPenalty) {
      minPenalty = penalty;
      bestSplit = index;
    }
  }

  if (bestSplit === -1) {
    return { text1: trimmed, text2: "" };
  }

  return {
    text1: trimmed.slice(0, bestSplit).trim(),
    text2: trimmed.slice(bestSplit).trim()
  };
};

export const splitTextIntoMultipleLines = (
  text: string,
  maxLines: number,
  maxCharsPerLine: number = 25,
): string[] => {
  const trimmed = text?.trim();
  if (!trimmed) return [""];

  const words = trimmed.split(/\s+/);
  const wordCount = words.length;
  const totalChars = trimmed.length;

  // Special case: 4 words always split 2+2
  if (wordCount === 4) {
    return [
      words.slice(0, 2).join(" "),
      words.slice(2).join(" "),
    ];
  }

  if (wordCount === 1 || totalChars <= maxCharsPerLine) return [trimmed];

  // How many lines do we ideally need?
  const idealLines = Math.ceil(totalChars / maxCharsPerLine);
  const lineCount = Math.min(idealLines, maxLines, wordCount);

  if (lineCount === 1) return [trimmed];

  // Balance target (try to distribute evenly)
  const targetCharsPerLine = totalChars / lineCount;

  const lines: string[] = [];
  let currentLine: string[] = [];
  let currentLength = 0;
  let linesRemaining = lineCount;

  for (let i = 0; i < wordCount; i++) {
    const word = words[i];
    const newLength =
      currentLength + (currentLine.length > 0 ? 1 : 0) + word.length;

    // Last line: accumulate all remaining words (overflow allowed)
    if (linesRemaining <= 1) {
      currentLine.push(word);
      continue;
    }

    // Non-last lines: HARD CAP — never exceed maxCharsPerLine
    if (currentLine.length > 0 && newLength > maxCharsPerLine) {
      lines.push(currentLine.join(" "));
      currentLine = [word];
      currentLength = word.length;
      linesRemaining--;
      continue;
    }

    // Balance check: if within maxCharsPerLine, also consider balance
    if (currentLine.length > 0) {
      const withWord = Math.abs(newLength - targetCharsPerLine);
      const withoutWord = Math.abs(currentLength - targetCharsPerLine);

      if (withWord > withoutWord && newLength > targetCharsPerLine) {
        lines.push(currentLine.join(" "));
        currentLine = [word];
        currentLength = word.length;
        linesRemaining--;
        continue;
      }
    }

    currentLine.push(word);
    currentLength = newLength;
  }

  if (currentLine.length > 0) {
    lines.push(currentLine.join(" "));
  }

  return lines;
};
