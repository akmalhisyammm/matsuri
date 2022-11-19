import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { AuthContext } from 'contexts/auth';
import { UserContext } from 'contexts/user';

import type { IOtherUser, IOtherUserPayload } from 'types/user';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type UserModalProps = {
  data?: IOtherUser;
  isOpen: boolean;
  onClose: () => void;
};

const UserModal = ({ data, isOpen, onClose }: UserModalProps) => {
  const [form, setForm] = useState<IOtherUserPayload>({
    name: '',
    email: '',
    password: '',
    organizerName: '',
  });
  const [isNewPassword, setIsNewPassword] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const authCtx = useContext(AuthContext);
  const usersCtx = useContext(UserContext);

  const handleResetForm = () => {
    setForm({
      name: '',
      email: '',
      password: '',
      organizerName: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSwitchChange = () => {
    setForm({ ...form, password: '' });
    setIsNewPassword(!isNewPassword);
  };

  const handleSaveClick = () => {
    const payload = {
      ...form,
      password: isNewPassword ? form.password : undefined,
      organizerName: authCtx.user?.role === 'Owner' ? form.organizerName : undefined,
    };

    if (!data) {
      usersCtx.create(payload);
    } else {
      usersCtx.update(data._id, payload);
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
        name: data.name,
        email: data.email,
        password: '',
        organizerName: data.organizer.name,
      });
      setIsNewPassword(false);
    } else {
      setIsNewPassword(true);
    }
  }, [data, usersCtx.users]);

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
        <ModalHeader borderBottomWidth={1}>
          {!data ? 'Add' : 'Edit'} {authCtx.user?.role === 'Owner' ? 'Organizer' : 'Admin'}
        </ModalHeader>
        <ModalBody>
          <FormControl marginY={4}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl marginY={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl marginY={4}>
            <FormLabel htmlFor="password">{!data ? 'Password' : 'New Password'}</FormLabel>
            <HStack gap={2}>
              {data && <Switch isChecked={isNewPassword} onChange={handleSwitchChange} />}
              <InputGroup>
                <Input
                  type={isShowPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={form.password}
                  isDisabled={!isNewPassword && !!data}
                  onChange={handleInputChange}
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    aria-label={isShowPassword ? 'Hide' : 'Show'}
                    icon={isShowPassword ? <FaEyeSlash /> : <FaEye />}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  />
                </InputRightElement>
              </InputGroup>
            </HStack>
            {data && (
              <FormHelperText>
                Turn on the switch only if you want to create a new password.
              </FormHelperText>
            )}
          </FormControl>

          {authCtx.user?.role === 'Owner' && (
            <FormControl marginY={4}>
              <FormLabel htmlFor="organizerName">Organizer Name</FormLabel>
              <Input
                type="text"
                id="organizerName"
                name="organizerName"
                value={form.organizerName}
                onChange={handleInputChange}
              />
            </FormControl>
          )}
        </ModalBody>

        <ModalFooter borderTopWidth={1}>
          <Button
            colorScheme="green"
            marginRight={2}
            isLoading={usersCtx.isLoading}
            onClick={handleSaveClick}>
            Save
          </Button>
          <Button isLoading={usersCtx.isLoading} onClick={handleCancelClick}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
