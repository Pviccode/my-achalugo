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
  { title: "Can't Help Falling in Love", artist: "Elvis Presley", url: "/music/day5.mp3" },
  { title: "Lover", artist: "Taylor Swift", url: "/music/day6.mp3" },
  { title: "Just the Way You Are", artist: "Bruno Mars", url: "/music/day7.mp3" },
  { title: "Thinking Out Loud", artist: "Ed Sheeran", url: "/music/day8.mp3" },
  { title: "Endless Love", artist: "Diana Ross", url: "/music/day9.mp3" },
  { title: "The Way You Look Tonight", artist: "Frank Sinatra", url: "/music/day10.mp3" },
  { title: "I Will Always Love You", artist: "Whitney Houston", url: "/music/day11.mp3" },
  { title: "At Last", artist: "Etta James", url: "/music/day12.mp3" },
  { title: "My Girl", artist: "The Temptations", url: "/music/day13.mp3" },
  { title: "Unchained Melody", artist: "Righteous Brothers", url: "/music/day14.mp3" },
  { title: "La Vie en Rose", artist: "Édith Piaf", url: "/music/day15.mp3" },
  { title: "Something", artist: "The Beatles", url: "/music/day16.mp3" },
  { title: "Iris", artist: "Goo Goo Dolls", url: "/music/day17.mp3" },
  { title: "Say You Won't Let Go", artist: "James Arthur", url: "/music/day18.mp3" },
  { title: "Better Together", artist: "Jack Johnson", url: "/music/day19.mp3" },
  { title: "I'm Yours", artist: "Jason Mraz", url: "/music/day20.mp3" },
  { title: "Have I Told You Lately", artist: "Van Morrison", url: "/music/day21.mp3" },
  { title: "Lucky", artist: "Jason Mraz & Colbie Caillat", url: "/music/day22.mp3" },
  { title: "Marry Me", artist: "Train", url: "/music/day23.mp3" },
  { title: "From the Start", artist: "Laufey", url: "/music/day24.mp3" },
  { title: "Golden Hour", artist: "JVKE", url: "/music/day25.mp3" },
  { title: "Die With A Smile", artist: "Lady Gaga & Bruno Mars", url: "/music/day26.mp3" },
  { title: "Dandelions", artist: "Ruth B.", url: "/music/day27.mp3" },
  { title: "You Are the Best Thing", artist: "Ray LaMontagne", url: "/music/day28.mp3" },
  { title: "Sweet Creature", artist: "Harry Styles", url: "/music/day29.mp3" },
  { title: "Bless the Broken Road", artist: "Rascal Flatts", url: "/music/day30.mp3" },
  { title: "Like I'm Gonna Lose You", artist: "Meghan Trainor", url: "/music/day31.mp3" },
  { title: "Stay With Me", artist: "Sam Smith", url: "/music/day32.mp3" },
  { title: "Turning Page", artist: "Sleeping At Last", url: "/music/day33.mp3" },
  { title: "You Are the Reason", artist: "Calum Scott", url: "/music/day34.mp3" },
  { title: "Beautiful in White", artist: "Shane Filan", url: "/music/day35.mp3" },
  { title: "Hold On, We're Going Home", artist: "Drake", url: "/music/day36.mp3" },
  { title: "Almost There", artist: "Jordin Sparks", url: "/music/day37.mp3" },
  { title: "Finally", artist: "CeCe Peniston", url: "/music/day38.mp3" },
];

