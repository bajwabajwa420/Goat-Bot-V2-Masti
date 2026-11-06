// BAJWA BOT - FINAL FIXED - Sab sahi jagah pe hai
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

const autoReplies = ["Haye! Tumne message kiya? Maza aa gaya 😍", "Oye hoye! Kya baat hai, aaj to full active ho 😎", "Hmm... Tumhari baat sun ke mujhe !joke yaad aa gaya 😂", "Acha acha, samajh gaya! Ab !masti likh ke dekho 😜", "Wah wah! Kya line mari hai 😂👏", "Haan haan bolo, main sun raha hun, Bajwa Bot hazir hai 🔥", "Samajh gaya meri jaan! Ab !song likh ke party karo 💃"];
const funnyReplies = ["Oye hoye! Mujhe reply kiya? Fan following barh rahi hai 😎", "Reply kar diya? Ab to shadi pakki samjho 😂", "Itna reply karega to Facebook wale sochenge hum dono ka chakkar hai 👀"];
const welcomeMessages = ["🎉 Welcome Welcome! {name} group me aa gaya! Ab masti double ho jayegi 🔥\n!help likh ke dekho!", "Oye hoye! Naya mehmaan aa gaya! {name} Welcome meri jaan 😍💃", "Welcome {name}! 🥳 Group ka naya star aa gaya!"];
const sadRemoveMessages = ["😢 Haye Allah! {name} ko remove kar diya? Dil toot gaya mera 💔"];
const funnyLeftMessages = ["😂 Oye {name} khud hi bhaag gaya! Lagta hai !roast se dar gaya 🤣", "Oye {name} bhaag gaya! Biryani khatam hone se pehle bhaag gaya 😂🍗"];
const songs = ["1. Pasoori - 【entity-Ali Sethi¦canonical_name=Ali Sethi】", "2. Kahani Suno - 【entity-Kaifi Khalil¦canonical_name=Kaifi Khalil】", "3. Brown Munde - 【entity-AP Dhillon¦canonical_name=AP Dhillon】", "4. High Rated Gabru - 【entity-Guru Randhawa¦canonical_name=Guru Randhawa】", "5. Lahore - 【entity-Guru Randhawa¦canonical_name=Guru Randhawa】"];

