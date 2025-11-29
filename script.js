// ===========================
// 1. 質問データ
// ===========================
const questions = [
  { id: 1, text: "他人の気持ちを察するのが得意だと思う。" },
  { id: 2, text: "物事を計画的に進める方だ。" },
  { id: 3, text: "人前で話すのが好きだ。" },
  { id: 4, text: "新しいアイデアを考えるのが好きだ。" },
  { id: 5, text: "しばしば不安を感じる。" },
  // ……中略：50問分をここに入れていく
];

// ===========================
// 2. 因子ごとの項目ID
// ===========================
// ここは前の回答で整理したビッグファイブの対応をそのまま使う
const factors = {
  Extraversion:  [3, 8, 13, 18, 23, 28, 33, 38, 43, 48],
  Agreeableness: [1, 6, 11, 16, 21, 26, 31, 36, 41, 46],
  Conscientiousness: [2, 7, 12, 17, 22, 27, 32, 37, 42, 47],
  Neuroticism:   [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
  Openness:      [4, 9, 14, 19, 24, 29, 34, 39, 44, 49],
};

// ===========================
// 3. 質問の描画
// ===========================
const questionsContainer = document.getElementById("questions");

questions.forEach(q => {
  const wrapper = document.createElement("div");
  wrapper.className = "question";

  const label = document.createElement("label");
  label.className = "question-label";
  label.textContent = `${q.id}. ${q.text}`;
  wrapper.appendChild(label);

  const options = document.createElement("div");
  options.className = "options";

  for (let i = 1; i <= 5; i++) {
    const optionLabel = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = `q${q.id}`;
    input.value = i;
    optionLabel.appendChild(input);
    optionLabel.append(` ${i}`);
    options.appendChild(optionLabel);
  }

  wrapper.appendChild(options);
  questionsContainer.appendChild(wrapper);
});

// ===========================
// 4. スコア計算
// ===========================
function calcFactorScore(answers, itemIds) {
  let sum = 0;
  itemIds.forEach(id => {
    sum += answers[id] || 0;
  });
  return sum;
}

function toPercent(score) {
  // 最低10点〜最高50点を 0〜100 にマッピング
  return Math.round(((score - 10) / 40) * 100);
}

const form = document.getElementById("quiz-form");
const resultSection = document.getElementById("result");
const scoresDiv = document.getElementById("scores");
const typeDiv = document.getElementById("type-description");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // 1〜50問の回答を集める
  const answers = {};
  for (let i = 1; i <= questions.length; i++) {
    const checked = document.querySelector(`input[name="q${i}"]:checked`);
    if (!checked) {
      alert(`${i}問目が未回答です`);
      return;
    }
    answers[i] = Number(checked.value);
  }

  // 因子スコアを計算
  const scores = {};
  for (const [factorName, itemIds] of Object.entries(factors)) {
    const raw = calcFactorScore(answers, itemIds);
    const percent = toPercent(raw);
    scores[factorName] = { raw, percent };
  }

  // 結果を表示
  scoresDiv.innerHTML = "";
  for (const [name, { raw, percent }] of Object.entries(scores)) {
    const p = document.createElement("p");
    const jpName = {
      Extraversion: "外向性",
      Agreeableness: "協調性",
      Conscientiousness: "誠実性",
      Neuroticism: "神経症傾向",
      Openness: "開放性",
    }[name];

    p.textContent = `${jpName}: 生スコア ${raw} / 50（偏差 ${percent} / 100）`;
    scoresDiv.appendChild(p);
  }

  // 簡単なタイプ診断例（ここは自由に拡張）
  typeDiv.innerHTML = makeTypeDescription(scores);

  resultSection.classList.remove("hidden");
});

// 簡単なタイプ分類の例
function makeTypeDescription(scores) {
  const e = scores.Extraversion.percent;
  const c = scores.Conscientiousness.percent;
  const o = scores.Openness.percent;
  const a = scores.Agreeableness.percent;
  const n = scores.Neuroticism.percent;

  let title = "";
  let text = "";

  if (e >= 60 && o >= 60) {
    title = "アイデア豊富な社交クリエイタータイプ";
    text = "人と話しながら新しい発想を生み出すのが得意なタイプです。企画職やPM、広告・イベントなどで力を発揮しやすい傾向があります。";
  } else if (e < 40 && o >= 60) {
    title = "静かな思索家・リサーチャータイプ";
    text = "一人でじっくり考えたり、深く調べたりすることが得意です。研究、データ分析、設計、ライティングなどで活躍しやすい傾向があります。";
  } else {
    title = "バランス型・オールラウンダータイプ";
    text = "どの特性も極端ではなく、さまざまな環境に適応できる柔軟なタイプです。チームの調整役や、越境的なキャリアにも向いています。";
  }

  if (n >= 60) {
    text += "<br><br>一方で、ストレスや不安を感じやすい面もあります。休息やセルフケアの時間を意識して取ることで、パフォーマンスを維持しやすくなります。";
  } else if (n <= 40) {
    text += "<br><br>感情が安定していて、周囲の人に安心感を与える存在になりやすいでしょう。";
  }

  return `<h3>${title}</h3><p>${text}</p>`;
}
