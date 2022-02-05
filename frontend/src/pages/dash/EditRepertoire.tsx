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
import React, { useRef, useState } from "react";

function EditRepertoire({
  editRepertoire,
  deleteRepertoire,
  isOpen,
  setIsOpen,
  repertoire,
  setRepertoire,
}) {
  const ref = useRef(null);
  const [name, setName] = useState(repertoire.name);

  function onClose() {
    setIsOpen(false);
  }

  function handleNameChange(e: React.FormEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    setName(value);
    setRepertoire({ ...repertoire, name: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    editRepertoire(repertoire.id, repertoire);
    setRepertoire(null);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Repertoire</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody>
            <Input
              value={name}
              key={repertoire?.id}
              variant="outline"
              type="text"
              placeholder="Repertoire Name..."
              onChange={handleNameChange}
              ref={ref}
            />
            <Button
              mt="10px"
              colorScheme="red"
              variant="link"
              onClick={() => deleteRepertoire(repertoire.id)}
            >
              Delete Repertoire
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="orange" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              type="submit"
              colorScheme="orange"
              disabled={ref.current?.value.length === 0}
            >
              Update
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default EditRepertoire;
