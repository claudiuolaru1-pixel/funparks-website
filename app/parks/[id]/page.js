import { notFound } from 'next/navigation';

const FIREBASE_BASE = 'https://firebasestorage.googleapis.com/v0/b/funparks-779c6.firebasestorage.app/o';

function toFirebaseUrl(assetPath) {
  if (!assetPath) return '';
  const p = assetPath.replace('assets/', '');
  return `${FIREBASE_BASE}/${encodeURIComponent(p)}?alt=media`;
}

function getAffiliateUrls(country, city, name) {
  const c = (country || '').toLowerCase();
  const isAsia = ['japan','china','korea','hong kong','singapore','thailand','taiwan','indonesia','malaysia','philippines'].some(x => c.includes(x));
  const isAmericas = ['usa','united states','canada','australia','mexico'].some(x => c.includes(x));
  
  const skipQ = encodeURIComponent(`${city || ''} ${name} skip the line tickets`.trim());
  const toursQ = encodeURIComponent(`${city || ''} ${name} tours experiences`.trim());
  
  let skipUrl, toursUrl;
  if (isAsia) {
    skipUrl = `https://affiliate.klook.com/redirect?aid=119449&aff_adid=&k_site=https%3A%2F%2Fwww.klook.com%2Fsearch%2F%3Fquery%3D${skipQ}`;
    toursUrl = `https://affiliate.klook.com/redirect?aid=119449&aff_adid=&k_site=https%3A%2F%2Fwww.klook.com%2Fsearch%2F%3Fquery%3D${toursQ}`;
  } else if (isAmericas) {
    skipUrl = `https://www.viator.com/search/${encodeURIComponent(`${city} ${name} fast track`)}?pid=P00298240&mcid=42383&medium=link`;
    toursUrl = `https://www.viator.com/search/${encodeURIComponent(`${city} ${name} tours`)}?pid=P00298240&mcid=42383&medium=link`;
  } else {
    skipUrl = `https://www.getyourguide.com/s/?q=${encodeURIComponent(`${city} ${name} skip the line`)}&partner_id=GVNQTTL`;
    toursUrl = `https://www.getyourguide.com/s/?q=${encodeURIComponent(`${city} ${name} tours`)}&partner_id=GVNQTTL`;
  }
  return { skipUrl, toursUrl };
}

async function getParkData(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://funparks.app'}/data/parks_index.json`, { next: { revalidate: 86400 } });
    const parks = await res.json();
    return parks.find(p => p.id === id) || null;
  } catch { return null; }
}

