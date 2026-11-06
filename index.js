// Goat-Bot V2 - Messenger Version - FULL MASTI v3.0
// Purani file + Nayi file - Dono ek saath - Kuch delete nahi kiya
const login = require("fca-unofficial");
const fs = require("fs");

const jokes = ["Teacher: Late kyu aaye? Student: Sir, WhatsApp pe status dekha tha 'School Closed' 😂", "Punjabi maa: Beta 10 baje tak ghar aa jana. Beta: Maa 10 baje to party shuru hoti hai 😂", "Biwi: Suno ji, main moti lag rahi hun? Shohar: Nahi to. Biwi: Jhoot mat bolo! Shohar: Acha moti lag rahi ho 😂"];
const songs = ["1. Pasoori - 【entity-Ali Sethi¦canonical_name=Ali Sethi】", "2. Kahani Suno - 【entity-Kaifi Khalil¦canonical_name=Kaifi Khalil】", "3. Brown Munde - 【entity-AP Dhillon¦canonical_name=AP Dhillon】", "4. High Rated Gabru - 【entity-Guru Randhawa¦canonical_name=Guru Randhawa】", "5. Lahore - 【entity-Guru Randhawa¦canonical_name=Guru Randhawa】", "6. Raabta - 【entity-Arijit Singh¦canonical_name=Arijit Singh】"];

// ===== NAYE WALE =====
const funnyReplies = [
  "Oye hoye! Mujhe reply kiya? Lagta hai meri fan following barh rahi hai 😎",
  "Reply kar diya? Ab to shadi pakki samjho 😂",
  "Aray wah! Itna pyaar? Thora bachake rakho, mehnga ho jayega 😜",
  "Mujhe reply mat karo, mujhe to already pata hai main cute hun 😏",
  "Oye! Bot ko reply kar raha hai? Insaanon se baat nahi hoti kya? 🤣",
  "Haye Allah! Mera dil dharak gaya, tumne reply kiya 🥺❤️",
  "Itna reply karega to Facebook wale sochenge hum dono ka chakkar hai 👀",
  "Bot hun, insaan nahi, phir bhi tum mujhe itna reply karte ho, cute ho tum 😘",
  "Reply mat kar, seedha !song likh, nachte hain 💃🕺"
];
const welcomeMessages = [
  "🎉 Welcome Welcome! {name} group me aa gaya! Ab masti double ho jayegi 🔥\n!help likh ke saare commands dekh lo!",
  "Oye hoye! Naya mehmaan aa gaya! {name} Welcome meri jaan 😍💃 Chai piyoge ya !joke sunoge?",
  "Welcome {name}! 🥳 Group ka naya star aa gaya! Sab tali bajao 👏👏\n!song likh ke party shuru karo!",
  "Assalam O Alaikum {name}! ❤️ Group me welcome hai, yahan sirf masti hoti hai 😂\n!help likho"
];
const sadRemoveMessages = [
  "😢 Haye Allah! {name} ko remove kar diya? Kisne kiya ye zulm? Dil toot gaya mera 💔",
  "😭 {name} ko nikaal diya? Yaar itna bura kya kiya tha usne? Mujhe to rona aa raha hai 🥺",
  "💔 {name} chala gaya... Group ki ronak chali gayi. Wapis le aao usko please 😢",
  "😔 {name} ko remove kar diya gaya... Ab group me ek hasi kam ho jayegi. Miss karenge tumhe yaar..."
];
const funnyLeftMessages = [
  "😂 Oye {name} khud hi bhaag gaya! Lagta hai !roast se dar gaya 😂🤣",
  "Hahaha {name} left kar gaya! Lagta hai uska net khatam ho gaya 😂📱",
  "Oye {name} bhaag gaya! Pakro isko, biryani khatam hone se pehle bhaag gaya 😂🍗",
  "😂 {name} ne left kar diya? Lagta hai mummy ne bula liya - 'Beta sabzi le aa' 🤣",
  "Bye Bye {name}! 😂 Darwaza band karke jana, machar aa jayenge!"
];
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function getName(api, id){
  return new Promise((res)=>{
    api.getUserInfo(id, (err, ret)=>{
      if(err || !ret || !ret[id]) return res("Dost");
      res(ret[id].name || "Dost");
    });
  });
}

