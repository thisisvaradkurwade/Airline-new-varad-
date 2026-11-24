<template>
  <div class="airport-scene" aria-label="Animated SkyWings airport with aircraft taxiing and taking off">
    <div class="scene-sky">
      <div class="sun-glow"></div>
      <span class="sky-star star-one"></span><span class="sky-star star-two"></span><span class="sky-star star-three"></span>
      <div class="cloud cloud-one"></div><div class="cloud cloud-two"></div>
      <div class="distant-city">
        <i v-for="n in 15" :key="n" :style="{ '--building': n }"></i>
      </div>
    </div>

    <div class="scene-horizon"></div>
    <div class="terminal">
      <div class="terminal-roof"></div>
      <div class="terminal-sign"><span class="sign-mark">✦</span> SKYWINGS INTERNATIONAL <small>DEPARTURES · ARRIVALS</small></div>
      <div class="terminal-glass">
        <i v-for="n in 12" :key="n"></i>
      </div>
      <div class="terminal-floor"></div>
      <div class="control-tower"><span></span><i></i></div>
      <div class="jet-bridge"></div>
    </div>

    <div class="runway">
      <div class="runway-edge edge-left"></div><div class="runway-edge edge-right"></div>
      <div class="runway-center"></div>
      <div class="runway-lights lights-left"></div><div class="runway-lights lights-right"></div>
      <div class="runway-number">09 <span>✦</span> 27</div>
    </div>

    <div class="taxi-plane">
      <svg viewBox="0 0 260 100" role="img" aria-label="Airliner taxiing">
        <path d="M12 49 L93 42 L130 8 Q137 3 145 8 L128 42 L208 45 Q224 47 236 54 Q224 61 208 62 L128 59 L145 88 Q137 94 130 88 L93 58 L12 54 Q4 52 12 49Z" fill="#f8fbff" stroke="#a9d7ef" stroke-width="2"/>
        <path d="M31 50 L202 50" stroke="#0b75b8" stroke-width="5"/>
        <path d="M74 47 L104 47 M114 47 L144 47 M154 47 L184 47" stroke="#0b75b8" stroke-width="3"/>
        <circle cx="111" cy="70" r="4" fill="#172b46"/><circle cx="184" cy="68" r="4" fill="#172b46"/>
        <path d="M25 55 L7 58" stroke="#f7b84b" stroke-width="3" stroke-linecap="round"/>
      </svg>
    </div>

    <div class="takeoff-plane">
      <svg viewBox="0 0 360 150" role="img" aria-label="SkyWings passenger airplane in flight">
        <defs>
          <linearGradient id="sw-fuselage" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".58" stop-color="#eaf5ff"/><stop offset="1" stop-color="#a9d6f1"/></linearGradient>
          <linearGradient id="sw-wing" x1="0" x2="1"><stop stop-color="#dcecf8"/><stop offset="1" stop-color="#8bbbdc"/></linearGradient>
        </defs>
        <path d="M18 73 Q24 64 45 62 L276 62 Q309 63 340 75 Q309 87 276 88 L45 84 Q24 82 18 73Z" fill="url(#sw-fuselage)" stroke="#b8d5e9" stroke-width="2"/>
        <path d="M133 65 L188 8 Q198 1 211 8 L188 66 L215 82 L188 83 L133 65Z" fill="url(#sw-wing)" stroke="#91bad5" stroke-width="1.5"/>
        <path d="M67 64 L92 31 Q99 25 108 30 L98 66 L110 83 L96 83 L67 82Z" fill="#c4dfef" stroke="#91bad5"/>
        <path d="M35 72 L286 72" stroke="#087db9" stroke-width="5"/>
        <path d="M45 66 L255 66" stroke="#f6b94e" stroke-width="2"/>
        <path d="M295 67 L329 75 L295 81" fill="#087db9"/>
        <g fill="#17466b"><rect x="118" y="68" width="8" height="4" rx="2"/><rect x="133" y="68" width="8" height="4" rx="2"/><rect x="148" y="68" width="8" height="4" rx="2"/><rect x="163" y="68" width="8" height="4" rx="2"/><rect x="178" y="68" width="8" height="4" rx="2"/><rect x="193" y="68" width="8" height="4" rx="2"/><rect x="208" y="68" width="8" height="4" rx="2"/></g>
        <path d="M25 78 L6 84" stroke="#f4b84b" stroke-width="3" stroke-linecap="round"/>
      </svg>
      <span class="plane-trail"></span>
    </div>

    <div class="scene-caption">
      <span class="live-dot"></span>
      <span>SKYWINGS AIRPORT</span>
      <b>YOUR JOURNEY BEGINS HERE</b>
    </div>
    <div class="scene-vignette"></div>
  </div>
