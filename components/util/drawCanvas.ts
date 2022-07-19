import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { HAND_CONNECTIONS, NormalizedLandmarkList, Results } from '@mediapipe/hands';
import cv, { Mat } from 'opencv-ts';
import EvaPNG from 'public/img/eva.png';

type CustomEll = {
  angle: number;
  center: { x: number; y: number };
  size: {
    height: number;
    width: number;
  };
};
type YariDom = {
  id: string;
  elm: HTMLImageElement;
  posY: number;
};
let ell: CustomEll;
let ratio: number;
let distance3: number;
let yariDoms: YariDom[] = [];
let isCreate = true;
/**
 * cnavasに描画する
 * @param ctx canvas context
 * @param results 手の検出結果
 */
export const drawCanvas = (ctx: CanvasRenderingContext2D, results: Results) => {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;

  //以下、canvasへの描画に関する記述
  ctx.save();
  ctx.drawImage(results.image, 0, 0, width, height);

  if (results.multiHandLandmarks) {
    //見つけた手の数だけ処理を繰り返す
    for (const landmarks of results.multiHandLandmarks) {
      //骨格を描画
      drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
        color: '#9876d6',
        lineWidth: 8
      });
      //関節を描画
      drawLandmarks(ctx, landmarks, {
        color: '#affa3e',
        lineWidth: 6,
        radius: 5
      });

      cvFunction(ctx, landmarks, width, height);
      drawYari(ctx);
      const ctx2 = ctx;
      throwYari(ctx2);

      // takoPee2Func(canvasElement.width);
    }
  }
  // takoPeeFunc(canvasElement.width);
  ctx.restore();
};

function cvFunction(
  ctx: CanvasRenderingContext2D,
  landmarks: NormalizedLandmarkList,
  width: number,
  height: number
) {
  let points: number[] = [];
  //手のひらや親指の付け根付近以外の関節を取得
  for (var i = 2; i < 21; i++) {
    //0~1で表現されたx,yを画像のサイズに変換
    points.push(landmarks[i].x * width);
    points.push(landmarks[i].y * height);
  }
  //点の集まりをOpenCVで扱えるデータフォーマットに変換
  let mat: Mat = cv.matFromArray(points.length / 2, 1, cv.CV_32SC2, points);
  //点の集まりにフィットする楕円を計算
  ell = cv.fitEllipse(mat);
  //メモリの解放
  mat.delete();

  //親指と人差し指までの距離
  let dx = (landmarks[7].x - landmarks[4].x) * width;
  let dy = (landmarks[7].y - landmarks[4].y) * height;
  let distance1 = Math.sqrt(dx * dx + dy * dy);

  //人差し指から小指までの距離
  dx = (landmarks[7].x - landmarks[19].x) * width;
  dy = (landmarks[7].y - landmarks[19].y) * height;
  let distance2 = Math.sqrt(dx * dx + dy * dy);

  ratio = distance1 / distance2;
  let close = 0.9;
  let up = 1.3;
  ratio = (Math.max(close, Math.min(up, ratio)) - close) / (up - close); //map(ratio,0.9,1.3,0,1,true);

  //親指と人差し指までの距離
  dx = (landmarks[6].x - landmarks[4].x) * width;
  dy = (landmarks[6].y - landmarks[4].y) * height;
  distance3 = Math.sqrt(dx * dx + dy * dy);
  dis(ctx, distance3);
}

function dis(ctx: CanvasRenderingContext2D, distance: number) {
  setTimeout(() => {
    const nowDis = distance3;
    const d = nowDis - distance;
    // console.log(`distanceの差は${d}です`);
    if (d > 100) {
      // console.log('ロンギヌスの槍を投げる');
      if (isCreate) {
        // 同時に複数のDOMが生成されるのを防ぐ isCreate
        isCreate = false;
        yariDoms.push(createYariImg());
        setTimeout(() => {
          isCreate = true;
        }, 200);
      }
    }
  }, 500);
}

function drawYari(ctx: CanvasRenderingContext2D) {
  const yari = document.getElementById('Yari') as HTMLImageElement;

  if (yari == null) return;
  // canvasCtx.drawImage(yari, 0, 0, yari.width, yari.height);
  //楕円の角度
  let angle = ell.angle;
  if (angle < 90) {
    angle = angle - 180;
  }

  //位置指定
  ctx.translate(ell.center.x, ell.center.y);

  let mul = (ratio * 1.2 * ell.size.width) / yari.width;
  //角度指定
  ctx.rotate((angle * Math.PI) / 180.0);
  //楕円を描画
  ctx.beginPath();
  ctx.ellipse(0, 0, ell.size.width / 2.0, ell.size.height / 2.0, 0, 0, 2 * Math.PI);
  ctx.stroke();

  ctx.scale(mul, -mul);
  console.log('yariDoms.length', yariDoms.length, yariDoms);
  if (!yariDoms.length) {
    ctx.drawImage(yari, -yari.width / 2.0, -yari.height, yari.width, yari.height);
  }
}
function yariyari(yariDom: YariDom, ctx: CanvasRenderingContext2D, i: number) {
  ctx.drawImage(
    yariDom.elm,
    -yariDom.elm.width / 2.0,
    -yariDom.elm.height - yariDom.posY * 40,
    yariDom.elm.width,
    yariDom.elm.height
  );
  yariDom.posY++;
  if (yariDom.posY > 15) {
    yariDom.elm.remove();
    yariDoms.splice(i - 1, i);
    if (yariDoms.length == 1) {
      yariDoms = [];
    }
  }
}

function throwYari(ctx: CanvasRenderingContext2D) {
  if (yariDoms.length) {
    yariDoms.map((yariDom: YariDom, i: number) => {
      yariyari(yariDom, ctx, i);
    });
  }
}

function createYariImg() {
  const randId = Math.random().toString(32).substring(2);
  const parent = document.getElementById('MediaPipe') as HTMLDivElement;
  const yari = document.getElementById(`Yari`) as HTMLImageElement;
  const newElm = document.createElement('img');
  newElm.src = EvaPNG.src;
  newElm.id = `Yari${randId}`;

  return { elm: parent.insertBefore(newElm, yari), posY: 0, id: randId };
}
