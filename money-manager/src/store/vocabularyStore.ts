import AsyncStorage from '@react-native-async-storage/async-storage';

// ─── Types ───────────────────────────────────────────────

export interface SavedTerm {
  termId: number;
  cardId: number;
  savedDate: string; // 'YYYY-MM-DD'
}

export interface VocabularyData {
  /** termId -> SavedTerm */
  saved: Record<number, SavedTerm>;
}

// ─── Key ─────────────────────────────────────────────────

const VOCAB_KEY = '@money_manager/vocabulary';

// ─── Helpers ─────────────────────────────────────────────

function getToday(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// ─── CRUD ────────────────────────────────────────────────

export async function getVocabulary(): Promise<VocabularyData> {
  const raw = await AsyncStorage.getItem(VOCAB_KEY);
  if (!raw) return { saved: {} };
  return JSON.parse(raw);
}

/**
 * Save terms linked to correctly answered cards.
 * Each card has 2 terms – both are saved when a card question is answered correctly.
 * @param cardIds - card IDs the user answered correctly
 * @param allTerms - the full terms list to look up by cardId
 * @returns list of newly saved term IDs
 */
export async function saveTermsByCardIds(
  cardIds: number[],
  allTerms: Array<{ id: number; cardId: number }>
): Promise<number[]> {
  const data = await getVocabulary();
  const today = getToday();
  const newlySaved: number[] = [];

  for (const cid of cardIds) {
    const relatedTerms = allTerms.filter((t) => t.cardId === cid);
    for (const t of relatedTerms) {
      if (!data.saved[t.id]) {
        data.saved[t.id] = {
          termId: t.id,
          cardId: cid,
          savedDate: today,
        };
        newlySaved.push(t.id);
      }
    }
  }

  if (newlySaved.length > 0) {
    await AsyncStorage.setItem(VOCAB_KEY, JSON.stringify(data));
  }

  return newlySaved;
}

export async function removeTerm(termId: number): Promise<void> {
  const data = await getVocabulary();
  delete data.saved[termId];
  await AsyncStorage.setItem(VOCAB_KEY, JSON.stringify(data));
}

export async function clearVocabulary(): Promise<void> {
  await AsyncStorage.removeItem(VOCAB_KEY);
}
