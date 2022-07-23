/** @jsxImportSource @emotion/react */
import { useCallback, useEffect, useRef, FC, useState } from 'react';
import { useTranslation } from 'next-i18next';
import Webcam from 'react-webcam';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { Camera } from '@mediapipe/camera_utils';
import { Hands, Results } from '@mediapipe/hands';
import { drawCanvas } from '../util/drawCanvas';
import EvaWebp from 'public/img/eva.webp';
import { Box, Button, Image, Flex, HStack } from '@chakra-ui/react';
import SNS from 'components/organism/SNS';

const Circle = css`
  position: absolute;
  top: 32px;
  left: 48px;
  width: 120px;
  height: 120px;
  background: #000;
  border-radius: 50%;
  text-align: center;
  overflow: hidden;
  z-index: 1;
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: -60px;
    width: 120px;
    height: 120px;
    background: #d3ba3e;
    transform-origin: right 60px;
    z-index: 2;
    animation: rotateLeft 1040ms infinite linear;
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0px;
    left: 60px;
    width: 120px;
    height: 120px;
    background: #d3ba3e;
    transform-origin: left 60px;
    z-index: 3;
    animation: rotateRight 1040ms infinite linear;
  }
`;

const CircleInner = css`
  position: absolute;
  color: #fff;
  font-size: 62px;
  font-weight: bold;
  font-family: 'Times New Roman';
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scaleY(1.4);
  width: 120px;
  height: 120px;
  line-height: 120px;
  border-radius: 50%;
  z-index: 4;
`;

const MediaPipeComponent: FC = () => {
  const [captureUrl, setCaptureUrl] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(3);
  const [isTimer, setIsTimer] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultsRef = useRef<Results>();
  const { t } = useTranslation('common');
  const origin =
    typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const { locale } = useRouter();
  const url = `${origin}/${locale}`;
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

  let iv: NodeJS.Timer;
  const captureTimer = (countNum: number) => {
    const ms = countNum * 1000;
    const leftTime = Date.now() + ms; // ミリ秒に調整

    iv = setInterval(() => {
      const nowTime = Date.now();
      setCountdown((countdown: number) => countdown - 1);
      if (leftTime - nowTime <= 0) {
        handleClearInterval();
        return;
      }
    }, 1000);
  };
  const handleClearInterval = () => clearInterval(iv);

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
      <Box id="MediaPipe" css={styles.container}>
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
        <canvas ref={canvasRef} css={styles.canvas} width={1280} height={720} />
        <img id="Yari" src={EvaWebp.src} style={{ visibility: 'hidden' }} />
        {/* countdown */}
        {isTimer && countdown != 0 && (
          <Box maxW={1280} m="0 auto">
            <Box css={CircleInner}>{countdown}</Box>
          </Box>
        )}
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
      <Flex maxW="1280px" alignItems="center" justify="space-between" margin="0 auto" mt="20px">
        <Box>
          <Button
            mr="12px"
            color={isTimer ? '#e0e0e0' : '#333'}
            onClick={async () => {
              if (captureUrl != '') {
                setCaptureUrl('');

                return;
              }
              if (isTimer == true) return; //// 連続クリックさせない
              setIsTimer(true);
              handleClearInterval();
              // キャプチャのカウントダウン
              const countSecounds = 3;
              const capTimer = () =>
                new Promise<void>((resolve) => {
                  setCountdown(countSecounds);
                  captureTimer(countSecounds);
                  setTimeout(() => {
                    resolve();
                  }, countSecounds * 1000);
                });
              await capTimer();
              setIsTimer(false);
              await capture();
              setCountdown(countSecounds);
            }}>
            {captureUrl == '' ? '撮影する 📷' : '撮り直す 📷'}
          </Button>
          <a download={`Longinus-${formatDate(new Date())}.jpg`} href={captureUrl}>
            <Button
              color={captureUrl == '' ? '#e0e0e0' : '#333'}
              onClick={() => {
                if (captureUrl == '') return;
                download();
              }}>
              名前をつけて保存 💾
            </Button>
          </a>
        </Box>
        <HStack spacing={2}>
          <SNS
            title={t('title')}
            shareText={t('Share text')}
            url={url}
            twitterId={process.env.NEXT_PUBLIC_TWITTER_ID}
          />
        </HStack>
      </Flex>
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
