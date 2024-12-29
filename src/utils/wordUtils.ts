// Yaygın yazım hatalarını içeren kelime oluşturma
export function createMisspelledWord(word: string): string {
  const commonMistakes: { [key: string]: string[] } = {
    'kuş': ['kşu', 'küş', 'kuş'],
    'balık': ['balkı', 'balık', 'balik'],
    'köpek': ['köpke', 'köpek', 'kopek'],
    'kedi': ['keid', 'kedi', 'kadi'],
    'tavşan': ['tavşna', 'tavşan', 'tavsan'],
    'kalem': ['kealm', 'kalem', 'kalam'],
    'kitap': ['kipta', 'kitap', 'kitab'],
    'defter': ['deftre', 'defter', 'daftar'],
    'masa': ['masa', 'msaa', 'maza'],
    'sandalye': ['sandlaye', 'sandalye', 'sandalya']
  };

  if (word in commonMistakes) {
    const mistakes = commonMistakes[word];
    return mistakes[Math.floor(Math.random() * mistakes.length)];
  }

  // Eğer kelime listede yoksa, iki harfin yerini değiştir
  const letters = word.split('');
  if (letters.length > 2) {
    const pos1 = Math.floor(Math.random() * (letters.length - 1));
    [letters[pos1], letters[pos1 + 1]] = [letters[pos1 + 1], letters[pos1]];
  }
  return letters.join('');
}