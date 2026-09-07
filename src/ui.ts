const CSS = `
@view-transition{navigation:auto}
::view-transition-old(root){animation:220ms cubic-bezier(0.4,0,1,1) both morphOut}
::view-transition-new(root){animation:260ms cubic-bezier(0,0,0.2,1) both morphIn}
@keyframes morphOut{from{opacity:1;transform:scale(1) translateY(0)}to{opacity:0;transform:scale(0.985) translateY(-8px)}}
@keyframes morphIn{from{opacity:0;transform:scale(1.015) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}

*{margin:0;padding:0;box-sizing:border-box}
:root{
  --gold:#C4A35A;--gold-light:#DFBF7A;--gold-dim:rgba(196,163,90,0.12);--gold-border:rgba(196,163,90,0.24);
  --bg:#030303;--surface:rgba(12,12,14,0.85);--surface2:rgba(20,20,24,0.92);--surface3:#161616;
  --text:#fff;--muted:#666;--muted2:#999;--accent:#00D4AA;--danger:#ff4d4d;
  --radius:14px;--radius-lg:18px
}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;line-height:1.6;overflow-x:hidden}
html{overflow-x:hidden}
a{color:var(--gold);text-decoration:none;transition:color .15s}
a:hover{color:#fff}
svg{display:inline-block;vertical-align:middle;flex-shrink:0}

.morph-stage{position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:0;overflow:hidden}
.morph-orb{position:absolute;border-radius:50%;filter:blur(85px);opacity:.16;animation:orbDrift 22s infinite alternate ease-in-out;will-change:transform}
.morph-orb-1{width:580px;height:580px;top:-100px;left:12%;background:radial-gradient(circle,#C4A35A 0%,rgba(196,163,90,0.15) 60%,transparent 80%)}
.morph-orb-2{width:520px;height:520px;bottom:8%;right:6%;background:radial-gradient(circle,#00D4AA 0%,rgba(0,212,170,0.12) 60%,transparent 80%);animation-duration:28s;animation-delay:-9s}
.morph-orb-3{width:440px;height:440px;top:45%;left:55%;background:radial-gradient(circle,#8555FF 0%,rgba(133,85,255,0.08) 60%,transparent 80%);animation-duration:32s;animation-delay:-17s}
@keyframes orbDrift{0%{transform:translate3d(0,0,0) scale(1) rotate(0deg)}50%{transform:translate3d(35px,-45px,0) scale(1.12) rotate(180deg)}100%{transform:translate3d(-35px,35px,0) scale(0.94) rotate(360deg)}}

.hdr{position:sticky;top:0;z-index:100;border-bottom:1px solid rgba(196,163,90,0.14);background:rgba(3,3,3,0.85);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)}
.hdr-inner{max-width:1100px;margin:0 auto;padding:0 28px;height:60px;display:flex;align-items:center;justify-content:space-between}
.logo{display:flex;align-items:center;gap:10px;font-size:1rem;font-weight:800;letter-spacing:-0.02em;color:#fff}
.logo-mark{width:28px;height:28px;background:var(--gold);border:1px solid var(--gold);border-radius:7px;display:flex;align-items:center;justify-content:center;color:#000}
.logo em{font-style:normal;color:var(--gold)}
.live-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse 2s infinite;flex-shrink:0}
.live-dot.off{background:var(--danger);animation:none}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.85)}}

.nav{display:flex;align-items:center;gap:6px}
.nav a{color:rgba(255,255,255,0.6);font-size:0.82rem;font-weight:500;padding:6px 12px;border-radius:8px;transition:color .15s,background .15s}
.nav a:hover{color:#fff;background:rgba(255,255,255,0.06)}
.nav a.active{color:#fff;background:rgba(255,255,255,0.09)}
.nav-cta{background:var(--gold)!important;color:#000!important;font-weight:700!important;padding:8px 20px!important;border-radius:8px!important;font-size:0.82rem!important;letter-spacing:0.01em!important;transition:background .15s,transform .12s,box-shadow .15s!important;box-shadow:0 2px 12px rgba(196,163,90,0.25)!important}
.nav-cta:hover{background:var(--gold-light)!important;color:#000!important;transform:translateY(-1px)!important;box-shadow:0 6px 20px rgba(196,163,90,0.35)!important}
.nav-ai-btn{color:var(--accent)!important;border:1px solid rgba(0,212,170,0.3)!important;border-radius:8px!important;padding:5px 13px!important;font-size:0.82rem!important;font-weight:600!important;transition:color .15s,border-color .15s,background .15s!important}
.nav-ai-btn:hover,.nav-ai-btn.nav-ai-active{background:rgba(0,212,170,0.08)!important;border-color:rgba(0,212,170,0.5)!important;color:var(--accent)!important}
.nav-donate{color:rgba(255,255,255,0.6)!important;transition:color .15s,background .15s!important}
.nav-donate:hover{color:#fff!important;background:rgba(255,255,255,0.06)!important;text-shadow:none!important}
.nav-donate.active{color:#fff!important;background:rgba(255,255,255,0.09)!important;border-radius:8px!important}
.nav-oracle-pill{display:inline-flex;align-items:center;gap:5px;font-size:0.78rem;font-weight:600;color:rgba(255,255,255,0.6);padding:4px 10px;border:1px solid rgba(255,255,255,0.08);border-radius:6px;transition:color .15s,border-color .15s;white-space:nowrap}
.nav-oracle-pill:hover,.nav-oracle-pill.active{color:var(--gold);border-color:var(--gold-border)}
.nav-guide-pill{display:inline-flex;align-items:center;font-size:0.71rem;font-weight:600;color:rgba(255,255,255,0.45);padding:4px 10px;border:1px solid rgba(255,255,255,0.07);border-radius:6px;transition:color .15s,border-color .15s;white-space:nowrap}
.nav-guide-pill:hover,.nav-guide-pill.active{color:var(--gold);border-color:var(--gold-border)}

.pbar{background:var(--surface);border-bottom:1px solid rgba(255,255,255,0.04);padding:0 28px;height:38px;display:flex;align-items:center;justify-content:center;gap:32px;font-size:0.78rem;overflow-x:auto;scrollbar-width:none;white-space:nowrap;transition:background .3s;position:relative;z-index:90}
.pbar.offline{background:rgba(255,77,77,0.05);border-bottom-color:rgba(255,77,77,0.12)}
.pbar::-webkit-scrollbar{display:none}
.pb-item{display:flex;align-items:center;gap:7px}
.pb-label{color:var(--muted)}
.pb-val{color:#fff;font-weight:600;font-variant-numeric:tabular-nums}
.pb-up{color:var(--accent)}.pb-dn{color:var(--danger)}
.pb-live{display:flex;align-items:center;gap:5px;color:var(--muted)}
.pb-live span{color:var(--accent);font-size:0.72rem;font-weight:600;text-transform:uppercase;letter-spacing:0.06em}

.wrap{max-width:1100px;margin:0 auto;padding:0 28px;position:relative;z-index:1}
.wrap-sm{max-width:720px;margin:0 auto;padding:0 28px;position:relative;z-index:1}
.wrap-md{max-width:860px;margin:0 auto;padding:0 28px;position:relative;z-index:1}

.hero{padding:56px 28px 48px;text-align:center;max-width:860px;margin:0 auto;position:relative;z-index:1}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:var(--gold-dim);border:1px solid var(--gold-border);color:var(--gold);font-size:0.73rem;font-weight:700;padding:5px 14px;border-radius:100px;margin-bottom:28px;letter-spacing:0.05em;text-transform:uppercase}
.hero h1{font-size:clamp(2.4rem,5.5vw,3.8rem);font-weight:800;letter-spacing:-0.04em;line-height:1.06;margin-bottom:20px}
.hero h1 em{font-style:normal;color:var(--gold)}
.hero-sub{font-size:1.02rem;color:var(--muted2);max-width:540px;margin:0 auto 36px;line-height:1.7}

.btn-row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:32px}
.btn-primary{display:inline-flex;align-items:center;gap:9px;background:var(--gold);color:#000;font-weight:700;font-size:0.9rem;padding:14px 28px;border-radius:11px;transition:background .15s,transform .12s,box-shadow .15s;white-space:nowrap;box-shadow:0 4px 20px rgba(196,163,90,0.25);touch-action:manipulation}
.btn-primary:hover{background:var(--gold-light);color:#000;transform:translateY(-2px);box-shadow:0 8px 28px rgba(196,163,90,0.4)}
.btn-ghost{display:inline-flex;align-items:center;gap:9px;border:1px solid var(--gold-border);color:var(--gold);font-size:0.88rem;padding:13px 24px;border-radius:11px;transition:all .2s;background:rgba(196,163,90,0.04)}
.btn-ghost:hover{border-color:var(--gold);color:#fff;background:var(--gold-dim)}
.btn-accent{display:inline-flex;align-items:center;gap:9px;background:rgba(0,212,170,0.12);border:1px solid rgba(0,212,170,0.3);color:var(--accent);font-size:0.88rem;font-weight:600;padding:13px 24px;border-radius:11px;transition:all .2s}
.btn-accent:hover{background:rgba(0,212,170,0.2);color:#fff}

.badge-strip{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:0 auto;max-width:860px}
.sbadge{display:inline-flex;align-items:center;background:var(--surface);border:1px solid rgba(255,255,255,0.06);border-radius:8px;overflow:hidden;font-size:0.72rem;box-shadow:0 4px 12px rgba(0,0,0,0.3);transition:border-color .15s,transform .15s}
.sbadge:hover{border-color:var(--gold-border);transform:translateY(-1px)}
.sbk{padding:5px 11px;color:var(--muted2);font-weight:500;border-right:1px solid rgba(255,255,255,0.05);white-space:nowrap}
.sbv{padding:5px 11px;font-weight:700;white-space:nowrap}
.sbv-green{background:var(--accent);color:#000}
.sbv-gold{background:var(--gold);color:#000}
.sbv-blue{background:#3B82F6;color:#fff}
.sbv-teal{background:rgba(0,212,170,0.12);color:var(--accent)}
.sbv-gray{background:rgba(255,255,255,0.05);color:#aaa}

.lp-wrap{max-width:860px;margin:28px auto 0;background:var(--surface);border:1px solid var(--gold-border);border-radius:var(--radius-lg);padding:32px;text-align:center;box-shadow:0 20px 48px -12px rgba(0,0,0,0.7),0 0 24px -4px rgba(196,163,90,0.15);position:relative;overflow:hidden;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}
.lp-wrap::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(196,163,90,0.4),transparent)}
.lp-eyebrow{font-size:0.73rem;text-transform:uppercase;letter-spacing:0.08em;color:var(--muted2);margin-bottom:12px;font-weight:600;display:flex;align-items:center;justify-content:center;gap:8px}
.lp-price{font-size:clamp(2.4rem,4vw,3.2rem);font-weight:800;letter-spacing:-0.04em;font-variant-numeric:tabular-nums;margin-bottom:20px;text-shadow:0 0 24px rgba(196,163,90,0.25)}
.lp-stats{display:flex;border-top:1px solid rgba(255,255,255,0.06);padding-top:18px}
.lp-stat{flex:1;text-align:center;border-right:1px solid rgba(255,255,255,0.06);padding:0 8px}
.lp-stat:last-child{border-right:none}
.lp-stat-label{font-size:0.71rem;color:var(--muted2);margin-bottom:4px;text-transform:uppercase;letter-spacing:0.05em}
.lp-stat-val{font-size:0.96rem;font-weight:700;font-variant-numeric:tabular-nums}
.up{color:var(--accent)}.down{color:var(--danger)}

.cmp-wrap{max-width:860px;margin:44px auto 0;position:relative;z-index:1}
.cmp-card{background:var(--surface);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-lg);overflow:hidden;box-shadow:0 18px 44px rgba(0,0,0,0.5);transition:border-color .2s}
.cmp-card:hover{border-color:var(--gold-border)}
.cmp-head{display:grid;grid-template-columns:1fr 64px 1fr;background:var(--surface2);border-bottom:1px solid rgba(255,255,255,0.05);padding:12px 24px;align-items:center;text-align:center;gap:8px}
.cmp-head-label{font-size:0.71rem;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:var(--muted2)}
.cmp-body{display:grid;grid-template-columns:1fr 64px 1fr;padding:32px 24px;align-items:center;text-align:center;gap:8px}
.cmp-cost{font-size:2.4rem;font-weight:800;letter-spacing:-0.04em;line-height:1}
.cmp-cost.red{color:#ff5555}
.cmp-cost.green{color:var(--accent)}
.cmp-detail{font-size:0.78rem;color:var(--muted2);margin-top:6px}
.cmp-detail.hi{color:var(--accent)}
.cmp-vs{font-size:0.82rem;font-weight:700;color:var(--muted);text-align:center}
.cmp-note{font-size:0.74rem;text-align:center;color:var(--muted2);padding:12px 24px;border-top:1px solid rgba(255,255,255,0.05);background:var(--surface2);letter-spacing:0.04em}

.why-wrap{max-width:860px;margin:44px auto 0;position:relative;z-index:1}
.why-title{font-size:1.25rem;font-weight:800;letter-spacing:-0.025em;margin-bottom:16px;text-align:center}
.why-title em{font-style:normal;color:var(--gold)}
.why-table{background:var(--surface);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-lg);overflow:hidden;box-shadow:0 18px 40px rgba(0,0,0,0.5)}
.wt-head{display:grid;grid-template-columns:1fr 160px 140px;padding:12px 20px;background:var(--surface2);border-bottom:1px solid rgba(255,255,255,0.05);font-size:0.73rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase}
.wt-row{display:grid;grid-template-columns:1fr 160px 140px;padding:12px 20px;border-bottom:1px solid rgba(255,255,255,0.03);font-size:0.83rem;align-items:center;transition:background .15s}
.wt-row:last-child{border-bottom:none}
.wt-row:hover{background:rgba(255,255,255,0.02)}
.wt-feat{color:#ccc}
.wt-col{text-align:center;font-size:0.83rem}
.wt-col.muted{color:var(--muted2)}
.wt-col.gold{color:var(--gold);font-weight:700}
.wt-col.bold{font-size:1rem;font-weight:800}
.wt-check{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:5px;background:rgba(0,212,170,0.15);color:var(--accent);font-size:0.85rem;font-weight:700}
.wt-x{display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:5px;background:rgba(255,77,77,0.1);color:#ff5555;font-size:0.85rem;font-weight:700}

.nav-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;max-width:860px;margin:44px auto 0;position:relative;z-index:1}
@media(max-width:768px){.nav-grid{grid-template-columns:1fr 1fr}}
.ngi{background:var(--surface);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px;text-decoration:none;transition:border-color .2s,background .15s,transform .15s;box-shadow:0 8px 24px rgba(0,0,0,0.3)}
.ngi:hover{border-color:var(--gold-border);background:var(--surface2);transform:translateY(-2px)}
.ngi-ico{width:32px;height:32px;border-radius:8px;background:rgba(196,163,90,0.08);border:1px solid rgba(196,163,90,0.18);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:0.95rem;color:var(--gold)}
.ngi-ico.g{background:rgba(0,212,170,0.08);border-color:rgba(0,212,170,0.2);color:var(--accent)}
.ngi span{font-size:0.82rem;font-weight:600;color:#ccc}
.ngi:hover span{color:#fff}

.tools-cta{max-width:860px;margin:44px auto 0;position:relative;z-index:1}
.tools-cta-inner{background:var(--surface);border:1px solid var(--gold-border);border-radius:var(--radius-lg);padding:32px 36px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;box-shadow:0 18px 44px rgba(0,0,0,0.5);position:relative;overflow:hidden}
.tools-cta-inner::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(196,163,90,0.4),transparent)}
.tools-cta-text h3{font-size:1.18rem;font-weight:800;letter-spacing:-0.02em;margin-bottom:8px}
.tools-cta-text p{font-size:0.84rem;color:var(--muted2);max-width:440px;line-height:1.65}
.tools-cta-badges{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
.tbadge{font-size:0.7rem;font-weight:700;padding:3px 10px;border-radius:5px;letter-spacing:0.04em;text-transform:uppercase}
.tbadge.free{background:rgba(255,255,255,0.06);color:var(--muted2);border:1px solid rgba(255,255,255,0.1)}
.tbadge.starter{background:var(--gold-dim);color:var(--gold);border:1px solid var(--gold-border)}
.tbadge.pro{background:rgba(100,160,255,0.1);color:#64A0FF;border:1px solid rgba(100,160,255,0.2)}
.tbadge.biz{background:rgba(255,100,100,0.1);color:#FF7070;border:1px solid rgba(255,100,100,0.2)}
.btn-tools{background:var(--gold);color:#000;font-weight:800;font-size:0.88rem;padding:14px 28px;border-radius:10px;white-space:nowrap;transition:background .15s,transform .1s,box-shadow .15s;display:inline-block;box-shadow:0 4px 18px rgba(196,163,90,0.25)}
.btn-tools:hover{background:var(--gold-light);color:#000;transform:translateY(-1px);box-shadow:0 8px 24px rgba(196,163,90,0.4)}

.section{max-width:860px;margin:0 auto;padding:64px 0 0;position:relative;z-index:1}
.sec-title{font-size:1.35rem;font-weight:800;letter-spacing:-0.025em;margin-bottom:6px}
.sec-title span{color:var(--gold)}
.sec-sub{font-size:0.85rem;color:var(--muted2);margin-bottom:28px}

.ep-list{display:flex;flex-direction:column;gap:10px}
.ep{background:var(--surface);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:16px 20px;display:flex;align-items:flex-start;gap:14px;transition:border-color .2s,background .2s}
.ep:hover{border-color:var(--gold-border);background:var(--surface2)}
.ep-method{font-size:0.68rem;font-weight:700;padding:3px 8px;border-radius:4px;letter-spacing:0.06em;white-space:nowrap;flex-shrink:0;margin-top:3px}
.m-get{background:rgba(0,212,170,0.1);color:var(--accent);border:1px solid rgba(0,212,170,0.22)}
.ep-path{font-family:'SF Mono','Fira Mono','Menlo',monospace;font-size:0.84rem;color:#fff;margin-bottom:4px;font-weight:600}
.ep-desc{font-size:0.79rem;color:var(--muted2);line-height:1.55}
.ep-try{margin-top:8px}
.ep-try a{font-size:0.73rem;color:var(--gold);border:1px solid var(--gold-border);padding:3px 10px;border-radius:5px;transition:background .15s,color .15s}
.ep-try a:hover{background:var(--gold-dim);color:#fff}

.tool-card{background:var(--surface);border:1px solid var(--gold-border);border-radius:var(--radius-lg);padding:26px;box-shadow:0 16px 40px -10px rgba(0,0,0,0.6)}
.field{margin-bottom:15px}
.field label{display:block;font-size:0.71rem;color:var(--muted2);margin-bottom:6px;font-weight:600;letter-spacing:0.07em;text-transform:uppercase}
.field select{width:100%;background:var(--surface2) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8'%3E%3Cpolyline points='1 1 6 7 11 1' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E") no-repeat right 12px center;background-size:12px 8px;border:1px solid #1a1a1a;border-radius:9px;color:#fff;padding:11px 36px 11px 14px;font-size:0.86rem;outline:none;font-family:inherit;appearance:none;-webkit-appearance:none;cursor:pointer;transition:border-color .15s;min-height:44px}
.field select:focus{border-color:var(--gold-border)}
.field select option{background:#111}
.tool-btn{width:100%;background:var(--gold);color:#000;border:none;padding:12px;border-radius:9px;font-weight:700;font-size:0.88rem;cursor:pointer;font-family:inherit;transition:background .15s,box-shadow .15s;min-height:44px;box-shadow:0 4px 16px rgba(196,163,90,0.2)}
.tool-btn:hover{background:var(--gold-light);box-shadow:0 6px 22px rgba(196,163,90,0.35)}
.tool-result{margin-top:12px;font-size:0.83rem;min-height:16px}
.tool-result.ok{color:var(--accent)}.tool-result.err{color:var(--danger)}.tool-result.loading{color:var(--muted2)}
.json-out{display:none;margin-top:12px;background:var(--surface2);border:1px solid rgba(255,255,255,0.06);border-radius:9px;padding:14px;font-family:'SF Mono','Fira Mono','Menlo',monospace;font-size:0.77rem;color:#aaa;overflow-x:auto;white-space:pre;max-height:240px;overflow-y:auto}
.json-out.visible{display:block}

.donate-cta{max-width:860px;margin:44px auto 0;position:relative;z-index:1}
.donate-cta-inner{background:linear-gradient(135deg,rgba(196,163,90,0.08) 0%,rgba(12,12,14,0.95) 60%);border:1px solid var(--gold-border);border-radius:var(--radius-lg);padding:40px 32px;text-align:center;box-shadow:0 18px 48px rgba(0,0,0,0.6)}
.donate-cta-inner h3{font-size:1.25rem;font-weight:800;letter-spacing:-0.025em;margin-bottom:10px}
.donate-cta-inner p{font-size:0.88rem;color:var(--muted2);max-width:480px;margin:0 auto 24px;line-height:1.7}
.btn-donate{display:inline-flex;align-items:center;gap:9px;background:var(--gold);color:#000;font-weight:800;font-size:0.9rem;padding:14px 34px;border-radius:100px;transition:background .15s,box-shadow .2s,transform .15s;box-shadow:0 0 24px rgba(196,163,90,0.28)}
.btn-donate:hover{background:var(--gold-light);color:#000;transform:translateY(-2px);box-shadow:0 0 36px rgba(196,163,90,0.5)}
.donate-note{margin-top:14px;font-size:0.75rem;color:var(--muted2)}

.footer{border-top:1px solid rgba(255,255,255,0.05);padding:36px 28px;text-align:center;color:var(--muted);font-size:0.76rem;position:relative;z-index:1;margin-top:72px}
.footer-links{display:flex;justify-content:center;gap:28px;margin-bottom:12px;flex-wrap:wrap}
.footer-links a{color:var(--muted2);transition:color .15s}
.footer-links a:hover{color:var(--gold)}
.footer-brand{color:var(--muted);display:flex;align-items:center;justify-content:center;gap:8px}

.agent-fab{position:fixed;bottom:24px;right:24px;z-index:999;width:58px;height:58px;border-radius:50%;background:var(--gold);color:#000;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 30px rgba(196,163,90,0.45);transition:transform .2s cubic-bezier(0.16,1,0.3,1),box-shadow .2s;font-family:inherit;touch-action:manipulation}
.agent-fab:hover{transform:scale(1.08);box-shadow:0 12px 38px rgba(196,163,90,0.6)}
.agent-fab .notif{position:absolute;top:-2px;right:-2px;width:14px;height:14px;border-radius:50%;background:var(--accent);border:2px solid #000;animation:pulse 2s infinite}
.ap-contact-btn{background:none;border:none;color:var(--muted2);cursor:pointer;padding:5px 8px;border-radius:7px;transition:color .15s,background .15s;display:flex;align-items:center;gap:5px;font-size:0.72rem;font-weight:600;font-family:inherit;white-space:nowrap}
.ap-contact-btn:hover{color:var(--gold);background:rgba(196,163,90,0.08)}

.agent-panel{position:fixed;bottom:94px;right:24px;z-index:998;width:360px;max-height:560px;background:rgba(10,10,12,0.94);backdrop-filter:blur(28px);-webkit-backdrop-filter:blur(28px);border:1px solid var(--gold-border);border-radius:18px;display:none;flex-direction:column;box-shadow:0 24px 70px rgba(0,0,0,0.85),0 0 30px rgba(196,163,90,0.12);animation:apSlideUp 0.28s cubic-bezier(0.16,1,0.3,1)}
@keyframes apSlideUp{from{opacity:0;transform:translateY(14px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}
.agent-panel.open{display:flex}
.ap-sheet-handle{display:none}

.ap-head{padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;gap:10px;flex-shrink:0}
.ap-head-icon{width:30px;height:30px;border-radius:50%;background:var(--gold-dim);border:1px solid var(--gold-border);display:flex;align-items:center;justify-content:center;color:var(--gold);flex-shrink:0}
.ap-head-info{flex:1}
.ap-head-name{font-size:0.86rem;font-weight:700}
.ap-head-status{font-size:0.7rem;color:var(--accent)}
.ap-close{background:none;border:none;color:var(--muted2);cursor:pointer;padding:4px;font-size:1.1rem;line-height:1}
.ap-close:hover{color:#fff}

.ap-chips{display:flex;gap:6px;padding:8px 14px;overflow-x:auto;scrollbar-width:none;background:rgba(0,0,0,0.3);border-top:1px solid rgba(255,255,255,0.04)}
.ap-chips::-webkit-scrollbar{display:none}
.ap-chip{background:rgba(196,163,90,0.08);border:1px solid rgba(196,163,90,0.22);color:var(--gold);font-size:0.72rem;font-weight:600;padding:4px 10px;border-radius:100px;cursor:pointer;white-space:nowrap;transition:all .15s;font-family:inherit}
.ap-chip:hover{background:var(--gold);color:#000;border-color:var(--gold)}

.ap-messages{overflow-y:auto;padding:14px 16px;display:flex;flex-direction:column;gap:10px;min-height:180px;max-height:320px}
.ap-msg{max-width:88%;padding:10px 14px;border-radius:14px;font-size:0.82rem;line-height:1.55}
.ap-msg.agent{background:var(--surface2);color:#ddd;border-radius:14px 14px 14px 3px;align-self:flex-start;border:1px solid rgba(255,255,255,0.04)}
.ap-msg.user{background:var(--gold-dim);border:1px solid var(--gold-border);color:#fff;border-radius:14px 14px 3px 14px;align-self:flex-end}
.ap-msg.typing{display:inline-flex;align-items:center;gap:4px;padding:10px 14px}
.typing-dot{width:5px;height:5px;background:var(--gold);border-radius:50%;animation:typingBounce 1.2s infinite ease-in-out}
.typing-dot:nth-child(2){animation-delay:0.2s}
.typing-dot:nth-child(3){animation-delay:0.4s}
@keyframes typingBounce{0%,80%,100%{transform:translateY(0);opacity:0.4}40%{transform:translateY(-5px);opacity:1}}

.ap-input-row{padding:12px 14px;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:8px;flex-shrink:0}
.ap-inp{flex:1;background:var(--surface2);border:1px solid #1a1a1a;border-radius:9px;color:#fff;padding:10px 12px;font-size:0.84rem;outline:none;font-family:inherit;transition:border-color .15s}
.ap-inp:focus{border-color:var(--gold-border)}
.ap-inp::placeholder{color:var(--muted)}
.ap-send{background:var(--gold);color:#000;border:none;padding:10px 15px;border-radius:9px;font-weight:700;font-size:0.82rem;cursor:pointer;transition:background .15s;flex-shrink:0}
.ap-send:hover{background:var(--gold-light)}
.ap-send:disabled{opacity:.4;cursor:not-allowed}
.ap-contact-form{display:none;overflow-y:auto;padding:14px 16px;flex-direction:column;gap:10px;min-height:200px}
.ct-back{background:none;border:none;color:var(--muted2);cursor:pointer;font-size:0.79rem;padding:0;margin-bottom:4px;display:flex;align-items:center;gap:5px;font-family:inherit;transition:color .15s}
.ct-back:hover{color:var(--gold)}
.ct-field{display:flex;flex-direction:column;gap:5px}
.ct-field label{font-size:0.71rem;color:var(--muted2);font-weight:600;letter-spacing:0.05em;text-transform:uppercase}
.ct-field input,.ct-field textarea{background:var(--surface2);border:1px solid #1c1c1c;border-radius:8px;color:#fff;padding:8px 11px;font-size:0.82rem;outline:none;font-family:inherit;transition:border-color .15s;resize:none;width:100%}
.ct-field input:focus,.ct-field textarea:focus{border-color:var(--gold-border)}
.ct-field textarea{height:70px}
.ct-submit{background:var(--gold);color:#000;border:none;padding:10px;border-radius:8px;font-weight:700;font-size:0.86rem;cursor:pointer;font-family:inherit;transition:background .15s}
.ct-submit:hover{background:var(--gold-light)}.ct-submit:disabled{opacity:.5;cursor:default}
.ct-result{font-size:0.78rem;min-height:14px}
.ct-result.ok{color:var(--accent)}.ct-result.err{color:var(--danger)}
.ct-or{display:flex;align-items:center;gap:8px;color:var(--muted);font-size:0.72rem}
.ct-or::before,.ct-or::after{content:'';flex:1;border-top:1px solid #1a1a1a}
.ct-x-link{display:flex;align-items:center;justify-content:center;gap:7px;border:1px solid #1c1c1c;border-radius:8px;padding:9px;font-size:0.81rem;color:var(--muted2);transition:border-color .15s,color .15s;text-decoration:none}
.ct-x-link:hover{border-color:var(--gold-border);color:var(--gold)}

.hbg{display:none;background:none;border:none;cursor:pointer;padding:8px;flex-direction:column;gap:5px;justify-content:center;align-items:center;flex-shrink:0}
.hbg span{display:block;width:20px;height:2px;background:var(--muted2);border-radius:2px;transition:all .25s}
.hbg.is-open span:nth-child(1){transform:translateY(7px) rotate(45deg)}
.hbg.is-open span:nth-child(2){opacity:0}
.hbg.is-open span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
.mob-nav{display:none;position:fixed;top:60px;left:0;right:0;bottom:0;background:rgba(0,0,0,0.97);padding:16px 20px calc(40px + env(safe-area-inset-bottom));z-index:998;flex-direction:column;gap:0;backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);overflow-y:auto}
.mob-nav.is-open{display:flex}
.mob-nav a{display:block;padding:14px 16px;color:var(--muted2);font-size:0.95rem;font-weight:500;border-radius:10px;transition:color .15s,background .15s;border-bottom:1px solid #0d0d0d}
.mob-nav a.mob-active{color:var(--gold);background:var(--gold-dim)}
.mob-nav .mob-cta{background:var(--gold);color:#000!important;font-weight:800;text-align:center;margin-top:14px;border-radius:10px;padding:15px 16px!important;border:none;display:block;border-bottom:none!important;font-size:0.95rem}
.mob-nav .mob-ai{color:var(--accent)!important;border:1px solid rgba(0,212,170,0.3);border-radius:8px;text-align:center;margin-top:6px;border-bottom:none!important;padding:12px 16px!important;font-weight:600!important}
.mob-nav .mob-donate{color:rgba(196,163,90,0.8)!important}

@media(max-width:768px){
  .wrap,.wrap-sm,.wrap-md{padding:0 20px}
  .hdr-inner{padding:0 20px}
  .pbar{padding:0 18px;gap:20px}
  .pbar .pb-item:nth-child(6){display:none}
  .cmp-head,.cmp-body{grid-template-columns:1fr 48px 1fr}
  .cmp-cost{font-size:1.9rem}
}
@media(max-width:640px){
  .wrap,.wrap-sm,.wrap-md{padding:0 16px}
  .hero{padding:40px 16px 32px}
  .hdr-inner{padding:0 16px}
  .pbar{padding:0 12px;gap:12px;font-size:0.71rem;height:32px}
  .pbar .pb-item:nth-child(5){display:none}
  .hbg{display:flex}
  .nav a{display:none!important}
  .agent-panel{position:fixed;bottom:0!important;left:0!important;right:0!important;width:100vw!important;max-height:84vh!important;border-radius:22px 22px 0 0!important;border-bottom:none!important;animation:apSheetUp 0.3s cubic-bezier(0.16,1,0.3,1)}
  @keyframes apSheetUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
  .ap-sheet-handle{display:block;width:38px;height:4px;background:rgba(255,255,255,0.25);border-radius:4px;margin:8px auto 2px;cursor:pointer}
  .agent-fab{bottom:calc(16px + env(safe-area-inset-bottom))!important;right:16px!important;width:52px;height:52px}
  .btn-row{flex-direction:column;align-items:stretch;gap:10px}
  .btn-row .btn-primary,.btn-row .btn-ghost,.btn-row .btn-accent{width:100%;justify-content:center}
  .btn-primary{padding:14px 20px;min-height:48px}
  .btn-ghost,.btn-accent{padding:13px 20px;min-height:48px}
  .lp-stats{flex-wrap:wrap}
  .lp-stat{min-width:50%;border-bottom:1px solid rgba(255,255,255,0.06);padding:8px 0}
  .lp-stat:last-child{border-bottom:none}
  .tools-cta-inner{flex-direction:column;text-align:center}
  .tools-cta-text p{max-width:100%}
  .section{padding:48px 0 0}
  .ep{padding:14px 16px;flex-direction:column;gap:8px}
  .ep-method{align-self:flex-start}
  .field select,.tool-btn{font-size:0.9rem}
  .donate-cta-inner{padding:28px 16px}
  .btn-donate{width:100%;justify-content:center}
  .wt-head,.wt-row{grid-template-columns:1fr 80px 80px;padding:10px 12px}
  .wt-feat{font-size:0.76rem}
}
@media(max-width:480px){
  .nav-guide-pill{display:none}
  .hero h1{font-size:1.9rem}
  .hero-sub{font-size:0.88rem}
  .hero-badge{font-size:0.68rem;padding:4px 12px}
  .pbar .pb-item:nth-child(4){display:none}
  .pbar{gap:10px;font-size:0.68rem}
}
`;

