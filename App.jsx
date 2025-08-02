import { useState } from "react";

const sampleEvents = [
  {
    id: 1,
    center: "大同親子館",
    title: "寶寶音樂啟蒙(1)",
    date: "2025/08/06",
    time: "10:00 ~ 10:40",
    ageRange: "滿 六個月 ~ 未滿 一歲",
    link: "https://welfare.gov.taipei/Kids/ParentChild/ParentChildActivityDetail/44371",
  },
  {
    id: 2,
    center: "北投親子館",
    title: "親子藝起玩-音樂",
    date: "2025/08/05",
    time: "11:00 ~ 12:00",
    ageRange: "滿 六個月 ~ 未滿 四歲",
    link: "https://welfare.gov.taipei/Kids/ParentChild/ParentChildActivityDetail/44006",
  },
  // 可加入更多範例活動
];

function parseAgeRange(range) {
  const match = range.match(/(\d+)\s*個月|滿\s*(\d+)\s*歲/g);
  if (!match) return [0, 999];

  const toMonths = (str) => {
    if (str.includes("歲")) return parseInt(str) * 12;
    if (str.includes("個月")) return parseInt(str);
    return 0;
  };
  const nums = match.map(toMonths);
  return [nums[0], nums[1] ?? 999];
}

export default function ParentCenterEvents() {
  const [selectedAge, setSelectedAge] = useState(9); // 預設9個月大

  const filtered = sampleEvents.filter((event) => {
    const [min, max] = parseAgeRange(event.ageRange);
    return selectedAge >= min && selectedAge <= max;
  });

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">台北市親子館活動一覽</h1>

      <div>
        <label htmlFor="age" className="mr-2 font-medium">
          寶寶月齡：
        </label>
        <select
          id="age"
          className="border rounded p-1"
          value={selectedAge}
          onChange={(e) => setSelectedAge(parseInt(e.target.value))}
        >
          {[...Array(60)].map((_, i) => (
            <option key={i} value={i}>
              {i} 個月
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4">
        {filtered.map((event) => (
          <div
            key={event.id}
            className="rounded-xl shadow p-4 border hover:shadow-md transition"
          >
            <div className="text-sm text-gray-500">{event.center}</div>
            <div className="text-lg font-semibold">{event.title}</div>
            <div>
              🗓️ {event.date}　🕒 {event.time}
            </div>
            <div>👶 適齡：{event.ageRange}</div>
            <a
              href={event.link}
              target="_blank"
              className="text-blue-600 underline text-sm mt-1 inline-block"
              rel="noreferrer"
            >
              查看詳情
            </a>
          </div>
        ))}
        {filtered.length === 0 && <div>（這個月齡沒有適合的活動）</div>}
      </div>
    </div>
  );
}
