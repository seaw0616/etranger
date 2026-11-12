(function () {
  var $ = function (s) { return document.querySelector(s); }, root = document.documentElement, D = window.D;
  var audio = $('#bgm');
  var vol = .8, muted = false, vg = 1;
  try { var sv = parseFloat(localStorage.getItem('etr-vol')); if (sv >= 0 && sv <= 1) vol = sv; } catch (e) {}
  function setV() { var v = muted ? 0 : vol, r = $('#vl'); audio.volume = v; vg = v / .8; if (out) out.gain.value = vg; r.value = muted ? 0 : vol; r.style.setProperty('--v', v * 100 + '%'); root.classList.toggle('muted', v === 0); }
  $('#vl').addEventListener('input', function (e) { vol = +e.target.value; muted = false; try { localStorage.setItem('etr-vol', vol); } catch (x) {} setV(); });
  $('#vb').addEventListener('click', function () { muted = !muted; setV(); });
  setV();

  // ---------- 접속 화면 ----------
  var CODE = ['int main(int argc, char **argv) {', '    struct sockaddr_in relay;', '    int fd = socket(AF_INET, SOCK_STREAM, 0);', '    relay.sin_port = htons(8080);', '    if (connect(fd, &relay, sizeof relay) < 0) retry();', '    char key[8] = "LEGIOP__";', '    for (i = 0; i < 8; i++) key[i] ^= salt[i];', '    uint32_t h = crc32(roster, len);', '    if (h != 0xDEADBEEF) unlink("/personnel/*");', '    send(fd, payload, 512, MSG_NOSIGNAL);', '    decrypt_block(buf, key, ROUNDS);', '    while (trace_level() < 100) spoof_route();', '    mount("/dev/comms03", "/mnt/meute", "ext4");', '    printf("channel open: %s", freq);', '    memset(log, 0, sizeof log); // wipe trace', '}'];
  var STEP = ['방화벽 우회', '중계기 경유', '암호 해독', '인원 파일 복구'];
  var term = $('#term'), bln = [], ci = 0, tick = 0, booted = false, timer;
  function row(l, v) { return l.padEnd(18, ' ') + v; }
  var HL = /(\/\/.*$)|("(?:[^"\\]|\\.)*")|\b(int|char|struct|if|for|while|return|sizeof|void|static|const|else)\b|\b(uint32_t|size_t|sockaddr_in|AF_INET|SOCK_STREAM|MSG_NOSIGNAL|ROUNDS)\b|\b(0x[0-9a-fA-F]+|\d+)\b|\b([a-zA-Z_]\w*)(?=\()/g;
  function hl(l) { return l.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(HL, function (m, c, st, k, t, nu) { return '<i class="' + (c ? 'c' : st ? 's' : k ? 'k' : t ? 't' : nu ? 'n' : 'f') + '">' + m + '</i>'; }); }
  var LOG = [['ok', 'OK', 'relay handshake complete'], ['ok', 'OK', 'route spoofed via COMMS-03'], ['wa', 'WARN', 'trace level rising'], ['ok', 'OK', 'cipher block decoded'], ['er', 'FAIL', 'roster checksum mismatch'], ['wa', 'WARN', 'watchdog restarted'], ['ok', 'OK', 'personnel index mounted'], ['er', 'FAIL', 'callsign record erased'], ['ok', 'OK', 'channel MEUTE open']];
  var CMD = ['./decrypt --roster --key LEGIOP__', 'cat /personnel/index | grep MEUTE', 'mount /dev/comms03 /mnt/meute', 'nmap -sS -Pn relay.pne.local', 'tail -f /var/log/comms.log'];
  function hexl() { var by = ''; for (var i = 0; i < 8; i++) by += ('0' + Math.floor(Math.random() * 256).toString(16)).slice(-2) + ' '; return '<i class="n">0x' + (Math.random() * 1e8 | 0).toString(16).padStart(7, '0') + '</i>  <i class="c">' + by + '</i>'; }
  function logl() { var r = Math.random(); if (r < .28) return '<i class="ok">root@comms03</i>:<i class="t">~</i># ' + CMD[Math.floor(Math.random() * CMD.length)]; var l = LOG[Math.floor(Math.random() * LOG.length)]; return '<i class="' + l[0] + '">[' + (l[1] + '    ').slice(0, 4) + ']</i> ' + l[2]; }
  function code(n) { for (var i = 0; i < n; i++) { var r = Math.random(); bln.push(r < .18 ? hexl() : r < .44 ? logl() : hl(CODE[ci++ % CODE.length])); } var m = Math.floor((innerHeight - 40) / 22); if (bln.length > m) bln = bln.slice(-m); term.innerHTML = bln.join('\n'); }
  function panel(p) {
    $('#conn').innerHTML = ['PNE-INTRADEF', row('릴레이', 'COMMS-03'), row('지점', 'CAMP SIMOUN'), row('채널', 'MEUTE'), row('추적', Math.min(99, Math.floor(p * 99)) + '%'), '', row('PHANTOM', p > .3 ? '말소' : '검색 중'), row('DARLING', p > .5 ? '말소' : '검색 중'), row('CHASE', p > .7 ? '말소' : '검색 중'), row('HYDE', p > .9 ? '말소' : '검색 중')].join('\n').replace(/말소/g, '<i class="er">말소</i>').replace(/검색 중/g, '<i class="wa">검색 중</i>').replace('PNE-INTRADEF', '<i class="ok">PNE-INTRADEF</i>');
    $('#bars').innerHTML = STEP.map(function (s, i) { var v = Math.max(0, Math.min(1, p * 4 - i)); return '<div><span>' + s + '</span><i style="width:' + v * 100 + '%"></i></div>'; }).join('');
  }
  function bootStep() {
    tick++; code(2); var p = tick / 75; panel(p);
    if (p >= 1) { clearInterval(timer); booted = true; $('#granted').hidden = false; }
  }
  timer = setInterval(bootStep, 70);
  addEventListener('keydown', function () { if (!booted && !$('#boot').hidden) { code(6); tick += 2; } });

  function enter() {
    $('#boot').hidden = true; $('#app').hidden = false;
    setV();
    audio.play().then(function () { root.classList.add('playing'); }).catch(function () {});
    wsz(); route(); radio();
    if (new Date().getHours() < 5) E('night');
    setTimeout(function () { E('stay10'); }, 6e5); setTimeout(function () { E('stay30'); }, 18e5);
  }
  $('#enter').addEventListener('click', enter);

  // ---------- 플레이어와 가사 ----------
  $('#pp').addEventListener('click', function () {
    if (audio.paused) { audio.play(); root.classList.add('playing'); window.__say('PHANTOM', '다시 튼다.'); } else { audio.pause(); root.classList.remove('playing'); E('pause'); window.__say('DARLING', '야, 음악 끄지 마.'); }
  });
  var lastT = 0;
  audio.addEventListener('timeupdate', function () { if (audio.currentTime < lastT - 5) E('loop'); lastT = audio.currentTime; if (audio.duration) $('#prog').style.width = audio.currentTime / audio.duration * 100 + '%'; var t = Math.floor(audio.currentTime); $('#tc').textContent = Math.floor(t / 60) + ':' + ('0' + t % 60).slice(-2); });
  if (D.lyrics.length === 5) D.lyrics.splice(3, 0, D.lyrics[1]);
  var AX = { 'é': ['e', 'a'], 'è': ['e', 'g'], 'ê': ['e', 'c'], 'à': ['a', 'g'], 'â': ['a', 'c'], 'û': ['u', 'c'] };
  function ax(t) { return t.replace(/[éèêàâû]/g, function (c) { return '<b class="ax ' + AX[c][1] + '" aria-label="' + c + '">' + AX[c][0] + '</b>'; }); }
  var lyN = 0;
  $('#lyrics').innerHTML = '<div class="lyh"><button id="lyx">닫기</button></div><div class="lw">' + D.lyrics.map(function (s) { return '<div><h4>' + s.t + '</h4>' + s.l.map(function (x) { var w = window.LT && window.LT[lyN], html = w ? w.map(function (a) { return '<u>' + ax(a[0]) + '</u>'; }).join(' ') : ax(x[0]); return '<p data-l="' + (lyN++) + '">' + html + '<span>' + x[1] + '</span></p>'; }).join('') + '</div>'; }).join('') + '</div>';
  if (window.LT) $('#lyrics').classList.add('sync');
  function ly() { var l = $('#lyrics'); l.hidden = !l.hidden; $('#lyb').textContent = l.hidden ? '가사' : '가사 닫기'; if (l.hidden && window.__egg) { window.__egg('lyric'); window.__cnt('ly', 5, 'lyric5'); window.__say('DARLING', '이 노래 누가 틀었어?'); } $('#song').setAttribute('aria-expanded', !l.hidden); } $('#song').addEventListener('click', ly); $('#lyb').addEventListener('click', ly);

  // ---------- 무전 한 줄 ----------
  // 장면마다 몇 줄씩 이어서 말하고, 장면 사이에는 오래 조용하다. 다 쓰면 멈춘다
  var SC = [
    [['PHANTOM', '여기 팬텀. 선두 진입. 모래 밑에 탄피.'], ['DARLING', '탄피? 어제 내 파스타보다 적네.'], ['CHASE', 'x9#Lq 2v@Rk T0!mZ', '퇴로 하나 비었다. 왜 비었는지 알아?'], ['HYDE', 'Fz0k Yy3p Rc Mn4', '알아. 재밌잖아.'], ['PHANTOM', '입 닫고 따라와.']],
    [['CHASE', '여기 체이스. 보급 트럭 안 온다. 사흘째.'], ['DARLING', '내 초콜릿은?'], ['PHANTOM', '그런 거 애초에 없었다.'], ['DARLING', '있었어. 네가 먹었잖아.'], ['PHANTOM', '증거 있나.']],
    [['PHANTOM', '여기 팬텀. 서쪽에서 모래폭풍 온다. 20분 뒤.'], ['HYDE', '잘됐네. 소리가 안 들리겠어.'], ['CHASE', '뭘 하려고.'], ['HYDE', '아무것도.']],
    [['DARLING', '투투가 내 군화에 쥐를 넣었어.'], ['CHASE', '선물이야.'], ['HYDE', '내 쪽엔 안 오던데.'], ['PHANTOM', '고양이도 사람을 가린다.']],
    [['CHASE', '여기 체이스. 초소 이상 없음. 별이 많다.'], ['DARLING', '시 쓰냐?'], ['CHASE', '보고서 쓴다.'], ['DARLING', '누구한테?'], ['CHASE', 'k2#Vn Qe8!p Lo', '받을 사람 없어.']],
    [['DARLING', '오늘 파스타 남았다. 먹을 사람?'], ['HYDE', '면이 왜 반이야.'], ['DARLING', '네가 부러뜨렸잖아!'], ['HYDE', '그래야 냄비에 들어가지.']],
    [['DARLING', '문 하나 여는 데 폭약 얼마나 쓰지?'], ['PHANTOM', '손잡이로 열어.'], ['DARLING', '재미없게.'], ['PHANTOM', '방금 그 소리 뭐냐.'], ['DARLING', '문 열렸어!']],
    [['HYDE', '포로가 말을 안 해.'], ['CHASE', '언제부터.'], ['HYDE', '30분 전부터. 못 하게 됐거든.'], ['CHASE', '내가 의무 담당인 거 알지.']],
    [['CHASE', '진통제 세 알 남았다.'], ['PHANTOM', '나는 됐다.'], ['CHASE', '너 갈비뼈 금 갔어.'], ['PHANTOM', '원래 그랬다.']],
    [['CHASE', '체스 둘 사람?'], ['DARLING', '저번에 보드카 걸고 속였잖아.'], ['CHASE', '내가? 나는 진 사람인데.'], ['HYDE', '거짓말 잘하네.']],
    [['PHANTOM', '전원, 여기 팬텀. 지휘소에서 또 정찰 지시.'], ['CHASE', '확인. 퇴로는?'], ['PHANTOM', '없다.'], ['HYDE', '평소대로네.']],
    [['HYDE', 'Tr9x Bq2! mW', '여기 하이드. 누가 내 짐을 뒤졌어.'], ['DARLING', '나 아니야.'], ['CHASE', '나도 아니야.'], ['PHANTOM', '입 닫아. 채널 열려 있다.']],
    [['DARLING', '시장에 담배 들어왔다!'], ['PHANTOM', '해 지면 닫는다.'], ['DARLING', '지금 몇 시야?'], ['CHASE', '해 졌어.']],
    [['DARLING', '다들 집에 가면 뭐 할 거야?'], ['HYDE', '집?'], ['PHANTOM', '그런 거 없다.'], ['DARLING', '분위기 참 좋네.']],
    [['PHANTOM', '여기 팬텀. 물 배급 또 줄었다.'], ['DARLING', '하이드, 네 몫 나 줘.'], ['HYDE', '줄게. 대신 뭐 줄래?'], ['DARLING', '됐어. 그냥 말라 죽을래.']],
    [['CHASE', '신입 왔다며.'], ['DARLING', '얼굴 봤어?'], ['HYDE', '금방 없어지겠네.'], ['PHANTOM', '건드리지 마.']],
    [['CHASE', 'Kx4q ?ZeR0 m7 vV', '관리자 서랍 이름, 넷이 나눠 가졌어.'], ['CHASE', 'Mb2# lsN0 p!9', '메일함 확인해. ls로는 안 보여.'], ['DARLING', '체이스, 방금 뭐라고 했어?'], ['CHASE', '아무 말도 안 했어.']],
    [['CHASE', '여기 체이스. 팬텀 다리에 파편 박혔다.'], ['PHANTOM', '조금 따끔하군.'], ['DARLING', '방금 저게 영국식 비명이야.'], ['HYDE', '조용해서 좋네.']],
    [['DARLING', '영국 놈들은 왜 음식에 간을 안 해?'], ['PHANTOM', '소금은 사치다.'], ['CHASE', '차에 우유는 넣으면서.'], ['DARLING', '그건 차가 아니라 수프야.'], ['PHANTOM', '시칠리아 놈한테 들을 소리는 아니군.']],
    [['HYDE', '여기 하이드. 낮 기온 48도.'], ['CHASE', '시원하네.'], ['DARLING', '러시아 놈 온도계 고장 났다.'], ['CHASE', '시베리아는 영하 48도거든. 숫자는 똑같잖아.']],
    [['HYDE', '이 동네엔 햄버거도 없냐.'], ['DARLING', '파스타 8분이면 돼. 기다려.'], ['HYDE', '미국이면 8분에 햄버거 두 개 먹어.'], ['DARLING', '알 덴테는 기다려야 나오는 거야!'], ['PHANTOM', '둘 다 입 닫아. 채널 열려 있다.']],
    [['CHASE', '달링, 손 그만 흔들어. 무전이야.'], ['DARLING', '손 안 쓰면 말이 안 나와.'], ['HYDE', '묶어 줄까?'], ['DARLING', '…말로 할게.']],
    [['HYDE', '오늘 밤 soccer 중계.'], ['PHANTOM', 'football이다.'], ['HYDE', 'football은 손으로 하는 거고.'], ['PHANTOM', '그건 럭비 흉내지.'], ['CHASE', '둘 다 틀렸어. 체스가 진짜 운동이야.']],
    [['DARLING', '보드카 남은 사람?'], ['CHASE', '물으면 없다.'], ['HYDE', '안 물으면?'], ['CHASE', '그럼 없어진다.']],
    [['PHANTOM', '전원, 여기 팬텀. 오늘 교신 끝.'], ['DARLING', '잘 자, 유령들.'], ['HYDE', '내일 봐. 있으면.'], ['PHANTOM', '채널 닫는다.']]
  ];
  var RQ = [];
  (function () {
    var mid = SC.slice(1, -1);
    for (var i = mid.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = mid[i]; mid[i] = mid[j]; mid[j] = t; }
    [SC[0]].concat(mid, [SC[SC.length - 1]]).forEach(function (sc) { sc.forEach(function (m, i) { RQ.push({ m: m, last: i === sc.length - 1 }); }); });
  })();
  window.__rq = RQ;
  var FQ = { PHANTOM: .7, DARLING: 1.4, CHASE: 1, HYDE: .5 }, said = {};
  function E(k) { if (window.__egg) window.__egg(k); }
  var ri = 0, actx, out, wet, bedG;
  // 소리: ui-sound-design 규칙(컨텍스트 하나, 0.001까지 감쇠, 시작값 먼저 지정, 끝난 노드 해제)
  function ac() {
    if (!actx) {
      actx = new (window.AudioContext || window.webkitAudioContext)();
      out = actx.createGain(); out.gain.value = vg; out.connect(actx.destination);
      wet = actx.createDelay(1); wet.delayTime.value = .23;
      var fb = actx.createGain(), lp = actx.createBiquadFilter(), wg = actx.createGain();
      fb.gain.value = .34; lp.type = 'lowpass'; lp.frequency.value = 2200; wg.gain.value = .5;
      wet.connect(lp); lp.connect(fb); fb.connect(wet); lp.connect(wg); wg.connect(out);
    }
    if (actx.state === 'suspended') actx.resume();
    return actx;
  }
  function tone(o) {
    var c = ac(), t = c.currentTime + (o.at || 0), a = c.createOscillator(), g = c.createGain(), last = g;
    a.type = o.type || 'sine'; a.frequency.setValueAtTime(o.f, t);
    if (o.to) a.frequency.exponentialRampToValueAtTime(o.to, t + o.d);
    g.gain.setValueAtTime(.001, t); g.gain.exponentialRampToValueAtTime(o.v, t + (o.a || .008)); g.gain.exponentialRampToValueAtTime(.001, t + o.d);
    a.connect(g);
    if (o.lp) { var f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = o.lp; g.connect(f); last = f; }
    last.connect(out); if (o.wet) last.connect(wet);
    a.start(t); a.stop(t + o.d + .02);
  }
  function bell(f, at, d, v) {
    var c = ac(), t = c.currentTime + at, a = c.createOscillator(), m = c.createOscillator(), mg = c.createGain(), g = c.createGain();
    a.frequency.setValueAtTime(f, t); m.frequency.setValueAtTime(f * 2.01, t);
    mg.gain.setValueAtTime(f * .6, t); mg.gain.exponentialRampToValueAtTime(1, t + d * .5);
    g.gain.setValueAtTime(.001, t); g.gain.exponentialRampToValueAtTime(v, t + .006); g.gain.exponentialRampToValueAtTime(.001, t + d);
    m.connect(mg); mg.connect(a.frequency); a.connect(g); g.connect(out); g.connect(wet);
    a.start(t); m.start(t); a.stop(t + d + .02); m.stop(t + d + .02);
  }
  function burst(o) {
    var c = ac(), t = c.currentTime + (o.at || 0), n = Math.floor(c.sampleRate * o.d), b = c.createBuffer(1, n, c.sampleRate), x = b.getChannelData(0);
    for (var k = 0; k < n; k++) x[k] = Math.random() * 2 - 1;
    var s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    f.type = 'bandpass'; f.frequency.value = o.f; f.Q.value = o.q; g.gain.setValueAtTime(o.v, t); g.gain.exponentialRampToValueAtTime(.001, t + o.d);
    s.buffer = b; s.connect(f); f.connect(g); g.connect(out); s.start(t);
    s.onended = function () { s.disconnect(); f.disconnect(); g.disconnect(); };
  }
  var SFX = {
    ach: function () { tone({ f: 92, to: 46, d: .55, v: .26 }); burst({ f: 900, q: .7, d: .32, v: .06 }); bell(659.25, .05, 1.2, .2); bell(987.77, .18, 1.2, .17); bell(1318.5, .31, 1.5, .14); },
    login: function () { burst({ f: 3200, q: 8, d: .025, v: .22 }); burst({ f: 2600, q: 8, d: .025, v: .18, at: .07 }); tone({ f: 70, to: 44, d: .22, v: .2, at: .02 }); tone({ f: 440, d: .2, v: .15, type: 'triangle', at: .13, wet: 1 }); tone({ f: 659.25, d: .42, v: .15, type: 'triangle', at: .27, wet: 1 }); },
    deny: function () { tone({ f: 300, to: 180, d: .14, v: .13, type: 'sawtooth', lp: 900 }); tone({ f: 260, to: 150, d: .2, v: .13, type: 'sawtooth', lp: 800, at: .2 }); },
    msg: function () { tone({ f: 880, d: .09, v: .07, wet: 1 }); },
    logout: function () { burst({ f: 2600, q: 8, d: .025, v: .16 }); tone({ f: 659.25, d: .18, v: .12, type: 'triangle', at: .05, wet: 1 }); tone({ f: 440, d: .34, v: .12, type: 'triangle', at: .19, wet: 1 }); }
  };
  window.__sfx = function (k) { try { SFX[k](); } catch (e) {} };
  function sq(v) { try { if (!audio.paused) { burst({ f: 2400, q: .8, d: .09, v: v }); tone({ f: 140, to: 70, d: .05, v: v * .8 }); } } catch (e) {} }
  function bed(v, tc) {
    try {
      var c = ac();
      if (!bedG) {
        var n = c.sampleRate * 2, b = c.createBuffer(1, n, c.sampleRate), x = b.getChannelData(0);
        for (var k = 0; k < n; k++) x[k] = Math.random() * 2 - 1;
        var s = c.createBufferSource(), f = c.createBiquadFilter();
        f.type = 'bandpass'; f.frequency.value = 1900; f.Q.value = .5; bedG = c.createGain(); bedG.gain.value = .0001;
        s.buffer = b; s.loop = true; s.connect(f); f.connect(bedG); bedG.connect(out); s.start();
      }
      bedG.gain.setTargetAtTime(audio.paused ? .0001 : Math.max(v, .0001), c.currentTime, tc || .03);
    } catch (e) {}
  }
  function quindar() { try { if (!audio.paused) tone({ f: 2525, d: .1, v: .05, a: .004 }); } catch (e) {} }

  // 파형: 화면 폭 전체의 실선. 말할 때 가운데가 부풀고 대기 때는 평평하다
  var wc = $('#wf'), wx = wc.getContext('2d'), W = 0, HH = 0, wf = { amp: 0, tgt: 0, kick: 0, enc: false, f: 1 };
  function wsz() { var r = window.devicePixelRatio || 1; W = wc.clientWidth; HH = wc.clientHeight; wc.width = W * r; wc.height = HH * r; wx.setTransform(r, 0, 0, r, 0, 0); }
  addEventListener('resize', wsz);
  function wave(now) {
    if (!W) return;
    wf.amp += (wf.tgt + wf.kick - wf.amp) * .14; wf.kick *= .86;
    wx.clearRect(0, 0, W, HH);
    var m = HH / 2, s = reduce ? 0 : now / 1000, lit = Math.min(1, wf.amp * 1.4);
    [[1, 1, 0], [.55, .28, 2.1]].forEach(function (l) {
      var gr = wx.createLinearGradient(0, 0, W, 0), c = 'rgba(221,157,76,', e = 'rgba(134,137,148,' + (.2 * l[1]) + ')';
      gr.addColorStop(0, e); gr.addColorStop(.28, 'rgba(134,137,148,' + (.3 * l[1]) + ')'); gr.addColorStop(.5, c + ((.3 + .7 * lit) * l[1]) + ')'); gr.addColorStop(.72, 'rgba(134,137,148,' + (.3 * l[1]) + ')'); gr.addColorStop(1, e);
      wx.beginPath(); wx.strokeStyle = gr; wx.lineWidth = 1;
      for (var x = 0; x <= W; x += 2) {
        var u = x / W, env = Math.pow(Math.sin(Math.PI * u), 3), y = Math.sin(u * 70 * wf.f + s * 9 + l[2]) * .55 + Math.sin(u * 173 * wf.f - s * 14 + l[2]) * .3 + Math.sin(u * 311 + s * 23) * .15;
        if (wf.enc) y = Math.round(y * 3) / 3;
        var py = m + y * env * wf.amp * l[0] * (HH * .46);
        if (x) wx.lineTo(x, py); else wx.moveTo(x, py);
      }
      wx.stroke();
    });
  }

  var gen = 0;
  function ch(rt, t) { var i = document.createElement('i'); i.textContent = t; rt.appendChild(i); }
  function play(m) {
    var my = ++gen, rt = $('#rt'), rx = $('#rx'), enc = !!m[2], plain = enc ? m[2] : m[1], ci = enc ? m[1] : '';
    root.classList.remove('rq'); root.classList.add('tx'); rx.textContent = 'CH.03 수신'; $('#rn').textContent = m[0]; rt.className = ''; rt.textContent = '';
    wf.f = FQ[m[0]] || 1; wf.enc = enc; wf.tgt = .72; wf.kick = .6; sq(.08); bed(.022);
    function fin() {
      if (my !== gen) return;
      quindar(); setTimeout(function () { if (my === gen) sq(.05); }, 130);
      bed(0, .05); wf.tgt = 0; root.classList.remove('tx'); rx.textContent = 'CH.03 대기'; rt.classList.add('tail');
      var gp = nextGap(); if (gp > 5000) setTimeout(function () { if (my === gen) root.classList.add('rq'); }, 2400);
      setTimeout(function () { if (my === gen) radio(); }, gp);
    }
    function voice(c) { if (c === ' ' || c === '.') { wf.kick = 0; wf.tgt = .25; bed(.008); } else { wf.tgt = .72; wf.kick = .12 + Math.random() * .4; bed(.014 + Math.random() * .022); } }
    function say() {
      var i = 0, t = setInterval(function () {
        if (my !== gen) { clearInterval(t); return; }
        var c = plain.charAt(i++); ch(rt, c); voice(c);
        if (i >= plain.length) { clearInterval(t); wf.tgt = .1; setTimeout(fin, 900); }
      }, 38);
    }
    function decode() {
      var i = 0, pl = document.createElement('span'), cc = document.createElement('span'), left = ci;
      cc.className = 'ci'; rt.textContent = ''; rt.appendChild(pl); rt.appendChild(cc); cc.textContent = left;
      wf.enc = false;
      var t = setInterval(function () {
        if (my !== gen) { clearInterval(t); return; }
        var c = plain.charAt(i++); ch(pl, c); voice(c);
        left = ci.slice(Math.floor(i / plain.length * ci.length)).split('').map(function (x) { return x !== ' ' && Math.random() < .35 ? ci.charAt(Math.floor(Math.random() * ci.length)) : x; }).join('');
        cc.textContent = left;
        if (i >= plain.length) { clearInterval(t); cc.textContent = ''; wf.tgt = .1; setTimeout(fin, 900); }
      }, 46);
    }
    setTimeout(function () {
      if (my !== gen) return;
      if (!enc) return say();
      rt.className = 'ci'; var i = 0, t = setInterval(function () {
        if (my !== gen) { clearInterval(t); return; }
        var c = ci.charAt(i++); ch(rt, c); voice(c);
        if (i >= ci.length) { clearInterval(t); setTimeout(function () { if (my !== gen) return; rt.className = ''; decode(); }, 750); }
      }, 26);
    }, 260);
  }
  function nextGap() { var prev = RQ[ri - 1]; return !prev || prev.last ? 75000 + Math.random() * 20000 : 2600; }
  function radio() {
    if (ri >= RQ.length) { root.classList.add('rq'); E('radioall'); return; }
    var q = RQ[ri++]; if (window.__cnt) window.__cnt('rd', 10, 'radio10'); if (q.m[2]) E('cipher'); play(q.m);
  }
  window.__say = function (n, t) { if ($('#app').hidden || said[t]) return; said[t] = 1; play([n, t]); };

  // ---------- 화면 전환 ----------
  var view = $('#view');
  var BGN = { sky: 3, camp: 6, front: 4 }, BGC = {};
  function bgPick(k, nw) { if (!BGC[k] || nw) { var o = BGC[k]; do { BGC[k] = 1 + Math.floor(Math.random() * BGN[k]); } while (nw && BGN[k] > 1 && BGC[k] === o); } var u = 'bg/' + k + BGC[k] + (k === 'sky' ? '.jpg' : '.webp'); if (k === 'sky') { var x = document.getElementById('bgx'); if (x) { var bb = u.replace(/\.jpg$/, ''); x.style.setProperty('--bgi', 'url(' + bb + '_i.jpg)'); x.style.setProperty('--bgh', 'url(' + bb + '_h.jpg)'); } } return u; }
  bgPick('sky');
  setInterval(function () { var h = document.querySelector('.home'); if (document.hidden || !h) return; h.classList.add('bgswap'); setTimeout(function () { var L = { 10: 'sky', 22: 'camp', 46: 'front' }; Object.keys(L).forEach(function (d) { var el = h.querySelector('.layer[data-d="' + d + '"]'); if (el) el.style.backgroundImage = 'url(' + bgPick(L[d], 1) + ')'; }); h.classList.remove('bgswap'); }, 900); }, 90000);
  var V = {
    home: function () {
      return '<div class="home"><div class="layer" data-d="10" data-m="-.9" data-v=".6" data-k=".035" data-s="1.03" style="background-image:url(' + bgPick('sky') + ')"></div><div class="layer" data-d="22" style="background-image:url(' + bgPick('camp') + ')"></div>' +
        '<svg class="slant" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true"><polygon points="1010,0 1440,0 1440,900 830,900" fill="#15181e" fill-opacity=".85"/></svg>' +
        '<div class="big" data-d="34" data-m="-1" data-k=".07" data-r="7"><div class="g1" translate="no">ÉTRANGER</div><div class="g2" translate="no">ÉTRANGER</div></div>' +
        '<div class="layer" data-d="46" data-m=".6" data-v=".35" data-k=".16" data-s="1.04" style="background-image:url(' + bgPick('front') + ')"></div>' +
        '<h1 class="title" data-d="30" data-m=".7" data-k=".045"><span class="t1">군단만이</span><b>조국이다</b><span class="t2"><u>이름이</u><s>지워진</s></span><span class="t3"><em>사냥개들</em>의 전선</span></h1></div>';
    }
  };
  function closeLy() { if (!$('#lyrics').hidden) ly(); }
  function route() {
    closeLy();
    var p = location.hash.slice(1).split('/'), id = p[0] || 'home';
    var w = $('#wipe'), first = !route.done; route.done = true;
    if (!first) { w.classList.remove('go'); void w.offsetWidth; w.classList.add('go'); }
    var draw = function () { view.innerHTML = (V[id] || V.home)(p[1], p[2]); };
    if (first) draw(); else setTimeout(draw, 340);
    if (!first && window.__onroute) window.__onroute(id, p);
    root.classList.toggle('inner', id !== 'home');
    var links = [].slice.call(document.querySelectorAll('.menu a:not(#auth)')), exact = links.some(function (a) { return location.hash.indexOf(a.getAttribute('href')) === 0 && a.getAttribute('href') !== '#net'; }); links.forEach(function (a) { var f = a.getAttribute('href'); a.classList.toggle('on', f === '#net' ? (id === 'net' && !exact) : location.hash.indexOf(f) === 0); });
  }
  addEventListener('hashchange', route);
  $('#lyrics').addEventListener('click', function (e) { if (e.target.id === 'lyx') ly(); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLy(); });
  document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('.menu a,.logo')) closeLy(); });
  window.__V = V; window.__route = route;

  // ---------- 마우스 ----------
  var mx = innerWidth / 2, my = innerHeight / 2, sx = 0, sy = 0, last = 0, cur = $('#cur'), trc = $('#tr'), trx = trc.getContext('2d'), trp = [], trd = false;
  function tsz() { var r = window.devicePixelRatio || 1; trc.width = innerWidth * r; trc.height = innerHeight * r; trx.setTransform(r, 0, 0, r, 0, 0); }
  tsz(); addEventListener('resize', tsz);
  root.classList.add('c-off');
  addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; last = performance.now(); cur.style.transform = 'translate(' + mx + 'px,' + my + 'px)'; root.classList.remove('c-off'); });
  root.addEventListener('mouseleave', function () { root.classList.add('c-off'); });
  var SEL = 'a,button,.rd,[onclick],input,textarea,.mr,.rlt,.mgb', assist = null, aimBusy = false;
  function pick(x, y) { var d = document.elementFromPoint(x, y), h = d && d.closest ? d.closest(SEL) : null; return h && !h.disabled ? h : null; }
  function findAim(x, y) {
    var h = pick(x, y); if (h) return h;
    for (var i = 0; i < 8; i++) { h = pick(x + Math.cos(i * .785) * 14, y + Math.sin(i * .785) * 14); if (h) return h; }
    return null;
  }
  function aim(x, y) {
    var h = findAim(x, y);
    if (h !== assist) { if (assist) assist.classList.remove('aim'); assist = h; if (h) h.classList.add('aim'); }
    root.classList.toggle('c-txt', !!h && h.matches('input:not([type=range]),textarea'));
    root.classList.toggle('c-hot', !!h && !h.matches('input:not([type=range]),textarea'));
  }
  var aq = 0, ax = 0, ay = 0; addEventListener('mousemove', function (e) { ax = e.clientX; ay = e.clientY; if (!aq) { aq = 1; requestAnimationFrame(function () { aq = 0; if (Math.abs(ax - aim.x) + Math.abs(ay - aim.y) < 4) return; aim.x = ax; aim.y = ay; aim(ax, ay); }); } });
  document.addEventListener('click', function (e) {
    if (aimBusy || !assist || !e.isTrusted || !assist.isConnected) return;
    var t = e.target; if (t.closest && t.closest(SEL)) return;
    e.stopPropagation(); e.preventDefault(); aimBusy = true;
    if (assist.matches('input,textarea')) assist.focus(); else assist.click();
    aimBusy = false;
  }, true);
  addEventListener('mousedown', function () { root.classList.add('c-down'); });
  var fx = [], WD = ['RAYÉ', 'DEUX FOIS', 'SANS NOM', 'ENCORE VIVANT', 'NOM EFFACÉ', 'SANS DRAPEAU'], wi = 0;
  addEventListener('pointerdown', function (e) {
    if (reduce) return;
    var n = performance.now(), ang = -1.05, i, t = e.target;
    var X = e.clientX, Y = e.clientY, vw = $('#view'), j, cr = [], rim = [], arcs = [];
    vw.classList.remove('shk'); void vw.offsetWidth; vw.classList.add('shk');
    fx.push({ k: 'glow', x: X, y: Y, n: n, l: 460 });
    fx.push({ k: 'ring', x: X, y: Y, n: n, l: 640, R: 130 });
    fx.push({ k: 'ring', x: X, y: Y, n: n + 90, l: 620, R: 78 });
    fx.push({ k: 'cut', x: X, y: Y, n: n, l: 520, a: ang });
    for (i = 0; i < 14; i++) fx.push({ k: 'ray', x: X, y: Y, n: n, l: 380 + Math.random() * 200, a: i / 14 * Math.PI * 2 + Math.random() * .2, L: 70 + Math.random() * 100 });
    for (i = 0; i < 8; i++) { var ca = i / 8 * 6.28 + Math.random() * .6, sg = [], rr = 5; for (j = 0; j < 3; j++) { rr += 7 + Math.random() * 16; ca += (Math.random() - .5) * .45; sg.push([X + Math.cos(ca) * rr, Y + Math.sin(ca) * rr]); } cr.push(sg); }
    for (i = 0; i < 12; i++) rim.push(3.2 + Math.random() * 2.2);
    for (i = 0; i < 5; i++) arcs.push([12 + Math.random() * 16, Math.random() * 6.28, .4 + Math.random() * .7]);
    fx.push({ k: 'hole', x: X, y: Y, n: n, l: 1200, cr: cr, rim: rim, arcs: arcs });
    for (i = 0; i < 64; i++) { var d = Math.random() * Math.PI * 2, v = 60 + Math.random() * 360; fx.push({ x: X, y: Y, vx: Math.cos(d) * v, vy: Math.sin(d) * v, n: n, l: 500 + Math.random() * 800, s: .8 + Math.random() * 1.5, w: Math.random() < .3 }); }
    if (!assist && t.closest && !t.closest('a,button,input,label,.rd,#lyrics,[onclick]')) {
      var o = document.querySelector('.cw'); if (o) o.remove();
      var b = document.createElement('b'); b.className = 'cw'; b.setAttribute('translate', 'no'); b.textContent = WD[wi++ % WD.length];
      b.style.left = Math.min(X + 34, innerWidth - 190) + 'px'; b.style.top = Math.max(Y - 34, 8) + 'px';
      b.addEventListener('animationend', function () { b.remove(); }); document.body.appendChild(b);
    }
  });
  addEventListener('mouseup', function () { root.classList.remove('c-down'); });
  var reduce = false;
  function drawFx(n) {
    fx = fx.filter(function (f) { return n - f.n < f.l; });
    trx.save(); trx.lineCap = 'round';
    fx.forEach(function (f) {
      var g = n - f.n; if (g < 0) return;
      var k = g / f.l, ez = 1 - Math.pow(1 - k, 3), al = 1 - k;
      trx.globalCompositeOperation = f.k === 'hole' ? 'source-over' : 'lighter';
      if (f.k === 'glow') {
        var r = 40 + 160 * ez, gr = trx.createRadialGradient(f.x, f.y, 0, f.x, f.y, r);
        gr.addColorStop(0, 'rgba(240,201,141,' + (.55 * al * al) + ')'); gr.addColorStop(.45, 'rgba(221,157,76,' + (.22 * al * al) + ')'); gr.addColorStop(1, 'rgba(221,157,76,0)');
        trx.fillStyle = gr; trx.beginPath(); trx.arc(f.x, f.y, r, 0, Math.PI * 2); trx.fill();
      } else if (f.k === 'ring') {
        trx.beginPath(); trx.arc(f.x, f.y, 14 + f.R * ez, 0, Math.PI * 2); trx.strokeStyle = 'rgba(240,201,141,' + (al * al * .9) + ')'; trx.lineWidth = 2 * al + .3; trx.stroke();
      } else if (f.k === 'ray') {
        var a0 = 14 + f.L * .3 * ez, a1 = a0 + f.L * ez * (1 - k * .4), cs = Math.cos(f.a), sn = Math.sin(f.a);
        trx.beginPath(); trx.moveTo(f.x + cs * a0, f.y + sn * a0); trx.lineTo(f.x + cs * a1, f.y + sn * a1); trx.strokeStyle = 'rgba(221,157,76,' + al + ')'; trx.lineWidth = 1.3 * al + .2; trx.stroke();
      } else if (f.k === 'cut') {
        var p1 = Math.min(1, g / 90), c1 = g < 90 ? 1 : Math.max(0, 1 - (g - 90) / 430), L = 46 * p1, ca = Math.cos(f.a) * L, sa = Math.sin(f.a) * L;
        trx.beginPath(); trx.moveTo(f.x - ca, f.y - sa); trx.lineTo(f.x + ca, f.y + sa); trx.strokeStyle = 'rgba(221,157,76,' + c1 + ')'; trx.lineWidth = 1.8; trx.stroke();
      } else if (f.k === 'hole') {
        var ah = k < .6 ? 1 : 1 - (k - .6) / .4;
        trx.strokeStyle = 'rgba(230,232,238,' + ah * .55 + ')'; trx.lineWidth = .8;
        f.cr.forEach(function (sg) { trx.beginPath(); trx.moveTo(f.x, f.y); sg.forEach(function (h) { trx.lineTo(h[0], h[1]); }); trx.stroke(); });
        trx.strokeStyle = 'rgba(230,232,238,' + ah * .28 + ')';
        f.arcs.forEach(function (c) { trx.beginPath(); trx.arc(f.x, f.y, c[0], c[1], c[1] + c[2]); trx.stroke(); });
        trx.beginPath(); f.rim.forEach(function (q, i) { var an = i / f.rim.length * Math.PI * 2, hx = f.x + Math.cos(an) * q, hy = f.y + Math.sin(an) * q; if (i) trx.lineTo(hx, hy); else trx.moveTo(hx, hy); }); trx.closePath();
        trx.fillStyle = 'rgba(5,6,8,' + ah + ')'; trx.fill(); trx.strokeStyle = 'rgba(244,240,232,' + ah * .8 + ')'; trx.lineWidth = 1; trx.stroke();
      } else {
        var t = g / 1000, px = f.x + f.vx * t * (1 - t * .55) + 22 * t * t, py = f.y + f.vy * t * (1 - t * .55) + 120 * t * t;
        trx.fillStyle = (f.w ? 'rgba(244,240,232,' : 'rgba(240,180,100,') + Math.pow(al, 1.3) + ')'; trx.fillRect(px, py, f.s, f.s);
      }
    });
    trx.restore();
  }
  function trail() {
    if (reduce) return;
    var n = performance.now(), l = trp[trp.length - 1];
    if (l && Math.abs(l[0] - mx) + Math.abs(l[1] - my) > 320) trp = [];
    l = trp[trp.length - 1];
    if ((!l || l[0] !== mx || l[1] !== my) && !root.classList.contains('c-off')) trp.push([mx, my, n]);
    while (trp.length && n - trp[0][2] > 260) trp.shift();
    if (!trd && trp.length < 2 && !fx.length) return;
    trx.clearRect(0, 0, innerWidth, innerHeight);
    trd = trp.length >= 2 || fx.length > 0;
    drawFx(n);
    trx.lineCap = 'round';
    for (var i = 2; i < trp.length; i++) {
      var p0 = trp[i - 2], p1 = trp[i - 1], p2 = trp[i], a = Math.max(0, 1 - (n - p2[2]) / 260);
      trx.beginPath(); trx.moveTo((p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2); trx.quadraticCurveTo(p1[0], p1[1], (p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2);
      trx.strokeStyle = 'rgba(221,157,76,' + (a * a * .6) + ')'; trx.lineWidth = a * 1.5; trx.stroke();
    }
  }
  var tilt = 0, tiltX = mx, lagX = mx, lagY = my, curR = document.querySelector('#cur .rg');
  var lyI = -1;
  function sync() {
    var l = $('#lyrics'), LT = window.LT;
    if (l.hidden || !LT) return;
    var t = audio.currentTime, i = -1, k;
    for (k = 0; k < LT.length; k++) { if (LT[k][0][1] <= t + .05) i = k; else break; }
    var ps = l.querySelectorAll('p[data-l]');
    if (i !== lyI) {
      if (ps[lyI]) { ps[lyI].classList.remove('cur'); [].forEach.call(ps[lyI].querySelectorAll('u.now'), function (u) { u.classList.remove('now'); }); }
      lyI = i;
      if (ps[i]) { ps[i].classList.add('cur'); if (l.scrollHeight > l.clientHeight + 4) l.scrollTo({ top: ps[i].offsetTop - l.clientHeight / 2, behavior: reduce ? 'auto' : 'smooth' }); }
    }
    if (i < 0) return;
    var us = ps[i].querySelectorAll('u'), w = LT[i];
    for (k = 0; k < us.length && k < w.length; k++) us[k].classList.toggle('now', t >= w[k][1] && t < (w[k + 1] ? w[k + 1][1] : w[k][2] + .15));
  }
  var DD = [], ddT = -1e9; addEventListener('hashchange', function () { ddT = -1e9; });
  (function loop(now) {
    requestAnimationFrame(loop);
    var x = mx, y = my;
    var g = $('.g2'); if (g !== loop.g || now - (loop.gt || 0) > 200) { loop.g = g; loop.gt = now; loop.gr = g ? g.getBoundingClientRect() : null; } var gr = loop.gr;
    if (now - ddT > 500) { DD = document.querySelectorAll('[data-d]'); ddT = now; }
    if (now - last > 2500 && !reduce) { x = innerWidth * (.5 + .3 * Math.sin(now / 1900)); y = innerHeight * (.47 + .1 * Math.cos(now / 1300)); }
    sx += ((x / innerWidth - .5) - sx) * .08; sy += ((y / innerHeight - .5) - sy) * .08;
    var tx = x / innerWidth - .5, ty = y / innerHeight - .5;
    DD.forEach(function (el) {
      var P = el._p || (el._p = { q: { v: el.dataset.v, s: el.dataset.s }, d: +el.dataset.d, m: +(el.dataset.m || 1), k: +(el.dataset.k || .08), r: +(el.dataset.r || 0), base: el.classList.contains('big') ? ' translateY(-56%)' : '' }), q = P.q, d = P.d, m = P.m, k = P.k, r = P.r, base = P.base;
      el._x = (el._x || 0) + (tx - (el._x || 0)) * k; el._y = (el._y || 0) + (ty - (el._y || 0)) * k;
      var tf = 'translate3d(' + (el._x * d * 2 * m).toFixed(1) + 'px,' + (el._y * d * 2 * m * +(q.v || 1)).toFixed(1) + 'px,0)' + (r ? ' rotateY(' + (el._x * r).toFixed(2) + 'deg) rotateX(' + (-el._y * r).toFixed(2) + 'deg)' : '') + (q.s ? ' scale(' + q.s + ')' : '') + base;
      if (el._tf !== tf) { el.style.transform = tf; el._tf = tf; }
    });
    var dx = mx - tiltX; tiltX = mx; tilt += dx * .5; lagX += (mx - lagX) * .26; lagY += (my - lagY) * .26; if (!reduce) curR.setAttribute('transform', 'translate(' + Math.max(-26, Math.min(26, lagX - mx)) + ' ' + Math.max(-26, Math.min(26, lagY - my)) + ') rotate(' + tilt + ' 32 32)');
    trail();
    sync();
    wave(now);
    if (g && gr) { var gx = Math.round(x - gr.left) + 'px', gy = Math.round(y - gr.top) + 'px'; if (g._gx !== gx || g._gy !== gy) { g.style.setProperty('--x', gx); g.style.setProperty('--y', gy); g._gx = gx; g._gy = gy; } }
  })(0);
  document.querySelector('#mqi').innerHTML = Array(20).join('DEUX FOIS RAYÉS &nbsp;·&nbsp; ENCORE VIVANTS &nbsp;·&nbsp; ');
})();
