import { Flex, Text, Button, Dialog, TextField } from "@radix-ui/themes";

const AddEventModal = ({ open, setOpen, data, handleChange, handleSubmit, isSubmitting = false }) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Add Event</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Add a new event.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Title
            </Text>
            <TextField.Input
              defaultValue=""
              value={data?.title}
              placeholder="Enter event title"
              name="title"
              onChange={handleChange}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={handleSubmit}>Save Changes</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddEventModal;
