// Goat-Bot V2 - Messenger Version - NEW 2026 Fix
const login = require("ws3-fca");
const fs = require("fs");

const jokes = ["Teacher: Late kyu aaye? Student: Board pe likha tha School Ahead Go Slow 😂","Lahore Lahore Ae! 😍","Goat-Bot V2 ON hai, masti rukegi nahi! 🔥"];
const songs = ["1. Pasoori - 【entity-Ali Sethi¦canonical_name=Ali Sethi】","2. Kahani Suno - 【entity-Kaifi Khalil¦canonical_name=Kaifi Khalil】","3. Brown Munde - 【entity-AP Dhillon¦canonical_name=AP Dhillon】","4. High Rated Gabru","5. Raabta"];

function reply(cmd, args){
  if(cmd=="hi") return "Hello Jaan! 🐐❤️ Goat-Bot V2 hazir hai! !help likho";
  if(cmd=="help") return "🐐 GOAT-BOT V2:\n!hi\n!joke\n!shayari\n!song\n!play pasoori\n!masti\n!info";
  if(cmd=="joke") return "😂 JOKE:\n" + jokes[Math.floor(Math.random()*jokes.length)];
  if(cmd=="shayari") return "❤️ SHAYARI:\nTeri yaad me chai bhi pee li ❤️☕";
  if(cmd=="masti") return "🎉 FULL MASTI:\n" + jokes[Math.floor(Math.random()*jokes.length)];
  if(cmd=="song") return "🎵 SONG PLAYLIST:\n" + songs.join("\n");
  if(cmd=="play") return "▶️ Playing: " + (args.join(" ") || "Pasoori") + " 🎵 Volume Full Karo! 💃";
  if(cmd=="info") return "🐐 Goat-Bot V2\nOwner: Baiwa\nFull Masti ON 🔥";
  return "Pata nahi! !help likho";
}

const appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));
login({appState}, (err, api)=>{
  if(err) return console.log("Login Fail!", err);
  console.log("✅ Goat-Bot Messenger se CONNECT ho gaya!");
  api.setOptions({ listenEvents: true, selfListen: false });
  api.listenMqtt((err, event)=>{
    if(err) return console.log("Listen Error, retry...", err);
    if(event.type==="message" && event.body && event.body.startsWith("!")){
      const a = event.body.slice(1).trim().split(/ +/);
      const c = a.shift().toLowerCase();
      api.sendMessage(reply(c, a), event.threadID);
    }
  });
});
