window.addEventListener("load", () => {
  const canvas = document.getElementById("drawingArea");
  const ctx = canvas.getContext("2d");
  //初期canvasサイズ
  canvas.width = 1000 - 2;

  // レスポンシブサイズ処理
  const browserWidth = document.documentElement.clientWidth;
  function fitCanvas() {
    if (browserWidth <= 1024) {
      // margin: 0 5px
      canvas.width = browserWidth - 10 - 2;
    }
  }

  // canvasの背景色を設定する関数
  function setBgColor() {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  fitCanvas();
  setBgColor();

  // ここから描画処理
  // マウスの開始位置の記録用
  const mousePosition = { x: null, y: null };

  // ドラッグ状態のフラグ
  let isDrag = false;

  //線画色のデフォルトを黒にする
  let penColor = "black";

  // 線画色変更
  const penColorChange = document.getElementById("penColor");
  penColorChange.addEventListener(
    "change",
    () => {
      penColor = penColorChange.value;
    },
    false
  );

  // 線の幅変更
  let lineThickness = 7;
  const lineThickChange = document.getElementById("lineWidth");
  lineThickChange.addEventListener(
    "change",
    () => {
      lineThickness = lineThickChange.value;
    },
    false
  );

  // 描画用関数
  function draw(x, y) {
    // ドラッグしてないときは何もしない
    if (!isDrag) {
      return;
    }
    ctx.lineCap = "round"; // 線の末端
    ctx.lineJoin = "round"; // 線の合流地点
    ctx.lineWidth = lineThickness; // 線の幅
    ctx.strokeStyle = penColor; // 線の色
    if (mousePosition.x === null || mousePosition.y === null) {
      // ドラッグ開始時の線の開始位置
      ctx.moveTo(x, y);
    } else {
      // ドラッグ中の線の開始位置
      ctx.moveTo(mousePosition.x, mousePosition.y);
    }
    ctx.lineTo(x, y);
    ctx.stroke();
    mousePosition.x = x;
    mousePosition.y = y;
  }

  // canvasを真っ白にする関数
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setBgColor();
  }

  // 消しゴム関数
  const eraserButton = document.getElementById("eraser-btn");
  function erase() {
    if (penColor !== "white") {
      penColor = "white";
      eraserButton.innerHTML = "ペンにする";
    } else {
      penColor = penColorChange.value;
      eraserButton.innerHTML = "消しゴムにする";
    }
  }

  // ドラッグを開始したときの関数の定義
  function dragStart() {
    ctx.beginPath();
    isDrag = true;
  }

  // ドラッグを終了したときの関数の定義
  function dragEnd() {
    ctx.closePath();
    isDrag = false;
    mousePosition.x = null;
    mousePosition.y = null;
  }

  // それぞれのアクションごとに関数を呼び出す
  function actionEvent() {
    const clearButton = document.getElementById("clear-btn");
    clearButton.addEventListener("click", clearCanvas);
    eraserButton.addEventListener("mousedown", erase);
    canvas.addEventListener("mousedown", dragStart);
    canvas.addEventListener("mouseup", dragEnd);
    canvas.addEventListener("mouseout", dragEnd);
    canvas.addEventListener("mousemove", (e) => {
      draw(e.layerX, e.layerY);
    });
  }

  actionEvent();

  // 画像にする
  $("#download-btn").on("click", function () {
    const canvas = document.getElementById("drawingArea");
    const base64 = canvas.toDataURL("image/jpeg");
    document.getElementById("download-btn").href = base64;
  });
});
