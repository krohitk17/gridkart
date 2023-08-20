import React from "react";
import RedeemItem from "./RedeemItem";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { createReward, getRewards } from "../Routes/event";
import Task from "../Components/Earn/Task";

const addRewardButtonStyle =
  "ml-auto font-semibold bg-gray-300 p-2 rounded-lg hover:scale-110 transition duration-500 ease-in-out transform hover:cursor-pointer";

function Tasks() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [name, setName] = React.useState("");
  const [cost, setCost] = React.useState("");
  const [img, setImg] = React.useState("");

  const [rewards, setRewards] = React.useState([]);

  const handleNameChange = (event) => setName(event.target.value);
  const handleCostChange = (event) => setCost(event.target.value);
  const handleImgChange = (event) => setImg(event.target.value);

  React.useEffect(() => {
    getRewards().then((rewards) => {
      setRewards(rewards);
    });
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(name, cost, img);

    createReward({ description: name, amount: cost, image: img }).then(
      (reward) => {
        console.log(reward);
        setRewards([...rewards, reward]);
        // enter code here
        setImg("");
        setName("");
        setCost("");
        onClose();
      }
    );
  };

  return (
    <>
      <div className="bg-white shadow-lg p-4 w-[55em]">
        <div className="flex">
          <div className="font-bold text-lg">Uploaded Rewards:</div>
          <div className={addRewardButtonStyle} onClick={onOpen}>
            Add Reward
          </div>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Add Rewards</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Img</FormLabel>
                  <Input id="image" value={img} onChange={handleImgChange} />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Name</FormLabel>
                  <Input id="name" value={name} onChange={handleNameChange} />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Cost</FormLabel>
                  <Input id="cost" value={cost} onChange={handleCostChange} />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={(e) => {
                    submitHandler(e);
                  }}
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
        <div className="pt-2 flex flex-wrap justify-evenly ">
          {/* image of product */}
          {rewards.map((reward) => (
            <Task
              key={reward._id}
              description={reward.description}
              amount={reward.amount}
              onClick={() => {
                console.log("clicked");
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Tasks;
