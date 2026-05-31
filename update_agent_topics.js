const fs = require("fs");
let c = fs.readFileSync("app/agent/page.js", "utf8");

// Replace hardcoded WEEKLY_SCHEDULE with dynamic loading
const oldScheduleDecl = "const TODAY_DAY = new Date().getDay(); // 0=Sun, 1=Mon...\nconst dayIndex = TODAY_DAY === 0 ? 6 : TODAY_DAY - 1; // Map to our 0=Mon schedule";
const newScheduleDecl = "const TODAY_DAY = new Date().getDay();\nconst dayIndex = TODAY_DAY === 0 ? 6 : TODAY_DAY - 1;";

c = c.replace(oldScheduleDecl, newScheduleDecl);

// Add topics state and loading after existing useState declarations
c = c.replace(
  "const [selectedDay, setSelectedDay] = useState(dayIndex);",
  `const [selectedDay, setSelectedDay] = useState(dayIndex);
  const [schedule, setSchedule] = useState(null);
  const [topicsLoading, setTopicsLoading] = useState(false);

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    setTopicsLoading(true);
    try {
      const res = await fetch("/api/topics");
      const data = await res.json();
      if (data.topics) {
        const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        setSchedule(days.map(d => data.topics[d]));
      }
    } catch(e) { console.error("Failed to load topics:", e); }
    setTopicsLoading(false);
  };

  const replaceUsedTopic = async (dayName, topicIndex, usedCategory, usedTone) => {
    try {
      const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
      const dayData = schedule ? schedule[days.indexOf(dayName)] : null;
      const existingTitles = dayData ? dayData.topics.map(t => t.title) : [];
      const continent = dayData ? dayData.continent : "";

      const genRes = await fetch("/api/newtopic", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ category: usedCategory, tone: usedTone, day: dayName, continent, existingTitles })
      });
      const genData = await genRes.json();
      if (!genData.topic) return;

      const updateRes = await fetch("/api/topics", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ day: dayName, topicIndex, newTopic: genData.topic })
      });
      const updateData = await updateRes.json();
      if (updateData.topics) {
        const days2 = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        setSchedule(days2.map(d => updateData.topics[d]));
      }
    } catch(e) { console.error("Failed to replace topic:", e); }
  };`
);

// Update publishToSite to replace topic after publishing
c = c.replace(
  "if(data.success){setPublished(true);}else{setPublishError(data.error||'Failed');}",
  `if(data.success){
        setPublished(true);
        const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        const dayName=days[selectedDay];
        const dayTopics=schedule?schedule[selectedDay]:null;
        if(dayTopics){
          const topicIdx=dayTopics.topics.findIndex(t=>t.title===topic);
          if(topicIdx>=0) replaceUsedTopic(dayName, topicIdx, category, tone);
        }
      }else{setPublishError(data.error||"Failed");}`
);

// Replace WEEKLY_SCHEDULE[selectedDay] with dynamic schedule
c = c.replace(
  "const schedule = WEEKLY_SCHEDULE[selectedDay];",
  "const currentSchedule = schedule ? schedule[selectedDay] : null;"
);

// Replace all references to schedule. with currentSchedule.
c = c.replace(/\bschedule\b(?=\.(?:day|continent|color|emoji|topics))/g, "currentSchedule");

// Add loading state in schedule tab
c = c.replace(
  "{tab==='schedule' && (",
  `{tab==='schedule' && topicsLoading && (
          <div style={{textAlign:'center',padding:'40px',color:'#9ca3af'}}>
            <p style={{fontWeight:'700'}}>Loading fresh topics...</p>
          </div>
        )}
        {tab==='schedule' && !topicsLoading && !currentSchedule && (
          <div style={{textAlign:'center',padding:'40px',color:'#9ca3af'}}>
            <p style={{fontWeight:'700'}}>Could not load topics. <button onClick={loadTopics} style={{color:'#a855f7',background:'none',border:'none',cursor:'pointer',fontWeight:'700'}}>Retry</button></p>
          </div>
        )}
        {tab==='schedule' && !topicsLoading && currentSchedule && (`
);

fs.writeFileSync("app/agent/page.js", c, "utf8");
console.log("Done! schedule references:", (c.match(/currentSchedule/g)||[]).length);