async function getI18nData(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://funparks.app'}/data/i18n/${id}.json`, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

export async function generateMetadata({ params }) {
  const park = await getParkData(params.id);
  if (!park) return { title: 'Park Not Found' };
  return {
    title: `${park.name} — Complete Guide | Funparks`,
    description: `Complete guide to ${park.name} in ${park.city}, ${park.country}. Attractions, tickets, skip the line, tours and hotels.`,
    openGraph: {
      title: `${park.name} — Complete Guide | Funparks`,
      description: `Complete guide to ${park.name} in ${park.city}, ${park.country}.`,
      images: [toFirebaseUrl(park.thumbnail)],
    }
  };
}

export default async function ParkPage({ params }) {
  const park = await getParkData(params.id);
  if (!park) notFound();
  
  const i18n = await getI18nData(params.id);
  const overview = i18n?.overview || {};
  
  const thumbUrl = toFirebaseUrl(park.thumbnail);
  const { skipUrl, toursUrl } = getAffiliateUrls(park.country, park.city, park.name);
  const hotelsUrl = `https://www.booking.com/searchresults.html?aid=4347407&latitude=${park.lat}&longitude=${park.lng}&radius=10&label=funparks-web&group_adults=2&no_rooms=1`;
  
  const continentColors = {
    'USA': '#FF6B2B', 'United States': '#FF6B2B', 'Canada': '#FF6B2B',
    'Japan': '#a855f7', 'China': '#a855f7', 'South Korea': '#a855f7',
    'Hong Kong': '#a855f7', 'Singapore': '#a855f7', 'Thailand': '#a855f7',
    'Germany': '#06b6d4', 'France': '#06b6d4', 'Netherlands': '#06b6d4',
    'Belgium': '#06b6d4', 'Spain': '#06b6d4', 'Italy': '#06b6d4',
    'United Kingdom': '#06b6d4', 'Sweden': '#06b6d4', 'Denmark': '#06b6d4',
    'Poland': '#06b6d4', 'UAE': '#f43f5e',
    'Australia': '#10b981', 'South Africa': '#f59e0b',
    'Argentina': '#FF6B2B', 'Chile': '#FF6B2B', 'Brazil': '#FF6B2B', 'Mexico': '#FF6B2B',
  };
  const accentColor = continentColors[park.country] || '#FF6B2B';

  const sections = [
    { key: 'ov_overview_body', title: 'Overview' },
    { key: 'ov_highlights_body', title: 'Highlights' },
    { key: 'ov_did_you_know_body', title: 'Did You Know?' },
    { key: 'ov_plan_body', title: 'Plan Your Visit' },
    { key: 'ov_photos_body', title: 'Photography Tips' },
  ].filter(s => overview[s.key]?.en);

  return (
    <div style={{background:'#f8f7ff',minHeight:'100vh'}}>
      {/* Hero */}
      <div style={{position:'relative',height:'420px',overflow:'hidden'}}>
        {thumbUrl && (
          <img src={thumbUrl} alt={park.name} style={{width:'100%',height:'100%',objectFit:'cover'}} />
        )}
        <div style={{position:'absolute',inset:0,background:'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)'}} />
        <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'32px'}}>
          <div style={{maxWidth:'1200px',margin:'0 auto'}}>
            <a href="/parks" style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:'14px',fontWeight:600}}>← All Parks</a>
            <h1 style={{fontFamily:'Syne,sans-serif',fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:900,color:'white',margin:'8px 0 4px'}}>{park.name}</h1>
            <p style={{color:'rgba(255,255,255,0.8)',fontSize:'16px',fontWeight:500}}>{[park.city,park.country].filter(Boolean).join(', ')}</p>
          </div>
        </div>
      </div>

      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'32px 24px'}}>
        {/* Action Buttons */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'12px',marginBottom:'40px'}}>
          {park.ticketsUrl && (
            <a href={park.ticketsUrl} target="_blank" rel="noopener noreferrer"
              style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'14px 20px',borderRadius:'12px',background:`linear-gradient(135deg,${accentColor},#f43f5e)`,color:'white',textDecoration:'none',fontWeight:800,fontSize:'15px',boxShadow:'0 4px 15px rgba(0,0,0,0.15)'}}>
              🎟️ Get Your Tickets Now
            </a>
          )}
          <a href={skipUrl} target="_blank" rel="noopener noreferrer"
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'14px 20px',borderRadius:'12px',background:'white',color:'#1a1a2e',textDecoration:'none',fontWeight:800,fontSize:'15px',border:`2px solid ${accentColor}`,boxShadow:'0 4px 15px rgba(0,0,0,0.08)'}}>
            ⚡ Skip the Line
          </a>
          <a href={toursUrl} target="_blank" rel="noopener noreferrer"
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'14px 20px',borderRadius:'12px',background:'white',color:'#1a1a2e',textDecoration:'none',fontWeight:800,fontSize:'15px',border:`2px solid ${accentColor}`,boxShadow:'0 4px 15px rgba(0,0,0,0.08)'}}>
            🗺️ Tours & Experiences
          </a>
          <a href={hotelsUrl} target="_blank" rel="noopener noreferrer"
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',padding:'14px 20px',borderRadius:'12px',background:'#003580',color:'white',textDecoration:'none',fontWeight:800,fontSize:'15px',boxShadow:'0 4px 15px rgba(0,53,128,0.3)'}}>
            🏨 Find Hotels Nearby
          </a>
        </div>

        {/* Quick Info */}
        <div style={{display:'flex',flexWrap:'wrap',gap:'10px',marginBottom:'40px'}}>
          {park.openingHours && <span style={{padding:'6px 14px',borderRadius:'999px',background:'white',border:'1px solid #e5e7eb',fontSize:'13px',fontWeight:600,color:'#374151'}}>🕐 {park.openingHours}</span>}
          {park.entryPrices?.adult && <span style={{padding:'6px 14px',borderRadius:'999px',background:'white',border:'1px solid #e5e7eb',fontSize:'13px',fontWeight:600,color:'#374151'}}>💰 From {park.currency} {park.entryPrices.adult}</span>}
          <span style={{padding:'6px 14px',borderRadius:'999px',background:accentColor+'15',border:`1px solid ${accentColor}30`,fontSize:'13px',fontWeight:600,color:accentColor}}>{park.type || 'Theme Park'}</span>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr',gap:'24px'}}>
          {sections.map(({key,title}) => (
            <div key={key} style={{background:'white',borderRadius:'20px',padding:'28px',boxShadow:'0 2px 12px rgba(0,0,0,0.06)',border:'1px solid #f0f0f8'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'16px'}}>
                <div style={{width:'4px',height:'28px',borderRadius:'2px',background:accentColor}} />
                <h2 style={{fontFamily:'Syne,sans-serif',fontSize:'20px',fontWeight:900,color:'#1a1a2e',margin:0}}>{title}</h2>
              </div>
              <p style={{color:'#4b5563',lineHeight:1.8,fontSize:'16px',margin:0}}>{overview[key].en}</p>
            </div>
          ))}
        </div>

        {/* App Download CTA */}
        <div style={{marginTop:'48px',background:'linear-gradient(135deg,#1a1a2e,#16213e)',borderRadius:'24px',padding:'40px',textAlign:'center'}}>
          <h2 style={{fontFamily:'Syne,sans-serif',fontSize:'28px',fontWeight:900,color:'white',marginBottom:'12px'}}>Explore {park.name} in the App</h2>
          <p style={{color:'rgba(255,255,255,0.6)',fontSize:'16px',marginBottom:'24px'}}>Live wait times, AI assistant, attraction guides and more</p>
          <a href="https://play.google.com/store/apps/details?id=com.funparks.app" target="_blank" rel="noopener noreferrer"
            style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'14px 28px',borderRadius:'14px',background:'linear-gradient(135deg,#FF6B2B,#f43f5e)',color:'white',textDecoration:'none',fontWeight:800,fontSize:'16px'}}>
            Download Free on Android 🎢
          </a>
        </div>
      </div>
    </div>
  );
}
