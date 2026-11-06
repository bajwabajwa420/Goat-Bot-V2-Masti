// BAJWA BOT - ALL 40 COMMANDS + Admin + Welcome + Har Message Reply
// Kuch delete nahi kiya - Purane 40 + Naye sab ek saath
const { login } = require("ws3-fca");
const fs = require("fs");

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

const autoReplies = ["Haye! Tumne message kiya? Maza aa gaya 😍", "Oye hoye! Kya baat hai, aaj to full active ho 😎", "Hmm... Tumhari baat sun ke mujhe !joke yaad aa gaya 😂", "Acha acha, samajh gaya! Ab !masti likh ke dekho 😜", "Wah wah! Kya line mari hai 😂👏", "Oye tum to har waqt online rehte ho, parhai nahi karni? 😂", "Haan haan bolo, main sun raha hun, Bajwa Bot hazir hai 🔥", "Tumhari baat pe to dil aa gaya 🥺❤️", "Oye! Itna mat bolo, thak jaoge 😂", "Samajh gaya meri jaan! Ab !song likh ke party karo 💃"];
const funnyReplies = ["Oye hoye! Mujhe reply kiya? Fan following barh rahi hai 😎", "Reply kar diya? Ab to shadi pakki samjho 😂", "Itna reply karega to 【entity-Facebook¦canonical_name=Facebook】 wale sochenge hum dono ka chakkar hai 👀", "Bot hun, phir bhi tum mujhe itna reply karte ho, cute ho tum 😘"];
const welcomeMessages = ["🎉 Welcome Welcome! {name} group me aa gaya! Ab masti double ho jayegi 🔥\n!help likh ke saare commands dekh lo!", "Oye hoye! Naya mehmaan aa gaya! {name} Welcome meri jaan 😍💃 Chai piyoge ya !joke sunoge?", "Welcome {name}! 🥳 Group ka naya star aa gaya! Sab tali bajao 👏👏", "Assalam O Alaikum {name}! ❤️ Group me welcome hai, yahan sirf masti hoti hai 😂"];
const sadRemoveMessages = ["😢 Haye Allah! {name} ko remove kar diya? Dil toot gaya mera 💔", "💔 {name} chala gaya... Group ki ronak chali gayi. Wapis le aao 😢"];
const funnyLeftMessages = ["😂 Oye {name} khud hi bhaag gaya! Lagta hai !roast se dar gaya 🤣", "Oye {name} bhaag gaya! Biryani khatam hone se pehle bhaag gaya 😂🍗", "😂 {name} ne left kar diya? Lagta hai mummy ne bula liya - 'Beta sabzi le aa' 🤣"];

const songs = ["1. Pasoori - 【entity-Ali Sethi¦canonical_name=Ali Sethi】", "2. Kahani Suno - 【entity-Kaifi Khalil¦canonical_name=Kaifi Khalil】", "3. Brown Munde - 【entity-AP Dhillon¦canonical_name=AP Dhillon】", "4. High Rated Gabru - 【entity-Guru Randhawa¦canonical_name=Guru Randhawa】", "5. Lahore - 【entity-Guru Randhawa¦canonical_name=Guru Randhawa】", "6. Raabta - 【entity-Arijit Singh¦canonical_name=Arijit Singh】"];

