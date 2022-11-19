import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch,
  Textarea,
} from '@chakra-ui/react';
import { useContext, useEffect, useRef, useState } from 'react';
import { FaMinus, FaPlus, FaUpload } from 'react-icons/fa';
import moment from 'moment';

import { CategoryContext } from 'contexts/category';
import { EventContext } from 'contexts/event';
import { TalentContext } from 'contexts/talent';
import { ImageContext } from 'contexts/image';

import type { IEvent, IEventPayload } from 'types/event';

type EventModalProps = {
  data?: IEvent;
  isOpen: boolean;
  onClose: () => void;
};

const EventModal = ({ data, isOpen, onClose }: EventModalProps) => {
  const [form, setForm] = useState<IEventPayload>({
    title: '',
    date: '',
    about: '',
    tagline: '',
    keypoint: [''],
    venueName: '',
    status: 'Draft',
    tickets: [{ type: '', price: 0, stock: 0, status: false }],
    categoryId: '',
    talentId: '',
    imageId: '',
  });

  const imageRef = useRef<HTMLInputElement>(null);

  const eventsCtx = useContext(EventContext);
  const categoriesCtx = useContext(CategoryContext);
  const talentsCtx = useContext(TalentContext);
  const imagesCtx = useContext(ImageContext);

  const handleResetForm = () => {
    setForm({
      title: '',
      date: '',
      about: '',
      tagline: '',
      keypoint: [''],
      venueName: '',
      status: 'Draft',
      tickets: [{ type: '', price: 0, stock: 0, status: false }],
      categoryId: '',
      talentId: '',
      imageId: '',
    });

    imagesCtx.remove();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value, checked, files } = e.target as HTMLInputElement;

    const key = name.split('-')[0];

    switch (key) {
      case 'keypoint': {
        const keypointIdx = Number(name.split('-')[1]);
        const updatedKeypoint = [...form.keypoint];

        updatedKeypoint[keypointIdx] = value;

        setForm({ ...form, keypoint: updatedKeypoint });
        break;
      }
      case 'tickets': {
        const ticketIdx = Number(name.split('-')[1]);
        const ticketKey = name.split('-')[2];
        const updatedTickets = [...form.tickets];

        updatedTickets[ticketIdx] = {
          ...updatedTickets[ticketIdx],
          [ticketKey]: ticketKey === 'status' ? checked : value,
        };

        setForm({ ...form, tickets: updatedTickets });
        break;
      }
      case 'image': {
        if (files) {
          imagesCtx.upload(files[0]);

          setForm({ ...form, imageId: '' });
        }

        break;
      }
      default: {
        setForm({ ...form, [name]: name === 'status' ? (checked ? 'Published' : 'Draft') : value });
        break;
      }
    }
  };

  const handleAddClick = (key: 'keypoint' | 'tickets') => {
    const updatedKey = [...form[key]];

    updatedKey.push(key === 'keypoint' ? '' : { type: '', price: 0, stock: 0, status: false });

    setForm({ ...form, [key]: updatedKey });
  };

  const handleRemoveClick = (key: 'keypoint' | 'tickets', idx: number) => {
    const updatedKey = [...form[key]];

    updatedKey.splice(idx, 1);

    setForm({ ...form, [key]: updatedKey });
  };

  const handleSaveClick = () => {
    const payload = { ...form, imageId: imagesCtx.image?._id || '' };

    if (!data) {
      eventsCtx.create(payload);
    } else {
      eventsCtx.update(data._id, payload);
    }

    handleResetForm();
    onClose();
  };

  const handleCancelClick = () => {
    handleResetForm();
    onClose();
  };

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title,
        date: moment(data.date).format('YYYY-MM-DDTHH:mm'),
        about: data.about,
        tagline: data.tagline,
        keypoint: data.keypoint,
        venueName: data.venueName,
        status: data.status,
        tickets: data.tickets,
        categoryId: data.category._id,
        talentId: data.talent._id,
        imageId: data.image._id,
      });
    }
  }, [data, eventsCtx.events]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={false}
      closeOnEsc={false}
      size="xl"
      scrollBehavior="inside"
      isCentered>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader borderBottomWidth={1}>{!data ? 'Add' : 'Edit'} Event</ModalHeader>
        <ModalBody>
          <HStack gap={2} paddingY={2} justifyContent="center" alignItems="center">
            <Badge colorScheme={form.status === 'Draft' ? 'red' : 'gray'}>Draft</Badge>
            <Switch
              id="status"
              name="status"
              isChecked={form.status === 'Published'}
              onChange={handleInputChange}
            />
            <Badge colorScheme={form.status === 'Published' ? 'green' : 'gray'}>Published</Badge>
          </HStack>

          <Divider my={2} />

          <FormControl marginY={4}>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl marginY={4}>
            <FormLabel htmlFor="date">Date</FormLabel>
            <Input
              type="datetime-local"
              id="date"
              name="date"
              value={form.date}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl marginY={4}>
            <FormLabel htmlFor="venueName">Location</FormLabel>
            <Input
              type="text"
              id="venueName"
              name="venueName"
              value={form.venueName}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl marginY={4}>
            <FormLabel htmlFor="tagline">Tagline</FormLabel>
            <Input
              type="text"
              id="tagline"
              name="tagline"
              value={form.tagline}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl marginY={4}>
            <FormLabel htmlFor="about">About</FormLabel>
            <Textarea id="about" name="about" value={form.about} onChange={handleInputChange} />
          </FormControl>

          <FormControl marginY={4}>
            <FormLabel htmlFor="keypoint">Keypoints</FormLabel>
            {form.keypoint.map((_, idx) => (
              <HStack key={idx} marginBottom={2}>
                <Input
                  type="text"
                  id={`keypoint${idx}`}
                  name={`keypoint-${idx}`}
                  value={form.keypoint[idx]}
                  onChange={handleInputChange}
                />
                <IconButton
                  variant="outline"
                  colorScheme="red"
                  aria-label="Remove"
                  icon={<FaMinus />}
                  isDisabled={form.keypoint.length === 1}
                  onClick={handleRemoveClick.bind(null, 'keypoint', idx)}
                />
              </HStack>
            ))}
            <Button
              variant="link"
              colorScheme="blue"
              size="sm"
              leftIcon={<FaPlus />}
              onClick={handleAddClick.bind(null, 'keypoint')}>
              Add more keypoint
            </Button>
          </FormControl>

          <FormControl marginY={4}>
            <FormLabel htmlFor="addTicket">Tickets</FormLabel>
            {form.tickets.map((_, idx) => (
              <Flex key={idx} gap={2} marginBottom={2}>
                <Box borderWidth={1} padding={4} width="full">
                  <HStack gap={2} justifyContent="center" alignItems="center">
                    <Badge colorScheme={!form.tickets[idx].status ? 'red' : 'gray'}>Inactive</Badge>
                    <Switch
                      id={`ticketStatus${idx}`}
                      name={`tickets-${idx}-status`}
                      isChecked={form.tickets[idx].status}
                      onChange={handleInputChange}
                    />
                    <Badge colorScheme={form.tickets[idx].status ? 'green' : 'gray'}>Active</Badge>
                  </HStack>
                  <Divider my={2} />
                  <InputGroup marginBottom={2}>
                    <InputLeftAddon width={85}>Type</InputLeftAddon>
                    <Input
                      type="text"
                      id={`ticketType${idx}`}
                      name={`tickets-${idx}-type`}
                      value={form.tickets[idx].type}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup marginBottom={2}>
                    <InputLeftAddon width={85}>Price</InputLeftAddon>
                    <Input
                      type="number"
                      id={`ticketPrice${idx}`}
                      name={`tickets-${idx}-price`}
                      value={form.tickets[idx].price}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftAddon width={85}>Stock</InputLeftAddon>
                    <Input
                      type="number"
                      id={`ticketStock${idx}`}
                      name={`tickets-${idx}-stock`}
                      value={form.tickets[idx].stock}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </Box>
                <Box>
                  <IconButton
                    variant="outline"
                    colorScheme="red"
                    height="full"
                    aria-label="Remove"
                    icon={<FaMinus />}
                    isDisabled={form.tickets.length === 1}
                    onClick={handleRemoveClick.bind(null, 'tickets', idx)}
                  />
                </Box>
              </Flex>
            ))}
            <Button
              variant="link"
              colorScheme="blue"
              size="sm"
              leftIcon={<FaPlus />}
              onClick={handleAddClick.bind(null, 'tickets')}>
              Add more ticket
            </Button>
          </FormControl>

          <FormControl marginY={4}>
            <FormLabel htmlFor="categoryId">Category</FormLabel>
            <Select
              id="categoryId"
              name="categoryId"
              placeholder="Select category"
              value={form.categoryId}
              onChange={handleInputChange}>
              {categoriesCtx.categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl marginY={4}>
            <FormLabel htmlFor="talentId">Talent</FormLabel>
            <Select
              id="talentId"
              name="talentId"
              placeholder="Select talent"
              value={form.talentId}
              onChange={handleInputChange}>
              {talentsCtx.talents.map((talent) => (
                <option key={talent._id} value={talent._id}>
                  {talent.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl marginY={4}>
            <FormLabel htmlFor="image">Image</FormLabel>
            {imagesCtx.image && (
              <Box borderWidth={1} marginBottom={2}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${imagesCtx.image.url}`}
                  alt={form.title}
                  width="full"
                />
              </Box>
            )}
            <Input
              type="file"
              id="image"
              name="image"
              size="sm"
              display="none"
              ref={imageRef}
              onChange={handleInputChange}
            />
            <Button
              variant="outline"
              colorScheme={imagesCtx.image ? 'yellow' : 'blue'}
              width="full"
              leftIcon={<FaUpload />}
              isLoading={imagesCtx.isLoading || eventsCtx.isLoading}
              onClick={() => imageRef.current?.click()}>
              {imagesCtx.image ? 'Change Image' : 'Upload Image'}
            </Button>
          </FormControl>
        </ModalBody>

        <ModalFooter borderTopWidth={1}>
          <Button
            colorScheme="green"
            marginRight={2}
            isLoading={imagesCtx.isLoading || eventsCtx.isLoading}
            onClick={handleSaveClick}>
            Save
          </Button>
          <Button
            isLoading={imagesCtx.isLoading || eventsCtx.isLoading}
            onClick={handleCancelClick}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
