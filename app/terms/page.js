export const metadata={title:'Terms of Service — Funparks'};
export default function TermsPage(){
  return(
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-black text-white mb-2" style={{fontFamily:'Syne,sans-serif'}}>Terms of Service</h1>
        <p className="text-white/40 text-sm mb-12">Last updated: April 2026</p>
        <div className="space-y-8 text-white/60 leading-relaxed">
          <section><h2 className="text-white font-bold text-lg mb-3" style={{fontFamily:'Syne,sans-serif'}}>1. Use of the App</h2><p>Funparks is provided free of charge for personal, non-commercial use. You agree not to misuse the service or attempt to access it by any means other than the interface provided.</p></section>
          <section><h2 className="text-white font-bold text-lg mb-3" style={{fontFamily:'Syne,sans-serif'}}>2. Disclaimer</h2><p>Wait time data and park information is provided for guidance only. Funparks is not affiliated with any theme park operator. Always verify opening times and prices directly with the park.</p></section>
          <section><h2 className="text-white font-bold text-lg mb-3" style={{fontFamily:'Syne,sans-serif'}}>3. Contact</h2><p>Questions? Email us at <a href="mailto:hello@funparks.app" className="text-[#FF6B2B]">hello@funparks.app</a></p></section>
        </div>
      </div>
    </div>
  );
}
