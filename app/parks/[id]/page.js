import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

const FIREBASE_BASE='https://firebasestorage.googleapis.com/v0/b/funparks-779c6.firebasestorage.app/o';

function toFirebaseUrl(assetPath){
  if(!assetPath)return '';
  const p=assetPath.replace('assets/','');
  return `${FIREBASE_BASE}/${encodeURIComponent(p)}?alt=media`;
}

function getAllParks(){
  try{
    const p=path.join(process.cwd(),'public','data','parks_index.json');
    const raw=fs.readFileSync(p,'utf8').replace(/^\uFEFF/,'');
    return JSON.parse(raw);
  }catch{return[];}
}

function getI18n(id){
  try{
    const p=path.join(process.cwd(),'public','data','i18n',id+'.json');
    if(!fs.existsSync(p))return null;
    const raw=fs.readFileSync(p,'utf8').replace(/^\uFEFF/,'');
    return JSON.parse(raw);
  }catch{return null;}
}

function getAffiliateUrls(country,city,name){
  const skipQ=encodeURIComponent(`${city||''} ${name}`.trim());
  const toursQ=encodeURIComponent(`${city||''} ${name} tours`.trim());
  return{
    skipUrl:`https://www.getyourguide.com/s/?q=${skipQ}&filters=activity_type%3ASkip+the+Line&partner_id=GVNQTTL`,
    toursUrl:`https://www.viator.com/search/${toursQ}?pid=P00298240&mcid=42383&medium=link`
  };
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
    title:`${park.name} — Complete Guide | Funparks`,
    description:`Complete guide to ${park.name} in ${park.city}, ${park.country}. Attractions, tickets, skip the line, tours and hotels.`,
    openGraph:{
      title:`${park.name} — Complete Guide | Funparks`,
      description:`Complete guide to ${park.name} in ${park.city}, ${park.country}.`,
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
  const hotelsUrl=`https://www.booking.com/searchresults.html?aid=4347407&latitude=${park.lat}&longitude=${park.lng}&radius=10&label=funparks-web&group_adults=2&no_rooms=1`;

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
              style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'16px 20px',borderRadius:'14px',background:`linear-gradient(135deg,${accent},#f43f5e)`,color:'white',textDecoration:'none',fontWeight:800,fontSize:'15px',boxShadow:`0 4px 20px ${accent}40`}}>
              🎟️ Get Your Tickets Now
            </a>
          )}
          <a href={skipUrl} target="_blank" rel="noopener noreferrer"
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'16px 20px',borderRadius:'14px',background:'white',color:'#1a1a2e',textDecoration:'none',fontWeight:800,fontSize:'15px',border:`2px solid ${accent}`,boxShadow:'0 4px 12px rgba(0,0,0,0.08)'}}>
            ⚡ Skip the Line
          </a>
          <a href={toursUrl} target="_blank" rel="noopener noreferrer"
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'16px 20px',borderRadius:'14px',background:'white',color:'#1a1a2e',textDecoration:'none',fontWeight:800,fontSize:'15px',border:`2px solid ${accent}`,boxShadow:'0 4px 12px rgba(0,0,0,0.08)'}}>
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
          <a href="#" target="_blank" rel="noopener noreferrer"
            style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'16px 32px',borderRadius:'14px',background:`linear-gradient(135deg,${accent},#f43f5e)`,color:'white',textDecoration:'none',fontWeight:800,fontSize:'16px',boxShadow:`0 6px 24px ${accent}40`}}>
            Coming Soon on Android
          </a>
        </div>
      </div>
    </div>
  );
}
