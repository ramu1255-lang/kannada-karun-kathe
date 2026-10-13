export type CategoryId = "greetings" | "numbers" | "food" | "travel";

export interface Word {
  id: string;
  kannada: string;
  /** Simple romanised pronunciation guide (long vowels doubled). */
  pronunciation: string;
  english: string;
  telugu: string;
  category: CategoryId;
}

export interface Category {
  id: CategoryId;
  label: string;
}

export const CATEGORIES: readonly Category[] = [
  { id: "greetings", label: "Greetings & basics" },
  { id: "numbers", label: "Numbers" },
  { id: "food", label: "Food & drink" },
  { id: "travel", label: "Travel & directions" },
];

export const VOCABULARY: readonly Word[] = [
  { id: "hello", kannada: "ನಮಸ್ಕಾರ", pronunciation: "na-mas-kaa-ra", english: "Hello", telugu: "నమస్కారం", category: "greetings" },
  { id: "thanks", kannada: "ಧನ್ಯವಾದಗಳು", pronunciation: "dhan-ya-vaa-da-ga-lu", english: "Thank you", telugu: "ధన్యవాదాలు", category: "greetings" },
  { id: "yes", kannada: "ಹೌದು", pronunciation: "how-du", english: "Yes", telugu: "అవును", category: "greetings" },
  { id: "no", kannada: "ಇಲ್ಲ", pronunciation: "il-la", english: "No", telugu: "లేదు", category: "greetings" },
  { id: "how-are-you", kannada: "ಹೇಗಿದ್ದೀರಾ?", pronunciation: "hay-gid-dee-raa", english: "How are you?", telugu: "ఎలా ఉన్నారు?", category: "greetings" },
  { id: "fine", kannada: "ಚೆನ್ನಾಗಿದ್ದೀನಿ", pronunciation: "chen-naa-gid-dee-ni", english: "I am fine", telugu: "బాగున్నాను", category: "greetings" },
  { id: "one", kannada: "ಒಂದು", pronunciation: "on-du", english: "One", telugu: "ఒకటి", category: "numbers" },
  { id: "two", kannada: "ಎರಡು", pronunciation: "e-ra-du", english: "Two", telugu: "రెండు", category: "numbers" },
  { id: "three", kannada: "ಮೂರು", pronunciation: "moo-ru", english: "Three", telugu: "మూడు", category: "numbers" },
  { id: "four", kannada: "ನಾಲ್ಕು", pronunciation: "naal-ku", english: "Four", telugu: "నాలుగు", category: "numbers" },
  { id: "five", kannada: "ಐದು", pronunciation: "ai-du", english: "Five", telugu: "ఐదు", category: "numbers" },
  { id: "water", kannada: "ನೀರು", pronunciation: "nee-ru", english: "Water", telugu: "నీళ్ళు", category: "food" },
  { id: "meal", kannada: "ಊಟ", pronunciation: "oo-ta", english: "Meal", telugu: "భోజనం", category: "food" },
  { id: "rice", kannada: "ಅನ್ನ", pronunciation: "an-na", english: "Cooked rice", telugu: "అన్నం", category: "food" },
  { id: "milk", kannada: "ಹಾಲು", pronunciation: "haa-lu", english: "Milk", telugu: "పాలు", category: "food" },
  { id: "coffee", kannada: "ಕಾಫಿ", pronunciation: "kaa-fi", english: "Coffee", telugu: "కాఫీ", category: "food" },
  { id: "how-much", kannada: "ಎಷ್ಟು?", pronunciation: "esh-tu", english: "How much?", telugu: "ఎంత?", category: "travel" },
  { id: "where", kannada: "ಎಲ್ಲಿ?", pronunciation: "el-li", english: "Where?", telugu: "ఎక్కడ?", category: "travel" },
  { id: "right", kannada: "ಬಲ", pronunciation: "ba-la", english: "Right (direction)", telugu: "కుడి", category: "travel" },
  { id: "left", kannada: "ಎಡ", pronunciation: "e-da", english: "Left (direction)", telugu: "ఎడమ", category: "travel" },
  { id: "stop", kannada: "ನಿಲ್ಲಿಸಿ", pronunciation: "nil-li-si", english: "Please stop", telugu: "ఆపండి", category: "travel" },
  { id: "bus-stand", kannada: "ಬಸ್ ನಿಲ್ದಾಣ", pronunciation: "bus nil-daa-na", english: "Bus stand", telugu: "బస్ స్టాండ్", category: "travel" },
];

export interface DialogueLine {
  speaker: string;
  kannada: string;
  pronunciation: string;
  english: string;
}

export interface Conversation {
  id: string;
  title: string;
  situation: string;
  lines: DialogueLine[];
}

export const CONVERSATIONS: readonly Conversation[] = [
  {
    id: "meeting",
    title: "Meeting a neighbour",
    situation: "Greeting someone politely in your building.",
    lines: [
      { speaker: "You", kannada: "ನಮಸ್ಕಾರ, ಹೇಗಿದ್ದೀರಾ?", pronunciation: "na-mas-kaa-ra, hay-gid-dee-raa?", english: "Hello, how are you?" },
      { speaker: "Neighbour", kannada: "ಚೆನ್ನಾಗಿದ್ದೀನಿ, ನೀವು?", pronunciation: "chen-naa-gid-dee-ni, nee-vu?", english: "I'm fine, and you?" },
      { speaker: "You", kannada: "ನಾನೂ ಚೆನ್ನಾಗಿದ್ದೀನಿ, ಧನ್ಯವಾದಗಳು.", pronunciation: "naa-noo chen-naa-gid-dee-ni, dhan-ya-vaa-da-ga-lu.", english: "I'm fine too, thank you." },
    ],
  },
  {
    id: "auto",
    title: "Taking an auto-rickshaw",
    situation: "Asking the driver for a ride and the fare.",
    lines: [
      { speaker: "You", kannada: "ಬಸ್ ನಿಲ್ದಾಣಕ್ಕೆ ಬರ್ತೀರಾ?", pronunciation: "bus nil-daa-nak-ke bar-tee-raa?", english: "Will you come to the bus stand?" },
      { speaker: "Driver", kannada: "ಹೌದು, ಬನ್ನಿ.", pronunciation: "how-du, ban-ni.", english: "Yes, come." },
      { speaker: "You", kannada: "ಎಷ್ಟು ಆಗುತ್ತೆ?", pronunciation: "esh-tu aa-gut-te?", english: "How much will it be?" },
      { speaker: "You", kannada: "ಇಲ್ಲೇ ನಿಲ್ಲಿಸಿ.", pronunciation: "il-lay nil-li-si.", english: "Please stop right here." },
    ],
  },
  {
    id: "hotel",
    title: "Ordering at a darshini",
    situation: "Ordering food and drink at a small restaurant.",
    lines: [
      { speaker: "Waiter", kannada: "ಏನು ಬೇಕು?", pronunciation: "ay-nu bay-ku?", english: "What do you want?" },
      { speaker: "You", kannada: "ಒಂದು ಕಾಫಿ ಮತ್ತು ಊಟ ಬೇಕು.", pronunciation: "on-du kaa-fi mat-tu oo-ta bay-ku.", english: "I want one coffee and a meal." },
      { speaker: "You", kannada: "ಸ್ವಲ್ಪ ನೀರು ಕೊಡಿ.", pronunciation: "swal-pa nee-ru ko-di.", english: "Please give some water." },
    ],
  },
];
