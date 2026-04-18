export const metadata={title:'Privacy Policy — Funparks'};
export default function PrivacyPage(){
  return(
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-black text-white mb-2" style={{fontFamily:'Syne,sans-serif'}}>Privacy Policy</h1>
        <p className="text-white/40 text-sm mb-12">Last updated: April 2026</p>
        <div className="space-y-8 text-white/60 leading-relaxed">
          <section><h2 className="text-white font-bold text-lg mb-3" style={{fontFamily:'Syne,sans-serif'}}>1. Information We Collect</h2><p>Funparks collects minimal data necessary to provide the service. We collect anonymous usage analytics to improve the app. We do not collect personally identifiable information without your explicit consent.</p></section>
          <section><h2 className="text-white font-bold text-lg mb-3" style={{fontFamily:'Syne,sans-serif'}}>2. How We Use Information</h2><p>Any data collected is used solely to improve the Funparks app and website experience. We do not sell, rent or share your data with third parties for marketing purposes.</p></section>
          <section><h2 className="text-white font-bold text-lg mb-3" style={{fontFamily:'Syne,sans-serif'}}>3. Contact</h2><p>For privacy questions, contact us at <a href="mailto:hello@funparks.app" className="text-[#FF6B2B]">hello@funparks.app</a></p></section>
        </div>
      </div>
    </div>
  );
}
