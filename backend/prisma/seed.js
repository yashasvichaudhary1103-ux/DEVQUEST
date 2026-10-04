const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('Journey@12345', 10);
  const user = await prisma.user.upsert({
    where: { email: 'demo@journey.app' },
    update: {},
    create: { name: 'Yashasvi', email: 'demo@journey.app', password, xp: 2340, coins: 1240, streak: 18 }
  });
  await prisma.quest.deleteMany({ where: { userId: user.id } });
  await prisma.journalEntry.deleteMany({ where: { userId: user.id } });
  await prisma.dsaProblem.deleteMany({ where: { userId: user.id } });
  await prisma.project.deleteMany({ where: { userId: user.id } });
  await prisma.reward.deleteMany({ where: { userId: user.id } });
  const quests = [
    ['⚛️ Learn React useEffect','Understand effects, dependencies and cleanup.','Learning',20,10],
    ['🧩 Solve 2 DSA problems','Keep the problem-solving streak alive.','DSA',60,30],
    ['🛠️ Build a ProHours feature','Turn something you learned into code.','Building',50,25],
    ['🐘 Revise one DBMS concept','Spend 20 focused minutes on databases.','CS',20,10]
  ];
  await prisma.quest.createMany({ data: quests.map(q=>({ title:q[0],description:q[1],category:q[2],xpReward:q[3],coinReward:q[4],userId:user.id })) });
  await prisma.dsaProblem.createMany({ data: [
    ['Two Sum','Arrays','Easy',true],['Best Time to Buy and Sell Stock','Arrays','Easy',true],['Valid Anagram','Strings','Easy',true],['Longest Substring Without Repeating Characters','Strings','Medium',false],['Valid Parentheses','Stacks','Easy',false],['Reverse Linked List','Linked Lists','Easy',false]
  ].map(p=>({title:p[0],topic:p[1],difficulty:p[2],solved:p[3],userId:user.id})) });
  await prisma.project.createMany({ data: [
    {name:'ProHours',description:'Productivity and habit tracking full-stack app.',progress:82,status:'Building',userId:user.id},
    {name:'Full-Stack Journey',description:'This gamified learning and internship tracker.',progress:35,status:'Building',userId:user.id},
    {name:'Project 3',description:'Future advanced project.',progress:0,status:'Planned',userId:user.id}
  ]});
  await prisma.reward.createMany({ data: [
    {name:'Coffee Break',cost:50,emoji:'☕',userId:user.id},{name:'1 Hour Gaming',cost:100,emoji:'🎮',userId:user.id},{name:'Favorite Meal',cost:250,emoji:'🍕',userId:user.id},{name:'Movie Night',cost:300,emoji:'🎬',userId:user.id},{name:'Full Evening Off',cost:500,emoji:'😴',userId:user.id}
  ]});
  await prisma.journalEntry.create({data:{userId:user.id,date:new Date('2026-10-02T00:00:00.000Z'),learned:'CORS, LAN networking and how browser API requests work.',built:'Habit completion improvements in ProHours.',problem:'Phone could not connect to the backend.',solution:'Checked host binding, API base URL and CORS configuration.',stillNeed:'JWT refresh tokens.',confidence:4}});
  console.log('Seed complete. Demo: demo@journey.app / Journey@12345');
}
main().finally(()=>prisma.$disconnect());
