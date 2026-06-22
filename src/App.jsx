import { useState, useEffect, useRef } from "react";
import { Heart, Music, Calendar, ChevronLeft, Play, Pause, Lock, Sparkles } from "lucide-react";

const BACKGROUND_IMAGE = "/achalugo.jpeg";
const MEET_DATE = new Date('2026-07-19');
const START_DATE = new Date('2026-06-11');

const getDaysArray = () => {
  const days = [];
  const diff = Math.ceil((MEET_DATE - START_DATE) / (1000 * 60 * 60 * 24));
  for (let i = 0; i < diff; i++) {
    const d = new Date(START_DATE);
    d.setDate(START_DATE.getDate() + i);
    days.push(d);
  }
  return days;
};

const DAYS = getDaysArray();  // 38 days

const MUSIC_TRACKS = [
  { title: "All About You", artist: "Runtown", url: "/music/day1.mp3" },
  { title: "The Moment I Knew", artist: "Taylor Swift", url: "/music/day2.mp3" },
  { title: "In My Head", artist: "Larry Gaaga", url: "/music/day3.mp3" },
  { title: "Leave the Door Open", artist: "Bruno Mars", url: "/music/day4.mp3" },
  { title: "Just the Way You Are", artist: "Bruno Mars", url: "/music/day5.mp3" },
  { title: "Happy", artist: "Pharrell Williams", url: "/music/day6.mp3" },
  { title: "You are the Reason", artist: "Calum Scott", url: "/music/day7.mp3" },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", url: "/music/day8.mp3" },
  { title: "I Will Always Love You", artist: "Whitney Houston", url: "/music/day9.mp3" },
  { title: "Adore You", artist: "Harry Styles", url: "/music/day10.mp3" },
  { title: "All of Me", artist: "John Legend", url: "/music/day11.mp3" },
  { title: "Die With A Smile", artist: "Lady Gaga & Bruno Mars", url: "/music/day12.mp3" },
  { title: "Lucky", artist: "Sarkodie ft Rudeboy", url: "/music/day13.mp3" },
  { title: "From the Start", artist: "Laufey", url: "/music/day14.mp3" },
  { title: "A Thousand Years", artist: "Christina Perri", url: "/music/day15.mp3" },
  { title: "Golden Hour", artist: "JVKE", url: "/music/day16.mp3" },
  { title: "Dandelions", artist: "Ruth B.", url: "/music/day17.mp3" },
  { title: "Can't Help Falling in Love", artist: "Elvis Presley", url: "/music/day18.mp3" },
  { title: "Say You Won't Let Go", artist: "James Arthur", url: "/music/day19.mp3" },
  { title: "Perfect", artist: "Ed Sheeran", url: "/music/day20.mp3" },
  { title: "Lover", artist: "Taylor Swift", url: "/music/day21.mp3" },
  { title: "Sweet Creature", artist: "Harry Styles", url: "/music/day22.mp3" },
  { title: "At Last", artist: "Etta James", url: "/music/day23.mp3" },
  { title: "La Vie en Rose", artist: "Édith Piaf", url: "/music/day24.mp3" },
  { title: "Make You Feel My Love", artist: "Adele", url: "/music/day25.mp3" },
  { title: "You Are the Best Thing", artist: "Ray LaMontagne", url: "/music/day26.mp3" },
  { title: "Endless Love", artist: "Diana Ross & Lionel Richie", url: "/music/day27.mp3" },
  { title: "Iris", artist: "Goo Goo Dolls", url: "/music/day28.mp3" },
  { title: "I'm Yours", artist: "Jason Mraz", url: "/music/day29.mp3" },
  { title: "Marry Me", artist: "Train", url: "/music/day30.mp3" },
  { title: "You & Me", artist: "Dave Matthews Band", url: "/music/day31.mp3" },
  { title: "Like I'm Gonna Lose You", artist: "Meghan Trainor ft. John Legend", url: "/music/day32.mp3" },
  { title: "Better Together", artist: "Jack Johnson", url: "/music/day33.mp3" },
  { title: "Bless the Broken Road", artist: "Rascal Flatts", url: "/music/day34.mp3" },
  { title: "You Are the Reason", artist: "Calum Scott", url: "/music/day35.mp3" },
  { title: "Speechless", artist: "Dan + Shay", url: "/music/day36.mp3" },
  { title: "Almost There", artist: "Sleeping At Last", url: "/music/day37.mp3" },
  { title: "Finally", artist: "Fergie", url: "/music/day38.mp3" },
];

