/* ============================================
   TIPI-J 平均値（論文 Table3）
============================================ */
const MEAN = {
  E: 7.83,
  A: 9.48,
  C: 6.14,
  N: 9.21,
  O: 8.03
};

/* ============================================
   TIPI-J 分布データ（論文 Figure1 近似）
============================================ */
const HIST_DATA = {
  E: [5, 15, 30, 50, 70, 95, 120, 130, 110, 90, 60, 40, 20],
  A: [2, 8, 20, 45, 80, 120, 150, 140, 100, 60, 25, 10, 4],
  C: [10, 25, 60, 100, 150, 140, 100, 60, 30, 15, 8, 4, 2],
  N: [8, 20, 40, 70, 110, 150, 140, 100, 60, 30, 15, 8, 3],
  O: [5, 10, 25, 60, 100, 140, 160, 140, 100, 60, 30, 10, 4]
};

/* スコア変換（0〜40 → 2〜14） */
function toTIPI(score40) {
  return 2 + (score40 / 40) * 12;
}

/* 特性名 */
function traitName(key) {
  return {
    E: "外向性",
    A: "協調性",
    C: "勤勉性 / 誠実性",
    N: "神経症傾向",
    O: "開放性"
  }[key];
}

/* ============================================
   カード作成
============================================ */
function createCard(domain, myScore) {
  const tipi = toTIPI(myScore).toFixed(2);
  const mean = MEAN[domain].toFixed(2);
  const trait = traitName(domain);

  const card = document.createElement("div");
  card.className = "result-card";

  card.innerHTML = `
    <div class="result-title">${trait}</div>
    <div class="result-sub">平均：${mean}　あなた：${tipi}</div>
    <canvas id="canvas_${domain}" class="card-canvas"></canvas>
  `;

  document.getElementById("resultCards").appendChild(card);
  drawSmallChart(domain, myScore, `canvas_${domain}`);
}

/* ============================================
   小型グラフ描画
============================================ */
function drawSmallChart(domain, myScore, canvasId) {
  const ctx = document.getElementById(canvasId);
  const tipiValue = toTIPI(myScore);

  const colorBars = HIST_DATA[domain].map((v, i) => {
    const bin = i + 2;
    return Math.abs(bin - tipiValue) < 0.5
      ? "rgba(255,80,80,1)"
      : "rgba(100,100,100,0.8)";
  });

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["2","3","4","5","6","7","8","9","10","11","12","13","14"],
      datasets: [{
        data: HIST_DATA[domain],
        backgroundColor: colorBars
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,  /* ← CSSの高さを優先 */
      scales: {
        y: { display: false },
        x: { display: false }
      },
      plugins: {
        legend: { display: false }
      }
    }
  });
}

/* ============================================
   メイン処理
============================================ */
const scores = JSON.parse(localStorage.getItem("big5Scores"));
Object.keys(scores).forEach(key => createCard(key, scores[key]));

/* ============================================
   SNS共有
============================================ */

/* LINE */
document.getElementById("shareLINE").onclick = () => {
  const url = encodeURIComponent(location.href);
  const text = encodeURIComponent("ビッグファイブ診断の結果はこちら！");
  location.href = `https://line.me/R/msg/text/?${text}%0D%0A${url}`;
};

/* X（Twitter） */
document.getElementById("shareX").onclick = () => {
  const url = encodeURIComponent(location.href);
  const text = encodeURIComponent("ビッグファイブ診断の結果をシェア！");
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
};

/* Instagram（スクショ保存） */
document.getElementById("shareIG").onclick = () => {
  const target = document.getElementById("shareArea");
  html2canvas(target, { scale: 2 }).then(canvas => {
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "bigfive_instagram_card.png";
    a.click();
    alert("画像が保存されました！Instagramで投稿できます📷✨");
  });
};
