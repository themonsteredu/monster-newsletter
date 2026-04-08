export const dynamic = 'force-dynamic';

const FEEDS = [
  { name: '교육부 보도자료', url: 'https://www.moe.go.kr/boardCnts/listRss.do?boardID=294' },
  { name: '교육부 정책', url: 'https://www.moe.go.kr/boardCnts/listRss.do?boardID=316' },
  { name: 'EBS', url: 'https://www.ebs.co.kr/rss/pressRelease' },
];

const SEARCH_FEEDS = [
  { name: '네이버 교육뉴스', url: 'https://news.google.com/rss/search?q=%EA%B5%90%EC%9C%A1%EB%B6%80+%ED%95%99%EC%83%9D&hl=ko&gl=KR&ceid=KR:ko' },
  { name: '입시 뉴스', url: 'https://news.google.com/rss/search?q=%EC%9E%85%EC%8B%9C+%EA%B5%90%EC%9C%A1%EA%B3%BC%EC%A0%95+2026&hl=ko&gl=KR&ceid=KR:ko' },
  { name: '초등교육', url: 'https://news.google.com/rss/search?q=%EC%B4%88%EB%93%B1%ED%95%99%EA%B5%90+%EA%B5%90%EC%9C%A1&hl=ko&gl=KR&ceid=KR:ko' },
];

function parseItems(xml, source) {
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];
    const title = (block.match(/<title><!\[CDATA\[(.*?)\]\]>|<title>(.*?)<\/title>/) || [])[1] || (block.match(/<title>(.*?)<\/title>/) || [])[1] || '';
    const desc = (block.match(/<description><!\[CDATA\[(.*?)\]\]>|<description>(.*?)<\/description>/) || [])[1] || (block.match(/<description>(.*?)<\/description>/) || [])[1] || '';
    const link = (block.match(/<link>(.*?)<\/link>/) || [])[1] || '';
    const pubDate = (block.match(/<pubDate>(.*?)<\/pubDate>/) || [])[1] || '';
    const cleanTitle = title.replace(/<[^>]*>/g, '').trim();
    const cleanDesc = desc.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').trim();
    if (cleanTitle) {
      items.push({
        title: cleanTitle,
        summary: cleanDesc.slice(0, 200),
        source,
        date: pubDate ? new Date(pubDate).toLocaleDateString('ko-KR') : '',
        url: link,
      });
    }
  }
  return items;
}

async function fetchFeed(feed, timeout = 5000) {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    const res = await fetch(feed.url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    clearTimeout(timer);
    if (!res.ok) return [];
    const xml = await res.text();
    return parseItems(xml, feed.name);
  } catch {
    return [];
  }
}

export async function GET() {
  const allFeeds = [...FEEDS, ...SEARCH_FEEDS];
  const results = await Promise.all(allFeeds.map(f => fetchFeed(f)));
  const items = results.flat();

  // 중복 제거 (제목 기준)
  const seen = new Set();
  const unique = items.filter(item => {
    const key = item.title.slice(0, 30);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // 최신순 정렬, 최대 30개
  unique.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date) - new Date(a.date);
  });

  return Response.json({ items: unique.slice(0, 30) });
}