export function renderHome(socialUrl: string): string {
  const base = (socialUrl || "").replace(/\/$/, "");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>KTA Oracle — Intelligence Engine</title>
<meta name="description" content="KTA Oracle — real-time price intelligence, FX rates, whale detection and on-chain analytics. Powered by Keeta Network.">
<meta property="og:type" content="website">
<meta property="og:url" content="${base || "https://kta-oracle.top"}/oracle">
<meta property="og:title" content="KTA Oracle — Intelligence Engine">
<meta property="og:description" content="Real-time price data, FX rates, whale detection, and on-chain analytics — running natively on Keeta Network.">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<style>${CSS}</style>
</head>
<body>

<div class="morph-stage" aria-hidden="true">
  <div class="morph-orb morph-orb-1"></div>
  <div class="morph-orb morph-orb-2"></div>
  <div class="morph-orb morph-orb-3"></div>
</div>

<header class="hdr">
  <div class="hdr-inner">
    <div style="display:flex;align-items:center;gap:8px">
      <a href="${base}/onboard" class="logo">
        <div class="logo-mark"><svg width="14" height="14" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="currentColor"/></svg></div>
        KTA <em>Oracle</em>
      </a>
      <div style="width:1px;height:16px;background:rgba(255,255,255,0.08);margin:0 2px;flex-shrink:0"></div>
      <a href="${base ? base+'/oracle' : '/oracle'}" class="nav-oracle-pill active"><span class="live-dot" style="width:5px;height:5px;flex-shrink:0"></span>Oracle</a>
      ${base ? `<a href="${base}/guide" class="nav-guide-pill">Guide</a>` : ''}
    </div>
    <nav class="nav">
      ${base ? `<a href="${base}/onboard">Onboard</a>` : ''}
      ${base ? `<a href="${base}/checkout">Pricing</a>` : ''}
      ${base ? `<a href="${base}/tools">Tools</a>` : ''}
      ${base ? `<a href="${base}/donate" class="nav-donate">Donate</a>` : ''}
      ${base ? `<a href="${base}/tools#ai" class="nav-ai-btn">Connect AI</a>` : ''}
      ${base ? `<a href="${base}/checkout" class="nav-cta">Get access →</a>` : ''}
    </nav>
    <button class="hbg" id="hbg-btn" onclick="toggleMobNav()" aria-label="Menu"><span></span><span></span><span></span></button>
  </div>
</header>

<div class="pbar" id="pbar">
  <div class="pb-item pb-live"><span class="live-dot"></span><span>LIVE</span></div>
  <div class="pb-item"><span class="pb-label">KTA/USD</span>&nbsp;<span class="pb-val" id="pb-price">—</span></div>
  <div class="pb-item"><span class="pb-label">1h</span>&nbsp;<span class="pb-val" id="pb-1h">—</span></div>
  <div class="pb-item"><span class="pb-label">24h</span>&nbsp;<span class="pb-val" id="pb-24h">—</span></div>
  <div class="pb-item"><span class="pb-label">7d</span>&nbsp;<span class="pb-val" id="pb-7d">—</span></div>
  <div class="pb-item"><span class="pb-label">Network</span>&nbsp;<span class="pb-val" style="color:var(--accent)">Keeta Mainnet</span></div>
</div>

<nav class="mob-nav" id="mob-nav">
  <a href="${base ? base+'/oracle' : '/oracle'}" class="mob-active">Oracle</a>
  ${base ? `<a href="${base}/onboard">Onboard</a>` : ''}
  ${base ? `<a href="${base}/guide">Guide</a>` : ''}
  ${base ? `<a href="${base}/checkout">Pricing</a>` : ''}
  ${base ? `<a href="${base}/tools">Tools</a>` : ''}
  ${base ? `<a href="${base}/donate" class="mob-donate">Donate</a>` : ''}
  ${base ? `<a href="${base}/tools#ai" class="mob-ai">Connect AI</a>` : ''}
  ${base ? `<a href="${base}/checkout" class="mob-cta">Get access →</a>` : ''}
</nav>

<main id="page-root">
<section class="hero wrap">
  <div class="hero-badge"><span class="live-dot"></span>Live · Keeta Network · 0.4s settlement</div>
  <h1>KTA <em>Oracle</em><br>Intelligence Engine</h1>
  <p class="hero-sub">Real-time price data, FX rates, whale detection, and on-chain analytics — running natively on Keeta Network.</p>

  <div class="btn-row">
    ${base ? `<a href="${base}/onboard" class="btn-primary">Get started →</a>` : ''}
    <a href="#tools" class="btn-ghost">Try live tools</a>
    ${base ? `<a href="${base}/tools" class="btn-accent">Browse 19 SDK tools</a>` : ''}
  </div>

  <div class="badge-strip">
    <div class="sbadge"><span class="sbk">Currencies</span><span class="sbv sbv-gray">160+</span></div>
    <div class="sbadge"><span class="sbk">Settlement</span><span class="sbv sbv-gold">0.4s</span></div>
    <div class="sbadge"><span class="sbk">Tools</span><span class="sbv sbv-teal">19 active</span></div>
    <div class="sbadge"><span class="sbk">Uptime</span><span class="sbv sbv-blue">99.9% SLA</span></div>
    <div class="sbadge"><span class="sbk">Network</span><span class="sbv sbv-gold">Keeta</span></div>
    <div class="sbadge"><span class="sbk">Chain</span><span class="sbv sbv-gold">Decentralized</span></div>
    <div class="sbadge"><a href="https://github.com/Elemzir/KTA-Oracle" target="_blank" rel="noopener" style="text-decoration:none"><span class="sbk">GitHub</span><span class="sbv sbv-teal">Open ↗</span></a></div>
  </div>

  <div class="lp-wrap">
    <div class="lp-eyebrow"><span class="live-dot"></span>KTA / USD — Live Native Feeds</div>
    <div class="lp-price" id="lp-price">—</div>
    <div class="lp-stats">
      <div class="lp-stat"><div class="lp-stat-label">1h change</div><div class="lp-stat-val" id="lp-1h">—</div></div>
      <div class="lp-stat"><div class="lp-stat-label">24h change</div><div class="lp-stat-val" id="lp-24h">—</div></div>
      <div class="lp-stat"><div class="lp-stat-label">7d change</div><div class="lp-stat-val" id="lp-7d">—</div></div>
    </div>
  </div>
</section>

<div class="cmp-wrap wrap">
  <div class="cmp-card">
    <div class="cmp-head">
      <div class="cmp-head-label">SWIFT wire — $50,000</div>
      <div></div>
      <div class="cmp-head-label">Keeta Network — $50,000</div>
    </div>
    <div class="cmp-body">
      <div>
        <div class="cmp-cost red">~$1,050</div>
        <div class="cmp-detail">3–5 business days</div>
      </div>
      <div class="cmp-vs">vs</div>
      <div>
        <div class="cmp-cost green">$75</div>
        <div class="cmp-detail hi">0.4 seconds</div>
      </div>
    </div>
    <div class="cmp-note">14× cheaper &nbsp;·&nbsp; 1,080,000× faster &nbsp;·&nbsp; same global finality</div>
  </div>
</div>

<div class="why-wrap wrap">
  <div class="why-title">Why <em>KTA-Oracle</em>?</div>
  <div class="why-table">
    <div class="wt-head">
      <div class="wt-feat">Feature</div>
      <div class="wt-col muted">Standard MCP</div>
      <div class="wt-col gold">KTA-Oracle</div>
    </div>
    <div class="wt-row">
      <div class="wt-feat">Tools available</div>
      <div class="wt-col muted">1–5</div>
      <div class="wt-col gold bold">19</div>
    </div>
    <div class="wt-row">
      <div class="wt-feat">AI-powered reasoning on every response</div>
      <div class="wt-col"><span class="wt-x">✕</span></div>
      <div class="wt-col"><span class="wt-check">✓</span></div>
    </div>
    <div class="wt-row">
      <div class="wt-feat">Tiered subscriptions + on-chain payments</div>
      <div class="wt-col"><span class="wt-x">✕</span></div>
      <div class="wt-col"><span class="wt-check">✓</span></div>
    </div>
    <div class="wt-row">
      <div class="wt-feat">Agent-specific onboarding (autonomous)</div>
      <div class="wt-col"><span class="wt-x">✕</span></div>
      <div class="wt-col"><span class="wt-check">✓</span></div>
    </div>
    <div class="wt-row">
      <div class="wt-feat">AML + compliance tools</div>
      <div class="wt-col"><span class="wt-x">✕</span></div>
      <div class="wt-col"><span class="wt-check">✓</span></div>
    </div>
    <div class="wt-row">
      <div class="wt-feat">Production SDK code snippets</div>
      <div class="wt-col"><span class="wt-x">✕</span></div>
      <div class="wt-col"><span class="wt-check">✓</span></div>
    </div>
    <div class="wt-row">
      <div class="wt-feat">Rate limiting + abuse protection</div>
      <div class="wt-col"><span class="wt-x">✕</span></div>
      <div class="wt-col"><span class="wt-check">✓</span></div>
    </div>
    <div class="wt-row">
      <div class="wt-feat">Listed on 5+ marketplaces</div>
      <div class="wt-col"><span class="wt-x">✕</span></div>
      <div class="wt-col"><span class="wt-check">✓</span></div>
    </div>
  </div>
</div>

<div class="nav-grid wrap">
  ${base ? `<a href="${base}/onboard" class="ngi"><div class="ngi-ico">🌐</div><span>Live Portal</span></a>` : ''}
  <a href="/health" class="ngi"><div class="ngi-ico g"><span style="color:var(--accent);font-size:0.65rem">●</span></div><span>System Status</span></a>
  ${base ? `<a href="${base}/guide" class="ngi"><div class="ngi-ico">📖</div><span>How to Use</span></a>` : ''}
  ${base ? `<a href="${base}/legal" class="ngi"><div class="ngi-ico">🔒</div><span>Legal &amp; Privacy</span></a>` : ''}
  ${base ? `<a href="${base}/onboard#status" class="ngi"><div class="ngi-ico">💳</div><span>Account Status</span></a>` : ''}
  <a href="https://x.com/elemzir" target="_blank" rel="noopener" class="ngi"><div class="ngi-ico">💬</div><span>Support on X</span></a>
  ${base ? `<a href="${base}/guide" class="ngi"><div class="ngi-ico">🔧</div><span>Troubleshoot</span></a>` : ''}
  ${base ? `<a href="${base}/onboard#register" class="ngi"><div class="ngi-ico">👤</div><span>Social Agent</span></a>` : ''}
</div>

<div class="tools-cta wrap" id="sdk-tools">
  <div class="tools-cta-inner">
    <div class="tools-cta-text">
      <h3>19 SDK tools — all active</h3>
      <p>From live price queries to on-chain certificate operations, wallet scoring, and compliance checks. Each tool is built directly on the Keeta Network SDK and available across all tiers.</p>
      <div class="tools-cta-badges">
        <span class="tbadge free">Free</span>
        <span class="tbadge starter">Starter</span>
        <span class="tbadge pro">Pro</span>
        <span class="tbadge biz">Business</span>
      </div>
    </div>
    ${base ? `<a href="${base}/tools" class="btn-tools">Browse all 19 tools →</a>` : ''}
  </div>
</div>

<section class="section wrap" id="endpoints">
  <div class="sec-title">Public <span>endpoints</span></div>
  <div class="sec-sub">All endpoints return JSON. Verify your wallet in the Try it section below to test live.</div>
  <div style="position:relative">
    <div id="endpoints-lock" style="position:absolute;inset:0;z-index:10;background:rgba(3,3,3,0.72);backdrop-filter:blur(5px);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(196,163,90,0.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      <div style="font-size:0.8rem;color:rgba(196,163,90,0.85);font-weight:600">Verify wallet in Try it below to unlock</div>
    </div>
    <div id="endpoints-grid" style="opacity:0.25;pointer-events:none;transition:opacity .3s">
      <div class="ep-list">
        <div class="ep">
          <span class="ep-method m-get">GET</span>
          <div>
            <div class="ep-path">/price</div>
            <div class="ep-desc">Current KTA/USD price with 1h, 24h, and 7d change percentages. Sourced natively from Keeta Network.</div>
            <div class="ep-try"><a href="/price" target="_blank" rel="noopener">Try live →</a></div>
          </div>
        </div>
        <div class="ep">
          <span class="ep-method m-get">GET</span>
          <div>
            <div class="ep-path">/rate?currency=EUR</div>
            <div class="ep-desc">KTA exchange rate for a given currency. Supported: USD, EUR, GBP, SEK, NOK, JPY, AED, SGD.</div>
            <div class="ep-try"><a href="/rate?currency=EUR" target="_blank" rel="noopener">Try live →</a></div>
          </div>
        </div>
        <div class="ep">
          <span class="ep-method m-get">GET</span>
          <div>
            <div class="ep-path">/whale/alerts</div>
            <div class="ep-desc">Recent large on-chain KTA movements, classified as whale, institutional, or mega-whale.</div>
            <div class="ep-try"><a href="/whale/alerts" target="_blank" rel="noopener">Try live →</a></div>
          </div>
        </div>
        <div class="ep">
          <span class="ep-method m-get">GET</span>
          <div>
            <div class="ep-path">/subscription?wallet=</div>
            <div class="ep-desc">Returns tier, expiry, and social lifetime status for a given wallet address.</div>
            <div class="ep-try"><a href="/subscription?wallet=" target="_blank" rel="noopener">Try live →</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section wrap" id="tools" style="padding-bottom:0">
  <div class="sec-title">Try the <span>oracle</span></div>
  <div class="sec-sub">Active wallet required — Free tier (0.1 KTA) or above</div>

  <div class="tool-card" style="max-width:600px;margin:0 auto 24px">
    <div style="font-size:0.92rem;font-weight:700;color:#fff;margin-bottom:10px">Verify your wallet</div>
    <div style="font-size:0.79rem;color:var(--muted2);margin-bottom:14px">Enter your registered <code style="color:var(--gold);font-size:0.78rem">keeta_</code> wallet to unlock the live tools below. Free tier (0.1 KTA) is the minimum.</div>
    <div style="display:flex;gap:8px">
      <input type="text" id="tool-wallet" placeholder="keeta_ your wallet address" style="flex:1;background:var(--surface2);border:1px solid #1c1c1c;border-radius:9px;color:#fff;padding:10px 14px;font-size:0.84rem;outline:none;font-family:inherit" onfocus="this.style.borderColor='rgba(196,163,90,0.45)'" onblur="this.style.borderColor='#1c1c1c'" onkeydown="if(event.key==='Enter')verifyWallet()">
      <button class="tool-btn" style="width:auto;padding:10px 22px;white-space:nowrap" onclick="verifyWallet()">Verify</button>
    </div>
    <div class="tool-result" id="wallet-status" style="margin-top:10px"></div>
    ${base ? `<div style="font-size:0.75rem;color:var(--muted2);margin-top:10px">No wallet yet? <a href="${base}/onboard" style="color:var(--gold)">Register for free →</a></div>` : ''}
  </div>

  <div style="position:relative">
    <div id="tools-lock" style="position:absolute;inset:0;z-index:10;background:rgba(3,3,3,0.72);backdrop-filter:blur(5px);border-radius:12px;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:8px">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(196,163,90,0.7)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      <div style="font-size:0.8rem;color:rgba(196,163,90,0.85);font-weight:600">Verify wallet above to unlock</div>
    </div>
    <div id="tools-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;opacity:0.25;pointer-events:none;transition:opacity .3s">
      <div class="tool-card">
        <div class="field">
          <label style="font-size:0.88rem;font-weight:700;text-transform:none;letter-spacing:0;color:#fff;margin-bottom:12px;display:block">Exchange rate</label>
          <label>Currency</label>
          <select id="rate-currency">
            <option value="USD">USD</option><option value="EUR">EUR</option><option value="GBP">GBP</option>
            <option value="SEK">SEK</option><option value="NOK">NOK</option><option value="JPY">JPY</option>
            <option value="AED">AED</option><option value="SGD">SGD</option>
          </select>
        </div>
        <button class="tool-btn" onclick="fetchRate()">Get rate</button>
        <div class="tool-result" id="rate-result"></div>
      </div>
      <div class="tool-card">
        <div class="field">
          <label style="font-size:0.88rem;font-weight:700;text-transform:none;letter-spacing:0;color:#fff;margin-bottom:12px;display:block">Whale alerts</label>
          <label style="color:var(--muted2);font-size:0.71rem">Results limited by your tier</label>
        </div>
        <button class="tool-btn" onclick="fetchWhales()">Load whale alerts</button>
        <div class="tool-result" id="whale-tier-note" style="margin-top:8px"></div>
        <div class="json-out" id="whale-out"></div>
        <input type="hidden" id="whale-wallet">
      </div>
    </div>
  </div>
</section>

<div class="donate-cta wrap">
  <div class="donate-cta-inner">
    <h3>Keep the Oracle alive ⚡</h3>
    <p>KTA Oracle is an independent project running 24/7 on Keeta Network. Every donation goes directly toward keeping the price engine, AI insights, and whale tracking running for the whole community.</p>
    ${base ? `<a href="${base}/donate" class="btn-donate">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10"/></svg>
      Support the project
    </a>` : ''}
    <div class="donate-note">Accepts KTA · Visa Direct</div>
  </div>
</div>
</main>

<button class="agent-fab" id="agent-fab" onclick="toggleAgent()" title="Ask AI">
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
  <span class="notif"></span>
</button>
<div class="agent-panel" id="agent-panel">
  <div class="ap-sheet-handle" onclick="toggleAgent()"></div>
  <div class="ap-head">
    <div class="ap-head-icon"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
    <div class="ap-head-info">
      <div class="ap-head-name" id="ap-head-name">Support Agent</div>
      <div class="ap-head-status">● Online · 0.4s response</div>
    </div>
    <button class="ap-contact-btn" onclick="openContact()"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Contact</button>
    <button class="ap-close" onclick="toggleAgent()">✕</button>
  </div>
  <div class="ap-chips" id="ap-chips">
    <button type="button" class="ap-chip" onclick="quickAsk('What are the tiers and pricing?')">Tiers &amp; Pricing</button>
    <button type="button" class="ap-chip" onclick="quickAsk('How do I activate?')">Activation</button>
    <button type="button" class="ap-chip" onclick="quickAsk('What API tools are available?')">API Tools</button>
    <button type="button" class="ap-chip" onclick="quickAsk('What is Keeta Network?')">Keeta Network</button>
  </div>
  <div class="ap-messages" id="ap-msgs">
    <div class="ap-msg agent">Hi! I can help you with KTA Oracle tiers, activating your wallet, API tools, or pricing. What would you like to know?</div>
  </div>
  <div class="ap-contact-form" id="ap-contact-form">
    <button type="button" class="ct-back" onclick="showChat()">← Back to chat</button>
    <div class="ct-field"><label>Your name</label><input type="text" id="ct-name" placeholder="Anonymous"></div>
    <div class="ct-field"><label>Email (for dev reply)</label><input type="email" id="ct-email" placeholder="you@example.com"></div>
    <div class="ct-field"><label>Message</label><textarea id="ct-msg" placeholder="Bug report, question, or feedback..."></textarea></div>
    <button type="button" class="ct-submit" id="ct-submit" onclick="submitContact()">Send to dev team</button>
    <div class="ct-result" id="ct-result"></div>
    <div class="ct-or">or reach out directly</div>
    <a href="https://x.com/elemzir" target="_blank" rel="noopener" class="ct-x-link">DM @elemzir on X ↗</a>
  </div>
  <div class="ap-input-row" id="ap-input-row">
    <input class="ap-inp" id="ap-input" type="text" placeholder="Ask anything about KTA Oracle..." onkeydown="if(event.key==='Enter')sendAgent()">
    <button class="ap-send" id="ap-send" onclick="sendAgent()">Send</button>
  </div>
</div>

<footer class="footer">
  <div class="footer-links">
    ${base ? `<a href="${base}/onboard">Onboard</a>` : ''}
    ${base ? `<a href="${base}/tools">Tools</a>` : ''}
    ${base ? `<a href="${base}/checkout">Pricing</a>` : ''}
    ${base ? `<a href="${base}/donate">Donate</a>` : ''}
    ${base ? `<a href="${base}/legal">Legal</a>` : ''}
    ${base ? `<a href="${base}/privacy">Privacy</a>` : ''}
    <a href="https://keeta.com" target="_blank" rel="noopener">Keeta Network</a>
    <a href="https://x.com/elemzir" target="_blank" rel="noopener">@elemzir</a>
  </div>
  <div class="footer-brand">
    KTA Oracle Agent &nbsp;·&nbsp; Powered by Keeta Network &nbsp;·&nbsp; Sweden, EU
  </div>
  <div style="margin-top:10px;color:var(--muted);font-size:0.71rem;letter-spacing:0.03em">&copy; 2026 ELEMZIR. All rights reserved.</div>
</footer>

<script>
(function(){
  function toggleMobNav(){
    var b=document.getElementById('hbg-btn'),m=document.getElementById('mob-nav');
    if(!b||!m)return;
    b.classList.toggle('is-open');
    m.classList.toggle('is-open');
  }
  window.toggleMobNav=toggleMobNav;

  document.addEventListener('click',function(e){
    var m=document.getElementById('mob-nav'),b=document.getElementById('hbg-btn');
    if(!m||!m.classList.contains('is-open'))return;
    if(!m.contains(e.target)&&(!b||!b.contains(e.target))){
      m.classList.remove('is-open');
      if(b)b.classList.remove('is-open');
    }
  });

  function fmt(n){return n==null?'—':(n>=0?'+':'')+Number(n).toFixed(2)+'%';}
  function cls(n){return n==null?'':(n>=0?' up':' down');}

  async function loadPrice(){
    try{
      var r=await fetch('/price',{signal:AbortSignal.timeout(8000)});
      if(!r.ok)return;
      var d=await r.json();
      var priceTxt='$'+Number(d.price).toFixed(6);
      var elP=document.getElementById('lp-price');if(elP)elP.textContent=priceTxt;
      var pbP=document.getElementById('pb-price');if(pbP)pbP.textContent=priceTxt;

      var e1=document.getElementById('lp-1h');
      if(e1){e1.textContent=fmt(d.change_pct);e1.className='lp-stat-val'+cls(d.change_pct);}
      var pb1=document.getElementById('pb-1h');
      if(pb1){pb1.textContent=fmt(d.change_pct);pb1.className='pb-val'+cls(d.change_pct);}

      var e2=document.getElementById('lp-24h');
      if(e2){e2.textContent=fmt(d.change_24h);e2.className='lp-stat-val'+cls(d.change_24h);}
      var pb24=document.getElementById('pb-24h');
      if(pb24){pb24.textContent=fmt(d.change_24h);pb24.className='pb-val'+cls(d.change_24h);}

      var e3=document.getElementById('lp-7d');
      if(e3){e3.textContent=fmt(d.change_7d);e3.className='lp-stat-val'+cls(d.change_7d);}
      var pb7=document.getElementById('pb-7d');
      if(pb7){pb7.textContent=fmt(d.change_7d);pb7.className='pb-val'+cls(d.change_7d);}
    }catch(e){}
  }
  loadPrice();
  setInterval(loadPrice,30000);

  function initSpecular(){
    document.querySelectorAll('.sbadge, .cmp-card, .why-table, .ngi, .tools-cta-inner, .tool-card, .ep, .donate-cta-inner, .lp-wrap').forEach(function(card){
      card.addEventListener('mousemove',function(e){
        var rect=card.getBoundingClientRect();
        card.style.setProperty('--mouse-x',(e.clientX-rect.left)+'px');
        card.style.setProperty('--mouse-y',(e.clientY-rect.top)+'px');
      });
    });
  }
  document.addEventListener('DOMContentLoaded',initSpecular);
  setTimeout(initSpecular,300);

  document.addEventListener('click',function(e){
    var a=e.target.closest('a');
    if(!a||!a.href)return;
    var href=a.getAttribute('href');
    if(!href||href.startsWith('#')||href.startsWith('mailto:')||href.startsWith('javascript:'))return;
    var url;try{url=new URL(a.href,window.location.origin);}catch(err){return;}
    if(url.origin!==window.location.origin)return;
    if(a.target==='_blank'||a.hasAttribute('download')||e.metaKey||e.ctrlKey||e.shiftKey)return;
    var p=url.pathname;
    if(p.startsWith('/api')||p.startsWith('/dev')||p.startsWith('/price')||p.startsWith('/stream')||p.startsWith('/whale')||p.startsWith('/rate')||p.startsWith('/wallet'))return;
    if(p===window.location.pathname&&url.search===window.location.search)return;
    e.preventDefault();
    navigateTranscending(url.pathname+url.search);
  });

  window.addEventListener('popstate',function(){
    navigateTranscending(window.location.pathname+window.location.search,true);
  });

  async function navigateTranscending(path,isPop){
    var mob=document.getElementById('mob-nav');if(mob)mob.classList.remove('is-open');
    var hbg=document.getElementById('hbg-btn');if(hbg)hbg.classList.remove('is-open');
    try{
      var res=await fetch(path);
      if(!res.ok){window.location.href=path;return;}
      var html=await res.text();
      var parser=new DOMParser();
      var doc=parser.parseFromString(html,'text/html');
      var newRoot=doc.getElementById('page-root')||doc.querySelector('main');
      var curRoot=document.getElementById('page-root')||doc.querySelector('main');
      var newTitle=doc.querySelector('title');

      var doSwap=function(){
        if(newTitle)document.title=newTitle.innerText;
        doc.querySelectorAll('style').forEach(function(st){
          if(st.textContent&&!document.querySelector('style[data-route="'+path+'"]')){
            var newStyle=document.createElement('style');
            newStyle.setAttribute('data-route',path);
            newStyle.textContent=st.textContent;
            document.head.appendChild(newStyle);
          }
        });
        if(curRoot&&newRoot){
          curRoot.innerHTML=newRoot.innerHTML;
          curRoot.querySelectorAll('script').forEach(function(s){
            try{
              if(s.src){
                var sc=document.createElement('script');
                sc.src=s.src;
                document.body.appendChild(sc);
              } else {
                (1, eval)(s.textContent);
              }
            }catch(se){}
          });
        } else {
          window.location.href=path;
          return;
        }
        if(!isPop)history.pushState(null,'',path);
        document.querySelectorAll('.nav a, .mob-nav a').forEach(function(el){
          var h=el.getAttribute('href');
          if(!h)return;
          var active=(h===path||(path==='/'&&h==='/onboard')||(h==='/'&&path==='/onboard')||(h==='/oracle'&&path==='/oracle'));
          el.classList.toggle('active',active);
          el.classList.toggle('mob-active',active);
        });
        window.scrollTo({top:0,behavior:'smooth'});
        initSpecular();
      };

      if(document.startViewTransition){
        document.startViewTransition(doSwap);
      } else {
        doSwap();
      }
    }catch(err){
      window.location.href=path;
    }
  }
})();

var _activeTier='';

async function fetchRate(){
  var cur=document.getElementById('rate-currency').value;
  var res=document.getElementById('rate-result');
  res.className='tool-result loading';res.textContent='Fetching…';
  try{
    var r=await fetch('/rate?currency='+cur,{signal:AbortSignal.timeout(8000)});
    var d=await r.json();
    if(d.rate){res.className='tool-result ok';res.textContent='1 KTA = '+d.rate+' '+cur;}
    else{res.className='tool-result err';res.textContent=d.error||'Error';}
  }catch(e){res.className='tool-result err';res.textContent='Network error';}
}

async function verifyWallet(){
  var wallet=(document.getElementById('tool-wallet').value||'').trim();
  var status=document.getElementById('wallet-status');
  if(!wallet.startsWith('keeta_')){
    status.className='tool-result err';
    status.textContent='Enter a valid keeta_ wallet address.';
    return;
  }
  status.className='tool-result loading';
  status.textContent='Checking…';
  try{
    var r=await fetch('/subscription?wallet='+encodeURIComponent(wallet));
    var d=await r.json();
    var t=(d.tier||'').toLowerCase();
    if(t==='free'||t==='starter'||t==='social'||t==='pro'||t==='business'){
      _activeTier=t;
      document.getElementById('whale-wallet').value=wallet;
      document.getElementById('tools-lock').style.display='none';
      document.getElementById('endpoints-lock').style.display='none';
      var grid=document.getElementById('tools-grid');
      grid.style.opacity='1';
      grid.style.pointerEvents='auto';
      var epGrid=document.getElementById('endpoints-grid');
      epGrid.style.opacity='1';
      epGrid.style.pointerEvents='auto';
      status.className='tool-result ok';
      status.textContent='✓ Active — '+t+' tier. Tools unlocked.';
    } else {
      status.className='tool-result err';
      status.textContent='Wallet not activated. Send 0.1 KTA and activate at /onboard first.';
    }
  }catch(e){
    status.className='tool-result err';
    status.textContent='Could not verify. Try again.';
  }
}

async function fetchWhales(){
  var wallet=(document.getElementById('whale-wallet').value||'').trim();
  var note=document.getElementById('whale-tier-note');
  var out=document.getElementById('whale-out');
  out.className='json-out visible';out.textContent='Loading…';
  note.textContent='';
  var t=_activeTier||'free';
  var limit=(t==='business'||t==='pro'||t==='social')?9999:(t==='starter'?3:1);
  var tierLabel=(t==='business'||t==='pro'||t==='social')?(t+' — unlimited'):(t==='starter'?'starter — up to 3':'free — 1 alert');
  try{
    var r=await fetch('/whale/alerts');
    if(!r.ok){out.textContent='Service unavailable.';return;}
    var d=await r.json();
    var all=d.alerts||[];
    var shown=all.slice(0,limit);
    note.className='tool-result ok';
    note.textContent='Tier: '+tierLabel+(all.length?'  ·  showing '+shown.length+' of '+all.length:'');
    if(!shown.length){out.textContent='No whale activity detected yet.';}
    else{out.textContent=JSON.stringify(shown,null,2);}
  }catch(e){out.textContent='Network error — try again.';}
}

function quickAsk(q){
  var inp=document.getElementById('ap-input');
  if(inp){inp.value=q;sendAgent();}
}
function toggleAgent(){
  var p=document.getElementById('agent-panel');
  if(!p)return;
  p.classList.toggle('open');
  if(p.classList.contains('open'))showChat();
  var n=document.querySelector('.agent-fab .notif');
  if(n)n.style.display='none';
}
function openContact(){
  var p=document.getElementById('agent-panel');
  if(!p)return;
  p.classList.add('open');
  var n=document.querySelector('.agent-fab .notif');
  if(n)n.style.display='none';
  showContact();
}
function showContact(){
  document.getElementById('ap-msgs').style.display='none';
  var c=document.getElementById('ap-chips');if(c)c.style.display='none';
  document.getElementById('ap-input-row').style.display='none';
  document.getElementById('ap-contact-form').style.display='flex';
  var h=document.getElementById('ap-head-name');if(h)h.textContent='Contact us';
}
function showChat(){
  document.getElementById('ap-msgs').style.display='';
  var c=document.getElementById('ap-chips');if(c)c.style.display='flex';
  document.getElementById('ap-input-row').style.display='';
  document.getElementById('ap-contact-form').style.display='none';
  var h=document.getElementById('ap-head-name');if(h)h.textContent='Support Agent';
}
async function sendAgent(){
  var inp=document.getElementById('ap-input');
  var msgs=document.getElementById('ap-msgs');
  var btn=document.getElementById('ap-send');
  var msg=inp.value.trim();
  if(!msg||btn.disabled)return;
  var u=document.createElement('div');u.className='ap-msg user';u.textContent=msg;msgs.appendChild(u);
  inp.value='';btn.disabled=true;
  var typing=document.createElement('div');typing.className='ap-msg agent typing';
  typing.innerHTML='<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
  msgs.appendChild(typing);msgs.scrollTop=msgs.scrollHeight;
  try{
    var res=await fetch('/agent',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:msg})});
    typing.remove();
    var d=await res.json();
    var rep=d.reply||d.error||'Sorry, could not process that.';
    var a=document.createElement('div');a.className='ap-msg agent';a.textContent=rep;msgs.appendChild(a);
  }catch(e){
    typing.remove();
    var er=document.createElement('div');er.className='ap-msg agent';er.textContent='Connection error. Try again.';msgs.appendChild(er);
  }
  btn.disabled=false;msgs.scrollTop=msgs.scrollHeight;
}
async function submitContact(){
  var name=(document.getElementById('ct-name').value||'').trim();
  var email=(document.getElementById('ct-email').value||'').trim();
  var msg=(document.getElementById('ct-msg').value||'').trim();
  var res=document.getElementById('ct-result');
  var btn=document.getElementById('ct-submit');
  if(!msg){res.className='ct-result err';res.textContent='Please enter a message.';return;}
  btn.disabled=true;res.className='ct-result';res.textContent='Sending...';
  try{
    var r=await fetch('/support',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:name,email:email,message:msg})});
    var d=await r.json();
    if(d.ok){
      res.className='ct-result ok';
      res.textContent='Sent! Ticket #'+d.ticketId.slice(0,8)+'.';
      document.getElementById('ct-msg').value='';
    } else {
      res.className='ct-result err';res.textContent=d.error||'Failed to send.';
    }
  }catch(e){
    res.className='ct-result err';res.textContent='Error sending. Try reaching out on X.';
  }
  btn.disabled=false;
}
</script>
</body>
</html>`;
}
