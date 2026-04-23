const fs=require('fs');
const path=require('path');

const site=process.cwd();

// Update parks/page.js to read from filesystem directly
const parksListCode=`import fs from 'fs';
import path from 'path';

export const metadata={
  title:'Parks — Funparks',
  description:'All 64 theme parks in the Funparks app across 6 continents. Find tickets, skip the line passes, tours and hotels for every major theme park in the world.'
};

function getParks(){
  try{
    const p=path.join(process.cwd(),'public','data','parks_index.json');
    const raw=fs.readFileSync(p,'utf8').replace(/^\\uFEFF/,'');
    return JSON.parse(raw);
  }catch(e){console.error(e);return[];}
}

const continentMap={
  'USA':'Americas','United States':'Americas','Canada':'Americas','Argentina':'Americas',
  'Chile':'Americas','Brazil':'Americas','Mexico':'Americas',
  'Japan':'Asia','China':'Asia','South Korea':'Asia','Hong Kong':'Asia',
  'Singapore':'Asia','Thailand':'Asia','Taiwan':'Asia','Indonesia':'Asia',
  'Malaysia':'Asia','Philippines':'Asia',
  'Germany':'Europe','France':'Europe','Netherlands':'Europe','Belgium':'Europe',
  'Spain':'Europe','Italy':'Europe','United Kingdom':'Europe','Sweden':'Europe',
  'Denmark':'Europe','Poland':'Europe',
  'UAE':'Middle East',
  'Australia':'Oceania','New Zealand':'Oceania',
  'South Africa':'Africa',
};

const continentColors={
  'Americas':'#FF6B2B','Asia':'#a855f7','Europe':'#06b6d4',
  'Middle East':'#f43f5e','Oceania':'#10b981','Africa':'#f59e0b',
};

const continents=['Americas','Asia','Europe','Middle East','Oceania','Africa'];

const FIREBASE_BASE='https://firebasestorage.googleapis.com/v0/b/funparks-779c6.firebasestorage.app/o';
function toFirebaseUrl(assetPath){
  if(!assetPath)return '';
  const p=assetPath.replace('assets/','');
  return \`\${FIREBASE_BASE}/\${encodeURIComponent(p)}?alt=media\`;
}

export default function ParksPage(){
  const parks=getParks();

  return(
    <div style={{minHeight:'100vh',paddingTop:'120px',paddingBottom:'80px',background:'#f8f7ff'}}>
      <div style={{maxWidth:'1280px',margin:'0 auto',padding:'0 24px'}}>
        <div style={{marginBottom:'48px'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'8px 16px',borderRadius:'999px',background:'white',boxShadow:'0 2px 8px rgba(0,0,0,0.06)',border:'1px solid #e5e7eb',color:'#7c3aed',fontSize:'13px',fontWeight:700,marginBottom:'20px'}}>🌍 All Parks</div>
          <h1 style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(2.5rem,5vw,4rem)',fontWeight:900,color:'#1a1a2e',marginBottom:'12px'}}>
            64 Parks.<br/><span style={{background:'linear-gradient(135deg,#FF6B2B,#f43f5e,#a855f7)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text'}}>6 Continents.</span>
          </h1>
          <p style={{color:'#6b7280',fontSize:'18px',maxWidth:'520px'}}>Complete guides for every major theme park — tickets, attractions, skip the line and hotels.</p>
        </div>

        {continents.map(continent=>{
          const list=parks.filter(p=>continentMap[p.country]===continent);
          if(!list.length)return null;
          const color=continentColors[continent]||'#FF6B2B';
          return(
            <div key={continent} style={{marginBottom:'56px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px'}}>
                <div style={{height:'4px',width:'32px',borderRadius:'2px',background:color}}/>
                <h2 style={{fontFamily:'Syne,sans-serif',fontSize:'22px',fontWeight:900,color:'#1a1a2e',margin:0}}>{continent}</h2>
                <span style={{fontSize:'13px',fontWeight:700,padding:'4px 12px',borderRadius:'999px',background:color+'15',color}}>{list.length} parks</span>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'16px'}}>
                {list.map(p=>{
                  const imgUrl=toFirebaseUrl(p.thumbnail);
                  return(
                    <a key={p.id} href={\`/parks/\${p.id}\`}
                      style={{display:'block',background:'white',borderRadius:'16px',overflow:'hidden',border:'2px solid #f0f0f8',textDecoration:'none',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
                      <div style={{height:'140px',overflow:'hidden',background:'#f0f0f8',position:'relative'}}>
                        {imgUrl&&<img src={imgUrl} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>}
                        <div style={{position:'absolute',top:'10px',right:'10px',padding:'4px 10px',borderRadius:'999px',background:'rgba(0,0,0,0.5)',color:'white',fontSize:'11px',fontWeight:700}}>{p.country}</div>
                      </div>
                      <div style={{padding:'14px 16px'}}>
                        <h3 style={{fontFamily:'Syne,sans-serif',fontSize:'15px',fontWeight:900,color:'#1a1a2e',margin:'0 0 4px'}}>{p.name}</h3>
                        <p style={{color:'#9ca3af',fontSize:'13px',margin:'0 0 10px',fontWeight:500}}>{p.city}</p>
                        <span style={{fontSize:'12px',fontWeight:700,padding:'3px 10px',borderRadius:'999px',background:color+'15',color}}>View Guide →</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(site,'app','parks','page.js'),parksListCode,'utf8');
console.log('Updated parks/page.js - reads from filesystem');

// Also update the individual park page to read from filesystem
const parkPageDir=path.join(site,'app','parks','[id]');
fs.mkdirSync(parkPageDir,{recursive:true});

const parkPageCode=`import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

