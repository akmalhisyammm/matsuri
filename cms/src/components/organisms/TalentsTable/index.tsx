import {
  Button,
  ButtonGroup,
  IconButton,
  Image,
  Input,
  List,
  ListIcon,
  ListItem,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import { useContext, useRef, useState } from 'react';
import {
  FaCheckCircle,
  FaEdit,
  FaPlus,
  FaSave,
  FaTimes,
  FaTimesCircle,
  FaTrash,
  FaUpload,
} from 'react-icons/fa';

import { TalentContext } from 'contexts/talent';
import { EventContext } from 'contexts/event';
import { ImageContext } from 'contexts/image';

import type { ITalent, ITalentPayload } from 'types/talent';

const TalentsTable = () => {
  const [form, setForm] = useState<ITalentPayload>({ name: '', role: '', imageId: '' });
  const [editedTalent, setEditedTalent] = useState<ITalent>();
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const talentsCtx = useContext(TalentContext);
  const eventsCtx = useContext(EventContext);
  const imagesCtx = useContext(ImageContext);

  const resetForm = () => {
    setForm({ name: '', role: '', imageId: '' });
    setEditedTalent(undefined);
    setIsAdding(false);

    imagesCtx.remove();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;

    switch (name) {
      case 'image': {
        if (files) {
          imagesCtx.upload(files[0]);
        }
        break;
      }
      default: {
        setForm({ ...form, [name]: value });
        break;
      }
    }
  };

  const handleAddClick = () => {
    setEditedTalent(undefined);
    setIsAdding(true);

    imagesCtx.remove();
  };

  const handleEditClick = (talent: ITalent) => {
    setForm({
      name: talent.name,
      role: talent.role,
      imageId: talent.image._id,
    });
    setEditedTalent(talent);
    setIsAdding(false);

    imagesCtx.set(talent.image);
  };

  const handleCancelClick = () => {
    resetForm();
  };

  const handleSaveClick = () => {
    const payload = { ...form, imageId: imagesCtx.image?._id || '' };

    if (!editedTalent) {
      talentsCtx.create(payload);
    } else {
      talentsCtx.update(editedTalent._id, payload);
    }

    resetForm();
  };

  const handleDeleteClick = (id: string) => {
    talentsCtx.destroy(id);
    imagesCtx.remove();
  };

  if (!talentsCtx.authorizedAccess.includes('READ')) {
    return (
      <List spacing={3}>
        <ListItem>
          <ListIcon as={FaTimesCircle} color="red.500" marginBottom={0.5} />
          You don&apos;t have access to read talents
        </ListItem>
      </List>
    );
  }

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th width="10%">Image</Th>
            <Th width="30%">Name</Th>
            <Th width="30%">Role</Th>
            <Th width="30%">Related Events</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {talentsCtx.talents.map((talent) =>
            talent._id !== editedTalent?._id ? (
              <Tr key={talent._id}>
                <Td>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${talent.image.url}`}
                    alt={talent.name}
                    width="full"
                  />
                </Td>
                <Td>{talent.name}</Td>
                <Td>{talent.role}</Td>
                <Td>
                  <List spacing={2}>
                    {eventsCtx.events.filter((event) => event.talent._id === talent._id).length ===
                    0 ? (
                      <ListItem>
                        <ListIcon as={FaTimesCircle} color="red.500" marginBottom={0.5} />
                        No related events
                      </ListItem>
                    ) : (
                      eventsCtx.events.map(
                        (event) =>
                          event.talent._id === talent._id && (
                            <ListItem key={event._id}>
                              <ListIcon as={FaCheckCircle} color="green.500" marginBottom={0.5} />
                              {event.title}
                            </ListItem>
                          )
                      )
                    )}
                  </List>
                </Td>
                <Td>
                  <ButtonGroup>
                    {talentsCtx.authorizedAccess.includes('UPDATE') && (
                      <IconButton
                        colorScheme="yellow"
                        size="sm"
                        aria-label="Edit"
                        icon={<FaEdit />}
                        isLoading={imagesCtx.isLoading || talentsCtx.isLoading}
                        onClick={handleEditClick.bind(null, talent)}
                      />
                    )}
                    {talentsCtx.authorizedAccess.includes('DELETE') && (
                      <Tooltip
                        label="Unable to delete talent with related events"
                        placement="bottom-start"
                        isDisabled={
                          eventsCtx.events.filter((event) => event.talent._id === talent._id)
                            .length === 0
                        }
                        hasArrow>
                        <IconButton
                          colorScheme="red"
                          size="sm"
                          aria-label="Delete"
                          icon={<FaTrash />}
                          isLoading={imagesCtx.isLoading || talentsCtx.isLoading}
                          isDisabled={eventsCtx.events.some(
                            (event) => event.talent._id === talent._id
                          )}
                          onClick={handleDeleteClick.bind(null, talent._id)}
                        />
                      </Tooltip>
                    )}
                  </ButtonGroup>
                </Td>
              </Tr>
            ) : (
              <Tr key={talent._id}>
                <Td>
                  <Input
                    type="file"
                    id="editImage"
                    name="image"
                    size="sm"
                    display="none"
                    ref={imageRef}
                    onChange={handleInputChange}
                  />
                  <IconButton
                    variant="outline"
                    colorScheme={imagesCtx.image ? 'yellow' : 'blue'}
                    size="sm"
                    width="full"
                    height="full"
                    minHeight={8}
                    aria-label="Save"
                    icon={
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${
                          imagesCtx.image?.url || talent.image.url
                        }`}
                        alt={form.name}
                        width="full"
                        height="full"
                        objectFit="cover"
                        padding={1}
                      />
                    }
                    isLoading={imagesCtx.isLoading || talentsCtx.isLoading}
                    onClick={() => imageRef.current?.click()}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    id="editName"
                    name="name"
                    size="sm"
                    value={form.name}
                    onChange={handleInputChange}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    id="editRole"
                    name="role"
                    size="sm"
                    value={form.role}
                    onChange={handleInputChange}
                  />
                </Td>
                <Td>
                  <List spacing={2}>
                    {eventsCtx.events.filter((event) => event.talent._id === talent._id).length ===
                    0 ? (
                      <ListItem>
                        <ListIcon as={FaTimesCircle} color="red.500" marginBottom={0.5} />
                        No related events
                      </ListItem>
                    ) : (
                      eventsCtx.events.map(
                        (event) =>
                          event.talent._id === talent._id && (
                            <ListItem key={event._id}>
                              <ListIcon as={FaCheckCircle} color="green.500" marginBottom={0.5} />
                              {event.title}
                            </ListItem>
                          )
                      )
                    )}
                  </List>
                </Td>
                <Td>
                  <ButtonGroup>
                    <IconButton
                      colorScheme="green"
                      size="sm"
                      aria-label="Save"
                      icon={<FaSave />}
                      isLoading={imagesCtx.isLoading || talentsCtx.isLoading}
                      isDisabled={!form.name}
                      onClick={handleSaveClick}
                    />
                    <IconButton
                      size="sm"
                      aria-label="Cancel"
                      icon={<FaTimes />}
                      isLoading={imagesCtx.isLoading || talentsCtx.isLoading}
                      onClick={handleCancelClick}
                    />
                  </ButtonGroup>
                </Td>
              </Tr>
            )
          )}

          {talentsCtx.authorizedAccess.includes('CREATE') && !isAdding ? (
            <Tr>
              <Td colSpan={5}>
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  size="sm"
                  width="full"
                  leftIcon={<FaPlus />}
                  isLoading={imagesCtx.isLoading || talentsCtx.isLoading}
                  onClick={handleAddClick}>
                  Add
                </Button>
              </Td>
            </Tr>
          ) : (
            <Tr>
              <Td>
                <Input
                  type="file"
                  id="addImage"
                  name="image"
                  size="sm"
                  display="none"
                  ref={imageRef}
                  onChange={handleInputChange}
                />
                <IconButton
                  variant="outline"
                  colorScheme={imagesCtx.image ? 'yellow' : 'blue'}
                  size="sm"
                  width="full"
                  height="full"
                  minHeight={8}
                  aria-label="Save"
                  icon={
                    imagesCtx.image ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${imagesCtx.image.url}`}
                        alt={form.name}
                        width="full"
                        height="full"
                        objectFit="cover"
                        padding={1}
                      />
                    ) : (
                      <FaUpload />
                    )
                  }
                  isLoading={imagesCtx.isLoading || talentsCtx.isLoading}
                  onClick={() => imageRef.current?.click()}
                />
              </Td>
              <Td>
                <Input
                  type="text"
                  id="addName"
                  name="name"
                  size="sm"
                  onChange={handleInputChange}
                />
              </Td>
              <Td>
                <Input
                  type="text"
                  id="addRole"
                  name="role"
                  size="sm"
                  onChange={handleInputChange}
                />
              </Td>
              <Td>
                <List spacing={2}>
                  <ListItem>
                    <ListIcon as={FaTimesCircle} color="red.500" marginBottom={0.5} />
                    No related events
                  </ListItem>
                </List>
              </Td>
              <Td>
                <ButtonGroup>
                  <IconButton
                    colorScheme="green"
                    size="sm"
                    aria-label="Save"
                    icon={<FaSave />}
                    isLoading={imagesCtx.isLoading || talentsCtx.isLoading}
                    isDisabled={!form.name || !imagesCtx.image}
                    onClick={handleSaveClick}
                  />
                  <IconButton
                    size="sm"
                    aria-label="Cancel"
                    icon={<FaTimes />}
                    isLoading={imagesCtx.isLoading || talentsCtx.isLoading}
                    onClick={handleCancelClick}
                  />
                </ButtonGroup>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TalentsTable;
