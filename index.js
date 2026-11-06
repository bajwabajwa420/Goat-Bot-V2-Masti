// Goat-Bot V2 - All In One Full Masti
const config = { prefix: "!", botName: "Goat-Bot V2", owner: "Baiwa" };

const jokes = [
"Teacher: Late kyu aaye? Student: Board pe likha tha School Ahead Go Slow 😂",
"Lahore Lahore Ae! 😍",
"Goat-Bot V2 ON hai, masti rukegi nahi! 🔥"
];
const shayari = [
"Teri yaad me chai bhi pee li, ab neend bhi aa rahi hai ❤️☕",
"Goat-Bot se dosti kar lo, masti hi masti milegi 🐐✨"
];
const songs = [
"1. Pasoori - Ali Sethi",
"2. Kahani Suno - Kaifi Khalil",
"3. Brown Munde - AP Dhillon",
"4. High Rated Gabru - Guru Randhawa",
"5. Raabta - Arijit Singh"
];

function reply(cmd, args) {
  if(cmd=="hi") return "Hello Jaan! 🐐❤️ Goat-Bot V2 hazir hai! !help likho";
  if(cmd=="help") return "🐐 GOAT-BOT V2 COMMANDS:\n!hi\n!joke\n!shayari\n!song\n!play pasoori\n!masti\n!info";
  if(cmd=="joke") return "😂 JOKE:\n" + jokes[Math.floor(Math.random()*jokes.length)];
  if(cmd=="shayari") return "❤️ SHAYARI:\n" + shayari[Math.floor(Math.random()*shayari.length)];
  if(cmd=="masti") return "🎉 FULL MASTI:\n" + jokes[Math.floor(Math.random()*jokes.length)];
  if(cmd=="song") return "🎵 SONG PLAYLIST:\n" + songs.join("\n") + "\n\nLikho: !play pasoori";
  if(cmd=="play") return "▶️ Playing: " + (args.join(" ") || "Pasoori") + " 🎵 Volume Full Karo! 💃";
  if(cmd=="info") return "🐐 Goat-Bot V2\nOwner: Baiwa\nFull Masti Mode ON 🔥";
  return "Pata nahi! !help likho";
}

console.log("Goat-Bot V2 ON hai! !help likho");
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});
rl.on('line', (input)=>{
  if(!input.startsWith("!")) return console.log("! lagao jaise !help");
  const a = input.slice(1).trim().split(/ +/);
  const c = a.shift().toLowerCase();
  console.log("\nBOT: " + reply(c, a) + "\n");
});
