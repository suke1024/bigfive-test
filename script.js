/* ==========================================================
   1. 質問50個（IPIP-50）＋ドメイン＋逆転項目
   ========================================================== */
const items = [
  // ---- Neuroticism（神経症傾向）----
  { id: 1,  text: "気分が落ち込むことが多い。", domain: "N", reverse: false },
  { id: 2,  text: "めったにイライラしません。",         domain: "N", reverse: true  },
  { id: 3,  text: "自分自身が嫌いです。",               domain: "N", reverse: false },
  { id: 4,  text: "めったに憂鬱な気分にならない。",     domain: "N", reverse: true  },
  { id: 5,  text: "よく落ち込んでしまいます。",         domain: "N", reverse: false },
  { id: 6,  text: "物事に簡単に悩まされることはありません。", domain: "N", reverse: true },
  { id: 7,  text: "気分の変動が激しい。",               domain: "N", reverse: false },
  { id: 8,  text: "自分自身にとても満足しています。",   domain: "N", reverse: true  },
  { id: 9,  text: "すぐにパニックになります。",         domain: "N", reverse: false },
  { id: 10, text: "めったに不安にならない。",           domain: "N", reverse: true  },

  // ---- Extraversion（外向性）----
  { id: 11, text: "人と話すのが好きだ。", domain: "E", reverse: false },
  { id: 12, text: "一人でいることが好きだ。", domain: "E", reverse: true },
  { id: 13, text: "活気にあふれている。", domain: "E", reverse: false },
  { id: 14, text: "静かに過ごす方が好ましい。", domain: "E", reverse: true },
  { id: 15, text: "社交的である。", domain: "E", reverse: false },
  { id: 16, text: "大勢の場が苦手だ。", domain: "E", reverse: true },
  { id: 17, text: "積極的に他人に関わる。", domain: "E", reverse: false },
  { id: 18, text: "知らない人と話すのが苦痛だ。", domain: "E", reverse: true },
  { id: 19, text: "自分から話しかけることが多い。", domain: "E", reverse: false },
  { id: 20, text: "人と関わるのが億劫だ。", domain: "E", reverse: true },

  // ---- Openness（開放性）----
  { id: 21, text: "新しいことに興味がある。", domain: "O", reverse: false },
  { id: 22, text: "慣れたやり方だけを好む。", domain: "O", reverse: true },
  { id: 23, text: "芸術的なものに惹かれる。", domain: "O", reverse: false },
  { id: 24, text: "抽象的なことに興味がない。", domain: "O", reverse: true },
  { id: 25, text: "創造的だと言われる。", domain: "O", reverse: false },
  { id: 26, text: "想像力豊かではない。", domain: "O", reverse: true },
  { id: 27, text: "新しいアイデアを考えるのが好きだ。", domain: "O", reverse: false },
  { id: 28, text: "革新的なものに興味がない。", domain: "O", reverse: true },
  { id: 29, text: "多様な価値観に触れるのが好きだ。", domain: "O", reverse: false },
  { id: 30, text: "自分の考えを変えることはあまりない。", domain: "O", reverse: true },

  // ---- Agreeableness（協調性）----
  { id: 31, text: "他人に優しい方だ。", domain: "A", reverse: false },
  { id: 32, text: "人に冷たい方だ。", domain: "A", reverse: true },
  { id: 33, text: "思いやりがあると言われる。", domain: "A", reverse: false },
  { id: 34, text: "他人の気持ちに無頓着だ。", domain: "A", reverse: true },
  { id: 35, text: "困っている人を見ると助けたくなる。", domain: "A", reverse: false },
  { id: 36, text: "人を信頼しない。", domain: "A", reverse: true },
  { id: 37, text: "協力的である。", domain: "A", reverse: false },
  { id: 38, text: "人と競争したがる。", domain: "A", reverse: true },
  { id: 39, text: "礼儀正しい。", domain: "A", reverse: false },
  { id: 40, text: "人を批判しがちだ。", domain: "A", reverse: true },

  // ---- Conscientiousness（誠実性）----
  { id: 41, text: "計画的に行動する。", domain: "C", reverse: false },
  { id: 42, text: "行き当たりばったりで動く。", domain: "C", reverse: true },
  { id: 43, text: "責任感がある。", domain: "C", reverse: false },
  { id: 44, text: "物事を先延ばしにしがちだ。", domain: "C", reverse: true },
  { id: 45, text: "几帳面な方だ。", domain: "C", reverse: false },
  { id: 46, text: "面倒なことは避けたい。", domain: "C", reverse: true },
  { id: 47, text: "目標に向かって努力する。", domain: "C", reverse: false },
  { id: 48, text: "集中力が続かない。", domain: "C", reverse: true },
  { id: 49, text: "やるべきことをやり遂げる。", domain: "C", reverse: false },
  { id: 50, text: "途中で投げ出すことがある。", domain: "C", reverse: true }
];

/* ==========================================================
   2. 質問をHTMLに自動生成
========================================================== */
function renderQuestions() {
  const container = document.getElementById("questions");
  container.innerHTML = "";

  items.forEach(item => {
    container.innerHTML += `
      <div class="question">
        <p>${item.id}. ${item.text}</p>
        <label><input type="radio" name="q${item.id}" value="1"> 全く当てはまらない</label>
        <label><input type="radio" name="q${item.id}" value="2"> 当てはまらない</label>
        <label><input type="radio" name="q${item.id}" value="3"> どちらでもない</label>
        <label><input type="radio" name="q${item.id}" value="4"> 当てはまる</label>
        <label><input type="radio" name="q${item.id}" value="5"> とても当てはまる</label>
      </div>
    `;
  });
}

/* ==========================================================
   3. 回答取得（逆転項目処理つき）
========================================================== */
function getAnswers() {
  const answers = {};

  items.forEach(item => {
    const val = Number(
      document.querySelector(`input[name="q${item.id}"]:checked`)?.value
    );
    if (!val) {
      answers[item.id] = null;
      return;
    }
    // 逆転項目は 6 - val
    answers[item.id] = item.reverse ? 6 - val : val;
  });

  return answers;
}

/* ==========================================================
   4. 因子スコア（0〜40）を計算
      素点10〜50 → 0〜40（素点 −10）
========================================================== */
function calcDomainScores(answers) {
  const domainRaw = { N: 0, E: 0, O: 0, A: 0, C: 0 };

  items.forEach(item => {
    domainRaw[item.domain] += answers[item.id];
  });

  const to40 = (raw) => raw - 10; // 10〜50 → 0〜40

  return {
    N: to40(domainRaw.N),
    E: to40(domainRaw.E),
    O: to40(domainRaw.O),
    A: to40(domainRaw.A),
    C: to40(domainRaw.C)
  };
}

/* ==========================================================
   5. 提出ボタン押下時：スコアを保存して結果ページへ遷移
========================================================== */
function handleSubmit() {
  const answers = getAnswers();

  if (Object.values(answers).includes(null)) {
    alert("未回答の項目があります。");
    return;
  }

  const scores = calcDomainScores(answers);

  // localStorage に保存（0〜40スケール）
  localStorage.setItem("big5Scores", JSON.stringify(scores));

  // 結果ページへ遷移（ファイル名は好きに変えてOK）
  window.location.href = "result.html";
}

// ページ読み込み時に質問生成
window.onload = renderQuestions;
