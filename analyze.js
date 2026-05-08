<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>STIR Trade Planner</title>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet"/>
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#12161c;--bg2:#1a1f28;--bg3:#222830;--bg4:#2a3040;
  --border:#2d3540;--border2:#3a4552;
  --text:#d8dce4;--text2:#8a9099;--text3:#5a6070;
  --green:#3dcf92;--gd:rgba(61,207,146,.1);
  --red:#e05c5c;--rd:rgba(224,92,92,.1);
  --blue:#5b9cf6;--bd:rgba(91,156,246,.1);
  --amber:#e8a030;--ad:rgba(232,160,48,.1);
  --mono:'JetBrains Mono',monospace;
  --sans:'IBM Plex Sans',sans-serif;
}
html{font-size:13px;}
body{background:var(--bg);color:var(--text);font-family:var(--sans);height:100vh;overflow:hidden;}
input::-webkit-inner-spin-button,input::-webkit-outer-spin-button{-webkit-appearance:none;}
input[type=number]{-moz-appearance:textfield;}

.app{display:grid;grid-template-rows:44px 1fr;height:100vh;}
.topbar{background:var(--bg2);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:0 18px;flex-shrink:0;}
.logo{font-family:var(--mono);font-size:12px;font-weight:700;}
.logo em{color:var(--blue);font-style:normal;}
.logo-sub{font-size:9px;color:var(--text3);letter-spacing:.1em;margin-left:12px;}
.tbr{display:flex;gap:18px;}
.ts{text-align:right;}
.ts-l{font-size:8px;color:var(--text3);letter-spacing:.1em;text-transform:uppercase;}
.ts-v{font-family:var(--mono);font-size:12px;font-weight:700;margin-top:1px;}

.body{display:grid;grid-template-columns:284px 1fr;overflow:hidden;}
.left{background:var(--bg2);border-right:1px solid var(--border);overflow-y:auto;padding:8px;display:flex;flex-direction:column;gap:6px;}
.right{overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:7px;}

/* sections */
.sec{background:var(--bg3);border:1px solid var(--border);border-radius:4px;padding:9px;}
.st{font-size:8px;letter-spacing:.12em;color:var(--text3);font-weight:600;text-transform:uppercase;margin-bottom:7px;}

/* pills */
.pg{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;}
.pg2{display:grid;grid-template-columns:1fr 1fr;gap:3px;}
.pill{background:transparent;border:1px solid var(--border);border-radius:3px;padding:5px 4px;cursor:pointer;font-family:var(--mono);font-size:11px;font-weight:700;color:var(--text3);transition:all .1s;text-align:center;line-height:1.2;}
.pill sub{display:block;font-size:8px;font-weight:400;margin-top:1px;}
.pill:hover{border-color:var(--border2);color:var(--text2);}
.pill.on{background:var(--bd);border-color:var(--blue);color:var(--blue);}

/* inputs */
.iw{display:flex;flex-direction:column;gap:3px;}
.il{font-size:8px;letter-spacing:.08em;color:var(--text3);text-transform:uppercase;}
.inp{background:var(--bg2);border:1px solid var(--border);border-radius:3px;color:var(--text);font-family:var(--mono);font-size:11px;font-weight:600;padding:6px 8px;width:100%;transition:border-color .1s;}
.inp:focus{outline:none;border-color:var(--blue);}
textarea.inp{resize:vertical;min-height:68px;line-height:1.55;font-family:var(--sans);font-size:11px;}

/* specs */
.sg{display:grid;grid-template-columns:1fr 1fr;gap:3px;}
.sb{background:var(--bg2);border:1px solid var(--border);border-radius:3px;padding:5px 7px;}
.sl{font-size:8px;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;}
.sv{font-family:var(--mono);font-size:11px;font-weight:700;margin-top:1px;}

/* rr strip */
.rrs{display:grid;grid-template-columns:1fr 1fr 1fr auto;gap:4px;}
.rrb{background:var(--bg2);border:1px solid var(--border);border-radius:3px;padding:5px 7px;display:flex;flex-direction:column;justify-content:center;}
.rrl{font-size:8px;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;}
.rrv{font-family:var(--mono);font-size:15px;font-weight:700;color:var(--blue);margin-top:1px;}

/* vol */
.vg{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;}
.vb{background:transparent;border:1px solid var(--border);border-radius:3px;padding:5px 3px;cursor:pointer;font-family:var(--sans);font-size:9px;font-weight:600;color:var(--text3);text-align:center;transition:all .1s;}
.vb sub{display:block;font-family:var(--mono);font-size:8px;opacity:.7;margin-top:2px;}
.vb.on{background:var(--bd);border-color:var(--blue);color:var(--blue);}

/* paste zone */
.pz{border:1px dashed var(--border2);border-radius:4px;background:var(--bg2);position:relative;overflow:hidden;transition:all .18s;}
.pz.dov{border-color:var(--blue);background:var(--bd);}
.pz.flash{border-color:var(--green);background:var(--gd);}
.pp{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px;text-align:center;gap:4px;min-height:90px;}
.pp.hide{display:none;}
.pp-icon{font-size:16px;color:var(--text3);}
.pp-t{font-size:11px;font-weight:600;color:var(--text3);}
.pp-s{font-size:9px;color:var(--text3);}
.kc{display:inline-flex;align-items:center;gap:2px;margin-top:2px;}
.key{background:var(--bg4);border:1px solid var(--border2);border-radius:2px;padding:1px 5px;font-family:var(--mono);font-size:9px;color:var(--text2);}
.pz input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;z-index:0;}
.cg{display:grid;grid-template-columns:repeat(auto-fill,minmax(76px,1fr));gap:5px;padding:6px;}
.ci{position:relative;aspect-ratio:4/3;border-radius:3px;overflow:hidden;border:1px solid var(--border);}
.ci img{width:100%;height:100%;object-fit:cover;display:block;}
.ci.scr{border-color:var(--amber);}
.ci.scr::before{content:'SCR';position:absolute;top:3px;left:3px;background:var(--amber);color:#000;font-family:var(--mono);font-size:7px;font-weight:700;padding:1px 4px;border-radius:2px;z-index:2;}
.co{position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.72);padding:3px 5px;display:flex;justify-content:space-between;align-items:center;}
.tf-t{font-family:var(--mono);font-size:8px;color:var(--blue);cursor:pointer;border:1px solid var(--blue);border-radius:2px;padding:1px 4px;}
.del-b{background:none;border:none;color:var(--red);cursor:pointer;font-size:12px;line-height:1;}
.am{aspect-ratio:4/3;border:1px dashed var(--border);border-radius:3px;display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--text3);cursor:pointer;position:relative;background:var(--bg3);}
.am input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;}

