import React, { useState } from "react";
import { Box, Button, Container, Heading, VStack, Text, Input, Textarea, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, SimpleGrid } from "@chakra-ui/react";
import { FaCalendarPlus, FaInfoCircle } from "react-icons/fa";

const Index = () => {
  const [events, setEvents] = useState([
    { id: 1, title: "Tech Conference 2023", date: "2023-12-15", description: "Annual tech conference featuring the latest innovations." },
    { id: 2, title: "Music Festival", date: "2023-12-20", description: "A three-day music extravaganza with top artists." },
  ]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const { isOpen: isCreateOpen, onOpen: onCreateOpen, onClose: onCreateClose } = useDisclosure();
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const [newEvent, setNewEvent] = useState({ title: "", date: "", description: "" });

  const handleCreateEvent = () => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    setNewEvent({ title: "", date: "", description: "" });
    onCreateClose();
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    onDetailOpen();
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">Event Management Platform</Heading>
        
        <Button leftIcon={<FaCalendarPlus />} colorScheme="blue" onClick={onCreateOpen}>
          Create New Event
        </Button>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {events.map((event) => (
            <Box key={event.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
              <Heading fontSize="xl">{event.title}</Heading>
              <Text mt={2}>Date: {event.date}</Text>
              <Button mt={4} rightIcon={<FaInfoCircle />} onClick={() => handleViewDetails(event)}>
                View Details
              </Button>
            </Box>
          ))}
        </SimpleGrid>

        {/* Create Event Modal */}
        <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Event</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input 
                  placeholder="Event Title" 
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                />
                <Input 
                  type="date" 
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                />
                <Textarea 
                  placeholder="Event Description" 
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCreateEvent}>
                Create
              </Button>
              <Button variant="ghost" onClick={onCreateClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Event Details Modal */}
        <Modal isOpen={isDetailOpen} onClose={onDetailClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedEvent?.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text><strong>Date:</strong> {selectedEvent?.date}</Text>
              <Text mt={2}><strong>Description:</strong> {selectedEvent?.description}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onDetailClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  );
};

export default Index;