import {
  Button,
  ButtonGroup,
  IconButton,
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
import { useContext, useState } from 'react';
import {
  FaCheckCircle,
  FaEdit,
  FaPlus,
  FaSave,
  FaTimes,
  FaTimesCircle,
  FaTrash,
} from 'react-icons/fa';

import { CategoryContext } from 'contexts/category';
import { EventContext } from 'contexts/event';

import type { ICategory, ICategoryPayload } from 'types/category';

const CategoriesTable = () => {
  const [form, setForm] = useState<ICategoryPayload>({ name: '' });
  const [editedCategory, setEditedCategory] = useState<ICategory>();
  const [isAdding, setIsAdding] = useState(false);

  const categoriesCtx = useContext(CategoryContext);
  const eventsCtx = useContext(EventContext);

  const resetForm = () => {
    setForm({ name: '' });
    setEditedCategory(undefined);
    setIsAdding(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    setForm({ ...form, [name]: value });
  };

  const handleAddClick = () => {
    setEditedCategory(undefined);
    setIsAdding(true);
  };

  const handleEditClick = (category: ICategory) => {
    setForm({ name: category.name });
    setEditedCategory(category);
    setIsAdding(false);
  };

  const handleCancelClick = () => {
    resetForm();
  };

  const handleSaveClick = () => {
    if (!editedCategory) {
      categoriesCtx.create(form);
    } else {
      categoriesCtx.update(editedCategory._id, form);
    }

    resetForm();
  };

  const handleDeleteClick = (id: string) => {
    categoriesCtx.destroy(id);
  };

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th width="50%">Name</Th>
            <Th width="50%">Related Events</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {categoriesCtx.categories.map((category) =>
            category._id !== editedCategory?._id ? (
              <Tr key={category._id}>
                <Td>{category.name}</Td>
                <Td>
                  <List spacing={2}>
                    {eventsCtx.events.filter((event) => event.category._id === category._id)
                      .length === 0 ? (
                      <ListItem>
                        <ListIcon as={FaTimesCircle} color="red.500" marginBottom={0.5} />
                        No related events
                      </ListItem>
                    ) : (
                      eventsCtx.events.map(
                        (event) =>
                          event.category._id === category._id && (
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
                      colorScheme="yellow"
                      size="sm"
                      aria-label="Edit"
                      icon={<FaEdit />}
                      isLoading={categoriesCtx.isLoading}
                      onClick={handleEditClick.bind(null, category)}
                    />
                    <Tooltip
                      label="Unable to delete category with related events"
                      placement="bottom-start"
                      isDisabled={
                        eventsCtx.events.filter((event) => event.category._id === category._id)
                          .length === 0
                      }
                      hasArrow>
                      <IconButton
                        colorScheme="red"
                        size="sm"
                        aria-label="Delete"
                        icon={<FaTrash />}
                        isLoading={categoriesCtx.isLoading}
                        isDisabled={eventsCtx.events.some(
                          (event) => event.category._id === category._id
                        )}
                        onClick={handleDeleteClick.bind(null, category._id)}
                      />
                    </Tooltip>
                  </ButtonGroup>
                </Td>
              </Tr>
            ) : (
              <Tr key={category._id}>
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
                  <List spacing={2}>
                    {eventsCtx.events.map(
                      (event) =>
                        event.category._id === category._id && (
                          <ListItem key={event._id}>
                            <ListIcon as={FaCheckCircle} color="green.500" marginBottom={0.5} />
                            {event.title}
                          </ListItem>
                        )
                    )}

                    {eventsCtx.events.filter((event) => event.category._id === category._id)
                      .length === 0 && (
                      <ListItem>
                        <ListIcon as={FaTimesCircle} color="red.500" marginBottom={0.5} />
                        No related events
                      </ListItem>
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
                      isLoading={categoriesCtx.isLoading}
                      isDisabled={!form.name}
                      onClick={handleSaveClick}
                    />
                    <IconButton
                      size="sm"
                      aria-label="Cancel"
                      icon={<FaTimes />}
                      isLoading={categoriesCtx.isLoading}
                      onClick={handleCancelClick}
                    />
                  </ButtonGroup>
                </Td>
              </Tr>
            )
          )}

          {!isAdding ? (
            <Tr>
              <Td colSpan={3}>
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  size="sm"
                  width="full"
                  leftIcon={<FaPlus />}
                  isLoading={categoriesCtx.isLoading}
                  onClick={handleAddClick}>
                  Add
                </Button>
              </Td>
            </Tr>
          ) : (
            <Tr>
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
                    isLoading={categoriesCtx.isLoading}
                    isDisabled={!form.name}
                    onClick={handleSaveClick}
                  />
                  <IconButton
                    size="sm"
                    aria-label="Cancel"
                    icon={<FaTimes />}
                    isLoading={categoriesCtx.isLoading}
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

export default CategoriesTable;