/* analyze btn */
.abtn{width:100%;padding:10px;font-size:12px;font-weight:700;font-family:var(--sans);letter-spacing:.04em;background:var(--blue);color:#020d1a;border:none;border-radius:4px;cursor:pointer;transition:all .15s;display:flex;align-items:center;justify-content:center;gap:7px;margin-top:2px;}
.abtn:hover{background:#7ab0f8;}
.abtn:disabled{background:var(--bg4);color:var(--text3);cursor:not-allowed;}
.spin{width:13px;height:13px;border:2px solid rgba(2,13,26,.25);border-top-color:#020d1a;border-radius:50%;animation:sp .7s linear infinite;flex-shrink:0;}
@keyframes sp{to{transform:rotate(360deg);}}

/* tabs */
.tab-bar{display:flex;border-bottom:1px solid var(--border);background:var(--bg3);border-radius:4px 4px 0 0;overflow:hidden;flex-shrink:0;}
.tb{flex:1;padding:8px 0;background:transparent;border:none;border-bottom:2px solid transparent;cursor:pointer;font-family:var(--mono);font-size:9px;font-weight:700;letter-spacing:.1em;color:var(--text3);transition:all .1s;}
.tb.on{border-bottom-color:var(--blue);color:var(--text);}

/* bias strip */
.bstrip{display:flex;align-items:center;gap:10px;padding:9px 13px;border-radius:4px;}
.bs-bull{background:var(--gd);border:1px solid rgba(61,207,146,.2);}
.bs-bear{background:var(--rd);border:1px solid rgba(224,92,92,.2);}
.bs-neu{background:var(--ad);border:1px solid rgba(232,160,48,.2);}
.bpill{font-family:var(--mono);font-size:9px;font-weight:700;padding:2px 8px;border-radius:2px;text-transform:uppercase;flex-shrink:0;}
.bp-bull{background:rgba(61,207,146,.2);color:var(--green);}
.bp-bear{background:var(--rd);color:var(--red);}
.bp-neu{background:var(--ad);color:var(--amber);}
.btext{font-size:11px;line-height:1.5;flex:1;}
.ctag{font-family:var(--mono);font-size:8px;color:var(--text3);white-space:nowrap;}

/* screener strip */
.scr-strip{display:grid;grid-template-columns:repeat(6,1fr);gap:4px;}
.scr-cell{background:var(--bg3);border:1px solid var(--border);border-radius:3px;padding:5px 7px;}
.scr-cell.hot{border-color:var(--amber);}
.sc-l{font-size:8px;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px;}
.sc-v{font-family:var(--mono);font-size:12px;font-weight:700;}

/* analysis bullets */
.bullets{display:flex;flex-direction:column;gap:3px;}
.bullet{display:flex;align-items:baseline;gap:7px;font-size:11px;color:var(--text2);line-height:1.5;}
.bullet-dot{width:4px;height:4px;border-radius:50%;background:var(--text3);flex-shrink:0;margin-top:5px;}
.bullet-dot.g{background:var(--green);}
.bullet-dot.r{background:var(--red);}
.bullet-dot.a{background:var(--amber);}
.bullet-dot.b{background:var(--blue);}

/* levels table */
.lvlt{width:100%;border-collapse:collapse;font-size:11px;}
.lvlt th{text-align:left;font-size:8px;letter-spacing:.08em;color:var(--text3);text-transform:uppercase;padding:0 6px 5px 0;border-bottom:1px solid var(--border);}
.lvlt td{padding:4px 6px 4px 0;border-bottom:1px solid rgba(45,53,64,.35);}
.lvlt tr:last-child td{border-bottom:none;}
.tag{display:inline-block;font-size:8px;font-family:var(--mono);font-weight:700;padding:2px 5px;border-radius:2px;}
.tag-s{background:var(--gd);color:var(--green);}
.tag-r{background:var(--rd);color:var(--red);}
.tag-p{background:var(--ad);color:var(--amber);}

/* model card */
.mc{background:var(--bg3);border:1px solid var(--border);border-radius:4px;overflow:hidden;}
.mc.rec{border-color:var(--amber);}
.mc-head{display:flex;justify-content:space-between;align-items:center;padding:8px 11px;cursor:pointer;user-select:none;}
.mc-head:hover{background:var(--bg4);}
.mc-title{font-size:11px;font-weight:700;color:var(--text);}
.mc-title.rec{color:var(--amber);}
.mc-sub{font-size:9px;color:var(--text3);margin-top:1px;}
.mc-right{display:flex;gap:4px;align-items:center;}
.badge{font-family:var(--mono);font-size:9px;font-weight:700;border:1px solid;padding:2px 6px;border-radius:2px;}
.chevron{font-size:10px;color:var(--text3);margin-left:4px;transition:transform .15s;}
.chevron.open{transform:rotate(180deg);}

/* stats bar */
.sbar{display:grid;grid-template-columns:repeat(5,1fr);background:var(--bg2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
.stat{padding:5px 9px;border-right:1px solid var(--border);}
.stat:last-child{border-right:none;}
.stat-l{font-size:8px;letter-spacing:.08em;color:var(--text3);text-transform:uppercase;}
.stat-v{font-family:var(--mono);font-size:12px;font-weight:700;margin-top:2px;}

/* ladder */
.ladder-wrap{overflow:hidden;}
.lh{display:grid;grid-template-columns:24px 85px 64px 1fr 68px 58px;font-size:8px;letter-spacing:.08em;color:var(--text3);text-transform:uppercase;padding:3px 10px;background:var(--bg2);border-bottom:1px solid var(--border);}
.lr{display:grid;grid-template-columns:24px 85px 64px 1fr 68px 58px;align-items:center;padding:0 10px;height:21px;border-bottom:1px solid rgba(45,53,64,.3);font-family:var(--mono);font-size:11px;}
.lr:last-child{border-bottom:none;}
.lr.tp{background:rgba(61,207,146,.04);border-left:2px solid var(--green);}
.lr.sl{background:rgba(224,92,92,.04);border-left:2px solid var(--red);}
.lr.en{border-left:2px solid transparent;}
.lr.en:hover{background:var(--bg4);}
.bar-c{height:4px;border-radius:2px;overflow:hidden;background:var(--bg4);}
.bar-f{height:100%;border-radius:2px;background:var(--blue);}

/* summary strip */
.sum-strip{display:flex;gap:0;border-top:1px solid var(--border);background:var(--bg2);}
.sum-cell{flex:1;padding:6px 10px;border-right:1px solid var(--border);}
.sum-cell:last-child{border-right:none;}
.sum-l{font-size:8px;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;}
.sum-v{font-family:var(--mono);font-size:12px;font-weight:700;margin-top:2px;}

/* order block */
.ob{background:var(--bg2);border-top:1px solid var(--border);}
.ob-rows{display:flex;flex-direction:column;gap:0;}
.ob-row{display:grid;grid-template-columns:50px 46px 12px 80px 1fr 1fr;align-items:center;padding:2px 10px;border-bottom:1px solid rgba(45,53,64,.3);font-family:var(--mono);font-size:11px;}
.ob-row:last-child{border-bottom:none;}
.ob-foot{display:flex;gap:5px;flex-wrap:wrap;padding:5px 10px;font-size:9px;font-family:var(--mono);border-top:1px solid var(--border);background:var(--bg3);}
.of-l{color:var(--text3);}
.of-v{font-weight:700;}
.of-sep{color:var(--border2);}

/* misc */
.ac{background:var(--bg3);border:1px solid var(--border);border-radius:4px;padding:9px 11px;}
.ac-t{font-size:8px;letter-spacing:.1em;color:var(--text3);text-transform:uppercase;font-weight:600;margin-bottom:7px;}
.warn{background:rgba(232,160,48,.06);border:1px solid rgba(232,160,48,.2);border-radius:3px;padding:6px 10px;font-size:10px;color:var(--amber);}
.err{background:var(--rd);border:1px solid rgba(224,92,92,.2);border-radius:4px;padding:9px 12px;font-size:11px;color:var(--red);}
.loading{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 20px;gap:9px;color:var(--text3);}
.loading .spin{width:20px;height:20px;border:2px solid var(--border);border-top-color:var(--blue);}
.loading p{font-size:11px;text-align:center;}

/* metrics */
.mr{background:var(--bg3);border:1px solid var(--border);border-radius:4px;padding:11px;margin-bottom:6px;}
.mr-n{font-family:var(--mono);font-size:8px;color:var(--green);letter-spacing:.1em;margin-bottom:3px;}
.mr-t{font-size:12px;font-weight:600;color:var(--text);margin-bottom:5px;}
.br{display:flex;gap:4px;flex-wrap:wrap;margin-top:6px;}

::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px;}
</style>
</head>
<body>
<div class="app">

<header class="topbar">
  <div style="display:flex;align-items:baseline;">
    <div class="logo"><em>▮</em>STIR<span style="color:var(--text2);font-weight:400;">.planner</span></div>
    <div class="logo-sub">CHART ANALYSIS · RISK-EQUALIZED LADDER</div>
  </div>
  <div class="tbr">
    <div class="ts"><div class="ts-l">Active</div><div class="ts-v" id="hActive">—</div></div>
    <div class="ts"><div class="ts-l">Risk</div><div class="ts-v" id="hRisk">—</div></div>
    <div class="ts"><div class="ts-l">RR</div><div class="ts-v" id="hRR">—</div></div>
  </div>
</header>

<div class="body">
<div class="left">

  <div class="sec">
    <div class="st">Contract</div>
    <div class="pg" id="pg-prod">
      <button class="pill on" onclick="setProduct('SR3',this)">SR3<sub>CME</sub></button>
      <button class="pill" onclick="setProduct('ZQ',this)">ZQ<sub>CBOT</sub></button>
      <button class="pill" onclick="setProduct('I',this)">I<sub>ICE</sub></button>
      <button class="pill" onclick="setProduct('L',this)">L<sub>ICE</sub></button>
      <button class="pill" onclick="setProduct('SO3',this)">SO3<sub>ICE</sub></button>
      <button class="pill" onclick="setProduct('SA3',this)">SA3<sub>ICE</sub></button>
    </div>
  </div>

  <div class="sec">
    <div class="st">Structure</div>
    <div class="pg" id="pg-str">
      <button class="pill" onclick="setStr('outright',this)">Outright<sub>single leg</sub></button>
      <button class="pill on" onclick="setStr('spread',this)">Spread<sub>calendar</sub></button>
      <button class="pill" onclick="setStr('fly',this)">Fly<sub>butterfly</sub></button>
      <button class="pill" onclick="setStr('condor',this)">Condor<sub>4-leg</sub></button>
      <button class="pill" onclick="setStr('pack',this)">Pack<sub>bundle</sub></button>
    </div>
  </div>

  <div class="sec">
    <div class="st">Contract Specs</div>
    <div class="sg">
      <div class="sb"><div class="sl">Tick Size</div><div class="sv" id="sTick">0.005</div></div>
      <div class="sb"><div class="sl">Tick Value</div><div class="sv" id="sTickV">$12.50</div></div>
      <div class="sb"><div class="sl">FX Rate</div><div class="sv" id="sFX">1.00000</div></div>
      <div class="sb"><div class="sl">USD Tick</div><div class="sv" id="sUSD" style="color:var(--blue)">$12.50</div></div>
    </div>
  </div>

  <div class="sec">
    <div class="st">Entry Spacing</div>
    <div class="vg" id="vg">
      <button class="vb" onclick="setVol('low',this)">LOW<sub id="vl-s"></sub></button>
      <button class="vb on" onclick="setVol('medium',this)">MEDIUM<sub id="vm-s"></sub></button>
      <button class="vb" onclick="setVol('high',this)">HIGH<sub id="vh-s"></sub></button>
    </div>
    <div class="iw" style="margin-top:5px;">
      <div class="il">Custom interval</div>
      <input class="inp" id="intInp" type="text" inputmode="decimal" value="0.010" oninput="onInt(this.value)"/>
    </div>
  </div>

  <div class="sec">
    <div class="st">Risk / Reward</div>
    <div class="rrs">
      <div class="iw"><div class="il">Max Risk ($)</div><input class="inp" id="riskInp" type="text" inputmode="decimal" value="3000" oninput="updateHdr()"/></div>
      <div class="iw"><div class="il">Target Reward ($)</div><input class="inp" id="rewInp" type="text" inputmode="decimal" value="6000" oninput="updateHdr()"/></div>
      <div class="iw"><div class="il">Tolerance (%)</div><input class="inp" id="tolInp" type="text" inputmode="decimal" value="10"/></div>
      <div class="rrb"><div class="rrl">RR</div><div class="rrv" id="rrD">2.00</div></div>
    </div>
  </div>

  <div class="sec">
    <div class="st">Solver Mode</div>
    <div class="pg2">
      <button class="pill on" id="sEx" onclick="setSolver('exact',this)">EXACT RISK<sub>Match budget</sub></button>
      <button class="pill" id="sBR" onclick="setSolver('bestRR',this)">BEST RR<sub>Max reward</sub></button>
    </div>
  </div>

  <div class="sec">
    <div class="st" style="display:flex;justify-content:space-between;align-items:center;">
      <span>Charts &amp; Screener</span>
      <span style="color:var(--amber);font-size:8px;">double-click = mark SCR</span>
    </div>
    <div class="pz" id="pz">
      <div class="pp" id="pp">
        <div class="pp-icon">⎘</div>
        <div class="pp-t">Paste / drag / click to add</div>
        <div class="pp-s">Charts + screener — double-click to mark screener</div>
        <div class="kc"><span class="key">⌘V</span><span style="font-size:9px;color:var(--text3);margin:0 4px">or</span><span class="key">Ctrl+V</span></div>
        <input type="file" id="fileIn" accept="image/*" multiple onchange="handleFiles(event)"/>
      </div>
      <div class="cg" id="cg" style="display:none;"></div>
    </div>
  </div>

  <div class="sec">
    <div class="st">Trade Idea</div>
    <textarea class="inp" id="ideaInp" rows="4" placeholder="e.g. M28 spread near swing high, ZSc extreme, MOM negative, selling into resistance…"></textarea>
  </div>

  <button class="abtn" id="aBtn" onclick="runAnalysis()">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    Analyze &amp; Generate Plan
  </button>

</div><!-- /left -->

<div class="right">
  <div class="tab-bar">
    <button class="tb on" id="tab-plan" onclick="switchTab('plan')">TRADE PLAN</button>
    <button class="tb" id="tab-metrics" onclick="switchTab('metrics')">ANALYSIS METRICS</button>
  </div>
  <div id="panel-plan">
    <div class="loading">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" opacity=".3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
      <p>Paste charts &amp; screener, describe your idea,<br>then click Analyze.</p>
    </div>
  </div>
  <div id="panel-metrics" style="display:none;"></div>
</div>
</div>
</div>

<script>
// ── PRODUCTS ──
const PROD={
  SR3:{exchange:'CME', ts:.005,tv:12.5,  ccy:'USD',fx:1,      usdTV:12.5,     lbl:'3M SOFR'},
  ZQ: {exchange:'CBOT',ts:.005,tv:20.835,ccy:'USD',fx:1,      usdTV:20.835,   lbl:'30D Fed Funds'},
  I:  {exchange:'ICE', ts:.005,tv:12.5,  ccy:'EUR',fx:1.15402,usdTV:14.42525, lbl:'3M Euribor'},
  L:  {exchange:'ICE', ts:.005,tv:6.25,  ccy:'GBP',fx:1.32315,usdTV:8.2697,   lbl:'Short Sterling'},
  SO3:{exchange:'ICE', ts:.005,tv:12.5,  ccy:'GBP',fx:1.32315,usdTV:16.5394,  lbl:'3M SONIA'},
  SA3:{exchange:'ICE', ts:.005,tv:12.5,  ccy:'CHF',fx:1.25213,usdTV:15.6516,  lbl:'3M SARON'},
};

// ── STATE ──
const S={product:'SR3',structure:'spread',vol:'medium',interval:.01,risk:3000,reward:6000,tol:10,solver:'exact',charts:[]};
const TFS=['15m','1h','4h','1D','Wk'];

// ── LADDER MATH ──
const rnd=x=>Math.round(x*1e8)/1e8;
function buildLevels(a,b,step){
  if(!isFinite(a)||!isFinite(b)||!isFinite(step)||step<=0) return [];
  const dir=b>=a?1:-1,s=Math.abs(step)*dir,lvls=[];
  let p=a;
  for(let i=0;i<200;i++){
    lvls.push(rnd(p));const n=p+s;
    if((dir>0&&n>b)||(dir<0&&n<b)) break;
    p=n;if(Math.abs(p-b)<1e-9) break;
  }
  const last=lvls[lvls.length-1];
  if(Math.abs(last-b)>1e-9) lvls.push(rnd(b));
  const seen=new Set();
  return lvls.filter(x=>{const k=x.toFixed(8);if(seen.has(k))return false;seen.add(k);return true;});
}
function t2s(lvls,stop,ts){return lvls.map(p=>Math.abs(p-stop)/ts);}
function solveExact(w,cost,utv,budget){
  if(!w.length) return [];
  const pu=cost.map(t=>t*utv),tw=w.reduce((a,b)=>a+b,0);
  if(!tw) return w.map(()=>0);
  const den=w.reduce((s,wi,i)=>s+wi*pu[i],0);
  if(!den) return w.map(()=>0);
  const k=budget/den,rl=kk=>w.map(wi=>Math.max(0,Math.round(kk*wi)));
  const tr=lots=>lots.reduce((s,l,i)=>s+l*pu[i],0);
  let best=rl(k),bd=Math.abs(tr(best)-budget);
  for(let m=.85;m<=1.15;m+=.01){const c=rl(k*m),d=Math.abs(tr(c)-budget);if(d<bd){best=c;bd=d;}}
  if(best.every(l=>!l)&&budget>0){let ci=0;for(let i=1;i<pu.length;i++)if(pu[i]>0&&pu[i]<pu[ci])ci=i;best[ci]=1;}
  return best;
}
function solveBRR(w,cost,rew,utv,budget,tol){
  const pu=cost.map(t=>t*utv),mr=budget*(1+tol/100);
  let lots=solveExact(w,cost,utv,budget);
  const tr=()=>lots.reduce((s,l,i)=>s+l*pu[i],0);
  const eff=rew.map((r,i)=>pu[i]>0?r/pu[i]:0);
  for(let it=0;it<200;it++){
    let imp=false;
    const ao=eff.map((e,i)=>({e,i})).sort((a,b)=>b.e-a.e);
    for(const{i}of ao){if(tr()+pu[i]<=mr){lots[i]++;imp=true;break;}}
    if(imp) continue;
    const co=eff.map((e,i)=>({e,i})).filter(x=>lots[x.i]>0).sort((a,b)=>a.e-b.e);
    let sw=false;
    for(const o of co){for(const n of ao){if(n.i===o.i||n.e<=o.e) continue;if(tr()-pu[o.i]+pu[n.i]<=mr&&rew[n.i]-rew[o.i]>1e-9){lots[o.i]--;lots[n.i]++;sw=true;break;}}if(sw) break;}
    if(!sw) break;
  }
  return lots;
}
const eqW=n=>Array(n).fill(1);
const frW=n=>Array.from({length:n},(_,i)=>n-i);
const bkW=n=>Array.from({length:n},(_,i)=>i+1);
function computeModel(lvls,lots,stop,tp,ts,utv){
  const pr=lvls.map((p,i)=>{const t=Math.abs(p-stop)/ts;return(lots[i]||0)*t*utv;});
  const pw=lvls.map((p,i)=>{const t=Math.abs(tp-p)/ts;return(lots[i]||0)*t*utv;});
  const tl=lots.reduce((a,b)=>a+b,0);
  const tr=pr.reduce((a,b)=>a+b,0),tw=pw.reduce((a,b)=>a+b,0);
  const ae=tl>0?lvls.reduce((s,p,i)=>s+p*(lots[i]||0),0)/tl:NaN;
  return{pr,pw,tl,tr,tw,ae,rr:tr>0?tw/tr:0,dev:S.risk>0?((tr-S.risk)/S.risk)*100:0};
}
function pickAllModels(lvls,stop,tp,utv,ts){
  const cost=t2s(lvls,stop,ts);
  const rewP=lvls.map(p=>Math.abs(tp-p)/ts*utv);
  const solve=w=>S.solver==='bestRR'?solveBRR(w,cost,rewP,utv,S.risk,S.tol):solveExact(w,cost,utv,S.risk);
  return{
    equal:{lots:solve(eqW(lvls.length)),name:'EQUAL',      sub:'Flat across ladder',       hint:'Neutral baseline'},
    front:{lots:solve(frW(lvls.length)),name:'FRONT-LOADED',sub:'Heavier near first entry', hint:'Higher urgency / conviction'},
    back: {lots:solve(bkW(lvls.length)),name:'BACK-LOADED', sub:'Heavier deeper in ladder', hint:'Better avg entry — accepts underfill'},
  };
}

// ── UI CONTROLS ──
function setProduct(code,btn){
  S.product=code;
  document.querySelectorAll('#pg-prod .pill').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  const p=PROD[code];
  document.getElementById('sTick').textContent=p.ts;
  document.getElementById('sTickV').textContent=`${p.ccy} ${p.tv}`;
  document.getElementById('sFX').textContent=p.fx.toFixed(5);
  document.getElementById('sUSD').textContent=`$${p.usdTV.toFixed(4)}`;
  updateVolSubs();applyVol();updateHdr();
}
function setStr(s,btn){S.structure=s;document.querySelectorAll('#pg-str .pill').forEach(b=>b.classList.remove('on'));btn.classList.add('on');}
function setVol(v,btn){
  S.vol=v;S.interval=PROD[S.product].ts*{low:1,medium:2,high:4}[v];
  document.getElementById('intInp').value=S.interval.toFixed(3);
  document.querySelectorAll('#vg .vb').forEach(b=>b.classList.remove('on'));
  if(btn) btn.classList.add('on');
}
function applyVol(){setVol(S.vol,document.querySelector('#vg .vb.on'));}
function updateVolSubs(){
  const ts=PROD[S.product].ts;
  document.getElementById('vl-s').textContent=`${ts}`;
  document.getElementById('vm-s').textContent=`${(ts*2).toFixed(3)}`;
  document.getElementById('vh-s').textContent=`${(ts*4).toFixed(3)}`;
}
function onInt(v){const n=parseFloat(v);if(isFinite(n)&&n>0){S.interval=n;document.querySelectorAll('#vg .vb').forEach(b=>b.classList.remove('on'));}}
function setSolver(s,btn){S.solver=s;document.getElementById('sEx').classList.remove('on');document.getElementById('sBR').classList.remove('on');btn.classList.add('on');}
function updateHdr(){
  S.risk=parseFloat(document.getElementById('riskInp').value)||3000;
  S.reward=parseFloat(document.getElementById('rewInp').value)||6000;
  S.tol=parseFloat(document.getElementById('tolInp').value)||10;
  const rr=S.risk>0?S.reward/S.risk:0;
  document.getElementById('rrD').textContent=rr.toFixed(2);
  document.getElementById('hRisk').textContent=`$${S.risk.toLocaleString()}`;
  document.getElementById('hRR').textContent=`${rr.toFixed(2)}:1`;
}

// ── PASTE / DRAG / DROP ──
document.addEventListener('paste',e=>{
  const its=e.clipboardData?.items;if(!its) return;
  let found=false;
  for(const it of its) if(it.type.startsWith('image/')){found=true;readFile(it.getAsFile());}
  if(found){const z=document.getElementById('pz');z.classList.add('flash');setTimeout(()=>z.classList.remove('flash'),500);}
});
const pzEl=document.getElementById('pz');
pzEl.addEventListener('dragover',e=>{e.preventDefault();pzEl.classList.add('dov');});
pzEl.addEventListener('dragleave',()=>pzEl.classList.remove('dov'));
pzEl.addEventListener('drop',e=>{e.preventDefault();pzEl.classList.remove('dov');Array.from(e.dataTransfer.files).filter(f=>f.type.startsWith('image/')).forEach(readFile);});
function handleFiles(e){Array.from(e.target.files).forEach(readFile);}
function readFile(file){
  const r=new FileReader();
  r.onload=ev=>{
    const id='c'+Date.now()+Math.random().toString(36).slice(2,5);
    S.charts.push({id,src:ev.target.result,tf:'1h',isScr:false});
    renderCharts();
  };
  r.readAsDataURL(file);
}
function cycleTF(id,e){e.stopPropagation();const c=S.charts.find(x=>x.id===id);if(!c||c.isScr)return;c.tf=TFS[(TFS.indexOf(c.tf)+1)%TFS.length];renderCharts();}
function toggleScr(id){S.charts.forEach(c=>{if(c.id===id)c.isScr=!c.isScr;else c.isScr=false;});renderCharts();}
function removeChart(id,e){e.stopPropagation();S.charts=S.charts.filter(c=>c.id!==id);renderCharts();}
function renderCharts(){
  const cg=document.getElementById('cg'),pp=document.getElementById('pp');
  if(!S.charts.length){cg.style.display='none';pp.classList.remove('hide');return;}
  pp.classList.add('hide');cg.style.display='grid';
  cg.innerHTML=S.charts.map(c=>`
    <div class="ci${c.isScr?' scr':''}" ondblclick="toggleScr('${c.id}')" title="Double-click to mark as screener">
      <img src="${c.src}" alt="chart"/>
      <div class="co">
        ${c.isScr
          ?`<span class="tf-t" style="color:var(--amber);border-color:var(--amber);">SCR</span>`
          :`<span class="tf-t" onclick="cycleTF('${c.id}',event)">${c.tf}</span>`}
        <button class="del-b" onclick="removeChart('${c.id}',event)">×</button>
      </div>
    </div>`).join('')
  +`<div class="am"><input type="file" accept="image/*" multiple onchange="handleFiles(event)"/><span>+</span></div>`;
}

// ── TABS ──
function switchTab(tab){
  ['plan','metrics'].forEach(t=>{
    document.getElementById('tab-'+t).classList.toggle('on',t===tab);
    document.getElementById('panel-'+t).style.display=t===tab?'':'none';
  });
  if(tab==='metrics') renderMetrics();
}

// ── SYSTEM PROMPT ──
function buildPrompt(){
  const p=PROD[S.product];
  const hasScr=S.charts.some(c=>c.isScr);
  return `You are a professional STIR futures trader. Produce a precise, quantitative trade plan from chart screenshots${hasScr?' and screener data':''}.

CONTRACT: ${S.product} (${p.lbl}) | Structure: ${S.structure}
Tick: ${p.ts} | USD tick value: $${p.usdTV} | Risk: $${S.risk} | Reward target: $${S.reward}

DIRECTION RULES — read carefully:
- STIR prices = 100 minus implied rate. Spread/fly values can be negative (e.g. -0.020 is a valid spread price).
- Mean-reversion (spread/fly at extreme, high ZSc): SELL if price is at/near resistance or swing HIGH. BUY if at/near support or swing LOW. Never default to Buy.
- DOM tells you: asks stacked above current = resistance overhead = SELL. Bids stacked below = support = BUY.
- entryStart = first/nearest entry price. entryEnd = deepest entry (furthest in the stagger).
- stopPrice: for SELL — ABOVE entryStart. For BUY — BELOW entryStart. Must be beyond the entire entry range.
- tpPrice: for SELL — BELOW entryEnd (in profit direction). For BUY — ABOVE entryEnd.

${hasScr?`SCREENER (image included — read these values directly from the screenshot):
- ZSc: Z-score. |ZSc| > 200 for spreads = extreme, strong mean-reversion signal.
- MOM: momentum. Negative MOM on high ZSc confirms sell entry.
- DSH/DSL: distance to swing high/low in bps/10. Small DSH = near swing high = resistance.
- ATR/SD: for stop calibration.
- Chg: recent price change direction.`:'No screener image.'}

ANALYSIS OUTPUT FORMAT: Use concise bullet points only — no paragraphs. Each bullet = one distinct observation. Max 6 bullets for priceAction, max 4 for screenerInterpretation.

Return ONLY valid JSON:
{
  "direction": "Buy|Sell",
  "bias": "bullish|bearish|neutral",
  "confidence": "high|medium|low",
  "confidenceReason": "1 short sentence",
  "summary": "2 sentences max",
  "priceAction": ["bullet 1","bullet 2","bullet 3",...],
  "screenerSignals": {"zscore":number|null,"mom":number|null,"dsl":number|null,"dsh":number|null,"atr":number|null},
  "screenerInterpretation": ["bullet 1","bullet 2",...],
  "keyLevels": [{"level":number,"type":"support|resistance|pivot","note":"string","timeframe":"string"}],
  "entryStart": number,
  "entryEnd": number,
  "stopPrice": number,
  "tpPrice": number,
  "alternativeManagement": "1-2 sentences or null",
  "warnings": ["string"]
}`;
}

// ── ANALYSIS ──
async function runAnalysis(){
  const idea=document.getElementById('ideaInp').value.trim();
  updateHdr();
  S.interval=parseFloat(document.getElementById('intInp').value)||PROD[S.product].ts*2;
  if(!idea&&!S.charts.length){alert('Add charts or describe your trade idea.');return;}

  const btn=document.getElementById('aBtn');
  btn.disabled=true;btn.innerHTML='<div class="spin"></div> Analyzing…';
  switchTab('plan');
  document.getElementById('panel-plan').innerHTML='<div class="loading"><div class="spin"></div><p>Reading charts, screener, calculating ladders…</p></div>';

  const content=[];
  S.charts.filter(c=>!c.isScr).forEach(c=>{
    const mime=c.src.match(/^data:([^;]+)/)?.[1]||'image/png';
    content.push({type:'image',source:{type:'base64',media_type:mime,data:c.src.split(',')[1]}});
  });
  S.charts.filter(c=>c.isScr).forEach(c=>{
    const mime=c.src.match(/^data:([^;]+)/)?.[1]||'image/png';
    content.push({type:'image',source:{type:'base64',media_type:mime,data:c.src.split(',')[1]}});
  });
  const p=PROD[S.product];
  content.push({type:'text',text:`Contract: ${S.product} | Structure: ${S.structure} | Risk: $${S.risk} | Reward: $${S.reward} | Interval: ${S.interval}
Chart TFs: ${S.charts.filter(c=>!c.isScr).map(c=>c.tf).join(', ')||'none'} | Screener: ${S.charts.some(c=>c.isScr)?'YES':'NO'}
Trade idea: ${idea||'(analyze from charts only)'}`});

  try{
    const resp=await fetch('/api/analyze',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1800,system:buildPrompt(),messages:[{role:'user',content}]})
    });
    const data=await resp.json();
    const raw=data.content?.find(b=>b.type==='text')?.text||'';
    let plan;
    try{plan=JSON.parse(raw.replace(/```json|```/g,'').trim());}
    catch{document.getElementById('panel-plan').innerHTML=`<div class="ac"><div class="ac-body" style="white-space:pre-wrap;font-size:11px;color:var(--text2)">${raw}</div></div>`;return;}
    renderPlan(plan);
  }catch(err){
    document.getElementById('panel-plan').innerHTML=`<div class="err">Error: ${err.message}</div>`;
  }finally{
    btn.disabled=false;btn.innerHTML='<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg> Analyze &amp; Generate Plan';
  }
}

// ── RENDER PLAN ──
function renderPlan(plan){
  const p=PROD[S.product];
  const{direction,entryStart,entryEnd,stopPrice,tpPrice}=plan;
  const lvls=buildLevels(entryStart,entryEnd,S.interval);
  if(!lvls.length){document.getElementById('panel-plan').innerHTML=`<div class="err">Could not build levels from ${entryStart}→${entryEnd}.</div>`;return;}

  const models=pickAllModels(lvls,stopPrice,tpPrice,p.usdTV,p.ts);
  const confRec={high:'front',medium:'equal',low:'back'};
  const recKey=confRec[plan.confidence]||'equal';

  const dirC=direction==='Buy'?'var(--green)':'var(--red)';
  const bcls={'bullish':'bs-bull','bearish':'bs-bear','neutral':'bs-neu'}[plan.bias]||'bs-neu';
  const bpcls={'bullish':'bp-bull','bearish':'bp-bear','neutral':'bp-neu'}[plan.bias]||'bp-neu';
  const rrTarget=S.risk>0?S.reward/S.risk:0;

  // screener strip
  const scr=plan.screenerSignals||{};
  const hasScr=Object.values(scr).some(v=>v!=null);
  const zabs=Math.abs(scr.zscore||0);
  let scrHtml='';
  if(hasScr){
    scrHtml=`<div class="ac">
      <div class="ac-t">Screener Signals</div>
      <div class="scr-strip">
        <div class="scr-cell ${zabs>200?'hot':''}">
          <div class="sc-l">Z-Score</div>
          <div class="sc-v" style="color:${zabs>200?'var(--amber)':'var(--text)'}">${scr.zscore!=null?scr.zscore.toFixed(1):'—'}</div>
        </div>
        <div class="scr-cell">
          <div class="sc-l">MOM</div>
          <div class="sc-v" style="color:${(scr.mom||0)<0?'var(--red)':(scr.mom||0)>0?'var(--green)':'var(--text)'}">${scr.mom!=null?scr.mom.toFixed(3):'—'}</div>
        </div>
        <div class="scr-cell ${(scr.dsh||1)<.15?'hot':''}">
          <div class="sc-l">DSH</div>
          <div class="sc-v" style="color:${(scr.dsh||1)<.15?'var(--amber)':'var(--text)'}">${scr.dsh!=null?scr.dsh.toFixed(4):'—'}</div>
        </div>
        <div class="scr-cell">
          <div class="sc-l">DSL</div>
          <div class="sc-v">${scr.dsl!=null?scr.dsl.toFixed(4):'—'}</div>
        </div>
        <div class="scr-cell">
          <div class="sc-l">ATR</div>
          <div class="sc-v">${scr.atr!=null?scr.atr.toFixed(2):'—'}</div>
        </div>
        <div class="scr-cell">
          <div class="sc-l">Signal</div>
          <div class="sc-v" style="font-size:9px;color:${plan.direction==='Sell'?'var(--red)':'var(--green)'};font-family:var(--sans);font-weight:600;">${plan.direction==='Sell'?'MEAN-REV SHORT':'MEAN-REV LONG'}</div>
        </div>
      </div>
      ${plan.screenerInterpretation?.length?`<div style="margin-top:8px;" class="bullets">${bulletsHtml(plan.screenerInterpretation,'a')}</div>`:''}
    </div>`;
  }

  // price action bullets
  const paHtml=plan.priceAction?.length
    ?`<div class="ac"><div class="ac-t">Price Action</div><div class="bullets">${bulletsHtml(plan.priceAction)}</div></div>`:'';

  // key levels
  const klHtml=plan.keyLevels?.length
    ?`<div class="ac"><div class="ac-t">Key Levels</div>
      <table class="lvlt"><thead><tr><th>Level</th><th>Type</th><th>TF</th><th>Note</th></tr></thead><tbody>
      ${plan.keyLevels.map(l=>`<tr>
        <td style="font-family:var(--mono);font-weight:700;">${typeof l.level==='number'?l.level.toFixed(3):l.level}</td>
        <td><span class="tag ${l.type==='support'?'tag-s':l.type==='resistance'?'tag-r':'tag-p'}">${l.type}</span></td>
        <td style="color:var(--text3);font-family:var(--mono)">${l.timeframe||'—'}</td>
        <td style="color:var(--text2);font-size:11px;">${l.note||''}</td>
      </tr>`).join('')}
      </tbody></table></div>`:'';

  // model cards
  const modelCards=['front','equal','back'].map(key=>{
    const m=models[key];
    const res=computeModel(lvls,m.lots,stopPrice,tpPrice,p.ts,p.usdTV);
    const isRec=key===recKey;
    const rrC=res.rr>=rrTarget?'var(--green)':res.rr>=1?'var(--amber)':'var(--red)';
    const devC=Math.abs(res.dev)<=S.tol?'var(--green)':'var(--red)';
    const maxL=Math.max(...m.lots,1);
    const orderPlan=lvls.map((pr,i)=>({price:pr,lots:m.lots[i]||0,risk:res.pr[i],reward:res.pw[i]})).filter(o=>o.lots>0);
    const expanded=isRec;
    const id=`mc-${key}`;

    const ladderRows=lvls.map((pr,i)=>{
      const lots=m.lots[i]||0;
      const pct=lots>0?Math.round((lots/maxL)*100):0;
      const tks=Math.round(Math.abs(pr-stopPrice)/p.ts);
      return `<div class="lr en">
        <span style="font-size:8px;color:var(--text3);">${i+1}</span>
        <span style="font-weight:700;color:${lots>0?'var(--text)':'var(--text3)'};">${pr.toFixed(3)}</span>
        <span style="color:${lots>0?dirC:'var(--text3)'};">${lots>0?`${direction} ${lots}`:'—'}</span>
        <span><div class="bar-c"><div class="bar-f" style="width:${pct}%"></div></div></span>
        <span style="color:${lots>0?'var(--red)':'var(--text3)'};">${lots>0?`-$${res.pr[i].toFixed(0)}`:'—'}</span>
        <span style="color:var(--text3);">${lots>0?`${tks}tk`:'—'}</span>
      </div>`;
    }).join('');

    const obRows=orderPlan.map(o=>`<div class="ob-row">
      <span style="font-weight:700;color:${dirC};">${direction}</span>
      <span style="font-weight:700;">${o.lots}</span>
      <span style="color:var(--text3);">@</span>
      <span>${o.price.toFixed(3)}</span>
      <span style="color:var(--red);">-$${o.risk.toFixed(0)}</span>
      <span style="color:var(--green);">+$${o.reward.toFixed(0)}</span>
    </div>`).join('');

    return `<div class="mc${isRec?' rec':''}" id="${id}">
      <div class="mc-head" onclick="toggleMC('${id}')">
        <div>
          <div class="mc-title${isRec?' rec':''}">${isRec?'★ ':''}${m.name}</div>
          <div class="mc-sub">${m.sub} · ${m.hint}</div>
        </div>
        <div class="mc-right">
          <span class="badge" style="color:${devC};border-color:${devC};">RISK ${res.dev>=0?'+':''}${res.dev.toFixed(1)}%</span>
          <span class="badge" style="color:${rrC};border-color:${rrC};">RR ${res.rr.toFixed(2)}:1</span>
          <span class="chevron${expanded?' open':''}">▾</span>
        </div>
      </div>
      <div id="${id}-body" style="display:${expanded?'block':'none'};">
        <div class="sbar">
          <div class="stat"><div class="stat-l">Avg Entry</div><div class="stat-v">${isNaN(res.ae)?'—':res.ae.toFixed(3)}</div></div>
          <div class="stat"><div class="stat-l">Total Lots</div><div class="stat-v">${res.tl}</div></div>
          <div class="stat"><div class="stat-l">Stop</div><div class="stat-v" style="color:var(--red)">${stopPrice.toFixed(3)}</div></div>
          <div class="stat"><div class="stat-l">TP</div><div class="stat-v" style="color:var(--green)">${tpPrice.toFixed(3)}</div></div>
          <div class="stat"><div class="stat-l">Heat @ Stop</div><div class="stat-v" style="color:var(--red)">$${res.tr.toFixed(0)}</div></div>
        </div>
        <div class="ladder-wrap">
          <div class="lh"><span>#</span><span>Price</span><span>Order</span><span>Size</span><span>Risk</span><span>→SL</span></div>
          <div class="lr tp">
            <span></span>
            <span style="font-weight:700;color:var(--green);">${tpPrice.toFixed(3)}</span>
            <span style="color:var(--green);font-size:10px;font-weight:600;">TAKE PROFIT</span>
            <span></span>
            <span style="color:var(--green);">+$${res.tw.toFixed(0)}</span>
            <span></span>
          </div>
          ${ladderRows}
          <div class="lr sl">
            <span></span>
            <span style="font-weight:700;color:var(--red);">${stopPrice.toFixed(3)}</span>
            <span style="color:var(--red);font-size:10px;font-weight:600;">STOP LOSS</span>
            <span></span>
            <span style="color:var(--red);">-$${res.tr.toFixed(0)}</span>
            <span></span>
          </div>
        </div>
        <div class="sum-strip">
          <div class="sum-cell"><div class="sum-l">Avg Entry</div><div class="sum-v">${isNaN(res.ae)?'—':res.ae.toFixed(3)}</div></div>
          <div class="sum-cell"><div class="sum-l">Total Lots</div><div class="sum-v">${res.tl}</div></div>
          <div class="sum-cell"><div class="sum-l">Risk</div><div class="sum-v" style="color:var(--red)">-$${res.tr.toFixed(0)}</div></div>
          <div class="sum-cell"><div class="sum-l">Reward</div><div class="sum-v" style="color:var(--green)">+$${res.tw.toFixed(0)}</div></div>
          <div class="sum-cell"><div class="sum-l">R:R</div><div class="sum-v" style="color:${rrC}">${res.rr.toFixed(2)}:1</div></div>
        </div>
        <div class="ob">
          <div class="ob-rows">${obRows}</div>
          <div class="ob-foot">
            <span><span class="of-l">TOTAL </span><span class="of-v">${res.tl} lots</span></span>
            <span class="of-sep">·</span>
            <span><span class="of-l">AVG </span><span class="of-v">${isNaN(res.ae)?'—':res.ae.toFixed(3)}</span></span>
            <span class="of-sep">·</span>
            <span><span class="of-l">RISK </span><span class="of-v" style="color:var(--red)">-$${res.tr.toFixed(0)}</span></span>
            <span class="of-sep">·</span>
            <span><span class="of-l">REWARD </span><span class="of-v" style="color:var(--green)">+$${res.tw.toFixed(0)}</span></span>
            <span class="of-sep">·</span>
            <span><span class="of-l">RR </span><span class="of-v" style="color:var(--blue)">${res.rr.toFixed(2)}:1</span></span>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');

  document.getElementById('hActive').innerHTML=`<span style="color:${dirC}">${direction}</span> ${S.product}`;

  document.getElementById('panel-plan').innerHTML=`
    <div class="bstrip ${bcls}">
      <div class="bpill ${bpcls}">${(plan.bias||'').toUpperCase()}</div>
      <div class="btext">${plan.summary||''}</div>
      <div class="ctag">${(plan.confidence||'').toUpperCase()} CONF</div>
    </div>
    ${scrHtml}
    ${paHtml}
    ${klHtml}
    <div style="font-size:8px;letter-spacing:.1em;color:var(--text3);text-transform:uppercase;margin:2px 0;">
      Allocation Models — <span style="color:var(--amber)">★ ${models[recKey].name} recommended (${plan.confidence} confidence)</span>
    </div>
    ${modelCards}
    ${plan.alternativeManagement?`<div class="ac"><div class="ac-t">Alternative Management</div><div class="bullets">${bulletsHtml([plan.alternativeManagement])}</div></div>`:''}
    ${plan.warnings?.length?`<div class="warn">⚠ ${plan.warnings.join(' · ')}</div>`:''}
  `;
}

function bulletsHtml(items,dotClass=''){
  if(!items?.length) return '';
  return items.map(b=>`<div class="bullet"><div class="bullet-dot ${dotClass}"></div><span>${b}</span></div>`).join('');
}

function toggleMC(id){
  const body=document.getElementById(id+'-body');
  const chevron=document.querySelector(`#${id} .chevron`);
  const open=body.style.display==='block';
  body.style.display=open?'none':'block';
  chevron.classList.toggle('open',!open);
}

// ── METRICS ──
function renderMetrics(){
  const el=document.getElementById('panel-metrics');
  if(el.innerHTML.trim()) return;
  const items=[
    {n:'01',t:'Trend Structure vs Mean-Reversion',b:'Primary distinction. Spread/fly at extremes with high ZSc = mean-reversion. DOM ask stacking above = resistance = Sell. Bid stacking below = support = Buy. Never defaults to Buy.',tags:['g→ direction','r→ entry type','a→ confidence']},
    {n:'02',t:'Z-Score (Screener)',b:'Measures std deviations from mean. |ZSc|>200 for spreads = extreme → strong mean-reversion signal. Sign tells direction: positive ZSc at high price = Sell. Negative ZSc at low = Buy.',tags:['a→ mean-rev signal','g→ entry confirmation','r→ stop width']},
    {n:'03',t:'MOM — Momentum (Screener)',b:'Negative MOM on high ZSc = turning point confirmed. Positive MOM on low ZSc = recovery confirmed. Used to validate direction and flag premature entries.',tags:['g→ direction validation','a→ timing']},
    {n:'04',t:'DSH / DSL (Screener)',b:'Distance to swing high/low in bps/10. Small DSH (<0.15) = close to swing high = resistance. Used directly for TP distance (DSL) and stop placement (DSH for sells, DSL for buys).',tags:['r→ stop placement','g→ TP distance','b→ entry range']},
    {n:'05',t:'DOM / Orderflow',b:'Ask stacking 5:1 over bids = resistance confirmed = Sell. Bid stacking = support = Buy. Sweep candles near these levels confirm activity. Refines exact entry ticks by ±1-2.',tags:['g→ entry confirmation','r→ stop tightening','b→ precise ticks']},
    {n:'06',t:'ATR / SD (Screener)',b:'ATR calibrates stop width. Wider ATR = stop further out = fewer lots to stay within risk budget. SD/ATR > 1 = unusually large moves → caution flag raised.',tags:['r→ stop width','a→ lot sizing']},
    {n:'07',t:'Multi-TF Confluence',b:'Higher TF (4h/1D) sets structure. Lower TF (15m/1h) finds precise entry. Both agree → high confidence → front-loaded. Conflict → medium → equal. Opposing → low → back-loaded.',tags:['g→ confidence','r→ conflict warning','b→ model selection']},
    {n:'08',t:'Candle Patterns & Volatility',b:'Pin bars, engulfing at key levels = entry confirmation. Bar compression before level = higher probability. Wide expansion = possible exhaustion or breakout — flagged in warnings.',tags:['g→ entry timing','a→ model recommendation']},
  ];
  el.innerHTML=items.map(m=>`<div class="mr">
    <div class="mr-n">METRIC ${m.n}</div>
    <div class="mr-t">${m.t}</div>
    <div class="bullets" style="margin-bottom:7px;">${bulletsHtml([m.b])}</div>
    <div class="br">${m.tags.map(t=>{const[c,l]=t.split('→');const cc={g:'gd/green',r:'rd/red',b:'bd/blue',a:'ad/amber'}[c.trim()].split('/');return`<span class="badge" style="background:var(--${cc[0]});color:var(--${cc[1]});border:none;">→${l}</span>`;}).join('')}</div>
  </div>`).join('');
}

// ── INIT ──
setProduct('SR3',document.querySelector('#pg-prod .pill.on'));
updateVolSubs();updateHdr();
</script>
</body>
</html>
