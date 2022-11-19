import {
  Badge,
  HStack,
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
} from '@chakra-ui/react';
import { useContext } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

import { OrderContext } from 'contexts/order';
import moment from 'moment';

const OrdersTable = () => {
  const ordersCtx = useContext(OrderContext);

  const handleToggleClick = (id: string) => {
    ordersCtx.toggle(id);
  };

  if (!ordersCtx.authorizedAccess.includes('READ')) {
    return (
      <List spacing={3}>
        <ListItem>
          <ListIcon as={FaTimesCircle} color="red.500" marginBottom={0.5} />
          You don&apos;t have access to read orders
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
              <Th width="25%">Email</Th>
              <Th width="20%">Date & Time</Th>
              <Th width="25%">Ordered Tickets</Th>
              <Th width="15%">Total Price</Th>
              <Th width="15%">Payment</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>

          <Tbody>
            {ordersCtx.orders.order.map((order) => (
              <Tr key={order._id}>
                <Td>{order.personalDetail.email}</Td>
                <Td>{moment(order.date).format('LLL')}</Td>
                <Td>
                  <List spacing={2}>
                    {order.orderItems.map((item) => (
                      <ListItem key={item._id}>
                        <ListIcon as={FaCheckCircle} color="green.500" marginBottom={0.5} />
                        {order.eventHistory.title} - {item.totalTicket} {item.ticketCategory.type}
                      </ListItem>
                    ))}
                  </List>
                </Td>
                <Td>${order.totalPay}</Td>
                <Td>{order.paymentHistory.type}</Td>
                <Td>
                  <HStack>
                    <Switch
                      id="status"
                      name="status"
                      isChecked={order.status === 'Paid'}
                      isDisabled={ordersCtx.isLoading}
                      onChange={handleToggleClick.bind(null, order._id)}
                    />
                    <Badge colorScheme={order.status === 'Paid' ? 'green' : 'yellow'}>
                      {order.status}
                    </Badge>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrdersTable;
