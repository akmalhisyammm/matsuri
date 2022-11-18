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
  Tr,
} from '@chakra-ui/react';
import { useContext, useRef, useState } from 'react';
import { FaEdit, FaPlus, FaSave, FaTimes, FaTimesCircle, FaTrash, FaUpload } from 'react-icons/fa';

import { PaymentContext } from 'contexts/payment';
import { ImageContext } from 'contexts/image';

import type { IPayment, IPaymentPayload } from 'types/payment';

const PaymentsTable = () => {
  const [form, setForm] = useState<IPaymentPayload>({ type: '', imageId: '' });
  const [editedPayment, setEditedPayment] = useState<IPayment>();
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const imageRef = useRef<HTMLInputElement>(null);

  const paymentsCtx = useContext(PaymentContext);
  const imagesCtx = useContext(ImageContext);

  const resetForm = () => {
    setForm({ type: '', imageId: '' });
    setEditedPayment(undefined);
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
    setEditedPayment(undefined);
    setIsAdding(true);

    imagesCtx.remove();
  };

  const handleEditClick = (payment: IPayment) => {
    setForm({
      type: payment.type,
      imageId: payment.image._id,
    });
    setEditedPayment(payment);
    setIsAdding(false);

    imagesCtx.set(payment.image);
  };

  const handleCancelClick = () => {
    resetForm();
  };

  const handleSaveClick = () => {
    const payload = { ...form, imageId: imagesCtx.image?._id || '' };

    if (!editedPayment) {
      paymentsCtx.create(payload);
    } else {
      paymentsCtx.update(editedPayment._id, payload);
    }

    resetForm();
  };

  const handleDeleteClick = (id: string) => {
    paymentsCtx.destroy(id);
    imagesCtx.remove();
  };

  if (!paymentsCtx.authorizedAccess.includes('READ')) {
    return (
      <List spacing={3}>
        <ListItem>
          <ListIcon as={FaTimesCircle} color="red.500" marginBottom={0.5} />
          You don&apos;t have access to read payments
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
            <Th width="90%">Type</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {paymentsCtx.payments.map((payment) =>
            payment._id !== editedPayment?._id ? (
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
                    {paymentsCtx.authorizedAccess.includes('UPDATE') && (
                      <IconButton
                        colorScheme="yellow"
                        size="sm"
                        aria-label="Edit"
                        icon={<FaEdit />}
                        isLoading={imagesCtx.isLoading || paymentsCtx.isLoading}
                        onClick={handleEditClick.bind(null, payment)}
                      />
                    )}
                    {paymentsCtx.authorizedAccess.includes('DELETE') && (
                      <IconButton
                        colorScheme="red"
                        size="sm"
                        aria-label="Delete"
                        icon={<FaTrash />}
                        isLoading={imagesCtx.isLoading || paymentsCtx.isLoading}
                        onClick={handleDeleteClick.bind(null, payment._id)}
                      />
                    )}
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
                          imagesCtx.image?.url || payment.image.url
                        }`}
                        alt={form.type}
                        width="full"
                        height="full"
                        objectFit="cover"
                        padding={1}
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
                    value={form.type}
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
                      onClick={handleSaveClick}
                    />
                    <IconButton
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

          {paymentsCtx.authorizedAccess.includes('CREATE') && !isAdding ? (
            <Tr>
              <Td colSpan={3}>
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  size="sm"
                  width="full"
                  leftIcon={<FaPlus />}
                  isLoading={imagesCtx.isLoading || paymentsCtx.isLoading}
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
                        alt={form.type}
                        width="full"
                        height="full"
                        objectFit="cover"
                        padding={1}
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
                    onClick={handleSaveClick}
                  />
                  <IconButton
                    size="sm"
                    aria-label="Cancel"
                    icon={<FaTimes />}
                    isLoading={imagesCtx.isLoading || paymentsCtx.isLoading}
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

export default PaymentsTable;
