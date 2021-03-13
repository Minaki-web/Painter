window.addEventListener("load", () => {
  const canvas = document.getElementById("drawingArea");
  const ctx = canvas.getContext("2d");
  // ここからリサイズ処理
  canvas.width = 1000 - 2;
  function fitCanvas() {
    // margin: 0 10px
    canvas.width = document.documentElement.clientWidth - 20 - 2;

    // 1000px以上にしない
    if (canvas.width > 1000) {
      canvas.width = 1000 - 2;
    }
  }

  fitCanvas();

  window.onresize = fitCanvas;
  // ここまでリサイズ処理

  // ここから描画処理
  // 初期背景を白にする
  setBgColor();
  // マウスの開始位置の記録用
  const mousePosition = { x: null, y: null };

  // ドラッグ状態のフラグ
  let isDrag = false;

  //線画色のデフォルトを黒にする
  let penColor = "#000000";

  // 描画用関数
  function draw(x, y) {
    if (!isDrag) {
      return;
    }
    ctx.lineCap = "round"; // 線の末端
    ctx.lineJoin = "round"; // 線の合流地点
    ctx.lineWidth = "5"; // 線の幅
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

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setBgColor();
  }

  const eraserButton = document.getElementById("eraser-btn");
  eraserButton.addEventListener("click", () => {
    if (penColor == "#000000") {
      penColor = "#FFFFFF";
      eraserButton.innerHTML = "ペンにする";
    } else {
      penColor = "#000000";
      eraserButton.innerHTML = "消しゴムにする";
    }
  });

  function dragStart(event) {
    ctx.beginPath();
    isDrag = true;
  }

  function dragEnd(event) {
    ctx.closePath();
    isDrag = false;
    mousePosition.x = null;
    mousePosition.y = null;
  }

  function initEventHandler() {
    const clearButton = document.getElementById("clear-btn");
    clearButton.addEventListener("click", clear);

    canvas.addEventListener("mousedown", dragStart);
    canvas.addEventListener("mouseup", dragEnd);
    canvas.addEventListener("mouseout", dragEnd);
    canvas.addEventListener("mousemove", (event) => {
      draw(event.layerX, event.layerY);
    });
  }

  initEventHandler();

  $("#download-btn").on("click", function () {
    const canvas = document.getElementById("drawingArea");
    const base64 = canvas.toDataURL("image/png");
    document.getElementById("download-btn").href = base64;
  });

  function setBgColor() {
    // canvasの背景色を設定(指定がない場合にjpeg保存すると背景が黒になる)
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
});
