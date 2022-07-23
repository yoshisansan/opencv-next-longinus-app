import React, { useCallback, useEffect, useRef, FC, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Webcam from 'react-webcam';
import { css } from '@emotion/css';
import { Camera } from '@mediapipe/camera_utils';
import { Hands, Results } from '@mediapipe/hands';
import { drawCanvas } from '../util/drawCanvas';
import EvaPNG from 'public/img/eva.png';
import { Box, Button, Image, Text } from '@chakra-ui/react';

const MediaPipeComponent: FC = () => {
  const [captureUrl, setCaptureUrl] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(3);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultsRef = useRef<Results>();
  const { t } = useTranslation('common');

  /**
   * 検出結果（フレーム毎に呼び出される）
   * @param results
   */
  const onResults = useCallback((results: Results) => {
    resultsRef.current = results;

    const canvasCtx = canvasRef.current!.getContext('2d')!;
    drawCanvas(canvasCtx, results);
  }, []);

  // 初期設定
  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
      }
    });

    hands.setOptions({
      selfieMode: true,
      maxNumHands: 1, //認識可能な手の最大数
      modelComplexity: 1, //精度に関する設定(0~1)
      minDetectionConfidence: 0.5, //手検出の信頼度
      minTrackingConfidence: 0.5 //手追跡の信頼度
    });

    hands.onResults(onResults);

    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null &&
      webcamRef.current.video !== null
    ) {
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          await hands.send({ image: webcamRef.current!.video! });
        },
        width: 1280,
        height: 720
      });
      camera.start();
    }
  }, [onResults]);

  const download = async () => {
    const a = document.createElement('a');
    a.href = captureUrl;
    a.download = 'test.jpg';
    a.dispatchEvent(new CustomEvent('click'));
  };

  let iv: any;
  const captureTimer = (ms: number) => {
    const leftTime = Date.now() + 3000;
    iv = setInterval(() => {
      const nowTime = Date.now();
      console.log(leftTime - nowTime);
      setCountdown((countdown: number) => countdown - 1);
    }, ms);
  };

  const capture = useCallback((): void => {
    const imageSrc = canvasRef.current?.toDataURL('image/jpeg', 0.85);
    if (imageSrc == undefined) throw new Error(t('Screenshot Error'));
    if (imageSrc) {
      setCaptureUrl(imageSrc);
    }
  }, [webcamRef]);

  const formatDate = (dt: Date) => {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth() + 1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return y + '-' + m + '-' + d;
  };

  return (
    <>
      <Box id="MediaPipe" className={styles.container}>
        {/* capture */}
        <Webcam
          audio={false}
          style={{ visibility: 'hidden' }}
          width={1280}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ width: 1280, height: 720, facingMode: 'user' }}
        />
        {/* draw */}
        <canvas ref={canvasRef} className={styles.canvas} width={1280} height={720} />
        <img id="Yari" src={EvaPNG.src} style={{ visibility: 'hidden' }} />
        {/* capture */}
        {captureUrl !== '' && (
          <>
            <Image
              src={captureUrl}
              objectFit="cover"
              boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
              position="absolute"
              w={1280}
              bg="#fff"
              p="36px"
              animation="showup 240ms cubic-bezier(0.55, 0.06, 0.68, 0.19)"
            />
            <Box
              w={1280}
              h="100%"
              bg="#fff"
              opacity="0"
              position="absolute"
              animation="showupBg 200ms cubic-bezier(0.55, 0.06, 0.68, 0.19)"></Box>
          </>
        )}
      </Box>
      <div>
        <Text color="#fff">{countdown}</Text>
        <Button
          onClick={() => {
            captureTimer(1000);
            if (captureUrl == '') return capture();

            clearInterval(captureTimer(1000));
            setCaptureUrl('');
          }}>
          {captureUrl == '' ? '撮影する' : '撮り直す'}
        </Button>
        <a download={`Longinus-${formatDate(new Date())}.jpg`} href={captureUrl}>
          <Button onClick={() => download()}>名前をつけて保存</Button>
        </a>
      </div>
    </>
  );
};

// ==============================================
// styles

const styles = {
  container: css`
    position: relative;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  canvas: css`
    position: absolute;
    top: 0;
    width: 1280px;
    height: 720px;
    background-color: #fff;
  `,
  buttonContainer: css`
    position: absolute;
    top: 20px;
    left: 20px;
  `,
  button: css`
    color: #fff;
    background-color: #0082cf;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    padding: 10px 10px;
    cursor: pointer;
  `
};

export default MediaPipeComponent;
