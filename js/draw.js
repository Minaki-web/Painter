window.onload = function() {
  const canvas = document.getElementById("drawingArea");
  const ctx = canvas.getContext("2d");

  // ここからリサイズ処理
  canvas.width = 1000;
  function fitCanvas() {
    // margin: 0 10px
    canvas.width = document.documentElement.clientWidth - 20;

    // 1000px以上にしない
    if(canvas.width > 1000){
      canvas.width = 1000;
    }
  }
  window.onresize = fitCanvas;
  // ここまでリサイズ処理














}