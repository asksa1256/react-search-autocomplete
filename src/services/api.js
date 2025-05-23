export async function getData() {
  const response = await fetch("/data/dummyData.json");
  if (!response.ok) throw new Error("데이터를 불러오지 못했습니다.");

  const body = await response.json();
  return body;
}
