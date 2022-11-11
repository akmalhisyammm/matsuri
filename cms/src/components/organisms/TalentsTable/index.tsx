import {
  Button,
  ButtonGroup,
  IconButton,
  Image,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useContext, useRef, useState } from 'react';
import { FaEdit, FaPlus, FaSave, FaTimes, FaTrash, FaUpload } from 'react-icons/fa';

import { TalentContext } from 'contexts/talent';
import { ImageContext } from 'contexts/image';

import type { ITalent } from 'types/talent';

const TalentsTable = () => {
  const [form, setForm] = useState<{
    name: string;
    role: string;
    imageId: string;
    imageUrl: string;
  }>({
    name: '',
    role: '',
    imageId: '',
    imageUrl: '',
  });
  const [updateId, setUpdateId] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const talentsCtx = useContext(TalentContext);
  const imagesCtx = useContext(ImageContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      imagesCtx.upload(files[0]);

      setForm({ ...form, imageId: '' });
    }
  };

  const handleAddClick = () => {
    setUpdateId('');
    setIsAdding(true);

    imagesCtx.remove();
  };

  const handleEditClick = (talent: ITalent) => {
    setIsAdding(false);
    setForm({
      name: talent.name,
      role: talent.role,
      imageId: talent.image._id,
      imageUrl: talent.image.url,
    });
    setUpdateId(talent._id);
  };

  const handleCancelClick = () => {
    setForm({ name: '', role: '', imageId: '', imageUrl: '' });
    setUpdateId('');
    setIsAdding(false);

    imagesCtx.remove();
  };

  const handleSaveClick = (actionType: 'create' | 'update') => {
    if (actionType === 'create') {
      talentsCtx.create(
        form.name,
        form.role,
        imagesCtx.image?._id || '',
        imagesCtx.image?.url || ''
      );
    } else {
      talentsCtx.update(
        updateId,
        form.name,
        form.role,
        imagesCtx.image?._id || form.imageId,
        imagesCtx.image?.url || form.imageUrl
      );
    }

    setForm({ name: '', role: '', imageId: '', imageUrl: '' });
    setUpdateId('');
    setIsAdding(false);

    imagesCtx.remove();
  };

  const handleDeleteClick = (id: string) => {
    talentsCtx.destroy(id);
    imagesCtx.remove();
  };

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th width="50%">Name</Th>
            <Th width="50%">Role</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>

        <Tbody>
          {talentsCtx.talents.map((talent) =>
            talent._id !== updateId ? (
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
                  <ButtonGroup>
                    <IconButton
                      colorScheme="yellow"
                      size="sm"
                      aria-label="Edit"
                      icon={<FaEdit />}
                      isLoading={imagesCtx.isLoading || talentsCtx.isLoading}
                      onClick={handleEditClick.bind(null, talent)}
                    />
                    <IconButton
                      colorScheme="red"
                      size="sm"
                      aria-label="Delete"
                      icon={<FaTrash />}
                      isLoading={imagesCtx.isLoading || talentsCtx.isLoading}
                      onClick={handleDeleteClick.bind(null, talent._id)}
                    />
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
                    onChange={handleImageChange}
                  />
                  <IconButton
                    variant="outline"
                    size="sm"
                    width="full"
                    aria-label="Save"
                    icon={
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${
                          imagesCtx.image?.url || talent.image.url
                        }`}
                        alt={form.name}
                        padding={0.5}
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
                    defaultValue={form.name}
                    onChange={handleInputChange}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    id="editRole"
                    name="role"
                    size="sm"
                    defaultValue={form.role}
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
                      isLoading={imagesCtx.isLoading || talentsCtx.isLoading}
                      isDisabled={!form.name}
                      onClick={handleSaveClick.bind(null, 'update')}
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

          {isAdding ? (
            <Tr>
              <Td>
                <Input
                  type="file"
                  id="editImage"
                  name="image"
                  size="sm"
                  display="none"
                  ref={imageRef}
                  onChange={handleImageChange}
                />
                <IconButton
                  variant="outline"
                  size="sm"
                  width="full"
                  aria-label="Save"
                  icon={
                    imagesCtx.image ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${imagesCtx.image.url}`}
                        alt={form.name}
                        padding={0.5}
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
                <ButtonGroup>
                  <IconButton
                    colorScheme="green"
                    size="sm"
                    aria-label="Save"
                    icon={<FaSave />}
                    isLoading={imagesCtx.isLoading || talentsCtx.isLoading}
                    isDisabled={!form.name || !imagesCtx.image}
                    onClick={handleSaveClick.bind(null, 'create')}
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
          ) : (
            <Tr>
              <Td colSpan={4}>
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

export default TalentsTable;
