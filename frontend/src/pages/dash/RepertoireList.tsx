import {
  Box,
  Button,
  Heading,
  HStack,
  VStack,
  Text,
  Flex,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { FC, useState } from "react";
import { Repertoire } from "types";
import AddRepertoire from "./AddRepertoire";
import EditRepertoire from "./EditRepertoire";

interface Props {
  title: string;
  repertoires: Repertoire[];
  deleteRepertoire: (id: string) => void;
  editRepertoire: (id: string, repertoire: Repertoire) => void;
  addRepertoire: (repertoire: Repertoire) => void;
}

const RepertoireList: FC<Props> = ({
  title,
  repertoires,
  deleteRepertoire,
  editRepertoire,
  addRepertoire,
}): JSX.Element => {
  const [isAddRepertoireOpen, setIsAddRepertoireOpen] = useState(false);
  const [isEditRepertoireOpen, setIsEditRepertoireOpen] = useState(false);
  const [, setRepertoire] = useState<Repertoire>(null);

  function handleEditClick(repertoire) {
    setRepertoire(repertoire);
    setIsEditRepertoireOpen(true);
  }

  function showAddRepertoireModal() {
    setIsAddRepertoireOpen(true);
  }

  return (
    <Box
      borderRadius="3px"
      bg="surface"
      borderWidth="2px"
      borderStyle="solid"
      borderColor="surfaceBorder"
      h="100%"
      p="5%"
      position="relative"
    >
      <Heading as="h6" fontSize="2xl">
        {title}
      </Heading>
      <VStack align="stretch">
        {repertoires.map((repertoire) => (
          <HStack spacing="24px" w="320px">
            <Flex pt={6} w="300px" h="50px" alignItems="center">
              <Text>{repertoire.name}</Text>
              <Flex w="20px" pl="10px">
                <EditIcon
                  onClick={() => handleEditClick(repertoire)}
                  color="orange"
                />
              </Flex>

              <EditRepertoire
                editRepertoire={editRepertoire}
                deleteRepertoire={deleteRepertoire}
                isOpen={isEditRepertoireOpen}
                setIsOpen={setIsEditRepertoireOpen}
                repertoire={repertoire}
                setRepertoire={setRepertoire}
              />

              <AddRepertoire
                addRepertoire={addRepertoire}
                isOpen={isAddRepertoireOpen}
                setIsOpen={setIsAddRepertoireOpen}
              />
            </Flex>
          </HStack>
        ))}
      </VStack>
      <Button
        colorScheme="orange"
        variant="solid"
        position="absolute"
        bottom="10px"
        right="10px"
        height="32px"
        borderRadius="16px"
        onClick={() => showAddRepertoireModal()}
      >
        Add
      </Button>
    </Box>
  );
};

export default RepertoireList;