const REASONS = [
  { 
    title: "All About You", 
    message: "There are people you meet and then there are people who rearrange you. You are the second kind. From the moment you came into my life, something shifted — quietly, permanently. I find myself thinking about you in the middle of ordinary things. A song comes on and it's you. I see something beautiful and I want to show you. I laugh at something and I wish you were there. This app is my attempt to put into words what I feel every single day. Thirty-eight reasons, thirty-eight songs, thirty-eight days — all of it, every single bit, is all about you." },
  { 
    title: "The Moment I knew", 
    message: "There was a specific moment — not a grand gesture, not a dramatic scene — just a quiet, ordinary instant where I looked at you and something inside me went completely still. A kind of knowing that didn't need to be explained. It wasn't falling. It was more like arriving. Like some part of me recognised you before the rest of me had caught up. I've tried to pinpoint it since, to hold it in my hands and examine it, but it slips every time. What I do know is this — that moment changed the direction of everything. And I am so grateful it did." },
  { 
    title: "I Can't Get You Out of My Head", 
    message: "I don't know when it happened exactly, but at some point you became the background of everything. I'd be in the middle of something completely unrelated — working, eating, trying to sleep — and there you'd be. Not intrusively. Just quietly present, like a song you didn't realise was playing until you catch yourself humming it. I tried to concentrate. I tried to be sensible about it. But the truth is, once you let someone like you into your mind, there is simply no going back. And somewhere along the way, I stopped trying." },
  { 
    title: "Your Presence is My Peace", 
    message: "There is a kind of peace I only find with you. Not the absence of noise — something deeper than that. The feeling that everything is exactly where it should be. I notice it most in the quiet moments. When we're not doing anything in particular, just existing in the same space, and somehow that is enough. More than enough. You have this way of making the whole world feel less urgent, less sharp. Like I can finally put things down and just breathe. I didn't know I was looking for that until I found it in you. I didn't know calm could feel this much like joy." },
  { 
    title: "You are Radiant", 
    message: "I want you to know something, and I want you to actually let it in — you are radiant. Not just in the way you look, though that alone is enough to make me forget what I was saying. I mean the kind of radiance that comes from somewhere deeper. The way your face changes when you talk about something you love. The way you carry yourself, unbothered and unhurried. The way you light up a room without ever trying to. There is something about you that draws people in, and I notice it every single time. I hope you see it too. I hope you look in the mirror and see even a fraction of what I see when I look at you." },
  { 
    title: "You Make Everything Fun", 
    message: "Nobody makes ordinary things as fun as you do. A boring Sunday afternoon that somehow becomes the best part of the week. You have this energy that turns the mundane into something worth remembering — and I genuinely don't know how you do it. I've caught myself laughing with you at things that aren't even funny, staying up way too late because the conversation refuses to end, smiling at my phone like an absolute fool because of something you said. You make the small things big. You make the ordinary feel like a gift. And being around you — even in the most unremarkable moments — is one of my favourite places to be." },
  { 
    title: "The Way You Love", 
    message: "I have never seen someone love the way you do. Fully, fiercely, without holding back. You care about me, and I feel it in everything — the way you love without keeping score. It is one of the most beautiful things I have ever witnessed. And I do not use that word lightly. To be loved by you is not something I take for granted. Not for a single day. It is a privilege I intend to honour for as long as you'll let me." },
  { 
    title: "Growing Old With You", 
    message: "I think about the future sometimes — not with anxiety, but with this quiet, warm certainty that I want you in it. I want to know what you'll be like in ten years, twenty years. What will still make you laugh. What new things you'll fall in love with. What version of yourself you'll grow into. I want to be there for all of it — the becoming, the changing, the settling into. I don't need a perfect future. I just need one with you in it. That alone makes it something worth looking forward to." },
  { 
    title: "You Are My Safe Place", 
    message: "Everyone needs somewhere they can put things down. A place where they don't have to perform or pretend or hold themselves together quite so tightly. You are that place for me. With you, I don't have to be anything other than exactly what I am — and somehow, inexplicably, that seems to be enough. You have never once made me feel like I needed to be more. That gift, quiet and consistent as it is, means more to me than I know how to say." },
  { 
    title: "How You Make Me Feel Seen", 
    message: "There is a difference between being looked at and being seen. Most people look. You see. You notice the things I don't say out loud. You pick up on the shift in my voice, the hesitation in my words, the mood I'm trying to hide behind humour. And you don't make a fuss of it — you just quietly adjust, offer a little more warmth, stay a little closer. That attentiveness is one of the most intimate things a person can offer another. And you offer it so naturally, like it costs you nothing. It costs me everything not to be undone by it." },
  { 
    title: "Your Mind Is Extraordinary", 
    message: "The way you think is one of the things I am most attracted to about you. The connections you draw between ideas, the questions you ask that nobody else thinks to ask, the way you hold complexity without needing to flatten it into something simple. Talking with you is never small. I always leave a conversation with you having seen something differently, thought about something more carefully, or laughed at something I wouldn't have noticed alone. Your mind is extraordinary. And I could spend a lifetime exploring it and still find new rooms."
  },
  {
    title: "Your strength on Hard Days", 
    message: "I have seen you on the hard days. The days when everything is heavy and the world feels like it's asking too much. And what I have seen on those days is one of the most quietly remarkable things — you don't crumble. You feel it fully, you don't pretend it isn't there, and then somehow you find your footing again. That strength is not loud or showy. It lives underneath everything, steady and sure. I admire it more than you know. And on the days when my own footing slips, the memory of yours is something I hold onto." },
  { 
    title: "The Sound of Your Laugh", 
    message: "Your laugh is not just a sound — it is an event. The real one, the one you can't control, the one that takes over your whole face and refuses to be contained. It is the most honest thing about you. There is no performance in it, no self-consciousness. It is pure, unfiltered joy, and it is absolutely contagious. I have done embarrassing things just to hear it. I will continue to do embarrassing things. It is worth every single time. If I could bottle one sound to carry with me always, it would be that one — no question." },
  { 
    title: "Your Effortless Grace", 
    message: "There is an elegance to the way you move through the world that I don't think you're even aware of. The way you hold yourself. The way you speak — choosing words with care, never in a rush. The way you enter a room and simply are, without needing to announce it. It's not something you perform. It's just something you are. And it is one of the most quietly magnetic things about you. I notice it constantly — in the small gestures, the unhurried way you do things, the ease with which you carry your own beauty." },
  { 
    title: "You Are Worth Every Mile", 
    message: "Distance is a strange thing. It takes up no physical space and yet it weighs something. But here is what I have learned about distance since you — it does not diminish. If anything, it clarifies. Every mile between us has made me more certain, not less. More sure of what this is, what it means, what I am willing to cross oceans for. And the answer, every time, without hesitation, is you. You are worth every mile. Every timezone, every late night call, every morning I've woken up wishing you were closer. All of it. Worth it." },
  {
    title: "The Little Things You Do",
    message: "It's the little things. It's always the little things. The way you remember something I mentioned weeks ago and bring it back up at exactly the right moment. The way you check in without making it feel like checking in. The thoughtfulness that runs underneath everything you do, quiet and consistent. Nobody sees it in the way I see it. Nobody tallies it up the way I do. But I notice every single one. And the accumulation of all those small, careful, tender things is what love actually looks like up close. That is what you look like up close."
  },
  { 
    title: "Your Honesty", 
    message: "You say what you mean. Not carelessly — always with kindness — but clearly, without the fog of half-truths that most people hide behind. That honesty is one of the things I trust most about you. With you, I never have to read between lines or wonder what's really being said. What you mean, you say. What you feel, you own. That takes a courage most people underestimate. And it makes every conversation with you feel like solid ground — the kind you can actually stand on." },
  {
    title: "How You've Shaped Me",
    message: "I am different because of you. Better, I think — though you would probably disagree and tell me I was already enough. I am more patient. More present. More willing to sit with something instead of rushing past it. You have softened edges in me I didn't know were sharp. Opened doors I didn't know were closed. I don't say this to give you the credit for my becoming — that belongs to me. But you have been the most beautiful catalyst. And whoever I am still growing into, I know he was shaped, in no small part, by loving you."
  },
  {
    title: "The Way You Listen",
    message: "You are one of the best listeners I have ever encountered. Not the passive kind — the real kind. The kind where you are fully present, where your eyes don't wander, where you hold what someone says with actual care before responding. People feel heard by you in a way that is rare. I feel heard by you in a way I have rarely felt before. And in a world that moves so fast, where everyone is waiting for their turn to speak, your attention is one of the most generous things you give. I do not take it lightly."
  },
  {
    title: "You Are My Favourite Person",
    message: "Of all the people in the world — and there are quite a few — you are my favourite. My favourite to talk to. My favourite to laugh with. My favourite to sit in comfortable silence with. My favourite to share things with, silly things and serious things and everything in between. There is no one I would rather spend time with. No one whose company I seek the way I seek yours. That is not a small thing. In fact, it might be the whole thing. Favourite is a quiet word for something enormous."
  },
  {
    title: "Your Passion",
    message: "When you care about something, you really care. There is nothing halfway about the way you love the things you love. You throw yourself in — curious, attentive, fully alive to whatever has captured you. Watching you talk about something you're passionate about is one of my favourite things in the world. Your eyes change. Your hands move. The words come faster. You become, if possible, even more yourself. I would listen to you talk about anything, truly anything, just for the pleasure of watching you light up like that."
  },
  {
    title: "The Way You See Me",
    message: "You see me in a way that I am still getting used to. Not the edited version I sometimes offer the world, but the actual one — the uncertain parts, the contradictions, the work-in-progress bits I usually keep quiet. And you don't flinch. You don't try to fix what isn't broken or smooth over what is. You just look, clearly and kindly, and somehow what you see seems to be enough. Being truly seen by someone is one of the most vulnerable things there is. That you do it so gently makes it the most extraordinary gift."
  },
  {
    title: "Your Warmth",
    message: "There is a warmth that radiates from you — not performed, not put on, just genuinely, naturally yours. People gravitate toward you without knowing why. They leave conversations with you feeling lighter. I have watched it happen again and again. And when that warmth is turned on me — when you smile at me, when you reach out, when you say my name in that particular way — I feel it somewhere deep. Like standing in sunlight. Like everything, briefly, is exactly right."
  },
  {
    title: "Your Ambition",
    message: "You know what you want. And you go after it — not recklessly, but with a quiet, steady determination that is one of the most attractive things about you. You don't make a show of it. There are no grand announcements. You just build, consistently, purposefully, one careful step at a time. I find that more admirable than almost anything. The discipline it takes. The faith in yourself it requires. Watching you move toward your dreams makes me want to be more deliberate about my own. You make ambition look like something worth having."
  },
  {
    title: "You Feel Like Home",
    message: "I have been thinking about what home means. Not the place — the feeling. That specific sense of arriving somewhere you belong, where nothing needs to be explained or justified or earned. That is what you feel like to me. Not a place I visit, but somewhere I carry with me. When things are difficult, when the world feels loud and too much — I think of you and something settles. You are the thing I come back to. The constant in a life that has sometimes felt uncertain. You feel like home. And I have never been more grateful for anything."
  },
  {
    title: "The Way You Forgive",
    message: "You don't hold on. When something needs to be let go, you let it go — really let it go, not just in words but in the whole way you carry yourself afterward. There is no quiet score-keeping, no bringing things back up at the wrong moment. You forgive fully and you move forward. That generosity of spirit is something I want to learn from. It speaks of a person who understands that love is not a competition, that relationships are not ledgers. You choose peace. Every time. And that choice is one of the most loving things about you."
  },
  {
    title: "Your Vulnerability",
    message: "The moments when you let me in — really in, past the parts you show everyone — are the moments I treasure most. When you share something tender, something uncertain, something you're not sure how it will land. That takes courage most people never speak about. And every time you offer it to me, I am aware of what a gift it is. I do not take it lightly. I hold it carefully. And I hope I have made it clear, in all the ways I know how, that you are safe with me. Completely. Always."
  },
  {
    title: "You Make Me Believe in Things",
    message: "I'll be honest — I wasn't always sure about some things. Love, timing, the idea that someone could come along and make everything feel different. And then there was you. You have made me believe in things I had quietly stopped believing in. Not by arguing for them, not by trying to convince me — just by being so entirely, undeniably yourself. By showing me, in the most ordinary ways, that some things are real and some people are worth it and some stories are worth turning up for. You restored something in me. I don't think you even know it."
  },
  {
    title: "Every Conversation With You",
    message: "I don't think I've ever had a boring conversation with you. Even the small ones — the checking-in messages, the what-are-you-eating texts, the voice notes sent while you're walking somewhere — all of it feels meaningful. Because it is you on the other end. And you bring something to even the most ordinary exchange — a warmth, a wit, a way of making the mundane feel worth noting. I save things to tell you. I notice things because I know I'll want to share them. You have made me more alive to the world just by being someone I want to bring it back to."
  },
  {
    title: "Your Courage",
    message: "You do hard things. Quietly, without making a scene, without waiting to be celebrated for it — you just do them. You have difficult conversations when they need to be had. You step into rooms that intimidate you. You keep showing up for things that matter even when it would be easier to step back. I notice this. I have always noticed this. And I want you to know that your courage — the everyday, understated, unrewarded kind — is one of the things I find most beautiful about you. It is the spine beneath everything else."
  },
  {
    title: "The Life We're Building",
    message: "We are building something. I feel it in every conversation, every shared laugh, every plan we make however tentatively, every moment that feels like a foundation being laid. It is not dramatic. It does not announce itself. It is just two people, consistently choosing each other, consistently showing up, consistently making something out of the ordinary material of everyday life. And what we are making — I believe in it. I believe in us. I want to keep building, keep adding rooms, keep finding out what this becomes. I think it becomes something extraordinary."
  },
  {
    title: "How You Handle the Distance",
    message: "Distance is not easy. I know that, and I know you know that. But I have watched you handle it with a grace that continues to move me. You don't weaponise it. You don't make it heavier than it already is. You just keep showing up — in the messages, in the calls, in the way you make sure I know you're still there even when you're far away. That faithfulness across miles is one of the most romantic things I have ever experienced. It is love made practical. It is love made real."
  },
  {
    title: "The Way You Dream",
    message: "Your dreams are not small. They are vivid and detailed and fuelled by a genuine belief that they are possible — that you are possible. I love listening to you talk about what you want, where you're going, what you're building toward. There is no hesitation in it, no apology for wanting big things. You simply want them, and you go toward them, and watching that is one of the most inspiring things in my life. You make me braver about my own dreams just by being so unafraid of yours."
  },
  {
    title: "Your Whole Entire Self",
    message: "Not a curated version. Not the highlight reel. All of it — the easy parts and the complicated parts, the certain and the uncertain, the polished and the unfinished. I love the whole of you. The you that is confident and the you that sometimes doubts. The you that is funny and the you that gets quiet. The you at your best and the you that is still becoming. I am not interested in a fraction of you. I want every room, every corner, every part you haven't shown anyone yet. All of it. I'm here for all of it."
  },
  {
    title: "What You've Given Me",
    message: "You have given me things you may not even realise. A reason to look forward to mornings. A name I light up at when it appears on my screen. A sense that the world is more interesting, more beautiful, more worth paying attention to than I sometimes remember. You have given me someone to share things with — the good things, the funny things, the things that don't matter and somehow matter enormously. I do not take any of it for granted. Not for a single day. What you've given me is more than I knew to ask for."
  },
  {
    title: "The Anticipation of You",
    message: "Three days. I have been counting down to July 19th for longer than I'll admit, and now it is almost here. I've imagined this so many times — the moment I see you, the first real breath I'll take in what feels like months, the specific joy of finally being in the same room as you. Anticipation is a beautiful thing when what you're anticipating is worth it. And you — you have always been worth it. Every day of this countdown has been a gift. But I will be glad when the counting is done."
  },
  {
    title: "Tomorrow Is Almost Here",
    message: "Two days. I find myself unable to think about much else. I've been carrying July 19th around with me for weeks like something precious — not wanting to rush it, not wanting to wish away the days, but also barely able to contain how much I am looking forward to it. To you. To standing in front of you and not having to reach through a screen. To hearing your voice without a delay. To whatever the first moment looks like. I don't know exactly how it will go. I just know I want it more than I've wanted most things."
  },
  {
    title: "One More Sleep",
    message: "Tomorrow. After all these days, all these reasons, all these songs — tomorrow I get to see you. I have been trying to find the right words for this moment and I keep coming up short, which almost never happens. So I'll just say it plainly: I cannot wait. I cannot wait to see your face. To hear your laugh in person. To be close to you in the way that screens can't replicate. This whole app, all thirty-eight days of it, has been my way of telling you what you mean to me while the miles kept us apart. Tomorrow, I get to show you in person. I'll be there."
  },
  {
    title: "Everything — Completely and Without Reservation",
    message: "Thirty-eight days. Thirty-eight reasons. Thirty-eight songs chosen because each one felt like a small piece of what this is. And still I feel like I've only scratched the surface — like there are a hundred more reasons behind every one I wrote, a hundred more things I notice and treasure and hold quietly. Today is the day before we meet. I have been waiting for it, thinking about it, hoping for it. And now that it's here, all I want to say is this: I love you. Not the easy version, not the convenient version — all of it, fully, without reservation. See you tomorrow. Finally."
  },
];

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: 6 + Math.random() * 6,
  size: 8 + Math.random() * 10,
}));

