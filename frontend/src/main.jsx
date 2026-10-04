import React,{useEffect,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter,useNavigate} from 'react-router-dom';
import {Sparkles,Flame,Coins,Target,BookOpen,Code2,Trophy,Gamepad2,Map,PenLine,LogOut,CheckCircle2,Lock,ArrowUpRight,CalendarDays} from 'lucide-react';
import api from './lib/api';
import './index.css';

const nav=[['Dashboard',Sparkles],['Roadmap',Map],['Journal',PenLine],['DSA',Code2],['Projects',Target],['Rewards',Coins]];
const roadmap=[['🟨','JavaScript',74],['⚛️','React',78],['🌐','Web',70],['🟩','Backend',55],['🐘','Database',50],['🔐','Security',35],['🐳','DevOps',25],['🧩','DSA',40],['🧠','CS Fundamentals',30],['🤖','AI',15]];
const areaPlans={
  JavaScript:{
    icon:'🟨',
    goal:'Build strong JavaScript fundamentals before going deeper into React and backend.',
    learn:[
      'Variables, data types and operators',
      'Functions, scope and closures',
      'Arrays and objects',
      'map, filter and reduce',
      'DOM and browser APIs',
      'Promises and async/await',
      'ES modules and modern JavaScript'
    ],
    practice:[
      'Solve 3 small JavaScript problems',
      'Build a small interactive page',
      'Use fetch() with a public API',
      'Refactor one piece of code'
    ],
    build:'Build a small JavaScript application without following a tutorial.'
  },

  React:{
    icon:'⚛️',
    goal:'Become comfortable building real applications with React.',
    learn:[
      'Components and JSX',
      'Props and state',
      'Events and forms',
      'useEffect and data fetching',
      'Conditional rendering',
      'Lists and reusable components',
      'React Router',
      'API integration'
    ],
    practice:[
      'Build 3 reusable components',
      'Create a form with validation',
      'Fetch and display API data',
      'Create a multi-page React flow'
    ],
    build:'Build a complete React feature from scratch.'
  },

  Web:{
    icon:'🌐',
    goal:'Understand how the browser and web actually work.',
    learn:[
      'HTML structure and semantics',
      'CSS layout and responsive design',
      'Flexbox and Grid',
      'HTTP and HTTPS',
      'Requests and responses',
      'REST APIs',
      'Browser storage'
    ],
    practice:[
      'Recreate a real webpage',
      'Make it responsive',
      'Inspect network requests',
      'Build a small REST API client'
    ],
    build:'Build and deploy a responsive web page.'
  },

  Backend:{
    icon:'🟩',
    goal:'Build APIs and server-side applications confidently.',
    learn:[
      'Node.js fundamentals',
      'Express routing',
      'Middleware',
      'REST API design',
      'Authentication',
      'Authorization',
      'Validation and error handling'
    ],
    practice:[
      'Create CRUD endpoints',
      'Add authentication',
      'Handle API errors properly',
      'Connect an API to PostgreSQL'
    ],
    build:'Build a production-style REST API.'
  },

  Database:{
    icon:'🐘',
    goal:'Understand how applications store, query and protect data.',
    learn:[
      'Tables and relationships',
      'Primary and foreign keys',
      'SQL queries',
      'JOINs',
      'Indexes',
      'Transactions',
      'Prisma ORM'
    ],
    practice:[
      'Write 10 SQL queries',
      'Design a relational schema',
      'Create relationships in Prisma',
      'Optimize one query'
    ],
    build:'Design the database for a real application.'
  },

  Security:{
    icon:'🔐',
    goal:'Learn security fundamentals expected from a full-stack developer.',
    learn:[
      'Authentication vs authorization',
      'Password hashing',
      'JWT',
      'Input validation',
      'CORS',
      'SQL injection',
      'XSS and CSRF basics',
      'Environment variables'
    ],
    practice:[
      'Secure a login system',
      'Validate API input',
      'Protect private routes',
      'Review an application for vulnerabilities'
    ],
    build:'Add secure authentication to an application.'
  },

  DevOps:{
    icon:'🐳',
    goal:'Learn how real applications are packaged, deployed and maintained.',
    learn:[
      'Git and GitHub',
      'Branches and pull requests',
      'Docker',
      'Docker Compose',
      'Environment configuration',
      'CI/CD basics',
      'Deployment'
    ],
    practice:[
      'Containerize an application',
      'Use Docker Compose',
      'Create a GitHub repository',
      'Deploy an application'
    ],
    build:'Deploy a full-stack application.'
  },

  DSA:{
    icon:'🧩',
    goal:'Develop problem-solving ability for coding interviews.',
    learn:[
      'Arrays and strings',
      'Hash maps and sets',
      'Two pointers',
      'Sliding window',
      'Stacks and queues',
      'Linked lists',
      'Trees',
      'Graphs',
      'Recursion',
      'Dynamic programming'
    ],
    practice:[
      'Solve 1 problem every study day',
      'Write your approach before coding',
      'Record time and space complexity',
      'Mark difficult problems for revision'
    ],
    build:'Build your personal LeetCode and DSA knowledge base.'
  },

  'CS Fundamentals':{
    icon:'🧠',
    goal:'Prepare the computer-science fundamentals commonly tested in interviews.',
    learn:[
      'OOP',
      'DBMS',
      'Operating systems',
      'Computer networks',
      'Processes and threads',
      'Memory management',
      'Transactions and normalization'
    ],
    practice:[
      'Make interview notes',
      'Answer 5 questions per topic',
      'Explain concepts without notes',
      'Take weekly revision quizzes'
    ],
    build:'Create your personal CS interview handbook.'
  },

  AI:{
    icon:'🤖',
    goal:'Understand practical AI concepts and learn how developers use AI APIs.',
    learn:[
      'AI and ML basics',
      'LLM fundamentals',
      'Prompting',
      'AI APIs',
      'Embeddings',
      'RAG basics',
      'AI application architecture'
    ],
    practice:[
      'Use an AI API',
      'Build a small AI feature',
      'Experiment with prompts',
      'Evaluate AI output'
    ],
    build:'Add one meaningful AI feature to a full-stack project.'
  }
};
function RoadmapArea({area,onBack}){
  const plan=areaPlans[area];

  return <>
    <Header
      title={`${plan.icon} ${area} World`}
      sub={plan.goal}
    />

    <button
      onClick={onBack}
      className="mb-5 text-sm text-cyan-300 hover:text-cyan-200"
    >
      ← Back to Developer World
    </button>

    <div className="grid lg:grid-cols-3 gap-5">

      {/* LEARN */}
      <section className="glass rounded-3xl p-6">
        <div className="text-sm text-violet-300 font-bold">
          📚 PHASE 1
        </div>

        <h2 className="text-2xl font-black mt-2">
          Learn
        </h2>

        <p className="text-sm text-slate-500 mt-2">
          Understand the concepts before trying to build with them.
        </p>

        <div className="mt-5 space-y-3">
          {plan.learn.map((item,i)=>
            <div
              key={item}
              className="flex gap-3 items-start rounded-2xl bg-white/[.03] border border-white/5 p-3"
            >
              <span className="text-violet-300 font-bold">
                {i+1}
              </span>

              <span className="text-sm text-slate-300">
                {item}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* PRACTICE */}
      <section className="glass rounded-3xl p-6">
        <div className="text-sm text-cyan-300 font-bold">
          ⚔️ PHASE 2
        </div>

        <h2 className="text-2xl font-black mt-2">
          Practice
        </h2>

        <p className="text-sm text-slate-500 mt-2">
          Turn passive knowledge into actual coding ability.
        </p>

        <div className="mt-5 space-y-3">
          {plan.practice.map((item,i)=>
            <div
              key={item}
              className="flex gap-3 items-start rounded-2xl bg-white/[.03] border border-white/5 p-3"
            >
              <span className="text-cyan-300 font-bold">
                {i+1}
              </span>

              <span className="text-sm text-slate-300">
                {item}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* BUILD */}
      <section className="glass rounded-3xl p-6">
        <div className="text-sm text-pink-300 font-bold">
          🛠️ PHASE 3
        </div>

        <h2 className="text-2xl font-black mt-2">
          Build
        </h2>

        <p className="text-sm text-slate-500 mt-2">
          Prove that you can use the skill without copying a tutorial.
        </p>

        <div className="mt-6 rounded-2xl bg-pink-400/5 border border-pink-300/10 p-5">
          <div className="text-3xl">🚀</div>

          <h3 className="font-black text-lg mt-3">
            Area challenge
          </h3>

          <p className="text-sm text-slate-300 mt-2">
            {plan.build}
          </p>

          <button className="btn mt-5 w-full rounded-2xl py-3 bg-white text-slate-900 font-black">
            Start challenge →
          </button>
        </div>
      </section>

    </div>

    {/* MASTERY LOOP */}
    <div className="glass rounded-3xl p-6 mt-6">
      <div className="flex items-center justify-between gap-4">

        <div>
          <div className="text-sm text-slate-500">
            MASTERY LOOP
          </div>

          <h2 className="text-2xl font-black mt-1">
            Learn → Practice → Build → Explain
          </h2>
        </div>

        <div className="text-3xl">
          🏆
        </div>

      </div>

      <p className="text-slate-400 text-sm mt-3 max-w-3xl">
        You don't master a technology just by watching tutorials.
        DEVQUEST will eventually use your practice, projects, DSA
        work and journal entries to measure real mastery.
      </p>
    </div>
  </>
}
function App(){
 const [user,setUser]=useState(null); const [page,setPage]=useState('Dashboard');
const [selectedArea,setSelectedArea]=useState(null); const [data,setData]=useState(null); const [loading,setLoading]=useState(true);
 const load=async()=>{try{const r=await api.get('/dashboard');setData(r.data);setUser(r.data.user)}catch{localStorage.removeItem('journey_token');setUser(null)}finally{setLoading(false)}};
 useEffect(()=>{if(localStorage.getItem('journey_token'))load();else setLoading(false)},[]);
 if(loading)return <div className="min-h-screen grid place-items-center text-slate-300">Loading your developer universe…</div>;
 if(!user)return <Auth onLogin={load}/>;
 const content={
  Dashboard:<Dashboard data={data} refresh={load}/>,
  Roadmap:selectedArea
    ? <RoadmapArea area={selectedArea} onBack={()=>setSelectedArea(null)}/>
    : <Roadmap onEnter={setSelectedArea}/>,
  Journal:<Journal/>,
  DSA:<DSA data={data} refresh={load}/>,
  Projects:<Projects data={data}/>,
  Rewards:<Rewards data={data} refresh={load}/>
} [page];
 return <div className="min-h-screen text-slate-100 noise"><aside className="hidden lg:flex fixed inset-y-0 w-64 p-5 flex-col gap-5"><Brand/><div className="space-y-2">{nav.map(([n,I])=><button key={n} onClick={()=>setPage(n)} className={`btn w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left ${page===n?'bg-white/10 text-white glow':'text-slate-400 hover:bg-white/5 hover:text-white'}`}><I size={19}/>{n}</button>)}</div><div className="mt-auto glass rounded-2xl p-4"><p className="text-xs text-slate-400">APRIL 30, 2027</p><p className="font-bold mt-1">Internship Mission 🎯</p><div className="progress h-2 mt-3"><span style={{width:'68%'}}/></div><p className="text-xs text-slate-500 mt-2">68% mission progress</p></div><button onClick={()=>{localStorage.removeItem('journey_token');setUser(null)}} className="flex gap-2 items-center text-slate-400 px-3 py-2"><LogOut size={16}/> Log out</button></aside><main className="lg:ml-64 p-4 md:p-8 max-w-[1500px] mx-auto">{content}</main><div className="lg:hidden fixed bottom-3 left-3 right-3 z-20 glass rounded-2xl p-2 flex justify-around">{nav.map(([n,I])=><button key={n} onClick={()=>setPage(n)} className={`p-2 ${page===n?'text-cyan-300':'text-slate-400'}`}><I size={20}/></button>)}</div></div>
}
function Brand(){return <div className="px-3"><div className="text-xl font-black">DEV<span className="gradient-text">QUEST</span> ⚡</div><div className="text-xs text-slate-500 mt-1">Your developer RPG</div></div>}
function Header({title,sub}){return <header className="mb-7"><div className="text-sm text-violet-300 font-semibold">FULL-STACK JOURNEY</div><h1 className="text-3xl md:text-5xl font-black tracking-tight mt-1">{title}</h1>{sub&&<p className="text-slate-400 mt-2">{sub}</p>}</header>}
function Stat({icon:Icon,label,value,accent='text-white'}){return <div className="glass rounded-2xl p-4"><div className="flex items-center gap-2 text-slate-400 text-sm"><Icon size={17}/>{label}</div><div className={`text-2xl font-black mt-2 ${accent}`}>{value}</div></div>}
function Dashboard({data,refresh}){const u=data.user; const lvl=data.level; const next=lvl*200; const pct=Math.min(100,Math.round(((u.xp-(lvl-1)*200)/200)*100)); return <><Header title={<>Good day, <span className="gradient-text">{u.name}</span> 👋</>} sub="Your learning adventure is moving forward. Keep shipping."/><section className="glass glow rounded-3xl p-5 md:p-7 mb-6 overflow-hidden relative"><div className="absolute -right-10 -top-10 text-[130px] opacity-10">⚔️</div><div className="flex flex-col md:flex-row md:items-end justify-between gap-5 relative"><div><p className="text-violet-300 font-bold">LEVEL {lvl} — FULL-STACK APPRENTICE</p><p className="text-4xl md:text-6xl font-black mt-2">{u.xp.toLocaleString()} <span className="text-lg text-slate-500">XP</span></p><div className="progress h-3 w-full md:w-[480px] mt-4"><span style={{width:`${pct}%`}}/></div><p className="text-xs text-slate-500 mt-2">{next-u.xp} XP until Level {lvl+1}</p></div><div className="flex gap-3"><div className="rounded-2xl bg-orange-400/10 border border-orange-300/10 px-4 py-3"><Flame className="inline text-orange-400" size={18}/> <b>{u.streak}</b> day streak</div><div className="rounded-2xl bg-yellow-400/10 border border-yellow-300/10 px-4 py-3"><Coins className="inline text-yellow-300" size={18}/> <b>{u.coins}</b></div></div></div></section><div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"><Stat icon={Trophy} label="Level" value={`LVL ${lvl}`} accent="text-violet-300"/><Stat icon={Flame} label="Streak" value={`${u.streak} days`} accent="text-orange-300"/><Stat icon={Coins} label="Coins" value={u.coins} accent="text-yellow-300"/><Stat icon={Target} label="Internship" value="68%" accent="text-cyan-300"/></div><div className="grid xl:grid-cols-[1.35fr_.65fr] gap-6"><section className="glass rounded-3xl p-5"><div className="flex justify-between items-center mb-5"><div><h2 className="text-2xl font-black">🔥 Today's Quests</h2><p className="text-sm text-slate-500">Small wins compound.</p></div><Gamepad2 className="text-pink-300"/></div><div className="space-y-3">{data.quests.map(q=><Quest key={q.id} q={q} refresh={refresh}/>)}</div></section><section className="glass rounded-3xl p-5"><h2 className="text-2xl font-black">🎯 Internship Mission</h2><p className="text-sm text-slate-500 mt-1">Target: April 30, 2027</p><div className="progress h-4 mt-6"><span style={{width:'68%'}}/></div><div className="text-4xl font-black mt-3">68%</div><div className="mt-6 space-y-3 text-sm"><Check text="Build 2 strong projects"/><Check text="Reach DSA target"/><Check text="Polish GitHub"/><Check text="Prepare resume"/><Check text="Mock interviews"/></div></section></div></>}
function Check({text}){return <div className="flex gap-2 items-center"><CheckCircle2 size={17} className="text-emerald-400"/>{text}</div>}
function Quest({q,refresh}){const done=q.completed; const complete=async()=>{if(done)return;await api.post(`/quests/${q.id}/complete`);refresh()};return <div className={`rounded-2xl border p-4 ${done?'border-emerald-400/20 bg-emerald-400/5':'border-white/10 bg-white/[.025]'}`}><div className="flex items-start justify-between gap-3"><div><div className="font-bold">{q.title}</div><div className="text-sm text-slate-500 mt-1">{q.description}</div></div><div className="text-right whitespace-nowrap"><div className="text-xs text-cyan-300">+{q.xpReward} XP</div><div className="text-xs text-yellow-300">+{q.coinReward} 🪙</div></div></div><button onClick={complete} className={`btn mt-3 px-4 py-2 rounded-xl text-sm font-bold ${done?'bg-emerald-400/10 text-emerald-300':'bg-white text-slate-900 hover:bg-cyan-200'}`}>{done?'✓ Completed':'Start Quest →'}</button></div>}
function Roadmap(){return <><Header title="🗺️ Developer World" sub="Unlock skills one area at a time. Mastery comes from learning + building + proving."/><div className="glass rounded-3xl p-6"><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{roadmap.map(([emoji,name,p])=><div key={name} className="rounded-2xl bg-white/[.035] border border-white/10 p-5 hover:border-violet-400/30 transition"><div className="text-4xl">{emoji}</div><h3 className="text-xl font-black mt-3">{name}</h3><div className="progress h-2 mt-4"><span style={{width:`${p}%`}}/></div><div className="flex justify-between mt-2 text-xs"><span className="text-slate-500">Skill progress</span><b>{p}%</b></div><button className="mt-4 text-sm text-cyan-300">Enter area <ArrowUpRight size={14} className="inline"/></button></div>)}</div></div><div className="glass rounded-3xl p-6 mt-6"><h2 className="text-2xl font-black">🏰 The path to internship</h2><div className="flex flex-wrap items-center gap-3 mt-5 text-sm">{['Foundation','JavaScript','React','Backend','Database','DevOps','Projects','Interviews','🏆 Internship Ready'].map((x,i)=><React.Fragment key={x}><div className={`px-4 py-3 rounded-2xl ${i<4?'bg-violet-400/10 border border-violet-300/20':'bg-white/5 border border-white/10'}`}>{x}</div>{i<8&&<span className="text-slate-600">→</span>}</React.Fragment>)}</div></div></>}
function Journal(){const [entries,setEntries]=useState([]);const [form,setForm]=useState({learned:'',built:'',problem:'',solution:'',stillNeed:'',confidence:4});const load=()=>api.get('/journal').then(r=>setEntries(r.data));useEffect(load,[]);const save=async()=>{await api.post('/journal',{...form,date:new Date().toISOString()});setForm({learned:'',built:'',problem:'',solution:'',stillNeed:'',confidence:4});load()};return <><Header title="📓 Developer Logbook" sub="Don't just remember that you learned. Capture the story of how you learned it."/><div className="grid xl:grid-cols-[1fr_.8fr] gap-6"><section className="glass rounded-3xl p-5"><div className="flex items-center gap-3 mb-5"><CalendarDays className="text-cyan-300"/><div><h2 className="text-2xl font-black">Today's entry</h2><p className="text-sm text-slate-500">What happened in your developer world today?</p></div></div>{[['learned','✨ What did you learn today?'],['built','🛠️ What did you build?'],['problem','🐛 What problem did you face?'],['solution','💡 How did you solve it?'],['stillNeed','🧠 What do you still not understand?']].map(([k,l])=><label key={k} className="block mb-4"><span className="text-sm font-bold text-slate-300">{l}</span><textarea value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} rows={k==='learned'?4:2} className="w-full mt-2 rounded-2xl bg-black/20 border border-white/10 p-3 text-sm text-slate-200" placeholder="Write honestly. This is your learning history."/></label>)}<div className="mb-5"><div className="text-sm font-bold">⭐ Confidence today: {form.confidence}/5</div><input type="range" min="1" max="5" value={form.confidence} onChange={e=>setForm({...form,confidence:e.target.value})} className="w-full mt-3"/></div><button onClick={save} className="btn w-full bg-white text-slate-900 font-black rounded-2xl py-3">Save today's story ✨</button></section><section><h2 className="text-2xl font-black mb-4">📚 Your journey so far</h2><div className="space-y-4">{entries.length?entries.map(e=><article key={e.id} className="glass rounded-3xl p-5"><div className="text-xs text-violet-300 font-bold">{new Date(e.date).toLocaleDateString()}</div><h3 className="font-black text-lg mt-2">✨ {e.learned}</h3>{e.built&&<p className="text-sm text-slate-400 mt-3"><b className="text-slate-200">Built:</b> {e.built}</p>}{e.problem&&<p className="text-sm text-slate-400 mt-2"><b className="text-slate-200">Bug:</b> {e.problem}</p>}{e.solution&&<p className="text-sm text-slate-400 mt-2"><b className="text-slate-200">Solution:</b> {e.solution}</p>}<div className="mt-4 text-sm">{'⭐'.repeat(e.confidence)}<span className="opacity-20">{'⭐'.repeat(5-e.confidence)}</span></div></article>):<div className="glass rounded-3xl p-8 text-slate-500">Your first developer story starts here.</div>}</div></section></div></>}
function DSA({data,refresh}){const grouped={};data.dsa.forEach(x=>(grouped[x.topic]??=[]).push(x));return <><Header title="🧩 DSA Arena" sub="Train problem solving a little every day. Consistency beats heroic cramming."/><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">{Object.entries(grouped).map(([topic,items])=><div className="glass rounded-2xl p-4" key={topic}><div className="font-black">{topic}</div><div className="text-2xl font-black mt-2">{items.filter(x=>x.solved).length}/{items.length}</div><div className="progress h-2 mt-3"><span style={{width:`${items.filter(x=>x.solved).length/items.length*100}%`}}/></div></div>)}</div><div className="glass rounded-3xl p-5 space-y-2">{data.dsa.map(x=><button key={x.id} onClick={async()=>{await api.patch(`/dsa/${x.id}`);refresh()}} className="w-full text-left rounded-2xl p-4 bg-white/[.03] border border-white/5 flex justify-between items-center"><div><div className={x.solved?'line-through text-slate-500':'font-bold'}>{x.solved?'✅':'⬜'} {x.title}</div><div className="text-xs text-slate-500 mt-1">{x.topic} • {x.difficulty}</div></div>{x.solved?<span className="text-emerald-300 text-xs">+30 XP earned</span>:<span className="text-cyan-300 text-xs">Solve →</span>}</button>)}</div></>}
function Projects({data}){return <><Header title="🏗️ Project Forge" sub="Your projects are where knowledge becomes proof."/><div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">{data.projects.map(p=><div key={p.id} className="glass rounded-3xl p-5"><div className="flex justify-between"><span className="text-3xl">{p.name==='ProHours'?'⏱️':'🛠️'}</span><span className="text-xs rounded-full px-3 py-1 bg-white/5">{p.status}</span></div><h2 className="text-2xl font-black mt-4">{p.name}</h2><p className="text-sm text-slate-500 mt-1 min-h-10">{p.description}</p><div className="progress h-3 mt-5"><span style={{width:`${p.progress}%`}}/></div><div className="flex justify-between text-xs mt-2"><span>Progress</span><b>{p.progress}%</b></div><div className="mt-5 text-sm text-cyan-300">Open project quest →</div></div>)}</div></>}
function Rewards({data,refresh}){const redeem=async(id)=>{try{await api.post(`/rewards/${id}/redeem`);refresh()}catch(e){alert(e.response?.data?.message||'Could not redeem')}};return <><Header title="🛒 Reward Shop" sub="Earn coins from genuine progress, then spend them on rewards you choose."/><div className="glass rounded-3xl p-5 mb-6 flex items-center gap-3"><Coins className="text-yellow-300"/><span className="text-2xl font-black">{data.user.coins}</span><span className="text-slate-500">coins available</span></div><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{data.rewards.map(r=><div className="glass rounded-3xl p-6" key={r.id}><div className="text-5xl">{r.emoji}</div><h2 className="text-xl font-black mt-4">{r.name}</h2><div className="text-yellow-300 font-bold mt-2">🪙 {r.cost}</div><button disabled={data.user.coins<r.cost} onClick={()=>redeem(r.id)} className="btn mt-5 w-full rounded-2xl py-3 bg-white text-slate-900 font-black disabled:opacity-30">{data.user.coins>=r.cost?'Redeem reward':'Earn more coins'}</button></div>)}</div></>}
function Auth({onLogin}){const [mode,setMode]=useState('login');const [form,setForm]=useState({name:'',email:'demo@journey.app',password:'Journey@12345'});const [err,setErr]=useState('');const submit=async()=>{try{const r=await api.post(`/auth/${mode}`,form);localStorage.setItem('journey_token',r.data.token);onLogin()}catch(e){setErr(e.response?.data?.message||'Something went wrong')}};return <div className="min-h-screen grid place-items-center p-5"><div className="w-full max-w-md glass glow rounded-[32px] p-7 md:p-9"><div className="text-center"><div className="text-4xl">⚡</div><div className="text-3xl font-black mt-2">DEV<span className="gradient-text">QUEST</span></div><p className="text-slate-500 mt-2">Turn your full-stack journey into an adventure.</p></div><div className="flex bg-black/20 rounded-2xl p-1 mt-7"><button onClick={()=>setMode('login')} className={`flex-1 py-2 rounded-xl ${mode==='login'?'bg-white text-slate-900 font-bold':''}`}>Login</button><button onClick={()=>setMode('register')} className={`flex-1 py-2 rounded-xl ${mode==='register'?'bg-white text-slate-900 font-bold':''}`}>Create account</button></div>{mode==='register'&&<input className="w-full mt-4 bg-black/20 border border-white/10 rounded-2xl p-3" placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>}<input className="w-full mt-4 bg-black/20 border border-white/10 rounded-2xl p-3" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/><input type="password" className="w-full mt-3 bg-black/20 border border-white/10 rounded-2xl p-3" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>{err&&<p className="text-red-300 text-sm mt-3">{err}</p>}<button onClick={submit} className="btn w-full mt-5 py-3 rounded-2xl bg-white text-slate-900 font-black">{mode==='login'?'Enter my journey →':'Start my journey →'}</button><p className="text-xs text-slate-600 text-center mt-5">Demo: demo@journey.app / Journey@12345</p></div></div>}

createRoot(document.getElementById('root')).render(<BrowserRouter><App/></BrowserRouter>);