function reply(cmd, args, senderName){
  if(cmd=="hi") return "Hello Jaan! 😍 Kaisi ho?";
  if(cmd=="help") return "🦁 BAJWA BOT - ALL COMMANDS 👑\n\nMasti: !hi !joke !shayari !song !play !masti !truth !dare !slap !lyrics !8ball !roast\nPyar: !love !hug !kiss !goodmorning !goodnight !sad !happy !birthday !crush !bff !cute\nGame: !coin !dice\nGroup: !admin !rules !intro !emoji !code !fact !info !queen !king !chappal !dost\nRonak: !couple !shadi !quiz !challenge !top !baji !bottle !ronak\nAdmin: !tagall !kick";
  if(cmd=="joke") return "😂 JOKE:\n" + pick(["Teacher: Late kyu aaye? Student: Sir, WhatsApp pe status dekha tha 'School Closed' 😂", "Punjabi maa: Beta 10 baje tak ghar aa jana. Beta: Maa 10 baje to party shuru hoti hai 😂"]);
  if(cmd=="shayari") return "❤️ SHAYARI:\nTeri yaad me humne chai pee li, ab neend nahi aati ye alag baat hai ☕😂";
  if(cmd=="song") return "🎵 SONG PLAYLIST:\n" + songs.join("\n");
  if(cmd=="play") return "▶️ Playing: " + (args.join(" ") || "Pasoori") + " 🎵\nVolume Full Karo! 💃";
  if(cmd=="masti") return "🎉 FULL MASTI:\nOye chup kar ke nacho! 💃 Bajwa Bot zindabad! 🔥";
  if(cmd=="truth") return "😏 TRUTH:\nApne crush ka naam batao 😏";
  if(cmd=="dare") return "😈 DARE:\nGroup me 'Main sab se cute hun' likh ke bhejo 😜";
  if(cmd=="slap") return "👋 SLAP!\n" + senderName + " ne zor ka chappal mara! 😂";
  if(cmd=="lyrics") return "🎤 LYRICS:\nAgg lavaan majboor nu, Aan jaan di pasoori nu 🎵";
  if(cmd=="8ball") return "🎱 8BALL:\n" + pick(["Bilkul haan! ✅", "Nahi yaar 😂", "Pakka! 100% 🔥"]);
  if(cmd=="roast") return "😈 ROAST:\nTumhara face dekh ke to WiFi bhi disconnect ho jata hai 😂";
  if(cmd=="love") return "❤️ LOVE: " + Math.floor(Math.random()*100) + "% - Pakka pyaar hai!";
  if(cmd=="hug") return "🤗 HUG!\n" + senderName + " ne sab ko hug diya! 🤗❤️";
  if(cmd=="kiss") return "😘 KISS!\nHayee! Sharm aa gayi 😘❤️";
  if(cmd=="goodmorning") return "🌞 GOOD MORNING!\nUth jao! Chai pee lo ☕😍";
  if(cmd=="goodnight") return "🌙 GOOD NIGHT!\nSo jao, sapno me Bajwa Bot aayega 😴😂";
  if(cmd=="sad") return "😢 SAD:\nKoi baat nahi, main hun na! ❤️🤗";
  if(cmd=="happy") return "😍 HAPPY!\nAaj to full khush ho! 🥳";
  if(cmd=="birthday") return "🎂 HAPPY BIRTHDAY!\nCake kahan hai? 🎉🎂";
  if(cmd=="crush") return "😏 CRUSH:\nTumhara crush bhi isi group me hai 😏😂";
  if(cmd=="bff") return "👯 BFF!\nTum dono pakke BFF ho! ❤️";
  if(cmd=="cute") return "🥰 CUTE!\nTum to sab se cute ho! 😍";
  if(cmd=="coin") return "🪙 Coin: " + (Math.random()>0.5?"Head!":"Tail!");
  if(cmd=="dice") return "🎲 Dice: " + (Math.floor(Math.random()*6)+1);
  if(cmd=="admin") return "👑 Admin ke liye !tagall aur !kick use karo!";
  if(cmd=="rules") return "📜 GROUP RULES:\n1. Galiyan nahi deni 😡\n2. Sab ki izzat karni hai ❤️\n3. Roz !joke sunna hai 😂";
  if(cmd=="intro") return "👋 INTRO:\nMera naam Bajwa Bot hai! 🦁 !help likh ke dekho!";
  if(cmd=="emoji") return "😂😍🔥💃🥳😎❤️👑🦁🎉";
  if(cmd=="code") return "💻 CODE:\nBot ka code 【entity-GitHub¦canonical_name=GitHub】 pe hai 😎";
  if(cmd=="fact") return "🤯 FACT:\nHansne se dil strong hota hai! 😂";
  if(cmd=="info") return "🦁 Bajwa Bot V2\n👑 Owner: Baiwa";
  if(cmd=="queen") return "👸 QUEEN:\nIs group ki Queen to tum hi ho! 👑❤️";
  if(cmd=="king") return "🤴 KING:\nIs group ka King to tum hi ho! 👑🔥";
  if(cmd=="chappal") return "🩴 CHAPPAL!\nChappal aa rahi hai, bhaag jao! 😂🩴";
  if(cmd=="dost") return "🤝 DOST:\nDosti me no sorry, no thank you! Bas masti! ❤️";
  if(cmd=="couple") return "💑 AAJ KA COUPLE:\n" + senderName + " ❤️ " + pick(["Ayesha", "Ali", "Mahnoor", "Hamza", "Fatima", "Usman"]) + "\nShadi Mubarak! 😂❤️";
  if(cmd=="shadi") return "💍 SHADI MUBARAK!\nAaj " + senderName + " ki shadi hai! 🥳\nBarat leke aao! 💃🕺";
  if(cmd=="quiz") return "🧠 QUIZ TIME!\nPakistan ka National Dish kya hai?\nA) Biryani B) Nihari C) Karahi\nJawab do!";
  if(cmd=="challenge") return "😈 CHALLENGE:\n" + pick(["Apni gallery ki 3rd photo bhejo 😈", "Apne crush ko Hi likh ke screenshot bhejo 😏", "Agle 5 min sirf emoji me baat karo 😂"]);
  if(cmd=="top") return "🏆 AAJ KA TOP:\n1. Sab se zyada bolne wala: " + senderName + " 😂\n2. Sab se cute: " + senderName + " 😍";
  if(cmd=="baji") return "🍵 OYE BAJI!\nBaji chai bana do, mehmaan aaye hain! 😂";
  if(cmd=="bottle") return "🍾 BOTTLE GAME!\nBottle ruki " + senderName + " pe!\nAb !truth ya !dare karna parega 😈";
  if(cmd=="ronak") return "🔥 RONAK LAG GAYI!\nSab hazir ho jao! 💃🕺\n!couple !shadi !quiz !challenge !bottle likh ke dekho!";
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
          return api.sendMessage("🦁 Hello! Main Bajwa Bot aa gaya! 🔥 !help likho!", event.threadID);
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
    const senderName = await getName(api, event.senderID);
    if(body.toLowerCase().startsWith("!tagall")){
      const admin = await isAdmin(api, event.threadID, event.senderID);
      if(!admin) return api.sendMessage("😡 Oye! Ye sirf Admin use kar sakta hai!", event.threadID, event.messageID);
      const msg = body.slice(7).trim() || "Sab hazir ho jao! 🔥";
      api.getThreadInfo(event.threadID, (err, info)=>{
        if(err) return;
        const mentions = info.participantIDs.map(id => ({tag: "@Member", id}));
        api.sendMessage({body: "📢 TAG ALL:\n" + msg, mentions}, event.threadID, event.messageID);
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
    if(event.messageReply && event.messageReply.senderID == api.getCurrentUserID()){
      return api.sendMessage(pick(funnyReplies), event.threadID, event.messageID);
    }
    if(body.startsWith("!")){
      const parts = body.slice(1).split(" ");
      const cmd = parts[0].toLowerCase();
      const args = parts.slice(1);
      return api.sendMessage(reply(cmd, args, senderName), event.threadID, event.messageID);
    }
    return api.sendMessage(pick(autoReplies), event.threadID, event.messageID);
  });
});
