import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { FC, useState } from "react";
import { nanoid } from "nanoid";
import { Repertoire } from "../../types";
import { useFilePicker } from "use-file-picker";
import { parse } from "@mliebelt/pgn-parser";

interface Props {
  addRepertoire: (repertoire: Repertoire) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const AddRepertoire: FC<Props> = ({ addRepertoire, isOpen, setIsOpen }) => {
  const [name, setName] = useState("");
  const [openFileSelector, { filesContent, clear }] = useFilePicker({
    accept: ".pgn",
    multiple: false,
    readAs: "Text",
  });

  function onClose() {
    setIsOpen(false);
  }

  function handleNameChange(e: React.FormEvent<HTMLInputElement>) {
    setName(e.currentTarget.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const games = filesContent.map((file) => {
      return parse(file.content, { startRule: "games" });
    });
    console.log(games);
    const repertoire: Repertoire = {
      id: nanoid(),
      name: name,
      games: games,
    };

    addRepertoire(repertoire);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Repertoire</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Input
              value={name}
              key={"name"}
              variant="outline"
              type="text"
              placeholder="Repertoire Name..."
              onChange={handleNameChange}
            />
            {filesContent.length === 0 ? (
              <Button
                mt="10px"
                colorScheme="orange"
                variant="link"
                onClick={openFileSelector}
              >
                Import PGN
              </Button>
            ) : (
              <Button
                mt="10px"
                colorScheme="orange"
                variant="link"
                onClick={clear}
              >
                Clear
              </Button>
            )}
            {filesContent.map((file, index) => (
              <Text color="whiteText" fontSize="14px">
                {file.name}
              </Text>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              type="submit"
              colorScheme="orange"
              disabled={name.length === 0}
            >
              Add
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddRepertoire;
