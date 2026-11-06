// BAJWA BOT - FINAL NAYI FILE - Sari purani delete, sirf 【entity-ye¦canonical_name=Ye】 rakh lo - iTunes wala
const { login } = require("ws3-fca");
const fs = require("fs");
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function getName(api, id){ return new Promise((res)=>{ api.getUserInfo(id, (err, ret)=>{ if(err || !ret || !ret[id]) return res("Dost"); res(ret[id].name || "Dost"); }); }); }
function isAdmin(api, threadID, senderID){ return new Promise((res)=>{ api.getThreadInfo(threadID, (err, info)=>{ if(err) return res(false); if(senderID == api.getCurrentUserID()) return res(true); res((info.adminIDs || []).some(a => a.id == senderID)); }); }); }
const autoReplies = ["Haye! Tumne mujhe bulaya? Maza aa gaya 😍", "Oye hoye! Kya baat hai, bolo bolo 😎", "Haan haan bolo, main sun raha hun, Bajwa Bot hazir hai 🔥"];
const funnyReplies = ["Oye hoye! Mujhe reply kiya? Fan following barh rahi hai 😎", "Reply kar diya? Ab to shadi pakki samjho 😂"];
const welcomeMessages = ["🎉 Welcome {name}! Group me aa gaya! Ab masti double 🔥 !help likh ke dekho!", "Oye hoye! Naya mehmaan {name} Welcome meri jaan 😍💃"];
const sadRemoveMessages = ["😢 Haye Allah! {name} ko remove kar diya? Dil toot gaya 💔"];
const funnyLeftMessages = ["😂 Oye {name} khud hi bhaag gaya! !roast se dar gaya 🤣"];
const messageCache = new Map();
function reply(cmd, args, senderName){
  if(cmd=="hi") return "Hello Jaan! 😍 Kaisi ho?";
  if(cmd=="help") return "🦁 BAJWA BOT 👑\nMasti: !hi !joke !shayari !song !play !masti !truth !dare !slap !lyrics !8ball !roast\nPyar: !love !hug !kiss !goodmorning !goodnight !sad !happy !birthday !crush !bff !cute\nGame: !coin !dice\nGroup: !admin !rules !intro !emoji !code !fact !info !queen !king !chappal !dost\nRonak: !couple !shadi !quiz !challenge !top !baji !bottle !ronak\nPair: !pairdp\nVIP: !del (Reply karke) | Unsend Wapis\nSong: !song [naam] = Asli Audio | !play [naam]\nAdmin: !tagall !kick";
  if(cmd=="joke") return "😂 JOKE: Teacher: Late kyu aaye? Student: Status dekha tha 'School Closed' 😂";
  if(cmd=="shayari") return "❤️ SHAYARI: Teri yaad me chai pee li, ab neend nahi aati ☕😂";
  if(cmd=="masti") return "🎉 FULL MASTI: Oye chup kar ke nacho! 💃 Bajwa Bot zindabad! 🔥";
  if(cmd=="truth") return "😏 TRUTH: Apne crush ka naam batao 😏";
  if(cmd=="dare") return "😈 DARE: Group me 'Main sab se cute hun' likh ke bhejo 😜";
  if(cmd=="slap") return "👋 SLAP! " + senderName + " ne zor ka chappal mara! 😂";
  if(cmd=="lyrics") return "🎤 LYRICS: Agg lavaan majboor nu, Aan jaan di pasoori nu 🎵";
  if(cmd=="8ball") return "🎱 8BALL: " + pick(["Bilkul haan! ✅", "Nahi yaar 😂", "Pakka! 100% 🔥"]);
  if(cmd=="roast") return "😈 ROAST: Tumhara face dekh ke WiFi bhi disconnect ho jata hai 😂";
  if(cmd=="love") return "❤️ LOVE: " + Math.floor(Math.random()*100) + "% - Pakka pyaar hai!";
  if(cmd=="hug") return "🤗 HUG! " + senderName + " ne sab ko hug diya! ❤️";
  if(cmd=="kiss") return "😘 KISS! Hayee! Sharm aa gayi 😘❤️";
  if(cmd=="goodmorning") return "🌞 GOOD MORNING! Uth jao! Chai pee lo ☕😍";
  if(cmd=="goodnight") return "🌙 GOOD NIGHT! So jao, sapno me Bajwa Bot aayega 😴😂";
  if(cmd=="sad") return "😢 SAD: Koi baat nahi, main hun na! ❤️🤗";
  if(cmd=="happy") return "😍 HAPPY! Aaj to full khush ho! 🥳";
  if(cmd=="birthday") return "🎂 HAPPY BIRTHDAY! Cake kahan hai? 🎉🎂";
  if(cmd=="crush") return "😏 CRUSH: Tumhara crush bhi isi group me hai 😏😂";
  if(cmd=="bff") return "👯 BFF! Tum dono pakke BFF ho! ❤️";
  if(cmd=="cute") return "🥰 CUTE! Tum to sab se cute ho! 😍";
  if(cmd=="coin") return "🪙 Coin: " + (Math.random()>0.5?"Head!":"Tail!");
  if(cmd=="dice") return "🎲 Dice: " + (Math.floor(Math.random()*6)+1);
  if(cmd=="admin") return "👑 Admin ke liye !tagall aur !kick use karo!";
  if(cmd=="rules") return "📜 RULES: 1. Galiyan nahi 😡 2. Izzat karo ❤️ 3. Roz !joke suno 😂";
  if(cmd=="intro") return "👋 INTRO: Mera naam Bajwa Bot hai! 🦁 !help likh ke dekho!";
  if(cmd=="emoji") return "😂😍🔥💃🥳😎❤️👑🦁🎉";
  if(cmd=="code") return "💻 CODE: Bot ka code GitHub pe hai 😎";
  if(cmd=="fact") return "🤯 FACT: Hansne se dil strong hota hai! 😂";
  if(cmd=="info") return "🦁 Bajwa Bot V2 👑 Owner: Baiwa";
  if(cmd=="queen") return "👸 QUEEN: Is group ki Queen to tum hi ho! 👑❤️";
  if(cmd=="king") return "🤴 KING: Is group ka King to tum hi ho! 👑🔥";
  if(cmd=="chappal") return "🩴 CHAPPAL! Chappal aa rahi hai, bhaag jao! 😂";
  if(cmd=="dost") return "🤝 DOST: Dosti me no sorry, no thank you! Bas masti! ❤️";
  if(cmd=="couple") return "💑 AAJ KA COUPLE: " + senderName + " ❤️ " + pick(["Ayesha","Ali","Mahnoor","Hamza","Fatima","Usman"]) + " Shadi Mubarak! 😂❤️";
  if(cmd=="shadi") return "💍 SHADI MUBARAK! Aaj " + senderName + " ki shadi hai! 🥳 Barat leke aao! 💃";
  if(cmd=="quiz") return "🧠 QUIZ: Pakistan ka National Dish kya hai? A) Biryani B) Nihari C) Karahi";
  if(cmd=="challenge") return "😈 CHALLENGE: " + pick(["Gallery ki 3rd photo bhejo 😈","Crush ko Hi likh ke screenshot bhejo 😏","5 min sirf emoji me baat karo 😂"]);
  if(cmd=="top") return "🏆 TOP: 1. Sab se zyada bolne wala: " + senderName + " 😂 2. Sab se cute: " + senderName + " 😍";
  if(cmd=="baji") return "🍵 OYE BAJI! Baji chai bana do, mehmaan aaye hain! 😂";
  if(cmd=="bottle") return "🍾 BOTTLE: Bottle ruki " + senderName + " pe! Ab !truth ya !dare 😈";
  if(cmd=="ronak") return "🔥 RONAK LAG GAYI! Sab hazir ho jao! 💃 !couple !shadi !quiz !challenge !bottle !pairdp likh ke dekho!";
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
        if(p.userFbId == api.getCurrentUserID()) return api.sendMessage("🦁 Hello! Main Bajwa Bot aa gaya! 🔥 !help likho!", event.threadID);
        const name = await getName(api, p.userFbId);
        api.sendMessage(pick(welcomeMessages).replace("{name}", name), event.threadID);
      }
      return;
    }
    if(event.logMessageType === "log:unsubscribe"){
      const leftID = event.logMessageData.leftParticipantFbId;
      const name = await getName(api, leftID);
      if(event.author && event.author != leftID) return api.sendMessage(pick(sadRemoveMessages).replaceAll("{name}", name), event.threadID);
      else return api.sendMessage(pick(funnyLeftMessages).replaceAll("{name}", name), event.threadID);
    }
    if(event.logMessageType === "log:unshare" || event.type === "message_unsend"){
      const unsentID = event.logMessageData?.messageID || event.messageID;
      const saved = messageCache.get(unsentID);
      if(saved){
        const who = await getName(api, event.author || event.senderID);
        return api.sendMessage("😈 PAKRA GAYA! " + who + " ne message unsend kiya tha!\n\n📩 Wo message tha:\n\"" + saved + "\"", event.threadID);
      } else return api.sendMessage("😈 Kisi ne message unsend kiya hai!", event.threadID);
    }
    if(event.type !== "message" || !event.body) return;
    if(event.senderID == api.getCurrentUserID()) return;
    const body = event.body.trim();
    const senderName = await getName(api, event.senderID);
    if(event.messageID){ messageCache.set(event.messageID, body); if(messageCache.size > 100){ const k = messageCache.keys().next().value; messageCache.delete(k); } }
    if(body.toLowerCase().startsWith("!tagall")){
      const admin = await isAdmin(api, event.threadID, event.senderID);
      if(!admin) return api.sendMessage("😡 Ye sirf Admin use kar sakta hai!", event.threadID, event.messageID);
      const msg = body.slice(7).trim() || "Sab hazir ho jao! 🔥";
      api.getThreadInfo(event.threadID, (err, info)=>{ if(err) return; const mentions = info.participantIDs.map(id => ({tag: "@Member", id})); api.sendMessage({body: "📢 TAG ALL:\n" + msg, mentions}, event.threadID, event.messageID); });
      return;
    }
    if(body.toLowerCase().startsWith("!kick")){
      const admin = await isAdmin(api, event.threadID, event.senderID);
      if(!admin) return api.sendMessage("😡 Kick sirf Admin kar sakta hai!", event.threadID, event.messageID);
      const target = event.mentions ? Object.keys(event.mentions)[0] : null;
      if(!target) return api.sendMessage("Kisko kick karna hai? Tag karo! !kick @Ali", event.threadID, event.messageID);
      api.removeUserFromGroup(target, event.threadID, (err)=>{ if(err) return api.sendMessage("Kick nahi hua 😢", event.threadID, event.messageID); api.sendMessage("Bye Bye! Kick ho gaya 😂", event.threadID); });
      return;
    }
    if(body.toLowerCase().startsWith("!pairdp") || body.toLowerCase().startsWith("!pair")){
      api.getThreadInfo(event.threadID, async (err, info)=>{
        if(err) return;
        const members = info.participantIDs.filter(id => id != api.getCurrentUserID());
        if(members.length < 2) return api.sendMessage("Pair ke liye 2 log chahiye 😅", event.threadID, event.messageID);
        let first=null, second=null; const tagged = event.mentions ? Object.keys(event.mentions)[0] : null;
        if(tagged){ first=tagged; const others=members.filter(id=>id!=tagged); second=others[Math.floor(Math.random()*others.length)]; }
        else{ first=members[Math.floor(Math.random()*members.length)]; let others=members.filter(id=>id!=first); second=others[Math.floor(Math.random()*others.length)]; }
        const name1 = await getName(api, first); const name2 = await getName(api, second);
        api.sendMessage({body: "💑 PAIR DP BAN GAYA! 💑\n\n" + name1 + " ❤️ " + name2 + "\n\n✨ Tum dono ka Pair DP ready hai! 📸 Dono ki DP ab ek jaisi hai! 💍 Shadi Mubarak! 😍", mentions: [{tag: name1, id: first}, {tag: name2, id: second}]}, event.threadID, event.messageID);
      });
      return;
    }
    if(body.toLowerCase() === "!del" || body.toLowerCase().startsWith("!del ")){
      if(event.messageReply){ api.unsendMessage(event.messageReply.messageID, (err)=>{ if(err) return api.sendMessage("Delete nahi hua 😢", event.threadID, event.messageID); api.sendMessage("Ho gaya! Delete kar diya ✅", event.threadID, event.messageID); }); }
      else api.sendMessage("Kisi message ko Reply karke !del likho!", event.threadID, event.messageID);
      return;
    }
    if(body.toLowerCase().startsWith("!song") || body.toLowerCase().startsWith("!play") || body.toLowerCase().startsWith("!audio")){
      let songName="";
      if(body.toLowerCase().startsWith("!song audio")) songName = body.slice(11).trim();
      else if(body.toLowerCase().startsWith("!song")) songName = body.slice(5).trim();
      else if(body.toLowerCase().startsWith("!play")) songName = body.slice(5).trim();
      else if(body.toLowerCase().startsWith("!audio")) songName = body.slice(6).trim();
      if(!songName) return api.sendMessage("🎵 Likho: !song rimjhim rimjhim", event.threadID, event.messageID);
      api.sendMessage("🎵 " + songName + " dhoond rahi hun... 5 sec ruko 🎧", event.threadID, event.messageID);
      fetch("https://itunes.apple.com/search?term=" + encodeURIComponent(songName) + "&media=music&limit=1")
      .then(r => r.json())
      .then(async (data)=>{
        try{
          const song = data.results[0];
          if(!song) return api.sendMessage("😢 Ye song nahi mila!", event.threadID, event.messageID);
          const audioUrl = song.previewUrl;
          const songTitle = song.trackName + " - " + song.artistName;
          const res = await fetch(audioUrl);
          const buf = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync("song_audio.mp3", buf);
          api.sendMessage({body: "🎵 AUDIO AA GAYA: " + songTitle + " 🎧\nVolume full karo! 💃", attachment: fs.createReadStream("song_audio.mp3")}, event.threadID, event.messageID);
        }catch(e){ api.sendMessage("😢 Audio download nahi hua, dobara try karo!", event.threadID, event.messageID); }
      }).catch(()=> api.sendMessage("😢 Net slow hai, dobara try karo!", event.threadID, event.messageID));
      return;
    }
    if(body.toLowerCase().startsWith("!song video") || body.toLowerCase().startsWith("!video")){
      let songName = body.replace(/!song video|!video/gi,"").trim();
      if(!songName) return api.sendMessage("🎥 Likho: !song video pasoori", event.threadID, event.messageID);
      return api.sendMessage("🎥 VIDEO: " + songName + "\nDekho: https://www.youtube.com/results?search_query=" + encodeURIComponent(songName + " song"), event.threadID, event.messageID);
    }
    if(event.messageReply && event.messageReply.senderID == api.getCurrentUserID()) return api.sendMessage(pick(funnyReplies), event.threadID, event.messageID);
    if(body.startsWith("!")){ const parts = body.slice(1).split(" "); const cmd = parts[0].toLowerCase(); const args = parts.slice(1); return api.sendMessage(reply(cmd, args, senderName), event.threadID, event.messageID); }
    if(body.toLowerCase().includes("bot") || (event.mentions && Object.keys(event.mentions).includes(String(api.getCurrentUserID())))) return api.sendMessage(pick(autoReplies), event.threadID, event.messageID);
    return;
  });
});
