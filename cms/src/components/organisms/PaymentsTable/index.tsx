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

import { PaymentContext } from 'contexts/payment';
import { ImageContext } from 'contexts/image';

import type { IPayment } from 'types/payment';

const PaymentsTable = () => {
  const [form, setForm] = useState<{ type: string; imageId: string; imageUrl: string }>({
    type: '',
    imageId: '',
    imageUrl: '',
  });
  const [updateId, setUpdateId] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const paymentsCtx = useContext(PaymentContext);
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

  const handleEditClick = (payment: IPayment) => {
    setIsAdding(false);
    setForm({ type: payment.type, imageId: payment.image._id, imageUrl: payment.image.url });
    setUpdateId(payment._id);
  };

  const handleCancelClick = () => {
    setForm({ type: '', imageId: '', imageUrl: '' });
    setUpdateId('');
    setIsAdding(false);

    imagesCtx.remove();
  };

  const handleSaveClick = (actionType: 'create' | 'update') => {
    if (actionType === 'create') {
      paymentsCtx.create(form.type, imagesCtx.image?._id || '', imagesCtx.image?.url || '');
    } else {
      paymentsCtx.update(
        updateId,
        form.type,
        imagesCtx.image?._id || form.imageId,
        imagesCtx.image?.url || form.imageUrl
      );
    }

    setForm({ type: '', imageId: '', imageUrl: '' });
    setUpdateId('');
    setIsAdding(false);

    imagesCtx.remove();
  };

  const handleDeleteClick = (id: string) => {
    paymentsCtx.destroy(id);
    imagesCtx.remove();
  };

  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th>Image</Th>
            <Th width="full">Type</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>

        <Tbody>
          {paymentsCtx.payments.map((payment) =>
            payment._id !== updateId ? (
              <Tr key={payment._id}>
                <Td>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${payment.image.url}`}
                    alt={payment.type}
                    width="full"
                  />
                </Td>
                <Td>{payment.type}</Td>
                <Td>
                  <ButtonGroup>
                    <IconButton
                      colorScheme="yellow"
                      size="sm"
                      aria-label="Edit"
                      icon={<FaEdit />}
                      isLoading={imagesCtx.isLoading || paymentsCtx.isLoading}
                      onClick={handleEditClick.bind(null, payment)}
                    />
                    <IconButton
                      colorScheme="red"
                      size="sm"
                      aria-label="Delete"
                      icon={<FaTrash />}
                      isLoading={imagesCtx.isLoading || paymentsCtx.isLoading}
                      onClick={handleDeleteClick.bind(null, payment._id)}
                    />
                  </ButtonGroup>
                </Td>
              </Tr>
            ) : (
              <Tr key={payment._id}>
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
                          imagesCtx.image?.url || payment.image.url
                        }`}
                        alt={form.type}
                        padding={0.5}
                      />
                    }
                    isLoading={imagesCtx.isLoading || paymentsCtx.isLoading}
                    onClick={() => imageRef.current?.click()}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    id="editType"
                    name="type"
                    size="sm"
                    defaultValue={form.type}
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
                      isLoading={imagesCtx.isLoading || paymentsCtx.isLoading}
                      isDisabled={!form.type}
                      onClick={handleSaveClick.bind(null, 'update')}
                    />
                    <IconButton
                      colorScheme="gray"
                      size="sm"
                      aria-label="Cancel"
                      icon={<FaTimes />}
                      isLoading={imagesCtx.isLoading || paymentsCtx.isLoading}
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
                        alt={form.type}
                        padding={0.5}
                      />
                    ) : (
                      <FaUpload />
                    )
                  }
                  isLoading={imagesCtx.isLoading || paymentsCtx.isLoading}
                  onClick={() => imageRef.current?.click()}
                />
              </Td>
              <Td>
                <Input
                  type="text"
                  id="addType"
                  name="type"
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
                    isLoading={imagesCtx.isLoading || paymentsCtx.isLoading}
                    isDisabled={!form.type || !imagesCtx.image}
                    onClick={handleSaveClick.bind(null, 'create')}
                  />
                  <IconButton
                    colorScheme="gray"
                    size="sm"
                    aria-label="Cancel"
                    icon={<FaTimes />}
                    isLoading={imagesCtx.isLoading || paymentsCtx.isLoading}
                    onClick={handleCancelClick}
                  />
                </ButtonGroup>
              </Td>
            </Tr>
          ) : (
            <Tr>
              <Td colSpan={3}>
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

export default PaymentsTable;
