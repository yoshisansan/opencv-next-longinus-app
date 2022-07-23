import { FC } from 'react';
import { Box, Flex, Icon } from '@chakra-ui/react';
import {
  FacebookShareButton,
  HatenaShareButton,
  LineShareButton,
  PocketShareButton,
  TwitterShareButton
} from 'react-share';
import { FaFacebook, FaGetPocket, FaLine, FaTwitter } from 'react-icons/fa';
import { SiHatenabookmark } from 'react-icons/si';

type ShareButtonsProps = {
  urlBlog: string;
  title: string;
};

const SNS: FC<{ title: string }> = ({ title }) => {
  const origin =
    typeof window !== 'undefined' && window.location.origin ? window.location.origin : '';
  const TWITTER_ID = 'hoge';
  return (
    <>
      <TwitterShareButton url={origin} title={title} via={TWITTER_ID}>
        <Icon as={FaTwitter} boxSize={8} fill="gray.400" _hover={{ fill: '#d03131' }} />
      </TwitterShareButton>
      <FacebookShareButton url={origin}>
        <Icon as={FaFacebook} boxSize={8} fill="gray.400" _hover={{ fill: '#d03131' }} />
      </FacebookShareButton>
      <LineShareButton title={title} url={origin}>
        <Icon as={FaLine} boxSize={8} fill="gray.400" _hover={{ fill: '#d03131' }} />
      </LineShareButton>
      <PocketShareButton title={title} url={origin}>
        <Icon as={FaGetPocket} boxSize={8} fill="gray.400" _hover={{ fill: '#d03131' }} />
      </PocketShareButton>
      <HatenaShareButton title={title} url={origin}>
        <Icon as={SiHatenabookmark} boxSize={8} fill="gray.400" _hover={{ fill: '#d03131' }} />
      </HatenaShareButton>
    </>
  );
};

export default SNS;
