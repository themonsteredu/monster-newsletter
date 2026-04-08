"use client";
import { useState } from "react";

const mk = () => Math.random().toString(36).slice(2, 8);
const CM = { o: '#d35400', b: '#2c3e50', g: '#27ae60', r: '#c0392b' };

const INIT = {
  year: '2026', month: '5', phone: '010-7627-1003',
  hl: '과정 중심 학습관리,\n성장을 이끄는 더몬스터학원의 교육 이야기',
  intro: '안녕하세요, 더몬스터학원입니다.\n이번 소식지에서는 수업 흐름과 학습 관리,\n학부모님께 도움이 될 교육 소식을 전해드립니다.',
  flow_elem: '월: 개념테스트 / 화수금: 일일테스트 / 목: 오답정리 DAY',
  flow_mid: '판서수업 + 개별클리닉 + 매주 주간테스트',
  test_desc: '매월 마지막 주 금요일 테스트 → 오답 분류 → 다음 달 첫주 카톡 레포트 발송',
  coaching_desc: '교과서 길들이기 6단계로 비수학 과목도 꼼꼼히!',
  coaching_subj: '국어 / 사회 / 과학 / 한국사 / 세계사',
  img1: '', img2: '', img3: '',
  schedules: [
    { date: '5/1', event: '어린이날 행사 + 창의수학 퀴즈대회', img: '' },
    { date: '5/4', event: '학원 휴무일', img: '' },
    { date: '5/5', event: '어린이날 휴원', img: '' },
  ],
  edu: [
    { id: mk(), lb: '교육과정', lc: 'b', ct: '올해 초5·6, 중2 교육과정이 바뀌었어요', body: '2022 개정 교육과정이 올해 초등 5·6학년, 중학교 2학년에 적용되었습니다.\n수학은 4개 영역으로 재편되어 초등~중등 개념이 하나로 이어집니다.' },
    { id: mk(), lb: '신규 정책', lc: 'r', ct: '2026년 새로 시행되는 정책', body: '학생맞춤통합지원 — 기초학력, 심리정서 등 통합 지원 시작\n초3 방과후 바우처 — 연중 1과목 이상 무상 수강 가능' },
    { id: mk(), lb: '교육 흐름', lc: 'g', ct: '"외우기"에서 "설명하기"로', body: '서술형 비중이 높아지고 있어요. 백지테스트처럼 "설명하는 연습"이 더 중요해집니다.' },
  ],
  sources: '교육부 고시 제2022-33호 | 정책브리핑 2026.01.28 | 지역내일',
};

