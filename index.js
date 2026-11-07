// BAJWA BOT - FULL BARA WALA - M4A Fix - Crash nahi hoga, ffmpeg nahi chahiye
const { login } = require("ws3-fca");
const fs = require("fs");
const { exec } = require("child_process");
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function getName(api, id){ return new Promise((res)=>{ api.getUserInfo(id, (err, ret)=>{ if(err || !ret || !ret[id]) return res("Dost"); res(ret[id].name || "Dost"); }); }); }
function isAdmin(api, threadID, senderID){ return new Promise((res)=>{ api.getThreadInfo(threadID, (err, info)=>{ if(err) return res(false); if(senderID == api.getCurrentUserID()) return res(true); res((info.adminIDs || []).some(a => a.id == senderID)); }); }); }
const autoReplies = ["Haye! Tumne mujhe bulaya? Maza aa gaya 😍", "Oye hoye! Kya baat hai, bolo bolo 😎", "Haan haan bolo, main sun raha hun, Bajwa Bot hazir hai 🔥", "Bolo Jaan! Kya hukam hai? 👑"];
const funnyReplies = ["Oye hoye! Mujhe reply kiya? Fan following barh rahi hai 😎", "Reply kar diya? Ab to shadi pakki samjho 😂", "Hayee! Reply de diya, dil khush kar diya ❤️"];
const welcomeMessages = ["🎉 Welcome {name}! Group me aa gaya! Ab masti double 🔥 !help likh ke dekho!", "Oye hoye! Naya mehmaan {name} Welcome meri jaan 😍💃", "🔥 {name} aa gaya! Ab ronak lag jayegi! 💃 !ronak likho!"];
const sadRemoveMessages = ["😢 Haye Allah! {name} ko remove kar diya? Dil toot gaya 💔", "😭 {name} ko nikal diya? Bohat bura hua! 💔"];
const funnyLeftMessages = ["😂 Oye {name} khud hi bhaag gaya! !roast se dar gaya 🤣", "🏃 {name} bhaag gaya! Pakro isko! 😂"];
const messageCache = new Map();
function reply(cmd, args, senderName){
  const argText = args.join(" ");
  if(cmd=="hi") return "Hello Jaan! 😍 Kaisi ho? !help likh ke dekho, 100 command hain!";
  if(cmd=="hello") return "Hello Hello! 😍 Kya haal hai? ❤️";
  if(cmd=="hey") return "Hey Hey! Bolo bolo! 😎🔥";
  if(cmd=="help") return "🦁 BAJWA BOT - FULL LIST 👑\n\n🤖 AI: !ai !gpt !ask !imagine\n🎵 SONG: !song !play !audio !video !lyrics\n😂 MASTI: !hi !joke !shayari !masti !truth !dare !slap !8ball !roast !meme !poetry !attitude !punjabi !status\n❤️ PYAR: !love !hug !kiss !goodmorning !goodnight !sad !happy !birthday !crush !bff !cute !ship !pairdp\n🎲 GAME: !coin !dice !quiz !challenge !bottle\n👑 GROUP: !admin !rules !intro !emoji !code !fact !info !queen !king !chappal !dost !rank !dp !pfp\n🔥 RONAK: !couple !shadi !quiz !challenge !top !baji !bottle !ronak !dance !sing !fight\n🛠️ TOOLS: !weather !translate !news !time !date !calc !ai\n👑 ADMIN: !tagall !kick !warn\n💎 VIP: !del (Reply karke) | Unsend Wapis\n\nSab likh ke dekho! 100+ hain! 🔥";
  if(cmd=="info") return "🦁 Bajwa Bot V2 - FULL 👑\nOwner: Baiwa\nVersion: Goat-Bot-V2-Masti FULL\nCommands: 100+\nStatus: Online 🔥";
  if(cmd=="owner") return "👑 Mera Owner Baiwa hai! Sab se best! 🔥❤️";
  if(cmd=="bot") return "Haan bolo! Main Bajwa Bot hun! 🦁 !help likho!";
  if(cmd=="uptime") return "🔥 Main abhi Online hun! Kab se? Jab se tumne chalaya hai! 😎";
  if(cmd=="ping") return "🏓 Pong! Main zinda hun! Speed: Full Tez! 🔥";
  if(cmd=="ai"||cmd=="gpt"||cmd=="ask") {
    if(!argText) return "🤖 AI: Poochho kuch! Likho: !ai tum kon ho?";
    const q = argText.toLowerCase();
    if(q.includes("kon ho")||q.includes("kaun ho")) return "🤖 Main Bajwa Bot hun! Baiwa ne banaya hai! 🦁🔥";
    if(q.includes("kaisi")||q.includes("kaisa")) return "🤖 Main bilkul theek hun! Tum sunao, kaisi ho? 😍";
    if(q.includes("pyaar")||q.includes("love")) return "🤖 Pyaar? Pyaar to andha hota hai, lekin tum to dikh rahi ho! 😍😂";
    if(q.includes("song")||q.includes("gaana")) return "🤖 Gaana sunna hai? !song likh ke naam likho! 🎵";
    if(q.includes("maza")||q.includes("bore")) return "🤖 Bore ho rahi ho? !ronak likho, full maza aayega! 💃🔥";
    if(q.includes("shadi")) return "🤖 Shadi? Pehle !couple likh ke dekho, tumhara couple kon hai! 💑😂";
    return "🤖 AI: Tumne poocha: " + argText + "\nMera jawab: Haan bilkul! Ye to bohat achi baat hai! 😍 !help likh ke aur command dekho!";
  }
  if(cmd=="imagine") { if(!argText) return "🎨 Likho: !imagine ek cute billi"; return "🎨 Imagine: " + argText + "\nWah! Kya scene hai! 😍 Agar asli photo chahiye to thora wait karo, AI bana raha hai! 🔥"; }
  if(cmd=="joke") return pick(["😂 JOKE: Teacher: Late kyu aaye? Student: Status dekha tha 'School Closed' 😂", "😂 JOKE: Biwi: Tum mujhe kabhi bahar nahi le jate! Shohar: To chalo, kachra phenk aao! 😂", "😂 JOKE: Ladka: Tumhare papa kya karte hain? Ladki: Jo tum nahi kar sakte! 😂"]);
  if(cmd=="shayari") return pick(["❤️ SHAYARI: Teri yaad me chai pee li, ab neend nahi aati ☕😂", "❤️ SHAYARI: Tum mile to laga, zindagi me ab maza aayega! 😍", "❤️ SHAYARI: Chandni raat me, teri yaad aayi, phir chai pee li, neend ur gayi! ☕😂"]);
  if(cmd=="poetry") return pick(["💔 POETRY: Dil toot gaya, phir bhi has rahe hain, kya karein, Bajwa Bot ke fan hain! 😂", "🌙 POETRY: Raat bhar teri yaad me jaage, subah uth ke phir so gaye! 😴😂"]);
  if(cmd=="attitude") return pick(["😎 ATTITUDE: Hum wo hain jo dil me rehte hain, dimaag me nahi! 🔥", "😎 ATTITUDE: Meri marzi, meri zindagi, tum kon? 😂", "👑 ATTITUDE: Queen hun, jhukna nahi aata! 👑🔥"]);
  if(cmd=="punjabi") return pick(["🔥 PUNJABI: Oye balle balle! Chak de phatte! 💃", "🔥 PUNJABI: Ki haal aa? Maza aa reha? 😍", "🔥 PUNJABI: Balle Balle! Bajwa Bot zindabad! 🔥"]);
  if(cmd=="status") return pick(["💔 STATUS: Akela hun, lekin khush hun! 😎", "😍 STATUS: Zindagi me maza tab hai, jab Bajwa Bot sath hai! 🔥", "🔥 STATUS: Log kehte hain attitude hai, hum kehte hain style hai! 😎"]);
  if(cmd=="meme") return pick(["😂 MEME: Jab mummy kehti hain 'Phone rakh do' aur tum kehte ho 'Bas 5 minute' - 2 ghante baad bhi wahi! 😂", "😂 MEME: Exam me jab kuch na aaye, to dost ko dekh ke likh lo, dost ko bhi kuch na aaye to dono fail! 😂", "😂 MEME: Jab net slow ho aur !song na chale, to dil toot jata hai! 😭😂"]);
  if(cmd=="masti") return "🎉 FULL MASTI: Oye chup kar ke nacho! 💃 Bajwa Bot zindabad! 🔥";
  if(cmd=="truth") return pick(["😏 TRUTH: Apne crush ka naam batao 😏", "😏 TRUTH: Aakhri baar kab royi thi? 😢", "😏 TRUTH: Kisi ko bina bataye uski DP dekhi hai? 😏😂"]);
  if(cmd=="dare") return pick(["😈 DARE: Group me 'Main sab se cute hun' likh ke bhejo 😜", "😈 DARE: Apne crush ko Hi likh ke screenshot bhejo 😏", "😈 DARE: 5 min sirf emoji me baat karo 😂"]);
  if(cmd=="slap") return "👋 SLAP! " + senderName + " ne zor ka chappal mara! 😂";
  if(cmd=="fight") return "🥊 FIGHT! " + senderName + " ne boxing shuru kar di! Koi bachao! 😂🔥";
  if(cmd=="dance") return "💃 DANCE! " + senderName + " nach rahi hai! Sab nacho! 💃🔥🎵";
  if(cmd=="sing") return "🎤 SING! " + senderName + " gaa rahi hai! Wah wah! 👏🎵";
  if(cmd=="lyrics") return "🎤 LYRICS: Agg lavaan majboor nu, Aan jaan di pasoori nu 🎵";
  if(cmd=="8ball") return "🎱 8BALL: " + pick(["Bilkul haan! ✅", "Nahi yaar 😂", "Pakka! 100% 🔥", "Socho mat, kar lo! 😍"]);
  if(cmd=="roast") return pick(["😈 ROAST: Tumhara face dekh ke WiFi bhi disconnect ho jata hai 😂", "😈 ROAST: Tum itni slow ho, kachua bhi tumse aage nikal jaye! 🐢😂", "😈 ROAST: Tumhari shakal dekh ke mirror bhi toot jaye! 😂"]);
  if(cmd=="love") return "❤️ LOVE: " + Math.floor(Math.random()*100) + "% - Pakka pyaar hai! " + senderName + " ❤️";
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
  if(cmd=="ship") return "💑 SHIP: " + senderName + " ❤️ " + pick(["Ayesha","Ali","Mahnoor","Hamza","Fatima","Usman","Hira","Ahmed"]) + " = " + Math.floor(Math.random()*100) + "% Match! Shadi Mubarak! 😂❤️";
  if(cmd=="dark") return "🖤 DARK: Raat ka andhera, dil ka dard, aur Bajwa Bot ka pyaar! 🖤😂";
  if(cmd=="coin") return "🪙 Coin: " + (Math.random()>0.5?"Head!":"Tail!");
  if(cmd=="dice") return "🎲 Dice: " + (Math.floor(Math.random()*6)+1);
  if(cmd=="admin") return "👑 Admin ke liye !tagall aur !kick use karo!";
  if(cmd=="rules") return "📜 RULES: 1. Galiyan nahi 😡 2. Izzat karo ❤️ 3. Roz !joke suno 😂 4. Bot ko tang nahi karna 😜";
  if(cmd=="intro") return "👋 INTRO: Mera naam Bajwa Bot hai! 🦁 !help likh ke dekho! 100+ command hain!";
  if(cmd=="emoji") return "😂😍🔥💃🥳😎❤️👑🦁🎉🤗😘🌞🌙";
  if(cmd=="code") return "💻 CODE: Bot ka code GitHub pe hai 😎 Goat-Bot-V2-Masti!";
  if(cmd=="fact") return pick(["🤯 FACT: Hansne se dil strong hota hai! 😂", "🤯 FACT: Billi din me 16 ghante soti hai! 🐱", "🤯 FACT: Pyaar me dil tez dhadakta hai! ❤️"]);
  if(cmd=="queen") return "👸 QUEEN: Is group ki Queen to tum hi ho! 👑❤️";
  if(cmd=="king") return "🤴 KING: Is group ka King to tum hi ho! 👑🔥";
  if(cmd=="chappal") return "🩴 CHAPPAL! Chappal aa rahi hai, bhaag jao! 😂";
  if(cmd=="dost") return "🤝 DOST: Dosti me no sorry, no thank you! Bas masti! ❤️";
  if(cmd=="rank") return "🏆 RANK: " + senderName + " - Level: " + Math.floor(Math.random()*100) + " | Rank: Group ka Star! ⭐🔥";
  if(cmd=="dp") return "🖼️ DP: Tumhari DP to bohat cute hai! 😍 !pairdp likh ke Pair DP banao!";
  if(cmd=="pfp") return "🖼️ PFP: " + (argText || senderName) + " ki DP dekhni hai? Uski profile kholo! 😍";
  if(cmd=="couple") return "💑 AAJ KA COUPLE: " + senderName + " ❤️ " + pick(["Ayesha","Ali","Mahnoor","Hamza","Fatima","Usman"]) + " Shadi Mubarak! 😂❤️";
  if(cmd=="shadi") return "💍 SHADI MUBARAK! Aaj " + senderName + " ki shadi hai! 🥳 Barat leke aao! 💃";
  if(cmd=="quiz") return pick(["🧠 QUIZ: Pakistan ka National Dish kya hai? A) Biryani B) Nihari C) Karahi", "🧠 QUIZ: Lahore kis darya ke kinare hai? A) Ravi B) Chenab C) Jhelum", "🧠 QUIZ: 2+2*2 kitna hota hai? A) 6 B) 8 C) 4"]);
  if(cmd=="challenge") return "😈 CHALLENGE: " + pick(["Gallery ki 3rd photo bhejo 😈","Crush ko Hi likh ke screenshot bhejo 😏","5 min sirf emoji me baat karo 😂"]);
  if(cmd=="top") return "🏆 TOP: 1. Sab se zyada bolne wala: " + senderName + " 😂 2. Sab se cute: " + senderName + " 😍 3. Sab se funny: " + senderName + " 😂";
  if(cmd=="baji") return "🍵 OYE BAJI! Baji chai bana do, mehmaan aaye hain! 😂";
  if(cmd=="bottle") return "🍾 BOTTLE: Bottle ruki " + senderName + " pe! Ab !truth ya !dare 😈";
  if(cmd=="ronak") return "🔥 RONAK LAG GAYI! Sab hazir ho jao! 💃 !couple !shadi !quiz !challenge !bottle !pairdp !meme !dance likh ke dekho!";
  if(cmd=="weather") return "🌤️ WEATHER Lahore: Aaj mausam acha hai! 28°C, halki hawa! 😍 Chaye pee lo! ☕";
  if(cmd=="translate") { if(!argText) return "🌐 Likho: !translate hello"; return "🌐 Translate: " + argText + " = Urdu me: " + argText + " (Maza aa gaya! 😂)"; }
  if(cmd=="news") return "📰 NEWS: Aaj ki bari khabar: Bajwa Bot ne 100 command ka record tor diya! 🔥🎉";
  if(cmd=="time") return "🕐 TIME: Abhi " + new Date().toLocaleTimeString("en-PK", {timeZone: "Asia/Karachi"}) + " ho raha hai! ⏰";
  if(cmd=="date") return "📅 DATE: Aaj " + new Date().toLocaleDateString("en-PK", {timeZone: "Asia/Karachi"}) + " hai! 📅";
  if(cmd=="calc") { try{ if(!argText) return "🧮 Likho: !calc 2+2"; return "🧮 CALC: " + argText + " = " + eval(argText); }catch(e){ return "🧮 Galat hisab! 😂"; } }
  if(cmd=="warn") return "⚠️ WARN: " + (argText || "Kisi ko") + " ko warn kiya gaya! Dobara aisa nahi karna! 😡";
  return "Pata nahi! !help likho, 100+ command hain!";
}
const appState = JSON.parse(fs.readFileSync("appstate.json", "utf8"));
login({appState}, (err, api)=>{
  if(err) return console.error(err);
  console.log("Bot Online Hai! 🔥 FULL WALA M4A");
  api.listenMqtt(async (err, event)=>{
    if(err) return console.error(err);
    if(event.logMessageType === "log:subscribe"){
      const added = event.logMessageData.addedParticipants || [];
      for(const p of added){
        if(p.userFbId == api.getCurrentUserID()) return api.sendMessage("🦁 Hello! Main Bajwa Bot FULL WALA aa gaya! 🔥 !help likho! 100+ command hain!", event.threadID);
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
    // ===== FULL SONG - M4A - Crash Fix - ffmpeg nahi chahiye =====
    if(body.toLowerCase().startsWith("!song") || body.toLowerCase().startsWith("!play") || body.toLowerCase().startsWith("!audio")){
      let songName="";
      if(body.toLowerCase().startsWith("!song audio")) songName = body.slice(11).trim();
      else if(body.toLowerCase().startsWith("!song")) songName = body.slice(5).trim();
      else if(body.toLowerCase().startsWith("!play")) songName = body.slice(5).trim();
      else if(body.toLowerCase().startsWith("!audio")) songName = body.slice(6).trim();
      if(!songName) return api.sendMessage("🎵 Likho: !song 12 saal", event.threadID, event.messageID);
      api.sendMessage("🎵 FULL SONG " + songName + " download ho raha hai... 30 sec ruko, poora aayega! 🎧", event.threadID, event.messageID);
      const fileName = "song_full.m4a";
      try{ fs.unlinkSync(fileName); }catch(e){}
      try{ fs.unlinkSync("song_full.mp3"); }catch(e){}
      const cmd = `python -m yt_dlp -f "bestaudio[ext=m4a]/140" -o "${fileName}" "ytsearch1:${songName} song"`;
      exec(cmd, async (err)=>{
        if(!err && fs.existsSync(fileName) && fs.statSync(fileName).size > 1000){
          try{
            return api.sendMessage({body: "🎵 FULL SONG AA GAYA: " + songName + " 🎧\nPoora song hai, maza karo! 💃🔥", attachment: fs.createReadStream(fileName)}, event.threadID, event.messageID);
          }catch(e){ console.log("Send error:", e); }
        }
        api.sendMessage("🔄 YouTube slow hai, Saavn se try kar rahi hun... 10 sec ruko!", event.threadID);
        try{
          const res = await fetch("https://saavn.dev/api/search/songs?query=" + encodeURIComponent(songName));
          const data = await res.json();
          if(!data.data || !data.data.results || !data.data.results[0]) throw new Error("no result");
          const song = data.data.results[0];
          const url = song.downloadUrl ? song.downloadUrl[song.downloadUrl.length-1].url : null;
          if(!url) throw new Error("no url");
          const r2 = await fetch(url);
          const buf = Buffer.from(await r2.arrayBuffer());
          const mp3File = "song_full.mp3";
          fs.writeFileSync(mp3File, buf);
          return api.sendMessage({body: "🎵 FULL SONG AA GAYA: " + song.name + " 🎧\nPoora song hai! 💃🔥", attachment: fs.createReadStream(mp3File)}, event.threadID, event.messageID);
        }catch(e2){
          return api.sendMessage("😢 Dono se nahi hua, net slow hai, 1 min baad dobara try karo! !song " + songName, event.threadID, event.messageID);
        }
      });
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
