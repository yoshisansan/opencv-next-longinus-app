/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import mustThrow from 'public/img/mustThrow.png';
import { Box } from '@chakra-ui/react';

const tsParticle = css`
  zindex: -1 !important;
  height: '100px';
`;

const ParticlesComponent = () => {
  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  const particlesLoaded = async (container: any): Promise<void> => {
    // console.log(container);
  };

  return (
    <Box h="200px" zIndex={-1}>
      <Particles
        id="tsparticles"
        css={tsParticle}
        init={particlesInit}
        loaded={particlesLoaded}
        height="100px"
        options={{
          background: {
            color: '#181A18'
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: 'canvas',
            events: {
              resize: true
            }
          },
          particles: {
            move: {
              angle: 10,
              attract: {
                rotate: {
                  x: 600,
                  y: 1200
                }
              },
              direction: 'right',
              enable: true,
              outModes: {
                default: 'out',
                bottom: 'out',
                left: 'out',
                right: 'out',
                top: 'out'
              },
              speed: 1
            },
            color: {
              value: '#ffffff'
            },
            number: {
              density: {
                enable: true,
                area: 1000
              },
              limit: 0,
              value: 300
            },
            opacity: {
              animation: {
                enable: true,
                minimumValue: 0.05,
                speed: 1,
                sync: false
              },
              random: {
                enable: true,
                minimumValue: 0.05
              },
              value: 1
            },
            shape: {
              type: 'image',
              image: {
                src: mustThrow.src,
                width: 1000,
                height: 400
              }
            },
            size: {
              value: 100, //シェイプの大きさ
              random: true, //シェイプの大きさをランダムにするか否か
              anim: {
                enable: false, //シェイプの大きさをアニメーションさせるか否か
                speed: 40, //アニメーションのスピード
                size_min: 0.1, //大きさの最小値
                sync: false //全てのシェイプを同時にアニメーションさせるか否か
              }
            }
          }
        }}
      />
    </Box>
  );
};

export default ParticlesComponent;
