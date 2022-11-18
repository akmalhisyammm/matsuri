import {
  Button,
  ButtonGroup,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FaEdit, FaPlus, FaTimesCircle, FaTrash } from 'react-icons/fa';

import { UserModal } from 'components/molecules';
import { AuthContext } from 'contexts/auth';
import { UserContext } from 'contexts/user';
import { ImageContext } from 'contexts/image';

import type { IOtherUser } from 'types/user';

const UsersTable = () => {
  const [editedUser, setEditedUser] = useState<IOtherUser>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const authCtx = useContext(AuthContext);
  const usersCtx = useContext(UserContext);
  const imagesCtx = useContext(ImageContext);

  const handleAddClick = () => {
    onOpen();
  };

  const handleEditClick = (user: IOtherUser) => {
    setEditedUser(user);
    onOpen();
  };

  const handleDeleteClick = (id: string) => {
    usersCtx.destroy(id);
  };

  const handleModalClose = () => {
    setEditedUser(undefined);
    onClose();
  };

  if (!usersCtx.authorizedAccess.includes('READ')) {
    return (
      <List spacing={3}>
        <ListItem>
          <ListIcon as={FaTimesCircle} color="red.500" marginBottom={0.5} />
          You don&apos;t have access to read users
        </ListItem>
      </List>
    );
  }

  return (
    <>
      <TableContainer>
        <Table size="sm">
          <Thead>
            <Tr>
              {authCtx.user?.role === 'Owner' ? (
                <>
                  <Th width="30%">Name</Th>
                  <Th width="30%">Email</Th>
                  <Th width="20%">Role</Th>
                  <Th width="20%">Organizer Name</Th>
                </>
              ) : (
                <>
                  <Th width="40%">Name</Th>
                  <Th width="40%">Email</Th>
                  <Th width="20%">Role</Th>
                </>
              )}
              <Th>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {usersCtx.users.map((user) => (
              <Tr key={user._id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.role}</Td>
                {authCtx.user?.role === 'Owner' && <Td>{user.organizer.name}</Td>}
                <Td>
                  <ButtonGroup>
                    {usersCtx.authorizedAccess.includes('UPDATE') && (
                      <IconButton
                        colorScheme="yellow"
                        size="sm"
                        aria-label="Edit"
                        icon={<FaEdit />}
                        isLoading={imagesCtx.isLoading || usersCtx.isLoading}
                        onClick={handleEditClick.bind(null, user)}
                      />
                    )}
                    {usersCtx.authorizedAccess.includes('DELETE') && (
                      <IconButton
                        colorScheme="red"
                        size="sm"
                        aria-label="Delete"
                        icon={<FaTrash />}
                        isLoading={imagesCtx.isLoading || usersCtx.isLoading}
                        onClick={handleDeleteClick.bind(null, user._id)}
                      />
                    )}
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}

            {usersCtx.authorizedAccess.includes('CREATE') && !isOpen && (
              <Tr>
                <Td colSpan={5}>
                  <Button
                    variant="ghost"
                    colorScheme="blue"
                    size="sm"
                    width="full"
                    leftIcon={<FaPlus />}
                    isLoading={imagesCtx.isLoading || usersCtx.isLoading}
                    onClick={handleAddClick}>
                    Add
                  </Button>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <UserModal data={editedUser} isOpen={isOpen} onClose={handleModalClose} />
    </>
  );
};

export default UsersTable;
