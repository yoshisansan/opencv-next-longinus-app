import { FC } from 'react';
import { Icon } from '@chakra-ui/react';
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
  title: string;
  shareText: string;
  url: string;
  twitterId: string | undefined;
  hashtags: string[];
};

const SNS: FC<ShareButtonsProps> = ({ title, shareText, url, twitterId, hashtags }) => {
  console.log();
  return (
    <>
      <TwitterShareButton
        url={url}
        title={`${shareText} - ${title}`}
        via={twitterId}
        hashtags={hashtags}>
        <Icon as={FaTwitter} boxSize={8} fill="gray.400" _hover={{ fill: '#d03131' }} />
      </TwitterShareButton>
      <FacebookShareButton url={url}>
        <Icon as={FaFacebook} boxSize={8} fill="gray.400" _hover={{ fill: '#d03131' }} />
      </FacebookShareButton>
      <LineShareButton title={`${shareText} - ${title}`} url={url}>
        <Icon as={FaLine} boxSize={8} fill="gray.400" _hover={{ fill: '#d03131' }} />
      </LineShareButton>
      <PocketShareButton title={title} url={url}>
        <Icon as={FaGetPocket} boxSize={8} fill="gray.400" _hover={{ fill: '#d03131' }} />
      </PocketShareButton>
      <HatenaShareButton title={`${shareText} - ${title}`} url={url}>
        <Icon as={SiHatenabookmark} boxSize={8} fill="gray.400" _hover={{ fill: '#d03131' }} />
      </HatenaShareButton>
    </>
  );
};

export default SNS;
