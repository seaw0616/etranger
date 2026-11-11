(function () {
  var V = window.__V, D = window.D, user = null, eggs = {};
  var $ = function (s) { return document.querySelector(s); };
  var R = function (t) { return '<span class="rd" tabindex="0">' + t + '</span>'; };
  var OV = {}, OVP = {"phantom": "서류상 사망 처리된 정찰 요원.", "darling": "화력 및 폭파 담당. 통제 곤란.", "chase": "저격, 통신, 정보 담당. 위장 성향 확인.", "hyde": "백병전 담당. 대인 위험 등급 최상."};
  var FR = function (c) { return '<span class="fr" translate="no">' + c.fr + '</span>'; };
  D.chars.forEach(function (c) { c.rows0 = c.rows.slice(0, 3); c.core = OVP[c.id]; c.sub = '소속 MEUTE · ' + c.rows[1][1]; c.rows = c.rows0; c.real = ''; c.fr = ''; c.log = []; });
  function applyOV() { D.chars.forEach(function (c) { var o = OV[c.id]; if (!o) return; c.real = o.real; c.fr = o.fr; c.rows = c.rows0.concat(o.rows); c.log = o.log; }); }
  D.posts.splice(2, 0, ['잡담', '팬텀 신분증 안에 오래된 흑백 사진 있더라. 뒷면 소인이 CHARLEROI', '삭제된 사용자', 0, 0, 3]);
  D.posts.splice(4, 0, ['잡담', '달링 앞으로 온 소포 이름이 왜 다르냐', '취사장', 0, 0, 21]);
  D.posts.splice(7, 0, ['잡담', '체이스 입대 사연 들었냐. 술 걸고 둔 판에 져서 서명했다더라', 'ㅇㅇ', 0, 0, 14]);
  D.posts.splice(6, 0, ['잡담', '하이드 88년생이라던데 진짜냐', 'ㅇㅇ', 0, 0, 9]);
  var ACC = {
    phantom: { k: '소중한 사람의 이름', c: '군 신분증 안쪽, 닳은 흑백 사진. 뒷면에 CHARLEROI 소인. E로 시작한다.' },
    darling: { k: '숨어 살 때 쓰던 이름', c: '메시나에서 도망친 남자는 프랑스식으로 이름을 고쳤다.' },
    chase: { k: '인생을 바꾼 한 판', c: '보드카를 걸고 둔 판에 져서 입대 서명을 했다. 무슨 판이었는지 영어로.' },
    hyde: { k: '자기 자신에 관한 숫자', c: '소중한 사람이 없는 남자는 자기 날짜밖에 모른다.' }
  };
  var CK = null, T = {}, LOCKED = '<p class="sub">등록 인원 전용. 잠김.</p>';
  function mem() { return !!(CK && user && ACC[user.id]); }
  function need() { return '<div class="page"><h2>열람 제한</h2><p class="lead">등록 인원 로그인이 필요한 문서.</p><p><a class="ln" href="#net">사내망 로그인</a></p></div>'; }
  function b64(t) { var b = atob(t), a = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) a[i] = b.charCodeAt(i); return a; }
  function unlock(u, pw) {
    var K = window.__LK, w = K && K.u[u], cs = window.crypto && crypto.subtle; if (!w || !cs) return Promise.resolve(false);
    return cs.importKey('raw', new TextEncoder().encode(nm(pw)), 'PBKDF2', false, ['deriveKey']).then(function (k) {
      return cs.deriveKey({ name: 'PBKDF2', salt: b64(w.s), iterations: K.it, hash: 'SHA-256' }, k, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
    }).then(function (kek) {
      var i = 0; function next() { if (i >= w.w.length) return Promise.resolve(null); var x = w.w[i++]; return cs.decrypt({ name: 'AES-GCM', iv: b64(x[0]) }, kek, b64(x[1])).catch(function () { return next(); }); }
      return next();
    }).then(function (raw) {
      if (!raw) return false; if (CK) return true;
      return cs.importKey('raw', raw, 'AES-GCM', false, ['decrypt']).then(function (ck) { return cs.decrypt({ name: 'AES-GCM', iv: b64(K.d[0]) }, ck, b64(K.d[1])); }).then(function (buf) {
        var J = JSON.parse(new TextDecoder().decode(buf));
        Object.assign(OV, J.OV); Object.assign(MAIL, J.MAIL); Object.assign(RN, J.RN); Object.assign(CS, J.CS); Object.assign(CR, J.CR); Object.assign(XR, J.XR); EG.push.apply(EG, J.EG); Object.assign(T, J.T);
        applyOV(); CK = 1; return true;
      });
    }).catch(function () { return false; });
  }
  function sha256(s){s=unescape(encodeURIComponent(s));var K=[],Hh=[],i,j,p=2,c=0;for(;c<64;p++){for(i=2;i*i<=p;i++)if(p%i===0)break;if(i*i>p){if(c<8)Hh[c]=(Math.pow(p,.5)*4294967296)|0;K[c++]=(Math.pow(p,1/3)*4294967296)|0;}}var w=[],l=s.length*8;s+=String.fromCharCode(128);while(s.length%64!==56)s+=String.fromCharCode(0);for(i=0;i<s.length;i++)w[i>>2]|=s.charCodeAt(i)<<((3-i%4)*8);w.push((l/4294967296)|0);w.push(l|0);for(j=0;j<w.length;j+=16){var a=Hh.slice(0),W=w.slice(j,j+16);for(i=0;i<64;i++){if(i>15){var x=W[i-15],y=W[i-2];W[i]=(((x>>>7|x<<25)^(x>>>18|x<<14)^(x>>>3))+W[i-16]+((y>>>17|y<<15)^(y>>>19|y<<13)^(y>>>10))+W[i-7])|0;}var e=a[4],t1=a[7]+((e>>>6|e<<26)^(e>>>11|e<<21)^(e>>>25|e<<7))+((e&a[5])^(~e&a[6]))+K[i]+W[i],b=a[0],t2=((b>>>2|b<<30)^(b>>>13|b<<19)^(b>>>22|b<<10))+((b&a[1])^(b&a[2])^(a[1]&a[2]));a=[(t1+t2)|0].concat(a);a[4]=(a[4]+t1)|0;a.pop();}for(i=0;i<8;i++)Hh[i]=(Hh[i]+a[i])|0;}var o='';for(i=0;i<8;i++)o+=('00000000'+(Hh[i]>>>0).toString(16)).slice(-8);return o;}
  document.addEventListener('contextmenu', function (e) { if (!(e.target.closest && e.target.closest('input,textarea,[contenteditable]'))) e.preventDefault(); }); document.addEventListener('dragstart', function (e) { if (e.target.tagName === 'IMG' || (e.target.classList && e.target.classList.contains('layer'))) e.preventDefault(); });
  var fails = {};
  var nm = function (t) { return t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').normalize('NFC').trim().toLowerCase(); };
  var ACH = [['login', '신원 도용', '다른 사람 계정으로 로그인'], ['all4', '네 명 전부', '네 계정 모두 로그인'], ['cat', '짬타이거', '투투를 찾는다'], ['sebby', '거기까지 해라', '건드리면 안 되는 이름'], ['pasta', '파스타 참사', '식단을 잘 본다'], ['admin', '없는 부대', '관리자로 들어가 본다'], ['lyric', '수신 기록', '가사를 연다'], ['menu', '내부 사정', '사내망 메뉴를 전부 열람'],
    ['camp', '여기 오는 길', '캠프 시문을 찾는다'], ['campall', '현장 답사', '캠프 시문을 전부 둘러본다'], ['logo', '원점 복귀', '로고를 눌러 돌아온다'], ['f_phantom', '서류상 사망자', '팬텀의 파일을 연다'], ['f_darling', '입만 다정한', '달링의 파일을 연다'], ['f_chase', '여우 굴', '체이스의 파일을 연다'], ['f_hyde', '열지 말았어야', '하이드의 파일을 연다'], ['redact', '먹칠', '가려진 글자를 본다'], ['redact5', '검열 무력화', '가려진 글자를 다섯 군데 본다'], ['guest', '미등록 사용자', '손님으로 접속한다'], ['logout', '흔적 지우기', '로그아웃한다'], ['fail5', '다섯 번의 실패', '암호를 다섯 번 틀린다'], ['clue4', '수사 일지', '네 사람의 단서를 모두 본다'], ['first', '단번에', '틀리지 않고 로그인한다'],
    ['term', '첫 명령', '터미널에 명령을 친다'], ['whoami', '자기 확인', '터미널에게 누구냐고 묻는다'], ['ls', '서랍 뒤지기', '터미널의 파일 목록을 본다'], ['rosterf', '말소 명단', '터미널에서 명단을 연다'], ['sudo', '권한 없음', '터미널에서 권한을 요구한다'], ['clear', '증거 인멸', '터미널 기록을 지운다'], ['badcmd', '타자 미숙', '없는 명령을 세 번 친다'],
    ['pause', '작전 중 정숙', '음악을 끈다'], ['loop', '한 곡 더', '노래를 끝까지 듣는다'], ['lyric5', '애창곡', '가사를 다섯 번 연다'], ['radio10', '귀 기울이기', '무전을 열 줄 듣는다'], ['cipher', '감청', '암호 무전을 듣는다'], ['radioall', '교신 종료', '무전을 끝까지 듣는다'], ['stay10', '10분 잔류', '10분 동안 머문다'], ['stay30', '30분 복무', '30분 동안 머문다'], ['click100', '손가락 혹사', '백 번 클릭한다'], ['night', '야간 근무', '자정부터 새벽 다섯 시 사이에 접속한다'], ['all', '전원 귀환', '다른 업적을 전부 달성한다']];
  try { eggs = JSON.parse(localStorage.getItem('etr-ach')) || {}; } catch (e) {}
  var logs = {}, visited = {};
  function egg(k) { if (eggs[k]) return; eggs[k] = 1; try { localStorage.setItem('etr-ach', JSON.stringify(eggs)); } catch (e) {} var a = ACH.filter(function (x) { return x[0] === k; })[0]; toast(a ? a[1] : k, a ? a[2] : ''); if (window.__sayA) window.__sayA(k); if (k !== 'all' && Object.keys(eggs).length >= ACH.length - 1) egg('all'); }
  window.__egg = egg;
  var CNT = {}; try { CNT = JSON.parse(localStorage.getItem('etr-cnt')) || {}; } catch (e) {}
  function sv() { try { localStorage.setItem('etr-cnt', JSON.stringify(CNT)); } catch (e) {} }
  function cnt(k, n, a) { CNT[k] = (CNT[k] || 0) + 1; sv(); if (CNT[k] >= n) egg(a); }
  window.__cnt = cnt;
  var tq = [], tbusy = false;
  function toast(m, d) { tq.push([m, d, Object.keys(eggs).length]); if (!tbusy) { tbusy = true; setTimeout(nx, 500); } }
  function nx() {
    var a = tq.shift(); if (!a) { tbusy = false; return; }
    var t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
    t.className = ''; t.innerHTML = '<i></i><small>업적 달성<span>' + a[2] + ' / ' + ACH.length + '</span></small><b>' + a[0] + '</b><p>' + a[1] + '</p><i></i>'; void t.offsetWidth; t.className = 'on';
    if (window.__sfx) window.__sfx('ach');
    setTimeout(function () { t.className = 'off'; setTimeout(function () { t.className = ''; nx(); }, 420); }, 3400);
  }
  var big = function (t) { return '<div class="big bigp" data-d="24"><div class="g1" translate="no">' + t + '</div><div class="g2" translate="no">' + t + '</div></div>'; };
  var HOT = ['긴급', '반려', '미제출', '재고 바닥'];
  var tbl = function (h, rows) { var pk = h.indexOf('제목'); if (pk < 0) pk = h.length === 2 ? 1 : (h[0] === '시간' ? -1 : 0); return '<table><thead><tr>' + h.map(function (x) { return '<th>' + x + '</th>'; }).join('') + '</tr></thead><tbody>' + rows.map(function (r) { return '<tr>' + r.map(function (x, i) { return '<td' + (i === pk ? ' class="p"' : '') + '>' + (HOT.indexOf(x) >= 0 ? '<span class="hot">' + x + '</span>' : x) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table>'; };

  var PH = {chase: 'img/chase.webp?v=75', darling: 'img/darling.webp?v=75', hyde: 'img/hyde.webp?v=75', phantom: 'img/phantom.webp?v=75'};
  var PB = { chase: 'img/chase_item.webp?v=81', darling: 'img/darling_item.webp?v=81', hyde: 'img/hyde_item.webp?v=81' };
  var PX = { phantom: [['phantom_past', 'PAST', '과거', 26, 24, 13, 18, 1], ['phantom_off', 'OFF DUTY', '사복', 64, 18, 10, 18, 0]], chase: [['chase_past', 'PAST', '과거', 48, 40, 26, 40, 1], ['chase_off', 'OFF DUTY', '사복', 46, 14, 10, 18, 0]] };
  var GZ = { phantom: [0, 33], chase: [33, 17], darling: [50, 14], hyde: [64, 36] };
  function grpFig() {
    var u = 'img/group.webp?v=76';
    return '<figure class="grp"><img src="' + u + '" alt="MEUTE 단체 사진" draggable="false">' + D.chars.map(function (c) {
      var z = GZ[c.id]; if (!z) return '';
      return '<a class="gh g-' + c.id + '" href="#net/files/' + c.id + '" style="left:' + z[0] + '%;width:' + z[1] + '%"><i style="left:' + (-z[0] / z[1] * 100).toFixed(3) + '%;width:' + (100 / z[1] * 100).toFixed(3) + '%;background-image:url(' + u + ');-webkit-mask-image:linear-gradient(90deg,transparent ' + (z[0] - 4) + '%,#000 ' + (z[0] + 3) + '%,#000 ' + (z[0] + z[1] - 3) + '%,transparent ' + (z[0] + z[1] + 4) + '%);mask-image:linear-gradient(90deg,transparent ' + (z[0] - 4) + '%,#000 ' + (z[0] + 3) + '%,#000 ' + (z[0] + z[1] - 3) + '%,transparent ' + (z[0] + z[1] + 4) + '%)"></i><span><b translate="no">' + c.name + '</b><small>' + c.rows[2][1] + '</small></span></a>';
    }).join('') + '<figcaption translate="no">ÉQUIPE MEUTE</figcaption></figure>';
  }
  function scrib(q) {
    var sd = q[0].length * 977 + q[3] * 131 + 7, R = function () { sd = (sd * 16807) % 2147483647; return sd / 2147483647; };
    var hv = q[7], n = hv ? 52 : 18, out = '';
    for (var v = 0; v < 3; v++) {
      var d = '', px = 0, py = 0;
      for (var i = 0; i < n; i++) {
        var a = R() * 6.283, r = Math.sqrt(R()), x = q[3] + Math.cos(a) * q[5] * r, y = q[4] + Math.sin(a) * q[6] * r * (hv ? 1 : .32);
        if (!i) d = 'M' + x.toFixed(1) + ' ' + y.toFixed(1);
        else d += ' Q' + ((px + x) / 2 + (R() - .5) * q[5] * .9).toFixed(1) + ' ' + ((py + y) / 2 + (R() - .5) * q[6] * (hv ? .9 : .3)).toFixed(1) + ' ' + x.toFixed(1) + ' ' + y.toFixed(1);
        px = x; py = y;
      }
      out += '<path class="b' + v + '" pathLength="1" d="' + d + '"/>';
    }
    return '<svg class="scr ' + (hv ? 'hv' : 'lt') + '" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' + out + '</svg>';
  }
  function pfPhoto(c) { if (!PH[c.id]) return ''; return '<div class="pfx"><b class="pfn" translate="no" aria-hidden="true">' + c.name + '</b><figure class="pf"><img src="' + PH[c.id] + '" alt="" draggable="false"></figure>' + (PB[c.id] ? '<figure class="pb"><img src="' + PB[c.id] + '" alt="" draggable="false"><figcaption><b translate="no">EVIDENCE 01</b><span>소지품</span></figcaption></figure>' : '') + '</div>' + (PX[c.id] ? '<div class="pst"><div class="pfo-b"><span translate="no">DOSSIER</span></div>' + PX[c.id].map(function (q) { return '<figure class="' + (q[7] ? 'past' : 'off') + '"><div class="phw"><img src="img/' + q[0] + '.webp?v=84" alt="" draggable="false">' + (user && user.id === c.id ? '' : scrib(q)) + '</div><figcaption><b translate="no">' + q[1] + '</b><span>' + q[2] + '</span></figcaption></figure>'; }).join('') + '<div class="pfo-f"><b translate="no">CONFIDENTIEL</b><span>Ⅱ급 비밀 · 사진 2매 · 열람 제한</span><em>기밀</em></div></div>' : ''); }
  V.people = function (id) {
    if (!mem()) return need();
    var c = D.chars.filter(function (x) { return x.id === id; })[0];
    if (!c) return '<div class="page"><h2>인물</h2><div class="plist">' + D.chars.map(function (x) { return '<a href="#people/' + x.id + '"><b translate="no">' + x.name + '</b><span>' + x.core + '</span></a>'; }).join('') + '</div></div>';
    var log = c.log.map(function (l) { return '<li>' + (l[1] ? '<span class="rd" tabindex="0">' + l[0] + '</span>' : l[0]) + '</li>'; }).join('');
    var rows = c.rows.map(function (r) { return '<div class="r"><span>' + r[0] + '</span><p>' + r[1] + '</p></div>'; }).join('');
    return '<div class="page"><div class="file"><div>' + pfPhoto(c) + '<div class="tag">Ⅱ급 비밀 · ' + c.status.replace('RECORD : ', '').replace('DEAD (UK)', '영국에서 사망 처리').replace('DELETED ×2', '두 번 말소') + '</div><h2>' + c.ko + '</h2><p class="core">' + c.core + '</p><p class="sub">' + c.sub + '</p><ul class="log">' + log + '</ul></div><div><div class="r"><span>본명</span><p><span class="rd" tabindex="0">' + c.real + '</span></p></div><div class="r"><span>등록명</span><p>' + FR(c) + '</p></div><div class="r"><span>콜사인</span><p translate="no">' + c.name + '</p></div><div class="r"><span>생년월일</span><p>' + c.born + '</p></div><div class="r"><span>연령</span><p>' + c.age + '세</p></div><div class="r"><span>인성 검사</span><p>' + c.mbti.split(' ')[0] + '</p></div>' + rows + '</div></div><div class="pnav">' + D.chars.map(function (x) { return '<a href="#people/' + x.id + '" class="' + (x.id === id ? 'on' : '') + '" translate="no">' + x.name + '</a>'; }).join('') + '</div></div>';
  };
  V.relation = function () {
    if (!mem()) return need();
    var r = D.chars.map(function (a) { return ['<b translate="no" class="cs">' + a.name + '</b>'].concat(D.chars.map(function (b) { return a.id === b.id ? '' : D.rel[a.id + '>' + b.id]; })); });
    return '<div class="page"><h2>관계</h2><p class="lead">쫓겨난 사유와 약점을 서로 다 안다. 과거를 묻지 않는 곳에서 유일한 예외다.</p>' + tbl(['보는 쪽'].concat(D.chars.map(function (c) { return '<span translate="no" class="cs">' + c.name + '</span>'; })), r) + '</div>';
  };
  V.field = function () {
    if (!mem()) return need();
    return '<div class="page"><h2>현장</h2><div class="cols"><section><h3>PNE</h3><p>정부가 공식 부인하는 부대. 편제에도, 훈장에도, 기록에도, 사망자 명단에도 없다. 입대로 한 번, 차출로 또 한 번 지워진 인간들.</p><div class="r"><span>편제</span><p>4인조 × 4 + 지휘 요소</p></div><div class="r"><span>계급</span><p>서류에만 있고, 현장에서는 오래 산 놈이 위</p></div><div class="r"><span>무전</span><p>NATO 음성 알파벳</p></div><div class="r"><span>관례</span><p>과거는 묻지 않는다</p></div></section><section><h3>MEUTE</h3><p>기지에서 가장 위험한 놈들을 모은 조. 공식은 차출, 실질은 징계. 윗선은 죽기를 바라며 사지로 보내지만 살아서 돌아온다.</p><div class="r"><span>임무</span><p>추격 · 제거, 감시, 심문, 회수 · 호송, 은폐, 미끼</p></div></section><section><h3>구역</h3><p>막사, 무기고, 정비고, 의무대, 취사장, 통신실, 초소, 지휘소, 영창.</p><p>마을에는 오아시스와 국경 시장. 무장세력 영향권. 해가 지면 시장은 닫힌다.</p></section></div></div>';
  };

  var MAIL = { guest: [['시스템', '손님 계정 메일 수신 불가']] };
  function strip(s, h2) { s = s.replace('<div class="page">', '').replace(/<\/div>$/, '').replace(/#people\//g, '#net/files/'); return h2 ? s : s.replace(/<h2>[^<]*<\/h2>/, ''); }
  var relCur = 'phantom', RN = {};
  function relMapIn() { return D.chars.map(function (c) { return '<button class="rlt' + (c.id === relCur ? ' on' : '') + '" data-c="' + c.id + '" translate="no">' + c.name + '</button>'; }).join(''); }
  var RLP = [[22, 50], [60, 17], [85, 47], [63, 83]], RLR = [-3, 2.5, -1.5, 3];
  function relOthers() { return D.chars.filter(function (c) { return c.id !== relCur; }); }
  function relPos() { var o = {}, n = 1; D.chars.forEach(function (c) { o[c.id] = c.id === relCur ? RLP[0] : RLP[n++]; }); return o; }
  function relLines() { var P = relPos(), num = {}, L = '', B = ''; relOthers().forEach(function (c, n) { num[c.id] = n + 1; });
    for (var a = 0; a < D.chars.length; a++) for (var b = a + 1; b < D.chars.length; b++) { var x = D.chars[a].id, y = D.chars[b].id, p = P[x], q = P[y], on = x === relCur || y === relCur, ix = on ? num[x === relCur ? y : x] : 0;
      L += '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" data-a="' + x + '" data-b="' + y + '" class="' + (on ? 'on' : 'off') + '"' + (on ? ' data-i="' + ix + '"' : '') + '/>';
      if (on) B += '<span class="rlb" data-i="' + ix + '" data-t="' + (RN[relCur + '>' + (x === relCur ? y : x)] || '').split('.')[0] + '." style="left:' + (p[0] + q[0]) / 2 + '%;top:' + (p[1] + q[1]) / 2 + '%">' + ix + '</span>'; }
    return '<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">' + L + '</svg>' + B; }
  function relNodes() { var P = relPos(); return D.chars.map(function (c, n) { var q = P[c.id]; return '<button class="rln' + (c.id === relCur ? ' on' : '') + '" data-c="' + c.id + '" style="left:' + q[0] + '%;top:' + q[1] + '%;--r:' + RLR[n] + 'deg">' + (PH[c.id] ? '<span class="rlph rlpic" style="background-image:url(' + PH[c.id] + ')"></span>' : '<span class="rlph"><svg viewBox="0 0 40 50" aria-hidden="true"><circle cx="20" cy="18" r="9"/><path d="M3 50c1-12 8-18 17-18s16 6 17 18z"/></svg></span>') + '<b translate="no">' + c.name + '</b></button>'; }).join(''); }
  function relList() { return relOthers().map(function (c, n) { return '<li data-i="' + (n + 1) + '"><div class="rlnm"><span class="rlnum">' + (n + 1) + '</span><button class="rlj" data-c="' + c.id + '" translate="no">' + c.name + '</button></div><dl>'
    + '<dt translate="no">' + relMe().name + ' → ' + c.name + '</dt><dd>' + RN[relCur + '>' + c.id] + '</dd>'
    + '<dt class="rv" translate="no">' + c.name + ' → ' + relMe().name + '</dt><dd class="rv">' + RN[c.id + '>' + relCur] + '</dd></dl></li>'; }).join(''); }
  function relMe() { return D.chars.filter(function (c) { return c.id === relCur; })[0]; }
  function relDraw() { var ch = document.getElementById('rlch'); if (!ch) return; var w = ch.clientWidth, h = ch.clientHeight; ch.classList.remove('sw'); void ch.offsetWidth; ch.classList.add('sw'); [].forEach.call(ch.querySelectorAll('#rlsv line.on'), function (l) { var len = Math.hypot((l.x2.baseVal.value - l.x1.baseVal.value) * w / 100, (l.y2.baseVal.value - l.y1.baseVal.value) * h / 100); l.style.transition = 'none'; l.style.strokeDasharray = len; l.style.strokeDashoffset = len; l.getBoundingClientRect(); l.style.transition = 'stroke-dashoffset .8s cubic-bezier(.65,0,.25,1) .45s'; l.style.strokeDashoffset = 0; }); }
  function relInner() { setTimeout(relDraw, 40); return '<div class="rlsh"><div class="rlcls">Ⅱ급 비밀</div><header class="rlhd"><span>문서 번호 MEUTE-REL</span><b>인원 상호 평정 기록</b><span>평정 기준 <i id="rlme" translate="no">' + relMe().name + '</i></span></header>'
    + '<div class="rlch" id="rlch"><div id="rlsv" data-me="' + relMe().name + '">' + relLines() + '</div>' + relNodes() + '</div><ol class="rlli" id="rlls">' + relList() + '</ol>'
    + '<footer class="rlft">작성 지휘소 · 조 외 배포 금지</footer><span class="rlstamp">대외비</span><div class="rlcls b">Ⅱ급 비밀</div></div>'; }
  function relGo(id) { if (!id || id === relCur || !document.getElementById('rlch')) return; relCur = id; $('#rlm').innerHTML = relMapIn(); var P = relPos();
    document.querySelectorAll('.rln').forEach(function (b) { var q = P[b.dataset.c]; b.style.left = q[0] + '%'; b.style.top = q[1] + '%'; b.classList.toggle('on', b.dataset.c === relCur); });
    $('#rlsv').setAttribute('data-me', relMe().name); $('#rlsv').innerHTML = relLines(); $('#rlls').innerHTML = relList(); $('#rlme').textContent = relMe().name; relDraw(); }
  var S = {
    ach: ['업적', function () { return '<p class="sub">' + Object.keys(eggs).length + ' / ' + ACH.length + ' 달성</p><div class="ach">' + ACH.map(function (a) { var on = eggs[a[0]]; return '<div class="' + (on ? 'on' : '') + '">' + (on ? a[1] : '잠긴 업적') + '<span>' + (on ? a[2] + '<em>달성</em>' : '조건 비공개') + '</span></div>'; }).join('') + '</div>'; }],
    rel: ['인원 관계', function () { if (D.chars.some(function (c) { return c.id === user.id; })) relCur = user.id; return '<div class="rlh"><p class="rll">조 내 결속 <i>불량</i></p><span class="rls">대외비</span></div><p class="rlp">각 인원은 타 인원의 전출 사유 및 신상 약점을 상호 인지함. 과거 불문 원칙의 유일한 예외.</p><p class="rlp">임무 외 협조 사례 없음. 비번 시 행적 상호 미보고.</p><div class="rlf"><div class="rltabs" id="rlm">' + relMapIn() + '</div><div id="rlb" class="rlpaper">' + relInner() + '</div></div>'; }],
    dash: ['현황', function () {
      var me = D.chars.filter(function (c) { return c.id === user.id; })[0];
      return '<div class="dash"><section><h3>담당 임무</h3><p>' + (me ? me.rows[2][1] : '미배정') + '</p></section><section><h3>오늘의 일정</h3><p>06:00 정찰 출발</p><p>12:00 물 배급</p><p>일몰 마을 시장 폐쇄</p></section><section><h3>공지</h3><p><a class="ln" href="#net/notice">외부 접속 감지. 통신실은 확인 바람</a></p></section><section><h3>메일</h3>' + (MAIL[user.id] || MAIL.guest).map(function (m) { return '<p><span class="sub">' + m[0] + '</span> ' + m[1] + '</p>'; }).join('') + '</section></div>';
    }],
    calendar: ['일정표', function () { return tbl(['날짜', '내용'], [['다음 보급일', '미정(지연 중)'], ['이번 주', '정찰 2회, 호송 1회'], ['9월 22일', 'HYDE 생일. 부대 행사 없음'], ['철수일', '<span class="rd" tabindex="0">열람 권한 없음</span>']]); }],
    map: ['시설 안내도', function () { return tbl(['구역', '안내'], [['막사', '컨테이너'], ['무기고 · 정비고', '출입 기록 필수'], ['의무대', '진통제 재고 부족'], ['취사장', '천막'], ['통신실', '외부 접속 감지 중'], ['초소', '근무표 참조'], ['지휘소', '인가자 외 출입 금지'], ['영창', '달링 전용석 있음']]); }],
    manual: ['임무 규정', function () { return tbl(['항목', '규정'], [['호출', 'NATO 음성 알파벳을 사용한다'], ['이름', '콜사인만 사용한다'], ['과거', '묻지 않는다'], ['미끼 임무', '거부할 수 없다']]); }],
    notice: ['공지', function () { return tbl(['구분', '제목', '작성', '시각'], [['긴급', '외부 접속 감지. 통신실은 확인 바람', '지휘소', (function () { try { var g = localStorage.getItem('etr-gt'); if (/^[0-2][0-9]:[0-5][0-9]$/.test(g || '')) return g; } catch (x) {} return (user && user.t) || '05:12'; })()], ['보급', '금주 식수는 계량 배급함. 각자 수통 지참 바람', '취사장', '04:58'], ['일반', '일몰 후 마을 시장 출입을 금함. 준수할 것', '지휘소', '어제']]); }],
    mail: ['메일', function () { return tbl(['보낸 곳', '제목'], MAIL[user.id] || MAIL.guest); }],
    chat: ['메신저', function () { return ''; }],
    inner: ['대원 전용 게시판', function () { return T.inner ? tbl(T.inner[0], T.inner[1]) : LOCKED; }],
    files: ['개인파일 열람', function (sub) { if (sub) return strip(V.people(sub), true); return tbl(['콜사인', '계급', '상태', '열람'], D.chars.map(function (c) { return ['<span class="cs" translate="no">' + c.name + '</span>', c.rows[1][1], user.id === c.id ? '본인' : '기록 말소', '<a class="ln" href="#net/files/' + c.id + '">열람</a>']; })); }],
    board: ['게시판', function () { return tbl(['말머리', '제목', '작성', '추천'], D.posts.map(function (p) { return [p[0], p[1], p[2], p[5]]; })); }],
    approval: ['전자결재', function () { return T.approval ? tbl(T.approval[0], T.approval[1]) : LOCKED; }],
    leave: ['휴가 · 외출', function () { return tbl(['신청자', '구분', '결과'], [['DARLING', '마을 외출', '반려'], ['HYDE', '마을 외출', '반려'], ['CHASE', '휴가', '해당 없음(기록 없는 인원)']]); }],
    duty: ['근무표', function () { return tbl(['시간', '초소', '통신실', '영창 감시'], [['00–06', 'PHANTOM', 'CHASE', 'HYDE'], ['06–12', 'DARLING', 'CHASE', 'PHANTOM'], ['12–18', 'HYDE', 'DARLING', 'CHASE']]); }],
    meal: ['식단', function () { return tbl(['끼니', '메뉴'], [['아침', '건빵, 물 1컵'], ['점심', '<button class="ln" id="pasta">파스타</button>'], ['저녁', '통조림, 물 1컵']]); }],
    supply: ['보급 신청', function () { return tbl(['품목', '신청', '지급'], [['소포', 'Cesar J. 앞', '취사장 보관 중'], ['물', '전원', '배급 감소'], ['진통제', '의무대', '재고 바닥'], ['단것', '<span class="rd" tabindex="0">PHANTOM</span>', '지급 안 됨']]); }],
    medical: ['의무대', function () { return T.medical ? tbl(T.medical[0], T.medical[1]) : LOCKED; }],
    phone: ['전화번호부', function () { return tbl(['부서', '내선'], [['지휘소', '101'], ['통신실', '203'], ['의무대', '305'], ['영창', '없음']]); }],
    docs: ['규정 · 자료실', function () { return tbl(['문서', '비고'], [['Charleroi 교구 회신', '1992년 사망자 명부 조회 결과 Elise Hartley 1건. 요청자 미상'], ['과거 불문 원칙', '관례로 한다'], ['콜사인 부여 규정', '부여된 콜사인은 거부할 수 없다'], ['철수 계획', '<span class="rd" tabindex="0">열람 권한 없음</span>']]); }],
    petition: ['소원수리', function () { return '<p class="sub">마음의 소리를 남기는 곳입니다. 익명은 보장되지 않습니다.</p>' + tbl(['제목', '처리'], [['보드카 내기 chess판을 돌려주십시오', '접수'], ['체이스만 이겨서 불공평하다고 생각합니다!', '반려'], ['투투 밥 양에 대해 건의합니다', '접수'], ['달링을 다른 조로 보내 주시기 바랍니다', '반려'], ['달링을 다른 조로 보내 주시기 바랍니다', '반려']]); }],
    term: ['터미널', function () { return '<pre id="tout">명령어 목록은 help</pre><form id="tf"><span>&gt;</span><input id="ti" autocomplete="off" aria-label="명령 입력"></form>'; }]
  };
  var AG = [['ACCESS', '침입', ['login', 'all4', 'first', 'guest', 'logout', 'admin', 'fail5', 'clue4']], ['FILES', '열람', ['menu', 'camp', 'campall', 'f_phantom', 'f_darling', 'f_chase', 'f_hyde', 'redact', 'redact5', 'logo']], ['TERMINAL', '단말', ['term', 'whoami', 'ls', 'rosterf', 'sudo', 'clear', 'badcmd', 'sebby', 'cat']], ['SERVICE', '복무', ['lyric', 'lyric5', 'pause', 'loop', 'radio10', 'cipher', 'radioall', 'stay10', 'stay30', 'click100', 'night', 'pasta', 'all']]];
  V.ach = function () {
    var by = {}; ACH.forEach(function (a) { by[a[0]] = a; });
    var n = ACH.filter(function (a) { return eggs[a[0]]; }).length, T = ACH.length, back = location.hash.indexOf('#net') === 0 ? '#net' : '#home';
    return '<div class="page net am"><section><a class="back" href="' + back + '">뒤로</a><div class="amh"><div><h2 class="en" translate="no">ACHIEVEMENT</h2><p class="cko">훈장 대신 남는 기록</p></div><p class="amc"><b>' + n + '</b><span>/ ' + T + '</span></p></div><div class="amb"><i style="width:' + (n / T * 100) + '%"></i></div>' + AG.map(function (g) {
      var d = g[2].filter(function (k) { return eggs[k]; }).length;
      return '<div class="ag"><div class="agl"><b translate="no">' + g[0] + '</b><small>' + g[1] + ' ' + d + ' / ' + g[2].length + '</small></div><div class="agi">' + g[2].map(function (k) { var a = by[k]; return eggs[k] ? '<div class="ai on"><b>' + a[1] + '</b><span>' + a[2] + '</span></div>' : '<div class="ai"><i style="width:' + Math.min(100, a[1].length * 24 + 24) + 'px"></i><span>기록 말소</span></div>'; }).join('') + '</div></div>';
    }).join('') + '</section></div>';
  };
  var GLOCK = { inner: 1, medical: 1, approval: 1, rel: 1 }, chatCur = 'meute', CM = {}, CP = {};
  var CS = {
    meute: [['PHANTOM', '선두 진입. 모래 밑에 탄피.', '05:12'], ['DARLING', '탄피? 어제 내 파스타보다 적네.', '05:13'], ['CHASE', '퇴로 하나 비었다. 왜 비었는지 알아?', '05:15'], ['HYDE', '알아. 재밌잖아.', '05:16'], ['PHANTOM', '입 닫고 따라와.', '05:16']]
  };
  var CR = {};
  var XR = {};
  var EG = [];
  function ckey(id) { return user.id + '/' + id; }
  function xr(id) { return (XR[user.id] || []).filter(function (r) { return r.id === id; })[0]; }
  function cmsg(id) { var k = ckey(id), x = xr(id); if (!CM[k]) CM[k] = (id === 'meute' ? CS.meute : x ? x.m : CS[[user.id, id].sort().join('-')]).map(function (m) { return { w: m[0], t: m[1], h: m[2] }; }); return CM[k]; }
  function rooms() { var r = [{ id: 'meute', n: 'ÉQUIPE MEUTE', s: 'CH.03 단체방' }]; if (user.id !== 'guest') { D.chars.forEach(function (c) { if (c.id !== user.id) r.push({ id: c.id, n: c.name, s: '1:1' }); }); r = r.concat(XR[user.id] || []); } return r; }
  function isMe(w) { return w === 'ME' || w === user.id.toUpperCase(); }
  function esc(t) { return t.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function chatInner() {
    var rs = rooms(), cur = rs.filter(function (r) { return r.id === chatCur; })[0] || rs[0], list = cmsg(cur.id), html = '', prev = null;
    chatCur = cur.id;
    list.forEach(function (m, i) {
      var me = isMe(m.w), nx = list[i + 1];
      if (!me && cur.id === 'meute' && prev !== m.w) html += '<div class="bn" translate="no">' + m.w + '</div>';
      html += '<div class="b' + (me ? ' me' : '') + '">' + esc(m.t) + '</div>';
      if (!nx || nx.w !== m.w) html += '<div class="bt' + (me ? ' me' : '') + '">' + m.h + '</div>';
      prev = m.w;
    });
    return '<div class="ml">' + rs.map(function (r) { var l = cmsg(r.id), z = l[l.length - 1]; return '<button class="mr' + (r.id === cur.id ? ' on' : '') + '" data-r="' + r.id + '"><b translate="no">' + r.n + '</b><time>' + z.h + '</time><span>' + esc(z.t) + '</span></button>'; }).join('') + '</div><div class="mt"><div class="mth"><b translate="no">' + cur.n + '</b><span>' + cur.s + '</span></div><div class="mb" id="mb">' + html + '</div><form id="mf" class="mc"><input id="mi" autocomplete="off" aria-label="메시지 입력" placeholder="' + (user.id === 'guest' ? '외부 접속자 메시지 전송 불가' : '메시지 입력') + '"' + (user.id === 'guest' ? ' disabled' : '') + '><button class="mbt"' + (user.id === 'guest' ? ' disabled' : '') + '>전송</button></form></div>';
  }
  function chatDraw() { var m = $('.msg'); if (!m) return; m.innerHTML = chatInner(); var b = $('#mb'); b.scrollTop = b.scrollHeight; }
  function chatPage(EN, who) { setTimeout(chatDraw, 0); return '<div class="page net msgp"><section><div class="mh"><a class="back" href="#net">뒤로</a><h2 class="en" translate="no">' + EN.chat + '</h2>' + who + '</div><div class="msg"></div></section></div>'; }
  function nowT() { var d = new Date(); return ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); }
  function chatSend(t) {
    var id = chatCur, l = cmsg(id), x = xr(id), who, r, low = nm(t), k, eg = EG.filter(function (e) { return e[0].some(function (w) { return low.indexOf(w) >= 0; }); })[0];
    l.push({ w: 'ME', t: t, h: nowT() }); chatDraw();
    if (eg && eg[1].toLowerCase() !== user.id && (id === 'meute' || id === eg[1].toLowerCase())) { who = eg[1]; r = eg[2]; }
    else {
      if (x) { if (!x.r.length) return; who = x.n; k = ckey(id); if (!CP[k]) CP[k] = x.r.slice().sort(function () { return Math.random() - .5; }); }
      else { if (id === 'meute') { var o = D.chars.filter(function (c) { return c.id !== user.id; }); who = o[Math.floor(Math.random() * o.length)].name; } else who = D.chars.filter(function (c) { return c.id === id; })[0].name; k = ckey(id) + who; if (!CP[k]) CP[k] = CR[who].slice().sort(function () { return Math.random() - .5; }); }
      if (!CP[k].length) return;
      r = CP[k].pop();
    }
    setTimeout(function () { var b = $('#mb'); if (b && chatCur === id) { b.insertAdjacentHTML('beforeend', '<div class="b ty"><i></i><i></i><i></i></div>'); b.scrollTop = b.scrollHeight; } }, 500);
    setTimeout(function () { l.push({ w: who, t: r, h: nowT() }); if (chatCur === id) chatDraw(); if (window.__sfx && $('#mb')) window.__sfx('msg'); }, 1500 + Math.random() * 900);
  }
  V.net = function (sec, sub) {
    if (sec === 'ach') { visited.ach = 1; return V.ach(); }
    if (!user) return '<div class="page login"><h2>사내망 로그인</h2><form id="lf"><label>콜사인<input id="u" autocomplete="off"></label><label>암호<span class="pwf"><input id="p" type="password" autocomplete="off"><button type="button" id="pe" aria-label="암호 보기"><svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true"><path d="M1 7s3.4-6 9-6 9 6 9 6-3.4 6-9 6-9-6-9-6z"/><circle cx="10" cy="7" r="2.6"/><path class="sl" d="M3 13L17 1"/></svg></button></span></label><p id="ph" class="ph"></p><p id="le" class="sub"></p><div id="clue"></div><button class="pri">접속</button></form><button id="gs" class="ln">손님으로 접속</button></div>';
    var cur = S[sec] ? sec : 'dash';
    var G = [['', ['dash']], ['소통', ['notice', 'mail', 'chat', 'board', 'inner', 'petition']], ['업무', ['calendar', 'approval', 'duty', 'leave', 'supply', 'meal']], ['인사 · 부대', ['files', 'rel', 'medical', 'map', 'manual', 'phone', 'docs']], ['기타', ['ach', 'term']]];
    if (S[sec]) { visited[sec] = 1; if (Object.keys(visited).length >= Object.keys(S).length - 1) egg('menu'); }
    var who = '<p class="sub">접속 계정: <span translate="no">' + (user.name || user.id.toUpperCase()) + '</span></p>';
    var EN = { dash: 'STATUS', notice: 'NOTICE', mail: 'MAIL', chat: 'MESSENGER', board: 'BOARD', petition: 'PETITION', calendar: 'SCHEDULE', approval: 'APPROVAL', duty: 'DUTY ROSTER', leave: 'LEAVE', supply: 'SUPPLY', files: 'PERSONNEL', rel: 'RELATIONS', medical: 'MEDICAL', map: 'FACILITY', manual: 'ORDERS', phone: 'DIRECTORY', docs: 'ARCHIVE', ach: 'ACHIEVEMENT', term: 'TERMINAL', meal: 'MESS', inner: 'CLASSIFIED' };
    var GN = { '소통': 'COMMS', '업무': 'DUTY', '인사 · 부대': 'ROSTER', '기타': 'ETC' };
    if (!S[sec]) {
      var gs = G.filter(function (g) { return g[0]; });
      return '<div class="page net"><section><a class="back" href="#home">뒤로</a><div class="mtop">' + who + '<a class="ln" href="#net/dash">현황 보기</a></div><div class="mg"><div class="mgl">' + gs.map(function (g, i) { return '<button class="mgb' + (i ? '' : ' on') + '" data-g="' + i + '"><b translate="no">' + GN[g[0]] + '</b><small>' + g[0] + '</small></button>'; }).join('') + '</div><div class="mgr">' + gs.map(function (g, i) { return '<div class="mgp"' + (i ? ' hidden' : '') + ' data-p="' + i + '">' + g[1].map(function (k) { return '<a href="#net/' + k + '">' + S[k][0] + (user.id === 'guest' && GLOCK[k] ? '<small>등록 인원 전용</small>' : '') + '</a>'; }).join('') + '</div>'; }).join('') + '</div></div></section></div>';
    }
    if (user.id === 'guest' && (GLOCK[cur] || (cur === 'files' && sub))) return '<div class="page net"><section><a class="back" href="#net">뒤로</a><h2 class="en" translate="no">' + EN[cur] + '</h2><p class="sub">' + S[cur][0] + '</p>' + who + '<div class="lock">' + [64, 82, 48, 74, 58].map(function (w) { return '<div class="r"><span><i></i></span><p><i style="width:' + w + '%"></i></p></div>'; }).join('') + '</div><p class="lockm">등록 인원만 열람 가능.</p></section></div>';
    if (cur === 'chat') return chatPage(EN, who);
    return '<div class="page net"><section><a class="back" href="#net' + (sub ? '/' + cur : '') + '">뒤로</a><h2 class="en" translate="no">' + EN[cur] + '</h2><p class="sub">' + S[cur][0] + '</p>' + who + S[cur][1](sub) + '</section></div>';
  };

  var CT = [['', 'CAMP SIMOUN'], ['pne', 'PNE'], ['meute', 'MEUTE'], ['map', 'FACILITY']];
  var rw = function (x) { return '<div class="r"><span>' + x[0] + '</span><p>' + x[1] + '</p></div>'; };
  var PINS = [
    [51, 40, 'Baraquements', '컨테이너 막사'], [31.5, 38.5, 'Cuisine', '취사장', 1], [52, 16, 'Armurerie', '무기고'], [73, 40, 'Atelier', '정비고'], [64, 29, 'Transmissions', '통신실', 1],
    [21, 52, 'Poste de commandement', '지휘소', 0], [64.5, 60, 'Infirmerie', '의무대'], [84, 58, 'Cellules', '영창'], [46, 81, 'Poste de garde', '초소'], [41.5, 71, 'Chez Toutou', '투투의 집', 1],
    [10, 77, 'Piste nomade', '유목민로'], [80, 27, 'Route de contrebande', '밀수로', 1], [90, 13, 'Oasis · Marché frontalier', '오아시스 마을 · 국경 시장', 1]
  ];
  var CD = {
    '': { en: 'CAMP SIMOUN', ko: '캠프 시문', v: '좌표는 <i>없다</i>', vs: '사막 접경 전진기지',
      b: ['컨테이너 막사, 위장망, 급조 방어선으로 구성된 전선 중계 거점. 유목민 경로와 밀수로의 교차 지점으로 국경 통제 불가.', '본국군 철수 완료. PNE는 미승인 상태로 잔류.'],
      f: [['위치', '좌표 비공개'], ['역할', '전선 중계점'], ['보급', '비정기. 승인자 불명'], ['주변', '반경 안에 무장세력 상주'], ['출동', '72시간 안 복귀 보장 없음']],
      x: function () {
        var h = function (t, b) { return '<section><h3>' + t + '</h3>' + b + '</section>'; };
        return '<div class="cols">' + h('지휘관 인사말', '<p><span class="rd" tabindex="0">지휘관은 서류상 다른 부대 소속.</span></p><p>부대 명의 인사말 없음.</p>') + h('부대 연혁', '<div class="r"><span>창설</span><p>기록 없음</p></div><div class="r"><span>훈장</span><p>없음</p></div><div class="r"><span>사망자</span><p>명단 없음</p></div>') + h('부대 안내', '<p>위치: 공식 지도 미표기</p><p>대표 전화: 없음</p><p>민원: 미접수</p><p>부대가: <button class="ln" onclick="document.getElementById(\'lyb\').click()">FRONTLINE 가사 보기</button></p>') + '</div>' + '<div class="tt"><div><h3><b translate="no">TOUTOU</b><span>부대 마스코트 투투</span></h3><p>샴 짬타이거 투투.</p></div><div class="ttp"><figure><img src="img/toutou1.webp?v=84" alt="투투" draggable="false"><figcaption translate="no">TOUTOU 01</figcaption></figure><figure><img src="img/toutou2.webp?v=84" alt="투투" draggable="false"><figcaption translate="no">TOUTOU 02</figcaption></figure></div></div>';
      } },
    pne: { en: 'PNE', ko: 'Peloton de Neutralisation Étrangère', v: '두 번 <i>지워진</i> 인간들', vs: '피네',
      b: ['정부 공식 미승인 부대. 편제, 서훈, 기록, 전사자 명단 미등재.', '입대 시 1회, 차출 시 1회, 총 2회 기록 말소.'],
      f: [['차출', '기준 비공개. 통보 당일 전속, 기록 없음'], ['편제', '4인조 × 4 + 지휘 요소'], ['조', '대개 고정. 조 간 마찰 상시'], ['계급', '서류상으로만 존재. 현장 서열은 생존 기간순'], ['콜사인', '차출 때 부여. 거부 불가'], ['무전', 'NATO 음성 알파벳'], ['지휘관', '본국 장교. 서류상 타 부대 소속. 현장 방문 드묾'], ['관례', '과거 불문']] },
    meute: { en: 'MEUTE', ko: '특별 편성 조', v: '<i>버리는</i> 조', vs: '뫼트',
      b: ['정규 중대 전출자로 편성. 전출 사유는 여성 문제, 명령 불복종, 사고. 공식 사유 차출, 실질 징계 조치. 복무 종료 조건은 사망 또는 형기 만료.', '전투 능력 최상위, 지휘 통제 불가. 고위험 임무 반복 투입 후 전원 생환. PNE 내 최장기 복무 조.'],
      f: [['임무', '추격 · 제거, 감시, 심문, 회수 · 호송, 은폐, 미끼'], ['운용', '소모성 임무 및 미끼 임무 우선 투입'], ['상부', '조 전원 상부 불신. 감시 대상']],
      x: function () { return grpFig() + '<div class="croster">' + D.chars.map(function (c) { return '<a href="#net/files/' + c.id + '"><b translate="no">' + c.name + '</b><span>' + c.rows[2][1] + '</span><small>' + c.core + '</small></a>'; }).join('') + '</div>'; } },
    map: { en: 'FACILITY', ko: '시설 안내', v: '공식 지도에 <i>없음</i>', vs: '캠프 시문 배치',
      b: ['인근 마을에 오아시스 및 국경 시장 소재. 무장세력 영향권. 일몰 후 시장 폐쇄.'],
      f: [['막사', '컨테이너'], ['무기고 · 정비고', '출입 기록 필수'], ['의무대', '진통제 재고 부족'], ['취사장', '천막'], ['통신실', '외부 접속 감지 중'], ['초소', '근무표 참조'], ['지휘소', '인가자 외 출입 금지'], ['영창', '상습 입실자 DARLING 지정석']], two: 1,
      top: '<figure class="cmw"><img class="cmap" src="bg/map.jpg" alt="캠프 시문 전경" onerror="this.parentNode.remove()">' + PINS.map(function (q, n) { return '<div class="pin' + (q[4] ? ' l' : '') + '" style="left:' + q[0] + '%;top:' + q[1] + '%;animation-delay:' + (420 + n * 45) + 'ms"><i></i><u></u><span><b translate="no">' + q[2] + '</b><small>' + q[3] + '</small></span></div>'; }).join('') + '</figure>' }
  };
  V.camp = function (sec) {
    var k = CD[sec] ? sec : '', d = CD[k];
    return '<div class="page camp"><section><nav class="ctab" aria-label="캠프 시문 메뉴">' + CT.map(function (t) { return '<a translate="no" class="' + (t[0] === k ? 'on' : '') + '" href="#camp' + (t[0] ? '/' + t[0] : '') + '">' + t[1] + '</a>'; }).join('') + '</nav><div class="cg"><div><h2 class="en" translate="no">' + d.en + '</h2><p class="cko">' + d.ko + '</p>' + (d.top || '') + '<div class="cb">' + d.b.map(function (x) { return '<p>' + x + '</p>'; }).join('') + '</div><div class="cf' + (d.two ? ' two' : '') + '">' + d.f.map(rw).join('') + '</div></div><aside class="cv"><b>' + d.v + '</b><span>' + d.vs + '</span></aside></div>' + (d.x ? d.x() : '') + '</section></div>';
  };
  V.me = function () {
    if (!user) return V.net();
    var c = D.chars.filter(function (x) { return x.id === user.id; })[0];
    if (!c) return '<div class="page"><h2>내 정보</h2><div class="r"><span>계정</span><p translate="no">' + user.name + '</p></div><div class="r"><span>권한</span><p>손님. 미등록 사용자</p></div></div>';
    var r = function (a, b) { return '<div class="r"><span>' + a + '</span><p>' + b + '</p></div>'; };
    return '<div class="page"><h2>내 정보</h2>' + strip(V.people(c.id), true) + '<div class="file mest"><div>' + r('휴가', '잔여 0일') + r('포상', '없음') + r('기록', '말소') + r('최근 접속', '지금 · 통신실 중계기') + r('암호 변경', '미지원') + '</div></div></div>';
  };
  function auth() { var a = $('#auth'); if (a) a.textContent = user ? '로그아웃' : '로그인'; document.documentElement.classList.toggle('clr', !!user && user.id !== 'guest'); }
  auth();
  var SAY = { dash: ['PHANTOM', '현황 확인. 이상 없음.'], notice: ['PHANTOM', '공지 읽지 마. 어차피 우리 얘기 없다.'], mail: ['CHASE', '남의 메일함 보는 거, 기록 남아.'], chat: ['DARLING', '누구야? 우리 대화 훔쳐보는 거.'], board: ['DARLING', '게시판에 내 얘기 있냐?'], petition: ['HYDE', '소원수리라. 재밌네.'], calendar: ['PHANTOM', '다음 보급일은 아무도 몰라.'], approval: ['DARLING', '또 반려야?'], duty: ['PHANTOM', '근무 바꿔 달라고 하지 마.'], leave: ['HYDE', '휴가? 여기서?'], supply: ['CHASE', '진통제 바닥이다.'], files: ['CHASE', '그 파일, 왜 열어?'], rel: ['HYDE', '우리 사이? 궁금해?'], inner: ['DARLING', '여긴 어떻게 들어왔어?'], medical: ['CHASE', '기록 보지 마. 내가 쓴 거다.'], map: ['PHANTOM', '지도 외우지 마. 바뀐다.'], manual: ['DARLING', '규정? 그런 게 있었어?'], phone: ['PHANTOM', '영창엔 전화 없다.'], docs: ['CHASE', '철수 계획은 못 볼 거다.'], ach: ['HYDE', '점수 매기는 거 좋아하네.'], term: ['CHASE', '터미널 기록은 전부 남는다.'] };
  var WHO = { phantom: ['PHANTOM', '내 파일 닫아.'], darling: ['DARLING', '나 잘 나왔냐?'], chase: ['CHASE', '뭘 찾는데?'], hyde: ['HYDE', '재밌는 거 있어?'] };
  var SAYA = { cat: ['HYDE', '그 고양이 치워.'], sebby: ['PHANTOM', '거기까지 해라.'], pasta: ['DARLING', '누가 내 파스타 부러뜨렸어!'], admin: ['CHASE', '관리자? 그런 사람 없어.'], menu: ['HYDE', '다 봤네. 이제 어쩔 건데.'], all4: ['PHANTOM', '네 명 다 털렸다.'] };
  function say(m) { if (m && window.__say) window.__say(m[0], m[1]); }
  window.__onroute = function (id, p) {
    if (id === 'ach') return say(SAY.ach);
    if (id === 'camp') { egg('camp'); CNT.cv = CNT.cv || {}; CNT.cv[p[1] || 'x'] = 1; sv(); if (Object.keys(CNT.cv).length >= 4) egg('campall'); }
    if (id === 'net' && p[1] === 'files' && WHO[p[2]] && user) egg('f_' + p[2]);
    if (id === 'camp') return say({ pne: ['CHASE', '없는 부대를 왜 찾아?'], meute: ['DARLING', '우리 얘기야? 잘 써 줘.'], map: ['PHANTOM', '지도 외우지 마. 바뀐다.'] }[p[1]] || ['PHANTOM', '여기 오는 길은 없다.']);
    if (id === 'me') return say(['CHASE', '네 정보? 우리가 먼저 봤어.']);
    if (id === 'net') return say(p[1] === 'files' && WHO[p[2]] ? WHO[p[2]] : SAY[p[1]]);
  };
  var TERM = { help: 'ls  whoami  cat 파일  eggs  clear', ls: 'roster.txt  orders.txt  toutou.jpg', whoami: function () { return user.id; }, eggs: function () { return '달성한 업적 ' + Object.keys(eggs).length + ' / ' + ACH.length; }, 'cat roster.txt': 'PHANTOM DARLING CHASE HYDE — 전원 기록 말소', 'cat orders.txt': '권한 없음.', 'cat toutou.jpg': function () { show(); egg('cat', '투투 발견'); return '샴 짬타이거 투투.'; }, sebby: function () { egg('sebby', '건드리면 안 되는 이름'); return '거기까지 해라.'; }, sudo: '이 부대는 없는 부대.' };
  function show() { setTimeout(function () { var o = $('#tout'); if (!o) return; var i = new Image(); i.src = 'assets/toutou.png'; i.alt = '투투'; i.className = 'tcat'; o.appendChild(i); }, 0); }
  window.__sayA = function (k) { setTimeout(function () { say(SAYA[k]); }, 60); };

  document.addEventListener('submit', function (e) {
    e.preventDefault();
    if (e.target.id === 'lf') {
      var u = $('#u').value.trim().toLowerCase(), p = $('#p').value.trim();
      if (u === 'admin' && sha256('etr|admin|' + nm(p)) === '18df9cf910186c84fc9cef269ad62824033d5cf9e86dc12cb077ea0fa7fef512') { egg('admin', '접속 화면에서 본 암호'); $('#le').textContent = '권한 없음. 이 부대는 없는 부대.'; if (window.__sfx) window.__sfx('deny'); return; }
      $('#le').textContent = '확인 중…'; unlock(u, p).then(function (ok) { if (ok) { if (!fails[u]) egg('first'); user = { id: u, t: nowT() }; if (window.__sfx) window.__sfx('login'); egg('login'); say(WHO[u] && [WHO[u][0], '누가 내 계정으로 들어왔어.']); logs[u] = 1; if (Object.keys(logs).length === 4) egg('all4'); auth(); window.__route(); } else { if (window.__sfx) window.__sfx('deny'); say(['HYDE', '틀렸어. 또 해 봐.']); $('#le').textContent = '콜사인 또는 암호 불일치.'; if (ACC[u]) { fails[u] = (fails[u] || 0) + 1; if (fails[u] >= 5) { egg('fail5'); clue(u); } } } });
    }
    if (e.target.id === 'mf') { var mt = $('#mi').value.trim(); if (mt) { $('#mi').value = ''; chatSend(mt); var mi2 = $('#mi'); if (mi2) mi2.focus(); } return; }
    if (e.target.id === 'tf') {
      var c = $('#ti').value.trim(), out = $('#tout'), k = c.toLowerCase(), r = TERM[k], TA = { whoami: 'whoami', ls: 'ls', 'cat roster.txt': 'rosterf', sudo: 'sudo', clear: 'clear' };
      if (c) egg('term'); if (TA[k]) egg(TA[k]); if (c && !r && k !== 'clear') cnt('bad', 3, 'badcmd');
      if (k === 'clear') { out.textContent = ''; $('#ti').value = ''; return; }
      r = typeof r === 'function' ? r() : (r || '없는 명령: ' + c);
      out.textContent += '\n> ' + c + '\n' + r; $('#ti').value = '';
    }
  });
  document.addEventListener('click', function (e) {
    var pe = e.target.closest && e.target.closest('#pe'); if (pe) { var pi = $('#p'), sh = pi.type === 'password'; pi.type = sh ? 'text' : 'password'; pe.classList.toggle('on', sh); pe.setAttribute('aria-label', sh ? '암호 가리기' : '암호 보기'); pi.focus(); }
    var mr = e.target.closest && e.target.closest('.mr'); if (mr) { chatCur = mr.dataset.r; chatDraw(); }
    var rt = e.target.closest && e.target.closest('.rlt, .rlj, .rln'); if (rt) relGo(rt.dataset.c);
    cnt('ck', 100, 'click100'); if (e.target.closest && e.target.closest('.logo')) egg('logo');
    if (e.target.id === 'gs') { egg('guest'); user = { id: 'guest', name: '미등록_' + (1000 + Math.floor(Math.random() * 9000)), t: nowT() }; try { localStorage.setItem('etr-gt', user.t); } catch (x) {} if (window.__sfx) window.__sfx('login'); auth(); window.__route(); }
    if (e.target.id === 'auth' && user) { e.preventDefault(); egg('logout'); if (window.__sfx) window.__sfx('logout'); user = null; auth(); if (location.hash === '#net') window.__route(); else location.hash = 'net'; }
    if (e.target.id === 'lo') { egg('logout'); if (window.__sfx) window.__sfx('logout'); user = null; auth(); if (location.hash === '#net') window.__route(); else location.hash = 'net'; }
    if (e.target.id === 'pasta') { egg('pasta', '하이드가 다 부러뜨렸다'); e.target.textContent = '파스타 (누가 다 부러뜨렸다)'; }
  });
  var mgT, canHover = matchMedia('(hover:hover)').matches;
  function mgSet(b) { document.querySelectorAll('.mgb').forEach(function (x) { x.classList.toggle('on', x === b); }); document.querySelectorAll('.mgp').forEach(function (x) { x.hidden = x.dataset.p !== b.dataset.g; }); }
  function mg(e) {
    var b = e.target.closest && e.target.closest('.mgb');
    clearTimeout(mgT);
    if (!b) return;
    if (e.type === 'click') { mgSet(b); return; }
    if (e.type === 'mouseover') { mgT = setTimeout(function () { mgSet(b); }, 110); return; }
    mgSet(b);
  }
  document.addEventListener('mouseover', mg); document.addEventListener('focusin', mg); document.addEventListener('click', mg);
  function chars(el, t) { el.textContent = ''; t.split('').forEach(function (c, i) { var s = document.createElement('i'); s.textContent = c; s.style.animationDelay = i * 22 + 'ms'; el.appendChild(s); }); }
  function clue(u) { var c = $('#clue'); if (!c || (c.dataset.u === u && c.firstChild)) return; c.dataset.u = u; c.innerHTML = '<small>단서</small><p></p>'; chars(c.lastChild, ACC[u].c); CNT.cl = CNT.cl || {}; CNT.cl[u] = 1; sv(); if (Object.keys(CNT.cl).length >= 4) egg('clue4'); }
  function pw() { var e = $('#ph'), f = $('#u'); if (!e || !f) return; var u = f.value.trim().toLowerCase(), a = ACC[u], c = $('#clue'); chars(e, !u ? '콜사인 먼저 입력 바람.' : a ? a.k : '미등록 콜사인.'); e.classList.add('on'); if (a && fails[u] >= 5) clue(u); else if (c) { c.innerHTML = ''; c.dataset.u = ''; } }
  document.addEventListener('focusin', function (e) { if (e.target.id === 'p') pw(); });
  document.addEventListener('focusout', function (e) { if (e.target.id === 'p') { var h = $('#ph'); if (h) h.classList.remove('on'); } });
  function rdx(e) { var r = e.target.closest && e.target.closest('.rd'); if (!r || !user || user.id === 'guest') return; egg('redact'); CNT.rx = CNT.rx || {}; if (!CNT.rx[r.textContent]) { CNT.rx[r.textContent] = 1; sv(); } if (Object.keys(CNT.rx).length >= 5) egg('redact5'); }
  document.addEventListener('mouseover', rdx); document.addEventListener('focusin', rdx);
  var buf = '';
  addEventListener('keydown', function (e) { if (/INPUT/.test(e.target.tagName) || e.key.length > 1) return; buf = (buf + e.key.toLowerCase()).slice(-6); if (buf === 'toutou') { show(); egg('cat', '투투 발견'); } });
})();