export default function Page() {
  const [d, setD] = useState(INIT);
  const [tab, setTab] = useState('basic');
  const [news, setNews] = useState([]);
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));

  const addSch = () => set('schedules', [...d.schedules, { date: '', event: '', img: '' }]);

  const handleSchImg = (i, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => uSch(i, 'img', ev.target.result);
    reader.readAsDataURL(file);
  };
  const rmSch = (i) => set('schedules', d.schedules.filter((_, j) => j !== i));
  const uSch = (i, f, v) => { const a = [...d.schedules]; a[i] = { ...a[i], [f]: v }; set('schedules', a); };

  const addEdu = () => set('edu', [...d.edu, { id: mk(), lb: '라벨', lc: 'b', ct: '제목', body: '내용' }]);
  const rmEdu = (i) => { if (d.edu.length <= 1) return; set('edu', d.edu.filter((_, j) => j !== i)); };
  const uEdu = (i, f, v) => { const a = [...d.edu]; a[i] = { ...a[i], [f]: v }; set('edu', a); };

  const fetchNews = async () => {
    setNewsLoading(true);
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      setNews(data.items || []);
    } catch { setNews([]); }
    setNewsLoading(false);
    setNewsOpen(true);
  };

  const handleImg = (key, e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => set(key, ev.target.result);
    reader.readAsDataURL(file);
  };

  const addNewsToEdu = (item) => {
    set('edu', [...d.edu, { id: mk(), lb: item.source || '뉴스', lc: 'b', ct: item.title, body: item.summary }]);
    if (d.sources.indexOf(item.source) === -1) {
      set('sources', d.sources + ' | ' + item.source + (item.date ? ' ' + item.date : ''));
    }
  };

  const nl = (t) => t.split('\n').filter(Boolean).map(l => '<p style="margin-bottom:3mm">' + l + '</p>').join('');
  const schRows = d.schedules.map(s => '<tr><td><b>' + s.date + '</b></td><td>' + s.event + '</td></tr>').join('');

  const mapleFonts = "@font-face{font-family:'MapleBold';src:url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFBold.woff') format('woff');font-weight:700;font-display:swap}"
    + "@font-face{font-family:'MapleLight';src:url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/MaplestoryOTFLight.woff') format('woff');font-weight:400;font-display:swap}";
  var titleFont = "'MapleBold','Apple SD Gothic Neo',sans-serif";
  var bodyFont = "'MapleLight','Apple SD Gothic Neo',sans-serif";

  const genA4 = () => {
    var h = '<!DOCTYPE html><html><head><meta charset="utf-8">'
      + '<style>' + mapleFonts
      + '@page{size:A4;margin:0}'
      + 'body{margin:0;font-family:' + bodyFont + ';color:#222}'
      + '.pg{width:210mm;height:297mm;position:relative;overflow:hidden;page-break-after:always;display:flex;flex-direction:column}'
      + '.cd{background:#fff;border:2px solid #333;border-radius:3mm;padding:4mm 5mm;position:relative;margin-bottom:3mm}'
      + '.lb{position:absolute;top:-1px;left:12px;padding:1.5px 10px;color:#fff;font-size:10px;font-weight:700;border-radius:0 0 5px 5px}'
      + '</style></head><body>';

    // Page 1 - Cover (꽉 찬 커버)
    h += '<div class="pg" style="background:linear-gradient(160deg,#0f0f23 0%,#1a1a3e 50%,#2d1a0f 100%);color:#fff;padding:0">'
      + '<div style="background:#d35400;padding:3mm 10mm;display:flex;justify-content:space-between;font-size:9pt;font-weight:600">'
      + '<span>MONTHLY NEWSLETTER</span><span>' + d.year + '.' + d.month + '</span></div>'
      + '<div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:15mm 18mm">'
      + '<div style="font-size:12pt;letter-spacing:8px;opacity:0.4;margin-bottom:6mm">THE MONSTER</div>'
      + '<div style="font-family:' + titleFont + ';font-size:28pt;font-weight:900;line-height:1.4;margin-bottom:8mm;word-break:keep-all">' + d.hl.replace(/\n/g,'<br>') + '</div>'
      + '<div style="width:15mm;height:1mm;background:#d35400;margin-bottom:8mm"></div>'
      + '<div style="font-size:12pt;line-height:2;opacity:0.8">' + d.intro.replace(/\n/g,'<br>') + '</div></div>'
      + '<div style="background:rgba(0,0,0,0.4);padding:4mm 18mm;display:flex;justify-content:space-between">'
      + '<span style="font-size:9pt;opacity:0.6">광주 계림동 더몬스터학원</span>'
      + '<span style="font-size:11pt;font-weight:700;color:#e67e22">' + d.phone + '</span></div></div>';

    // Page 2 - News (여백 최소화, 꽉 찬 레이아웃)
    h += '<div class="pg" style="padding:6mm 8mm">'
      + '<div style="background:#1a1a2e;color:#fff;padding:3mm 5mm;border-radius:3mm;display:flex;justify-content:space-between;align-items:center;margin-bottom:4mm">'
      + '<span style="font-family:' + titleFont + ';font-size:14pt;font-weight:800">이달의 학원 소식</span>'
      + '<span style="background:#d35400;padding:1.5mm 5mm;border-radius:10mm;font-size:9pt">' + d.month + '월호</span></div>';

    h += '<div class="cd" style="border-left:4px solid #d35400"><div class="lb" style="background:#d35400">학습 FLOW</div>'
      + '<div style="margin-top:4mm;display:flex;gap:4mm">'
      + '<div style="flex:1;background:#fef5ee;border-radius:2mm;padding:3mm"><div style="font-size:9pt;color:#d35400;font-weight:700;margin-bottom:1mm">초등부</div><div style="font-size:10pt;line-height:1.6">' + d.flow_elem + '</div></div>'
      + '<div style="flex:1;background:#f0f4ff;border-radius:2mm;padding:3mm"><div style="font-size:9pt;color:#2c3e50;font-weight:700;margin-bottom:1mm">중고등부</div><div style="font-size:10pt;line-height:1.6">' + d.flow_mid + '</div></div>'
      + '</div></div>';

    h += '<div style="display:flex;gap:3mm">'
      + '<div class="cd" style="flex:1;border-left:4px solid #2c3e50"><div class="lb" style="background:#2c3e50">월말테스트</div>'
      + '<div style="margin-top:4mm;font-size:10pt;line-height:1.7">' + d.test_desc + '</div></div>'
      + '<div class="cd" style="flex:1;border-left:4px solid #27ae60"><div class="lb" style="background:#27ae60">교과서 코칭</div>'
      + '<div style="margin-top:4mm;font-size:10pt;line-height:1.7">' + d.coaching_desc + '</div>'
      + '<div style="margin-top:2mm;font-size:9pt;color:#666">' + d.coaching_subj + '</div></div></div>';

    var imgs = [d.img1, d.img2, d.img3].filter(function(x) { return x; });
    if (imgs.length > 0) {
      h += '<div style="display:flex;gap:3mm;margin-bottom:3mm">' + imgs.map(function(src) {
        return '<div style="flex:1;border-radius:3mm;overflow:hidden"><img src="' + src + '" style="width:100%;display:block;border-radius:3mm" /></div>';
      }).join('') + '</div>';
    }

    h += '<div class="cd" style="border-left:4px solid #c0392b"><div class="lb" style="background:#c0392b">' + d.month + '월 일정</div>'
      + '<div style="margin-top:4mm;display:flex;flex-wrap:wrap;gap:2mm">'
      + d.schedules.map(function(s) {
        return '<div style="display:flex;align-items:center;gap:2mm;background:#fef0e7;border-radius:2mm;padding:2mm 4mm">'
          + '<span style="color:#d35400;font-weight:800;font-size:10pt">' + s.date + '</span>'
          + '<span style="font-size:9pt;color:#333;flex:1">' + s.event + '</span>'
          + (s.img ? '<img src="' + s.img + '" style="height:8mm;border-radius:1mm;object-fit:cover" />' : '')
          + '</div>';
      }).join('') + '</div></div>';

    h += '<div style="background:linear-gradient(135deg,#d35400,#e67e22);color:#fff;text-align:center;padding:4mm;border-radius:3mm;font-weight:700;font-size:12pt">'
      + '교육 상담 문의  ' + d.phone + '</div>';
    h += '</div>';

    // Page 3 - Education info (여백 최소화)
    h += '<div class="pg" style="padding:6mm 8mm">'
      + '<div style="background:#1a1a2e;color:#fff;padding:3mm 5mm;border-radius:3mm;text-align:center;margin-bottom:4mm">'
      + '<span style="font-size:14pt;font-weight:800">학부모님을 위한 교육 정보</span></div>';

    d.edu.forEach(function(e) {
      h += '<div class="cd" style="border-left:4px solid ' + CM[e.lc] + '"><div class="lb" style="background:' + CM[e.lc] + '">' + e.lb + '</div>'
        + '<div style="margin-top:4mm;font-weight:700;font-size:12pt;color:#1a1a2e">' + e.ct + '</div>'
        + '<div style="margin-top:2mm;line-height:1.7;font-size:10pt">' + nl(e.body) + '</div></div>';
    });

    h += '<div style="font-size:7pt;color:#888;text-align:center;margin-top:2mm">출처: ' + d.sources + '</div>';
    h += '<div style="position:absolute;bottom:0;left:0;right:0;background:#1a1a2e;color:#fff;padding:3mm 8mm;display:flex;justify-content:space-between;font-size:8pt">'
      + '<span style="opacity:0.6">더몬스터학원 | 광주 계림동</span><span style="opacity:0.6">' + d.phone + '</span></div>';
    h += '</div>';

    h += '</body></html>';
    return h;
  };

  const genKakao = () => {
    var W = 720, H = 1080;
    var css = mapleFonts + '*{margin:0;padding:0;box-sizing:border-box}'
      + '@page{size:' + W + 'px ' + H + 'px;margin:0}'
      + 'body{margin:0;font-family:' + bodyFont + ';background:#fff}'
      + '.s{width:' + W + 'px;height:' + H + 'px;overflow:hidden;position:relative;page-break-after:always;margin:0 auto}'
      + '.t{font-family:' + titleFont + '}';
    var h = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>' + css + '</style></head><body>';

    // === 슬라이드 1: 표지 ===
    h += '<div class="s" style="background:linear-gradient(160deg,#0f0f23,#1a1a3e 50%,#2d1a0f);color:#fff;display:flex;flex-direction:column">'
      + '<div style="background:#d35400;padding:16px 36px;text-align:center;font-size:16px;font-weight:700;letter-spacing:3px">' + d.year + '년 ' + d.month + '월호 NEWSLETTER</div>'
      + '<div style="flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:40px 48px">'
      + '<div style="font-size:20px;letter-spacing:10px;opacity:0.35;margin-bottom:28px">THE MONSTER</div>'
      + '<div class="t" style="font-size:44px;font-weight:900;line-height:1.4;margin-bottom:32px;word-break:keep-all">' + d.hl.replace(/\n/g,'<br>') + '</div>'
      + '<div style="width:80px;height:4px;background:#d35400;border-radius:2px;margin-bottom:32px"></div>'
      + '<div style="font-size:22px;line-height:1.8;opacity:0.7">' + d.intro.replace(/\n/g,'<br>') + '</div>'
      + '</div>'
      + '<div style="background:rgba(0,0,0,0.5);padding:22px 36px;display:flex;justify-content:space-between;align-items:center">'
      + '<span style="font-size:18px;opacity:0.6">광주 계림동 더몬스터학원</span>'
      + '<span style="font-size:24px;font-weight:800;color:#e67e22">' + d.phone + '</span></div></div>';

    var imgs = [d.img1, d.img2, d.img3].filter(function(x) { return x; });

    // === 슬라이드 2: 학원 소식 ===
    h += '<div class="s" style="background:#fff;display:flex;flex-direction:column">'
      + '<div class="t" style="background:#1a1a2e;color:#fff;padding:16px 24px;text-align:center;font-size:28px;font-weight:800">이달의 학원 소식</div>'
      + '<div style="flex:1;padding:10px 12px;display:flex;flex-direction:column;gap:8px">'
      // 학습 FLOW
      + '<div style="background:#fff;border-radius:8px;padding:14px 16px;border-left:6px solid #d35400">'
      + '<div style="font-size:16px;color:#d35400;font-weight:800;margin-bottom:12px">학습 FLOW</div>'
      + '<div style="display:flex;gap:12px">'
      + '<div style="flex:1;background:#fef5ee;border-radius:10px;padding:16px"><div style="font-size:16px;color:#d35400;font-weight:700;margin-bottom:8px">초등부</div><div style="font-size:18px;line-height:1.5;color:#222">' + d.flow_elem + '</div></div>'
      + '<div style="flex:1;background:#eef2f7;border-radius:10px;padding:16px"><div style="font-size:16px;color:#2c3e50;font-weight:700;margin-bottom:8px">중고등부</div><div style="font-size:18px;line-height:1.5;color:#222">' + d.flow_mid + '</div></div>'
      + '</div></div>'
      // 월말테스트
      + '<div style="background:#fff;border-radius:8px;padding:14px 16px;border-left:6px solid #2c3e50">'
      + '<div style="font-size:16px;color:#2c3e50;font-weight:800;margin-bottom:10px">월말테스트 & 레포트</div>'
      + '<div style="font-size:20px;line-height:1.6;color:#222">' + d.test_desc + '</div></div>'
      // 교과서 코칭
      + '<div style="background:#fff;border-radius:8px;padding:14px 16px;border-left:6px solid #27ae60">'
      + '<div style="font-size:16px;color:#27ae60;font-weight:800;margin-bottom:10px">교과서 코칭</div>'
      + '<div style="font-size:20px;line-height:1.6;color:#222;margin-bottom:12px">' + d.coaching_desc + '</div>'
      + '<div style="display:flex;gap:8px;flex-wrap:wrap">' + d.coaching_subj.split(' / ').map(function(s) { return '<span style="background:#edf7ee;color:#27ae60;padding:6px 16px;border-radius:20px;font-size:16px;font-weight:700">' + s + '</span>'; }).join('') + '</div></div>'
      // 이미지
      + (imgs.length > 0 ? '<div style="display:flex;gap:8px">' + imgs.map(function(src) { return '<div style="flex:1;border-radius:8px;overflow:hidden"><img src="' + src + '" style="width:100%;display:block;border-radius:8px" /></div>'; }).join('') + '</div>' : '')
      // CTA
      + '<div style="background:linear-gradient(135deg,#d35400,#e67e22);color:#fff;border-radius:8px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center">'
      + '<span style="font-size:18px;font-weight:600">교육 상담</span><span style="font-size:26px;font-weight:900">' + d.phone + '</span></div>'
      + '</div></div>';

    // === 슬라이드 3: 일정 ===
    h += '<div class="s" style="background:#fff;display:flex;flex-direction:column">'
      + '<div class="t" style="background:#1a1a2e;color:#fff;padding:16px 24px;text-align:center;font-size:28px;font-weight:800">' + d.month + '월 주요 일정</div>'
      + '<div style="flex:1;padding:0;display:flex;flex-direction:column">'
      + d.schedules.map(function(s) {
        return '<div style="flex:1;display:flex;align-items:center;gap:16px;padding:0 20px;border-bottom:2px solid #f0f0f0">'
          + '<div style="background:#d35400;color:#fff;font-weight:900;padding:12px 18px;border-radius:12px;font-size:22px;min-width:60px;text-align:center">' + s.date + '</div>'
          + '<div style="flex:1;font-size:22px;font-weight:600;color:#222">' + s.event + '</div>'
          + (s.img ? '<div style="width:100px;height:70px;border-radius:8px;overflow:hidden;flex-shrink:0"><img src="' + s.img + '" style="width:100%;height:100%;object-fit:cover" /></div>' : '')
          + '</div>';
      }).join('')
      + '</div>'
      + '<div style="background:linear-gradient(135deg,#d35400,#e67e22);padding:22px 32px;display:flex;justify-content:space-between;align-items:center">'
      + '<div style="color:#fff"><div style="font-size:16px;opacity:0.8;margin-bottom:2px">교육 상담 문의</div><div style="font-size:26px;font-weight:900">' + d.phone + '</div></div>'
      + '<div style="color:#fff;text-align:right;font-size:16px;opacity:0.8">더몬스터학원<br>광주 계림동</div></div></div>';

    // === 슬라이드 4: 교육 정보 (각 항목 1줄 요약) ===
    h += '<div class="s" style="background:#1a1a2e;display:flex;flex-direction:column;color:#fff">'
      + '<div style="padding:32px 36px 0;text-align:center"><div style="font-size:18px;letter-spacing:6px;opacity:0.3;margin-bottom:12px">THE MONSTER</div>'
      + '<div class="t" style="font-size:32px;font-weight:800;margin-bottom:8px">학부모님을 위한 교육 정보</div>'
      + '<div style="width:60px;height:3px;background:#d35400;margin:0 auto"></div></div>'
      + '<div style="flex:1;padding:10px 16px;display:flex;flex-direction:column;justify-content:center;gap:8px">'
      + d.edu.map(function(e) {
        return '<div style="background:rgba(255,255,255,0.08);border-radius:8px;padding:14px 16px;border-left:5px solid ' + CM[e.lc] + '">'
          + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">'
          + '<span style="background:' + CM[e.lc] + ';color:#fff;padding:4px 14px;border-radius:20px;font-size:14px;font-weight:700">' + e.lb + '</span></div>'
          + '<div class="t" style="font-size:22px;font-weight:800;line-height:1.4;margin-bottom:8px">' + e.ct + '</div>'
          + '<div style="font-size:17px;line-height:1.6;opacity:0.75">' + e.body.replace(/\n/g,' ') + '</div></div>';
      }).join('')
      + '</div>'
      + '<div style="padding:20px 36px;text-align:center;font-size:14px;opacity:0.3">' + d.sources + '</div></div>';

    h += '</body></html>';
    return h;
  };

  const genDG = () => {
    var h = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>'
      + mapleFonts
      + 'body{margin:0;font-family:' + bodyFont + ';display:flex;justify-content:center;align-items:center;min-height:100vh;background:#fff}'
      + '.t{font-family:' + titleFont + '}'
      + '</style></head><body>';

    h += '<div style="width:1080px;height:1080px;background:#fff;position:relative;overflow:hidden;display:flex;flex-direction:column">';

    // 상단 헤더 (진한 네이비)
    h += '<div style="background:linear-gradient(135deg,#0f0f23,#1a1a3e);padding:32px 44px 28px;display:flex;justify-content:space-between;align-items:center">'
      + '<div><div style="font-size:14px;color:rgba(255,255,255,0.4);letter-spacing:6px;margin-bottom:6px">THE MONSTER</div>'
      + '<div class="t" style="font-size:34px;font-weight:900;color:#fff">' + d.year + '년 ' + d.month + '월 소식</div></div>'
      + '<div style="background:#d35400;color:#fff;padding:12px 28px;border-radius:30px;font-size:18px;font-weight:800">' + d.month + '월호</div></div>';

    // 메인 그리드 영역
    h += '<div style="flex:1;padding:12px 20px;display:flex;flex-direction:column;gap:10px">';

    // 상단 큰 카드 - 헤드라인
    h += '<div style="background:#fff;border-radius:16px;padding:28px 32px;border-left:6px solid #d35400;display:flex;align-items:center;gap:24px">'
      + '<div style="flex:1"><div style="font-size:13px;color:#d35400;font-weight:800;letter-spacing:2px;margin-bottom:6px">HEADLINE</div>'
      + '<div class="t" style="font-size:22px;font-weight:800;color:#1a1a2e;line-height:1.5;word-break:keep-all">' + d.hl.replace(/\n/g,'<br>') + '</div></div>'
      + '<div style="width:4px;height:60px;background:linear-gradient(to bottom,#d35400,transparent);border-radius:2px"></div></div>';

    // 3칸 카드 행
    h += '<div style="display:flex;gap:14px;flex:1">';

    // 학습 FLOW
    h += '<div style="flex:1;background:#fff;border-radius:16px;padding:24px;display:flex;flex-direction:column">'
      + '<div style="background:#fef5ee;color:#d35400;font-size:12px;font-weight:800;padding:4px 12px;border-radius:20px;display:inline-block;width:fit-content;margin-bottom:12px">학습 FLOW</div>'
      + '<div style="font-size:18px;font-weight:800;color:#1a1a2e;margin-bottom:12px">수업 흐름 관리</div>'
      + '<div style="font-size:13px;line-height:1.8;color:#444;flex:1">'
      + '<div style="margin-bottom:8px"><span style="color:#d35400;font-weight:700">초등</span><br>' + d.flow_elem + '</div>'
      + '<div><span style="color:#2c3e50;font-weight:700">중등</span><br>' + d.flow_mid + '</div></div></div>';

    // 월말테스트
    h += '<div style="flex:1;background:#fff;border-radius:16px;padding:24px;display:flex;flex-direction:column">'
      + '<div style="background:#eef2f7;color:#2c3e50;font-size:12px;font-weight:800;padding:4px 12px;border-radius:20px;display:inline-block;width:fit-content;margin-bottom:12px">월말테스트</div>'
      + '<div style="font-size:18px;font-weight:800;color:#1a1a2e;margin-bottom:12px">성적 레포트</div>'
      + '<div style="font-size:13px;line-height:1.8;color:#444;flex:1">' + d.test_desc + '</div>'
      + '<div style="margin-top:12px;background:#f8f8f8;border-radius:8px;padding:10px;text-align:center;font-size:12px;color:#666">매월 카톡으로 레포트 발송</div></div>';

    // 교과서 코칭
    h += '<div style="flex:1;background:#fff;border-radius:16px;padding:24px;display:flex;flex-direction:column">'
      + '<div style="background:#edf7ee;color:#27ae60;font-size:12px;font-weight:800;padding:4px 12px;border-radius:20px;display:inline-block;width:fit-content;margin-bottom:12px">교과서 코칭</div>'
      + '<div style="font-size:18px;font-weight:800;color:#1a1a2e;margin-bottom:12px">비수학 관리</div>'
      + '<div style="font-size:13px;line-height:1.8;color:#444;flex:1">' + d.coaching_desc + '</div>'
      + '<div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:6px">'
      + d.coaching_subj.split(' / ').map(function(s) { return '<span style="background:#edf7ee;color:#27ae60;padding:4px 10px;border-radius:12px;font-size:11px;font-weight:600">' + s + '</span>'; }).join('')
      + '</div></div>';

    h += '</div>';

    // 일정 행
    h += '<div style="background:#fff;border-radius:16px;padding:18px 28px;display:flex;align-items:center;gap:20px">'
      + '<div style="font-size:16px;font-weight:800;color:#1a1a2e;white-space:nowrap">' + d.month + '월 일정</div>'
      + '<div style="width:1px;height:30px;background:#ddd"></div>'
      + '<div style="display:flex;gap:16px;flex:1;overflow:hidden">'
      + d.schedules.map(function(s) {
        return '<div style="display:flex;align-items:center;gap:8px"><span style="color:#d35400;font-weight:800;font-size:14px">' + s.date + '</span><span style="font-size:13px;color:#555">' + s.event + '</span></div>';
      }).join('<div style="width:1px;height:20px;background:#eee"></div>')
      + '</div></div>';

    h += '</div>';

    // 하단 CTA 바
    h += '<div style="background:linear-gradient(135deg,#d35400,#e67e22);padding:24px 50px;display:flex;justify-content:space-between;align-items:center">'
      + '<div style="display:flex;align-items:center;gap:16px">'
      + '<div style="width:48px;height:48px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px">&#9742;</div>'
      + '<div><div style="color:rgba(255,255,255,0.8);font-size:13px">교육 상담 문의</div>'
      + '<div style="color:#fff;font-size:26px;font-weight:900">' + d.phone + '</div></div></div>'
      + '<div style="text-align:right;color:#fff"><div style="font-size:15px;font-weight:700">더몬스터학원</div>'
      + '<div style="font-size:12px;opacity:0.7">광주 계림동 그랜드센트럴 상가</div></div></div>';

    h += '</div></body></html>';
    return h;
  };

  const preview = (html) => { const w = window.open('', '_blank'); if (w) { w.document.write(html); w.document.close(); } };
  const dl = (html, name) => { const b = new Blob([html], { type: 'text/html;charset=utf-8' }); const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name; a.click(); };

  const ip = { padding: '9px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, width: '100%', boxSizing: 'border-box' };
  const ta = { ...ip, resize: 'vertical' };

  const tabs = [
    { k: 'basic', l: '기본 정보' },
    { k: 'content', l: '콘텐츠' },
    { k: 'schedule', l: '일정' },
    { k: 'edu', l: '교육 정보' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f0f0' }}>
      {/* Header */}
      <div style={{ background: '#1a1a2e', color: '#fff', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 20, fontWeight: 800 }}>THE MONSTER 소식지 생성기</span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, background: '#fff', borderBottom: '2px solid #ddd' }}>
        {tabs.map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} style={{
            padding: '12px 24px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14,
            background: tab === t.k ? '#d35400' : '#fff',
            color: tab === t.k ? '#fff' : '#333',
          }}>{t.l}</button>
        ))}
      </div>

      {/* Form */}
      <div style={{ maxWidth: 720, margin: '20px auto', padding: '0 16px' }}>
        {tab === 'basic' && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label>연도 <input style={ip} value={d.year} onChange={e => set('year', e.target.value)} /></label>
            <label>월 <input style={ip} value={d.month} onChange={e => set('month', e.target.value)} /></label>
            <label>전화번호 <input style={ip} value={d.phone} onChange={e => set('phone', e.target.value)} /></label>
            <label>헤드라인 <textarea style={ta} rows={3} value={d.hl} onChange={e => set('hl', e.target.value)} /></label>
            <label>인트로 <textarea style={ta} rows={4} value={d.intro} onChange={e => set('intro', e.target.value)} /></label>
          </div>
        )}

        {tab === 'content' && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <label><span style={{ color: '#d35400', fontWeight: 700 }}>초등 FLOW</span>
              <textarea style={ta} rows={2} value={d.flow_elem} onChange={e => set('flow_elem', e.target.value)} /></label>
            <label><span style={{ color: '#d35400', fontWeight: 700 }}>중등 FLOW</span>
              <textarea style={ta} rows={2} value={d.flow_mid} onChange={e => set('flow_mid', e.target.value)} /></label>
            <label><span style={{ color: '#2c3e50', fontWeight: 700 }}>월말테스트</span>
              <textarea style={ta} rows={2} value={d.test_desc} onChange={e => set('test_desc', e.target.value)} /></label>
            <label><span style={{ color: '#27ae60', fontWeight: 700 }}>교과서 코칭</span>
              <textarea style={ta} rows={2} value={d.coaching_desc} onChange={e => set('coaching_desc', e.target.value)} /></label>
            <label><span style={{ color: '#27ae60', fontWeight: 700 }}>코칭 과목</span>
              <input style={ip} value={d.coaching_subj} onChange={e => set('coaching_subj', e.target.value)} /></label>
            <div style={{ borderTop: '2px solid #eee', paddingTop: 12, marginTop: 4 }}>
              <div style={{ fontWeight: 700, marginBottom: 8, fontSize: 15 }}>사진 첨부</div>
              {['img1','img2','img3'].map((k, i) => (
                <div key={k} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#555' }}>사진 {i+1}</span>
                    <input type="file" accept="image/*" onChange={e => handleImg(k, e)} style={{ fontSize: 13 }} />
                    {d[k] && <button onClick={() => set(k, '')} style={{ background: '#c0392b', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: 'pointer', fontSize: 12 }}>삭제</button>}
                  </div>
                  {d[k] && <img src={d[k]} style={{ marginTop: 6, maxWidth: '100%', maxHeight: 120, borderRadius: 8, objectFit: 'cover' }} />}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'schedule' && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {d.schedules.map((s, i) => (
              <div key={i} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: s.img ? 8 : 0 }}>
                  <input style={{ ...ip, width: 100 }} placeholder="날짜" value={s.date} onChange={e => uSch(i, 'date', e.target.value)} />
                  <input style={{ ...ip, flex: 1 }} placeholder="일정" value={s.event} onChange={e => uSch(i, 'event', e.target.value)} />
                  <label style={{ background: '#2c3e50', color: '#fff', borderRadius: 8, padding: '8px 10px', cursor: 'pointer', fontSize: 12, whiteSpace: 'nowrap' }}>
                    사진
                    <input type="file" accept="image/*" onChange={e => handleSchImg(i, e)} style={{ display: 'none' }} />
                  </label>
                  <button onClick={() => rmSch(i)} style={{ background: '#c0392b', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 12px', cursor: 'pointer' }}>삭제</button>
                </div>
                {s.img && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <img src={s.img} style={{ height: 60, borderRadius: 6, objectFit: 'cover' }} />
                    <button onClick={() => uSch(i, 'img', '')} style={{ background: '#c0392b', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', fontSize: 11 }}>삭제</button>
                  </div>
                )}
              </div>
            ))}
            <button onClick={addSch} style={{ background: '#2c3e50', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', cursor: 'pointer', fontWeight: 700 }}>+ 일정 추가</button>
          </div>
        )}

        {tab === 'edu' && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* 뉴스 크롤링 버튼 */}
            <button onClick={fetchNews} disabled={newsLoading} style={{ background: 'linear-gradient(135deg,#2c3e50,#3498db)', color: '#fff', border: 'none', borderRadius: 8, padding: '14px', cursor: 'pointer', fontWeight: 700, fontSize: 15 }}>
              {newsLoading ? '교육 뉴스 가져오는 중...' : '최신 교육 뉴스 크롤링'}
            </button>

            {/* 뉴스 목록 */}
            {newsOpen && news.length > 0 && (
              <div style={{ border: '2px solid #3498db', borderRadius: 10, maxHeight: 400, overflow: 'auto' }}>
                <div style={{ background: '#2c3e50', color: '#fff', padding: '10px 16px', fontSize: 13, fontWeight: 700, position: 'sticky', top: 0 }}>
                  뉴스를 클릭하면 교육 정보에 추가됩니다 ({news.length}건)
                  <button onClick={() => setNewsOpen(false)} style={{ float: 'right', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 16 }}>X</button>
                </div>
                {news.map((item, i) => (
                  <div key={i} onClick={() => addNewsToEdu(item)} style={{ padding: '12px 16px', borderBottom: '1px solid #eee', cursor: 'pointer', fontSize: 13, lineHeight: 1.5 }}
                    onMouseOver={e => e.currentTarget.style.background = '#f0f7ff'}
                    onMouseOut={e => e.currentTarget.style.background = '#fff'}>
                    <div style={{ fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>{item.title}</div>
                    <div style={{ color: '#666', fontSize: 12 }}>{item.summary.slice(0, 100)}{item.summary.length > 100 ? '...' : ''}</div>
                    <div style={{ color: '#999', fontSize: 11, marginTop: 4 }}>{item.source} {item.date && '| ' + item.date}</div>
                  </div>
                ))}
              </div>
            )}
            {newsOpen && news.length === 0 && !newsLoading && (
              <div style={{ textAlign: 'center', color: '#999', padding: 20 }}>뉴스를 가져올 수 없습니다. 네트워크를 확인하세요.</div>
            )}

            {/* 기존 교육 정보 카드 */}
            {d.edu.map((e, i) => (
              <div key={e.id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, position: 'relative' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <select style={{ ...ip, width: 80 }} value={e.lc} onChange={ev => uEdu(i, 'lc', ev.target.value)}>
                    <option value="o">주황</option>
                    <option value="b">남색</option>
                    <option value="g">초록</option>
                    <option value="r">빨강</option>
                  </select>
                  <input style={{ ...ip, width: 100 }} value={e.lb} onChange={ev => uEdu(i, 'lb', ev.target.value)} placeholder="라벨" />
                  <button onClick={() => rmEdu(i)} style={{ background: '#c0392b', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', marginLeft: 'auto' }}>삭제</button>
                </div>
                <input style={{ ...ip, marginBottom: 8 }} value={e.ct} onChange={ev => uEdu(i, 'ct', ev.target.value)} placeholder="제목" />
                <textarea style={ta} rows={3} value={e.body} onChange={ev => uEdu(i, 'body', ev.target.value)} placeholder="내용" />
              </div>
            ))}
            <button onClick={addEdu} style={{ background: '#2c3e50', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', cursor: 'pointer', fontWeight: 700 }}>+ 교육 정보 추가</button>
            <label>출처 <input style={ip} value={d.sources} onChange={e => set('sources', e.target.value)} /></label>
          </div>
        )}

        {/* Export */}
        <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <button onClick={() => preview(genA4())} style={{ background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 20px', cursor: 'pointer', fontWeight: 700 }}>미리보기 A4</button>
          <button onClick={() => preview(genKakao())} style={{ background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 20px', cursor: 'pointer', fontWeight: 700 }}>미리보기 카톡</button>
          <button onClick={() => preview(genDG())} style={{ background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 20px', cursor: 'pointer', fontWeight: 700 }}>미리보기 당근</button>
          <button onClick={() => dl(genA4(), 'monster_a4.html')} style={{ background: '#333', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 20px', cursor: 'pointer', fontWeight: 700 }}>다운로드 A4</button>
          <button onClick={() => dl(genKakao(), 'monster_kakao.html')} style={{ background: '#FEE500', color: '#333', border: 'none', borderRadius: 8, padding: '12px 20px', cursor: 'pointer', fontWeight: 700 }}>다운로드 카톡</button>
          <button onClick={() => dl(genDG(), 'monster_danggeun.html')} style={{ background: '#d35400', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 20px', cursor: 'pointer', fontWeight: 700 }}>다운로드 당근</button>
        </div>
      </div>
    </div>
  );
}