const formatDate = (date) => {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

const getDayIndex = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const start = new Date(START_DATE);
  start.setHours(0, 0, 0, 0);
  const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
  return Math.min(Math.max(diff, 0), DAYS.length - 1);
}

export default function LoveApp() {
  const todayIndex = getDayIndex();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = BACKGROUND_IMAGE;
    img.onload = () => setBgLoaded(true);
    img.onerror = () => setBgLoaded(true);

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const meet = new Date(MEET_DATE);
    meet.setHours(0, 0, 0, 0);
    setDaysLeft(Math.ceil((meet - now) / (1000 * 60 * 60 * 24)));
  }, []);

  const handleReveal = (index) => {
    if (index > todayIndex) return;
    setSelectedIndex(index);
    setRevealed(false);
    setShowCalendar(false);
    setTimeout(() => setRevealed(true), 500);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = MUSIC_TRACKS[index].url;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const reason = selectedIndex !== null ? REASONS[selectedIndex] : null;
  const track = selectedIndex !== null ? MUSIC_TRACKS[selectedIndex] : null;
  const dayDate = selectedIndex !== null ? DAYS[selectedIndex] : null;

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      position: "relative",
      fontFamily: "'Source Sans 3', sans-serif",
      overflow: "hidden",
    }}>

      {/* Background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0,
        backgroundImage: bgLoaded ? `url(${BACKGROUND_IMAGE})` : "none",
        backgroundSize: "cover", backgroundPosition: "center",
        backgroundColor: "#1a0a12",
      }} />

      {/* Overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1,
        background: "linear-gradient(160deg, rgba(8,0,12,0.75) 0%, rgba(55,8,32,0.68) 55%, rgba(8,0,12,0.82) 100%)",
      }} />

      {/* Floating petals */}
      {PETALS.map(p => (
        <div key={p.id} style={{
          position: "fixed", zIndex: 2,
          left: `${p.left}%`, top: "-20px",
          width: `${p.size}px`, height: `${p.size}px`,
          borderRadius: "60% 40% 70% 30% / 50% 60% 40% 50%",
          background: "rgba(255,170,195,0.3)",
          animation: `petalFall ${p.duration}s ${p.delay}s infinite linear`,
          pointerEvents: "none",
        }} />
      ))}

      <style>{`
        @keyframes petalFall {
          0% { transform: translateY(-30px) rotate(0deg) translateX(0); opacity: 0.7; }
          50% { transform: translateY(50vh) rotate(180deg) translateX(30px); opacity: 0.5; }
          100% { transform: translateY(105vh) rotate(360deg) translateX(-20px); opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.18); }
        }
        @keyframes shimmer {
          0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 18px 2px rgba(255,150,180,0.18); }
          50% { box-shadow: 0 0 38px 8px rgba(255,150,180,0.42); }
        }
        @keyframes barBounce { 
          0%, 100% { height:6px; } 
          50% { height:18px; } 
        }
        .day-btn { transition: all 0.2s ease !important; }
        .day-btn:hover:not(.locked) { transform: scale(1.12) !important; background: rgba(255,255,255,0.2) !important; }
        .locked { opacity: 0.28 !important; cursor: not-allowed !important; }
        .action-btn:hover { opacity: 0.85; transform: scale(1.04); }
      `}</style>

      {/* Main content */}
      <div style={{ position: "relative", zIndex: 3, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 20px 80px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px", animation: "fadeUp 1s ease both" }}>
          <div style={{ animation: "heartbeat 2.2s ease infinite", display: "inline-block", marginBottom: "10px", color: "rgba(255,150,180,0.9)" }}>
            <Heart size={30} fill="rgba(255,150,180,0.6)" />
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 6vw, 58px)", display: "inline-block", marginBottom: "8px", marginLeft: "6px", color: 'white' }}>Mi Bebe'</h1>
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(30px, 6vw, 54px)", fontWeight: "300",
            color: "rgba(255,230,235,0.97)", letterSpacing: "0.05em",
            margin: "10px 0 20px", textShadow: "0 2px 28px rgba(180,60,90,0.5)",
            lineHeight: 1.2,
          }}>
            {DAYS.length} Reasons I Love You
          </h2>
          <p style={{ color: "rgba(255,200,215,0.75)", fontSize: "15px", letterSpacing: "0.12em", margin: "0 0 10px", fontStyle: "italic" }}>
            one reason · one day · one song — just for you
          </p>
          {/* Countdown */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "7px",
            background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,180,210,0.2)", borderRadius: "50px",
            padding: "7px 18px",
          }}>
            <Sparkles size={13} color="rgba(255,200,220,0.7)" />
            <span style={{ color: "rgba(255,210,225,0.85)", fontSize: "13px", letterSpacing: "0.1em" }}>
              {daysLeft} day{daysLeft !== 1 ? "s" : ""} until we meet · July 19
            </span>
          </div>
        </div>

        {/* Today's card or selected card */}
        {!showCalendar && (
          <div style={{
            width: "100%", maxWidth: "500px",
            animation: "fadeUp 0.8s 0.2s ease both",
            marginBottom: "28px",
          }}>
            {selectedIndex === null ? (
              // Welcome state
              <div style={{
                background: "rgba(255,255,255,0.07)", backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,200,215,0.25)", borderRadius: "24px",
                padding: "48px 40px", textAlign: "center",
                animation: "glow 3s ease infinite",
              }}>
                <div style={{ marginBottom: "18px", color: "rgba(255,170,200,0.8)" }}>
                  <Heart size={44} fill="rgba(255,170,200,0.3)" />
                </div>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "rgba(255,232,238,0.95)", fontWeight: "300", fontSize: "24px", margin: "0 0 14px",
                }}>
                  Our love story awaits
                </h2>
                <p style={{ color: "rgba(255,200,218,0.72)", fontSize: "15px", lineHeight: "1.8", margin: "0 0 30px", fontWeight: "300" }}>
                  Each day from today until the 19th of July, a new reason. Each reason paired with a song chosen just for that moment.
                </p>
                <p style={{ color: "rgba(255,195,215,0.55)", fontSize: "13px", margin: "0 0 28px", letterSpacing: "0.06em" }}>
                  Today is {formatDate(DAYS[todayIndex])} — Day {todayIndex + 1} of {DAYS.length}
                </p>
                <button
                  onClick={() => handleReveal(todayIndex)}
                  className="action-btn"
                  style={{
                    background: "rgba(200,60,110,0.75)", color: "rgba(255,235,240,0.97)",
                    border: "none", borderRadius: "50px", padding: "14px 38px",
                    fontSize: "15px", cursor: "pointer", letterSpacing: "0.08em",
                    transition: "all 0.25s", boxShadow: "0 4px 22px rgba(200,60,110,0.4)",
                    display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'Source Sans 3', sans-serif",
                  }}
                >
                  <Heart size={15} fill="rgba(255,235,240,0.8)" />
                  Open Today's Reason
                </button>
              </div>
            ) : (
              // Revealed reason
              <div style={{
                background: "rgba(255,255,255,0.07)", backdropFilter: "blur(22px)",
                border: "1px solid rgba(255,200,215,0.3)", borderRadius: "24px",
                padding: "44px 40px", textAlign: "center",
                opacity: revealed ? 1 : 0, transition: "opacity 0.6s ease",
                animation: "glow 3s ease infinite",
              }}>
                <p style={{ color: "rgba(255,180,205,0.6)", fontSize: "12px", letterSpacing: "0.2em", marginBottom: "6px" }}>
                  DAY {selectedIndex + 1} OF {DAYS.length}
                </p>
                <p style={{ color: "rgba(255,190,210,0.5)", fontSize: "12px", letterSpacing: "0.14em", marginBottom: "20px" }}>
                  {formatDate(dayDate).toUpperCase()}
                </p>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "rgba(255,235,242,0.97)", fontWeight: "300", fontStyle: "italic",
                  fontSize: "clamp(21px, 4vw, 30px)", lineHeight: "1.3", margin: "0 0 20px",
                  textShadow: "0 2px 14px rgba(180,50,90,0.3)",
                }}>
                  {reason.title}
                </h2>
                <div style={{ width: "40px", height: "1px", background: "rgba(255,170,200,0.35)", margin: "0 auto 20px" }} />
                <p style={{ color: "rgba(255,215,228,0.83)", fontSize: "15px", lineHeight: "1.9", margin: "0 0 30px", fontWeight: "300", fontStyle: "italic" }}>
                  {reason.message}
                </p>

                {/* Music player */}
                {track && (
                  <div style={{
                    background: "rgba(0,0,0,0.25)", borderRadius: "16px",
                    padding: "16px 22px", display: "flex", alignItems: "center", gap: "14px",
                    border: "1px solid rgba(255,200,215,0.15)",
                  }}>
                    <button
                      onClick={togglePlay}
                      className="action-btn"
                      style={{
                        width: "40px", height: "40px", borderRadius: "50%",
                        background: "rgba(200,60,110,0.72)", border: "none",
                        color: "white", cursor: "pointer", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.2s", boxShadow: "0 2px 14px rgba(200,60,110,0.38)",
                      }}
                    >
                      {isPlaying ? <Pause size={16} fill="white" /> : <Play size={16} fill="white" />}
                    </button>
                    <div style={{ textAlign: "left", overflow: "hidden", flex: 1 }}>
                      <p style={{ color: "rgba(255,232,238,0.92)", fontSize: "13px", fontWeight: "400", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {track.title}
                      </p>
                      <p style={{ color: "rgba(255,195,215,0.55)", fontSize: "12px", marginTop: "2px", fontWeight: "300" }}>
                        {track.artist}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "3px", alignItems: "flex-end", height: "20px", flexShrink: 0 }}>
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{
                          width: "3px", borderRadius: "2px",
                          background: isPlaying ? "rgba(200,60,110,0.8)" : "rgba(255,180,205,0.25)",
                          animation: isPlaying ? `barBounce ${0.5 + i * 0.15}s ease infinite` : "none",
                          height: isPlaying ? undefined : "4px",
                        }} />
                      ))}
                    </div>
                    <Music size={14} color="rgba(255,180,205,0.35)" />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Calendar toggle */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "24px", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="action-btn"
            style={{
              background: "rgba(255,255,255,0.09)", backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,190,215,0.22)", borderRadius: "50px",
              color: "rgba(255,225,232,0.88)", padding: "10px 22px", fontSize: "14px",
              cursor: "pointer", letterSpacing: "0.06em", transition: "all 0.2s",
              display: "flex", alignItems: "center", gap: "7px",
              fontFamily: "'Source Sans 3', sans-serif",
            }}
          >
            {showCalendar ? <ChevronLeft size={15} /> : <Calendar size={15} />}
            {showCalendar ? "Back" : "All Days"}
          </button>
          {selectedIndex !== null && !showCalendar && (
            <button
              onClick={() => { setSelectedIndex(null); setRevealed(false); if (audioRef.current) { audioRef.current.pause(); setIsPlaying(false); } }}
              className="action-btn"
              style={{
                background: "rgba(255,255,255,0.06)", backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,190,215,0.14)", borderRadius: "50px",
                color: "rgba(255,195,215,0.65)", padding: "10px 22px", fontSize: "14px",
                cursor: "pointer", letterSpacing: "0.06em", transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: "7px",
                fontFamily: "'Source Sans 3', sans-serif",
              }}
            >
              <Heart size={14} />
              Welcome
            </button>
          )}
        </div>

        {/* Calendar grid */}
        {showCalendar && (
          <div style={{
            width: "100%", maxWidth: "540px",
            animation: "fadeUp 0.5s ease both",
          }}>
            <div style={{
              background: "rgba(255,255,255,0.06)", backdropFilter: "blur(18px)",
              border: "1px solid rgba(255,200,215,0.2)", borderRadius: "24px",
              padding: "32px",
            }}>
              <p style={{ textAlign: "center", color: "rgba(255,195,215,0.55)", fontSize: "12px", letterSpacing: "0.18em", margin: "0 0 22px" }}>
                CHOOSE A DAY
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px" }}>
                {DAYS.map((date, i) => {
                  const isAvailable = i <= todayIndex;
                  const isSelected = i === selectedIndex;
                  const isToday = i === todayIndex;

                  return (
                    <button
                      key={i}
                      onClick={() => isAvailable && handleReveal(i)}
                      className={`day-btn${isAvailable ? "" : " locked"}`}
                      title={isAvailable ? `${formatDate(date)} — ${REASONS[i].title}` : `Unlocks on ${formatDate(date)}`}
                      style={{
                        aspectRatio: "1", borderRadius: "12px",
                        background: isSelected ? "rgba(200,60,110,0.55)" : isToday ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.07)",
                        border: `1px solid ${isSelected ? "rgba(255,140,175,0.55)" : isToday ? "rgba(255,190,215,0.4)" : "rgba(255,190,215,0.14)"}`,
                        color: "rgba(255,228,236,0.88)", cursor: isAvailable ? "pointer" : "not-allowed",
                        opacity: isAvailable ? 1 : 0.28,
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "2px",
                        padding: "4px 2px",
                      }}
                    >
                      {isAvailable
                        ? <Heart size={10} fill={isSelected ? "rgba(255,220,232,0.8)" : "none"} color="rgba(255,180,205,0.7)" />
                        : <Lock size={10} color="rgba(255,180,205,0.4)" />
                      }
                      <span style={{ fontSize: "11px", fontWeight: "400", lineHeight: 1 }}>{date.getDate()}</span>
                      <span style={{ fontSize: "9px", color: "rgba(255,190,215,0.5)", lineHeight: 1 }}>
                        {date.toLocaleDateString("en", { month: "short" })}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p style={{ textAlign: "center", color: "rgba(255,195,215,0.4)", fontSize: "11px", margin: "20px 0 0", letterSpacing: "0.1em" }}>
                A new reason unlocks every day until July 19 ♥
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div style={{ paddingTop: "44px", textAlign: "center" }}>
          <p style={{ color: "rgba(255,190,215,0.35)", fontSize: "12px", letterSpacing: "0.12em", animation: "shimmer 4s ease infinite" }}>
            made with love · just for you ♥
          </p>
        </div>
      </div>

      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
    </div>
  );
}