const REASONS = [
  { title: "All About You", message: "There are people you meet and then there are people who rearrange you. You are the second kind. From the moment you came into my life, something shifted — quietly, permanently. I find myself thinking about you in the middle of ordinary things. A song comes on and it's you. I see something beautiful and I want to show you. I laugh at something and I wish you were there. This app is my attempt to put into words what I feel every single day. Thirty-eight reasons, thirty-eight songs, thirty-eight days — all of it, every single bit, is all about you." },
  { title: "The Moment I knew", message: "There was a specific moment — not a grand gesture, not a dramatic scene — just a quiet, ordinary instant where I looked at you and something inside me went completely still. A kind of knowing that didn't need to be explained. It wasn't falling. It was more like arriving. Like some part of me recognised you before the rest of me had caught up. I've tried to pinpoint it since, to hold it in my hands and examine it, but it slips every time. What I do know is this — that moment changed the direction of everything. And I am so grateful it did." },
  { title: "I Can't Get You Out of My Head", message: "I don't know when it happened exactly, but at some point you became the background of everything. I'd be in the middle of something completely unrelated — working, eating, trying to sleep — and there you'd be. Not intrusively. Just quietly present, like a song you didn't realise was playing until you catch yourself humming it. I tried to concentrate. I tried to be sensible about it. But the truth is, once you let someone like you into your mind, there is simply no going back. And somewhere along the way, I stopped trying." },
  { title: "Your Presence is My Peace", message: "There is a kind of peace I only find with you. Not the absence of noise — something deeper than that. The feeling that everything is exactly where it should be. I notice it most in the quiet moments. When we're not doing anything in particular, just existing in the same space, and somehow that is enough. More than enough. You have this way of making the whole world feel less urgent, less sharp. Like I can finally put things down and just breathe. I didn't know I was looking for that until I found it in you. I didn't know calm could feel this much like joy." },
  { title: "The way you see beauty everywhere", message: "A sunset. A stray cat. A cup of tea gone cold. You notice the loveliness in things that most people walk right past. Being with you has taught me to see the world differently." },
  { title: "Your stubbornness (yes, really)", message: "When you believe in something, nothing moves you. Watching you hold your ground with grace and certainty is one of the most attractive things about you. Never change that." },
  { title: "The sound of your voice", message: "Whether you're whispering, laughing, or reading aloud, the sound of your voice is the most comforting thing I know. It's the one sound I'd choose above all others." },
  { title: "How you make everyone feel seen", message: "People leave a conversation with you feeling more themselves. You have a gift for giving your full attention — and that is one of the rarest and kindest things a person can do." },
  { title: "Your incredible taste", message: "In music. In food. In the way you arrange a room or choose what to wear. Your eye for beauty and feeling is impeccable, and it makes every shared experience richer." },
  { title: "The way you love what you love", message: "When something captures your heart — a song, a book, a meal — you don't just enjoy it. You sink into it fully. That wholehearted enthusiasm is one of the most alive things about you." },
  { title: "Your mind", message: "The way you think — the connections you draw, the questions you ask, the things you notice — is extraordinary. Talking with you is never small. I learn something every single time." },
  { title: "How you handle the hard days", message: "On the days when everything feels heavy, you still find a way through. You don't pretend it's fine when it isn't. And then you get up anyway. That courage moves me deeply." },
  { title: "The way you remember the small things", message: "You remember how I take my coffee. You remember the names of people I mentioned once. You hold the details of the lives around you with such tenderness — it is a form of love all its own." },
  { title: "Your honesty", message: "You say what you mean, kindly and clearly. In a world full of half-truths and politeness, your honesty is a gift. I always know where I stand with you, and that is everything." },
  { title: "The way you move through the world", message: "There's something about the way you walk into a room, hold a glass, tuck your hair — an unconscious elegance that has nothing to do with trying. It's just you." },
  { title: "Your willingness to be silly", message: "You can be fully, gloriously ridiculous — and you're not embarrassed by it at all. That ease with yourself, that playfulness, makes every ordinary moment a little more fun." },
  { title: "How you love the people you love", message: "The loyalty, the ferocity, the tenderness you give to the people you care about — it's breathtaking. And I am the luckiest person alive to be one of them." },
  { title: "Your curiosity", message: "You are never finished learning. There is always a new question, a new interest, a new rabbit hole you're joyfully disappearing into. Life with you is never, ever dull." },
  { title: "The way you forgive", message: "You don't hold onto bitterness. When you let something go, you really let it go. That generosity of spirit — that choosing of peace — reflects a heart that is truly whole." },
  { title: "How you smell", message: "There is a specific warmth to you — familiar and entirely yours — that I have never found anywhere else in the world. It is home. Completely and without question." },
  { title: "The way you hold space for people", message: "When someone is hurting, you don't rush to fix it. You just stay. You let them feel what they feel. That presence — patient and real — is one of your greatest gifts." },
  { title: "Your ambition", message: "You know what you want, and you build toward it quietly and steadily. No performance, no fanfare. Just purpose. I find that more admirable than anything." },
  { title: "The look you give me", message: "There's a look — just yours — that makes me feel like the only person in any room. I don't know if you know you do it. But I notice it every single time." },
  { title: "Your warmth", message: "People gravitate toward you without knowing why. You carry a warmth that is almost physical — it wraps around everyone near you. Being in your orbit is one of life's great privileges." },
  { title: "The way you dream", message: "Your dreams are not small. They are vivid and real and fueled by genuine belief. Watching you imagine and plan and hope — it makes me believe in things I'd stopped believing in." },
  { title: "How you've changed me", message: "I am more patient because of you. More present. More willing to slow down and notice. You have made me better — not by asking me to be, but simply by being who you are." },
  { title: "Your laugh", message: "Not just any laugh — your real one. The one you can't control, the one that takes over your whole face. Hearing it is one of the greatest rewards this life has offered me." },
  { title: "The life we're building", message: "Every shared moment, every inside joke, every message sent at 2am — it's all becoming something. Something entirely ours. I would not trade a single page of this story." },
  { title: "How you inspire me", message: "Without trying to, you make me want to be more — more present, more kind, more alive. You are the quiet force behind some of the best things I've done." },
  { title: "Your patience with me", message: "On the days I am difficult, distracted, or far away in my own head — you stay. That patience is not nothing. It is everything. And I do not take it lightly." },
  { title: "The way you say my name", message: "There's a version of my name that only exists in your voice. Softer, warmer, more real than any other. I could listen to it for the rest of my life without tiring." },
  { title: "Your courage", message: "You do hard things. You step into uncertain rooms, have uncomfortable conversations, and keep showing up even when it would be easier not to. That bravery is something I deeply admire." },
  { title: "How present you are", message: "When you are with someone, you are really with them. No distraction, no half-attention. That full presence is a gift — and when you give it to me, I feel it completely." },
  { title: "Your complexity", message: "You are not simple, and I am grateful for that. Every layer I discover makes me want to find the next. You are the most interesting person I have ever known." },
  { title: "The distance between us right now", message: "Missing you is proof of something real. Every day apart is a day that has made me more certain — more sure of you, of us, of what July 19th means. The wait is worth it." },
  { title: "Every message, every call", message: "Across every timezone and every screen, you have shown up. Consistently, warmly, wholly. That faithfulness across distance is one of the most romantic things I have ever experienced." },
  { title: "The anticipation of seeing you", message: "I have imagined the moment so many times. The airport, the first sight of you, the first real breath I'll take in weeks. Tomorrow is almost here, and I can barely contain it." },
  { title: "Everything — completely and without reservation", message: "After 38 days of reasons, it still comes down to this: you. All of you. The whole, wonderful, extraordinary person you are. Tomorrow I get to finally hold you. I have never been more ready for anything in my life. I love you." },
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
