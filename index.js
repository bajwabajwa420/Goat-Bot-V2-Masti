// BAJWA BOT - PART 1
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
  if(cmd=="help") return "🦁 BAJWA BOT 👑\nMasti: !hi !joke !shayari !song !play !masti !truth !dare !slap !lyrics !8ball !roast\nPyar: !love !hug !kiss !goodmorning !goodnight !sad !happy !birthday !crush !bff !cute\nGame: !coin !dice\nGroup: !admin !rules !intro !emoji !code !fact !info !queen !king !chappal !dost\nRonak: !couple !shadi !quiz !challenge !top !baji !bottle !ronak\nPair: !pairdp\nVIP: !del | Unsend Wapis\nSong: !song [naam] = Audio\nAdmin: !tagall !kick";
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
