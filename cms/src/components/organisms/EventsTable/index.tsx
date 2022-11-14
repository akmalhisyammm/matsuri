import {
  Button,
  ButtonGroup,
  HStack,
  IconButton,
  Image,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import moment from 'moment';

import { EventModal } from 'components/molecules';
import { EventContext } from 'contexts/event';
import { ImageContext } from 'contexts/image';

import type { IEvent } from 'types/event';

const EventsTable = () => {
  const [event, setEvent] = useState<IEvent>();

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

    setEvent(event);
    onOpen();
  };

  const handleDeleteClick = (id: string) => {
    eventsCtx.destroy(id);
  };

  const handleModalClose = () => {
    imagesCtx.remove();

    setEvent(undefined);
    onClose();
  };

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
                <Td>{moment(event.date.split('.')[0]).format('h:mm A')}</Td>
                <Td>{moment(event.date.split('.')[0]).format('LL')}</Td>
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
                    <Text color={event.status === 'Published' ? 'green.200' : 'red.200'}>
                      {event.status}
                    </Text>
                  </HStack>
                </Td>
                <Td>
                  <ButtonGroup>
                    <IconButton
                      colorScheme="yellow"
                      size="sm"
                      aria-label="Edit"
                      icon={<FaEdit />}
                      isLoading={imagesCtx.isLoading || eventsCtx.isLoading}
                      onClick={handleEditClick.bind(null, event)}
                    />
                    <IconButton
                      colorScheme="red"
                      size="sm"
                      aria-label="Delete"
                      icon={<FaTrash />}
                      isLoading={imagesCtx.isLoading || eventsCtx.isLoading}
                      onClick={handleDeleteClick.bind(null, event._id)}
                    />
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}

            {!isOpen && (
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

      <EventModal data={event} isOpen={isOpen} onClose={handleModalClose} />
    </>
  );
};

export default EventsTable;
