import {
  Button,
  ButtonGroup,
  IconButton,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { FaEdit, FaPlus, FaSave, FaTimes, FaTrash } from 'react-icons/fa';

import { CategoryContext } from 'contexts/category';

const CategoriesTable = () => {
  const [form, setForm] = useState<{ name: string }>({ name: '' });
  const [updateId, setUpdateId] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const categoriesCtx = useContext(CategoryContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleAddClick = () => {
    setUpdateId('');
    setIsAdding(true);
  };

  const handleEditClick = (id: string, name: string) => {
    setIsAdding(false);
    setForm({ name });
    setUpdateId(id);
  };

  const handleCancelClick = () => {
    setForm({ name: '' });
    setUpdateId('');
    setIsAdding(false);
  };

  const handleSaveClick = (actionType: 'create' | 'update') => {
    if (actionType === 'create') {
      categoriesCtx.create(form.name);
    } else {
      categoriesCtx.update(updateId, form.name);
    }

    setForm({ name: '' });
    setUpdateId('');
    setIsAdding(false);
  };

  const handleDeleteClick = (id: string) => {
    categoriesCtx.destroy(id);
  };

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th width="full">Name</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>

        <Tbody>
          {categoriesCtx.categories.map((category) =>
            category._id !== updateId ? (
              <Tr key={category._id}>
                <Td>{category.name}</Td>
                <Td>
                  <ButtonGroup>
                    <IconButton
                      colorScheme="yellow"
                      size="sm"
                      aria-label="Edit"
                      icon={<FaEdit />}
                      isLoading={categoriesCtx.isLoading}
                      onClick={handleEditClick.bind(null, category._id, category.name)}
                    />
                    <IconButton
                      colorScheme="red"
                      size="sm"
                      aria-label="Delete"
                      icon={<FaTrash />}
                      isLoading={categoriesCtx.isLoading}
                      onClick={handleDeleteClick.bind(null, category._id)}
                    />
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
                    defaultValue={form.name}
                    onChange={handleInputChange}
                  />
                </Td>
                <Td>
                  <ButtonGroup>
                    <IconButton
                      colorScheme="green"
                      size="sm"
                      aria-label="Save"
                      icon={<FaSave />}
                      isLoading={categoriesCtx.isLoading}
                      onClick={handleSaveClick.bind(null, 'update')}
                    />
                    <IconButton
                      colorScheme="gray"
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
          {isAdding ? (
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
                <ButtonGroup>
                  <IconButton
                    colorScheme="green"
                    size="sm"
                    aria-label="Save"
                    icon={<FaSave />}
                    isLoading={categoriesCtx.isLoading}
                    onClick={handleSaveClick.bind(null, 'create')}
                  />
                  <IconButton
                    colorScheme="gray"
                    size="sm"
                    aria-label="Cancel"
                    icon={<FaTimes />}
                    isLoading={categoriesCtx.isLoading}
                    onClick={handleCancelClick}
                  />
                </ButtonGroup>
              </Td>
            </Tr>
          ) : (
            <Tr>
              <Td colSpan={2}>
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  size="sm"
                  width="full"
                  leftIcon={<FaPlus />}
                  onClick={handleAddClick}>
                  Add
                </Button>
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default CategoriesTable;