function reply(cmd, args, senderName){
  // ===== MASTI - 12 =====
  if(cmd=="hi") return "Hello Jaan! 😍 Kaisi ho?";
  if(cmd=="help") return "🦁 BAJWA BOT - ALL 40 COMMANDS 👑\n\nMasti:\n!hi !joke !shayari !song !play <gaana> !masti !truth !dare !slap !lyrics !8ball !roast\n\nPyar:\n!love !hug !kiss !goodmorning !goodnight !sad !happy !birthday !crush !bff !cute\n\nGame:\n!coin !dice\n\nGroup:\n!admin !rules !intro !emoji !code !fact !info !queen !king !chappal !dost\n\nAdmin Naye:\n!tagall !kick\n\nOr:\nBot likho, @Pinky tag karo, Emoji bhejo!";
  if(cmd=="joke") return "😂 JOKE:\n" + pick(["Teacher: Late kyu aaye? Student: Sir, 【entity-WhatsApp¦canonical_name=WhatsApp】 pe status dekha tha 'School Closed' 😂", "Punjabi maa: Beta 10 baje tak ghar aa jana. Beta: Maa 10 baje to party shuru hoti hai 😂", "Biwi: Suno ji, main moti lag rahi hun? Shohar: Nahi to. Biwi: Jhoot mat bolo! Shohar: Acha moti lag rahi ho 😂"]);
  if(cmd=="shayari") return "❤️ SHAYARI:\nTeri yaad me humne chai pee li, ab neend nahi aati ye alag baat hai ☕😂";
  if(cmd=="song") return "🎵 SONG PLAYLIST:\n" + songs.join("\n") + "\n\n!play pasoori likho!";
  if(cmd=="play") return "▶️ Playing: " + (args.join(" ") || "Pasoori") + " 🎵\nVolume Full Karo! Nacho! 💃";
  if(cmd=="masti") return "🎉 FULL MASTI:\nOye chup kar ke nacho! 💃 Bajwa Bot zindabad! 🔥";
  if(cmd=="truth") return "😏 TRUTH:\nApne crush ka naam batao 😏";
  if(cmd=="dare") return "😈 DARE:\nGroup me 'Main sab se cute hun' likh ke bhejo 😜";
  if(cmd=="slap") return "👋 SLAP!\n" + senderName + " ne zor ka chappal mara! 😂👋";
  if(cmd=="lyrics") return "🎤 LYRICS:\nAgg lavaan majboor nu, Aan jaan di pasoori nu 🎵";
  if(cmd=="8ball") return "🎱 8BALL:\n" + pick(["Bilkul haan! ✅", "Nahi yaar, rehne do 😂", "Pakka! 100% 🔥", "Shayad... 50-50 hai 😜"]);
  if(cmd=="roast") return "😈 ROAST:\nTumhara face dekh ke to WiFi bhi disconnect ho jata hai 😂";
  // ===== PYAR - 11 =====
  if(cmd=="love") return "❤️ LOVE: " + Math.floor(Math.random()*100) + "% - Pakka pyaar hai!";
  if(cmd=="hug") return "🤗 HUG!\n" + senderName + " ne sab ko pyaara sa hug diya! 🤗❤️";
  if(cmd=="kiss") return "😘 KISS!\nHayee! Sharm aa gayi 😘❤️";
  if(cmd=="goodmorning") return "🌞 GOOD MORNING!\nSubah ho gayi, uth jao! Chai pee lo ☕😍";
  if(cmd=="goodnight") return "🌙 GOOD NIGHT!\nSo jao, sapno me Bajwa Bot aayega 😴😂";
  if(cmd=="sad") return "😢 SAD:\nKoi baat nahi, main hun na! Dil chota mat karo ❤️🤗";
  if(cmd=="happy") return "😍 HAPPY!\nAaj to full khush ho! Aise hi raho! 🥳";
  if(cmd=="birthday") return "🎂 HAPPY BIRTHDAY!\nCake kahan hai? Party to banti hai! 🎉🎂";
  if(cmd=="crush") return "😏 CRUSH:\nTumhara crush bhi isi group me hai, naam nahi lunga 😏😂";
  if(cmd=="bff") return "👯 BFF!\nTum dono to pakke BFF ho! Dosti zindabad! ❤️";
  if(cmd=="cute") return "🥰 CUTE!\nTum to sab se cute ho! Koi shak? 😍";
  // ===== GAME - 2 =====
  if(cmd=="coin") return "🪙 Coin: " + (Math.random()>0.5?"Head!":"Tail!");
  if(cmd=="dice") return "🎲 Dice: " + (Math.floor(Math.random()*6)+1);
  // ===== GROUP - 11 =====
  if(cmd=="admin") return "👑 Admin ke liye !tagall aur !kick use karo, ye list ke liye hai - Group ke admin se poocho!";
  if(cmd=="rules") return "📜 GROUP RULES:\n1. Galiyan nahi deni 😡\n2. Sab ki izzat karni hai ❤️\n3. Roz !joke sunna hai 😂\n4. Admin ki baat manni hai 👑";
  if(cmd=="intro") return "👋 INTRO:\nMera naam Bajwa Bot hai! 🦁 Main masti, gaane, roast sab karta hun! !help likh ke dekho!";
  if(cmd=="emoji") return "😂😍🔥💃🥳😎❤️👑🦁🎉 - Emoji hi emoji!";
  if(cmd=="code") return "💻 CODE:\nBot ka code GitHub pe hai, owner se poocho 😎";
  if(cmd=="fact") return "🤯 FACT:\nTumhe pata hai? Hansne se dil strong hota hai! Is liye !joke roz suno 😂";
  if(cmd=="info") return "🦁 Bajwa Bot V2 - All 40 Commands\n👑 Owner: Baiwa";
  if(cmd=="queen") return "👸 QUEEN:\nIs group ki Queen to tum hi ho! 👑❤️";
  if(cmd=="king") return "🤴 KING:\nIs group ka King to tum hi ho! 👑🔥";
  if(cmd=="chappal") return "🩴 CHAPPAL!\nChappal aa rahi hai, bhaag jao! 😂🩴";
  if(cmd=="dost") return "🤝 DOST:\nDosti me no sorry, no thank you! Bas masti! ❤️";
  return "Pata nahi! !help likho";
}

const appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));
login({appState}, (err, api)=>{
  if(err) return console.error(err);
  console.log("Bot Online Hai! 🔥");
  api.listenMqtt(async (err, event)=>{
    if(err) return console.error(err);
    // WELCOME
    if(event.logMessageType === "log:subscribe"){
      const added = event.logMessageData.addedParticipants || [];
      for(const p of added){
        if(p.userFbId == api.getCurrentUserID()){
          return api.sendMessage("🦁 Hello Hello! Main Bajwa Bot aa gaya! 🔥 Ab full masti hogi! !help likho!", event.threadID);
        }
        const name = await getName(api, p.userFbId);
        api.sendMessage(pick(welcomeMessages).replace("{name}", name), event.threadID);
      }
      return;
    }
    // REMOVE SAD / LEFT FUNNY
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
    const senderName = await getName(api, event.senderID);

    // BOT LIKHO YA TAG KARO TO REPLY
    if(body.toLowerCase().includes("bot") || (event.mentions && Object.keys(event.mentions).includes(String(api.getCurrentUserID())))){
      if(!body.startsWith("!")) return api.sendMessage("Haan ji bolo meri jaan! 😍 Main hazir hun! !help likho!", event.threadID, event.messageID);
    }

    // ADMIN - TAGALL / KICK
    if(body.toLowerCase().startsWith("!tagall")){
      const admin = await isAdmin(api, event.threadID, event.senderID);
      if(!admin) return api.sendMessage("😡 Oye! Ye sirf Admin use kar sakta hai!", event.threadID, event.messageID);
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
      if(!target) return api.sendMessage("Kisko kick karna hai? Tag karo! Example: !kick @Ali", event.threadID, event.messageID);
      api.removeUserFromGroup(target, event.threadID, (err)=>{
        if(err) return api.sendMessage("Kick nahi hua, shayad main admin nahi hun 😢", event.threadID, event.messageID);
        api.sendMessage("Bye Bye! Kick ho gaya 😂", event.threadID);
      });
      return;
    }

    // BOT KO REPLY KARE TO FUNNY
    if(event.messageReply && event.messageReply.senderID == api.getCurrentUserID()){
      return api.sendMessage(pick(funnyReplies), event.threadID, event.messageID);
    }
    // COMMANDS 40
    if(body.startsWith("!")){
      const parts = body.slice(1).split(" ");
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);
      return api.sendMessage(reply(cmd, args, senderName), event.threadID, event.messageID);
    }
    // HAR MESSAGE KA REPLY
    return api.sendMessage(pick(autoReplies), event.threadID, event.messageID);
  });
});
