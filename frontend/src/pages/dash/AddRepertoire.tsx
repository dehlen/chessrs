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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Repertoire } from "../../types";

function AddRepertoire({ addRepertoire, isOpen, setIsOpen }) {
  const [name, setName] = useState("");

  function onClose() {
    setIsOpen(false);
  }

  function handleNameChange(e: React.FormEvent<HTMLInputElement>) {
    setName(e.currentTarget.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const repertoire: Repertoire = {
      id: nanoid(),
      name: name,
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
            <Button
              mt="10px"
              colorScheme="orange"
              variant="link"
              onClick={() => console.log("TODO")}
            >
              Import PGN
            </Button>
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
}

export default AddRepertoire;
