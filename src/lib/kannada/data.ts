export type CategoryId = "greetings" | "numbers" | "food" | "travel" | "college" | "shopping" | "healthcare" | "emergencies" | "directions" | "everyday";

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
  { id: "travel", label: "Transport" },
  { id: "college", label: "College" }, { id: "shopping", label: "Shopping" }, { id: "healthcare", label: "Healthcare" }, { id: "emergencies", label: "Emergencies" }, { id: "directions", label: "Directions" }, { id: "everyday", label: "Everyday life" },
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
  {"id": "welcome", "kannada": "ಸ್ವಾಗತ", "pronunciation": "swaa-ga-ta", "english": "Welcome", "telugu": "స్వాగతం", "category": "greetings"},
  {"id": "please", "kannada": "ದಯವಿಟ್ಟು", "pronunciation": "da-ya-vit-tu", "english": "Please", "telugu": "దయచేసి", "category": "greetings"},
  {"id": "sorry", "kannada": "ಕ್ಷಮಿಸಿ", "pronunciation": "ksha-mi-si", "english": "Sorry", "telugu": "క్షమించండి", "category": "greetings"},
  {"id": "good-morning", "kannada": "ಶುಭೋದಯ", "pronunciation": "shu-bho-da-ya", "english": "Good morning", "telugu": "శుభోదయం", "category": "greetings"},
  {"id": "name", "kannada": "ಹೆಸರು", "pronunciation": "he-sa-ru", "english": "Name", "telugu": "పేరు", "category": "greetings"},
  {"id": "my-name", "kannada": "ನನ್ನ ಹೆಸರು", "pronunciation": "nan-na he-sa-ru", "english": "My name", "telugu": "నా పేరు", "category": "greetings"},
  {"id": "goodbye", "kannada": "ಹೋಗಿ ಬರುತ್ತೇನೆ", "pronunciation": "ho-gi ba-rut-tay-ne", "english": "I will go and come back", "telugu": "వెళ్ళి వస్తాను", "category": "greetings"},
  {"id": "understand", "kannada": "ಅರ್ಥ ಆಯಿತು", "pronunciation": "ar-tha aa-yi-tu", "english": "I understood", "telugu": "అర్థమైంది", "category": "greetings"},
  {"id": "dont-understand", "kannada": "ಅರ್ಥ ಆಗಲಿಲ್ಲ", "pronunciation": "ar-tha aa-ga-lil-la", "english": "I did not understand", "telugu": "అర్థం కాలేదు", "category": "greetings"},
  {"id": "speak-slowly", "kannada": "ನಿಧಾನವಾಗಿ ಮಾತನಾಡಿ", "pronunciation": "ni-dhaa-na-vaa-gi maa-ta-naa-di", "english": "Speak slowly", "telugu": "నెమ్మదిగా మాట్లాడండి", "category": "greetings"},
  {"id": "college", "kannada": "ಕಾಲೇಜು", "pronunciation": "kaa-lay-ju", "english": "College", "telugu": "కళాశాల", "category": "college"},
  {"id": "student", "kannada": "ವಿದ್ಯಾರ್ಥಿ", "pronunciation": "vid-yaar-thi", "english": "Student", "telugu": "విద్యార్థి", "category": "college"},
  {"id": "teacher", "kannada": "ಶಿಕ್ಷಕ", "pronunciation": "shik-sha-ka", "english": "Teacher", "telugu": "ఉపాధ్యాయుడు", "category": "college"},
  {"id": "classroom", "kannada": "ತರಗತಿ ಕೊಠಡಿ", "pronunciation": "ta-ra-ga-ti ko-tha-di", "english": "Classroom", "telugu": "తరగతి గది", "category": "college"},
  {"id": "book", "kannada": "ಪುಸ್ತಕ", "pronunciation": "pus-ta-ka", "english": "Book", "telugu": "పుస్తకం", "category": "college"},
  {"id": "pen", "kannada": "ಪೆನ್ನು", "pronunciation": "pen-nu", "english": "Pen", "telugu": "కలం", "category": "college"},
  {"id": "exam", "kannada": "ಪರೀಕ್ಷೆ", "pronunciation": "pa-reek-she", "english": "Exam", "telugu": "పరీక్ష", "category": "college"},
  {"id": "library", "kannada": "ಗ್ರಂಥಾಲಯ", "pronunciation": "gran-thaa-la-ya", "english": "Library", "telugu": "గ్రంథాలయం", "category": "college"},
  {"id": "lesson", "kannada": "ಪಾಠ", "pronunciation": "paa-tha", "english": "Lesson", "telugu": "పాఠం", "category": "college"},
  {"id": "homework", "kannada": "ಮನೆಕೆಲಸ", "pronunciation": "ma-ne-ke-la-sa", "english": "Homework", "telugu": "ఇంటి పని", "category": "college"},
  {"id": "question", "kannada": "ಪ್ರಶ್ನೆ", "pronunciation": "prash-ne", "english": "Question", "telugu": "ప్రశ్న", "category": "college"},
  {"id": "answer", "kannada": "ಉತ್ತರ", "pronunciation": "ut-ta-ra", "english": "Answer", "telugu": "సమాధానం", "category": "college"},
  {"id": "friend", "kannada": "ಸ್ನೇಹಿತ", "pronunciation": "snay-hi-ta", "english": "Friend", "telugu": "స్నేహితుడు", "category": "college"},
  {"id": "help-me", "kannada": "ನನಗೆ ಸಹಾಯ ಮಾಡಿ", "pronunciation": "na-na-ge sa-haa-ya maa-di", "english": "Help me", "telugu": "నాకు సహాయం చేయండి", "category": "college"},
  {"id": "bus", "kannada": "ಬಸ್ಸು", "pronunciation": "bas-su", "english": "Bus", "telugu": "బస్సు", "category": "travel"},
  {"id": "train", "kannada": "ರೈಲು", "pronunciation": "rai-lu", "english": "Train", "telugu": "రైలు", "category": "travel"},
  {"id": "ticket", "kannada": "ಟಿಕೆಟ್", "pronunciation": "ti-ket", "english": "Ticket", "telugu": "టికెట్", "category": "travel"},
  {"id": "station", "kannada": "ರೈಲು ನಿಲ್ದಾಣ", "pronunciation": "rai-lu nil-daa-na", "english": "Railway station", "telugu": "రైల్వే స్టేషన్", "category": "travel"},
  {"id": "airport", "kannada": "ವಿಮಾನ ನಿಲ್ದಾಣ", "pronunciation": "vi-maa-na nil-daa-na", "english": "Airport", "telugu": "విమానాశ్రయం", "category": "travel"},
  {"id": "auto-word", "kannada": "ಆಟೋ", "pronunciation": "aa-to", "english": "Auto-rickshaw", "telugu": "ఆటో", "category": "travel"},
  {"id": "fare", "kannada": "ಪ್ರಯಾಣ ದರ", "pronunciation": "pra-yaa-na da-ra", "english": "Travel fare", "telugu": "ప్రయాణ ఛార్జీ", "category": "travel"},
  {"id": "go", "kannada": "ಹೋಗಿ", "pronunciation": "ho-gi", "english": "Go", "telugu": "వెళ్ళండి", "category": "travel"},
  {"id": "come", "kannada": "ಬನ್ನಿ", "pronunciation": "ban-ni", "english": "Come", "telugu": "రండి", "category": "travel"},
  {"id": "wait", "kannada": "ಕಾಯಿರಿ", "pronunciation": "kaa-yi-ri", "english": "Wait", "telugu": "వేచి ఉండండి", "category": "travel"},
  {"id": "seat", "kannada": "ಆಸನ", "pronunciation": "aa-sa-na", "english": "Seat", "telugu": "సీటు", "category": "travel"},
  {"id": "journey", "kannada": "ಪ್ರಯಾಣ", "pronunciation": "pra-yaa-na", "english": "Journey", "telugu": "ప్రయాణం", "category": "travel"},
  {"id": "shop", "kannada": "ಅಂಗಡಿ", "pronunciation": "an-ga-di", "english": "Shop", "telugu": "దుకాణం", "category": "shopping"},
  {"id": "price", "kannada": "ಬೆಲೆ", "pronunciation": "be-le", "english": "Price", "telugu": "ధర", "category": "shopping"},
  {"id": "money", "kannada": "ಹಣ", "pronunciation": "ha-na", "english": "Money", "telugu": "డబ్బు", "category": "shopping"},
  {"id": "cash", "kannada": "ನಗದು", "pronunciation": "na-ga-du", "english": "Cash", "telugu": "నగదు", "category": "shopping"},
  {"id": "bill", "kannada": "ಬಿಲ್", "pronunciation": "bil", "english": "Bill", "telugu": "బిల్లు", "category": "shopping"},
  {"id": "bag", "kannada": "ಚೀಲ", "pronunciation": "chee-la", "english": "Bag", "telugu": "సంచి", "category": "shopping"},
  {"id": "expensive", "kannada": "ದುಬಾರಿ", "pronunciation": "du-baa-ri", "english": "Expensive", "telugu": "ఖరీదైనది", "category": "shopping"},
  {"id": "cheap", "kannada": "ಅಗ್ಗ", "pronunciation": "ag-ga", "english": "Cheap", "telugu": "చవక", "category": "shopping"},
  {"id": "buy", "kannada": "ಕೊಳ್ಳಿ", "pronunciation": "kol-li", "english": "Buy", "telugu": "కొనండి", "category": "shopping"},
  {"id": "sell", "kannada": "ಮಾರಿ", "pronunciation": "maa-ri", "english": "Sell", "telugu": "అమ్మండి", "category": "shopping"},
  {"id": "need-this", "kannada": "ಇದು ಬೇಕು", "pronunciation": "i-du bay-ku", "english": "I want this", "telugu": "ఇది కావాలి", "category": "shopping"},
  {"id": "dont-want", "kannada": "ಬೇಡ", "pronunciation": "bay-da", "english": "Do not want", "telugu": "వద్దు", "category": "shopping"},
  {"id": "breakfast", "kannada": "ತಿಂಡಿ", "pronunciation": "tin-di", "english": "Breakfast / snack", "telugu": "అల్పాహారం", "category": "food"},
  {"id": "tea", "kannada": "ಚಹಾ", "pronunciation": "cha-haa", "english": "Tea", "telugu": "టీ", "category": "food"},
  {"id": "sugar", "kannada": "ಸಕ್ಕರೆ", "pronunciation": "sak-ka-re", "english": "Sugar", "telugu": "చక్కెర", "category": "food"},
  {"id": "salt", "kannada": "ಉಪ್ಪು", "pronunciation": "up-pu", "english": "Salt", "telugu": "ఉప్పు", "category": "food"},
  {"id": "vegetables", "kannada": "ತರಕಾರಿಗಳು", "pronunciation": "ta-ra-kaa-ri-ga-lu", "english": "Vegetables", "telugu": "కూరగాయలు", "category": "food"},
  {"id": "fruit", "kannada": "ಹಣ್ಣು", "pronunciation": "han-nu", "english": "Fruit", "telugu": "పండు", "category": "food"},
  {"id": "banana", "kannada": "ಬಾಳೆಹಣ್ಣು", "pronunciation": "baa-le-han-nu", "english": "Banana", "telugu": "అరటిపండు", "category": "food"},
  {"id": "apple", "kannada": "ಸೇಬು", "pronunciation": "say-bu", "english": "Apple", "telugu": "ఆపిల్", "category": "food"},
  {"id": "hungry", "kannada": "ಹಸಿವಾಗಿದೆ", "pronunciation": "ha-si-vaa-gi-de", "english": "I am hungry", "telugu": "ఆకలిగా ఉంది", "category": "food"},
  {"id": "tasty", "kannada": "ರುಚಿಯಾಗಿದೆ", "pronunciation": "ru-chi-yaa-gi-de", "english": "It is tasty", "telugu": "రుచిగా ఉంది", "category": "food"},
  {"id": "spicy", "kannada": "ಖಾರ", "pronunciation": "khaa-ra", "english": "Spicy", "telugu": "కారం", "category": "food"},
  {"id": "plate", "kannada": "ತಟ್ಟೆ", "pronunciation": "tat-te", "english": "Plate", "telugu": "పళ్ళెం", "category": "food"},
  {"id": "doctor", "kannada": "ವೈದ್ಯರು", "pronunciation": "vai-dya-ru", "english": "Doctor", "telugu": "వైద్యుడు", "category": "healthcare"},
  {"id": "hospital", "kannada": "ಆಸ್ಪತ್ರೆ", "pronunciation": "aas-pa-tre", "english": "Hospital", "telugu": "ఆసుపత్రి", "category": "healthcare"},
  {"id": "medicine", "kannada": "ಔಷಧಿ", "pronunciation": "ow-sha-dhi", "english": "Medicine", "telugu": "మందు", "category": "healthcare"},
  {"id": "fever", "kannada": "ಜ್ವರ", "pronunciation": "jwa-ra", "english": "Fever", "telugu": "జ్వరం", "category": "healthcare"},
  {"id": "pain", "kannada": "ನೋವು", "pronunciation": "no-vu", "english": "Pain", "telugu": "నొప్పి", "category": "healthcare"},
  {"id": "headache", "kannada": "ತಲೆನೋವು", "pronunciation": "ta-le-no-vu", "english": "Headache", "telugu": "తలనొప్పి", "category": "healthcare"},
  {"id": "cough", "kannada": "ಕೆಮ್ಮು", "pronunciation": "kem-mu", "english": "Cough", "telugu": "దగ్గు", "category": "healthcare"},
  {"id": "sick", "kannada": "ಅನಾರೋಗ್ಯ", "pronunciation": "a-naa-ro-gya", "english": "Illness", "telugu": "అనారోగ్యం", "category": "healthcare"},
  {"id": "pharmacy", "kannada": "ಔಷಧಿ ಅಂಗಡಿ", "pronunciation": "ow-sha-dhi an-ga-di", "english": "Pharmacy", "telugu": "మందుల దుకాణం", "category": "healthcare"},
  {"id": "help", "kannada": "ಸಹಾಯ", "pronunciation": "sa-haa-ya", "english": "Help", "telugu": "సహాయం", "category": "emergencies"},
  {"id": "police", "kannada": "ಪೊಲೀಸ್", "pronunciation": "po-lees", "english": "Police", "telugu": "పోలీసు", "category": "emergencies"},
  {"id": "ambulance", "kannada": "ಆಂಬುಲೆನ್ಸ್", "pronunciation": "aam-bu-lens", "english": "Ambulance", "telugu": "అంబులెన్స్", "category": "emergencies"},
  {"id": "danger", "kannada": "ಅಪಾಯ", "pronunciation": "a-paa-ya", "english": "Danger", "telugu": "ప్రమాదం", "category": "emergencies"},
  {"id": "fire", "kannada": "ಬೆಂಕಿ", "pronunciation": "ben-ki", "english": "Fire", "telugu": "మంట", "category": "emergencies"},
  {"id": "call", "kannada": "ಕರೆ ಮಾಡಿ", "pronunciation": "ka-re maa-di", "english": "Make a call", "telugu": "ఫోన్ చేయండి", "category": "emergencies"},
  {"id": "lost", "kannada": "ದಾರಿ ತಪ್ಪಿದೆ", "pronunciation": "daa-ri tap-pi-de", "english": "I have lost my way", "telugu": "దారి తప్పాను", "category": "emergencies"},
  {"id": "urgent", "kannada": "ತುರ್ತು", "pronunciation": "tur-tu", "english": "Urgent", "telugu": "అత్యవసరం", "category": "emergencies"},
  {"id": "straight", "kannada": "ನೇರವಾಗಿ", "pronunciation": "nay-ra-vaa-gi", "english": "Straight ahead", "telugu": "నేరుగా", "category": "directions"},
  {"id": "near", "kannada": "ಹತ್ತಿರ", "pronunciation": "hat-ti-ra", "english": "Near", "telugu": "దగ్గర", "category": "directions"},
  {"id": "far", "kannada": "ದೂರ", "pronunciation": "doo-ra", "english": "Far", "telugu": "దూరం", "category": "directions"},
  {"id": "here", "kannada": "ಇಲ್ಲಿ", "pronunciation": "il-li", "english": "Here", "telugu": "ఇక్కడ", "category": "directions"},
  {"id": "there", "kannada": "ಅಲ್ಲಿ", "pronunciation": "al-li", "english": "There", "telugu": "అక్కడ", "category": "directions"},
  {"id": "road", "kannada": "ರಸ್ತೆ", "pronunciation": "ras-te", "english": "Road", "telugu": "రోడ్డు", "category": "directions"},
  {"id": "inside", "kannada": "ಒಳಗೆ", "pronunciation": "o-la-ge", "english": "Inside", "telugu": "లోపల", "category": "directions"},
  {"id": "outside", "kannada": "ಹೊರಗೆ", "pronunciation": "ho-ra-ge", "english": "Outside", "telugu": "బయట", "category": "directions"},
  {"id": "house", "kannada": "ಮನೆ", "pronunciation": "ma-ne", "english": "House", "telugu": "ఇల్లు", "category": "everyday"},
  {"id": "today", "kannada": "ಇವತ್ತು", "pronunciation": "i-vat-tu", "english": "Today", "telugu": "ఈ రోజు", "category": "everyday"},
  {"id": "tomorrow", "kannada": "ನಾಳೆ", "pronunciation": "naa-le", "english": "Tomorrow", "telugu": "రేపు", "category": "everyday"},
  {"id": "yesterday", "kannada": "ನಿನ್ನೆ", "pronunciation": "nin-ne", "english": "Yesterday", "telugu": "నిన్న", "category": "everyday"},
  {"id": "morning", "kannada": "ಬೆಳಿಗ್ಗೆ", "pronunciation": "be-lig-ge", "english": "Morning", "telugu": "ఉదయం", "category": "everyday"},
  {"id": "night", "kannada": "ರಾತ್ರಿ", "pronunciation": "raa-tri", "english": "Night", "telugu": "రాత్రి", "category": "everyday"},
  {"id": "time", "kannada": "ಸಮಯ", "pronunciation": "sa-ma-ya", "english": "Time", "telugu": "సమయం", "category": "everyday"},
  {"id": "work", "kannada": "ಕೆಲಸ", "pronunciation": "ke-la-sa", "english": "Work", "telugu": "పని", "category": "everyday"},
  {"id": "phone", "kannada": "ದೂರವಾಣಿ", "pronunciation": "doo-ra-vaa-ni", "english": "Telephone", "telugu": "దూరవాణి", "category": "everyday"},
  {"id": "door", "kannada": "ಬಾಗಿಲು", "pronunciation": "baa-gi-lu", "english": "Door", "telugu": "తలుపు", "category": "everyday"},
  {"id": "open", "kannada": "ತೆರೆಯಿರಿ", "pronunciation": "te-re-yi-ri", "english": "Open", "telugu": "తెరవండి", "category": "everyday"},
  {"id": "close", "kannada": "ಮುಚ್ಚಿ", "pronunciation": "much-chi", "english": "Close", "telugu": "మూయండి", "category": "everyday"},
  {"id": "good", "kannada": "ಒಳ್ಳೆಯದು", "pronunciation": "ol-le-ya-du", "english": "Good", "telugu": "మంచిది", "category": "everyday"},
  {"id": "little", "kannada": "ಸ್ವಲ್ಪ", "pronunciation": "swal-pa", "english": "A little", "telugu": "కొంచెం", "category": "everyday"},
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
