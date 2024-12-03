"use client";
import { trpc } from "@/app/_trpc/client";
import Button from "@/components/shared/button";
import Card from "@/components/shared/card";
import InputError from "@/components/shared/inputError";
import {
  FlashcardForm,
  FlashcardFormSchema
} from "@/model/zod/flashcard/createFlashcard.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const CreateFlashcard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FlashcardForm>({
    resolver: zodResolver(FlashcardFormSchema)
  });
  const flashcardMutation = trpc.flashcard.createFlashcard.useMutation();

  const onSubmit: SubmitHandler<FlashcardForm> = (data) => {
    flashcardMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Flashcard created");
        reset();
      },
      onError: (error) => {
        toast.error(error.message);
        console.error(error);
      }
    });
  };

  return (
    <Card className="max-w-96 mx-auto p-6 mt-4 flex flex-col gap-6 bg-white">
      <h1 className="text-3xl mx-auto">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <InputError
          type="text"
          id="word"
          register={register}
          label={"Word"}
          error={errors.word?.message}
        />
        <InputError
          type="text"
          id="definition"
          register={register}
          label={"Definition"}
          error={errors.definition?.message}
        />
        <InputError
          type="text"
          id="hint"
          register={register}
          label={"Hint"}
          error={errors.hint?.message}
        />
        <InputError
          type="text"
          id="pronunciation"
          register={register}
          label={"Pronunciation"}
          error={errors.pronunciation?.message}
        />
        <select
          className="border border-gray-300 rounded-md p-4"
          {...register("level")}
        >
          <option value="BEGINNER">Beginner</option>
          <option value="INTERMEDIATE">Intermediate</option>
          <option value="ADVANCED">Advanced</option>
        </select>
        <Button className="mx-auto">Submit</Button>
      </form>
      <ToastContainer />
    </Card>
  );
};

export default CreateFlashcard;
