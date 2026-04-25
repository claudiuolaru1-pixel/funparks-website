import fs from 'fs';
import path from 'path';

export const metadata={
  title:'Parks — Funparks',
  description:'All 64 theme parks in the Funparks app across 6 continents. Find tickets, skip the line passes, tours and hotels for every major theme park in the world.'
};

function getParks(){
  try{
    const p=path.join(process.cwd(),'public','data','parks_index.json');
    const raw=fs.readFileSync(p,'utf8').replace(/^\uFEFF/,'');
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
  'Denmark':'Europe','Poland':'Europe','Portugal':'Europe',
  'UAE':'Middle East','United Arab Emirates':'Middle East',
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
  return `${FIREBASE_BASE}/${encodeURIComponent(p)}?alt=media`;
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
                    <a key={p.id} href={`/parks/${p.id}`}
                      style={{display:'block',background:'white',borderRadius:'16px',overflow:'hidden',border:'2px solid #f0f0f8',textDecoration:'none',boxShadow:'0 2px 8px rgba(0,0,0,0.04)',transition:'transform 0.2s ease, box-shadow 0.2s ease'}}>
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
