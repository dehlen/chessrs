import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link as ChakraLink,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FC, useCallback } from "react";
import { useAppSelector } from "utils/hooks";
import DashboardMoveData from "./DashboardMoveData";
import RepertoireList from "./RepertoireList";
import { Repertoire } from "types";
import { gql, request } from "graphql-request";
import { TOAST_DURATION } from "theme";
import ErrorToast from "../../components/ErrorToast";

const DashboardPage: FC = () => {
  const { name } = useAppSelector((state) => ({
    name: state.user?.account?.username,
  }));

  const toast = useToast();

  const addRepertoire = useCallback(
    async (repertoire: Repertoire) => {
      // TODO
      const query = gql`
      mutation CreateRepertoire(
       
      ) {
        createRepertoire(
          
        ) {
         
        }
      }
    `;
      try {
        const data = await request("/api/v1/graphql", query, {});
      } catch (e) {
        toast({
          duration: TOAST_DURATION,
          isClosable: true,
          render: (options) => (
            <ErrorToast
              description={`Error creating repertoire: ${
                e?.response?.errors?.[0]?.message ?? "Please try again later"
              }`}
              onClose={options.onClose}
            />
          ),
        });
      }
    },
    [toast]
  );

  return (
    <>
      <Box mt="10px" p="5vw" pt="2vw">
        <Heading mb="2vw">
          {name && name.length !== 0 ? `Welcome back, ${name}` : "Dashboard"}
        </Heading>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
          minH="65vh"
          gap={6}
        >
          <GridItem>
            <RepertoireList
              title="White Repertoire"
              repertoires={[
                { id: "", name: "1. Quickstarter 1.e4", games: null },
              ]}
              deleteRepertoire={() => {}}
              editRepertoire={() => {}}
              addRepertoire={addRepertoire}
            />
          </GridItem>
          <GridItem>
            <RepertoireList
              title="Black Repertoire"
              repertoires={[
                { id: "", name: "1. Quickstarter vs. 1.e4", games: null },
              ]}
              deleteRepertoire={() => {}}
              editRepertoire={() => {}}
              addRepertoire={addRepertoire}
            />
          </GridItem>
          <GridItem colSpan={2}>
            <DashboardMoveData />
          </GridItem>
        </Grid>
      </Box>
      <footer>
        <Flex w="100%" justifyContent="center" pb="10px">
          <Text color="whiteText">
            Created by David v.Knobelsdorff |{" "}
            <ChakraLink isExternal href="https://github.com/dehlen/chessrs">
              GitHub
            </ChakraLink>
          </Text>
        </Flex>
      </footer>
    </>
  );
};

export default DashboardPage;
