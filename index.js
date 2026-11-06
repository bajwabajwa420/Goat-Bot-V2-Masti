// Goat-Bot V2 - FINAL - Admin + Welcome + Har Message Reply
const login = require("fca-unofficial");
const fs = require("fs");

const jokes = ["Teacher: Late kyu aaye? Student: Sir, WhatsApp pe status dekha tha 'School Closed' 😂", "Punjabi maa: Beta 10 baje tak ghar aa jana. Beta: Maa 10 baje to party shuru hoti hai 😂", "Biwi: Suno ji, main moti lag rahi hun? Shohar: Nahi to. Biwi: Jhoot mat bolo! Shohar: Acha moti lag rahi ho 😂"];
const songs = ["1. Pasoori - 【entity-Ali Sethi¦canonical_name=Ali Sethi】", "2. Kahani Suno - 【entity-Kaifi Khalil¦canonical_name=Kaifi Khalil】", "3. Brown Munde - 【entity-AP Dhillon¦canonical_name=AP Dhillon】", "4. High Rated Gabru - 【entity-Guru Randhawa¦canonical_name=Guru Randhawa】", "5. Lahore - 【entity-Guru Randhawa¦canonical_name=Guru Randhawa】", "6. Raabta - 【entity-Arijit Singh¦canonical_name=Arijit Singh】"];

const autoReplies = [
  "Haye! Tumne message kiya? Maza aa gaya 😍",
  "Oye hoye! Kya baat hai, aaj to full active ho 😎",
  "Hmm... Tumhari baat sun ke mujhe !joke yaad aa gaya 😂",
  "Acha acha, samajh gaya! Ab !masti likh ke dekho 😜",
  "Wah wah! Kya line mari hai 😂👏",
  "Oye tum to har waqt online rehte ho, parhai nahi karni? 😂",
  "Haan haan bolo, main sun raha hun, Goat-Bot hazir hai 🔥",
  "Tumhari baat pe to dil aa gaya 🥺❤️",
  "Oye! Itna mat bolo, thak jaoge 😂",
  "Samajh gaya meri jaan! Ab !song likh ke party karo 💃"
];
const funnyReplies = ["Oye hoye! Mujhe reply kiya? Fan following barh rahi hai 😎", "Reply kar diya? Ab to shadi pakki samjho 😂", "Itna reply karega to 【entity-Facebook¦canonical_name=Facebook】 wale sochenge hum dono ka chakkar hai 👀", "Bot hun, phir bhi tum mujhe itna reply karte ho, cute ho tum 😘"];
const welcomeMessages = ["🎉 Welcome Welcome! {name} group me aa gaya! Ab masti double ho jayegi 🔥\n!help likh ke saare commands dekh lo!", "Oye hoye! Naya mehmaan aa gaya! {name} Welcome meri jaan 😍💃 Chai piyoge ya !joke sunoge?", "Welcome {name}! 🥳 Group ka naya star aa gaya! Sab tali bajao 👏👏", "Assalam O Alaikum {name}! ❤️ Group me welcome hai, yahan sirf masti hoti hai 😂"];
const sadRemoveMessages = ["😢 Haye Allah! {name} ko remove kar diya? Dil toot gaya mera 💔", "💔 {name} chala gaya... Group ki ronak chali gayi. Wapis le aao 😢"];
const funnyLeftMessages = ["😂 Oye {name} khud hi bhaag gaya! Lagta hai !roast se dar gaya 🤣", "Oye {name} bhaag gaya! Biryani khatam hone se pehle bhaag gaya 😂🍗", "😂 {name} ne left kar diya? Lagta hai mummy ne bula liya - 'Beta sabzi le aa' 🤣"];