function reply(cmd, args){
  if(cmd=="hi") return "Hello Jaan! 😍 Kaisi ho?";
  if(cmd=="help") return "🐐 GOAT-BOT - FULL LIST:\n!hi !help !joke !shayari !masti !roast !truth !dare !song !play !lyrics !love !coin !dice !info\n\n✨ Naya: Mujhe reply karo to funny jawab, naya banda aaye to welcome, remove ho to sad, left kare to funny!";
  if(cmd=="joke") return "😂 JOKE:\n" + pick(jokes);
  if(cmd=="shayari") return "❤️ SHAYARI:\nTeri yaad me humne chai pee li, ab neend nahi aati ye alag baat hai ☕😂";
  if(cmd=="masti") return "🎉 FULL MASTI:\nOye chup kar ke nacho! 💃 Goat-Bot zindabad! 🔥";
  if(cmd=="roast") return "😈 ROAST:\nTumhara face dekh ke to WiFi bhi disconnect ho jata hai 😂";
  if(cmd=="truth") return "😏 TRUTH:\nApne crush ka naam batao 😏";
  if(cmd=="dare") return "😈 DARE:\nGroup me 'Main sab se cute hun' likh ke bhejo 😜";
  if(cmd=="song") return "🎵 SONG PLAYLIST:\n" + songs.join("\n") + "\n\n!play pasoori likho!";
  if(cmd=="play") return "▶️ Playing: " + (args.join(" ") || "Pasoori") + " 🎵\nVolume Full Karo! Nacho! Goat-Bot DJ ON hai! 💃";
  if(cmd=="lyrics") return "🎤 LYRICS:\nAgg lavaan majboor nu, Aan jaan di pasoori nu 🎵";
  if(cmd=="love") return "❤️ LOVE: " + Math.floor(Math.random()*100) + "% - Pakka pyaar hai!";
  if(cmd=="coin") return "🪙 Coin: " + (Math.random()>0.5?"Head!":"Tail!");
  if(cmd=="dice") return "🎲 Dice: " + (Math.floor(Math.random()*6)+1);
  if(cmd=="info") return "🐐 Goat-Bot V2 - Full Masti\n👑 Owner: Baiwa";
  return "Pata nahi! !help likho";
}

const appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));
login({appState}, (err, api)=>{
  if(err) return console.error(err);
  console.log("Bot Online Hai! 🔥");
  api.listenMqtt(async (err, event)=>{
    if(err) return console.error(err);

    // ===== 1. WELCOME - Koi naya aaye =====
    if(event.logMessageType === "log:subscribe"){
      const added = event.logMessageData.addedParticipants || [];
      for(const p of added){
        if(p.userFbId == api.getCurrentUserID()){
          return api.sendMessage("🐐 Hello Hello! Main Goat-Bot aa gaya! 🔥 Ab full masti hogi! !help likho!", event.threadID);
        }
        const name = await getName(api, p.userFbId);
        api.sendMessage(pick(welcomeMessages).replace("{name}", name), event.threadID);
      }
      return;
    }

    // ===== 2. REMOVE SAD / 3. LEFT FUNNY =====
    if(event.logMessageType === "log:unsubscribe"){
      const leftID = event.logMessageData.leftParticipantFbId;
      const name = await getName(api, leftID);
      if(event.author && event.author != leftID){
        return api.sendMessage(pick(sadRemoveMessages).replaceAll("{name}", name), event.threadID);
      } else {
        return api.sendMessage(pick(funnyLeftMessages).replaceAll("{name}", name), event.threadID);
      }
    }

    // ===== FUNNY REPLY - Bot ko reply kare to =====
    if(event.messageReply && event.messageReply.senderID == api.getCurrentUserID()){
      const userText = (event.body || "").toLowerCase();
      let replyText = pick(funnyReplies);
      if(userText.includes("salam") || userText.includes("hello") || userText.includes("hi")) replyText = "Walaikum Salam meri jaan! 😍 Kaisi ho? !joke likho maza aayega";
      else if(userText.includes("kaisa") || userText.includes("kesi")) replyText = "Main to mast hun, tum batao? Tumhara crush kaisa hai? 😏";
      else if(userText.includes("love")) replyText = "Hayee love? !love likh ke check kar lo kitna pyaar hai ❤️";
      else if(userText.includes("bakwas")) replyText = "Bakwas? Oye main Goat hun, Goat! Bakwas nahi, full masti hun 😎🔥";
      return api.sendMessage(replyText, event.threadID, event.messageID);
    }

    // ===== PURANE COMMANDS =====
    if(event.type !== "message" || !event.body) return;
    const body = event.body.trim();
    if(!body.startsWith("!")) return;
    const parts = body.slice(1).split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    const ans = reply(cmd, args);
    api.sendMessage(ans, event.threadID, event.messageID);
  });
});
