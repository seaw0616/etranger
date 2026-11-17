// 11-17 r/PNE 커뮤: /커뮤 단축어 꼴(배너 그림 → ⇧ · [태그]제목 · 💬 다섯 줄 → ⇧1위 글 카드 → 💬N · Best⌄ 댓글: 색 동그라미 · OP · ↪답글 · 삭제된 댓글 · 세 단 대댓글)
// 기능: 검색(«!커뮤 낱말»=그 화제) · 정렬(Best · New · Top) · ⇧⇩ 누르기 · 글 열기 · About(화제)
(function () {
  var TOPICS = ['보급', '물', '밀수', '지휘관', '감시자', '키배', '뫼트', '투투', '모래폭풍', '생환 내기'];
  var NICK = { PHANTOM: 'Desert_Ghost', DARLING: 'Cazzo_Boom', CHASE: 'Vodka_Sniper', HYDE: 'Butcher_Hawk' };
  var nk = function (n) { return NICK[n] || n; };
  // 댓글: [닉, 시간, 글, 추천, 대댓글[]]. 닉 null = 삭제된 댓글
  var BODY = {
    '외부 접속 감지': { b: '외부 접속 흔적 확인. 통신실은 기록 보존하고 보고할 것. 이 글에 댓글 달지 말 것.', c: [[null, '5h'], ['Kevlar_Rat', '4h', '댓글 달지 말래서 달아봄', 33, [['Desert_Ghost', '4h', '내일 구보 열 바퀴 추가.', 41]]]] },
    '이번 주 물도': { b: '1인 하루 물 정량 또 줄었다. 수통 들고 오면 눈금까지 재서 준다. 불만은 지휘소로.', c: [['Baguette_Mort', '4h', '체이스가 물 되판다는 소문 있던데', 19, [['취사장', '4h', '확인되면 걔 수통부터 압수', 11, [['Vodka_Sniper', '3h', '압수한 수통도 값은 받는다.', 7]]]]], ['Kevlar_Rat', '3h', '물 한 컵에 담배 두 개면 싼 거임', 6]] },
    'MEUTE 또 살아': { b: '미끼로 보낸 조가 또 넷 다 걸어서 들어옴. 지휘소 표정 봤냐. 이쯤 되면 걔네가 미끼가 아니라 우리가 미끼임.', c: [['Baguette_Mort', '4h', '생환 내기 또 나만 잃음', 22, [['2조 고참', '4h', '내기 판 차린 놈이 체이스였던 거 알면 더 빡칠걸', 31]]], ['Kevlar_Rat', '4h', '하이드 웃으면서 들어오는 거 보고 밥맛 떨어짐', 18], [null, '3h'], ['Sable_Chien', '3h', '팬텀이 맨 뒤에서 걸어오던데 다리 절더라', 9, [['Kevlar_Rat', '3h', '그 양반은 다리 부러져도 표정 안 바뀜', 12]]]] },
    '달링 여자 소문': { b: '마을 시장 빵집 쪽이 출처였음. 근데 달링이 그 집 빵을 산 적이 없다는 게 함정. 소문은 달링 본인이 낸 거라는 썰이 유력.', c: [['Kevlar_Rat', '3h', '자기 소문 자기가 내는 놈 처음 봄', 40, [['ㅇㅇ', '3h', '향수 냄새로 출처 추적함', 22]]], ['Baguette_Mort', '3h', '그 향수 보급품 아님. 어디서 났는지가 더 궁금함', 17], ['Sable_Chien', '2h', '달링 이 글 봤다에 담배 한 갑', 8, [['Cazzo_Boom', '2h', '봤다. 빵집 아님. 정정해라', 88]]]] },
    '투투가 오늘도': { b: '오늘로 14일 연속. 하이드가 쭈그려 앉아서 손 내미니까 꼬리 세우고 튐. 짬타이거도 사람 가리네.', c: [['Kevlar_Rat', '3h', '투투가 우리 중에 제일 똑똑함', 55], ['Baguette_Mort', '3h', '체이스한테는 비비던데', 30, [['통신실', '3h', '체이스가 밥 주니까. 물론 밥값은 받음', 44, [['Vodka_Sniper', '2h', '외상이다. 투투 장부도 있다.', 39]]]]], [null, '2h'], ['Sable_Chien', '2h', '하이드 그 뒤로 사료 사 왔다는 썰 진짜임?', 12, [['Butcher_Hawk', '2h', '사 왔어. 안 먹던데. 재밌지.', 27]]]] },
    '마을 시장 해 지면': { b: '해 지면 시장 닫는다. 몇 번을 말하냐. 어제도 신병 하나 빈손으로 돌아와서 울상.', c: [['Baguette_Mort', '2h', '물은 주민 먼저라는 것도 모름', 7], ['Sable_Chien', '1h', '우리도 처음엔 몰랐잖아 봐줘라', 3, [['오래산놈', '1h', '난 알았음', 9]]]] },
    '투투 근황': { art: [' /\\_/\\  ', '( o.o ) ', ' > ^ <  ', '/  _  \\ ', '\\_( )_/ ', '  투투  '], c: [['Kevlar_Rat', '1h', '하이드 보고 도망가기 직전 표정임', 20], ['Baguette_Mort', '1h', '통신실 장비로 그렸지 이거', 6, [['Sable_Chien', '1h', '기록 남는다며 체이스한테 걸림', 15]]]] },
    '다음 출격 생환 내기': { b: '판돈은 담배. 넷 다 살아 돌아오면 판 주인이 다 먹음. 판 주인은 나.', c: [['Kevlar_Rat', '50m', '판 주인이 넷 중 하나인 게 함정', 40, [['Vodka_Sniper', '48m', '나 말고 다른 셋에 걸어라.', 26]]], ['Baguette_Mort', '40m', '지난 판 판돈 아직 못 받았는데', 18, [['Vodka_Sniper', '38m', '장부에 있다. 이자 붙는 중.', 21, [['Baguette_Mort', '36m', '이 거지 새끼 또 시작이네', 14]]]]], [null, '30m']] },
    '경례할 때 건곤': { b: '동쪽 어디 특수부대 출신이라는 신병, 아침 점호 때 경례하면서 «건곤!» 외침. 어느 부대냐 물으니까 «가장 어두운 밤에 떠오르는 태양» 한마디 하고 입 닫음.', c: [['Kevlar_Rat', '33m', '日月 뭐시기라던데 지도에 그런 부대 없음', 24], ['Baguette_Mort', '31m', '과거 안 묻는 게 관례다. 근데 궁금하긴 함', 11], ['Desert_Ghost', '25m', '묻지 마라.', 37]] },
    '무기고 문 안쪽 낙서': { b: '무기고 문 안쪽에 칼로 긁어 놓은 글씨 있음. «모든 안전수칙은 피로 쓰여진다». 누가 썼는지는 모르겠는데 지워도 다음 날 또 있음.', c: [['Vodka_Sniper', '29m', '틀린 말이 아니라 웃기지도 않음', 18], ['Butcher_Hawk', '27m', '피로 쓴 건 잘 안 지워지지', 9, [['Kevlar_Rat', '26m', '하이드가 하니까 무섭다고', 21]]]] },
    '보급 호송 온 PMC': { b: '이번 보급 트럭 호송이 정규군이 아니라 PMC였음. 소매 패치에 «NOX». 지휘소 들어갈 때 경례 대신 «Stay dark» 이럼.', c: [['Cazzo_Boom', '22m', '담배 한 대 얻어 피웠음. 나중에 서울에 큰일 생긴다던데', 15], ['Sable_Chien', '20m', '없는 부대 보급에 왜 PMC가 붙냐', 12, [['Desert_Ghost', '18m', '없는 부대니까.', 30]]]] },
    '의무대 혈액 샘플': { b: '면역 검사라고 피 뽑아 가길래 그런가 보다 했는데 받아 가는 데가 좀 이상함. 상자에 «ÉDEN»? 비슷한 글자 박혀 있었던 거 같음. 가지러 온 놈들도 군복 아니었고. PMC임?', c: [['Sable_Chien', '9m', 'ㄹㅇ 그 상자 수상함. 옆구리에 «클론과 직접 접촉 금지» 붙어 있는 거 봄', 27, [['Baguette_Mort', '8m', '의무대도 모른다던데 ㅋㅋ 근데 클론이 뭔데', 15]]], ['Kevlar_Rat', '7m', '이름부터 냄새남. 걔네 무전으로 «NOX» 어쩌고 하던데', 22, [['Sable_Chien', '6m', '섬에 무슨 연구소 있다던데. 카더라', 11]]], ['Vodka_Sniper', '6m', '상자 하나 빼돌리면 얼마 받냐', 16], ['Sable_Chien', '5m', '채혈하던 놈이 면역 좋은 애들한테 «사과»라고 함. 뭔 뜻임', 19, [['Butcher_Hawk', '5m', '먹기 좋다는 뜻 아닐까', 12]]], ['Desert_Ghost', '3m', '상자 근처에 가지 마라.', 35]] },
  };
  var EXTRA = [['짤', '투투 근황.jpg', 'Sable_Chien', '1h', 0, 77], ['내기', '다음 출격 생환 내기 판 엶', 'Vodka_Sniper', '52m', 0, 46],
    ['소문', '경례할 때 건곤 외치는 신병', 'Sable_Chien', '35m', 0, 58], ['잡담', '무기고 문 안쪽 낙서 본 사람', 'Baguette_Mort', '30m', 0, 39],
    ['소문', '보급 호송 온 PMC 패치 본 사람', 'Kevlar_Rat', '24m', 0, 33], ['소문', '의무대 혈액 샘플 어디로 가냐', 'Baguette_Mort', '16m', 0, 44]];
  var st = { sort: 'best', tab: 'feed', q: '', open: -1, vote: {}, joined: true, rep: '', menu: '', sav: {}, hid: {} };
  try { var sv = JSON.parse(localStorage.getItem('rpne-vote') || '{}'); if (sv && typeof sv === 'object') { st.vote = sv.v || {}; st.sav = sv.s || {}; st.hid = sv.h || {}; if (sv.j === false) st.joined = false; } } catch (e) {}
  var keep = function () { try { localStorage.setItem('rpne-vote', JSON.stringify({ v: st.vote, j: st.joined, s: st.sav, h: st.hid })); } catch (e) {} };
  // 레딧처럼 선 아이콘(이모지 · 특수문자 안 씀)
  var I = {
    up: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3 3.5 10H7v6.5h6V10h3.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    dn: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 17 3.5 10H7V3.5h6V10h3.5z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    cm: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 3.2c-4 0-7 2.6-7 5.9 0 1.6.7 3 1.9 4.1L4.2 16.8l3.6-1.6c.7.2 1.4.3 2.2.3 4 0 7-2.6 7-5.9S14 3.2 10 3.2z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
    sh: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12 4l5 5-5 5M17 9H9.5C6.5 9 4 11.2 4 14.5V16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    rp: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 5 3 10l5 5M3 10h8.5c3 0 5.5 2.2 5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    lk: '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="4.5" y="9" width="11" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M7 9V6.5a3 3 0 0 1 6 0V9" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
    sr: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="9" cy="9" r="5.5" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="m13.2 13.2 3.6 3.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    mn: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5.5h14M3 10h14M3 14.5h14" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
    mo: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="4.5" cy="10" r="1.6" fill="currentColor"/><circle cx="10" cy="10" r="1.6" fill="currentColor"/><circle cx="15.5" cy="10" r="1.6" fill="currentColor"/></svg>',
    cv: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5.5 8 4.5 4.5L14.5 8" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    pl: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
    bk: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 4.5 7 10l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  var FL = { '공지': '#0a7c5a', '보급': '#7a5c1e', 'MEUTE': '#8a2b2b', '잡담': '#38505a', '투투': '#6b3fa0', '짤': '#a04a1e', '내기': '#1e5aa0', '경고': '#8a2b2b', '의무': '#1e7a6b', '거래': '#7a5c1e', '분실': '#38505a' };
  var col = function (n) { var h = 0; for (var i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) % 360; return 'hsl(' + h + ',55%,52%)'; };
  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); };
  var info = function (t) { for (var k in BODY) if (t.indexOf(k) === 0) return BODY[k]; return null; };
  var ctx = null, posts = [];
  function build() {
    posts = ctx.posts.concat(EXTRA).map(function (p, i) { var X = info(p[1]) || {}; return { i: i, tag: p[0], title: p[1], who: nk(p[2]), when: p[3] || '방금', up: p[5] || 0, view: p[4] || 0, lock: 0, b: X.b || '', art: X.art || null, c: X.c || [] }; })
      .concat((ctx.inner || []).map(function (p, i) { return { i: 1000 + i, tag: p[0], title: p[1], who: nk(p[2]), when: p[3], up: 0, view: 0, lock: 1, b: '', art: null, c: [] }; }));
  }
  var cnt = function (cs) { var n = 0; (cs || []).forEach(function (c) { n += 1 + cnt(c[4]); }); return n; };
  var score = function (p) { return p.up + (st.vote[p.i] || 0); };
  function list() {
    var q = st.q.replace(/^!커뮤\s*/, '').trim();
    var a = posts.filter(function (p) { return !q || (p.tag + ' ' + p.title + ' ' + p.b + ' ' + p.who).indexOf(q) >= 0; });
    if (st.sort === 'best') a.sort(function (x, y) { return (x.lock - y.lock) || (score(y) - score(x)); });
    else if (st.sort === 'top') a.sort(function (x, y) { return (x.lock - y.lock) || (y.view - x.view); });
    else a.sort(function (x, y) { return y.i - x.i; });
    return a;
  }
  var av = function (n, sm) { return '<span class="rx-av' + (sm ? ' sm' : '') + '" style="background:' + col(n) + '">' + esc(n.replace(/^u\//, '')).charAt(0).toUpperCase() + '</span>'; };
  var flair = function (t) { return '<span class="rx-fl" style="background:' + (FL[t] || '#38505a') + '">' + esc(t) + '</span>'; };
  function votes(p) { var v = st.vote[p.i] || 0; return '<span class="rx-vote' + (v > 0 ? ' up' : v < 0 ? ' dn' : '') + '"><button data-rx="up" data-i="' + p.i + '" aria-label="추천">' + I.up + '</button><b>' + score(p) + '</b><button data-rx="dn" data-i="' + p.i + '" aria-label="비추천">' + I.dn + '</button></span>'; }
  function bar(p) { return '<div class="rx-bar">' + votes(p) + '<button class="rx-pill" data-rx="open" data-i="' + p.i + '">' + I.cm + '<b>' + cnt(p.c) + '</b></button><button class="rx-pill" data-rx="share">' + I.sh + '<b>Share</b></button></div>'; }
  function card(p, full) {
    return '<article class="rx-card' + (full ? ' full' : '') + '"' + (full ? '' : ' data-rx="open" data-i="' + p.i + '"') + '><p class="rx-by"><img class="rx-sub" src="img/rpne_logo.webp" alt=""><b>r/PNE</b><span>•</span>' + esc(p.when) + (full ? '<span>•</span>u/' + esc(p.who) : '') + (p.lock ? '<span class="rx-lk">' + I.lk + '대원 전용</span>' : '') + '</p>' +
      '<h3>' + esc(p.title) + '</h3><p class="rx-fls">' + flair(p.tag) + '</p>' +
      (p.b ? '<p class="rx-body">' + esc(p.b) + '</p>' : '') + (p.art ? '<pre class="rx-art">' + esc(p.art.join('\n')) + '</pre>' : '') + bar(p) + '</article>';
  }
  function cm(c, op, lv, key) {
    var kids = (c[4] || []).map(function (r, j) { return cm(r, op, Math.min(lv + 1, 3), key + '.' + j); }).join('');
    if (!c[0]) return '<div class="rx-cm" style="--lv:' + lv + '"><p class="rx-ch"><span class="rx-av sm del"></span><b>[deleted]</b><span>•</span>' + esc(c[1]) + '</p><p class="rx-cb dim">[삭제된 댓글입니다]</p></div>' + kids;
    if (st.hid[key]) return '<div class="rx-cm hid" style="--lv:' + lv + '"><p class="rx-ch"><b>' + esc(c[0]) + '</b><span>•</span>숨긴 댓글</p><button class="rx-cbtn" data-rx="cshow" data-k="' + key + '">펼치기</button></div>';
    var v = st.vote[key] || 0, sav = st.sav[key];
    return '<div class="rx-cm" style="--lv:' + lv + '"><p class="rx-ch">' + av(c[0], 1) + '<b>' + esc(c[0]) + '</b>' + (c[0] === op ? '<i class="rx-op">OP</i>' : '') + '<span>•</span>' + esc(c[1]) + (sav ? '<span class="rx-sv">저장됨</span>' : '') + '</p><p class="rx-cb">' + esc(c[2]) + '</p>'
      + '<div class="rx-cf"><span class="rx-cv' + (v > 0 ? ' up' : v < 0 ? ' dn' : '') + '"><button data-rx="cup" data-k="' + key + '" aria-label="댓글 추천">' + I.up + '</button><b>' + ((+c[3] || 0) + v) + '</b><button data-rx="cdn" data-k="' + key + '" aria-label="댓글 비추천">' + I.dn + '</button></span>'
      + '<button class="rx-cbtn' + (st.rep === key ? ' on' : '') + '" data-rx="crep" data-k="' + key + '">' + I.rp + 'Reply</button>'
      + '<span class="rx-mw"><button class="rx-cbtn" data-rx="cmo" data-k="' + key + '" aria-label="더 보기">' + I.mo + '</button>'
      + (st.menu === key ? '<span class="rx-mn"><button data-rx="csav" data-k="' + key + '">' + (sav ? '저장 취소' : '저장') + '</button><button data-rx="chide" data-k="' + key + '">숨기기</button><button data-rx="crpt" data-k="' + key + '">신고</button></span>' : '') + '</span></div>'
      + (st.rep === key ? '<div class="rx-rb"><p class="rx-rbi">u/외부_접속자 (으)로 답글 작성</p><p class="rx-rbm">답글은 기지 인원만 달 수 있습니다.</p><div class="rx-rbb"><button data-rx="crep" data-k="' + key + '">닫기</button></div></div>' : '')
      + '</div>' + kids;
  }
  function comments(p) { return '<div class="rx-cms"><p class="rx-cmt">Sort by: <b>Best</b>' + I.cv + '</p>' + (p.c.length ? p.c.map(function (c, j) { return cm(c, p.who, 0, 'c' + p.i + '-' + j); }).join('') : '<p class="rx-none">' + (p.lock ? '대원 전용 글. 댓글 기록 없음.' : '아직 댓글 없음.') + '</p>') + '</div>'; }
  function about() { return '<div class="rx-card full rx-about"><h3>r/PNE</h3><p class="rx-body">PNE의 커뮤입니다 (막장성 짙음)</p><p class="rx-by"><b>31</b>&nbsp;members<span>•</span><span class="rx-on"></span><b>7</b>&nbsp;online</p><p class="rx-k">화제</p><div class="rx-tp">' + TOPICS.map(function (t) { return '<button data-rx="topic" data-t="' + esc(t) + '">' + esc(t) + '</button>'; }).join('') + '</div><p class="rx-hint">검색 칸에 «!커뮤 낱말»을 넣으면 그 화제 글만 나옵니다.</p></div>'; }
  function feed() {
    if (st.open >= 0) { var p = posts.filter(function (x) { return x.i === st.open; })[0]; if (p) return '<button class="rx-back" data-rx="close">' + I.bk + 'r/PNE</button>' + card(p, 1) + comments(p); }
    if (st.tab === 'about') return about();
    var a = list();
    if (!a.length) return '<p class="rx-none">«' + esc(st.q) + '» 글 없음.</p>';
    return a.map(function (p) { return card(p, 0); }).join('');
  }
  function tools() {
    return '<div class="rx-tabs"><button class="' + (st.tab === 'feed' ? 'on' : '') + '" data-rx="tab" data-t="feed">Feed</button><button class="' + (st.tab === 'about' ? 'on' : '') + '" data-rx="tab" data-t="about">About</button><span class="rx-sp"></span><label class="rx-sort">' + { best: 'Best', new: 'New', top: 'Top' }[st.sort] + I.cv + '<select id="rxs"><option value="best"' + (st.sort === 'best' ? ' selected' : '') + '>Best</option><option value="new"' + (st.sort === 'new' ? ' selected' : '') + '>New</option><option value="top"' + (st.sort === 'top' ? ' selected' : '') + '>Top</option></select></label></div>';
  }
  function head() {
    return '<div class="rx-hd"><div class="rx-top"><button class="rx-ic" data-rx="tab" data-t="about" aria-label="메뉴">' + I.mn + '</button><label class="rx-search">' + I.sr + '<input id="rxq" placeholder="Search in r/PNE" value="' + esc(st.q) + '"></label><button class="rx-ic" data-rx="share" aria-label="더 보기">' + I.mo + '</button></div>' +
      '<img class="rx-camo" src="img/rpne_camo.webp" alt="">' +
      '<div class="rx-id"><img class="rx-logo" src="img/rpne_logo.webp" alt="PNE"><div><h2 translate="no">r/PNE</h2><p>31 members<span>•</span><span class="rx-on"></span>7 online</p></div></div>' +
      '<div class="rx-btns"><button class="rx-pb" data-rx="create">' + I.pl + 'Create Post</button><button class="rx-pb" data-rx="join">' + (st.joined ? 'Joined' : 'Join') + '</button></div>' +
      '<div class="rx-toolbox">' + tools() + '</div></div>';
  }
  function rail() { return '<aside class="rx-rail">' + [['calendar', '일정표'], ['duty', '근무표'], ['meal', '식단']].map(function (w) { return '<div class="rx-wd"><h5>' + w[1] + '</h5>' + ctx.wd(w[0]) + '</div>'; }).join('') + '</aside>'; }
  function draw() { var f = document.querySelector('.rx-feed'); if (f) f.innerHTML = feed(); var t = document.querySelector('.rx-toolbox'); if (t) t.innerHTML = tools(); var j = document.querySelector('.rx-pb[data-rx="join"]'); if (j) j.textContent = st.joined ? 'Joined' : 'Join'; var q = document.getElementById('rxq'); if (q && q.value !== st.q) q.value = st.q; }
  function toast(t) { var o = document.createElement('div'); o.className = 'rx-toast'; o.textContent = t; document.body.appendChild(o); setTimeout(function () { o.remove(); }, 1600); }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-rx]'); if (!b || !b.closest('.rx')) return;
    e.preventDefault(); e.stopPropagation();
    var k = b.getAttribute('data-rx'), i = +b.getAttribute('data-i');
    var ck = b.getAttribute('data-k'); if (k !== 'cmo') st.menu = '';
    if (k === 'cup' || k === 'cdn') { var cd = k === 'cup' ? 1 : -1; st.vote[ck] = st.vote[ck] === cd ? 0 : cd; keep(); }
    else if (k === 'crep') st.rep = st.rep === ck ? '' : ck;
    else if (k === 'cmo') st.menu = st.menu === ck ? '' : ck;
    else if (k === 'csav') { if (st.sav[ck]) delete st.sav[ck]; else st.sav[ck] = 1; keep(); toast(st.sav[ck] ? '댓글 저장됨' : '저장 취소됨'); }
    else if (k === 'chide') { st.hid[ck] = 1; keep(); }
    else if (k === 'cshow') { delete st.hid[ck]; keep(); }
    else if (k === 'crpt') { toast('신고 접수됨. 처리: 지휘소'); }
    else if (k === 'up' || k === 'dn') { var d = k === 'up' ? 1 : -1; st.vote[i] = st.vote[i] === d ? 0 : d; keep(); }
    else if (k === 'open') { st.open = i; if (posts[i] && posts[i].title.indexOf('의무대 혈액 샘플') === 0 && window.__say) window.__say('CHASE', '157.6 잡혔다. 우리 주파수 아님. «코드 시온»만 되풀이한다.'); setTimeout(function () { var f = document.querySelector('.rx-feed'); if (f) f.scrollIntoView({ block: 'start' }); }, 0); }
    else if (k === 'close') st.open = -1;
    else if (k === 'tab') { st.tab = b.getAttribute('data-t'); st.open = -1; }
    else if (k === 'topic') { st.q = '!커뮤 ' + b.getAttribute('data-t'); st.tab = 'feed'; }
    else if (k === 'share') { toast('링크 복사됨'); return; }
    else if (k === 'create') { toast('글쓰기는 기지 인원만'); return; }
    else if (k === 'join') { st.joined = !st.joined; keep(); }
    draw();
  }, true);
  document.addEventListener('input', function (e) { if (e.target.id === 'rxq') { st.q = e.target.value; st.open = -1; st.tab = 'feed'; var tb = document.querySelector('.rx-toolbox'); if (tb) tb.innerHTML = tools(); var f = document.querySelector('.rx-feed'); if (f) f.innerHTML = feed(); } });
  document.addEventListener('change', function (e) { if (e.target.id === 'rxs') { st.sort = e.target.value; draw(); } });
  window.__RPNE = { page: function (c) { ctx = c; build(); st.open = -1; return '<div class="rx">' + head() + '<div class="rx-grid"><div class="rx-feed">' + feed() + '</div>' + rail() + '</div></div>'; } };
})();