</template>

<style scoped>
.airport-scene{position:absolute;inset:0;overflow:hidden;isolation:isolate;background:linear-gradient(180deg,#07182e 0%,#10385c 48%,#367da2 72%,#172d40 100%);pointer-events:none}
.scene-sky{position:absolute;inset:0 0 30%;overflow:hidden;background:radial-gradient(ellipse at 72% 28%,rgba(111,202,242,.28),transparent 38%),linear-gradient(180deg,#07172d 0%,#123c60 68%,#347b9c 100%)}
.sun-glow{position:absolute;width:330px;height:330px;border-radius:50%;right:13%;top:-190px;background:radial-gradient(circle,rgba(255,205,133,.28),rgba(255,205,133,.05) 48%,transparent 70%);filter:blur(5px)}
.sky-star{position:absolute;width:3px;height:3px;border-radius:50%;background:#d9f3ff;box-shadow:0 0 10px #9de3ff;animation:twinkle 3s ease-in-out infinite alternate}
.star-one{left:18%;top:24%}.star-two{left:58%;top:16%;animation-delay:1s}.star-three{right:28%;top:38%;animation-delay:2s}
.cloud{position:absolute;width:150px;height:25px;border-radius:50%;background:rgba(197,226,242,.08);filter:blur(9px);animation:cloud-drift 36s linear infinite}
.cloud-one{top:37%;left:-160px}.cloud-two{top:19%;left:55%;transform:scale(.7);animation-duration:48s}
.distant-city{position:absolute;bottom:0;left:0;right:0;height:25%;display:flex;align-items:flex-end;gap:5px;opacity:.42}
.distant-city i{display:block;flex:1;height:calc(22px + (var(--building) * 7px));background:linear-gradient(90deg,#102c45,#1b4968);border-top:1px solid rgba(169,224,246,.25)}
.distant-city i:nth-child(3n){height:72%}.distant-city i:nth-child(4n){height:48%}
.scene-horizon{position:absolute;left:0;right:0;bottom:29%;height:2px;background:linear-gradient(90deg,transparent,rgba(171,222,244,.5),transparent);box-shadow:0 0 24px rgba(115,205,241,.3)}
.terminal{position:absolute;z-index:2;left:8%;right:8%;bottom:25%;height:36%;min-height:120px;max-height:230px;background:linear-gradient(180deg,rgba(32,76,104,.96),rgba(10,35,58,.98));clip-path:polygon(4% 0,96% 0,100% 100%,0 100%);border-top:2px solid rgba(192,234,250,.55);box-shadow:0 -12px 55px rgba(3,17,31,.4)}
.terminal-roof{position:absolute;left:0;right:0;top:0;height:13px;background:linear-gradient(90deg,#d5e8f2,#4b89aa 35%,#d6edf7 65%,#4b89aa);opacity:.8}
.terminal-sign{position:absolute;top:18%;left:8%;font-size:clamp(8px,1vw,12px);letter-spacing:.22em;color:#d7effb;font-weight:800;text-shadow:0 0 12px rgba(95,202,248,.5)}
.terminal-sign small{display:block;margin:4px 0 0 22px;font-size:7px;letter-spacing:.25em;color:#8db9d0}
.sign-mark{color:#f4bd61;margin-right:7px}
.terminal-glass{position:absolute;left:5%;right:5%;bottom:13%;height:43%;display:grid;grid-template-columns:repeat(12,1fr);gap:5px}
.terminal-glass i{background:linear-gradient(180deg,rgba(116,198,231,.45),rgba(21,77,111,.65));border:1px solid rgba(171,224,244,.25);box-shadow:inset 0 0 12px rgba(144,216,243,.08)}
.terminal-floor{position:absolute;bottom:0;left:0;right:0;height:12%;background:linear-gradient(180deg,#203d52,#091a2a)}
.control-tower{position:absolute;right:15%;top:-36%;width:34px;height:42%;background:linear-gradient(90deg,#153a57,#39708e,#153a57);border-top:6px solid #9ac8dc}
.control-tower span{position:absolute;top:-20px;left:-8px;width:50px;height:15px;background:#8bbbd0;border-radius:4px 4px 1px 1px;box-shadow:0 0 12px rgba(136,218,255,.5)}
.control-tower i{position:absolute;top:-18px;left:50%;height:12px;width:2px;background:#f5bd61}
.jet-bridge{position:absolute;right:3%;bottom:27%;width:17%;height:22%;border:5px solid #7ea8be;border-bottom:0;background:rgba(155,204,224,.18);transform:skewY(-5deg)}
.runway{position:absolute;z-index:3;left:-3%;right:-3%;bottom:-4%;height:32%;background:linear-gradient(180deg,#293d4d,#111f2d 65%,#0a1521);transform:perspective(400px) rotateX(8deg);transform-origin:bottom}
.runway:before{content:"";position:absolute;left:0;right:0;top:0;height:2px;background:rgba(195,224,237,.35)}
.runway-edge{position:absolute;top:12%;height:80%;width:2px;background:rgba(255,255,255,.38)}
.edge-left{left:8%}.edge-right{right:8%}
.runway-center{position:absolute;left:50%;top:8%;bottom:-10%;width:4px;transform:translateX(-50%);background:repeating-linear-gradient(180deg,rgba(255,255,255,.8) 0 18px,transparent 18px 38px);opacity:.8}
.runway-lights{position:absolute;top:12%;bottom:0;width:3px;background:repeating-linear-gradient(180deg,#d7f4ff 0 3px,transparent 3px 20px);filter:drop-shadow(0 0 5px #8edbff)}
.lights-left{left:8%}.lights-right{right:8%}
.runway-number{position:absolute;right:17%;top:22%;color:rgba(255,255,255,.36);font-size:clamp(10px,1.3vw,16px);font-weight:800;letter-spacing:.4em}
.runway-number span{color:#f2bd64}
.taxi-plane{position:absolute;z-index:4;width:clamp(115px,19vw,230px);left:-25%;bottom:13%;opacity:.92;animation:taxi-across 27s linear infinite}
.taxi-plane svg,.takeoff-plane svg{display:block;width:100%;filter:drop-shadow(0 9px 12px rgba(0,0,0,.35))}
.takeoff-plane{position:absolute;z-index:5;width:clamp(190px,31vw,370px);left:-40%;bottom:34%;animation:sky-flight 19s cubic-bezier(.38,.02,.7,.98) infinite;filter:drop-shadow(0 0 18px rgba(113,208,255,.18))}
.plane-trail{position:absolute;left:-28%;top:48%;width:34%;height:2px;background:linear-gradient(90deg,transparent,rgba(202,239,255,.55));filter:blur(1px)}
.scene-caption{position:absolute;z-index:8;right:4%;bottom:5%;display:flex;align-items:center;gap:9px;color:#c4e4f5;font-size:9px;letter-spacing:.22em;font-weight:800;text-shadow:0 2px 8px #061a2a}
.scene-caption b{color:#fff;font-size:9px;margin-left:8px}
.live-dot{width:6px;height:6px;border-radius:50%;background:#7cf0c3;box-shadow:0 0 12px #7cf0c3;animation:twinkle 1.2s infinite alternate}
.scene-vignette{position:absolute;inset:0;z-index:7;box-shadow:inset 0 0 110px rgba(2,12,25,.48)}
@keyframes sky-flight{0%{left:-42%;bottom:31%;transform:translateY(25px) rotate(5deg) scale(.72);opacity:0}8%{opacity:1}35%{transform:translateY(-34px) rotate(-3deg) scale(.95)}65%{transform:translateY(-105px) rotate(-7deg) scale(1.08)}92%{opacity:1}100%{left:112%;bottom:78%;transform:translateY(-140px) rotate(-8deg) scale(.78);opacity:0}}
@keyframes taxi-across{0%{left:-25%;transform:scale(.78)}10%{left:4%}65%{left:67%;transform:scale(.92)}100%{left:120%;transform:scale(.78)}}
@keyframes cloud-drift{from{translate:0 0}to{translate:125vw 0}}
@keyframes twinkle{from{opacity:.35;transform:scale(.7)}to{opacity:1;transform:scale(1.25)}}
@media(max-width:700px){.terminal{left:-5%;right:-5%;height:30%;bottom:24%}.terminal-sign{left:12%;font-size:8px}.terminal-glass{gap:2px}.takeoff-plane{bottom:39%}.scene-caption{right:4%;bottom:4%;letter-spacing:.1em}.scene-caption b{display:none}.runway{height:29%}}
@media(prefers-reduced-motion:reduce){.airport-scene *{animation:none!important}.takeoff-plane{left:36%;bottom:55%;opacity:.85}}
</style>
