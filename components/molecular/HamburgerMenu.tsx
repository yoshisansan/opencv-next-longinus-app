import {
  useDisclosure,
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next'
import { HamburgerLine } from 'components/atom/HamburgerIcon';

const HamburgerMenu = () => {
  const { t } = useTranslation('common');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w="24px" h="32px" m="0 8px" cursor="pointer" bg="#fff" position="relative" display="flex">
      <HamburgerLine onClick={onOpen} isOpenBool={isOpen} />
      <Modal onClose={onClose} size="lg" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>aminosan.app</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>テスト</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>{t("close")}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
export default HamburgerMenu;
