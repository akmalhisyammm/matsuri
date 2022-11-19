import {
  Badge,
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Image,
  List,
  ListIcon,
  ListItem,
  Switch,
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
import moment from 'moment';

import { EventModal } from 'components/molecules';
import { EventContext } from 'contexts/event';
import { ImageContext } from 'contexts/image';

import type { IEvent } from 'types/event';

const EventsTable = () => {
  const [editedEvent, setEditedEvent] = useState<IEvent>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const eventsCtx = useContext(EventContext);
  const imagesCtx = useContext(ImageContext);

  const handleAddClick = () => {
    imagesCtx.remove();

    onOpen();
  };

  const handleToggleClick = (id: string) => {
    eventsCtx.toggle(id);
  };

  const handleEditClick = (event: IEvent) => {
    imagesCtx.set(event.image);

    setEditedEvent(event);
    onOpen();
  };

  const handleDeleteClick = (id: string) => {
    eventsCtx.destroy(id);
  };

  const handleModalClose = () => {
    imagesCtx.remove();

    setEditedEvent(undefined);
    onClose();
  };

  if (!eventsCtx.authorizedAccess.includes('READ')) {
    return (
      <List spacing={3}>
        <ListItem>
          <ListIcon as={FaTimesCircle} color="red.500" marginBottom={0.5} />
          You don&apos;t have access to read events
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
              <Th width="20%">Image</Th>
              <Th width="25%">Title</Th>
              <Th width="10%">Time</Th>
              <Th width="15%">Date</Th>
              <Th width="15%">Location</Th>
              <Th width="15%">Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {eventsCtx.events.map((event) => (
              <Tr key={event._id}>
                <Td>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${event.image.url}`}
                    alt={event.title}
                    width="full"
                  />
                </Td>
                <Td>{event.title}</Td>
                <Td>{moment(event.date).format('HH:mm')}</Td>
                <Td>{moment(event.date).format('LL')}</Td>
                <Td>{event.venueName}</Td>
                <Td>
                  <HStack>
                    <Switch
                      id="status"
                      name="status"
                      isChecked={event.status === 'Published'}
                      isDisabled={imagesCtx.isLoading || eventsCtx.isLoading}
                      onChange={handleToggleClick.bind(null, event._id)}
                    />
                    <Badge colorScheme={event.status === 'Published' ? 'green' : 'red'}>
                      {event.status}
                    </Badge>
                  </HStack>
                </Td>
                <Td>
                  <ButtonGroup>
                    {eventsCtx.authorizedAccess.includes('UPDATE') && (
                      <IconButton
                        colorScheme="yellow"
                        size="sm"
                        aria-label="Edit"
                        icon={<FaEdit />}
                        isLoading={imagesCtx.isLoading || eventsCtx.isLoading}
                        onClick={handleEditClick.bind(null, event)}
                      />
                    )}
                    {eventsCtx.authorizedAccess.includes('DELETE') && (
                      <IconButton
                        colorScheme="red"
                        size="sm"
                        aria-label="Delete"
                        icon={<FaTrash />}
                        isLoading={imagesCtx.isLoading || eventsCtx.isLoading}
                        onClick={handleDeleteClick.bind(null, event._id)}
                      />
                    )}
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}

            {eventsCtx.authorizedAccess.includes('CREATE') && !isOpen && (
              <Tr>
                <Td colSpan={7}>
                  <Button
                    variant="ghost"
                    colorScheme="blue"
                    size="sm"
                    width="full"
                    leftIcon={<FaPlus />}
                    isLoading={imagesCtx.isLoading || eventsCtx.isLoading}
                    onClick={handleAddClick}>
                    Add
                  </Button>
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <EventModal data={editedEvent} isOpen={isOpen} onClose={handleModalClose} />
    </>
  );
};

export default EventsTable;
