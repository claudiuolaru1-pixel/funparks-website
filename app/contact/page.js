"use client";
import { useState } from "react";
export default function ContactPage(){
  const [form,setForm]=useState({name:"",email:"",subject:"",message:""});
  const [sent,setSent]=useState(false);
  const handleSubmit=(e)=>{
    e.preventDefault();
    window.location.href="mailto:funparksfun@gmail.com?subject="+encodeURIComponent(form.subject)+"&body="+encodeURIComponent("Name: "+form.name+"\nEmail: "+form.email+"\n\n"+form.message);
    setSent(true);
  };
  const socials=[
    {icon:"📧",label:"Email",value:"funparksfun@gmail.com",href:"mailto:funparksfun@gmail.com"},
    {icon:"📸",label:"Instagram",value:"@funparksapp",href:"https://instagram.com/funparksapp"},
    {icon:"🎵",label:"TikTok",value:"@funparksapp",href:"https://tiktok.com/@funparksapp"},
    {icon:"▶️",label:"YouTube",value:"@funparksapp",href:"https://youtube.com/@funparksapp"},
    {icon:"👍",label:"Facebook",value:"Funparks",href:"https://facebook.com/funparksapp"},
  ];
  return(
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-[#FF6B2B] text-sm font-semibold uppercase tracking-widest mb-4">Contact</p>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-4" style={{fontFamily:"Syne,sans-serif"}}>Get in <span className="gradient-text">touch</span></h1>
          <p className="text-white/50 text-lg max-w-lg">Have a question, suggestion or want to report a bug? We read every message.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            {socials.map(x=>(
              <a key={x.label} href={x.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 glass-card rounded-2xl p-5 hover:border-[#FF6B2B]/40 transition-all group">
                <div className="w-10 h-10 rounded-xl bg-[#FF6B2B]/10 flex items-center justify-center text-xl group-hover:bg-[#FF6B2B]/20 transition-colors">{x.icon}</div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5">{x.label}</p>
                  <p className="text-white font-semibold text-sm">{x.value}</p>
                </div>
              </a>
            ))}
          </div>
          {sent?(
            <div className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center">
              <div className="text-4xl mb-4">🎢</div>
              <h3 className="text-white font-bold text-xl mb-2" style={{fontFamily:"Syne,sans-serif"}}>Message sent!</h3>
              <p className="text-white/50 text-sm">We will get back to you shortly.</p>
            </div>
          ):(
            <form onSubmit={handleSubmit} className="space-y-4">
              {[{k:"name",l:"Your name",t:"text"},{k:"email",l:"Email address",t:"email"},{k:"subject",l:"Subject",t:"text"}].map(f=>(
                <div key={f.k}>
                  <label className="text-white/50 text-xs mb-1.5 block">{f.l}</label>
                  <input type={f.t} required value={form[f.k]} onChange={e=>setForm({...form,[f.k]:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B2B]/50 transition-colors"/>
                </div>
              ))}
              <div>
                <label className="text-white/50 text-xs mb-1.5 block">Message</label>
                <textarea rows={5} required value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B2B]/50 transition-colors resize-none"/>
              </div>
              <button type="submit" className="w-full py-4 rounded-xl bg-[#FF6B2B] text-white font-semibold hover:bg-[#FF8A4F] transition-all">Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}