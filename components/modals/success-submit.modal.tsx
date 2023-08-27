import {
    Button,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BsCheckCircle } from "react-icons/bs";
interface SuccesSubmitModalProps {
    isOpen: boolean;
    onClose: () => void;
    content: any;
}

export default function SuccesSubmitModal({
    isOpen,
    onClose,
    content,
}: SuccesSubmitModalProps) {
    const router = useRouter();
    const isEnglish = router.locale === "en";
    return (
        <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset="slideInBottom"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{content.successModal.submitted}</ModalHeader>
                <ModalCloseButton
                    right={isEnglish ? 3 : ""}
                    left={!isEnglish ? 3 : ""}
                />
                <ModalBody>
                    <VStack spacing={4}>
                        <Icon as={BsCheckCircle} color="#97CA52" boxSize={12} />
                        <Text color={"text.secondary"}>
                            {content.successModal.contact}
                        </Text>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}
