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
  schedules: [
    { date: '5/1', event: '어린이날 행사 + 창의수학 퀴즈대회' },
    { date: '5/4', event: '학원 휴무일' },
    { date: '5/5', event: '어린이날 휴원' },
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
  const set = (k, v) => setD(p => ({ ...p, [k]: v }));

  const addSch = () => set('schedules', [...d.schedules, { date: '', event: '' }]);
  const rmSch = (i) => set('schedules', d.schedules.filter((_, j) => j !== i));
  const uSch = (i, f, v) => { const a = [...d.schedules]; a[i] = { ...a[i], [f]: v }; set('schedules', a); };

  const addEdu = () => set('edu', [...d.edu, { id: mk(), lb: '라벨', lc: 'b', ct: '제목', body: '내용' }]);
  const rmEdu = (i) => { if (d.edu.length <= 1) return; set('edu', d.edu.filter((_, j) => j !== i)); };
  const uEdu = (i, f, v) => { const a = [...d.edu]; a[i] = { ...a[i], [f]: v }; set('edu', a); };

  const nl = (t) => t.split('\n').filter(Boolean).map(l => '<p style="margin-bottom:3mm">' + l + '</p>').join('');
  const schRows = d.schedules.map(s => '<tr><td><b>' + s.date + '</b></td><td>' + s.event + '</td></tr>').join('');

  const genA4 = () => {
    var h = '<!DOCTYPE html><html><head><meta charset="utf-8">'
      + '<style>'
      + '@page{size:A4;margin:0}'
      + 'body{margin:0;font-family:"Pretendard",sans-serif;color:#222}'
      + '.pg{width:210mm;min-height:297mm;position:relative;overflow:hidden;page-break-after:always}'
      + '.cd{background:#fff;border:2px solid #333;border-radius:4mm;padding:6mm;position:relative;margin-bottom:4mm}'
      + '.lb{position:absolute;top:-1px;left:12px;padding:2px 10px;color:#fff;font-size:11px;font-weight:700;border-radius:0 0 6px 6px}'
      + '</style></head><body>';

    // Page 1 - Cover
    h += '<div class="pg" style="background:#1a1a2e;color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:20mm">'
      + '<div style="font-size:14pt;letter-spacing:6px;opacity:0.6;margin-bottom:8mm">THE MONSTER</div>'
      + '<div style="display:inline-block;background:#d35400;color:#fff;padding:3mm 8mm;border-radius:99px;font-size:13pt;font-weight:700;margin-bottom:10mm">'
      + d.year + '년 ' + d.month + '월호</div>'
      + '<div style="font-size:22pt;font-weight:800;line-height:1.5;margin-bottom:10mm">' + nl(d.hl) + '</div>'
      + '<div style="font-size:12pt;line-height:1.8;opacity:0.85">' + nl(d.intro) + '</div>'
      + '<div style="position:absolute;bottom:15mm;font-size:10pt;opacity:0.5">☎ ' + d.phone + '</div>'
      + '</div>';

    // Page 2 - News
    h += '<div class="pg" style="padding:10mm">'
      + '<div style="text-align:center;margin-bottom:6mm"><span style="font-size:16pt;font-weight:800">📰 이달의 학원 소식</span></div>';

    // Card 1 - 학습 FLOW
    h += '<div class="cd"><div class="lb" style="background:#d35400">학습 FLOW</div>'
      + '<div style="margin-top:5mm"><b>초등부</b><br>' + d.flow_elem + '</div>'
      + '<div style="margin-top:3mm"><b>중등부</b><br>' + d.flow_mid + '</div></div>';

    // Card 2 - 월말테스트
    h += '<div class="cd"><div class="lb" style="background:#2c3e50">월말테스트</div>'
      + '<div style="margin-top:5mm">' + d.test_desc + '</div></div>';

    // Card 3 - 교과서 코칭
    h += '<div class="cd"><div class="lb" style="background:#27ae60">교과서 코칭</div>'
      + '<div style="margin-top:5mm">' + d.coaching_desc + '</div>'
      + '<div style="margin-top:2mm;color:#555">대상 과목: ' + d.coaching_subj + '</div></div>';

    // Schedule table
    h += '<div class="cd"><div class="lb" style="background:#c0392b">일정</div>'
      + '<table style="width:100%;margin-top:5mm;border-collapse:collapse;font-size:10pt">'
      + schRows + '</table></div>';

    // CTA bar
    h += '<div style="background:#d35400;color:#fff;text-align:center;padding:4mm;border-radius:4mm;font-weight:700">'
      + '문의 및 상담 ☎ ' + d.phone + '</div>';
    h += '</div>';

    // Page 3 - Education info
    h += '<div class="pg" style="padding:10mm">'
      + '<div style="text-align:center;margin-bottom:6mm"><span style="font-size:16pt;font-weight:800">📚 교육 정보</span></div>';

    d.edu.forEach(function(e) {
      h += '<div class="cd"><div class="lb" style="background:' + CM[e.lc] + '">' + e.lb + '</div>'
        + '<div style="margin-top:5mm;font-weight:700;font-size:12pt">' + e.ct + '</div>'
        + '<div style="margin-top:3mm;line-height:1.7">' + nl(e.body) + '</div></div>';
    });

    h += '<div style="margin-top:4mm;font-size:8pt;color:#888;text-align:center">출처: ' + d.sources + '</div>';
    h += '</div>';

    h += '</body></html>';
    return h;
  };

  const genKakao = () => {
    var css = 'body{margin:0;font-family:"Pretendard",sans-serif}'
      + '.slide{width:720px;height:1080px;position:relative;overflow:hidden;page-break-after:always}'
      + '.cd{background:#fff;border:2px solid #333;border-radius:16px;padding:24px;position:relative;margin-bottom:16px}'
      + '.lb{position:absolute;top:-1px;left:12px;padding:2px 10px;color:#fff;font-size:11px;font-weight:700;border-radius:0 0 6px 6px}';

    var h = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>' + css + '</style></head><body>';

    // Slide 1 - Cover
    h += '<div class="slide" style="background:#1a1a2e;color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;padding:60px">'
      + '<div style="font-size:18px;letter-spacing:6px;opacity:0.6;margin-bottom:30px">THE MONSTER</div>'
      + '<div style="display:inline-block;background:#d35400;color:#fff;padding:12px 32px;border-radius:99px;font-size:20px;font-weight:700;margin-bottom:40px">'
      + d.year + '년 ' + d.month + '월호</div>'
      + '<div style="font-size:32px;font-weight:800;line-height:1.5">' + nl(d.hl) + '</div>'
      + '</div>';

    // Slide 2 - News cards
    h += '<div class="slide" style="background:#f5f5f5;padding:40px">'
      + '<div style="text-align:center;margin-bottom:20px;font-size:24px;font-weight:800">📰 이달의 소식</div>';

    h += '<div class="cd"><div class="lb" style="background:#d35400">학습 FLOW</div>'
      + '<div style="margin-top:20px"><b>초등부</b> ' + d.flow_elem + '</div>'
      + '<div style="margin-top:8px"><b>중등부</b> ' + d.flow_mid + '</div></div>';

    h += '<div class="cd"><div class="lb" style="background:#2c3e50">월말테스트</div>'
      + '<div style="margin-top:20px">' + d.test_desc + '</div></div>';

    h += '<div class="cd"><div class="lb" style="background:#27ae60">교과서 코칭</div>'
      + '<div style="margin-top:20px">' + d.coaching_desc + '</div></div>';
    h += '</div>';

    // Slide 3 - Schedule + CTA
    h += '<div class="slide" style="background:#f5f5f5;padding:40px">'
      + '<div style="text-align:center;margin-bottom:20px;font-size:24px;font-weight:800">📅 일정 안내</div>'
      + '<div class="cd"><table style="width:100%;border-collapse:collapse;font-size:16px">' + schRows + '</table></div>'
      + '<div style="background:#d35400;color:#fff;text-align:center;padding:20px;border-radius:16px;font-size:20px;font-weight:700;margin-top:20px">'
      + '문의 ☎ ' + d.phone + '</div>'
      + '</div>';

    h += '</body></html>';
    return h;
  };

  const genDG = () => {
    var h = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>'
      + 'body{margin:0;font-family:"Pretendard",sans-serif}'
      + '</style></head><body>';

    h += '<div style="width:1080px;height:1080px;background:#1a1a2e;color:#fff;position:relative;padding:60px;box-sizing:border-box;display:flex;flex-direction:column">';

    // Header
    h += '<div style="text-align:center;margin-bottom:30px">'
      + '<div style="font-size:16px;letter-spacing:4px;opacity:0.5">THE MONSTER</div>'
      + '<div style="font-size:36px;font-weight:800;margin-top:10px">' + d.year + '년 ' + d.month + '월 소식</div></div>';

    // 2x2 grid
    h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;flex:1">';

    h += '<div style="background:#fff;color:#222;border-radius:16px;padding:24px">'
      + '<div style="color:#d35400;font-weight:700;margin-bottom:8px">학습 FLOW</div>'
      + '<div style="font-size:14px;line-height:1.6"><b>초등</b> ' + d.flow_elem + '<br><b>중등</b> ' + d.flow_mid + '</div></div>';

    h += '<div style="background:#fff;color:#222;border-radius:16px;padding:24px">'
      + '<div style="color:#2c3e50;font-weight:700;margin-bottom:8px">월말테스트</div>'
      + '<div style="font-size:14px;line-height:1.6">' + d.test_desc + '</div></div>';

    h += '<div style="background:#fff;color:#222;border-radius:16px;padding:24px">'
      + '<div style="color:#27ae60;font-weight:700;margin-bottom:8px">교과서 코칭</div>'
      + '<div style="font-size:14px;line-height:1.6">' + d.coaching_desc + '</div></div>';

    h += '<div style="background:#fff;color:#222;border-radius:16px;padding:24px">'
      + '<div style="color:#c0392b;font-weight:700;margin-bottom:8px">일정</div>'
      + '<div style="font-size:14px;line-height:1.6">' + d.schedules.map(function(s) { return '<b>' + s.date + '</b> ' + s.event; }).join('<br>') + '</div></div>';

    h += '</div>';

    // Footer bar
    h += '<div style="background:#d35400;text-align:center;padding:16px;border-radius:12px;margin-top:20px;font-size:18px;font-weight:700">'
      + '문의 ☎ ' + d.phone + '</div>';

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
          </div>
        )}

        {tab === 'schedule' && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {d.schedules.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input style={{ ...ip, width: 100 }} placeholder="날짜" value={s.date} onChange={e => uSch(i, 'date', e.target.value)} />
                <input style={{ ...ip, flex: 1 }} placeholder="일정" value={s.event} onChange={e => uSch(i, 'event', e.target.value)} />
                <button onClick={() => rmSch(i)} style={{ background: '#c0392b', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 12px', cursor: 'pointer' }}>삭제</button>
              </div>
            ))}
            <button onClick={addSch} style={{ background: '#2c3e50', color: '#fff', border: 'none', borderRadius: 8, padding: '10px', cursor: 'pointer', fontWeight: 700 }}>+ 일정 추가</button>
          </div>
        )}

        {tab === 'edu' && (
          <div style={{ background: '#fff', borderRadius: 12, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
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