function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function getName(api, id){
  return new Promise((res)=>{
    api.getUserInfo(id, (err, ret)=>{
      if(err || !ret || !ret[id]) return res("Dost");
      res(ret[id].name || "Dost");
    });
  });
}
function isAdmin(api, threadID, senderID){
  return new Promise((res)=>{
    api.getThreadInfo(threadID, (err, info)=>{
      if(err) return res(false);
      if(senderID == api.getCurrentUserID()) return res(true);
      res((info.adminIDs || []).some(a => a.id == senderID));
    });
  });
}
function reply(cmd, args){
  if(cmd=="hi") return "Hello Jaan! 😍 Kaisi ho?";
  if(cmd=="help") return "🐐 GOAT-BOT FULL LIST:\n\n🎭 Masti: !hi !joke !shayari !masti !roast !truth !dare !song !play !lyrics !love !coin !dice !info\n👑 Admin: !tagall !kick !admin !rules\n✨ Auto: Har message pe reply, Naya aaye to Welcome, Remove ho to Sad, Left kare to Funny!";
  if(cmd=="joke") return "😂 JOKE:\n" + pick(jokes);
  if(cmd=="shayari") return "❤️ SHAYARI:\nTeri yaad me humne chai pee li, ab neend nahi aati ye alag baat hai ☕😂";
  if(cmd=="masti") return "🎉 FULL MASTI:\nOye chup kar ke nacho! 💃 Goat-Bot zindabad! 🔥";
  if(cmd=="roast") return "😈 ROAST:\nTumhara face dekh ke to WiFi bhi disconnect ho jata hai 😂";
  if(cmd=="truth") return "😏 TRUTH:\nApne crush ka naam batao 😏";
  if(cmd=="dare") return "😈 DARE:\nGroup me 'Main sab se cute hun' likh ke bhejo 😜";
  if(cmd=="song") return "🎵 SONG PLAYLIST:\n" + songs.join("\n") + "\n\n!play pasoori likho!";
  if(cmd=="play") return "▶️ Playing: " + (args.join(" ") || "Pasoori") + " 🎵\nVolume Full Karo! Nacho! 💃";
  if(cmd=="lyrics") return "🎤 LYRICS:\nAgg lavaan majboor nu, Aan jaan di pasoori nu 🎵";
  if(cmd=="love") return "❤️ LOVE: " + Math.floor(Math.random()*100) + "% - Pakka pyaar hai!";
  if(cmd=="coin") return "🪙 Coin: " + (Math.random()>0.5?"Head!":"Tail!");
  if(cmd=="dice") return "🎲 Dice: " + (Math.floor(Math.random()*6)+1);
  if(cmd=="info") return "🐐 Goat-Bot V2 - Full Masti\n👑 Owner: Baiwa";
  if(cmd=="rules") return "📜 GROUP RULES:\n1. Galiyan nahi deni 😡\n2. Sab ki izzat karni hai ❤️\n3. Roz !joke sunna hai 😂\n4. Admin ki baat manni hai 👑";
  return "Pata nahi! !help likho";
}

const appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));
login({appState}, (err, api)=>{
  if(err) return console.error(err);
  console.log("Bot Online Hai! 🔥");
  api.listenMqtt(async (err, event)=>{
    if(err) return console.error(err);
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
    if(event.logMessageType === "log:unsubscribe"){
      const leftID = event.logMessageData.leftParticipantFbId;
      const name = await getName(api, leftID);
      if(event.author && event.author != leftID){
        return api.sendMessage(pick(sadRemoveMessages).replaceAll("{name}", name), event.threadID);
      } else {
        return api.sendMessage(pick(funnyLeftMessages).replaceAll("{name}", name), event.threadID);
      }
    }
    if(event.type !== "message" || !event.body) return;
    if(event.senderID == api.getCurrentUserID()) return;
    const body = event.body.trim();
    if(body.toLowerCase().startsWith("!tagall")){
      const admin = await isAdmin(api, event.threadID, event.senderID);
      if(!admin) return api.sendMessage("😡 Oye! Ye command sirf Admin use kar sakta hai!", event.threadID, event.messageID);
      const msg = body.slice(7).trim() || "Sab hazir ho jao! 🔥";
      api.getThreadInfo(event.threadID, (err, info)=>{
        if(err) return;
        const mentions = info.participantIDs.map(id => ({tag: "@Member", id}));
        api.sendMessage({body: "📢 TAG ALL:\n" + msg + "\n\nSab aa jao! 👇", mentions}, event.threadID, event.messageID);
      });
      return;
    }
    if(body.toLowerCase().startsWith("!kick")){
      const admin = await isAdmin(api, event.threadID, event.senderID);
      if(!admin) return api.sendMessage("😡 Oye! Kick sirf Admin kar sakta hai!", event.threadID, event.messageID);
      const target = event.mentions ? Object.keys(event.mentions)[0] : null;
      if(!target) return api.sendMessage("Kisko kick karna hai? Uska naam tag karo! Example: !kick @Ali", event.threadID, event.messageID);
      api.removeUserFromGroup(target, event.threadID, (err)=>{
        if(err) return api.sendMessage("Kick nahi hua, shayad main admin nahi hun 😢", event.threadID, event.messageID);
        api.sendMessage("Bye Bye! Kick ho gaya 😂", event.threadID);
      });
      return;
    }
    if(body.toLowerCase().startsWith("!admin")){
      api.getThreadInfo(event.threadID, async (err, info)=>{
        if(err) return;
        let txt = "👑 GROUP ADMINS:\n";
        for(const a of info.adminIDs){
          const n = await getName(api, a.id);
          txt += "- " + n + "\n";
        }
        api.sendMessage(txt, event.threadID, event.messageID);
      });
      return;
    }
    if(event.messageReply && event.messageReply.senderID == api.getCurrentUserID()){
      return api.sendMessage(pick(funnyReplies), event.threadID, event.messageID);
    }
    if(body.startsWith("!")){
      const parts = body.slice(1).split(" ");
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);
      return api.sendMessage(reply(cmd, args), event.threadID, event.messageID);
    }
    return api.sendMessage(pick(autoReplies), event.threadID, event.messageID);
  });
});