const FIREBASE_BASE='https://firebasestorage.googleapis.com/v0/b/funparks-779c6.firebasestorage.app/o';

function toFirebaseUrl(assetPath){
  if(!assetPath)return '';
  const p=assetPath.replace('assets/','');
  return \`\${FIREBASE_BASE}/\${encodeURIComponent(p)}?alt=media\`;
}

function getAllParks(){
  try{
    const p=path.join(process.cwd(),'public','data','parks_index.json');
    const raw=fs.readFileSync(p,'utf8').replace(/^\\uFEFF/,'');
    return JSON.parse(raw);
  }catch{return[];}
}

function getI18n(id){
  try{
    const p=path.join(process.cwd(),'public','data','i18n',id+'.json');
    if(!fs.existsSync(p))return null;
    const raw=fs.readFileSync(p,'utf8').replace(/^\\uFEFF/,'');
    return JSON.parse(raw);
  }catch{return null;}
}

function getAffiliateUrls(country,city,name){
  const c=(country||'').toLowerCase();
  const isAsia=['japan','china','korea','hong kong','singapore','thailand','taiwan','indonesia','malaysia','philippines'].some(x=>c.includes(x));
  const isAmericas=['usa','united states','canada','australia','mexico'].some(x=>c.includes(x));
  const skipQ=encodeURIComponent(\`\${city||''} \${name} fast track tickets\`.trim());
  const toursQ=encodeURIComponent(\`\${city||''} \${name} guided tours experiences\`.trim());
  if(isAsia){
    return{
      skipUrl:\`https://affiliate.klook.com/redirect?aid=119449&aff_adid=&k_site=https%3A%2F%2Fwww.klook.com%2Fsearch%2F%3Fquery%3D\${skipQ}\`,
      toursUrl:\`https://affiliate.klook.com/redirect?aid=119449&aff_adid=&k_site=https%3A%2F%2Fwww.klook.com%2Fsearch%2F%3Fquery%3D\${toursQ}\`
    };
  } else if(isAmericas){
    return{
      skipUrl:\`https://www.viator.com/search/\${encodeURIComponent(\`\${city} \${name} skip line\`)}?pid=P00298240&mcid=42383&medium=link\`,
      toursUrl:\`https://www.viator.com/search/\${encodeURIComponent(\`\${city} \${name} tours\`)}?pid=P00298240&mcid=42383&medium=link\`
    };
  } else {
    return{
      skipUrl:\`https://www.getyourguide.com/s/?q=\${encodeURIComponent(\`\${city} \${name} skip the line\`)}&partner_id=GVNQTTL\`,
      toursUrl:\`https://www.getyourguide.com/s/?q=\${encodeURIComponent(\`\${city} \${name} tours\`)}&partner_id=GVNQTTL\`
    };
  }
}

export async function generateStaticParams(){
  const parks=getAllParks();
  return parks.map(p=>({id:p.id}));
}

export async function generateMetadata({params}){
  const parks=getAllParks();
  const park=parks.find(p=>p.id===params.id);
  if(!park)return{title:'Park Not Found'};
  return{
    title:\`\${park.name} — Complete Guide | Funparks\`,
    description:\`Complete guide to \${park.name} in \${park.city}, \${park.country}. Attractions, tickets, skip the line, tours and hotels.\`,
    openGraph:{
      title:\`\${park.name} — Complete Guide | Funparks\`,
      description:\`Complete guide to \${park.name} in \${park.city}, \${park.country}.\`,
      images:[toFirebaseUrl(park.thumbnail)],
    }
  };
}

export default function ParkPage({params}){
  const parks=getAllParks();
  const park=parks.find(p=>p.id===params.id);
  if(!park)notFound();

  const i18n=getI18n(params.id);
  const overview=i18n?.overview||{};

  const thumbUrl=toFirebaseUrl(park.thumbnail);
  const {skipUrl,toursUrl}=getAffiliateUrls(park.country,park.city,park.name);
  const hotelsUrl=\`https://www.booking.com/searchresults.html?aid=4347407&latitude=\${park.lat}&longitude=\${park.lng}&radius=10&label=funparks-web&group_adults=2&no_rooms=1\`;

  const continentColors={
    'USA':'#FF6B2B','United States':'#FF6B2B','Canada':'#FF6B2B',
    'Japan':'#a855f7','China':'#a855f7','South Korea':'#a855f7','Hong Kong':'#a855f7','Singapore':'#a855f7',
    'Germany':'#06b6d4','France':'#06b6d4','Netherlands':'#06b6d4','Belgium':'#06b6d4',
    'Spain':'#06b6d4','Italy':'#06b6d4','United Kingdom':'#06b6d4','Sweden':'#06b6d4','Denmark':'#06b6d4','Poland':'#06b6d4',
    'UAE':'#f43f5e','Australia':'#10b981','South Africa':'#f59e0b',
    'Argentina':'#FF6B2B','Chile':'#FF6B2B','Brazil':'#FF6B2B','Mexico':'#FF6B2B',
  };
  const accent=continentColors[park.country]||'#FF6B2B';

  const sections=[
    {key:'ov_overview_body',title:'Overview',icon:'🎢'},
    {key:'ov_highlights_body',title:'Highlights',icon:'⭐'},
    {key:'ov_did_you_know_body',title:'Did You Know?',icon:'💡'},
    {key:'ov_plan_body',title:'Plan Your Visit',icon:'📅'},
    {key:'ov_photos_body',title:'Photography Tips',icon:'📸'},
  ].filter(s=>overview[s.key]?.en);

  return(
    <div style={{background:'#f8f7ff',minHeight:'100vh'}}>
      {/* Hero */}
      <div style={{position:'relative',height:'460px',overflow:'hidden',marginTop:'64px'}}>
        {thumbUrl&&<img src={thumbUrl} alt={park.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>}
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.75) 100%)'}}/>
        <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'40px 32px'}}>
          <div style={{maxWidth:'1200px',margin:'0 auto'}}>
            <a href="/parks" style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'14px',fontWeight:600,display:'inline-flex',alignItems:'center',gap:'6px',marginBottom:'12px'}}>← All Parks</a>
            <h1 style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:900,color:'white',margin:'0 0 8px'}}>{park.name}</h1>
            <div style={{display:'flex',alignItems:'center',gap:'12px',flexWrap:'wrap'}}>
              <span style={{color:'rgba(255,255,255,0.85)',fontSize:'16px',fontWeight:500}}>📍 {[park.city,park.country].filter(Boolean).join(', ')}</span>
              <span style={{padding:'4px 12px',borderRadius:'999px',background:accent,color:'white',fontSize:'12px',fontWeight:700}}>{park.type||'Theme Park'}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'40px 24px'}}>
        {/* Quick Info Bar */}
        <div style={{display:'flex',flexWrap:'wrap',gap:'10px',marginBottom:'32px'}}>
          {park.openingHours&&<span style={{padding:'8px 16px',borderRadius:'999px',background:'white',border:'1px solid #e5e7eb',fontSize:'13px',fontWeight:600,color:'#374151',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>🕐 {park.openingHours}</span>}
          {park.entryPrices?.adult&&<span style={{padding:'8px 16px',borderRadius:'999px',background:'white',border:'1px solid #e5e7eb',fontSize:'13px',fontWeight:600,color:'#374151',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>💰 From {park.currency} {park.entryPrices.adult}</span>}
          {park.entryPrices?.child&&<span style={{padding:'8px 16px',borderRadius:'999px',background:'white',border:'1px solid #e5e7eb',fontSize:'13px',fontWeight:600,color:'#374151',boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>👶 Child from {park.currency} {park.entryPrices.child}</span>}
        </div>

        {/* Action Buttons */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(210px,1fr))',gap:'12px',marginBottom:'48px'}}>
          {park.ticketsUrl&&(
            <a href={park.ticketsUrl} target="_blank" rel="noopener noreferrer"
              style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'16px 20px',borderRadius:'14px',background:\`linear-gradient(135deg,\${accent},#f43f5e)\`,color:'white',textDecoration:'none',fontWeight:800,fontSize:'15px',boxShadow:\`0 4px 20px \${accent}40\`}}>
              🎟️ Get Your Tickets Now
            </a>
          )}
          <a href={skipUrl} target="_blank" rel="noopener noreferrer"
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'16px 20px',borderRadius:'14px',background:'white',color:'#1a1a2e',textDecoration:'none',fontWeight:800,fontSize:'15px',border:\`2px solid \${accent}\`,boxShadow:'0 4px 12px rgba(0,0,0,0.08)'}}>
            ⚡ Skip the Line
          </a>
          <a href={toursUrl} target="_blank" rel="noopener noreferrer"
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'16px 20px',borderRadius:'14px',background:'white',color:'#1a1a2e',textDecoration:'none',fontWeight:800,fontSize:'15px',border:\`2px solid \${accent}\`,boxShadow:'0 4px 12px rgba(0,0,0,0.08)'}}>
            🗺️ Tours & Experiences
          </a>
          <a href={hotelsUrl} target="_blank" rel="noopener noreferrer"
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'16px 20px',borderRadius:'14px',background:'#003580',color:'white',textDecoration:'none',fontWeight:800,fontSize:'15px',boxShadow:'0 4px 20px rgba(0,53,128,0.25)'}}>
            🏨 Find Hotels Nearby
          </a>
        </div>

        {/* Overview Sections */}
        {sections.length>0&&(
          <div style={{display:'grid',gap:'20px',marginBottom:'48px'}}>
            {sections.map(({key,title,icon})=>(
              <div key={key} style={{background:'white',borderRadius:'20px',padding:'32px',boxShadow:'0 2px 12px rgba(0,0,0,0.05)',border:'1px solid #f0f0f8'}}>
                <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
                  <span style={{fontSize:'24px'}}>{icon}</span>
                  <h2 style={{fontFamily:'Syne,sans-serif',fontSize:'22px',fontWeight:900,color:'#1a1a2e',margin:0}}>{title}</h2>
                </div>
                <p style={{color:'#4b5563',lineHeight:1.85,fontSize:'16px',margin:0}}>{overview[key].en}</p>
              </div>
            ))}
          </div>
        )}

        {/* App CTA */}
        <div style={{background:'linear-gradient(135deg,#1a1a2e,#16213e)',borderRadius:'24px',padding:'48px 40px',textAlign:'center'}}>
          <div style={{fontSize:'48px',marginBottom:'16px'}}>🎢</div>
          <h2 style={{fontFamily:'Syne,sans-serif',fontSize:'28px',fontWeight:900,color:'white',margin:'0 0 12px'}}>Explore {park.name} in the App</h2>
          <p style={{color:'rgba(255,255,255,0.6)',fontSize:'16px',margin:'0 0 28px',maxWidth:'480px',marginLeft:'auto',marginRight:'auto'}}>Live wait times, AI park assistant, attraction guides, food and hotel recommendations</p>
          <a href="https://play.google.com/store/apps/details?id=com.funparks.app" target="_blank" rel="noopener noreferrer"
            style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'16px 32px',borderRadius:'14px',background:\`linear-gradient(135deg,\${accent},#f43f5e)\`,color:'white',textDecoration:'none',fontWeight:800,fontSize:'16px',boxShadow:\`0 6px 24px \${accent}40\`}}>
            Download Free on Android
          </a>
        </div>
      </div>
    </div>
  );
}
`;
fs.writeFileSync(path.join(parkPageDir,'page.js'),parkPageCode,'utf8');
console.log('Updated parks/[id]/page.js - reads from filesystem');
console.log('Done!');