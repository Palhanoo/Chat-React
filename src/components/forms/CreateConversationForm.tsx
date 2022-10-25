import {
  Button,
  InputContainer,
  InputField,
  InputLabel,
  TextField,
} from "../../utils/styles";
import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import {
  addConversation,
  createConversationThunk,
} from "../../store/conversationSlice";
import { useForm } from "react-hook-form";
import { CreateConversationParams } from "../../utils/types";
import { AppDispatch } from "../../store";
import React, { Dispatch, FC } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

export const CreateConversationForm: FC<Props> = ({ setShowModal }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateConversationParams>({});

  const onSubmit = async (data: CreateConversationParams) => {
    console.log(data);
    dispatch(createConversationThunk(data))
      .unwrap()
      .then(({ data }) => {
        console.log(data);
        setShowModal(false);
        navigate(`/conversations/${data.id}`);
      })
      .catch(() => console.log("ok"));
  };

  return (
    <form
      className={styles.createConversationForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <section>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Recipient</InputLabel>
          <InputField
            {...register("email", { required: "Email is Required" })}
          />
        </InputContainer>
      </section>
      <section className={styles.message}>
        <InputContainer backgroundColor="#161616">
          <InputLabel>Message (optional)</InputLabel>
          <TextField
            {...register("message", { required: "Message is Required" })}
          />
        </InputContainer>
      </section>
      <Button>Create Conversation</Button>
    </form>
  );
};
