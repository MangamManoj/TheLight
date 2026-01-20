// Book themes with icons/emojis and gradient colors
export interface BookTheme {
  icon: string;
  gradient: string[];
  theme: string;
}

export const BOOK_THEMES: Record<string, BookTheme> = {
  // Old Testament
  "Genesis": { icon: "🌍", gradient: ["from-blue-400", "via-purple-400", "to-pink-400"], theme: "Creation" },
  "Exodus": { icon: "⛰️", gradient: ["from-orange-400", "via-red-400", "to-yellow-400"], theme: "Moses" },
  "Leviticus": { icon: "⚖️", gradient: ["from-amber-400", "via-orange-400", "to-red-400"], theme: "Law" },
  "Numbers": { icon: "🔢", gradient: ["from-green-400", "via-emerald-400", "to-teal-400"], theme: "Journey" },
  "Deuteronomy": { icon: "📜", gradient: ["from-indigo-400", "via-purple-400", "to-pink-400"], theme: "Covenant" },
  "Joshua": { icon: "🗡️", gradient: ["from-green-500", "via-emerald-500", "to-teal-500"], theme: "Conquest" },
  "Judges": { icon: "⚔️", gradient: ["from-gray-400", "via-slate-400", "to-zinc-400"], theme: "Judges" },
  "Ruth": { icon: "🌾", gradient: ["from-yellow-400", "via-amber-400", "to-orange-400"], theme: "Loyalty" },
  "1 Samuel": { icon: "👑", gradient: ["from-purple-400", "via-pink-400", "to-rose-400"], theme: "Saul" },
  "2 Samuel": { icon: "👑", gradient: ["from-blue-500", "via-indigo-500", "to-purple-500"], theme: "David" },
  "1 Kings": { icon: "🏛️", gradient: ["from-yellow-500", "via-amber-500", "to-orange-500"], theme: "Solomon" },
  "2 Kings": { icon: "⚡", gradient: ["from-red-400", "via-orange-400", "to-yellow-400"], theme: "Prophets" },
  "1 Chronicles": { icon: "📚", gradient: ["from-blue-400", "via-cyan-400", "to-teal-400"], theme: "History" },
  "2 Chronicles": { icon: "📖", gradient: ["from-indigo-400", "via-blue-400", "to-cyan-400"], theme: "Temple" },
  "Ezra": { icon: "🏗️", gradient: ["from-emerald-400", "via-green-400", "to-teal-400"], theme: "Rebuilding" },
  "Nehemiah": { icon: "🧱", gradient: ["from-stone-400", "via-gray-400", "to-slate-400"], theme: "Walls" },
  "Esther": { icon: "👸", gradient: ["from-pink-400", "via-rose-400", "to-red-400"], theme: "Queen" },
  "Job": { icon: "💎", gradient: ["from-cyan-400", "via-blue-400", "to-indigo-400"], theme: "Suffering" },
  "Psalms": { icon: "🎵", gradient: ["from-purple-400", "via-pink-400", "to-rose-400"], theme: "David" },
  "Proverbs": { icon: "💡", gradient: ["from-yellow-400", "via-amber-400", "to-orange-400"], theme: "Wisdom" },
  "Ecclesiastes": { icon: "🔍", gradient: ["from-gray-400", "via-slate-400", "to-zinc-400"], theme: "Meaning" },
  "Song of Solomon": { icon: "💕", gradient: ["from-pink-400", "via-rose-400", "to-red-400"], theme: "Love" },
  "Isaiah": { icon: "🔥", gradient: ["from-orange-500", "via-red-500", "to-rose-500"], theme: "Prophet" },
  "Jeremiah": { icon: "💔", gradient: ["from-red-400", "via-rose-400", "to-pink-400"], theme: "Weeping" },
  "Lamentations": { icon: "😢", gradient: ["from-gray-500", "via-slate-500", "to-zinc-500"], theme: "Mourning" },
  "Ezekiel": { icon: "👁️", gradient: ["from-indigo-500", "via-purple-500", "to-pink-500"], theme: "Vision" },
  "Daniel": { icon: "🦁", gradient: ["from-orange-400", "via-amber-400", "to-yellow-400"], theme: "Lions" },
  "Hosea": { icon: "💒", gradient: ["from-pink-400", "via-rose-400", "to-red-400"], theme: "Marriage" },
  "Joel": { icon: "🦗", gradient: ["from-green-400", "via-emerald-400", "to-teal-400"], theme: "Locusts" },
  "Amos": { icon: "⚖️", gradient: ["from-blue-500", "via-indigo-500", "to-purple-500"], theme: "Justice" },
  "Obadiah": { icon: "⛰️", gradient: ["from-stone-400", "via-gray-400", "to-slate-400"], theme: "Edom" },
  "Jonah": { icon: "🐋", gradient: ["from-blue-400", "via-cyan-400", "to-teal-400"], theme: "Whale" },
  "Micah": { icon: "🏔️", gradient: ["from-green-500", "via-emerald-500", "to-teal-500"], theme: "Micah" },
  "Nahum": { icon: "⚡", gradient: ["from-yellow-500", "via-orange-500", "to-red-500"], theme: "Judgment" },
  "Habakkuk": { icon: "❓", gradient: ["from-purple-400", "via-indigo-400", "to-blue-400"], theme: "Questions" },
  "Zephaniah": { icon: "🌪️", gradient: ["from-gray-500", "via-slate-500", "to-zinc-500"], theme: "Day of Lord" },
  "Haggai": { icon: "🏗️", gradient: ["from-amber-400", "via-orange-400", "to-red-400"], theme: "Temple" },
  "Zechariah": { icon: "👼", gradient: ["from-blue-400", "via-indigo-400", "to-purple-400"], theme: "Angels" },
  "Malachi": { icon: "📮", gradient: ["from-orange-400", "via-amber-400", "to-yellow-400"], theme: "Messenger" },
  
  // New Testament
  "Matthew": { icon: "👑", gradient: ["from-blue-500", "via-indigo-500", "to-purple-500"], theme: "King" },
  "Mark": { icon: "⚡", gradient: ["from-red-500", "via-orange-500", "to-yellow-500"], theme: "Action" },
  "Luke": { icon: "👨‍⚕️", gradient: ["from-green-500", "via-emerald-500", "to-teal-500"], theme: "Physician" },
  "John": { icon: "🕊️", gradient: ["from-blue-400", "via-cyan-400", "to-teal-400"], theme: "Eagle" },
  "Acts": { icon: "🔥", gradient: ["from-orange-500", "via-red-500", "to-pink-500"], theme: "Spirit" },
  "Romans": { icon: "📜", gradient: ["from-indigo-500", "via-purple-500", "to-pink-500"], theme: "Gospel" },
  "1 Corinthians": { icon: "💒", gradient: ["from-pink-400", "via-rose-400", "to-red-400"], theme: "Church" },
  "2 Corinthians": { icon: "💪", gradient: ["from-blue-400", "via-indigo-400", "to-purple-400"], theme: "Strength" },
  "Galatians": { icon: "🆓", gradient: ["from-green-400", "via-emerald-400", "to-teal-400"], theme: "Freedom" },
  "Ephesians": { icon: "🛡️", gradient: ["from-indigo-500", "via-blue-500", "to-cyan-500"], theme: "Armor" },
  "Philippians": { icon: "😊", gradient: ["from-yellow-400", "via-amber-400", "to-orange-400"], theme: "Joy" },
  "Colossians": { icon: "👑", gradient: ["from-purple-500", "via-pink-500", "to-rose-500"], theme: "Christ" },
  "1 Thessalonians": { icon: "⏰", gradient: ["from-blue-400", "via-cyan-400", "to-teal-400"], theme: "Coming" },
  "2 Thessalonians": { icon: "🌅", gradient: ["from-orange-400", "via-red-400", "to-pink-400"], theme: "Day" },
  "1 Timothy": { icon: "👨‍🏫", gradient: ["from-indigo-400", "via-purple-400", "to-pink-400"], theme: "Pastor" },
  "2 Timothy": { icon: "📖", gradient: ["from-blue-500", "via-indigo-500", "to-purple-500"], theme: "Scripture" },
  "Titus": { icon: "🏝️", gradient: ["from-teal-400", "via-cyan-400", "to-blue-400"], theme: "Crete" },
  "Philemon": { icon: "🤝", gradient: ["from-green-400", "via-emerald-400", "to-teal-400"], theme: "Forgiveness" },
  "Hebrews": { icon: "✝️", gradient: ["from-purple-500", "via-indigo-500", "to-blue-500"], theme: "Priest" },
  "James": { icon: "⚖️", gradient: ["from-amber-500", "via-orange-500", "to-red-500"], theme: "Works" },
  "1 Peter": { icon: "🪨", gradient: ["from-stone-400", "via-gray-400", "to-slate-400"], theme: "Rock" },
  "2 Peter": { icon: "📝", gradient: ["from-blue-400", "via-indigo-400", "to-purple-400"], theme: "Warning" },
  "1 John": { icon: "❤️", gradient: ["from-red-500", "via-pink-500", "to-rose-500"], theme: "Love" },
  "2 John": { icon: "✉️", gradient: ["from-pink-400", "via-rose-400", "to-red-400"], theme: "Letter" },
  "3 John": { icon: "👤", gradient: ["from-indigo-400", "via-purple-400", "to-pink-400"], theme: "Gaius" },
  "Jude": { icon: "⚔️", gradient: ["from-red-500", "via-orange-500", "to-yellow-500"], theme: "Contend" },
  "Revelation": { icon: "👁️", gradient: ["from-purple-600", "via-pink-600", "to-red-600"], theme: "Apocalypse" },
};

export function getBookTheme(bookName: string): BookTheme {
  return BOOK_THEMES[bookName] || {
    icon: "📖",
    gradient: ["from-gray-400", "via-slate-400", "to-zinc-400"],
    theme: "Book"
  };
}
